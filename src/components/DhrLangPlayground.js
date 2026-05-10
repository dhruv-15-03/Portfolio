import React, { useMemo, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import useReveal from "../hooks/useReveal";

/**
 * DhrLangPlayground — the SIGNATURE MOMENT (real DhrLang)
 * ============================================================================
 * DhrLang (https://github.com/dhruv-15-03/DhrLang, currently v3.0.0) is a
 * statically-typed, class-based, OOP language with a concise English-core
 * token set rooted in Hindi:
 *
 *   num   → integer            sab   → string
 *   duo   → float              kya   → boolean
 *   ek    → char               kaam  → function/method
 *
 * The real compiler is JVM-hosted (Java) with three execution backends
 * (AST · IR · bytecode), a typechecker, generics, multi-dim arrays, an LSP
 * server, an EVM compiler target for smart contracts, JSON diagnostics, and
 * 1,000+ tests.
 *
 * What this in-browser playground does:
 *   - Tokenizes real DhrLang source on every keystroke.
 *   - Parses class declarations, kaam (method) declarations, typed locals
 *     (num / sab / kya / duo / ek), expressions with precedence, calls,
 *     control flow (if/while/return), and exception statements.
 *   - Renders the live AST on the right, color-coded by node kind.
 *
 * What it deliberately does NOT do (honest scope):
 *   - Run the program. The full DhrLang compiler does that under three
 *     backends; doing it in 280 LOC of browser JS would be dishonest.
 *   - Implement generics, IR lowering, EVM emission. Those live in the
 *     real compiler — there's a footnote pointing to the repo.
 * ============================================================================
 */

// -------------------- Lexer ------------------------------------------------

const TOK = {
  TYPE: "TYPE",
  KEYWORD: "KEYWORD",
  IDENT: "IDENT",
  NUMBER: "NUMBER",
  STRING: "STRING",
  PUNCT: "PUNCT",
  OP: "OP",
};

const TYPES = new Set(["num", "duo", "sab", "kya", "ek"]);
const KEYWORDS = new Set([
  "class", "static", "kaam",
  "if", "else", "while", "for",
  "try", "catch", "finally",
  "return", "new", "this", "super",
  "extends", "implements",
  "private", "protected", "public",
  "true", "false", "null", "throw",
]);

const isAlpha = (c) => (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === "_";
const isDigit = (c) => c >= "0" && c <= "9";
const isAlphaNum = (c) => isAlpha(c) || isDigit(c);

function tokenize(src) {
  const tokens = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];

    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") { i++; continue; }
    if (ch === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n") i++;
      continue;
    }
    if (ch === "/" && src[i + 1] === "*") {
      i += 2;
      while (i < src.length && !(src[i] === "*" && src[i + 1] === "/")) i++;
      i += 2;
      continue;
    }

    if (ch === '"') {
      let j = i + 1, val = "";
      while (j < src.length && src[j] !== '"') {
        if (src[j] === "\\" && j + 1 < src.length) { val += src[j] + src[j + 1]; j += 2; continue; }
        val += src[j]; j++;
      }
      if (src[j] !== '"') throw new Error(`Unterminated string at col ${i}`);
      tokens.push({ type: TOK.STRING, value: val, pos: i });
      i = j + 1;
      continue;
    }

    if (ch === "'") {
      let j = i + 1, val = "";
      while (j < src.length && src[j] !== "'") { val += src[j]; j++; }
      if (src[j] !== "'") throw new Error(`Unterminated char at col ${i}`);
      tokens.push({ type: TOK.STRING, value: val, pos: i, isChar: true });
      i = j + 1;
      continue;
    }

    if (isDigit(ch)) {
      let j = i, val = "";
      if (ch === "0" && (src[i + 1] === "x" || src[i + 1] === "X")) {
        val = "0x"; j += 2;
        while (j < src.length && /[0-9a-fA-F]/.test(src[j])) { val += src[j]; j++; }
        tokens.push({ type: TOK.NUMBER, value: val, pos: i });
        i = j; continue;
      }
      while (j < src.length && (isDigit(src[j]) || src[j] === ".")) { val += src[j]; j++; }
      tokens.push({ type: TOK.NUMBER, value: val, pos: i });
      i = j;
      continue;
    }

    if (isAlpha(ch)) {
      let j = i, val = "";
      while (j < src.length && isAlphaNum(src[j])) { val += src[j]; j++; }
      let type = TOK.IDENT;
      if (TYPES.has(val)) type = TOK.TYPE;
      else if (KEYWORDS.has(val)) type = TOK.KEYWORD;
      tokens.push({ type, value: val, pos: i });
      i = j;
      continue;
    }

    const two = src.slice(i, i + 2);
    if (["==", "!=", "<=", ">=", "&&", "||", "++", "--", "<<", ">>"].includes(two)) {
      tokens.push({ type: TOK.OP, value: two, pos: i });
      i += 2;
      continue;
    }
    if ("+-*/%<>=!&|^~".includes(ch)) {
      tokens.push({ type: TOK.OP, value: ch, pos: i });
      i++; continue;
    }
    if ("(){}[];,.".includes(ch)) {
      tokens.push({ type: TOK.PUNCT, value: ch, pos: i });
      i++; continue;
    }

    throw new Error(`Unexpected '${ch}' at col ${i}`);
  }
  return tokens;
}

// -------------------- Parser -----------------------------------------------
// Class-aware recursive descent. Mirrors the real DhrLang compiler shape:
//   Program   → ClassDecl+
//   ClassDecl → 'class' Ident ('extends' Ident)? '{' Member* '}'
//   Member    → access? 'static'? (kaam | Type) Ident ('(' Params ')' Block | (= Expr)? ;)

const PRECEDENCE = {
  "||": 1, "&&": 2,
  "==": 3, "!=": 3,
  "<": 4, ">": 4, "<=": 4, ">=": 4,
  "+": 5, "-": 5,
  "*": 6, "/": 6, "%": 6,
};

function parse(tokens) {
  let i = 0;
  const peek = (n = 0) => tokens[i + n];
  const eat = (val) => {
    const t = tokens[i];
    if (!t) throw new Error("Unexpected end of input");
    if (val !== undefined && t.value !== val) {
      throw new Error(`Expected '${val}', got '${t.value}'`);
    }
    i++;
    return t;
  };
  const check = (val) => peek() && peek().value === val;
  const match = (val) => { if (check(val)) { eat(); return true; } return false; };

  function parseProgram() {
    const classes = [];
    while (i < tokens.length) classes.push(parseClass());
    return { kind: "Program", classes };
  }

  function parseClass() {
    eat("class");
    const name = eat();
    if (name.type !== TOK.IDENT) throw new Error(`Expected class name, got '${name.value}'`);
    let parent = null;
    if (match("extends")) parent = eat().value;
    eat("{");
    const members = [];
    while (i < tokens.length && !check("}")) members.push(parseMember());
    eat("}");
    return { kind: "Class", name: name.value, parent, members };
  }

  function parseMember() {
    let access = null;
    if (peek() && ["private", "protected", "public"].includes(peek().value)) {
      access = eat().value;
    }
    let isStatic = false;
    if (match("static")) isStatic = true;

    if (check("kaam")) {
      eat("kaam");
      const name = eat();
      return parseMethodTail({ kind: "Method", access, isStatic, returnType: null, name: name.value });
    }

    const ty = parseType();
    const name = eat();
    if (check("(")) {
      return parseMethodTail({ kind: "Method", access, isStatic, returnType: ty, name: name.value });
    }
    let init = null;
    if (match("=")) init = parseExpression();
    if (check(";")) eat(";");
    return { kind: "Field", access, isStatic, type: ty, name: name.value, init };
  }

  function parseType() {
    const t = eat();
    if (t.type !== TOK.TYPE && t.type !== TOK.IDENT) {
      throw new Error(`Expected type, got '${t.value}'`);
    }
    let typeName = t.value;
    while (check("[")) { eat("["); eat("]"); typeName += "[]"; }
    return typeName;
  }

  function parseMethodTail(meta) {
    eat("(");
    const params = [];
    while (!check(")")) {
      const ptype = parseType();
      const pname = eat();
      params.push({ type: ptype, name: pname.value });
      if (!check(")")) eat(",");
    }
    eat(")");
    const body = parseBlock();
    return { ...meta, params, body };
  }

  function parseBlock() {
    eat("{");
    const stmts = [];
    while (!check("}")) stmts.push(parseStatement());
    eat("}");
    return { kind: "Block", body: stmts };
  }

  function parseStatement() {
    if (check("{")) return parseBlock();
    if (check("if")) return parseIf();
    if (check("while")) return parseWhile();
    if (check("return")) return parseReturn();
    if (check("try")) return parseTry();
    if (check("throw")) {
      eat("throw"); const e = parseExpression();
      if (check(";")) eat(";");
      return { kind: "Throw", value: e };
    }

    // Typed local declaration: <Type> ident (= expr)? ;
    if (peek() && (peek().type === TOK.TYPE || (peek().type === TOK.IDENT && peek(1) && peek(1).type === TOK.IDENT))) {
      const before = i;
      try {
        const ty = parseType();
        if (peek() && peek().type === TOK.IDENT) {
          const name = eat();
          let init = null;
          if (match("=")) init = parseExpression();
          if (check(";")) eat(";");
          return { kind: "Let", type: ty, name: name.value, value: init };
        }
        i = before;
      } catch (e) {
        i = before;
      }
    }

    const expr = parseExpression();
    // Assignment masquerades as expression-statement here: a = b, a[i] = b, this.f = b
    if (check("=")) {
      eat("=");
      const value = parseExpression();
      if (check(";")) eat(";");
      return { kind: "Assign", target: expr, value };
    }
    if (check(";")) eat(";");
    return { kind: "ExpressionStatement", expression: expr };
  }

  function parseIf() {
    eat("if"); eat("(");
    const cond = parseExpression();
    eat(")");
    const thenBranch = parseStatement();
    let elseBranch = null;
    if (match("else")) elseBranch = parseStatement();
    return { kind: "If", cond, thenBranch, elseBranch };
  }

  function parseWhile() {
    eat("while"); eat("(");
    const cond = parseExpression();
    eat(")");
    return { kind: "While", cond, body: parseStatement() };
  }

  function parseReturn() {
    eat("return");
    let value = null;
    if (!check(";")) value = parseExpression();
    if (check(";")) eat(";");
    return { kind: "Return", value };
  }

  function parseTry() {
    eat("try");
    const block = parseBlock();
    let catchBlock = null, catchName = null, finallyBlock = null;
    if (match("catch")) {
      eat("(");
      catchName = eat().value;
      eat(")");
      catchBlock = parseBlock();
    }
    if (match("finally")) finallyBlock = parseBlock();
    return { kind: "Try", block, catchName, catchBlock, finallyBlock };
  }

  function parseExpression(minPrec = 0) {
    let left = parseUnary();
    while (true) {
      const t = peek();
      if (!t || t.type !== TOK.OP) break;
      const prec = PRECEDENCE[t.value];
      if (prec === undefined || prec < minPrec) break;
      eat();
      const right = parseExpression(prec + 1);
      left = { kind: "BinaryOp", op: t.value, left, right };
    }
    return left;
  }

  function parseUnary() {
    if (peek() && peek().type === TOK.OP && (peek().value === "-" || peek().value === "!")) {
      const op = eat().value;
      return { kind: "Unary", op, operand: parseUnary() };
    }
    return parsePostfix();
  }

  function parsePostfix() {
    let node = parsePrimary();
    while (peek()) {
      if (check(".")) {
        eat(".");
        const name = eat();
        node = { kind: "Member", target: node, name: name.value };
      } else if (check("(")) {
        eat("(");
        const args = [];
        while (!check(")")) {
          args.push(parseExpression());
          if (!check(")")) eat(",");
        }
        eat(")");
        node = { kind: "Call", callee: node, args };
      } else if (check("[")) {
        eat("[");
        const idx = parseExpression();
        eat("]");
        node = { kind: "Index", target: node, index: idx };
      } else break;
    }
    return node;
  }

  function parsePrimary() {
    const t = peek();
    if (!t) throw new Error("Unexpected end of expression");

    if (t.type === TOK.NUMBER) { eat(); return { kind: "Number", value: t.value }; }
    if (t.type === TOK.STRING) {
      eat();
      return { kind: t.isChar ? "Char" : "String", value: t.value };
    }
    if (t.type === TOK.KEYWORD && (t.value === "true" || t.value === "false")) {
      eat(); return { kind: "Bool", value: t.value === "true" };
    }
    if (t.type === TOK.KEYWORD && t.value === "null") { eat(); return { kind: "Null" }; }
    if (t.type === TOK.KEYWORD && t.value === "this") { eat(); return { kind: "This" }; }
    if (t.type === TOK.KEYWORD && t.value === "super") { eat(); return { kind: "Super" }; }
    if (t.type === TOK.KEYWORD && t.value === "new") {
      eat();
      const cls = eat();
      if (check("[")) {
        const dims = [];
        while (check("[")) {
          eat("[");
          const d = check("]") ? null : parseExpression();
          eat("]");
          dims.push(d);
        }
        return { kind: "NewArray", element: cls.value, dims };
      }
      eat("(");
      const args = [];
      while (!check(")")) {
        args.push(parseExpression());
        if (!check(")")) eat(",");
      }
      eat(")");
      return { kind: "NewObject", className: cls.value, args };
    }
    if (t.type === TOK.IDENT || t.type === TOK.TYPE) {
      eat();
      return { kind: "Ident", name: t.value };
    }
    if (t.value === "(") {
      eat("(");
      const expr = parseExpression();
      eat(")");
      return expr;
    }
    throw new Error(`Unexpected token '${t.value}'`);
  }

  return parseProgram();
}

// -------------------- AST renderer -----------------------------------------

function ASTNode({ node }) {
  if (!node) return null;
  const head = (label, accent) => (
    <div className={`ast-head ast-head--${accent}`}>
      <span className="ast-kind">{label}</span>
    </div>
  );

  switch (node.kind) {
    case "Program":
      return (
        <div className="ast-node ast-program">
          {head(`Program · ${node.classes.length} class(es)`, "blue")}
          <div className="ast-children">
            {node.classes.map((c, i) => <ASTNode key={i} node={c} />)}
          </div>
        </div>
      );
    case "Class":
      return (
        <div className="ast-node">
          {head(`Class · ${node.name}${node.parent ? ` extends ${node.parent}` : ""}`, "purple")}
          <div className="ast-children">
            {node.members.map((m, i) => <ASTNode key={i} node={m} />)}
          </div>
        </div>
      );
    case "Method": {
      const sig =
        (node.isStatic ? "static " : "") +
        (node.returnType ? `${node.returnType} ` : "kaam ") +
        node.name +
        "(" +
        node.params.map((p) => `${p.type} ${p.name}`).join(", ") +
        ")";
      return (
        <div className="ast-node">
          {head(`Method · ${sig}`, "pink")}
          <ASTNode node={node.body} />
        </div>
      );
    }
    case "Field":
      return (
        <div className="ast-node">
          {head(`Field · ${node.type} ${node.name}`, "green")}
          {node.init && (
            <div className="ast-row"><span className="ast-key">init</span><ASTNode node={node.init} /></div>
          )}
        </div>
      );
    case "Block":
      return (
        <div className="ast-node">
          {head(`Block · ${node.body.length} stmt(s)`, "blue")}
          <div className="ast-children">
            {node.body.map((s, i) => <ASTNode key={i} node={s} />)}
          </div>
        </div>
      );
    case "Let":
      return (
        <div className="ast-node">
          {head(`Let · ${node.type} ${node.name}`, "purple")}
          {node.value && (
            <div className="ast-row"><span className="ast-key">value</span><ASTNode node={node.value} /></div>
          )}
        </div>
      );
    case "Assign":
      return (
        <div className="ast-node">
          {head("Assign · =", "green")}
          <div className="ast-row"><span className="ast-key">target</span><ASTNode node={node.target} /></div>
          <div className="ast-row"><span className="ast-key">value</span><ASTNode node={node.value} /></div>
        </div>
      );
    case "If":
      return (
        <div className="ast-node">
          {head("If", "pink")}
          <div className="ast-row"><span className="ast-key">cond</span><ASTNode node={node.cond} /></div>
          <div className="ast-row"><span className="ast-key">then</span><ASTNode node={node.thenBranch} /></div>
          {node.elseBranch && (
            <div className="ast-row"><span className="ast-key">else</span><ASTNode node={node.elseBranch} /></div>
          )}
        </div>
      );
    case "While":
      return (
        <div className="ast-node">
          {head("While", "pink")}
          <div className="ast-row"><span className="ast-key">cond</span><ASTNode node={node.cond} /></div>
          <div className="ast-row"><span className="ast-key">body</span><ASTNode node={node.body} /></div>
        </div>
      );
    case "Return":
      return (
        <div className="ast-node">
          {head("Return", "pink")}
          {node.value && <div className="ast-row"><span className="ast-key">value</span><ASTNode node={node.value} /></div>}
        </div>
      );
    case "Throw":
      return (
        <div className="ast-node">
          {head("Throw", "pink")}
          <ASTNode node={node.value} />
        </div>
      );
    case "Try":
      return (
        <div className="ast-node">
          {head(`Try${node.catchName ? ` · catch(${node.catchName})` : ""}${node.finallyBlock ? " · finally" : ""}`, "pink")}
          <div className="ast-row"><span className="ast-key">try</span><ASTNode node={node.block} /></div>
          {node.catchBlock && <div className="ast-row"><span className="ast-key">catch</span><ASTNode node={node.catchBlock} /></div>}
          {node.finallyBlock && <div className="ast-row"><span className="ast-key">finally</span><ASTNode node={node.finallyBlock} /></div>}
        </div>
      );
    case "ExpressionStatement":
      return <ASTNode node={node.expression} />;
    case "BinaryOp":
      return (
        <div className="ast-node">
          {head(`BinaryOp · ${node.op}`, "green")}
          <div className="ast-row"><span className="ast-key">left</span><ASTNode node={node.left} /></div>
          <div className="ast-row"><span className="ast-key">right</span><ASTNode node={node.right} /></div>
        </div>
      );
    case "Unary":
      return (
        <div className="ast-node">
          {head(`Unary · ${node.op}`, "green")}
          <ASTNode node={node.operand} />
        </div>
      );
    case "Call": {
      const calleeText =
        node.callee.kind === "Ident"
          ? `${node.callee.name}()`
          : node.callee.kind === "Member"
          ? `.${node.callee.name}()`
          : "call()";
      return (
        <div className="ast-node">
          {head(`Call · ${calleeText}`, "purple")}
          <div className="ast-row"><span className="ast-key">callee</span><ASTNode node={node.callee} /></div>
          <div className="ast-row">
            <span className="ast-key">args [{node.args.length}]</span>
            <div className="ast-children">
              {node.args.map((a, i) => <ASTNode key={i} node={a} />)}
            </div>
          </div>
        </div>
      );
    }
    case "Member":
      return (
        <div className="ast-node">
          {head(`Member · .${node.name}`, "purple")}
          <ASTNode node={node.target} />
        </div>
      );
    case "Index":
      return (
        <div className="ast-node">
          {head("Index", "purple")}
          <div className="ast-row"><span className="ast-key">target</span><ASTNode node={node.target} /></div>
          <div className="ast-row"><span className="ast-key">index</span><ASTNode node={node.index} /></div>
        </div>
      );
    case "NewObject":
      return (
        <div className="ast-node">
          {head(`new ${node.className}()`, "purple")}
          {node.args.length > 0 && (
            <div className="ast-row">
              <span className="ast-key">args [{node.args.length}]</span>
              <div className="ast-children">
                {node.args.map((a, i) => <ASTNode key={i} node={a} />)}
              </div>
            </div>
          )}
        </div>
      );
    case "NewArray":
      return (
        <div className="ast-node">
          {head(`new ${node.element}[${node.dims.length}D]`, "purple")}
        </div>
      );
    case "Number": return <div className="ast-leaf ast-leaf--number">num · {node.value}</div>;
    case "String": return <div className="ast-leaf ast-leaf--string">sab · "{node.value}"</div>;
    case "Char":   return <div className="ast-leaf ast-leaf--string">ek · '{node.value}'</div>;
    case "Bool":   return <div className="ast-leaf ast-leaf--bool">kya · {String(node.value)}</div>;
    case "Null":   return <div className="ast-leaf">null</div>;
    case "This":   return <div className="ast-leaf ast-leaf--ident">this</div>;
    case "Super":  return <div className="ast-leaf ast-leaf--ident">super</div>;
    case "Ident":  return <div className="ast-leaf ast-leaf--ident">ident · {node.name}</div>;
    default: return <div className="ast-leaf">{node.kind}</div>;
  }
}

// -------------------- Component --------------------------------------------

const SAMPLE = `// DhrLang — try editing this. The AST below updates live.
// Real syntax: num/duo/sab/kya/ek as types, kaam for methods.
class Main {
    static kaam main() {
        num radius = 12;
        duo pi = 3.14;
        num area = pi * radius * radius;

        sab greet = "Hello, recruiter";
        printLine(greet);
        printLine(area);
    }
}`;

const PRESETS = [
  {
    label: "OOP",
    code: `class Animal {
    protected sab name;
    kaam init(sab name) {
        this.name = name;
    }
    kaam makeSound() {
        printLine(this.name + " makes a sound");
    }
}
class Dog extends Animal {
    kaam makeSound() {
        printLine(this.name + " barks!");
    }
}`,
  },
  {
    label: "Arrays",
    code: `class NDArrayDemo {
    static kaam main() {
        num[][] m = new num[3][4];
        m[0][0] = 1;
        m[2][3] = 7;
        num i = 0;
        while (i < 3) {
            printLine(m[i][0]);
            i = i + 1;
        }
    }
}`,
  },
  {
    label: "Try / catch",
    code: `class ErrorExample {
    static kaam main() {
        try {
            throw "boom";
        } catch (err) {
            printLine("Caught: " + err);
        } finally {
            printLine("Cleanup");
        }
    }
}`,
  },
];

function DhrLangPlayground() {
  const [src, setSrc] = useState(SAMPLE);
  const { ref, revealed } = useReveal({ threshold: 0.05 });
  const editorRef = useRef(null);

  const result = useMemo(() => {
    try {
      const tokens = tokenize(src);
      const ast = parse(tokens);
      return { ok: true, tokens, ast };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }, [src]);

  return (
    <section
      ref={ref}
      className={`signature-section reveal ${revealed ? "reveal-in" : ""}`}
      aria-labelledby="signature-heading"
    >
      <Container>
        <div className="signature-eyebrow">
          <span className="signature-dot" />
          Signature · live in your browser
        </div>
        <h2 id="signature-heading" className="signature-heading">
          Watch <span className="purple">DhrLang</span> parse, in real time.
        </h2>
        <p className="signature-sub">
          DhrLang is a statically-typed, class-based language I built from
          scratch on the JVM — Hindi-rooted English keywords (<code>num</code>,{" "}
          <code>duo</code>, <code>sab</code>, <code>kya</code>, <code>ek</code>,{" "}
          <code>kaam</code>), generics, multi-dim arrays, and three execution
          backends (AST · IR · bytecode). Below is the same hand-written
          tokenizer and recursive-descent parser shape the real compiler
          uses — running on every keystroke, in your browser. No video. No
          server.
        </p>

        <div className="playground">
          <div className="playground-pane playground-pane--editor">
            <div className="playground-toolbar">
              <div className="playground-dots" aria-hidden="true">
                <span /><span /><span />
              </div>
              <div className="playground-title">Main.dhr</div>
              <div className="playground-presets">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    className="preset-chip"
                    onClick={() => {
                      setSrc(p.code);
                      editorRef.current?.focus();
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              ref={editorRef}
              className="playground-editor"
              spellCheck={false}
              value={src}
              onChange={(e) => setSrc(e.target.value)}
              aria-label="DhrLang source code"
            />
            <div className="playground-meta">
              <span>{src.split("\n").length} lines · {src.length} chars</span>
              <span>{result.ok ? `${result.tokens.length} tokens` : "—"}</span>
            </div>
          </div>

          <div className="playground-pane playground-pane--ast">
            <div className="playground-toolbar">
              <div className="playground-title">
                {result.ok ? "AST · live" : "Parse error"}
              </div>
              <div className={`playground-status ${result.ok ? "ok" : "err"}`}>
                {result.ok ? "✓ parsed" : "✕ failed"}
              </div>
            </div>
            <div className="playground-output">
              {result.ok ? (
                <ASTNode node={result.ast} />
              ) : (
                <div className="playground-error">
                  <strong>Parser said:</strong>
                  <code>{result.error}</code>
                  <p>
                    Try the <em>OOP</em>, <em>Arrays</em>, or{" "}
                    <em>Try / catch</em> presets above to see a clean parse,
                    or check that you've wrapped code in a{" "}
                    <code>class … {"{ … }"}</code>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="signature-footnote">
          <span>
            Parser-level surface only. Type checking, generics, IR lowering,
            and the bytecode + EVM backends live in the full compiler.
          </span>
          <a
            href="https://github.com/dhruv-15-03/DhrLang"
            target="_blank"
            rel="noreferrer"
          >
            View the v3.0.0 compiler on GitHub →
          </a>
        </div>
      </Container>
    </section>
  );
}

export default DhrLangPlayground;

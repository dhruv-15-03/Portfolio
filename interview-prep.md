# Interview Prep — Dhruv Rastogi

> **Window:** ~24 days to 30-Jun (cut-off for the original ask), and 4-6 weeks total for interviews landing offers.
> **Profile baseline:** LeetCode Knight (≈2,000-2,200 rating, 1,000+ solved) · Java/Spring production · OSS depth · ~1 YoE FTE.
> **What's strong already:** medium DSA, Java semantics, basic CI/CD, Azure surface knowledge.
> **What needs work:** system-design at scale, behavioral / Amazon LP rehearsal, HFT-style aptitude, RAG-system-design rounds, "tell me about a time you failed" answer for <2 YoE.

---

## The 28-day plan (calibrate to your actual interview load — accelerate if loops start sooner)

| Week | DSA (1 h/day) | System Design (1 h/day) | Behavioral (30 min/day) | Company-specific (1 h/day) |
|---|---|---|---|---|
| **W1** | Topic gaps: DP variants, segment-tree refresh, advanced graph | DDIA chapters 1-4; Alex Xu Vol 1: URL shortener, rate limiter | Build STAR story bank (6 stories) | Amazon LP study (16 principles, 1 story per principle) |
| **W2** | Hard-tier patterns (LC 250-350 of NeetCode Hard) | Alex Xu: news feed, chat, file storage; AI design (RAG) | Practice 3 LP stories aloud | HFT OA prep (Quadeye sample / brain teasers) |
| **W3** | Mock-interview style problems (45-min timed) | Indian fintech designs: payments idempotency, ledger, fraud | Mock behavioral round (Pramp) | Top 3 active loops — re-read team blogs, prep questions |
| **W4** | Refine weakest topic from mocks | Refine weakest design from mocks; 2 deep dives | "Tell me about a time you failed" final answer | Day-before checklist + tax-on-rest schedule |

---

## Track 1 — DSA refresh *(Knight rating; just plug holes)*

You're already strong on medium. The gaps that show up at FAANG / HFT loops at your level:

### Priority topics *(rank by frequency in India FAANG + HFT loops)*

1. **DP variants** — bitmask DP, tree DP, state-compression. (Common at Microsoft IDC, Atlassian.)
2. **Graphs (advanced)** — Tarjan's SCC, articulation points / bridges, Eulerian path, 2-SAT. (HFT bonus; Google sometimes.)
3. **Segment tree / Fenwick / lazy propagation.** (HFT + ICPC-flavored interviewers at Microsoft / Amazon.)
4. **String algorithms** — Z-function, KMP, Manacher, suffix arrays. (Google L3, occasionally HFT.)
5. **Number theory / combinatorics** — modular inverse, Lucas, Catalan, inclusion-exclusion. (HFT only.)
6. **Greedy + interval problems** — sweep-line, exchange argument. (Universal.)
7. **Hashmaps + heap + two pointers** — already strong, just don't get rusty. **Spend 5 min/day** on one random easy.

### Daily volume target

- **2 problems/day** at LC Medium-Hard, **45-min timed**, in **Java** (your interview language).
- **1 problem/day** review of an old solved problem; can you re-solve it cold? Knight-tier interviewers test pattern recall, not novelty.
- **1 hard/week** — pick from one of the priority topics above.

### Resources

| Resource | Use for | Cost |
|---|---|---|
| **NeetCode 150 + 250** | DP, graphs, intervals — patterns ladder | Free |
| **LeetCode Premium** (you likely have it) | Company-tagged questions for your target list | $35/mo |
| **Codeforces** (Div 2 round if time) | HFT-style problem solving, fast | Free |
| **InterviewBit (75-list)** | Microsoft / Amazon / Google India-specific frequency | Free + paid |
| **AlgoMonster** | Visual pattern explanations | $25/mo |

**Anti-pattern:** Don't do random LC Daily. Pick from priority list above; pattern-coverage > volume.

---

## Track 2 — System design

### Reality check at your level

- At SDE-1 / SWE L3, you'll get **1 system-design round** (vs 2-3 for SDE-2/3). Bar is "can you reason about a real system end-to-end without panicking" — **not** "design Google Search from scratch."
- Indian product cos (Razorpay, PhonePe, CRED) ask **payments-specific** design more than generic.
- AI cos ask **RAG-architecture + eval design**, sometimes vector-store trade-offs.

### Five canonical FAANG-tier problems *(in order)*

1. **URL shortener** — covers consistent hashing, base62 encoding, read/write ratio, caching.
2. **Rate limiter** — token bucket vs leaky bucket vs sliding window, distributed coordination.
3. **News feed / Twitter timeline** — fan-out on write vs read, push vs pull.
4. **Chat (WhatsApp-style)** — long polling vs WebSocket, message persistence, presence.
5. **File / blob storage (Dropbox-style)** — chunking, dedup, sync, conflict resolution.

**Drill format:** 45 min self-timed. Whiteboard / Excalidraw. Talk out loud. Record yourself if possible — recruiters notice when you go quiet.

### Indian fintech-specific *(for Razorpay / PhonePe / CRED / Zeta loops)*

6. **Payments idempotency design** — what happens when the network retries? Idempotency keys, transaction state machine, exactly-once semantics.
7. **Ledger / double-entry bookkeeping system** — debits / credits, audit log, reconciliation.
8. **Real-time fraud detection** — streaming features, rule engine vs ML, latency budgets.

### AI-systems design *(for LangChain / Atlan / SpotDraft / Cohere)*

9. **End-to-end RAG architecture** — ingestion pipeline (chunking strategy, embedding, vector store choice), retrieval (hybrid BM25 + dense), reranker, prompt assembly, response generation, citation extraction, eval loop. **Be ready to defend every choice with a trade-off.**
10. **Eval design for an LLM application** — offline (golden set, LLM-as-judge), online (thumbs feedback, A/B), regression-detection. LangSmith / Phoenix / custom.
11. **Vector store trade-offs** — Pinecone (managed) vs pgvector (cheap, integrates with Postgres) vs Weaviate (open source, hybrid) vs Qdrant (Rust-native, fast). Pick one and know **why.**
12. **Hallucination mitigation patterns** — citation-grounded UX (you already shipped this in AI-Court), constrained decoding, structured output validation, retrieval-confidence thresholds.

### Resources

| Resource | Use for | Cost |
|---|---|---|
| **DDIA** (Kleppmann) | The book. Chapters 1, 3, 7, 8 are mandatory. Read 1 chapter / 3 days. | ₹600 |
| **Alex Xu — System Design Interview Vol 1** | Canonical 5 problems with diagrams. Read cover-to-cover. | ₹800 |
| **Alex Xu — Vol 2** | Distributed systems deep dives — read after Vol 1. | ₹800 |
| **donnemartin/system-design-primer** (GitHub) | Free comprehensive notes; print the cheat-sheets. | Free |
| **ByteByteGo newsletter** | Visual recaps of system design topics; subscribe free tier. | Free / $10/mo |
| **engineering.cred.club + razorpay.com/blog/engineering** | India fintech architectures (real code, real numbers). | Free |
| **LangChain docs (Production guide)** | RAG patterns from the framework you've already used. | Free |
| **Eugene Yan's blog** (eugeneyan.com) | LLM application patterns, eval, RAG — the best practical writing on this. | Free |

---

## Track 3 — Behavioral / Leadership Principles

### Why this matters *(don't underweight it)*

- **Amazon** runs full Bar-Raiser LP rounds. At SDE-I, **at least 2 rounds are 50 % LP questions.** "I don't have a story" = rejection.
- **Atlassian** has a values-heavy behavioral round (their five values).
- **Google** "Googleyness" round is less formal but still tests collaboration / ambiguity / failure-handling stories.
- **HFTs** test behavioral too — "tell me about a hard technical problem" → they're testing whether you'll bullshit them.

### Build a STAR story bank *(6-8 stories you can reshape)*

Format every story as **Situation → Task → Action → Result** in ≤ 90 seconds:

| Story ID | What happened | LPs it covers | Stack / system |
|---|---|---|---|
| **MAQ-pipeline-reliability** | When 500K records/day pipeline started failing intermittently and you tuned alerting + fixed root cause | Customer Obsession, Ownership, Dive Deep | Azure Fabric / Databricks |
| **RecruitCRM-perf-30pct** | When you cut API response times 30 %, what you measured, what you changed | Bias for Action, Deliver Results | Spring Boot / MySQL |
| **CEERAS-10k-tx** | When the bidding system needed sub-second latency at 10k tx/day, async + Redis design | Invent and Simplify, Are Right A Lot | Java / Microservices / Redis |
| **DhrLang-bytecode-backend** | When you decided to add a third execution backend (JVM bytecode) and why | Think Big, Learn and Be Curious | Compiler design |
| **DhrLang-bug-IR** | A nasty bug in the IR lowering that took N days to find | Dive Deep, Insist on Highest Standards | Compiler design |
| **AI-Court-citations** | Why citation-grounded UX, what alternative you rejected | Customer Obsession, Earn Trust | LangChain / RAG |
| **OSS-publish-boot-usage** | Decision to OSS boot-usage under Apache-2.0 vs keep internal | Ownership, Think Big | Spring Boot |
| **Final-sem-+-FT** | Managing degree completion alongside full-time work (frame as discipline, not split attention) | Earn Trust, Deliver Results | Life / time management |

**Drill:** record yourself telling each story in **90 seconds.** Listen back. Cut filler words ("um", "like", "basically"). Recruiters notice.

### Amazon Leadership Principles *(the 16, ranked by interview frequency)*

1. **Customer Obsession** — frame everything around the user's outcome.
2. **Ownership** — what did you own *beyond* your assigned scope?
3. **Invent and Simplify** — a design decision where you removed complexity.
4. **Are Right, a Lot** — a judgment call that turned out right; **also** willing to change your mind given new data.
5. **Learn and Be Curious** — DhrLang itself is a Learn-and-Be-Curious story.
6. **Hire and Develop the Best** — at <2 YoE harder; use a peer-mentoring story if any.
7. **Insist on Highest Standards** — a thing you pushed back on as "not good enough."
8. **Think Big** — DhrLang as "I built a whole language" works here.
9. **Bias for Action** — a moment you shipped without waiting for full info.
10. **Frugality** — a constraint-driven solution.
11. **Earn Trust** — admitting something went wrong + how you handled it.
12. **Dive Deep** — a debugging story with technical depth.
13. **Have Backbone; Disagree and Commit** — a disagreement that you handled well.
14. **Deliver Results** — a measurable outcome (the 30 % API speedup, the 60 % manual-effort reduction).
15. **Strive to Be Earth's Best Employer** — usually low-priority at SDE-I.
16. **Success and Scale Bring Broad Responsibility** — usually low-priority at SDE-I.

**Map each story to 2-3 LPs.** When asked an LP question, pick the *best* story for *that* LP, even if you've used it for another principle in a prior round.

### "Tell me about a failure" *(the most-asked behavioral question)*

For <2 YoE, the answer needs to be:

- **Real** (not "I work too hard" — interviewer's eye-roll filter is strong)
- **Self-contained** (don't blame teammates / process / org)
- **Resolved** (what you'd do differently next time, concretely)
- **Proportional** (not "I once forgot to push code" — too small; not "I tanked production" — too big at your level)

**A strong candidate template for you:**

> *In CEERAS, I shipped the bidding system's async queue with a retry policy that I'd inherited from a tutorial — exponential backoff, 5 retries. In a load test, a single bad message kept cycling through the dead-letter and got re-processed, multiplying load instead of relieving it. I'd skipped the step of asking "what's the failure mode I'm designing for?" before copying the policy. Fix was to add a poison-message detector and cap retries with a fixed jitter window. Next time, before I copy a pattern from a tutorial I write the failure-mode I'm guarding against — one sentence — before I write the code. It's a habit now.*

The shape: **specific bug → root cause was a thinking gap, not a knowledge gap → concrete habit change.** That's what they're listening for.

---

## Track 4 — HFT-specific *(Quadeye, Graviton, Tower, Optiver, IMC, AlphaGrep)*

### The shape of HFT loops

1. **Online Assessment (OA)** — numerical aptitude + DSA. 60-90 min.
2. **Technical screen 1** — DSA hard-tier, ~45 min.
3. **Technical screen 2** — systems / OS / network / concurrency.
4. **Brain-teaser / probability round** — 30-45 min. Sometimes embedded in earlier rounds.
5. **Hiring manager** — behavioral + "why us, why HFT."
6. **Offer.**

### OA / brain-teaser drills

**Aptitude (Quadeye / Optiver-style):**

- Mental math: 2-digit × 2-digit in head, fast fraction arithmetic, percentages.
- Series and pattern questions (number, alphabet, shape).
- Number-theory puzzles (next prime, GCD/LCM tricks).
- **Resource:** Heard On The Street: Quantitative Questions from Wall Street Job Interviews by Timothy Falcon Crack. The single canonical book. Old but still used.

**Probability / expected value:**

- Coin flip, dice, urn problems.
- Bayes' theorem applications.
- Monty Hall + variants.
- Random walks, hitting times.
- Sampling without replacement.
- **Resource:** "A Practical Guide To Quantitative Finance Interviews" by Xinfeng Zhou. Brain-teaser archetypes with solutions.

**Brain teasers:**

- "100 prisoners and a lightbulb"
- "9 balls, find the heavier one with a balance"
- "Pirates and gold" (game-theory induction)
- **Resource:** brainstellar.com (free, India-friendly).

**Daily drill in W2:** 3 brain teasers + 5 mental-math reps, 20 min total.

### Systems / OS / network round preparation

You don't need to be a C++ wizard, but you need the **vocabulary** so interviewers don't write you off:

- **Memory hierarchy:** L1/L2/L3 cache, cache line, **false sharing**, NUMA.
- **Concurrency primitives:** mutex, spinlock, lock-free queue, atomics, memory ordering (`memory_order_acquire`, `_release`, `_relaxed`).
- **Branch prediction**, pipeline stalls, CPU instruction reordering.
- **TCP/UDP differences**, kernel bypass (DPDK / Solarflare / Onload — mention these by name), zero-copy.
- **Linux:** epoll vs select, huge pages, scheduler basics (SCHED_FIFO for HFT), CPU pinning.

**Resource:** *The Linux Programming Interface* by Michael Kerrisk (skim ch 1-5 and concurrency chapters). Free 2-page cheat-sheet from Brendan Gregg's blog covers most of it visually.

### "Why HFT?" answer

Don't say "the money." Don't say "the prestige." Say something true about **the engineering culture**:

> *HFT is one of the few engineering shops where latency is a first-class product metric and every microsecond is observable end-to-end. The DhrLang work taught me that I enjoy the layer between hardware and the language — IR design, bytecode generation, runtime — and HFT is the natural production version of that. I don't have C++ low-latency experience yet, but I have the systems instinct, and I'd ramp on the language while the systems thinking compounds.*

(Adapt to your real motivation. The shape is: connect a real personal interest to HFT's specific properties.)

---

## Track 5 — AI / LLM systems rounds *(LangChain, Atlan, SpotDraft, Cohere)*

### Question patterns

1. **"Walk me through your AI-Court architecture."** Be ready in **5 minutes** with a diagram. Cover: ingestion, retrieval, generation, citation extraction, deployment, what you'd change.
2. **"How would you eval an LLM legal-answer system?"** Cover golden set, LLM-as-judge, human-in-the-loop sampling, drift detection.
3. **"How do you reduce hallucination?"** Citation-grounded UX (you shipped this!), constrained decoding, retrieval confidence thresholds, structured output validation.
4. **"Pick a vector store for [X scenario]. Defend it."** Know the trade-off matrix below.
5. **"Design a RAG system for [client use case]."** Same as system design but with retrieval, prompts, eval.

### Vector store decision matrix *(memorize)*

| Choice | Pick when | Avoid when |
|---|---|---|
| **pgvector** | Already on Postgres; <10M vectors; cost-sensitive | >10M vectors; need ANN-tuning knobs |
| **Pinecone** | Want managed, fast time-to-prod, willing to pay | Need self-hosted; sensitive data lock-in concerns |
| **Weaviate** | Need hybrid (BM25 + dense) out-of-box; open source | Tiny scale (pgvector wins) |
| **Qdrant** | Rust-fast, self-host, need filters + hybrid | Don't want to operate yourself |
| **FAISS** *(in-process)* | Embedded, tiny scale, prototyping | Multi-tenant prod |

### Resources

- **Eugene Yan's blog** (eugeneyan.com) — the practical bible. Read *every* RAG post.
- **LangChain "Production" guide** + LangSmith eval docs.
- **Anthropic's "Building effective agents"** (2024 post) — defines vocabulary you'll be asked about.
- **OpenAI cookbook** — concrete RAG / eval patterns.

---

## Mock interviews

Don't skip these. The gap between "I know it" and "I can perform it in 45 min under pressure" is real.

| Service | Use for | Cost |
|---|---|---|
| **Pramp** (pramp.com) | Free peer-to-peer mocks; DSA + behavioral. Use 3-4×/week W3-W4. | Free |
| **Interviewing.io** | Mocks with real FAANG engineers; anonymous. Use 2× before any real loop. | $225 / hr (worth it) |
| **Exponent** (tryexponent.com) | System-design mocks specifically. | $99 / mo |
| **A friend at MAQ / RecruitCRM** | Free; even better if they've interviewed at one of your targets. Ask 2-3 friends to do 1 mock each. | Free |

**Calibration:** in W3, expect your first 2-3 mocks to feel rough. That's the entire point of doing them now and not on the real loop.

---

## Resource priority *(if you only buy 3 things)*

1. **DDIA** (₹600) — the book.
2. **Alex Xu Vol 1** (₹800) — system design.
3. **Heard On The Street** (₹800) — only if HFTs are in your top-10.

**If you only have 4 weeks:** skip the books, lean on free resources (donnemartin/system-design-primer + Eugene Yan's blog + NeetCode + brainstellar). Time spent reading is time NOT spent doing problems.

---

## Day-before / day-of checklist

**Night before:**
- [ ] Reread the role's JD and the team's most recent blog post.
- [ ] Reread your story bank (just the headlines — you don't need to re-memorize).
- [ ] Set out water + paper + 2 pens.
- [ ] Restart your laptop; close 50 tabs.
- [ ] Test Zoom / Hangouts / Teams audio. Headphones tested.
- [ ] **Sleep early. Don't grind LC.** Marginal LC < marginal sleep.

**60 min before:**
- [ ] No coffee unless you always have coffee at this time. (Don't introduce a new variable.)
- [ ] Walk for 10 min outside if possible.
- [ ] Eat something light.
- [ ] Pull up: resume PDF, portfolio, GitHub, the role's JD.

**Round start:**
- [ ] Camera on. Eye contact at the camera (not screen).
- [ ] First 30 sec: warm "thanks for the time, looking forward to this" — humanize before the technical loop starts.
- [ ] **Repeat the question back** before solving — buys you 15 sec and prevents misreads.
- [ ] **Talk out loud throughout.** Silence = "I can't reason."
- [ ] If you get stuck: **state what you'd try next**, even if not solving fully. Interviewers grade your thinking, not just the answer.
- [ ] End every round: ask **one** specific question about the team / system. Not "what's the culture like" — "how does your team handle [specific eng-process question]?"

**Right after:**
- [ ] **Within 24 h:** send T9 (post-interview thank-you).
- [ ] In your tracker: update status, write 2 sentences on what went well / poorly, what to drill before next round.

---

## Sanity rule

You will not be fully ready in 4 weeks. **Nobody is.** The goal is to be ready *enough that the variance of interviewer / question difficulty matters more than your preparation gap.* That's the bar — and you can clear it.

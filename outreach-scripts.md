# Outreach Scripts — Dhruv Rastogi

> **Goal:** maximize the ratio of (replies + interviews) ÷ (hours spent writing messages).
> **Posture:** confident, specific, brief. Lead with the shipped artifact, not the request.

---

## How to use this document

1. **Pick the right template** by company class (HFT / FAANG / AI / Indian product / DevTools).
2. **Fill placeholders** (`[Name]`, `[Company]`, `[Team]`, `[Stack/Topic]`). Never send a template with placeholders unfilled — recruiters can spot a 30-second send.
3. **Edit at least one line per email** so it reads like *you* wrote it, not a template. Add a sentence specific to that company — a product you use, a blog post you read, a commit you saw on their GitHub. This is the line that gets a reply, and it's the one thing no template can do for you.
4. **Subject line matters more than body** (templates below).
5. **Send via the right channel:** LinkedIn InMail for FAANG recruiters, direct email for HFT (`career@quadeye.com`), engineering DMs for AI/startup founders.
6. **Always link `dhruvrastogi.me/resume`** — never attach PDFs in first contact (corp filters drop them).
7. **Log every send** in the `applications` SQL table (queries at the bottom).

---

## Variant selection (which template for which company)

| Class | Primary template | Body angle (lead with) |
|---|---|---|
| **HFT** (Graviton, Quadeye, Tower, Optiver, IMC, AlphaGrep) | T2B / T3A | DhrLang compiler + IR/bytecode + Knight |
| **FAANG India** (Google, Microsoft, Amazon, Atlassian) | T2A + T6 | MAQ scale + Azure (for MSFT) / Java production + OSS |
| **AI cos** (LangChain, Atlan, Cohere, SpotDraft, Pinecone) | T2C / T7 | AI-Court (RAG / LangChain) + DhrLang systems depth |
| **Indian product** (Razorpay, PhonePe, CRED, Groww, Postman, Zeta) | T2A + T5 | Java/Spring exact stack + production scale at MAQ |
| **DevTools / Platform** (Confluent, Snyk, Hasura, Sonatype) | T2A + T5 | DhrLang + boot-usage (OSS Java) + Spring Boot production |
| **Any** — when an AKTU alumnus is identified | T6 | Warm "fellow AKTU" + specific ask |

---

## Subject lines (the only line that decides "open vs delete")

✅ **Good:**
- `SDE-1 application — Dhruv Rastogi — Knight + DhrLang author — 2-week notice`
- `Re: [their exact job-posting title] — backend engineer, 2-week notice`
- `[Team name] application — JVM compiler + Azure background`
- `AI-Court (built on LangChain) — Dhruv Rastogi, intro + application`
- `Question about SDE openings on the [team] team` *(only if you actually have a question)*

❌ **Bad (skip on sight):**
- `Job application`
- `Application for the role of Software Development Engineer at [Company]` *(templated)*
- `Seeking opportunities` *(passive)*
- `Looking for a job` *(low-status framing)*
- `My resume for your consideration`
- Anything starting `Dear Sir/Madam`

---

## Templates

> Lengths are calibrated. **Don't pad.** Recruiters skim the first 80 words.

### T1 — LinkedIn connection request *(300-char hard cap)*

**T1A — AKTU alumnus at target company:**
> Hi [Name], fellow AKTU CSE here (graduating July '26). Backend engineer at MAQ Software — author of DhrLang (JVM language, v3.0.0) and an Apache-2.0 Spring Boot starter. Targeting SDE-1 at [Company]. Would value 10 min on your perspective on the team — open to a chat?

**T1B — Recruiter at target company:**
> Hi [Name], backend engineer at MAQ (Azure / Java), 2-week notice, targeting SDE-1 at [Company]. Shipped an Apache-2.0 Spring Boot starter + a JVM language (DhrLang v3.0.0). Portfolio: dhruvrastogi.me. Open to a quick chat on open roles?

**T1C — Engineer at target company (nerd-snipe):**
> Hi [Name], saw you work on [team/area] at [Company]. I shipped DhrLang — statically-typed JVM language, 3 backends, LSP, 1,000+ tests in CI. Curious how [Company] thinks about [specific technical aspect]. Open to a quick chat?

---

### T2A — LinkedIn InMail to FAANG-India recruiter *(~230 words)*

> **Subject:** SDE-1 application, 2 weeks notice — Dhruv Rastogi
>
> Hi [Recruiter Name],
>
> I'm a backend engineer at MAQ Software, currently on the Azure ETL pipelines that move 500K+ records a day at 99.5% accuracy. I'd like to apply to SDE-1 at [Company] India and was hoping you could point me to the right team or process.
>
> Reason I'm reaching out specifically about [Company]: [one sentence — your team's work on X, a blog post you read, a product I use]. The Java + Azure side of my background lines up with what the IDC backend teams do.
>
> A bit more on me:
>
> - 15 months across an internship, a contract, and the current full-time role.
> - Two open-source projects shipped: DhrLang (a statically-typed JVM language I wrote end to end, v3.0.0) and boot-usage (Apache-2.0 Spring Boot starter).
> - LeetCode Knight, 1,000+ solved.
> - 2-week notice at MAQ, so I can move fast if it works out.
> - Open to Bengaluru, Hyderabad, Pune, or remote.
>
> Portfolio (with an in-browser DhrLang playground): dhruvrastogi.me
> Resume: dhruvrastogi.me/resume
>
> Happy to do a screen whenever works for you this week or next.
>
> Thanks,
> Dhruv

---

### T2B — LinkedIn InMail to HFT recruiter *(~240 words)*

> **Subject:** SWE application, 2 weeks notice — DhrLang author, Knight
>
> Hi [Recruiter Name],
>
> I'd like to apply to [Company] for SWE / Quant Dev. Three things that might matter for the screen:
>
> 1. DhrLang — a statically-typed JVM language I wrote end to end (v3.0.0). Lexer, parser, type checker, IR lowering, three execution backends (AST interpreter, IR VM, JVM bytecode), an EVM compiler target, an LSP server, a published VS Code extension. 14 releases on GitHub. 1,000+ tests in CI with PIT mutation testing. github.com/dhruv-15-03/DhrLang
> 2. LeetCode Knight, 1,000+ problems solved.
> 3. Day job at MAQ Software, on the Azure ETL pipelines that move 500K+ records a day at 99.5% accuracy. 99.9% uptime SLA on owned systems.
>
> Also the author of boot-usage, an Apache-2.0 Spring Boot starter published as a Java package.
>
> I'm aware [Company]'s SWE work skews low-latency / C++; my production work is JVM. The DhrLang code is the closest analog to systems engineering on my profile (IR design, bytecode emission, runtime execution, CI-backed testing), and I'd be happy to walk through any part of it on a screen.
>
> 2-week notice at MAQ. [Delhi-based / Mumbai-based / open to relocation].
>
> Portfolio with the in-browser DhrLang playground: dhruvrastogi.me
> Resume: dhruvrastogi.me/resume
>
> Happy to take the OA or technical screen whenever works this week.
>
> Thanks,
> Dhruv

---

### T2C — LinkedIn InMail to AI / ML company recruiter *(~220 words)*

> **Subject:** Application — backend + LLM apps + AI systems
>
> Hi [Recruiter Name],
>
> Writing in about any open backend / LLM-applications / AI-systems role at [Company]. Three things most relevant for your team:
>
> 1. AI-Court — a deployed RAG legal-assistance platform I built on LangChain. Two-tier: Python ML/RAG core, JavaScript app shell, hosted on Vercel. Every generated answer links back to the source documents it was retrieved from, so when the model gets something wrong you can see where. github.com/dhruv-15-03/AI-CourtRoom
> 2. DhrLang (v3.0.0) — a statically-typed JVM language I wrote end to end: lexer, parser, type checker, IR lowering, three execution backends, LSP, 1,000+ tests in CI. The kind of systems work that maps to graph compilers, inference runtimes, and AI dev tooling. github.com/dhruv-15-03/DhrLang
> 3. Day job at MAQ Software, on the 500K+ records/day Azure pipelines under a 99.9% SLA.
>
> 2-week notice. Open to remote, or relocating to Bengaluru / Hyderabad.
>
> Portfolio: dhruvrastogi.me
> Resume (the AI/ML variant matches this role better): dhruvrastogi.me/resume
>
> Happy to chat this week.
>
> Thanks,
> Dhruv

---

### T3A — Cold email to `careers@` (HFT / Quadeye example) *(~210 words)*

> **To:** career@quadeye.com
> **Subject:** SWE application, 2 weeks notice — Dhruv Rastogi (DhrLang, Knight)
>
> Hi,
>
> Writing in about any open SWE role at Quadeye.
>
> Three things on me:
>
> - LeetCode Knight, 1,000+ problems solved.
> - DhrLang (v3.0.0): a statically-typed JVM language I wrote end to end — lexer, parser, type checker, IR lowering, three execution backends (AST interpreter, IR VM, JVM bytecode), LSP, 1,000+ tests in CI. github.com/dhruv-15-03/DhrLang
> - At MAQ Software currently, on Azure ETL pipelines (500K+ records/day, 99.9% uptime SLA).
>
> I know Quadeye's SWE side skews low-latency systems work and my production work is Java / Azure rather than C++. The DhrLang code is the closest analog to systems engineering on my profile (IR design, bytecode emission, runtime, CI-backed testing). Happy to take an OA or a systems-focused screen at your convenience.
>
> 2-week notice at MAQ. Delhi-based, open to relocation.
>
> Portfolio (with an in-browser DhrLang playground): dhruvrastogi.me
> Resume: dhruvrastogi.me/resume
>
> Thanks,
> Dhruv Rastogi
> +91-[your number]
> linkedin.com/in/dhruv-rastogi-3b744032b/
> github.com/dhruv-15-03

---

### T4 — Cold email to engineering manager *(team-specific, ~180 words)*

> **Subject:** [Team name] — Backend Engineer interest — Dhruv Rastogi
>
> Hi [Name],
>
> Reaching out directly because I'm specifically interested in **[Team Name]** at [Company], not a generic SDE role. [1-2 sentences on the team's actual problem — quote a blog post / talk / OSS commit they shipped. **This is the line that gets a reply.** Skip if you can't be specific.]
>
> **Quick signals on fit:**
> - [Most relevant production bullet — pick the one MAQ / RecruitCRM / CEERAS line that maps to *their* problem]
> - [Most relevant OSS bullet — DhrLang for compiler/runtime teams, AI-Court for AI teams, boot-usage for JVM/observability teams]
> - LeetCode Knight, 1,000+ solved.
>
> 2-week notice at MAQ Software. Open to relocation.
>
> If a referral makes more sense than a 1:1, happy to apply through your standard channel and have you flag my profile internally.
>
> Portfolio: dhruvrastogi.me  ·  GitHub: github.com/dhruv-15-03
>
> Best,
> Dhruv

---

### T5 — Engineer-to-engineer referral DM *(LinkedIn, ~120 words)*

> Hi [Name],
>
> Saw you work on [team / stack] at [Company]. I'm a backend engineer at MAQ Software, currently looking at [Company] for SDE-1. Two things you might find relevant:
>
> - **DhrLang** (github.com/dhruv-15-03/DhrLang) — a statically-typed JVM language with 3 execution backends, JVM bytecode generation, and LSP. v3.0.0, 1,000+ tests.
> - **AI-Court** (github.com/dhruv-15-03/AI-CourtRoom) — RAG legal platform on LangChain, deployed.
>
> Would you be open to referring me / a 15-min chat about [Company]'s [team]? **2-week notice — I can move fast.**
>
> Resume: dhruvrastogi.me/resume
>
> Either way — appreciate it.
>
> Best, Dhruv

---

### T6 — AKTU alumnus referral ask *(LinkedIn message, ~170 words)*

> Hi [Name],
>
> Saw you're at [Company] on the [team] team — fellow AKTU CSE here, graduating July '26, currently at MAQ Software as Associate SWE (started in November).
>
> Reaching out because I'm putting together SDE-1 applications and would really value 15 minutes of your perspective on the engineering culture at [Company], and, if it makes sense, a referral.
>
> Quick on me:
>
> - At MAQ on Azure data pipelines (500K records/day, 99.9% SLA)
> - DhrLang, a statically-typed JVM language I wrote end to end (v3.0.0): github.com/dhruv-15-03/DhrLang
> - boot-usage, an Apache-2.0 Spring Boot starter: github.com/dhruv-15-03/boot-usage
> - LeetCode Knight, 1,000+ solved
> - 2-week notice if I move
>
> Portfolio: dhruvrastogi.me · Resume: dhruvrastogi.me/resume
>
> Happy to make the referral as easy as possible on your end — pre-filled forms, JD-mapped notes, whatever's useful. And if a chat isn't possible right now, completely understand.
>
> Thanks,
> Dhruv

---

### T7 — Cold email to small AI-startup founder *(~190 words)*

> **Subject:** AI-Court (built on LangChain) — Dhruv Rastogi
>
> Hi [Founder Name],
>
> I built AI-Court, a deployed RAG legal-assistance platform on LangChain (github.com/dhruv-15-03/AI-CourtRoom). The thing I'm proudest of is the citation-grounded UX: every generated answer links back to the source documents it was retrieved from, so when the model gets something wrong it's actually inspectable.
>
> Writing in to ask about open roles at [Company] — backend, LLM applications, or AI systems. I'm a backend engineer at MAQ Software (Azure data pipelines, 500K+ records/day, 99.9% SLA), 2-week notice, open to remote.
>
> Other relevant work:
>
> - DhrLang (v3.0.0): a statically-typed JVM language I wrote end to end, with three execution backends, IR lowering, and JVM bytecode generation. Systems-side range, basically. github.com/dhruv-15-03/DhrLang
> - LeetCode Knight, 1,000+ solved.
>
> Portfolio: dhruvrastogi.me
> Resume (the AI/ML variant fits this role): dhruvrastogi.me/resume
>
> Even a 15-minute chat about what you're hiring for would mean a lot.
>
> Thanks,
> Dhruv

---

### T8 — Five-day silent follow-up *(~80 words)*

> Hi [Name],
>
> Following up on my note from [day, e.g. last Tuesday] about [role / topic]. One small update: [a *real* update — a commit shipped, a feature merged, a new cert. If nothing real, skip this line entirely.]
>
> Happy to take any next step on your timeline.
>
> Best,
> Dhruv

---

### T9 — Post-interview thank-you *(within 24 h, ~140 words)*

> **Subject:** Thanks — [round name], [Date]
>
> Hi [Interviewer Name],
>
> Thank you for the [round name — e.g. "system-design round"] earlier today.
>
> Two follow-ups:
>
> 1. On [the question / topic where you stumbled or could go deeper] — I thought more about it after the call and would address it like this: **[1–2 sentence cleaner answer]**. Not relitigating — just showing how I think when I have a few hours instead of a few minutes.
> 2. Looking forward to next steps. If there's anything else I can share — deeper dive on DhrLang or AI-Court, or context on [specific resume bullet] — happy to.
>
> Best,
> Dhruv

---

### T10 — Status check after silence *(post-interview, 5-7 days, ~70 words)*

> **Subject:** Re: [Original thread subject]
>
> Hi [Name],
>
> Wanted to check in on next steps for the [role] process at [Company]. I'm continuing to interview elsewhere and would prefer to make decisions with [Company] in the picture if possible.
>
> Happy to make myself available for the next round at short notice.
>
> Best,
> Dhruv

---

## Anti-patterns (never do these)

- ❌ Never lead with `I am writing to apply for the position of…` — sounds like a 2005 cover letter.
- ❌ Never lead with degree or marks. **Lead with the highest-leverage signal:** DhrLang for HFTs/AI, MAQ Azure for cloud cos, AI-Court for LLM cos.
- ❌ Never say `I'm willing to learn` — implies you don't already know. You have shipped artifacts; lead with them.
- ❌ Never apologize for time (`Sorry to bother you` / `I know you're busy`). Be respectful, but assume you bring value.
- ❌ Never use `kindly` or `do the needful`. Indian-English tells that flag "template" to international recruiters.
- ❌ Never ask `Are you hiring?` when their careers page answers it. Be specific about the role you're applying for.
- ❌ Never attach the resume in the first message — link to `dhruvrastogi.me/resume`. Attachments trigger corp spam filters.
- ❌ Never write a wall of text. **White space, bullets, scannable.**
- ❌ Never include a photo on the resume PDF (India-resume habit; non-standard internationally, and creates legal/bias issues for US/EU recruiters).
- ❌ Never list `MS Office, Microsoft Excel, Internet, Email` as skills. Your portfolio shows skills better than any list.
- ❌ Never use a "stack of certifications" image. The resume's certs line is enough.

---

## Channel rules

| Channel | When to use | Reply-rate expectation |
|---|---|---|
| **LinkedIn InMail (paid)** | FAANG recruiters, AI-co recruiters, anywhere recruiter has "Open to InMail" | 15-25 % if first 80 words are sharp |
| **LinkedIn connection request** *(with 300-char note)* | Engineers, AKTU alumni, EMs (when no email known) | 30-50 % accept; 10-20 % reply |
| **Cold email** *(careers@ or known engineer)* | HFTs (Quadeye accepts), small startups, when an EM's email is on a blog post | 5-15 %; volume game |
| **Naukri / company portal** *(application form)* | When no other channel exists; never the primary path | <2 % without a referral attached |
| **Twitter/X DM** | Tiny AI startups, where founders are active (Harrison Chase, Eric Bernhardsson) | High variance; only with a sharp opener |

**Rule of thumb:** for each company, try in this order — alumni referral → engineer-to-engineer DM → recruiter LinkedIn → cold email → portal-only application.

---

## Application-tracker SQL queries *(copy-paste into the `sql` tool any time)*

```sql
-- See what's queued and ready to send
SELECT a.id, c.name, c.tier, a.role_title, a.channel, a.next_action, a.next_action_due
FROM applications a JOIN companies c ON a.company_id = c.id
WHERE a.status = 'queued'
ORDER BY c.tier, a.next_action_due;

-- Mark an application as sent
UPDATE applications
SET status = 'applied',
    applied_at = date('now'),
    next_action = 'follow-up if no reply',
    next_action_due = date('now', '+5 days')
WHERE company_id = 'graviton';

-- Mark as recruiter screen scheduled
UPDATE applications
SET status = 'recruiter_screen',
    next_action = 'recruiter screen on [date]',
    next_action_due = '2026-06-14'
WHERE company_id = 'atlassian';

-- See follow-ups due today / overdue
SELECT c.name, a.status, a.next_action, a.next_action_due
FROM applications a JOIN companies c ON a.company_id = c.id
WHERE a.next_action_due <= date('now') AND a.status != 'closed';

-- Add a new company / application (when you find a fresh lead)
INSERT INTO companies (id, name, tier, category, hq, comp_band_lpa, why_fit, application_url, referral_path, cycle_weeks_est, variant, notes)
VALUES ('new-co', 'New Company', 1, 'AI', 'Bengaluru', '25-35', 'why-fit sentence', 'https://...', 'referral path', 3, 'aiml', 'notes');

INSERT INTO applications (company_id, role_title, channel, status, next_action, next_action_due)
VALUES ('new-co', 'SDE-1', 'cold-email', 'queued', 'send T2C InMail to recruiter', date('now', '+1 day'));

-- Status pipeline at a glance
SELECT status, COUNT(*) FROM applications GROUP BY status;
```

**Status values used:** `queued` · `applied` · `recruiter_screen` · `technical_screen` · `onsite` · `offer` · `closed` · `rejected` · `watch` *(for non-applicable but monitor)*.

---

## A 60-second daily ritual (do this every day until offer signed)

1. `SELECT … WHERE next_action_due <= date('now')` — what's due today
2. Hit the due items (apply / follow-up / send thank-you)
3. Update the `applications` row for whatever you did
4. Pick one **new** company from the watch list or weekly-secondary tier; add it; apply

That's it. **Don't optimize the tracker — optimize sending.**

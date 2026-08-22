# Global Engagement — temporary product label

This repository contains an independently developed portfolio prototype informed by hands-on international education partnership and program-coordination experience. The product explores how structured workflows could help university international offices retain relationship context between engagements.

`Global Engagement` is a neutral temporary shell label, not the final umbrella product name. The repository remains `tourflow-ai`, and **TourFlow** is retained only as the label for the Study Tour Delivery workflow.

## The problem

Relationship history, engagement planning and delivery work are often distributed across CRM records, email, spreadsheets, calendars, documents and individual memory. Those systems may store information, but an officer still needs to understand what happened previously, what signal resulted and why that context matters to the next engagement.

The implemented prototype now demonstrates:

```text
Previous Study Tour
  → outcome / strategic signal
  → Relationship Memory
  → later Senior Delegation
  → objective informed by that history
  → explainable internal stakeholder assignments
  → objective-linked agenda activities
  → deterministic executive briefing
  → objective-linked outcomes
  → owned and dated commitments
  → deterministic Relationship Memory write-back

New partner enquiry
  → genuine AI structured scope draft
  → field-level evidence and uncertainty review
  → officer-confirmed local scope
```

It does not attempt to replace a CRM, mobility platform or institutional system of record.

## Implemented scope

- responsive global navigation: `Home / Relationships / Engagements`;
- a focused Home view for current relationship and engagement coordination;
- a small Relationships list with one deeply represented composite relationship;
- a Relationship Detail view connecting engagement history, prior signals and the current objective;
- an Engagements list spanning Study Tour, Senior Delegation, Partner Meeting and Short Program types;
- a Senior Delegation Overview with proposed dates, eight synthetic representatives, strategic interests, source enquiry, open questions and objectives;
- a visible source link from one Delegation objective to the prior Study Tour signal;
- deterministic objective-to-capability matching with explicit rationale and officer confirmation;
- a Senior Delegation Program linking each substantive activity to objectives and internal hosts;
- a printable-style Executive Brief composed from structured relationship and engagement records;
- a post-engagement Follow-up record connecting each Outcome to its source Objective and each Commitment to its source Outcome;
- a resettable local commitment-completion interaction with owner, due date, direction and status;
- deterministic retention of strategically reusable outcomes in Relationship Memory;
- a compatibility layer that preserves the accepted 24-participant TourFlow Study Tour Delivery workflow; and
- deterministic `Confirm requirement` and `Reset demo` behaviour with derived readiness, attention and aggregate updates.
- AI-assisted enquiry structuring with evidence-grounded fields, missing-information prompts, exact partner resolution and mandatory officer confirmation.

Sprint 02C completed the structured non-AI engagement lifecycle. Sprint 03 adds one bounded genuine AI capability without changing canonical Engagement records.

## Demo data and evidence policy

This is an independently developed portfolio prototype informed by real international education partnership experience. Demo records are fictional, synthetic, anonymised or composite unless explicitly stated otherwise.

The primary public-facing partner, **Eastern Horizon University**, is a fictional/composite institution. Its engagements, people, outcomes, signals, enquiry and dates are product-demo records, not a historical claim about a real organisation.

No real student personal information, confidential university data or production institutional systems are used.

The fixed reference date is `DEMO_TODAY = 2026-08-22`, displayed as `Demo snapshot · 22 Aug 2026`, so date-relative behaviour remains reproducible.

The product uses two explicit demonstration snapshots. The global operational snapshot remains **22 Aug 2026**, when the Senior Delegation is still planning and the Study Tour is in pre-departure delivery. The Follow-up route is an explicitly labelled **Post-engagement scenario · 21 Oct 2026**, demonstrating fictional outcomes, commitments and potential Relationship Memory impact after the 19–20 Oct visit. This is an intentional scenario boundary, not database persistence.

## AI status

Genuine AI is implemented only for `Enquiry → Structured Engagement Scope` using the official OpenAI JavaScript SDK and Responses API. The model returns a schema-constrained draft with evidence, grounding state, missing information and clarification questions. An officer must review and confirm it locally; the draft never automatically creates an Engagement or EngagementObjective.

Readiness and attention rules, partner matching, stakeholder matching, agenda traceability, briefing composition, outcome retention and Relationship Memory remain deterministic. There is no AI chat, AI briefing, AI stakeholder matching or AI agenda generation.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- OpenAI JavaScript SDK
- Zod
- Vitest
- ESLint

No authentication, database, analytics service, state-management library, component library or chart library is included. OpenAI is called only from a server-side Next.js route. Interactive review state is local to React and resets on reload.

## Project structure

```text
src/
  ai/           Enquiry schema, versioned prompt, extractor and deterministic review rules
  app/          App Router pages
  components/   Shell and product UI
  data/         Composite engagement fixtures and synthetic Study Tour fixtures
  domain/       Typed models, fixed demo clock and deterministic rules
docs/
  PRODUCT_REQUIREMENTS.md
  PROJECT_LOG.md
  PIVOT_ANALYSIS.md
```

Source fixture records remain separate from deterministic rules and UI components. Study Tour `LifecycleStage` and `ReadinessState` remain distinct from the generic `EngagementStage`.

## Run locally

Requirements: Node.js 20.9 or later and pnpm 11.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Configure the server-only environment values in `.env.local`:

```text
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.6-terra
```

Supply your own OpenAI API key as the local `OPENAI_API_KEY` value. Never use a `NEXT_PUBLIC_*` variable for the key. ChatGPT subscriptions and OpenAI API billing are separate; this repository does not imply that a ChatGPT plan provides API credit.

Open [http://localhost:3000](http://localhost:3000).

Quality checks:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Current limitations

AI output quality depends on the supplied enquiry and must be reviewed by an officer. Evidence excerpts support review but are not a guarantee that every interpretation is correct. Confirmation is local to the demo session and does not write to canonical Engagement records. Stakeholder and commitment interactions also reset on reload. There is no authentication, role model, database, institutional integration or production deployment. Supporting relationships and engagement types remain intentionally light, and the temporary product name is unresolved.

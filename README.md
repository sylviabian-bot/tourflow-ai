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
- a compatibility layer that preserves the accepted 24-participant TourFlow Study Tour Delivery workflow; and
- deterministic `Confirm requirement` and `Reset demo` behaviour with derived readiness, attention and aggregate updates.

Outcomes, commitments and Relationship Memory write-back are deferred to Sprint 02C. Genuine AI remains deferred to Sprint 03.

## Demo data and evidence policy

This is an independently developed portfolio prototype informed by real international education partnership experience. Demo records are fictional, synthetic, anonymised or composite unless explicitly stated otherwise.

The primary public-facing partner, **Eastern Horizon University**, is a fictional/composite institution. Its engagements, people, outcomes, signals, enquiry and dates are product-demo records, not a historical claim about a real organisation.

No real student personal information, confidential university data or production institutional systems are used.

The fixed reference date is `DEMO_TODAY = 2026-08-22`, displayed as `Demo snapshot · 22 Aug 2026`, so date-relative behaviour remains reproducible.

## AI status

There is no genuine AI in the implemented prototype. Readiness and attention behaviour is deterministic and explainable. `Enquiry → Structured Engagement Scope` is the approved first future AI feature, but it has not been implemented.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Vitest
- ESLint

No authentication, database, analytics service, external AI API, state-management library, component library or chart library is included. Interactive demo state is local to React and resets on reload.

## Project structure

```text
src/
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
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Quality checks:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Current limitations

Stakeholder confirmation state is local to the shared engagement layout and resets on reload. There is no authentication, role model, database, external integration or production deployment. Supporting relationships and engagement types remain intentionally light, and the temporary product name is unresolved.

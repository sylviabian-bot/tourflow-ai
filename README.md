# TourFlow

TourFlow is a portfolio prototype for university and education professionals who coordinate international study tours and short-term mobility programs. It helps a coordinator answer one operational question quickly: **which program is not ready, why, and what should happen next?**

The repository remains named `tourflow-ai`, but the V1 product is intentionally called **TourFlow**. Its attention and readiness logic is deterministic and is not presented as AI. The user-facing name **TourFlow AI** is reserved for a later version with genuine, evaluated AI assistance.

## The problem

Pre-departure readiness is often spread across participant records, document metadata, confirmations, travel details, and milestone trackers. That fragmentation makes it difficult to see which requirement is holding up a participant or program. TourFlow brings those signals into a focused portfolio-triage view without trying to replace every university system.

## Sprint 01 scope

The implemented foundation includes:

- a responsive application shell with Dashboard, Programs, and Participants destinations;
- a portfolio Dashboard centred on “What needs your attention today?”;
- three fictional programs and 72 synthetic participant identities;
- independently modelled lifecycle and readiness states;
- derived readiness percentages, outstanding requirement counts, participant states, departure timing, milestones, and attention items;
- deterministic, explainable attention rules;
- a resettable travel-insurance interaction that updates the participant, attention queue, outstanding count, and program readiness metric from one source-state change; and
- minimal Programs, Participants, and program-context pages for navigation continuity.

All date-relative logic uses the fixed reference date `DEMO_TODAY = 2026-08-22`. The interface labels this as `Demo snapshot · 22 Aug 2026`, so the prototype remains reproducible for future reviewers.

## Fictional data and privacy

Every program, person, institution, requirement, and operational record in this prototype is fictional. No real student information, credentials, API keys, or university-system data is used. The fixtures should not be interpreted as an institutional policy or compliance standard.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Vitest for focused domain-rule tests
- ESLint with the Next.js configuration

No authentication, database, analytics service, external AI API, state-management library, component library, or chart library is included. The only interactive demo state is held locally in React and resets on page reload.

## Project structure

```text
src/
  app/          App Router pages and global styles
  components/   Application shell and reusable Dashboard UI
  data/         Fictional source fixtures
  domain/       Typed models, fixed demo clock, presentation helpers, and rules
docs/
  PRODUCT_REQUIREMENTS.md
  PROJECT_LOG.md
```

Fixture records are the source of truth. Aggregate values shown in the interface are calculated by deterministic functions in `src/domain` rather than copied into fixture data.

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

Sprint 01 is deliberately narrow. Full program, participant, readiness, and itinerary workflows are not implemented. State is not persisted, there is no authentication or role model, and nothing connects to an external service. Deployment is also deferred; this sprint is intended for pull-request review before any Vercel release.

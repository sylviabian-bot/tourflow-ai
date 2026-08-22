# tourflow-ai Repository Instructions

## Scope

These instructions apply to the entire repository.

This repository contains an independent portfolio prototype for university international engagement operations. The broader concept connects Partner Relationships with Engagements; `TourFlow` is reserved for the type-specific Study Tour Delivery workflow. The repository remains `tourflow-ai`, while the temporary shell label `Global Engagement` is not a final product name.

## Current phase gate

- Sprint 02B is authorised only for `Objective → Internal Stakeholder → Agenda Activity → Executive Briefing`.
- Preserve the approved Relationship Memory chain, Academic Editorial visual system, and Sprint 01 Study Tour rules and resettable delivery interaction.
- Stakeholder matching must remain deterministic, explainable, and subject to human confirmation.
- The Executive Brief must be composed from structured source records and must not be presented as AI-generated.
- Do not implement outcomes, commitments, Relationship Memory write-back, genuine AI, authentication, persistence, analytics, external integrations, or Vercel deployment until separately authorised.
- Do not interpret a request to improve the PRD as approval to start implementation.

## Sources of truth

Before making a material change, read:

1. `docs/PRODUCT_REQUIREMENTS.md` for product scope and acceptance criteria.
2. `docs/PROJECT_LOG.md` for decisions, assumptions, and unresolved questions.
3. This file for repository-wide delivery rules.

When requirements conflict, stop and record the conflict rather than silently choosing a new scope.

## Product and design principles

- Design for a professional B2B SaaS environment used by university and education operations staff.
- Keep the interface clean, premium, calm, and minimal.
- Use strong information hierarchy, purposeful spacing, restrained colour, and clear operational language.
- Avoid generic AI-generated aesthetics, excessive gradients, decorative glassmorphism, oversized marketing copy, and dashboard clutter.
- Prioritise clarity, scanability, and decision support over visual novelty.
- Make responsive behaviour intentional for desktop, tablet, and mobile layouts.
- Meet accessible UI expectations: semantic structure, keyboard access, visible focus, labelled controls, sufficient contrast, and status cues that do not rely on colour alone.
- Do not add an AI chat box, sparkle icon, or “AI insight” panel unless a validated user problem requires it.

## Data, privacy, and safety

- Use realistic fictional, synthetic, anonymised, or composite data only in product records.
- Never add real student personal information, passport details, health information, emergency contacts, university credentials, or operational records.
- Fictional data must be recognisable as demo data and must not copy a real person’s identity.
- Do not include secrets, API keys, passwords, private URLs, access tokens, or production environment values in source control.
- Document status should be represented as metadata in V1; do not store or imitate passport scans or other sensitive documents.
- Risk and attention indicators in the prototype must be explainable, deterministic, and clearly presented as operational prompts—not legal, medical, compliance, or travel-safety determinations.
- Never describe deterministic rules as AI. Use `TourFlow` only for Study Tour Delivery, not as the umbrella product name.

## Architecture and dependencies

- Prefer a simple, maintainable architecture that is proportionate to a portfolio prototype.
- Do not select a framework, scaffold the app, or add dependencies until implementation is approved.
- Once approved, keep data fixtures separate from presentation logic and derive summary counts from the fixtures rather than duplicating values.
- Use clear domain names such as relationship, engagement, objective, relationship signal, program, participant, requirement, attention item, and itinerary entry.
- Keep `EngagementStage` separate from Study Tour `LifecycleStage` and `ReadinessState`.
- Keep lifecycle and readiness independent: `LifecycleStage` describes where a program is in its journey, while `ReadinessState` describes whether action is required.
- Derive all date-relative behaviour from the fixed `DEMO_TODAY = 2026-08-22` reference date, never from the viewer's system clock.
- Avoid premature abstractions, microservices, unnecessary state libraries, and speculative extensibility.
- Do not add authentication, a production database, external AI APIs, analytics, storage, or other external services without first documenting the need and discussing it with the product owner.
- Explain major architectural decisions in `docs/PROJECT_LOG.md`, including the alternatives considered and why the decision fits V1.

## Code quality rules for the implementation phase

- Prefer readable, typed, composable code with small components and explicit data contracts.
- Keep business rules—especially readiness and attention logic—separate from UI components and cover them with focused tests.
- Reuse components when their behaviour and meaning are genuinely shared; do not create generic abstractions solely to reduce line count.
- Handle loading, empty, error, and narrow-screen states where the selected architecture makes them relevant.
- Avoid unnecessary dependencies. Before adding one, explain what problem it solves and why existing platform capabilities are insufficient.
- Comments should explain non-obvious intent or constraints, not restate the code.
- Keep user-facing copy concise, specific, and credible for international education operations.

## Testing and verification

- After each major implementation change, run the appropriate available checks: formatting, linting, type checking, focused tests, and production build.
- Add focused tests for derived counts, readiness rules, attention triggers, filters, and any demo-state transition.
- Verify the primary coordinator journey end to end at desktop and mobile widths.
- Check keyboard navigation, focus visibility, form labels, heading order, table alternatives on narrow screens, and non-colour status indicators.
- Treat a failing check as incomplete work. Record any intentionally deferred issue and its impact in `docs/PROJECT_LOG.md`.
- Do not claim a check passed unless it was run in the current working state.

## Documentation and decision discipline

- Keep the PRD focused on user problems and observable outcomes; do not turn it into a component inventory.
- Record approved scope changes and major implementation choices in `docs/PROJECT_LOG.md`.
- Update acceptance criteria when product behaviour changes.
- Separate confirmed decisions from proposals and assumptions.
- Preserve a visible phase history so a reviewer can understand how the product evolved from problem definition to prototype.

## Git and delivery hygiene

- Keep changes focused and reviewable.
- Do not commit build output, local environment files, secrets, or real personal data.
- Review the diff before committing or pushing.
- Do not deploy or configure Vercel until the V1 prototype passes the agreed QA gate and deployment is explicitly requested.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

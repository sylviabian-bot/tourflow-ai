# TourFlow AI Repository Instructions

## Scope

These instructions apply to the entire repository.

TourFlow AI is a portfolio product: a polished, realistic prototype of an operations workspace for university staff coordinating international study tours and short-term mobility programs. It should demonstrate product judgment and operational understanding without pretending to be a production student-management or travel-risk system.

## Current phase gate

- The product owner has approved the V1 product direction and information architecture recorded in `docs/PRODUCT_REQUIREMENTS.md`.
- Application implementation is still not authorised. Do not scaffold the application, install dependencies, or create application code until a separate implementation instruction is given after this documentation-only commit.
- Until that instruction, changes remain limited to product, decision, research, and project-planning documentation.
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

- Use realistic fictional data only.
- Never add real student personal information, passport details, health information, emergency contacts, university credentials, or operational records.
- Fictional data must be recognisable as demo data and must not copy a real person’s identity.
- Do not include secrets, API keys, passwords, private URLs, access tokens, or production environment values in source control.
- Document status should be represented as metadata in V1; do not store or imitate passport scans or other sensitive documents.
- Risk and attention indicators in the prototype must be explainable, deterministic, and clearly presented as operational prompts—not legal, medical, compliance, or travel-safety determinations.

## Architecture and dependencies

- Prefer a simple, maintainable architecture that is proportionate to a portfolio prototype.
- Do not select a framework, scaffold the app, or add dependencies until implementation is approved.
- Once approved, keep data fixtures separate from presentation logic and derive summary counts from the fixtures rather than duplicating values.
- Use clear domain names such as program, participant, requirement, attention item, and itinerary entry.
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

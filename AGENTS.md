# tourflow-ai Repository Instructions

## Scope and authorisation

These instructions apply to the entire repository. This is an independent portfolio prototype for university international engagement operations.

- Work only on explicitly authorised tasks. Product discussion, discovery, PRD work, or review does not imply implementation approval.
- Do not infer approval for deployment, databases, authentication, external institutional integrations, analytics, persistence, or additional AI capability.
- Preserve accepted workflows unless the task explicitly changes them: Relationship Memory; Objective → Stakeholder → Agenda → Brief; outcome-linked commitments; and TourFlow Study Tour readiness, rules, and reset interactions.
- Stakeholder matching, readiness, attention, briefing composition, and other structured workflow rules remain deterministic and explainable. Do not present them as AI.
- AI is limited to explicitly approved, source-grounded, human-reviewed workflows. Do not add chat, AI briefing, stakeholder/agenda generation, meeting-note extraction, prediction, RAG, embeddings, or autonomous decisions without separate approval.

## Sources of truth

1. Read `AGENTS.md` first.
2. Search `docs/PRODUCT_REQUIREMENTS.md` for task-relevant workflows, requirements, and acceptance criteria.
3. Search `docs/PROJECT_LOG.md` for relevant decisions, sprint names, features, and domain terms.
4. Read only the matching sections and necessary surrounding context. Read an entire large document only when the task genuinely needs whole-project history.
5. If sources conflict, surface the conflict instead of silently choosing.

## Context and token efficiency

- Use the minimum context required to complete the task correctly; search before reading large files.
- Inspect task-relevant files and direct dependencies only. Do not reread unchanged files without a concrete reason.
- Do not restate repository history or unchanged requirements.
- Do not perform speculative refactors, cleanup, dependency upgrades, or adjacent feature work.
- Use focused validation while iterating. Run the full required validation suite once at the final gate, and repeat it only when later changes require it.
- Keep successful command output concise; do not paste large diffs or logs into the final response.
- Stop when acceptance criteria are satisfied. Default the final response to at most eight concise bullets.

## Product, design, and data boundaries

- The repository remains `tourflow-ai`. `Global Engagement` is a temporary shell label, not a final product name. Use `TourFlow` only for Study Tour Delivery, never as the umbrella product name.
- Use realistic fictional, synthetic, anonymised, or composite product records. Never attach invented events to real organisations or copy a real person's identity.
- Never add real student personal information, passport or health details, emergency contacts, credentials, confidential institutional data, or production operational records.
- Never commit secrets, API keys, passwords, access tokens, private URLs, local environment files, or production values. Represent sensitive documents as metadata only; do not store or imitate scans.
- Present risk and attention indicators as deterministic operational prompts, not legal, medical, compliance, travel-safety, or AI determinations.
- Preserve the Academic Editorial × Executive Briefing direction: calm, premium professional B2B software, strong hierarchy, restrained colour, clear operational language, responsive layouts, and accessible non-colour cues.
- Avoid generic AI/SaaS styling, gradients, glassmorphism, oversized marketing copy, dashboard clutter, sparkle icons, decorative AI panels, and unvalidated AI claims.

## Architecture and code quality

- Prefer simple, maintainable, typed architecture. Keep fixtures, business rules, and presentation separate; derive aggregates instead of duplicating them.
- Keep `EngagementStage`, Study Tour `LifecycleStage`, and `ReadinessState` independent. Derive date-relative behaviour from `DEMO_TODAY = 2026-08-22`.
- Avoid premature abstractions, microservices, speculative extensibility, unnecessary dependencies, and state libraries. Explain justified dependency or major architecture changes in `docs/PROJECT_LOG.md`.
- Use small components and explicit contracts. Reuse only genuinely shared behaviour; keep business rules out of UI components and cover them with focused tests.
- Handle relevant loading, empty, error, and narrow-screen states. Keep user copy concise and credible; comments should explain non-obvious intent.

## Verification, documentation, and delivery

- Add focused tests for changed rules, derived values, filters, traceability, and demo-state transitions.
- At the final gate run the task-required formatting/lint, type checking, focused tests, production build, and `git diff --check`; documentation-only tasks may use appropriate documentation checks instead of application tests/builds.
- For UI changes, verify the primary journey on desktop and mobile, keyboard access, visible focus, labels, semantic headings, narrow-screen alternatives, contrast, and non-colour status cues.
- Treat failing checks as incomplete. Do not claim checks that were not run; record intentionally deferred issues and impact in `docs/PROJECT_LOG.md`.
- Keep PRD content outcome-focused. Record approved scope or major architecture decisions, update affected acceptance criteria, and distinguish decisions from proposals.
- Keep diffs focused and reviewable. Review before commit/push; never commit build output, local environment files, secrets, or real personal data.
- Deploy or configure Vercel only when explicitly authorised after the agreed QA gate.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

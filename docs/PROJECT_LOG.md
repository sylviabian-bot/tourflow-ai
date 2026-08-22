# TourFlow — Project Log

This log records how TourFlow evolves from an operational problem into a tested portfolio prototype. The repository remains `tourflow-ai`; the `TourFlow AI` user-facing name is reserved for a later version with genuine AI-assisted functionality.

## Project status

| Field | Current value |
| --- | --- |
| Phase | Sprint 01 — foundation and Dashboard |
| Current version | PRD 0.3 |
| Implementation | Sprint 01 authorised on `sprint-01-foundation` |
| Data approach | Realistic fictional data only |
| External services | None approved |
| Next gate | Sprint 01 validation, branch push, and unmerged pull request review |

## Initial assumptions

| ID | Assumption | Validation needed | Status |
| --- | --- | --- | --- |
| A-01 | The primary user is a university study-tour or global-mobility coordinator. | Confirm this is the best hiring and portfolio persona. | Accepted for V1 |
| A-02 | Pre-departure readiness is the strongest narrow V1 story. | Review against target job families and realistic coordinator work. | Approved |
| A-03 | Three connected fictional programs can demonstrate sufficient breadth. | Confirm fixture size after IA review. | Approved with one deep and two light programs |
| A-04 | Document metadata can demonstrate readiness without file upload or storage. | Confirm no document preview is required for the portfolio story. | Approved |
| A-05 | Deterministic attention rules are preferable to simulated AI in V1. | Confirm during product review. | Approved |
| A-06 | A resettable browser-only status change may make the prototype more convincing. | Decide whether the benefit justifies the extra interaction. | Approved |

## Product decisions

Use this table for decisions that have been explicitly approved. Do not move a proposal here until approval is recorded.

| Decision ID | Date | Decision | Rationale | Alternatives considered | Approved by |
| --- | --- | --- | --- | --- | --- |
| D-001 | 2026-08-22 | Make pre-departure readiness the primary V1 workflow. | Gives V1 one strong operational question and avoids a broad, shallow management suite. | Full study-tour management platform; recruitment-led workflow | Product owner |
| D-002 | 2026-08-22 | Use `Dashboard / Programs / Participants` globally and `Overview / Readiness / Itinerary` within a program. | Keeps the navigation small and preserves program context. | Separate global modules for every domain object | Product owner |
| D-003 | 2026-08-22 | Use `Participants` consistently in product navigation and program views. | Fits the study-tour domain and allows future student, staff, or chaperone participant types. | Mixed `Students` and `Participants`; `Students` only | Product owner |
| D-004 | 2026-08-22 | Keep document metadata inside Readiness. | The operational outcome is readiness and follow-up, not document browsing. | Standalone Documents module | Product owner |
| D-005 | 2026-08-22 | Use deterministic, explainable Attention Alert rules. | Builds trust and avoids misrepresenting ordinary rules as AI predictions. | Simulated AI insights; predictive risk score | Product owner |
| D-006 | 2026-08-22 | Include one resettable demo interaction for missing travel insurance. | Demonstrates that participant state, alerts, counts, and program readiness are connected. | Read-only prototype; broad editing workflow | Product owner |
| D-007 | 2026-08-22 | Use one detailed program and two lighter programs for portfolio variation. | Creates a coherent primary demo without making all fixtures equally expensive. | One program only; three equally deep programs | Product owner |
| D-008 | 2026-08-22 | Keep accommodation and transport inside itinerary/logistics. | Reflects how daily operational plans are reviewed and avoids unnecessary top-level modules. | Standalone Accommodation and Transport modules | Product owner |
| D-009 | 2026-08-22 | Exclude authentication, Supabase, production databases, and external AI APIs from V1. | Protects scope and keeps attention on the workflow. | Production-style service architecture in V1 | Product owner |
| D-010 | 2026-08-22 | Require a separate instruction before implementation. | Allowed the approved documentation baseline to be committed and reviewed first; this gate was satisfied by the Sprint 01 authorisation. | Begin scaffolding immediately after product approval | Product owner |
| D-011 | 2026-08-22 | Keep repository name `tourflow-ai`, use `TourFlow` for V1, and reserve `TourFlow AI` for genuine future AI assistance. | Prevents deterministic rules from being marketed as AI while preserving the repository history. | Use `TourFlow AI` in V1; rename the repository | Product owner |
| D-012 | 2026-08-22 | Model `LifecycleStage` and `ReadinessState` as independent concepts. | A program's operating stage and its need for action answer different questions. | One combined status field | Product owner |
| D-013 | 2026-08-22 | Use `Outstanding Requirements` for aggregate metrics. | Requirements include documents, confirmations, tasks, briefings, and travel details. | `Missing Documents` | Product owner |
| D-014 | 2026-08-22 | Use `Confirm requirement` for the travel-insurance demo transition from `Action required` to `Approved`. | The action describes the deterministic state change more clearly than `Mark as received`. | `Mark as received`; generic edit controls | Product owner |
| D-015 | 2026-08-22 | Fix the demo clock at `DEMO_TODAY = 2026-08-22` and disclose it as `Demo snapshot · 22 Aug 2026`. | Makes days-to-departure, overdue, milestone, and attention calculations reproducible for future reviewers. | Viewer system date; hidden fixed date | Product owner |
| D-016 | 2026-08-22 | Authorise Sprint 01 on `sprint-01-foundation` for the foundation, domain model, shell, minimal destinations, and Dashboard only. | Starts implementation without expanding into the full product or deploying. | Continue documentation only; implement all V1 workflows at once | Product owner |

## Current implementation boundary

Sprint 01 implementation is authorised only on `sprint-01-foundation`. It includes the technical foundation, typed domain model, fictional fixtures, deterministic business rules, application shell, minimal route destinations, and portfolio-triage Dashboard. Full Programs, Participants, Readiness, and Itinerary workflows are deferred. Supabase, databases, authentication, analytics, external AI APIs, and Vercel deployment remain out of scope.

## Sprint 01 architecture

| Area | Decision | Reason |
| --- | --- | --- |
| Framework | Next.js 16.3.2 App Router with React 19 and TypeScript | Provides a small, Vercel-ready application foundation with file-based routes and static rendering. |
| Rendering boundary | Keep route pages and most UI as Server Components; use one client Dashboard workspace for the resettable demo state and one client navigation component for active-route behaviour. | Limits client JavaScript while supporting the approved interaction. |
| Styling | Tailwind CSS 4 with small custom components and no component library. | The shell, badges, progress indicators, menu, and controls are simple enough to implement accessibly without another runtime dependency. |
| Domain separation | Keep typed records in `src/domain/types.ts`, deterministic calculations in `src/domain/rules.ts`, presentation formatting in `src/domain/presentation.ts`, and source fixtures in `src/data/fixtures.ts`. | Prevents business rules and derived metrics from being embedded in view code or duplicated in fixtures. |
| Demo state | Hold only the requirement collection in local React state and recalculate the Dashboard snapshot after confirm/reset. | One source-state transition drives participant readiness, alerts, outstanding counts, and program metrics without a state library or backend. |
| Demo clock | Route all relative-date logic through `src/domain/demo-clock.ts` and `DEMO_TODAY`. | Makes the experience deterministic and reviewable in the future. |
| Dependencies | Add Vitest for focused rule tests; do not add shadcn/ui, icons, charts, state libraries, services, or analytics. | Testing the domain logic is justified; the other capabilities are not needed for Sprint 01. |

## Iteration log

Add one entry for every meaningful product or implementation iteration.

### Iteration template

```markdown
### YYYY-MM-DD — Iteration name

**Objective**

What problem or hypothesis was addressed?

**Inputs**

- User or reviewer feedback:
- Evidence or research:
- Relevant requirement or decision IDs:

**Changes**

- What changed?
- What deliberately did not change?

**Validation**

- Checks run:
- Result:
- Evidence:

**Outcome**

- What was learned?
- What remains unresolved?
- Next decision or action:
```

### 2026-08-22 — Sprint 00 product definition

**Objective**

Define the user problem, workflow, and smallest credible V1 before selecting a stack or writing application code.

**Inputs**

- Portfolio objective supplied by the product owner.
- Public university procedures and pre-departure guidance from Western Sydney University, UNSW, and the University of Newcastle.
- Constraint to use fictional data with no authentication, production database, or external AI API.

**Changes**

- Created repository-wide delivery rules.
- Drafted the product requirements and V1 information architecture.
- Defined a three-item global navigation and a contextual program workspace.
- Explicitly excluded implementation and Vercel configuration.

**Validation**

- Confirmed the repository contained only its initial README before documentation work.
- Cross-checked the PRD against every section requested in the master prompt.
- No application tests or build were run because no application code or toolchain exists.

**Outcome**

- PRD 0.2 records the approved V1 product direction.
- Application implementation remains closed pending a separate instruction.

### 2026-08-22 — Product decision approval

**Objective**

Convert the reviewed PRD proposals into an approved, documentation-only V1 baseline without beginning application implementation.

**Inputs**

- Product-owner approval of pre-departure readiness, the information architecture, participant terminology, contextual document and logistics handling, deterministic alerts, the resettable demo interaction, and the three-program fixture strategy.
- Explicit instruction to exclude authentication, Supabase, production databases, and external AI APIs from V1.
- Explicit instruction not to start application implementation.

**Changes**

- Updated PRD status to version 0.2 and recorded the approved decisions.
- Standardised product navigation and program-view terminology on `Participants`.
- Specified the primary and supporting fictional programs.
- Made the resettable travel-insurance interaction a required V1 behaviour.
- Kept implementation behind a separate phase gate in both the PRD and `AGENTS.md`.

**Validation**

- Documentation-only scope and terminology checks completed before commit.
- No application code or dependencies added.

**Outcome**

- The product-definition baseline is ready for a documentation-only commit and push.
- The next product discussion may consider implementation, but implementation is not authorised by this entry.

### 2026-08-22 — Sprint 01 foundation and Dashboard

**Objective**

Build the technical foundation, typed domain model, application shell, and portfolio-triage Dashboard without expanding into the full V1 workflow.

**Inputs**

- Approved naming, lifecycle/readiness, requirement terminology, fixed demo clock, and deterministic interaction decisions D-011 through D-016.
- The three-program, 72-participant fictional fixture strategy.
- Sprint boundary excluding persistence, authentication, external services, AI APIs, analytics, and deployment.

**Changes**

- Added a current stable Next.js App Router project with TypeScript and Tailwind CSS.
- Created typed `Program`, `Participant`, `Requirement`, `AttentionItem`, `Milestone`, and `ItineraryEntry` domain records.
- Created 72 explicitly synthetic participant records across 24-person, 18-person, and 30-person program cohorts.
- Implemented deterministic rules for departure timing, participant and program readiness, outstanding requirements, milestones, attention priority, and Dashboard aggregation.
- Built the responsive TourFlow shell, triage Dashboard, and minimal Programs, Participants, and program-context routes.
- Implemented the travel-insurance `Confirm requirement` transition and `Reset demo` control using local client state; all affected metrics are recalculated from the changed requirement record.
- Kept itinerary transport and accommodation records inside the itinerary model and did not create top-level modules.

**Validation**

- ESLint: passed.
- TypeScript no-emit check: passed.
- Vitest: 6 focused tests passed.
- Next.js production build: passed, including static generation of the three program-context routes.
- Browser verification: Dashboard and program navigation passed at desktop and 390 × 844 mobile viewport sizes; the confirm/reset interaction updated and restored all linked metrics; no page errors were reported.
- Content audit found no user-facing `TourFlow AI`, fake AI, `Missing Documents`, or `Mark as received` language in the implementation.

**Outcome**

- Sprint 01 now provides a coherent, reproducible operational story rather than a static collection of KPI cards.
- Custom components were sufficient; no accessible-component dependency was needed.
- Full editing, persistence, program workspaces, participant workflows, and itinerary workflows remain deferred to a separately approved sprint.

## Problems and solutions

| ID | Date | Problem | Impact | Root cause | Solution | Verification |
| --- | --- | --- | --- | --- | --- | --- |
| P-001 | 2026-08-22 | The workspace shell did not expose Node.js on `PATH`, and pnpm initially withheld the native resolver build step. | The first dependency install could not complete reliably. | This Codex workspace uses a bundled Node runtime and pnpm's explicit build approval. | Used the configured bundled Node path for project commands and allowed only `unrs-resolver` in `pnpm-workspace.yaml`. | Clean install completed and every project check ran with the pinned toolchain. |
| P-002 | 2026-08-22 | The newest TypeScript 7 and ESLint 10 releases did not satisfy the peer ranges of the current Next.js lint ecosystem. | Installation produced compatibility warnings that could make the baseline brittle. | Tool releases were newer than the supported peer ranges of `eslint-config-next` and related plugins. | Pinned TypeScript 6.0.3 and ESLint 9.39.5 while keeping Next.js, React, Tailwind, and Vitest current. | Peer compatibility check and all lint, type, test, and build commands passed. |

## Testing record

| Date | Change or version | Check | Result | Evidence / notes |
| --- | --- | --- | --- | --- |
| 2026-08-22 | PRD draft 0.1 | Repository scope inspection | Pass | Initial repository contained only `README.md`. |
| 2026-08-22 | PRD draft 0.1 | Application tests/build | Not applicable | Application implementation has not started. |
| 2026-08-22 | PRD 0.2 | Documentation scope and terminology audit | Pass | Approved IA, participant terminology, fixture strategy, and phase gate recorded; no application code present. |
| 2026-08-22 | Sprint 01 | Lifecycle/readiness, fixed-date, readiness, outstanding-count, attention-rule, and aggregate tests | Pass | Vitest: 1 file, 6 tests passed. |
| 2026-08-22 | Sprint 01 | ESLint and TypeScript | Pass | `pnpm lint` and `pnpm typecheck` exited successfully. |
| 2026-08-22 | Sprint 01 | Production build | Pass | `pnpm build` completed and statically generated Dashboard, Programs, Participants, and three program routes. |
| 2026-08-22 | Sprint 01 | Browser and responsive verification | Pass | Desktop and 390 × 844 mobile Dashboard checked; navigation and confirm/reset flow worked; no page errors. |

## Lessons learned

Record concise lessons that should influence later decisions.

| Date | Lesson | Implication |
| --- | --- | --- |
| 2026-08-22 | Real study-tour operations connect participant readiness, pre-departure activity, itinerary, transport, accommodation, and risk context. | V1 should connect these records inside a program workflow rather than present unrelated dashboard cards. |
| 2026-08-22 | Institutional processes and approval authorities vary. | The prototype must not claim universal policy compliance. |
| 2026-08-22 | “AI” is not required to make the first workflow valuable. | Start with transparent rules and add AI only after a validated use case exists. |
| 2026-08-22 | A single requirement record can support a convincing demo when every visible aggregate is derived from it. | Keep source state narrow and calculations centralised instead of manually synchronising UI counters. |
| 2026-08-22 | The mobile triage experience works better as stacked decision cards than a compressed desktop table. | Preserve content priority and actions when future screens become responsive. |

## Future improvements backlog

Do not treat this list as approved scope.

| Idea | User problem | Earliest phase | Dependencies / questions |
| --- | --- | --- | --- |
| Secure persistence | Retain multi-session program changes | V2 | Data classification, privacy, authentication, audit needs |
| Student self-service | Reduce coordinator follow-up | V2 | Identity, permissions, accessibility, communication design |
| Communications workflow | Draft and track follow-ups | V2 | Channel, consent, templates, audit trail |
| Configurable readiness rules | Support institutional variation | V2 | Governance and rule ownership |
| Live travel-advisory integration | Surface destination changes | V2 | Source reliability, update cadence, escalation policy |
| AI-assisted status summary | Reduce manual reporting | V2 | Human review, approved data boundaries, evaluation criteria |
| Post-program feedback | Close the program lifecycle | V2 | Survey design and outcome reporting |

## Review checklist

Before moving from product definition to implementation, confirm that:

- [x] the primary user and central problem are approved;
- [x] the V1 information architecture is approved;
- [x] V1 features and out-of-scope boundaries are approved;
- [x] terminology is approved;
- [x] the demo-state interaction decision is recorded;
- [x] fictional-data breadth and privacy rules are accepted;
- [x] success criteria are accepted;
- [x] major assumptions are accepted for V1 or retained as explicit risks; and
- [x] a separate instruction authorises implementation planning or scaffolding.

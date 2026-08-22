# TourFlow / Global Engagement Pivot — Project Log

This log records how TourFlow evolves from an operational problem into a tested portfolio prototype. Sprint 01 remains the accepted Study Tour readiness foundation. `Global Engagement Copilot` is a working pivot concept only: the repository and current application have not been renamed, and no pivot implementation or AI functionality is authorised.

## Project status

| Field | Current value |
| --- | --- |
| Phase | Product pivot / expansion discovery — documentation only |
| Current version | Proposed PRD 0.4 |
| Implementation | Sprint 01 accepted and merged through PR #1; pivot implementation not authorised |
| Data approach | Realistic fictional data only |
| External services | None approved |
| Next gate | Product-owner review of positioning, naming, domain, IA, MVP, migration, and first future AI use case |

## Initial assumptions

| ID | Assumption | Validation needed | Status |
| --- | --- | --- | --- |
| A-01 | The primary user is a university study-tour or global-mobility coordinator. | Confirm this is the best hiring and portfolio persona. | Accepted for V1 |
| A-02 | Pre-departure readiness is the strongest narrow V1 story. | Review against target job families and realistic coordinator work. | Approved |
| A-03 | Three connected fictional programs can demonstrate sufficient breadth. | Confirm fixture size after IA review. | Approved with one deep and two light programs |
| A-04 | Document metadata can demonstrate readiness without file upload or storage. | Confirm no document preview is required for the portfolio story. | Approved |
| A-05 | Deterministic attention rules are preferable to simulated AI in V1. | Confirm during product review. | Approved |
| A-06 | A resettable browser-only status change may make the prototype more convincing. | Decide whether the benefit justifies the extra interaction. | Approved |
| A-07 | International engagement officers have a valuable coordination layer between systems of record. | Validate with practitioners or hiring reviewers. | Proposed for pivot review |
| A-08 | Objective-to-outcome traceability is a stronger differentiation than contact records or relationship timelines. | Test with the delegation scenario and competitive comparison. | Proposed for pivot review |
| A-09 | One deep delegation scenario plus the preserved Study Tour vertical is enough to demonstrate the broader concept. | Review scope and narrative coherence before Sprint 02. | Proposed for pivot review |
| A-10 | `Global Engagement Copilot` should not become the immediate product name while no AI is implemented. | Approve a naming strategy before any application rename. | Proposed for pivot review |

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
| D-017 | 2026-08-22 | Accept Sprint 01 as a valid Study Tour readiness foundation and merge PR #1 into `main` using squash merge. | Preserves a clean, tested vertical slice and project history before exploring a broader product direction. | Discard or leave Sprint 01 unmerged | Product owner |
| D-018 | 2026-08-22 | Authorise a documentation-only product pivot / expansion discovery phase that preserves Sprint 01 and prohibits application changes. | Separates strategic validation from implementation and avoids an unreviewed rewrite. | Immediately rename and rebuild the application | Product owner |

## Proposed pivot decisions awaiting approval

These are recommendations, not approved product decisions.

| Proposal ID | Recommendation | Why it is proposed | Approval needed |
| --- | --- | --- | --- |
| PD-001 | Position the broader concept as an international engagement operating layer. | Focuses on coordination and decision work between systems of record. | Yes |
| PD-002 | Use `Relationship → Engagement` as the central model. | Creates the missing layer above Study Tour delivery and supports multiple engagement types. | Yes |
| PD-003 | Make `Objective → Stakeholder / Agenda → Outcome → Commitment → Relationship Memory` the signature workflow. | Provides workflow-level differentiation from a generic CRM. | Yes |
| PD-004 | Use `Home / Relationships / Engagements` as the smallest global IA. | Avoids premature Contacts, Agreements, Tasks, Documents, or AI modules. | Yes |
| PD-005 | Select a new umbrella name later and retain TourFlow for Study Tour Delivery. | “TourFlow” is valuable but too narrow for broader engagement work; “Copilot” currently overstates AI. | Yes |
| PD-006 | Make the delegation scenario the primary next MVP and preserve Study Tour as the supporting vertical. | Demonstrates the pivot without building two large workflows at equal depth. | Yes |
| PD-007 | Make Enquiry → structured engagement scope the first future AI feature. | It is bounded, source-groundable, reviewable, and directly improves the new workflow. | Yes |

## Current implementation boundary

Sprint 01 is accepted on `main` and remains the current application baseline. Branch `product-pivot-global-engagement` is restricted to `docs/PRODUCT_REQUIREMENTS.md`, `docs/PROJECT_LOG.md`, and `docs/PIVOT_ANALYSIS.md`. No application refactor, rename, dependency, fixture change, database, authentication, analytics, AI API, external service, or Vercel configuration is authorised. Sprint 02 cannot begin until the proposed pivot decisions are reviewed explicitly.

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

### 2026-08-22 — Product pivot / international engagement discovery

**Objective**

Test whether the accepted Study Tour readiness product can become one specialised module within a broader, differentiated international engagement operations concept without wasting Sprint 01 or drifting into a generic CRM.

**Trigger**

- Product review concluded that the original `Programs → Participants → Requirements → Readiness → Itinerary` model is useful but too narrow as an umbrella product.
- Expanding it through contacts, notes, tasks, and more program pages would overlap substantially with configured CRM and mobility platforms.
- A broader International Relations / Global Engagement use case was identified around partner intent, stakeholder coordination, engagement design, briefing, outcomes, commitments, and institutional memory.

**What Sprint 01 taught us**

- A narrow operational question creates a stronger portfolio story than a broad feature catalogue.
- Typed source records and central deterministic rules make the product easier to reframe safely.
- The existing Study Tour workflow has independent value and should survive as a vertical extension.
- Honest non-AI automation is more credible than decorative AI claims.
- One linked state transition is enough to prove that the prototype is a working system rather than a static dashboard.

**Why the original scope was too narrow**

- `Program` assumes delivery is the top-level context and does not express the institutional relationship that precedes and follows an engagement.
- Participant readiness is central to Study Tours but irrelevant to senior delegations, partner meetings, and government or industry visits.
- Contact, activity, document, and task expansion alone would not explain why this product should exist beside a generic CRM or mobility platform.
- The original model does not connect partner objectives to internal university capability, agenda design, outcomes, commitments, and future relationship context.

**What is preserved**

- the accepted technical foundation, responsive shell patterns, and quality scripts;
- all synthetic Study Tour fixtures;
- `Participant`, `Requirement`, `ReadinessState`, `AttentionItem`, `Milestone`, and `ItineraryEntry` semantics where they remain valid;
- fixed-date calculations and deterministic readiness/attention rules;
- derived Dashboard aggregates;
- the `Confirm requirement` / `Reset demo` interaction; and
- the Study Tour coordination story, proposed as TourFlow Study Tour Delivery.

**What is proposed to change**

- add `PartnerOrganisation`, `Relationship`, and `Engagement` above delivery;
- treat Study Tour as one `EngagementType` with a type-specific delivery extension;
- introduce objective, stakeholder-assignment, agenda, outcome, and commitment records;
- reframe Home around engagement and commitment coordination;
- replace the global `Dashboard / Programs / Participants` IA with `Home / Relationships / Engagements` only after approval;
- use the delegation journey as the primary next MVP; and
- choose a new umbrella name later while preserving TourFlow for Study Tour Delivery.

**Unresolved decisions**

- whether the operating-layer positioning is sufficiently defensible;
- final umbrella product name;
- exact domain boundaries and engagement stage model;
- the proposed minimal IA;
- delegation-first MVP scope;
- final clearly synthetic institution name for Scenario A;
- migration and route compatibility approach; and
- whether Enquiry → structured engagement scope should be the first future AI feature.

**Validation**

- Inspected the merged Sprint 01 documentation, domain types, deterministic rules, fixtures, routes, Dashboard composition, README, and dependency boundary.
- Compared the proposed boundary with official Salesforce Education Cloud, QS MoveON, and Terra Dotta product descriptions to avoid claiming that relationship records, mobility, agreements, workflows, or travel readiness are unique.
- Created PRD 0.4 and a separate pivot analysis with an explicit reuse map, migration proposal, IA critique, MVP options, and ranked AI candidates.
- Confirmed the branch contains documentation changes only; no implementation validation was required because application code and dependencies were not changed.

**Outcome**

- The strongest proposed differentiation is the traceable `Intent → Objective → Stakeholder / Activity → Outcome → Commitment → Relationship Memory` chain.
- The recommended MVP is one delegation-first end-to-end journey with the existing Study Tour readiness workflow preserved as the supporting vertical.
- No pivot implementation is authorised; product-owner review is the next gate.

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
| 2026-08-22 | Proposed PRD 0.4 | Pivot scope and reuse audit | Pass | Inspected merged code/docs and mapped every Sprint 01 domain/UI area to keep, modify, reframe, or remove; no application files changed. |
| 2026-08-22 | Proposed PRD 0.4 | Competitive-boundary review | Pass | Official CRM, international-office, and travel/mobility product material confirms that records, partnership management, mobility, agreements, reporting, and travel readiness cannot be claimed as unique. |
| 2026-08-22 | Proposed PRD 0.4 | Documentation completeness and terminology audit | Pass | Required PRD, project-log, pivot-analysis, migration, IA, MVP, AI-ranking, naming, and approval-gate sections are present. |

## Lessons learned

Record concise lessons that should influence later decisions.

| Date | Lesson | Implication |
| --- | --- | --- |
| 2026-08-22 | Real study-tour operations connect participant readiness, pre-departure activity, itinerary, transport, accommodation, and risk context. | V1 should connect these records inside a program workflow rather than present unrelated dashboard cards. |
| 2026-08-22 | Institutional processes and approval authorities vary. | The prototype must not claim universal policy compliance. |
| 2026-08-22 | “AI” is not required to make the first workflow valuable. | Start with transparent rules and add AI only after a validated use case exists. |
| 2026-08-22 | A single requirement record can support a convincing demo when every visible aggregate is derived from it. | Keep source state narrow and calculations centralised instead of manually synchronising UI counters. |
| 2026-08-22 | The mobile triage experience works better as stacked decision cards than a compressed desktop table. | Preserve content priority and actions when future screens become responsive. |
| 2026-08-22 | A relationship timeline is not enough to differentiate the broader concept from a CRM. | Make objective-to-outcome traceability and relationship-memory feedback the primary workflow proof. |
| 2026-08-22 | Shared domain objects should not erase operational differences between engagement types. | Use a small Engagement core plus explicit type-specific delivery extensions. |
| 2026-08-22 | The best first AI feature has a bounded source, structured output, and explicit approval point. | Prioritise enquiry structuring before briefing generation, recommendation, or generic chat. |

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
| Relationship and Engagement layer | Coordinate partner intent, university action, outcomes, and commitments | Proposed Sprint 02 | Requires approval of PRD 0.4, IA, domain migration, and naming strategy |
| Structured engagement briefing | Reduce repeated briefing assembly | Proposed Sprint 02 | Deterministic assembly first; AI draft later with provenance and review |
| Enquiry-to-scope AI | Convert unstructured partner requests into reviewable structure | Future AI phase | Approved schema, source grounding, field confirmation, evaluation set, and AI service decision |

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

## Pivot review checklist

Before Sprint 02 implementation, confirm that:

- [ ] the international engagement operating-layer positioning is approved;
- [ ] the product has a defensible workflow-level difference from CRM and mobility platforms;
- [ ] `Relationship → Engagement` is approved as the central model;
- [ ] the minimal core objects and Study Tour Delivery extension are approved;
- [ ] the objective-to-outcome signature workflow is approved;
- [ ] the proposed `Home / Relationships / Engagements` IA is approved;
- [ ] the delegation-first MVP scope is approved;
- [ ] the umbrella and Study Tour module naming strategy is approved;
- [ ] Scenario A uses a clearly synthetic institution and people;
- [ ] the Sprint 01 migration/reuse map is approved;
- [ ] the first future AI use case is approved or deliberately deferred; and
- [ ] a separate instruction explicitly authorises Sprint 02 implementation.

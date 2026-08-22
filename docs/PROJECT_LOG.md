# International Engagement Prototype — Project Log

This log records how a Study Tour readiness foundation evolves into a tested international engagement portfolio prototype. Sprint 01 remains the accepted TourFlow Study Tour Delivery foundation. Sprint 02A Relationship + Engagement Core is authorised and implemented on its review branch; the final umbrella name remains unresolved and no genuine AI is implemented.

## Project status

| Field | Current value |
| --- | --- |
| Phase | Sprint 02A — Relationship + Engagement Core implementation |
| Current version | PRD 0.4 — product direction approved |
| Implementation | Sprint 01 accepted on `main`; Sprint 02A implemented for review; Sprint 02B not authorised |
| Data approach | Real factual context only when approved; otherwise anonymised, composite, fictional, or synthetic demo data |
| External services | None approved |
| Next gate | Review and merge Sprint 02A; authorise Sprint 02B separately if the relationship-memory proof is accepted |

## Initial assumptions

| ID | Assumption | Validation needed | Status |
| --- | --- | --- | --- |
| A-01 | The primary user is a university study-tour or global-mobility coordinator. | Confirm this is the best hiring and portfolio persona. | Accepted for V1 |
| A-02 | Pre-departure readiness is the strongest narrow V1 story. | Review against target job families and realistic coordinator work. | Approved |
| A-03 | Three connected fictional programs can demonstrate sufficient breadth. | Confirm fixture size after IA review. | Approved with one deep and two light programs |
| A-04 | Document metadata can demonstrate readiness without file upload or storage. | Confirm no document preview is required for the portfolio story. | Approved |
| A-05 | Deterministic attention rules are preferable to simulated AI in V1. | Confirm during product review. | Approved |
| A-06 | A resettable browser-only status change may make the prototype more convincing. | Decide whether the benefit justifies the extra interaction. | Approved |
| A-07 | International engagement officers have a valuable coordination layer between systems of record. | Validate with practitioners or hiring reviewers. | Approved product hypothesis |
| A-08 | Objective-to-outcome traceability is a stronger differentiation than contact records or relationship timelines. | Test through continuity across the two demo engagements. | Approved signature workflow |
| A-09 | One deep delegation scenario plus the preserved Study Tour vertical is enough to demonstrate the broader concept. | Review scope and narrative coherence during Sprint 02 planning. | Approved MVP direction |
| A-10 | `Copilot` should not become the user-facing umbrella name while no genuine AI is implemented. | Resolve the final umbrella name separately. | Approved naming constraint |

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
| D-011 | 2026-08-22 | Keep repository name `tourflow-ai` and use `TourFlow` for Sprint 01; its earlier future-name implication is superseded by D-024. | Prevents deterministic rules from being marketed as AI while preserving the repository history. | Use `TourFlow AI` in V1; rename the repository | Product owner |
| D-012 | 2026-08-22 | Model `LifecycleStage` and `ReadinessState` as independent concepts. | A program's operating stage and its need for action answer different questions. | One combined status field | Product owner |
| D-013 | 2026-08-22 | Use `Outstanding Requirements` for aggregate metrics. | Requirements include documents, confirmations, tasks, briefings, and travel details. | `Missing Documents` | Product owner |
| D-014 | 2026-08-22 | Use `Confirm requirement` for the travel-insurance demo transition from `Action required` to `Approved`. | The action describes the deterministic state change more clearly than `Mark as received`. | `Mark as received`; generic edit controls | Product owner |
| D-015 | 2026-08-22 | Fix the demo clock at `DEMO_TODAY = 2026-08-22` and disclose it as `Demo snapshot · 22 Aug 2026`. | Makes days-to-departure, overdue, milestone, and attention calculations reproducible for future reviewers. | Viewer system date; hidden fixed date | Product owner |
| D-016 | 2026-08-22 | Authorise Sprint 01 on `sprint-01-foundation` for the foundation, domain model, shell, minimal destinations, and Dashboard only. | Starts implementation without expanding into the full product or deploying. | Continue documentation only; implement all V1 workflows at once | Product owner |
| D-017 | 2026-08-22 | Accept Sprint 01 as a valid Study Tour readiness foundation and merge PR #1 into `main` using squash merge. | Preserves a clean, tested vertical slice and project history before exploring a broader product direction. | Discard or leave Sprint 01 unmerged | Product owner |
| D-018 | 2026-08-22 | Authorise a documentation-only product pivot / expansion discovery phase that preserves Sprint 01 and prohibits application changes. | Separates strategic validation from implementation and avoids an unreviewed rewrite. | Immediately rename and rebuild the application | Product owner |
| D-019 | 2026-08-22 | Position the broader concept as an international engagement operating layer. | Focuses on coordination and decision work between systems of record. | CRM replacement; broader mobility system | Product owner |
| D-020 | 2026-08-22 | Use `Relationship → Engagement` as the central product model. | Adds institutional context above type-specific delivery and supports multiple engagement types. | Keep `Program` as the top-level aggregate | Product owner |
| D-021 | 2026-08-22 | Use `Partner Intent → Scope → Objectives → Stakeholders / Agenda → Outcomes → Commitments → Relationship Memory` as the signature workflow. | Makes continuity of institutional intent across engagements the workflow-level differentiation. | Contact timeline; generic activity history | Product owner |
| D-022 | 2026-08-22 | Use `Home / Relationships / Engagements` as the minimal global IA. | Avoids premature Contacts, Agreements, Tasks, Documents, or AI modules. | Add Tasks / Commitments globally; retain the Sprint 01 navigation unchanged | Product owner |
| D-023 | 2026-08-22 | Use a delegation-first primary MVP while preserving Study Tour Delivery as the supporting vertical. | Proves the broader persona without rebuilding two equal-depth workflows. | Equal-depth scenarios; discard Study Tour | Product owner |
| D-024 | 2026-08-22 | Preserve `TourFlow` as the future Study Tour Delivery module name and do not use `Copilot` as the umbrella name before genuine AI exists. | Retains the value of Sprint 01 while avoiding a narrow or overstated umbrella name. | Keep TourFlow as umbrella; use Global Engagement Copilot immediately | Product owner |
| D-025 | 2026-08-22 | Defer genuine AI until the structured non-AI workflow is implemented and reviewed. | Ensures AI is added to a validated workflow rather than used as decoration. | Add chatbot or generated summaries during Sprint 02 | Product owner |
| D-026 | 2026-08-22 | Make Enquiry → Structured Engagement Scope the first future genuine AI feature. | It is bounded, source-groundable, reviewable, and directly connected to the approved workflow. | Briefing generation; generic chat; predictive scoring | Product owner |
| D-027 | 2026-08-22 | Adopt a real-world evidence policy separating factual professional experience, anonymised/composite cases, and fictional/synthetic demo records. | Protects confidentiality and truthfulness while allowing genuine domain experience to inform the portfolio. | Use only invented context; attach fictional records to recognisable institutions | Product owner |
| D-028 | 2026-08-22 | Use one anonymised/composite Chinese higher education Partner Relationship containing an earlier Study Tour and later Senior Delegation engagement. | Demonstrates continuity across engagements without implying invented events occurred at a real institution. | Two disconnected scenarios; a real institution with fictional history | Product owner |
| D-029 | 2026-08-22 | Keep Sprint 02 implementation closed until a separate instruction. | Maintains the product-strategy gate and prevents documentation approval from triggering a refactor. | Begin migration immediately after PR #2 revision | Product owner |
| D-030 | 2026-08-22 | Authorise Sprint 02A only for Relationship + Engagement Core on `sprint-02a-relationship-engagement-core`. | Proves relationship-memory continuity without prematurely implementing the full PRD 0.4 workflow. | Implement all delegation planning features; remain documentation-only | Product owner |
| D-031 | 2026-08-22 | Defer a full `Commitment` object to Sprint 02B. | A previous engagement signal linked to a current objective is sufficient for the Sprint 02A proof. | Add speculative commitment fixtures and UI now | Product owner |
| D-032 | 2026-08-22 | Use a completed 2025 composite Study Tour as the relationship-memory source while preserving the accepted 2026 Study Tour Delivery snapshot as a separate engagement. | Keeps the causal history chronologically valid without changing `DEMO_TODAY` or regressing the Sprint 01 readiness demo. | Pretend the not-yet-departed 2026 Study Tour already produced outcomes; change the fixed demo clock | Product owner |
| D-033 | 2026-08-22 | Use `Eastern Horizon University` as the fictional/composite public-facing partner name for Sprint 02A. | Provides a credible but non-real institution identity and supports the approved evidence policy. | Use a real university name; leave the deep scenario unnamed | Product owner |

## Current implementation boundary

Sprint 02A is authorised on `sprint-02a-relationship-engagement-core`. Its boundary is the Relationship / Engagement domain layer, `Home / Relationships / Engagements` IA, the connected composite relationship-memory demonstration, Senior Delegation Overview, and compatibility access to Study Tour Delivery. Stakeholder matching, agenda, briefing, outcomes capture, commitments, genuine AI, persistence, authentication, integrations, analytics, and deployment remain unauthorised.

## Unresolved decisions

- final umbrella product name;
- Sprint 02B implementation scope and authorisation;
- genuine AI implementation and evaluation;
- external integrations; and
- database, authentication, and persistence.

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

### 2026-08-22 — Pivot approval and real-world evidence policy

**Objective**

Finalise PRD 0.4 before PR #2 review by converting the accepted pivot proposals into approved decisions and defining how genuine professional experience, real institution names, anonymised/composite cases, and fictional demo records may be used.

**Inputs**

- Product-owner approval in principle of the positioning, central model, signature workflow, IA, delegation-first MVP, Study Tour module strategy, AI deferral, and first future AI feature.
- Requirement to protect confidentiality and avoid attaching invented events to real organisations.
- Portfolio need to explain that workflow expertise comes from prior professional experience while the software is a current independent prototype.

**Changes**

- Moved PD-001 through PD-007 into approved decisions D-019 through D-026 and added explicit decisions for evidence policy, the connected composite demo, and the Sprint 02 gate.
- Defined three evidence classes: factual professional experience, anonymised/composite cases, and fictional/synthetic product records.
- Approved a single anonymised/composite Chinese higher education Partner Relationship with an earlier Study Tour and later Senior Delegation engagement.
- Made continuity of institutional intent across engagements the core product test.
- Added truthful public portfolio disclosure language and prohibited claims that the prototype was historically deployed or used in production.
- Added a Sprint 02 migration note preserving the 24-participant Study Tour workflow, readiness, requirements, deterministic attention, itinerary/logistics, fixed clock, confirm/reset interaction, and relevant tests.
- Kept final umbrella naming, composite-partner public naming, implementation, AI delivery, integrations, and production architecture unresolved.

**Evidence policy**

- Real institution names may appear only with accurate, non-confidential, supportable facts from genuine professional experience.
- A composite may combine patterns from multiple real workflows but must not be presented as a literal historical record.
- Invented delegations, engagements, people, outcomes, commitments, agreements, records, and timelines must be labelled fictional, synthetic, anonymised, or composite.
- A real university name must not be attached to invented relationship history or outcomes in a way that implies they occurred.
- No real student personal information, confidential university data, or production institutional system is used in the prototype.

**Validation**

- Confirmed PRD 0.4, Pivot Analysis, and Project Log use the same approved decisions and unresolved-decision list.
- Confirmed the connected demo uses an anonymised/composite partner rather than a real institution name.
- Confirmed no documentation claims prior deployment or production use.
- Confirmed only the three approved documentation files changed; application code, fixtures, dependencies, repository names, and Vercel configuration are unchanged.
- `git diff --check` passed.

**Outcome**

- The pivot direction and evidence policy are ready for review in PR #2.
- Domain authenticity is grounded in genuine professional experience and workflow knowledge, not invented records attached to real organisations.
- Sprint 02 and genuine AI implementation remain unauthorised.

### 2026-08-22 — Sprint 02A Relationship + Engagement Core

**Objective**

Prove that a completed international engagement can create reusable relationship context that visibly informs an objective in a later engagement, without implementing the full PRD 0.4 workflow.

**Architecture and domain decisions**

- Added `PartnerOrganisation`, `Relationship`, `Engagement`, `EngagementType`, `EngagementStage`, `EngagementObjective`, and `RelationshipSignal` as the minimum coherent Sprint 02A domain layer.
- Modelled `Engagement` as a discriminated union. Only `StudyTourEngagement` contains `studyTourProgramId`; Delegation records cannot inherit participant-readiness fields.
- Kept `EngagementStage` independent from Study Tour `LifecycleStage` and `ReadinessState`.
- Deferred a full `Commitment` object because the Sprint 02A success test ends at the current objective.
- Added `engagement-rules.ts` for relationship history, memory, objective source-context validation, Home summaries, and relationship summaries instead of deriving them in UI components.
- Added a compatibility relationship from the 2026 Study Tour engagement to the stable Sprint 01 `Program` through `studyTourProgramId` rather than rewriting readiness rules.

**Fixture strategy**

- Introduced fictional/composite `Eastern Horizon University` as the deeply represented Chinese higher education partner.
- Used a completed September 2025 Study Tour as the chronological source of a composite outcome and strategic signal.
- Preserved the accepted September 2026, 24-participant Study Tour Delivery fixture and fixed `DEMO_TODAY = 2026-08-22` as a separate scheduled engagement in the same relationship.
- Added a later October 2026 Senior Delegation Visit with eight synthetic representatives and four strategic interests.
- Added two lighter composite relationships plus Partner Meeting and Short Program records for credible portfolio variation.

**UI and migration decisions**

- Replaced global `Dashboard / Programs / Participants` navigation with `Home / Relationships / Engagements`; legacy Programs and Participants routes remain available for compatibility but are not promoted globally.
- Used `Global Engagement` as an explicitly temporary shell identity and retained `TourFlow` only on Study Tour Delivery.
- Made Relationship Detail the primary Sprint 02A screen, with a restrained `Previous signal → Relevant now` memory panel and mobile-first stacked history cards.
- Implemented Senior Delegation Overview only: stage, partner, dates, delegation size, interests, source enquiry, open questions, and objectives.
- Displayed the causal source on the broader-collaboration objective and linked it back to Relationship Memory.
- Created a Study Tour Delivery route that reuses the stable participant, requirement, milestone, itinerary, readiness, attention, confirm, and reset rules.

**Validation**

- ESLint: passed.
- TypeScript no-emit check: passed.
- Vitest: 2 files and 13 tests passed, including all Sprint 01 tests.
- Next.js production build: passed; 19 static pages generated.
- Browser verification: Home, primary Relationship, Delegation Overview, and Study Tour Delivery loaded without console warnings, error overlays, or horizontal overflow.
- Responsive verification: primary routes passed at a 390 × 844 viewport; Relationship Memory and engagement history remain sequential and readable rather than becoming a compressed table.
- Interaction verification: `Confirm requirement` changed the primary Study Tour from 6 to 5 outstanding requirements and 2 to 1 blocked participants; `Reset demo` restored 6 and 2.
- Accessibility checks: semantic headings and lists retained, mobile navigation opened correctly, status labels include text, and keyboard focus displayed a visible blue outline.

**Issues encountered**

- The workspace shell again required the bundled Node path before pnpm commands could run; the implementation itself had no TypeScript failure.
- The optional `agent-browser` CLI was unavailable, so equivalent browser, responsive, console, overlay, interaction, and focus checks were completed with the installed in-app browser control.
- A single historical Study Tour could not be both completed and retain the accepted pre-departure snapshot on the fixed demo date. The solution was to model a completed 2025 Study Tour as the memory source and preserve the 2026 delivery workflow as a separate engagement in the same relationship.

**Lessons learned**

- Relationship memory becomes understandable when the UI names both the source engagement and the current objective; a timeline alone is insufficient.
- A compatibility adapter preserves trusted vertical rules while a new aggregate is introduced above them.
- Chronological fixture coherence matters to portfolio credibility and should not be sacrificed to force two scenarios into one record.
- The smallest useful cross-engagement model does not yet require stakeholders, agenda items, briefing records, outcomes capture, or commitments.

**Deliberately deferred to Sprint 02B**

- objective-to-stakeholder matching;
- objective-linked agenda design;
- briefing preparation;
- post-engagement outcome capture;
- commitments, owners, due dates, and follow-up;
- any genuine AI assistance; and
- persistence, authentication, external integrations, analytics, and deployment.

**Outcome**

- A first-time reviewer can follow `Previous Study Tour → strategic signal → Relationship Memory → Senior Delegation → sourced objective` directly in the interface.
- Sprint 01 Study Tour Delivery remains demonstrable and its rules are unchanged.

### 2026-08-22 — Sprint 02A review-fix pass

**Review findings and decisions**

- Removed the primary-demo constants and Delegation-specific narrative from generic Relationship Detail derivation.
- Added explicit relationship-memory states: linked continuity, signals without a linked later objective, and no recorded signals. Each state now renders only fixture-backed context.
- Renamed the misleading `openSignal` summary field to `latestSignal`; open/completed follow-up semantics remain deferred to the future `Commitment` model.
- Replaced hard-coded Home coordination copy with deterministic prompts derived from Delegation `openQuestions` and the existing Study Tour readiness and attention rules.
- Defined current/upcoming engagements by both non-completed stage and an end date on or after fixed `DEMO_TODAY`, preventing stale non-completed records from appearing.

**Regression and manual QA**

- Expanded the focused suite to 22 passing tests across Sprint 01 and Sprint 02A, including supporting-relationship memory states, latest-signal ordering, source-derived Home prompts, and past-engagement exclusion.
- Verified Eastern Horizon University renders the linked 2025 Study Tour signal and 2026 Senior Delegation objective.
- Verified Sakura Coast Institute renders its recorded signal without inventing a Delegation or linked objective.
- Verified Straits Meridian University renders an honest empty state with no fabricated history.
- Rechecked all three relationship pages at desktop and 390 × 844 mobile widths with no console errors or horizontal overflow.

**Scope control**

- No Stakeholder matching, Agenda, Briefing, Commitment, AI, persistence, external integration, deployment, or Sprint 02B work was introduced.

### 2026-08-22 — Sprint 02A.5 Academic Editorial visual reset

**Reason for the reset**

- Product and code review accepted the Sprint 02A workflow but identified that the dark sidebar, rounded cards, pills, shadows, teal panels, and repeated eyebrow labels resembled a generic AI-SaaS or CRM template.
- The interface needed to communicate higher-education domain credibility independently of any future AI functionality.

**Approved visual direction**

- Adopted `Academic Editorial × Executive Briefing`: approximately 70% editorial composition, 20% university operations UI, and 10% restrained semantic colour.
- Moved hierarchy to typography, whitespace, alignment, dates, metadata, thin rules, indentation, and chronological reading order.
- Used a warm paper background, near-white surface, primary ink, university navy, warm divider, muted sage, ochre, burgundy, and blue-grey relationship-context tokens.
- Retained the system sans-serif stack for operational text and introduced system Georgia only for major page titles; no font or UI dependency was added.

**Navigation and components**

- Replaced the dark full-height SaaS sidebar with a light institutional navigation rail and a restrained text-only temporary brand treatment.
- Preserved the exact global IA: `Home / Relationships / Engagements`.
- Added small presentation primitives for section headers, metadata rows/lists, dividers, and timeline items. Business rules remain outside these components.
- Replaced large status pills with a marker plus readable status text, using sage for completed/ready, blue-grey or navy for scheduled/in-progress, ochre for planning/scoping, and burgundy for attention/blocked states.

**Page decisions**

- Reframed Home as a daily briefing desk with current engagement focus, relationship context, source-derived coordination prompts, and chronological dates rather than KPI cards.
- Rebuilt Relationship Detail as a partner dossier with a vertical `Study Tour signal → context carried forward → Delegation objective` chronology; signals-only and empty states remain source-backed and honest.
- Reframed Senior Delegation Overview as an executive briefing with numbered objectives, source context, enquiry, and open questions, without introducing Sprint 02B sections.
- Restyled TourFlow Study Tour Delivery with compact readiness metrics, divider-led attention and logistics sections, and the existing Confirm requirement / Reset demo interaction unchanged.

**Responsive and accessibility decisions**

- Desktop uses editorial columns where they clarify context; 390 × 844 layouts stack into a single chronological reading order rather than compressing tables or timelines.
- Preserved semantic headings, ordered lists, labelled progress, text-based statuses, keyboard-operable controls, and a high-contrast navy focus outline.
- Browser QA covered Home, Relationships, all three Relationship states, Senior Delegation, and Study Tour Delivery on desktop and 390 × 844 with no error overlay, console errors, or horizontal overflow.

**Lessons learned**

- A distinctive institutional product character can come from typographic rhythm and information composition rather than ornamental branding or additional dependencies.
- Relationship continuity is clearer as an editorial chronology than as adjacent coloured cards connected by a diagram arrow.
- Removing decorative surfaces makes source context, dates, status, and next actions easier to compare without changing product behaviour.

**Scope control**

- Domain logic, fixtures, routes, deterministic rules, and demo-state behaviour were preserved.
- No stakeholder matching, agenda, briefing generation, outcomes, commitments, AI, persistence, authentication, integration, analytics, deployment, or Sprint 02B functionality was added.

## Problems and solutions

| ID | Date | Problem | Impact | Root cause | Solution | Verification |
| --- | --- | --- | --- | --- | --- | --- |
| P-001 | 2026-08-22 | The workspace shell did not expose Node.js on `PATH`, and pnpm initially withheld the native resolver build step. | The first dependency install could not complete reliably. | This Codex workspace uses a bundled Node runtime and pnpm's explicit build approval. | Used the configured bundled Node path for project commands and allowed only `unrs-resolver` in `pnpm-workspace.yaml`. | Clean install completed and every project check ran with the pinned toolchain. |
| P-002 | 2026-08-22 | The newest TypeScript 7 and ESLint 10 releases did not satisfy the peer ranges of the current Next.js lint ecosystem. | Installation produced compatibility warnings that could make the baseline brittle. | Tool releases were newer than the supported peer ranges of `eslint-config-next` and related plugins. | Pinned TypeScript 6.0.3 and ESLint 9.39.5 while keeping Next.js, React, Tailwind, and Vitest current. | Peer compatibility check and all lint, type, test, and build commands passed. |
| P-003 | 2026-08-22 | The accepted 2026 pre-departure Study Tour could not truthfully serve as a completed historical engagement on the fixed August 2026 demo date. | Treating it as historical would undermine the relationship-memory story and fixture credibility. | The pivot connected two scenarios that originally had incompatible lifecycle timing. | Added a completed 2025 composite Study Tour for relationship memory and adapted the unchanged 2026 Study Tour Delivery as a separate engagement. | Domain tests validate the shared relationship, prior source context, and preserved delivery metrics. |

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
| 2026-08-22 | Approved PRD 0.4 | Evidence-policy and scenario audit | Pass | Real, anonymised/composite, and fictional/synthetic use is explicit; the connected demo uses a composite partner and no real organisation is attached to invented events. |
| 2026-08-22 | Approved PRD 0.4 | Documentation-only scope audit | Pass | Only PRD, Pivot Analysis, and Project Log changed; application code, fixtures, dependencies, repository naming, and Vercel configuration remain unchanged. |
| 2026-08-22 | Sprint 02A | Relationship-memory and status-separation tests | Pass | Vitest: 2 files, 13 tests passed, including the original Sprint 01 suite. |
| 2026-08-22 | Sprint 02A | ESLint and TypeScript | Pass | `pnpm lint` and `pnpm typecheck` exited successfully with the bundled Node runtime on `PATH`. |
| 2026-08-22 | Sprint 02A | Production build | Pass | `pnpm build` compiled successfully and generated 19 static pages. |
| 2026-08-22 | Sprint 02A | Desktop, mobile, interaction, and accessibility verification | Pass | Core routes loaded without browser errors or overflow; mobile checked at 390 × 844; confirm/reset metrics reconciled; focus outline visible. |

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
| 2026-08-22 | Domain authenticity should come from genuine professional experience and workflow knowledge, not by attaching fictional product records to real organisations. | Use factual claims only when supportable; otherwise disclose anonymised, composite, fictional, or synthetic scenarios. |
| 2026-08-22 | A relationship timeline does not prove continuity unless source context is attached to a current decision. | Show the prior signal directly beside the current objective and link both to their source records. |
| 2026-08-22 | A new aggregate can be introduced safely above a trusted vertical through a narrow compatibility key. | Keep Study Tour rules stable and adapt them into Engagement instead of rewriting them. |

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
| Stakeholder and agenda coordination | Turn current objectives into coordinated university action | Sprint 02B, pending separate authorisation | Requires approved stakeholder, capability, agenda, outcome, and commitment boundaries |
| Structured engagement briefing | Reduce repeated briefing assembly | Sprint 02, pending separate authorisation | Deterministic assembly first; AI draft later with provenance and review |
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

- [x] the international engagement operating-layer positioning is approved;
- [x] the product has a defensible workflow-level difference from CRM and mobility platforms;
- [x] `Relationship → Engagement` is approved as the central model;
- [x] the minimal core objects and Study Tour Delivery extension are approved in principle;
- [x] continuity from prior engagement through objective, outcome, commitment, and relationship memory is approved as the signature workflow;
- [x] the `Home / Relationships / Engagements` IA is approved;
- [x] the delegation-first MVP scope is approved;
- [x] the new-umbrella / TourFlow Study Tour module naming strategy is approved, while the final umbrella name remains unresolved;
- [x] the connected scenarios use an anonymised/composite partner and synthetic people;
- [x] the Sprint 01 migration/reuse map is approved in principle;
- [x] Enquiry → Structured Engagement Scope is approved as the first future AI use case, while AI implementation remains deferred; and
- [x] a separate instruction explicitly authorises Sprint 02A Relationship + Engagement Core implementation.

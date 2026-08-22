# TourFlow Product Pivot Analysis

**Status:** Product direction and evidence policy approved; Sprint 02 implementation not authorised

**Date:** 22 August 2026

**Umbrella product name:** Unresolved; `Copilot` is not approved for user-facing use before genuine AI exists

**Repository and current application name:** Unchanged

## Executive decision

The product is approved in principle as an **international engagement operating layer**, not another system of record.

The strongest positioning is:

> Help an international engagement professional turn partner intent into coordinated university action, then turn completed engagements into durable institutional relationship memory.

Its approved signature workflow is the traceable chain:

```text
Partner Intent
  → Scope
  → Objectives
  → Stakeholders / Agenda
  → Outcomes
  → Commitments
  → Relationship Memory
```

This is more defensible than “one place for contacts, notes, and tasks,” but it is not automatically defensible. Existing CRM and international-office products already manage partner records, mobility, agreements, workflows, reports, and engagement history. The concept earns a distinct role only by making the objective-to-outcome chain operationally explicit and by supporting engagement-type-specific delivery, such as the existing Study Tour readiness workflow.

The approved name strategy is to choose a new umbrella product name later and keep **TourFlow** as the Study Tour Delivery module name. `Copilot` must not be used as the user-facing umbrella name until genuine AI functionality exists. No repository or application rename occurs in this documentation phase.

## Domain Experience Informing the Product

The product concept is informed by genuine professional experience across international education activities including:

- university partnership development;
- study tours;
- international summer schools;
- articulation pathways;
- student exchange;
- credit transfer;
- stakeholder coordination;
- academic and operational program delivery; and
- long-term institutional relationship development.

This domain experience explains the operational problems and workflow judgment behind the prototype. The software product, architecture, AI-enabled concepts, demo interactions, and demo records are current independent prototype work; they must not be presented as a previously deployed institutional system.

Real institution names may be used only for accurate, non-confidential, supportable facts from genuine professional experience. Workflows that require protected context must use an anonymised or composite case. Invented records must be disclosed as fictional, synthetic, or composite, and a real institution name must never be attached to invented history or outcomes.

No employer names, client names, institution names, metrics, or project outcomes may be added unless the product owner explicitly approves them. The intended portfolio claim is:

> Built from domain experience, not built from a job description.

Recommended public disclosure:

> This is an independently developed portfolio prototype informed by real international education partnership experience. Demo records are fictional, synthetic or anonymised unless explicitly stated otherwise.

> No real student personal information, confidential university data or production institutional systems are used.

## A. Original TourFlow model

Sprint 01 established a coherent vertical workflow:

```text
Program
  → Participants
  → Requirements
  → Readiness
  → Attention Items
  → Itinerary and logistics
```

Its value is operational clarity before departure. A coordinator can identify the program requiring attention, understand the underlying participant requirement, confirm one requirement, and observe every derived metric update from the same state source.

Strengths demonstrated by Sprint 01:

- a clear user and decision question;
- typed domain records rather than UI-only mock data;
- independent lifecycle and readiness semantics;
- deterministic, explainable attention rules;
- derived aggregates rather than manually maintained counters;
- a reproducible fixed demo clock;
- one convincing, resettable workflow interaction; and
- a restrained, responsive internal-operations interface.

The implementation is therefore a valid Study Tour Delivery foundation, not discarded work.

## B. Problem identified

The original model is too narrow to be the umbrella product because its top-level language and value proposition are dominated by cohort readiness and travel delivery. If expanded only by adding more program pages, document states, contacts, tasks, and itinerary screens, it risks resembling:

- a configured mobility-management platform;
- a lightweight education CRM;
- a generic workflow dashboard with study-tour labels; or
- a document and task tracker without a differentiated decision model.

The strategic gap is above delivery. International Relations and Global Engagement officers must connect relationship history, partner intent, internal university capability, engagement design, institutional commitments, and follow-up. Sprint 01 does not model that coordination layer.

The product review therefore changes the central question from:

> Which study tour is not ready, why, and what should happen next?

to:

> Given this partner relationship and their intent, what university action should be coordinated now, what was achieved, and what commitment should carry forward?

The original question remains valid inside a Study Tour engagement.

## C. Broader international engagement model

### Approved aggregate structure

```text
PartnerOrganisation
  └─ Relationship
       ├─ relationship context, themes, contacts, history
       ├─ open commitments
       └─ Engagements
            ├─ Delegation Visit
            ├─ Partner Meeting
            ├─ Government / Industry Visit
            ├─ Strategic Partnership Activity
            ├─ Short Program
            └─ Study Tour
                 └─ StudyTourDelivery
                      ├─ Participants
                      ├─ Requirements
                      ├─ Readiness
                      ├─ Attention Items
                      └─ Itinerary / logistics
```

### Smallest coherent core domain

| Object | Why it exists | MVP boundary |
| --- | --- | --- |
| `PartnerOrganisation` | Identifies the external institution or organisation. | Store only a fictional name, location, organisation type, and brief profile. Do not recreate a CRM account record. |
| `Relationship` | Represents the university's institutional context with that partner. | Strategic themes, relationship summary, relationship owner, engagement history, and open commitments. |
| `Contact` | Identifies a small number of relevant external relationship contacts. | Name, role, organisation, and engagement participation only; no contact-management workflow. |
| `Engagement` | Represents a bounded piece of coordinated international work. | Type, source, dates, stage, owner, partner relationship, purpose, and open questions. |
| `EngagementObjective` | Converts partner intent into explicit goals and success signals. | Statement, theme, priority, evidence of completion, and links to agenda items/outcomes. |
| `StakeholderAssignment` | Connects an engagement objective to an internal host or external guest and their role. | Reference a small fictional stakeholder/capability directory; no enterprise people directory. |
| `AgendaItem` | Represents a purposeful activity in an engagement plan. | Time, location, owner, objective links, status, and discussion notes/outcome links. |
| `Outcome` | Records what was decided or learned. | Link to an engagement, objective, and optionally an agenda item. |
| `Commitment` | Records an agreed next action that survives the engagement. | Description, owner, due date, state, related outcome/objective, and relationship visibility. |

Existing `Milestone` and `AttentionItem` remain supporting operational types. They should not become top-level product concepts. A briefing is a **derived workspace/view** assembled from relationship and engagement records, not a separate content silo. Agreements remain external reference metadata in the MVP rather than a managed agreement object.

### Engagement type boundaries

All engagements share scope, objectives, stakeholder coordination, agenda, outcomes, and commitments. Type-specific extensions add only what is relevant:

| Engagement type | Shared workflow | Type-specific workflow |
| --- | --- | --- |
| Delegation visit | Scope, objectives, stakeholders, agenda, briefing, outcomes, commitments | Delegation profile and hosting logistics |
| Partner meeting | Scope, objectives, attendees, notes, outcomes, commitments | No additional V1 extension |
| Government / industry visit | Scope, objectives, stakeholders, agenda, briefing, outcomes | Protocol or security requirements only if later validated |
| Short program | Shared engagement workflow | Optional delivery extension after user research |
| Study tour | Shared engagement workflow | `StudyTourDelivery`: participants, requirements, readiness, attention, itinerary, accommodation, and transport |

Senior delegation visits must never inherit participant readiness, passport, insurance, or cohort metrics merely because both scenarios have people and dates.

### Approved relationship-memory demo strategy

Use one anonymised/composite Partner Relationship representing a Chinese higher education institution. The exact public-facing partner name remains unresolved.

The earlier engagement is the accepted 24-participant Study Tour / short-program workflow. It contributes a clearly labelled composite outcome and follow-up to relationship memory:

> Strong student and academic engagement with Business Analytics and innovation programming identified an opportunity for broader institutional collaboration.

> Explore opportunities to extend collaboration beyond short-term student programs.

The later engagement is a senior delegation visit with eight synthetic representatives and interests in Artificial Intelligence, Business Analytics, Student Mobility, and Joint Programs. Its scope, objectives, briefing, stakeholders, and agenda must visibly use relevant context from the earlier Study Tour.

```text
Study Tour
→ Outcome
→ Relationship Memory
→ Senior Delegation
→ Objectives
→ Stakeholders / Agenda
→ Outcomes
→ Commitments
→ Updated Relationship Memory
```

The outcome and follow-up above are fictional/composite product records, not claims about a real institution. Neither scenario should use a real university name unless every associated event and statement is factual, non-confidential, supportable, and explicitly approved for disclosure.

## D. Comparison with generic CRM and mobility platforms

The product cannot claim that partner records, unified history, mobility workflows, agreements, reporting, or AI alone are unique:

- Salesforce describes education CRM as managing relationships with students, staff, alumni, and corporate partners in a unified view, with configurable data, automation, activities, and AI capabilities ([Salesforce Education Cloud](https://www.salesforce.com/education/cloud/)).
- QS MoveON explicitly supports international mobility and partnership activity, relationship management, agreements, workflow configuration, reporting, and international-office collaboration ([QS MoveON](https://www.qs.com/en-us/solutions/moveon), [MoveON learning platform](https://academy.qs.com/moveon)).
- Terra Dotta already supports travel registration, trip requirements, approvals, traveller records, risk information, and alerts ([Terra Dotta Travel Registry](https://www.terradotta.com/travel-registry/)).

### Workflow-level comparison

| Need | Generic CRM is better when… | Mobility platform is better when… | Approved product earns a role when… |
| --- | --- | --- | --- |
| Partner and contact master data | The institution needs canonical accounts, deduplication, permissions, email history, campaigns, and integrations. | Not usually the primary purpose. | It reads or mocks partner context but does not claim to own master data. |
| Agreements and exchange administration | Custom CRM objects and enterprise workflows have already been configured. | The institution needs agreements, nominations, applications, grants, compliance, and reporting at scale. | It references relevant agreement context while coordinating a specific engagement. |
| Student mobility and travel readiness | The CRM has institution-specific case/application workflows. | The institution needs participant portals, approvals, documents, travel registry, duty-of-care processes, and live integrations. | TourFlow demonstrates a narrow coordinator view and does not replace regulated or student-facing workflows. |
| Visit or engagement design | Generic tasks and notes are sufficient. | The activity is primarily a mobility record. | Partner intent must be translated into objectives, internal capability, purposeful agenda items, outcomes, and owned commitments. |
| Briefing preparation | CRM history is already clean and a generic summary is sufficient. | Mobility facts dominate the briefing. | The officer needs a structured, engagement-specific briefing grounded in relationship history, objectives, attendees, prior commitments, and open questions. |
| Institutional memory | Activity history alone answers the question. | Mobility and agreement records answer the question. | Outcomes and commitments from one engagement must update future relationship context and shape the next engagement. |

### Defensible boundary: continuity of institutional intent

The concept is defensible as a portfolio product if it demonstrates **continuity of institutional intent across engagements**, not database breadth. The product must make it possible to answer:

1. What happened in a previous engagement?
2. What strategic signal, outcome, or commitment resulted?
3. Why is that context relevant now?
4. Which objective in the current engagement follows from that history?
5. Which internal university stakeholder or activity supports that objective?
6. What happened during the current engagement?
7. What commitment should carry into future relationship planning?

This requires traceability and coordination:

1. every agenda activity explains which objective it advances;
2. every outcome identifies the objective or discussion that produced it;
3. every commitment has an owner, date, and relationship context;
4. future engagement preparation can surface prior outcomes and open commitments; and
5. specialised engagement types add only relevant delivery workflows.

It is not defensible if the implementation becomes a contact directory, timeline, kanban board, note editor, or generic “Ask AI” interface.

## E. Existing Sprint 01 reuse and implementation-impact map

This table records the approved migration direction. It does not authorise or perform any application change in this phase.

| Existing component/domain | Keep | Modify | Reframe | Remove |
| --- | --- | --- | --- | --- |
| Next.js, TypeScript, Tailwind foundation | Entire technical foundation and quality scripts | None required for the pivot decision | Shared foundation for the broader product | Nothing |
| Application shell and responsive patterns | Layout, navigation behaviour, accessibility, visual system | Navigation labels and destinations in a later authorised sprint | Shell for an international engagement workspace | Nothing |
| `Program` | IDs, names, dates, owner/lead concepts, fixture history | Map common fields to `Engagement`; move study-tour lifecycle fields into its extension | Existing records become engagements of type `study_tour` | Deprecate `Program` as the umbrella entity only after an adapter/migration exists |
| `Participant` | Identity minimisation, participant type, synthetic-data marker | Change `programId` to `engagementId` or a Study Tour Delivery key | Type-specific Study Tour participant, not a generic engagement attendee | Nothing |
| `Requirement` | Status model, kinds, document metadata, criticality, dates | Change ownership key from program to Study Tour engagement/delivery | Study Tour Delivery requirement | Nothing |
| `ReadinessState` and readiness rules | Deterministic semantics and tests | Scope them explicitly to Study Tour Delivery and update key names | Type-specific delivery state, not a universal engagement status | Nothing |
| `AttentionItem` | Explainability, severity, source links, deterministic ordering | Replace `programId` with `engagementId`; broaden source types carefully | Shared derived attention signal with rule families per engagement type | Do not create opaque AI risk scores |
| `Milestone` | Status, due date, blocking semantics | Replace `programId` with `engagementId`; optionally link an objective | Shared engagement milestone | Nothing |
| `ItineraryEntry` | Existing Study Tour travel, accommodation, and timing records | Link to a Study Tour engagement/delivery | Type-specific itinerary; reuse visual patterns for generic `AgendaItem` | Do not force it to represent every engagement agenda |
| `ProgramSummary` | Calculation patterns and typed summaries | Split into `EngagementSummary` plus optional `StudyTourReadinessSummary` | Type-aware summary composition | Retire only after callers migrate |
| `DashboardSnapshot` and Dashboard | Derived aggregation, attention ordering, readiness panels, responsive cards | Add relationship/engagement/commitment context; avoid displaying study-tour totals as universal portfolio KPIs | Home becomes engagement coordination; retained readiness becomes one module card/view | Remove only decorative or no-longer-relevant cohort-wide metrics from the umbrella Home |
| `ProgramCard` and program routes | Card hierarchy and route-context pattern | Adapt to engagement type and relationship context | Engagement list/detail; Study Tour route can use a compatibility redirect or wrapper later | No immediate removal |
| Confirm/reset requirement interaction | Entire deterministic transition and tests | Move state under Study Tour Delivery context | Proof that source-state changes drive aggregates | Nothing |
| Three Sprint 01 fixtures | All 72 synthetic identities and readiness variation | Wrap their programs as Study Tour engagements | Supporting Study Tour portfolio scenario | Nothing |

## F. Approved domain migration direction

### Migration principles

1. Add the relationship and engagement layer before renaming or deleting existing types.
2. Preserve fixture IDs where practical so tests and links can migrate incrementally.
3. Use an explicit `EngagementType` discriminator to control type-specific capabilities.
4. Keep generic engagement stage separate from Study Tour lifecycle and readiness.
5. Do not make `Participant` a synonym for every guest, contact, or stakeholder.
6. Keep all derived values computed from source records.

### Approved mapping direction

| Current concept | Target destination | Migration treatment | Reason |
| --- | --- | --- | --- |
| `Program` | `Engagement` + optional `StudyTourDelivery` | Wrap first; rename after tests and routes use the new aggregate | A program is one engagement type, not the relationship root. |
| `LifecycleStage` | `StudyTourLifecycleStage`; add separate `EngagementStage` | Keep values for Study Tours; do not reuse them for delegation visits | `applications` and `pre_departure` do not describe every engagement. |
| `ReadinessState` | `StudyTourReadinessState` | Keep semantics and rules | Delegations require coordination status, not participant readiness. |
| `Participant` | `StudyTourParticipant` or retained `Participant` within `StudyTourDelivery` | Keep with key migration | Prevents senior guests and internal hosts from inheriting student requirements. |
| `Requirement` | `StudyTourRequirement` | Keep with key migration | Current requirement kinds and status model remain valid for Study Tour delivery. |
| `ItineraryEntry` | Study Tour itinerary; generic `AgendaItem` added separately | Keep and reframe | Travel logistics and objective-linked engagement activities overlap visually but not semantically. |
| `Milestone` | Engagement milestone | Modify foreign key and optionally link an objective | Milestones are useful across engagement types. |
| `AttentionItem` | Engagement attention item with type-specific rule families | Modify keys and source union | Explainable attention is useful broadly, but trigger rules differ by type. |
| `ProgramSummary` | `EngagementSummary` with optional type-specific summary | Replace through an adapter | Avoid forcing readiness fields onto every engagement. |
| `DashboardSnapshot` | Home coordination snapshot | Reframe | Add engagements and commitments while preserving a Study Tour readiness slice. |

### Approved stage semantics

`EngagementStage` should describe a shared engagement journey:

```text
enquiry → scoping → planning → scheduled → in_progress → follow_up → completed
```

Study Tours additionally retain their own delivery lifecycle and readiness inside `StudyTourDelivery`. A mapping may derive the broad engagement stage for portfolio display, but the two source concepts must not be treated as interchangeable.

## G. Approved information architecture

### Critique of the candidate IA

`Home / Relationships / Engagements / Tasks or Commitments` is directionally sound, but a top-level task destination would make the MVP feel like a generic work manager. Separate Contacts, Agreements, Guests, Logistics, and Briefing destinations would also create enterprise breadth before the core workflow is proven.

### Approved smallest credible IA

```text
Home
Relationships
  Relationship detail
    Overview
    Engagement history
Engagements
  Engagement detail
    Overview
    Plan
    Briefing
    Outcomes
    Delivery — Study Tour only
      Participants
      Readiness
      Itinerary
```

| Area | Decision question |
| --- | --- |
| Home | Which engagement or commitment needs coordination now? |
| Relationships | What is the institutional context with this partner? |
| Engagements | What work is being scoped, planned, delivered, or followed up? |
| Relationship Overview | Who is the partner, what matters strategically, and what remains open? |
| Engagement History | What has happened before, with what outcomes and commitments? |
| Engagement Overview | What is the request, scope, objective, stage, owner, and missing information? |
| Plan | Which stakeholder and agenda activity advances each objective? |
| Briefing | What context does the internal team need before the engagement? |
| Outcomes | What was achieved, decided, or committed, and who owns follow-up? |
| Study Tour Delivery | Which participant, requirement, readiness, or logistics issue affects delivery? |

Commitments appear on Home, Relationship Overview, and Engagement Outcomes. They do not need their own global destination in the next MVP.

## H. MVP options

### Option 1 — Delegation-first engagement loop (approved)

Build one anonymised/composite relationship containing an earlier Study Tour and a later senior delegation engagement, while preserving the existing Study Tour as a type-specific delivery module.

Why it is strongest:

- demonstrates the new differentiation rather than adding another list page;
- proves the relationship-to-engagement model with a bounded fixture set;
- creates a clear before/during/after story;
- reuses the existing visual and rule foundation; and
- keeps the Study Tour vertical visible without rebuilding it.

### Option 2 — Equal-depth delegation and Study Tour workflows

Not recommended. It doubles page and fixture scope before the shared model is validated and would make the portfolio demonstration harder to explain.

### Option 3 — Domain migration and navigation only

Not recommended as the full next MVP. It is technically tidy but produces no distinctive end-to-end user outcome. Domain migration should support the delegation story, not become the story.

### Approved MVP scope matrix

| Next MVP | Mock/reference only | V2 or later | Remove entirely from the concept |
| --- | --- | --- | --- |
| Home with engagement and commitment triage | CRM partner/account source | Real CRM, calendar, email, directory, and agreement integrations | Generic sales pipeline and opportunity forecasting |
| One Relationship page with themes, history, and open commitments | Agreement summary/link | Agreement lifecycle management | Marketing campaigns and mass communications |
| One Delegation engagement with scope, objectives, stakeholder assignments, agenda, briefing, outcomes, and commitments | Internal capability directory | Configurable matching and governance | Generic contact-management suite |
| Objective → activity → outcome → commitment traceability | Incoming enquiry text | Genuine AI enquiry structuring after approval | AI chatbot detached from workflow context |
| One resettable outcome/commitment interaction that updates relationship context | Meeting notes | AI note extraction after approved data and review design | Predictive relationship or participant risk scores |
| Existing Study Tour readiness Dashboard and rules, reachable as type-specific Delivery | Mobility/SIS source records | Persistence, participant self-service, secure documents | Rebuilding travel registry, SIS, or duty-of-care systems |
| Fixed fictional snapshot and synthetic data | Partner/contact details | Authentication, permissions, audit history, database | “All in one” replacement positioning |

## I. Candidate AI features ranked by value

No AI feature is authorised in this phase. Ranking assumes structured outputs, visible source grounding, and mandatory human confirmation.

| Rank | Candidate | User value | AI suitability | Main risk | Required data | Human review | Portfolio value |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 1 | Enquiry → structured engagement scope | High: reduces manual interpretation and surfaces missing information at the start | High for constrained extraction, classification, and clarification-question drafting | Invented facts or overconfident objective inference | Enquiry text, partner match, engagement schema, controlled themes | Officer confirms every extracted field and question before saving | Very high: clear input, grounded output, and workflow impact |
| 2 | Structured engagement data → briefing draft | High: briefing assembly is repetitive and cognitively demanding | High once source records are complete | Hallucination, stale relationship context, inappropriate emphasis | Relationship history, contacts, objectives, agenda, attendees, commitments | Named owner reviews and edits before circulation | Very high, but needs richer fixtures and provenance UI |
| 3 | Meeting notes → outcomes and commitments | High: improves follow-through after engagements | High for extraction into a strict schema | Incorrect owner/due date or confusion between discussion and commitment | Approved notes or transcript, attendees, objectives | Attendee/owner confirmation before relationship memory updates | High, though generic meeting tools already perform extraction |
| 4 | Relationship history → engagement context summary | Medium-high: accelerates preparation | High for summarisation | Omission, recency bias, or flattening institutional nuance | Sufficient clean history, outcomes, commitments, agreements | Officer verifies against source timeline | High when the history dataset is credible |
| 5 | Objectives → suggested internal stakeholders/capabilities | Medium-high: supports cross-university coordination | Medium; taxonomy and deterministic matching may solve the first version | Poor recommendations, organisational politics, outdated expertise data | Capability directory, faculty/unit ownership, availability, prior engagement evidence | Officer selects; no automatic invitations | High visually, but requires data governance to be credible |
| 6 | Objectives and constraints → suggested visit/program structure | Medium: may accelerate agenda ideation | Medium | Generic agendas, infeasible logistics, or activities not tied to real capability | Objectives, stakeholder availability, venues, duration, protocol, prior patterns | Coordinator owns all agenda decisions | Medium-high after stakeholder data exists |
| 7 | Relationship history and commitments → follow-up priorities | Medium | Medium; deterministic overdue and owner rules should be used first | Opaque prioritisation and strategic bias | Commitments, stages, due dates, relationship priorities | Officer confirms priority and timing | Medium; risks becoming a decorative AI score |

### Approved first future genuine AI feature

**Enquiry → structured engagement scope** is approved as the first future genuine AI feature.

It has a bounded input, an explicit output schema, immediate workflow value, and a strong human-review checkpoint. The AI should return:

- proposed engagement type;
- matched or unresolved partner;
- proposed dates and delegation size;
- stated objectives and strategic themes, each linked to source text;
- information explicitly missing;
- clarification questions; and
- confidence or “needs confirmation” state per field.

Nothing should be written to the engagement record until the officer confirms it. This is more credible than a chatbot and more specific to the product than a generic summary. Briefing generation should follow only after structured relationship and engagement data exists.

## J. Sprint 02 migration note

When separately authorised, the implementation sprint is:

### Sprint 02 — International Engagement Core and Delegation Journey

**Objective:** Prove that relationship context and engagement objectives can drive coordinated planning, outcomes, commitments, and future relationship memory while preserving Study Tour Delivery.

Approved delivery direction:

1. add typed relationship, engagement, objective, stakeholder-assignment, agenda-item, outcome, and commitment fixtures;
2. add an adapter that represents existing Sprint 01 programs as `study_tour` engagements without deleting their domain or tests;
3. change the shell to the approved minimal IA only after explicit approval;
4. create one anonymised/composite Relationship page containing the earlier Study Tour and later Delegation engagement;
5. make objective links visible on stakeholder assignments and agenda items;
6. assemble a deterministic Briefing view from structured records;
7. add one resettable “Record outcome and commitment” interaction that updates engagement and relationship context;
8. retain the existing Study Tour readiness Dashboard or Delivery entry unchanged where practical; and
9. add migration and aggregate tests before any AI, backend, or deployment work.

Sprint 02 must preserve:

- the 24-participant primary Study Tour workflow;
- participant readiness and requirements;
- deterministic attention rules;
- itinerary and logistics;
- the fixed demo clock;
- `Confirm requirement`;
- `Reset demo`; and
- existing tests where relevant.

Application fixture names and scenario framing may change during Sprint 02 to comply with the approved real-world evidence policy. This documentation PR performs no migration.

### Remaining implementation gates

- final umbrella product name;
- exact public-facing name of the anonymised/composite partner;
- separate Sprint 02 implementation authorisation;
- genuine AI implementation and evaluation;
- external integrations; and
- database, authentication, and persistence.

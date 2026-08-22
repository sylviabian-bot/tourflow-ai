# TourFlow — Product Requirements Document

**Status:** V1 product direction approved; Sprint 01 implementation authorised

**Version:** 0.3

**Date:** 22 August 2026

**Phase:** Sprint 01 — foundation and Dashboard
**Working product type:** Fictional-data portfolio prototype

## 1. Product vision

TourFlow is an operations workspace for university and education professionals who coordinate international study tours and short-term mobility programs.

Its purpose is to give a coordinator one clear view of each program’s operational readiness: who is participating, what requirements remain incomplete, what needs attention before departure, and how the itinerary fits together.

The V1 product is deliberately narrow. It is not intended to replace a student information system, travel-management platform, document repository, learning-management system, or institutional risk process. It demonstrates how fragmented operational information could be organised into a credible coordinator workflow.

V1 is accountable to one product question:

> When a coordinator opens TourFlow today, can they quickly identify which program is not ready, understand why, and know what to do next?

### Product naming

- The repository name remains `tourflow-ai`.
- The V1 user-facing product name is `TourFlow`.
- V1 must not imply that deterministic readiness or attention rules are AI.
- The user-facing name `TourFlow AI` is reserved for a later version that contains genuine, reviewable AI-assisted functionality.

### Portfolio objective

The prototype should demonstrate:

- understanding of international education operations;
- product discovery and prioritisation;
- workflow and information design;
- practical, explainable automation thinking;
- attention to stakeholder and student experience; and
- disciplined use of technology without unnecessary backend or AI complexity.

### Product principles

1. **Operational clarity over feature volume.** Every screen should help a coordinator answer a real question or take a clear next step.
2. **Readiness, not surveillance.** The product highlights missing operational requirements without scoring a student’s personal worth or making sensitive judgments.
3. **Explainable attention signals.** Every alert must show why it exists, what is affected, and the suggested follow-up.
4. **Program context first.** Student, document, itinerary, and risk information should remain connected to the relevant program and departure timeline.
5. **Prototype honesty.** Fictional data and demo-only state must be clear. The product must not imply live university integrations, verified compliance, or AI capabilities that do not exist.

### Core status model

Lifecycle and readiness are independent concepts and must never be used interchangeably.

`LifecycleStage` describes where a program is in its operating journey:

| Value | Meaning |
| --- | --- |
| `planning` | Program structure, suppliers, dates, or approvals are still being prepared. |
| `applications` | Participant applications or selection are in progress. |
| `pre_departure` | The cohort is being prepared for departure. |
| `on_tour` | The program is currently operating. |
| `completed` | The program has concluded. |

`ReadinessState` describes whether a program or participant requires action:

| Value | Meaning |
| --- | --- |
| `ready` | All readiness-critical requirements represented in V1 are approved or complete. |
| `needs_attention` | One or more requirements need coordinator follow-up but do not meet a blocked rule. |
| `blocked` | A critical unresolved requirement prevents the represented readiness outcome. |

A program may be in `planning` and still have a `needs_attention` readiness state; similarly, a `pre_departure` program can be either `ready`, `needs_attention`, or `blocked`. UI labels, fixture fields, filters, and tests must preserve this separation.

### Fixed demo clock

The reproducible reference date for V1 is:

```text
DEMO_TODAY = 2026-08-22
```

All date-relative calculations—including days until departure, overdue status, milestone urgency, and attention priority—must derive from this value rather than the viewer's real system date.

The application should display unobtrusive context such as `Demo snapshot · 22 Aug 2026` so reviewers understand the time basis without mistaking it for live data.

## 2. Target users

### Primary user

**Study Tour / Global Mobility Coordinator**

Responsible for coordinating one or more short-term international programs across academic staff, students, travel arrangements, university requirements, and pre-departure deadlines.

Typical responsibilities include:

- maintaining program and participant records;
- tracking application and pre-departure requirements;
- following up incomplete documentation;
- preparing participant and travel information for relevant teams;
- coordinating academic leads and trip leaders;
- maintaining itinerary, accommodation, and transport details;
- identifying issues before departure; and
- communicating program readiness to internal stakeholders.

### Secondary users represented, but not separately supported in V1

- **Program Manager / Team Lead:** needs a portfolio-level view of program readiness and emerging issues.
- **Academic Lead / Trip Leader:** needs confidence that the participant list, itinerary, and pre-departure actions are current.
- **Student Participant:** completes requirements and receives communications, but a student-facing portal is out of scope for V1.
- **Risk, insurance, finance, or faculty approvers:** may consume information from the coordinator, but approval workflows and institutional integrations are out of scope for V1.

## 3. Core user problems

1. Coordinators cannot quickly see which programs are on track and which require intervention.
2. Participant requirements are often tracked across separate spreadsheets, forms, email threads, and portals.
3. An outstanding-requirements list lacks context unless the coordinator can also see the due date, program departure date, owner, reason, and next action.
4. Participant status, program milestones, and itinerary details become disconnected, creating avoidable follow-up and duplicated checking.
5. Managers and academic leads ask for status summaries that coordinators must assemble manually.
6. Important issues can remain hidden until close to departure because operational data is organised by system rather than by urgency and program readiness.

## 4. Current workflow problems

A representative current-state workflow is:

1. Program details are approved and recorded in one system or document.
2. Applications and participant details are collected elsewhere.
3. Passport, visa, insurance, consent, emergency-contact, and pre-departure completion are tracked in separate columns, forms, folders, or email threads.
4. Travel, accommodation, and daily activities are maintained in another itinerary document.
5. The coordinator manually compares these sources to identify missing requirements.
6. Follow-ups occur by email, with limited visibility of whether the overall program is becoming more or less ready.
7. A manager or trip leader requests a summary, causing another manual reconciliation.

The operational cost is not only time. Fragmentation makes it difficult to prioritise work, explain why something needs attention, and create a reliable shared understanding before departure.

## 5. Product value proposition

**TourFlow turns fragmented study-tour coordination data into a single, explainable readiness workflow.**

For a coordinator, the product should make three questions easy to answer:

1. What needs my attention today?
2. Is this program ready for its next milestone or departure?
3. Which participant requirement or itinerary detail is creating the issue?

For a hiring reviewer, the prototype should show a credible vertical workflow rather than a generic dashboard with education-themed labels.

## 6. Primary user journey

### Scenario

A coordinator starts the day with several active programs at different stages. One program departs soon and has unresolved participant requirements.

### Journey

1. **Triage the portfolio.** The coordinator opens Dashboard and sees upcoming departures, readiness summaries, and a short prioritised attention queue.
2. **Enter the relevant program.** The coordinator selects the program with the closest departure and highest-impact unresolved items.
3. **Understand program readiness.** Program Overview shows dates, destination, program stage, key contacts, participant totals, milestone status, and readiness summary.
4. **Find affected participants.** In Readiness or Participants, the coordinator filters to participants marked `Needs attention` or `Blocked`.
5. **Diagnose the issue.** The coordinator opens a participant record and sees the specific requirement, current status, due date, reason for the flag, and suggested next step.
6. **Demonstrate resolution.** The coordinator selects `Confirm requirement` for one fictional travel-insurance requirement. Its status changes from `Action required` to `Approved`; derived readiness counts and attention items update consistently, and the baseline can be restored with `Reset demo`.
7. **Check operational context.** The coordinator reviews the day-by-day Itinerary, including transport and accommodation references, to confirm the program plan is coherent.
8. **Return to the readiness view.** The coordinator can explain the program’s current state and remaining work without manually reconciling separate screens.

### Journey success condition

Within three minutes, a first-time viewer should be able to identify the most urgent program, explain the reason for one attention item, locate the affected participant requirement, and understand the relevant itinerary context.

## 7. Approved V1 information architecture

This structure was approved by the product owner on 22 August 2026. Approval of the information architecture does not authorise application implementation.

### Global navigation

| Area | Purpose | Included in V1 |
| --- | --- | --- |
| Dashboard | Portfolio triage: upcoming departures, readiness, milestones, and priority attention items | Yes |
| Programs | Browse active and completed programs; enter a program workspace | Yes |
| Participants | Search and review fictional participants across programs, including their participant type | Yes |

### Program workspace

| Area | Purpose | Included in V1 |
| --- | --- | --- |
| Overview | Program identity, stage, dates, destination, leads, participant totals, milestones, and readiness | Yes |
| Readiness | Participant requirements, document metadata, due dates, and attention items in one operational view | Yes |
| Itinerary | Day-by-day activities with transport and accommodation context | Yes |

### Deliberate IA decisions

- **Documents are not a top-level V1 destination.** Document metadata is meaningful only in the context of a participant requirement or program readiness check.
- **Risk & Attention Alerts are not a generic standalone “AI centre.”** They appear on Dashboard and Program Readiness, where a coordinator can understand and act on them.
- **Accommodation and Transport are not standalone modules.** Their essential details appear within program overview and itinerary entries.
- **Communications and Feedback are excluded from V1.** They would add new workflows without strengthening the core readiness demonstration.

### Approved route model (implementation-agnostic)

```text
Dashboard
Programs
  Program detail
    Overview
    Readiness
    Itinerary
Participants
  Participant detail
```

## 8. MVP feature scope

### 8.1 Dashboard

The dashboard should provide a prioritised operational snapshot, not a collection of decorative metrics.

Required capabilities:

- display active programs and days until departure;
- show participant readiness totals derived from fictional records;
- show upcoming program milestones;
- present a concise attention queue ordered by impact and time sensitivity;
- link each summary or attention item to the relevant program or participant context; and
- make the primary action for the day visually obvious.

### 8.2 Programs

Required capabilities:

- browse a realistic set of programs at different lifecycle stages;
- search or filter by status, destination, or departure timeframe;
- distinguish stages such as `Planning`, `Applications`, `Pre-departure`, `On tour`, and `Completed`;
- open a program workspace; and
- show empty results clearly when no program matches a filter.

### 8.3 Program Overview

Required capabilities:

- display program name, destination, dates, lifecycle stage, academic lead, coordinator, and participant count;
- show key milestones and their current state;
- summarise participant readiness using derived counts;
- surface the highest-priority unresolved items; and
- provide clear navigation to Readiness and Itinerary.

### 8.4 Participants and participant detail

Required capabilities:

- show a fictional participant roster with program, readiness state, and next outstanding requirement;
- search and filter participants by program and readiness;
- open a participant detail view;
- show participant type, using `Student` for the initial V1 records while leaving room for future staff or chaperone types;
- show only the minimum fictional profile information needed to explain the workflow;
- show requirement history/status without displaying simulated passport numbers, medical details, private addresses, or realistic identity documents; and
- link back to the participant’s program context.

### 8.5 Documents and readiness requirements

V1 represents document and task status as metadata; it does not upload, download, preview, or store sensitive files.

Example requirement types may include:

- passport validity confirmed;
- visa evidence confirmed where applicable;
- travel or insurance acknowledgement;
- emergency contact confirmed;
- participant agreement or consent;
- pre-departure briefing completed; and
- flight details confirmed where relevant.

Required capabilities:

- show requirement, owner, status, due date, and last update;
- use a consistent status model such as `Not started`, `Submitted`, `Under review`, `Approved`, and `Action required`;
- distinguish a late item from an item that is blocked for another reason;
- derive participant readiness from transparent rules; and
- limit status editing to the approved, clearly labelled, resettable demo interaction.

Aggregate metrics must use the term `Outstanding Requirements`, not `Missing Documents`. A requirement may represent a document, confirmation, task, briefing, or travel detail. Document status remains one subtype of requirement metadata.

### 8.6 Risk & Attention Alerts

V1 uses deterministic operational rules, not AI inference.

An attention item must include:

- severity or priority;
- affected program and, when relevant, participant;
- plain-language reason;
- due date or departure context;
- recommended next step; and
- link to the source record.

Example triggers:

- a required item is overdue;
- a passport-validity confirmation remains unresolved close to departure;
- the pre-departure briefing is incomplete after its due date;
- an itinerary day lacks confirmed accommodation or transport context; or
- a program milestone is approaching while participant readiness remains below the agreed threshold.

The interface must not claim that an alert is an institutional risk decision, legal determination, medical assessment, or live government travel advisory.

### 8.7 Itinerary

Required capabilities:

- present itinerary entries in chronological day groups;
- show local date/time, location, activity type, description, and responsible contact or lead role when useful;
- include transport and accommodation references within the relevant day;
- distinguish academic, cultural, travel, free-time, and briefing activities;
- highlight missing operational details without overstating risk; and
- remain understandable on a narrow screen without requiring a wide spreadsheet layout.

### 8.8 Fictional demo data

The fixture set must use three programs with deliberately uneven depth:

| Program | Role in prototype | Participants | Lifecycle stage | Readiness state | Required depth |
| --- | --- | ---: | --- | --- | --- |
| Shanghai Business School – Sydney Innovation Study Tour | Primary demo program | 24 | `pre_departure` | `needs_attention` | Full participant, readiness, attention, logistics, and multi-day itinerary workflow with several unresolved readiness issues |
| Osaka Global Business Program | Portfolio variation | 18 | `pre_departure` | `ready` | Enough detail to demonstrate a program with no material readiness blockers |
| Singapore Future Leaders Program | Portfolio variation | 30 | `planning` | `needs_attention` | Enough detail to demonstrate an earlier lifecycle stage and incomplete planning milestones |

Additional fixture requirements:

- the primary program must include ready, needs-attention, and blocked participant states;
- the resettable interaction must begin with a travel-insurance requirement in `Action required` and allow the user to select `Confirm requirement`;
- confirming that requirement must set it to `Approved` and update the participant, the relevant alert, the outstanding-requirement count, and program-level readiness metrics from the same state source;
- `Reset demo` must restore every affected value to the baseline fixture state;
- the primary itinerary must span multiple days and integrate accommodation and transport into daily logistics; and
- all names and records must be clearly synthetic, with no copied real student data.

## 9. User stories and acceptance criteria

### US-01 — Portfolio triage

**As a coordinator, I want to see upcoming programs and unresolved attention items so that I can prioritise today’s work.**

Acceptance criteria:

- Dashboard shows all active fictional programs with stage, dates, destination, and days to departure.
- Lifecycle stage and readiness state are displayed as separate fields and are never substituted for each other.
- Readiness totals are calculated from the same participant requirement data shown elsewhere.
- All date-relative values are derived from `DEMO_TODAY`, and the Dashboard displays `Demo snapshot · 22 Aug 2026`.
- Attention items are ordered by a documented combination of urgency and impact.
- Selecting an attention item opens the relevant program or participant context.
- Status is communicated with text/iconography as well as colour.

### US-02 — Program discovery

**As a coordinator, I want to find a program quickly so that I can review its current operational state.**

Acceptance criteria:

- Programs can be searched by program name or destination.
- Programs can be filtered by lifecycle stage.
- Clearing filters restores the complete program set.
- A no-results state explains how to recover.
- Selecting a program opens its Overview.

### US-03 — Program readiness

**As a coordinator, I want one program-level readiness view so that I do not have to reconcile multiple tracking sheets.**

Acceptance criteria:

- Overview shows program facts, milestones, participant counts, and readiness summary.
- Readiness counts match the underlying participant records.
- The view identifies outstanding requirements and their due dates.
- The highest-priority issue is understandable without opening another screen.
- Navigation to Readiness and Itinerary is obvious and keyboard accessible.

### US-04 — Participant follow-up

**As a coordinator, I want to identify participants who need follow-up and understand why so that I can take the correct next step.**

Acceptance criteria:

- Participants can be filtered to `Ready`, `Needs attention`, and `Blocked`.
- Every non-ready state has at least one visible, specific cause.
- Participant detail shows requirement status, due date, last update, and suggested next step.
- No real personal data or realistic sensitive document content is displayed.
- Returning to the list preserves useful program context and does not strand the user.

### US-05 — Explainable attention signals

**As a coordinator, I want each alert to explain its trigger so that I can trust and verify the prompt.**

Acceptance criteria:

- Every attention item identifies its source rule in plain language.
- Severity is based on documented fixture logic, not random values or opaque AI output.
- Resolving the underlying requirement removes or changes the corresponding demo alert through the approved deterministic demo-state transition.
- Alert copy avoids legal, medical, compliance, and safety guarantees.
- The same alert is represented consistently on Dashboard and Program Readiness.

### US-06 — Itinerary review

**As a coordinator or trip leader, I want to review the program plan by day so that I can spot missing operational details.**

Acceptance criteria:

- Entries are ordered by local date and time and grouped by day.
- Each entry shows the minimum useful operational context.
- Transport and accommodation references are attached to the relevant day or entry.
- Missing details are clearly labelled rather than silently omitted.
- Mobile presentation remains chronological and readable.

### US-07 — Resettable demo-state resolution

**As a portfolio reviewer, I want to resolve one fictional issue so that I can see that TourFlow’s summaries reflect the underlying workflow.**

Acceptance criteria:

- A user can open a fictional participant whose travel insurance is `Action required` and select `Confirm requirement`.
- The interface clearly labels the change as demo data.
- Participant readiness, program summary, and attention queue update from one rule source.
- The requirement changes to `Approved`, the outstanding-requirement count decreases, the program readiness percentage increases, and the related alert disappears or resolves consistently.
- `Reset demo` restores the participant requirement, alert, counts, and readiness percentage to the exact baseline state.
- No account, database, or external service is required.

## 10. Cross-product acceptance criteria

The V1 prototype is acceptable only when:

- all displayed people and records are fictional;
- the primary user journey can be completed without dead ends;
- every navigation item leads to meaningful content;
- aggregate counts reconcile with the underlying fixtures;
- lifecycle and readiness use independent typed fields and labels;
- all date-relative values derive from `DEMO_TODAY = 2026-08-22` rather than the system clock;
- aggregate requirement metrics use `Outstanding Requirements` and include all requirement types, not only documents;
- loading, empty, and error states are handled where applicable;
- layout is usable at representative desktop and mobile widths;
- keyboard focus is visible and interactive elements have accessible names;
- headings are hierarchical and status is not communicated by colour alone;
- no external API, authentication provider, production database, analytics tool, or AI service is required;
- automated checks for core business rules pass;
- a production build passes using the approved implementation stack; and
- the README and project log accurately describe what the prototype does and does not do.

## 11. Out-of-scope features for V1

- authentication, roles, permissions, or single sign-on;
- production database, cloud storage, or live multi-user persistence;
- real student data or integrations with student information systems;
- file upload, document OCR, passport scanning, or sensitive file previews;
- automated email, SMS, or in-app student communications;
- live booking, payments, budgets, procurement, or expense reconciliation;
- live flight, hotel, mapping, weather, government advisory, or International SOS integrations;
- formal institutional approval workflows or electronic signatures;
- a student-facing portal or mobile app;
- AI chat, generative recommendations, predictive risk scoring, or external AI APIs;
- standalone Accommodation, Transport, Communications, or Feedback modules;
- comprehensive post-program evaluation and reporting; and
- claims of legal, policy, insurance, medical, accessibility-certification, or travel-risk compliance.

## 12. Potential V2 features

V2 should be considered only after V1’s coordinator workflow is reviewed.

Possible additions include:

- Supabase-backed persistence with an explicit data/privacy model;
- authentication and role-aware views;
- secure document metadata and controlled storage workflows;
- communications templates and logged follow-up actions;
- student self-service requirement completion;
- configurable institutional readiness rules and approval stages;
- live travel-advisory or travel-management integrations;
- accommodation and transport management for complex programs;
- post-program feedback and outcome reporting;
- operational exports for trip leaders and emergency planning;
- audit history; and
- narrowly scoped AI assistance, such as summarising a program’s explainable attention items or drafting a coordinator follow-up from approved data.

AI should enter only where it improves a validated workflow and where the result can be reviewed by a human. It should not be used to infer sensitive student risk, determine fitness to travel, or replace institutional policy decisions.

## 13. Risks and assumptions

| ID | Type | Statement | Response |
| --- | --- | --- | --- |
| A-01 | Confirmed direction | The primary portfolio story is coordinator-led pre-departure readiness, not recruitment or participant self-service. | Approved for V1. |
| A-02 | Confirmed direction | A small number of coherent fictional programs is more persuasive than broad but shallow module coverage. | Use one deep program and two lighter portfolio examples. |
| A-03 | Confirmed direction | Document metadata is enough to demonstrate V1 workflow without sensitive file handling. | Exclude uploads and previews. |
| A-04 | Confirmed direction | Deterministic attention rules better demonstrate trust and operational reasoning than simulated AI. | Document each rule and test its output. |
| A-05 | Confirmed direction | A browser-only, resettable demo state is appropriate for the single approved status-update interaction. | Keep it local, clearly labelled, and fully resettable. |
| R-01 | Risk | The product could resemble a generic SaaS admin template. | Design around the specific program-readiness journey and realistic linked records. |
| R-02 | Risk | “Risk alerts” could imply a compliance or safety determination. | Use operational language, show trigger logic, and include clear boundaries. |
| R-03 | Risk | Fictional student records could still look uncomfortably realistic or expose sensitive fields. | Use minimal synthetic identity data and omit document numbers, health details, and private addresses. |
| R-04 | Risk | Too many top-level modules could dilute the story and increase build scope. | Use the approved three-item global navigation and contextual program workspace. |
| R-05 | Risk | Static data may make the product feel like a screenshot rather than a working prototype. | Include purposeful filters, drill-down, derived counts, and the approved resettable state transition. |
| R-06 | Risk | Institutional processes differ across universities and program types. | Present a configurable conceptual workflow, not a claim of universal policy compliance. |
| R-07 | Risk | An early technology decision could drive product scope. | Approve PRD and IA before selecting or scaffolding the implementation stack. |

## 14. Prototype success measures

These are evaluation criteria for the portfolio prototype, not production analytics:

- A reviewer can explain the product’s user, problem, and value within one minute.
- A reviewer can complete the primary journey in under three minutes.
- All summary totals reconcile with underlying fictional records.
- The reviewer can explain why an attention item exists and what action it suggests.
- The interface remains credible without relying on “AI” branding or generated copy.
- The application passes the agreed build, rule tests, accessibility checks, and responsive QA before deployment.

## 15. Approved V1 decisions and remaining implementation gate

The product owner approved these decisions on 22 August 2026:

1. **Primary workflow:** Coordinator-led pre-departure readiness is the central V1 workflow.
2. **Information architecture:** Global navigation is `Dashboard / Programs / Participants`; program navigation is `Overview / Readiness / Itinerary`.
3. **Terminology:** Product navigation and program views use `Participants` consistently. Participant detail may show `Participant type: Student`.
4. **Documents:** Document metadata remains inside Readiness rather than becoming a standalone module.
5. **Attention rules:** Alerts are deterministic, explainable operational prompts and must never be presented as AI predictions.
6. **Demo interaction:** V1 includes one resettable interaction where `Confirm requirement` changes travel insurance from `Action required` to `Approved` and updates the participant, alert, outstanding-requirement count, and program readiness metrics.
7. **Fixture strategy:** V1 uses one detailed primary program and two lighter programs that create realistic portfolio variation.
8. **Logistics:** Accommodation and transport remain integrated into the itinerary and logistics workflow.
9. **Service boundaries:** V1 does not add authentication, Supabase, a production database, or an external AI API.
10. **Phase boundary:** Sprint 01 implementation is authorised only for the technical foundation, domain model, application shell, minimal route destinations, and Dashboard. Full product workflows remain deferred.
11. **Product naming:** V1 uses `TourFlow`; `TourFlow AI` is reserved for a later version with genuine AI assistance.
12. **Status semantics:** `LifecycleStage` and `ReadinessState` are independent typed concepts and must never be interchanged.
13. **Requirement language:** Aggregate metrics use `Outstanding Requirements`, with documents represented as one requirement subtype.
14. **Demo action:** The deterministic action is `Confirm requirement`, producing the transition `Action required → Approved`.
15. **Demo clock:** All relative dates use `DEMO_TODAY = 2026-08-22`, disclosed in the UI as `Demo snapshot · 22 Aug 2026`.

## 16. Research basis

The proposed workflow is grounded in current public guidance, while remaining institution-neutral:

- [Western Sydney University Student Learning Abroad Procedures](https://policies.westernsydney.edu.au/download.php?id=364&version=1) describes compulsory pre-departure activity, updated participant lists, travel registration, risk assessment, program activities, transport, accommodation, communications, emergency planning, and trip-leader responsibilities.
- [UNSW Preparing for Learning Abroad](https://www.unsw.edu.au/student/opportunities/overseas-study/preparing-for-departure) connects pre-departure completion with travel risk, insurance, emergency assistance, itinerary, passport, visa, and emergency-contact preparation.
- [University of Newcastle Outbound Global Experience Procedure](https://policies.newcastle.edu.au/document/view-current.php?id=268&version=7) distinguishes program approval, individual student approval, risk assessment, participant readiness, itinerary-related travel requirements, and pre-departure preparation.

These sources support the problem framing; they are not being encoded as universal compliance rules. A future institution-specific version would require formal policy validation and governance.

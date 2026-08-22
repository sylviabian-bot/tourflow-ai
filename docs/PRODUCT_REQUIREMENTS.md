# International Engagement Operating Layer — Product Requirements

**Status:** Product direction and evidence policy approved; Sprint 02 implementation not authorised

**Version:** 0.4

**Date:** 22 August 2026

**Phase:** Product pivot finalisation and implementation gate

**Repository:** `tourflow-ai` — unchanged

**Current application name:** `TourFlow` — unchanged in this documentation phase

## 1. Product vision

The approved direction is an international engagement operating layer for university teams that coordinate partner relationships, delegation visits, study tours, short programs, strategic meetings, and other international engagement activity.

The product should help an officer connect information that may already exist across CRM, email, spreadsheets, calendars, agreements, faculty contacts, briefing papers, meeting notes, mobility platforms, and participant systems.

It is accountable to one central question:

> Can an international engagement professional turn partner intent into coordinated university action, then turn the completed engagement into useful institutional relationship memory?

### Approved positioning

Generic CRM products store relationships and activities. Mobility products administer participants, travel, agreements, and program processes. This concept should focus on the coordination and decision layer between those systems:

```text
Partner intent
  → Engagement scope
  → Objectives
  → Internal stakeholders and agenda activities
  → Outcomes
  → Commitments
  → Relationship memory
```

This positioning is defensible only if the product makes that chain visible and operational. “Better UX,” “AI-powered,” “all in one,” contact records, activity history, notes, and generic tasks are not sufficient differentiation.

### System boundary

The product should complement rather than replace:

- CRM and partner master-data systems;
- student information and mobility platforms;
- agreement repositories and approval workflows;
- travel-management and duty-of-care systems;
- enterprise calendars, email, document management, and staff directories; and
- institutional policy, governance, and risk processes.

Where such systems are referenced in the prototype, their data is represented as fictional fixture context rather than a live integration.

### Product principles

1. **Intent before administration.** Start with what the partner and institution are trying to achieve, not with a blank task list.
2. **Traceability over volume.** Show how objectives connect to stakeholders, activities, outcomes, and commitments.
3. **Relationship memory from completed work.** Engagement outcomes should improve future preparation rather than remain isolated meeting notes.
4. **Type-specific delivery.** Shared engagement concepts are universal; participant readiness is not.
5. **System-of-record humility.** Reference CRM, mobility, and agreement context without pretending to replace their governance or scale.
6. **Explainable automation.** Use deterministic rules where they are sufficient and identify every future AI-assisted output as a draft requiring review.
7. **Prototype honesty.** Use synthetic data, fixed dates, and explicit mock boundaries.

## 2. Approved product and naming strategy

The final umbrella product name remains unresolved. The repository and current application must not be renamed during this documentation phase.

### Approved naming direction

- A future naming exercise will select the umbrella product name.
- **TourFlow** is preserved as the future name of the specialised Study Tour Delivery module or workflow.
- **Copilot** must not be used as the user-facing umbrella name until genuine AI functionality exists.
- `TourFlow AI` must not become the umbrella name: “Tour” is too narrow for delegation and partnership work, while “AI” would overstate the current functionality.
- Genuine AI remains deferred until the structured non-AI workflow has been implemented and reviewed.

The final umbrella name is unresolved and is not a Sprint 02 implementation task unless separately approved.

## 3. Portfolio positioning and real-world evidence policy

### Portfolio narrative

This is a current, independently developed product prototype. Its workflow expertise is informed by prior hands-on experience developing and coordinating Australia–China international education partnerships and programs.

Approved portfolio positioning:

> This independent product prototype is informed by hands-on experience developing and coordinating Australia–China international education partnerships and programs. The product itself is a current exploration of how AI-enabled and structured workflows could improve international engagement operations.

The documentation and future portfolio must not imply that this software was historically deployed, used in production, commissioned by a former employer, or connected to an institution unless that fact is separately true and approved for disclosure.

| Real professional foundation | Current prototype work |
| --- | --- |
| domain experience in international education | the software product and interface |
| partnership and program coordination experience | product architecture and domain model |
| stakeholder and cross-cultural work | AI-enabled workflow concepts |
| operational pain points encountered in international education | demo records and interactions |
| factual, non-confidential experience explicitly approved for disclosure | synthetic, fictional, anonymised, or composite scenarios unless explicitly documented otherwise |

### A. Real professional experience

Real institution names may be used only when:

- the relationship or project genuinely existed;
- the statement is factually accurate and supportable by genuine professional experience;
- the information is not confidential;
- no private student, staff, commercial, or institutional information is disclosed; and
- no outcome, commitment, agreement, activity, metric, or relationship history is invented.

Real-world experience may explain how the product problem was identified. A safe general statement is:

> The product concept is informed by real experience coordinating Australia–China international education partnerships, study tours, short programs, student mobility and institutional collaboration.

### B. Anonymised or composite case studies

Use an anonymised or composite case when the workflow is useful but the underlying relationship, organisation, people, operational data, or commercial context should not be disclosed. A composite case may combine patterns learned from multiple real projects, but it must not be presented as a literal historical record.

Preferred disclosure:

> Composite demonstration informed by real international education partnership workflows. Institution names, people, dates and operational records may be anonymised or fictionalised.

### C. Fictional product demo records

Any invented delegation, engagement, participant, contact, meeting, outcome, commitment, agreement, itinerary, budget, requirement, email, briefing, or timeline must be treated explicitly as fictional, synthetic, or composite.

A real university name must not be attached to an invented relationship history, delegation, commitment, outcome, agreement, or activity in a way that could imply the event occurred. Real names and fictional product records must never be combined merely to make a demo appear more authentic.

### Recommended future public disclosure

> This is an independently developed portfolio prototype informed by real international education partnership experience. Demo records are fictional, synthetic or anonymised unless explicitly stated otherwise.

> No real student personal information, confidential university data or production institutional systems are used.

## 4. Target users

### Primary persona

**International Relations Officer / Global Engagement Coordinator**

Coordinates inbound and outbound institutional engagements across external partners, senior visitors, faculties, professional units, executives, and program teams.

Typical responsibilities include:

- interpreting partner enquiries and clarifying purpose;
- understanding the institutional history of a relationship;
- identifying relevant internal university stakeholders and capabilities;
- turning objectives into a feasible visit or engagement program;
- preparing internal briefings;
- coordinating guests, hosts, agenda, and logistics;
- capturing outcomes and decisions; and
- ensuring commitments are owned and followed through.

### Secondary personas

| Persona | Need represented in the concept | MVP treatment |
| --- | --- | --- |
| International Partnerships Officer | Relationship history, agreements context, strategic themes, opportunities, and commitments | Represented through the Relationship workspace |
| Study Tour Coordinator | Participant requirements, readiness, itinerary, logistics, and attention | Preserved through TourFlow Study Tour Delivery |
| International Programs / Short Programs Coordinator | Engagement planning plus program delivery | Shared workflow represented; dedicated delivery extension deferred |
| Faculty or professional-unit stakeholder | Clear objective, role, agenda contribution, and follow-up ownership | Represented as an assigned internal stakeholder |
| Academic lead / executive host | Briefing, agenda, partner context, talking points, outcomes | Read-only use case represented in briefing and outcomes views |
| Team lead | Portfolio priorities, open commitments, and engagement progress | Represented on Home; management analytics deferred |

External partner contacts, delegation guests, and student participants appear as fictional records but are not primary users of the next MVP.

## 5. Core user problems

1. Partner intent arrives in unstructured emails or conversations and must be manually converted into a workable scope.
2. Relationship history exists across systems and individual memory, making preparation dependent on who happens to know the partner.
3. Stated partner interests do not automatically identify the correct internal faculties, centres, leaders, or professional teams.
4. Visit agendas can become collections of meetings without a visible connection to strategic objectives.
5. Briefing papers require repeated reconciliation of partner context, attendees, prior commitments, objectives, talking points, and logistics.
6. Meeting notes do not consistently become explicit outcomes, owners, due dates, and follow-up.
7. Completed engagements often fail to update the institution’s usable relationship memory.
8. Study Tour delivery requires participant readiness and logistics that are irrelevant to senior delegations and must remain type-specific.

## 6. Current workflow problem

A representative international delegation workflow is:

1. A partner sends an enquiry describing proposed dates, visitors, and broad interests.
2. An officer searches CRM, email, agreement files, shared drives, and colleagues’ knowledge for relationship context.
3. The officer identifies missing information and asks clarification questions.
4. Potential internal hosts are identified through personal networks or manual searching.
5. The agenda is assembled across calendars, email threads, documents, and spreadsheets.
6. A briefing paper is created by copying information from several sources.
7. The visit occurs and notes are captured inconsistently.
8. Decisions and commitments are followed up in email or task trackers.
9. The next officer may not be able to reconstruct what the engagement achieved.

Existing systems may store each component, but the officer must still perform the cognitive work of connecting intent, context, institutional capability, activity design, outcomes, and next action.

## 7. Product value proposition

**The product turns partner intent into an objective-led engagement plan and turns engagement results into reusable relationship context.**

It should help the user answer:

1. Who is this partner and what is the relevant institutional history?
2. What are they asking for, and what information is still missing?
3. What objectives should this engagement advance?
4. Which internal stakeholders and capabilities should be involved, and why?
5. Which agenda activity advances each objective?
6. What context does the internal team need before the engagement?
7. What outcome or commitment resulted from each important discussion?
8. What should be remembered for the next engagement?

### Why not simply configure a CRM or mobility platform?

A CRM remains better for canonical partner/contact records, communication history, permissions, deduplication, enterprise workflow, and integrations. A mobility platform remains better for applications, agreements, student portals, regulated data, travel registration, approvals, and reporting.

The approved product direction earns a separate portfolio role by demonstrating a purpose-built workflow from partner intent through university coordination to relationship memory, with type-specific delivery only where needed. It should be presented as a workflow concept that could sit above or beside systems of record, not as a procurement claim that universities need another database.

## 8. Central product model

### Top-level structure

```text
PartnerOrganisation
  → Relationship
      → Engagement
          → Objectives
          → Stakeholder assignments
          → Agenda items
          → Outcomes
          → Commitments
```

An `Engagement` may represent:

- delegation visit;
- study tour;
- short program;
- partner meeting;
- government or industry visit; or
- strategic partnership activity.

A Study Tour engagement additionally owns a `StudyTourDelivery` extension containing participants, requirements, readiness, attention items, itinerary, accommodation, and transport context.

### Smallest coherent domain model

| Domain object | Definition | Key relationships |
| --- | --- | --- |
| `PartnerOrganisation` | A fictional external institution, government body, or industry organisation | Has a Relationship and Contacts |
| `Relationship` | The university-specific strategic context with a partner | Belongs to one partner; has themes, engagements, and open commitments |
| `Contact` | A relevant external relationship contact | Belongs to a partner; may be an engagement guest |
| `Engagement` | A bounded interaction or program with a purpose, owner, dates, and type | Belongs to a Relationship; owns objectives, assignments, agenda, outcomes, and milestones |
| `EngagementType` | Discriminator controlling relevant workflow | Determines whether Study Tour Delivery is available |
| `EngagementObjective` | A desired engagement result linked to a theme and success signal | Links to stakeholder assignments, agenda items, and outcomes |
| `StakeholderAssignment` | An internal host or external guest assigned to an engagement role or objective | Links a person/capability to an Engagement and Objective |
| `AgendaItem` | An objective-linked engagement activity or discussion | Belongs to an Engagement; links to objectives and outcomes |
| `Outcome` | A decision, learning, or agreed direction resulting from an engagement | Links to objectives and optionally an agenda item |
| `Commitment` | An owned, dated follow-up that persists in relationship context | Links to outcome, engagement, relationship, and owner |
| `Milestone` | A dated operational checkpoint | Belongs to an Engagement; may affect attention |
| `AttentionItem` | A derived, explainable prompt from a source record | References an Engagement and source object |

### Concepts deliberately not added as standalone MVP objects

- **Briefing:** a derived workspace assembled from structured relationship and engagement records.
- **Agreement:** reference metadata or link only; lifecycle management remains in the source system.
- **StrategicTheme:** controlled tags are sufficient for the prototype.
- **Capability directory:** a small fictional fixture powers stakeholder matching; it is not an enterprise directory product.
- **Generic Task:** commitments and milestones cover the distinctive workflow. A universal task object would pull the MVP toward generic work management.
- **ExternalGuest:** represented through contacts and stakeholder assignments; it does not need a separate top-level aggregate.

### Status semantics

Generic `EngagementStage` is approved in principle as:

```text
enquiry → scoping → planning → scheduled → in_progress → follow_up → completed
```

Study Tour lifecycle and readiness remain separate, type-specific concepts. The existing values `applications`, `pre_departure`, `on_tour`, `ready`, `needs_attention`, and `blocked` must not be applied to delegation visits.

## 9. Signature workflow

The approved signature workflow is:

### Partner Intent → Scope → Objectives → Stakeholders / Agenda → Outcomes → Commitments → Relationship Memory

1. **Review incoming enquiry.** See the original fictional request and its source.
2. **Structure scope.** Confirm partner, engagement type, dates, delegation size, interests, objectives, missing information, and clarification questions.
3. **Review relationship context.** Understand prior engagements, strategic themes, contacts, agreement references, prior outcomes, and open commitments.
4. **Coordinate stakeholders.** Link each objective to relevant fictional internal capabilities and assigned hosts.
5. **Design the agenda.** Link every substantive agenda item to one or more objectives.
6. **Prepare the briefing.** Assemble partner context, delegation profile, objectives, hosts, prior commitments, talking points, agenda, and open issues from structured records.
7. **Capture outcomes.** Record what was discussed, decided, or learned and link it to the relevant objective/activity.
8. **Create commitments.** Assign an owner and due date for follow-up.
9. **Update relationship memory.** Surface the outcome and open commitment in future relationship and engagement preparation.

### Continuity of institutional intent across engagements

The product is not differentiated simply because it contains contacts, engagement history, notes, tasks, timelines, dashboards, or AI. Its strongest product test is whether a user can answer:

1. What happened in a previous engagement?
2. What strategic signal, outcome, or commitment resulted?
3. Why is that context relevant now?
4. Which objective in the current engagement follows from that history?
5. Which internal university stakeholder or activity supports that objective?
6. What happened during the current engagement?
7. What commitment should carry into future relationship planning?

The workflow is successful only if a reviewer can trace a prior engagement signal into a current objective, through a stakeholder or agenda activity, to an outcome and commitment that updates relationship memory.

## 10. Approved information architecture

The smallest credible global navigation is:

```text
Home
Relationships
Engagements
```

### Global areas

| Area | Purpose |
| --- | --- |
| Home | Prioritise engagements, missing coordination inputs, milestones, and open commitments |
| Relationships | Understand partner context, history, themes, and relationship-level commitments |
| Engagements | Scope, plan, deliver, and follow up a bounded engagement |

### Relationship workspace

| Area | Purpose |
| --- | --- |
| Overview | Partner profile, relationship summary, themes, key contacts, agreement references, and open commitments |
| Engagement history | Previous and current engagements, outcomes, and relationship timeline |

### Engagement workspace

| Area | Purpose |
| --- | --- |
| Overview | Enquiry source, scope, objectives, stage, dates, owner, partner, guests, and open questions |
| Plan | Objective-to-stakeholder and objective-to-agenda coordination |
| Briefing | Structured pre-engagement view assembled from approved records |
| Outcomes | Decisions, learnings, commitments, owners, and follow-up |
| Delivery — Study Tour only | Type-specific Participants, Readiness, and Itinerary workflow |

### IA decisions

- Do not create a global Tasks / Commitments destination in the next MVP. Commitments appear in Home, Relationship, and Engagement context.
- Do not create separate global Contacts, Agreements, Guests, Logistics, Briefing, Documents, or AI destinations.
- Do not show Study Tour participant or readiness navigation for delegation visits.
- Preserve objective links across Plan, Briefing, and Outcomes rather than repeating disconnected notes.

## 11. Demo scenarios and relationship-memory strategy

The approved demo strategy uses one anonymised/composite Partner Relationship representing a Chinese higher education institution. The exact public-facing partner name remains unresolved. Both engagements, all people, dates, operational records, outcomes, and commitments must be disclosed as fictional, synthetic, anonymised, or composite; they must not be attached to a real university name as if they were historical facts.

Use this disclosure with the demo:

> Composite demonstration informed by real international education partnership workflows. Institution names, people, dates and operational records may be anonymised or fictionalised.

### Scenario A — Earlier Study Tour / short program

**Role in relationship history:** Earlier Engagement

**Delivery foundation:** Preserve the accepted 24-participant primary Study Tour workflow from Sprint 01.

The current fixture name may be reframed during an authorised Sprint 02 to comply with this evidence policy. No fixture or application change is made in PRD 0.4.

#### Composite outcome and follow-up

> Strong student and academic engagement with Business Analytics and innovation programming identified an opportunity for broader institutional collaboration.

> Explore opportunities to extend collaboration beyond short-term student programs.

These statements are fictional/composite demo records. They demonstrate how a completed Study Tour can create relationship context; they are not claims about a real institution or historical project.

#### Preserved delivery journey

```text
Relationship
  → Engagement
  → Study Tour Delivery
      → Participants
      → Requirements
      → Readiness
      → Attention Items
      → Itinerary and logistics
  → Composite outcome
  → Relationship Memory
```

#### Required proof points

- the existing Study Tour is represented as an Engagement without losing its 24-participant primary workflow;
- all deterministic readiness and attention rules continue to pass;
- lifecycle and readiness remain independent;
- `Confirm requirement` and `Reset demo` continue to drive affected aggregates from one source state;
- accommodation and transport remain in itinerary/logistics context; and
- the fictional/composite outcome becomes relationship context for the later engagement.

### Scenario B — Later Senior Delegation Visit

**Role in relationship history:** Later Engagement

**Delegation:** 8 synthetic senior representatives

**Strategic interests:** Artificial Intelligence, Business Analytics, Student Mobility, and Joint Programs

The later engagement must visibly use the earlier Study Tour outcome and follow-up. For example, the prior signal about extending collaboration beyond short-term programs should inform a current objective concerning joint programs or broader institutional collaboration.

#### Delegation journey

```text
Relationship Memory from Study Tour
  → Incoming delegation enquiry
  → Structured engagement scope
  → Objectives informed by prior context
  → Internal stakeholder coordination
  → Objective-linked agenda
  → Structured briefing
  → Delegation visit
  → Outcomes
  → Commitments
  → Updated Relationship Memory
```

#### Required proof points

- the enquiry is represented in structured fields rather than only as an attached email;
- the earlier Study Tour outcome is visible and explains at least one current objective;
- each strategic interest becomes an objective or an explicit unresolved question;
- assigned internal stakeholders show which objective/capability they support;
- substantive agenda items link to objectives;
- the briefing includes the relevant prior Study Tour outcome and open follow-up;
- at least one new outcome links back to an objective and activity;
- at least one owned commitment becomes visible at relationship level; and
- no participant-readiness language is shown for the delegation.

### End-to-end relationship-memory proof

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

## 12. Approved next MVP direction

### Primary slice

The approved MVP direction is a delegation-first intent-to-memory loop with Sprint 01 retained as the supporting Study Tour Delivery workflow. This direction does not authorise Sprint 02 implementation.

The next MVP should include:

- Home with a concise engagement/commitment triage view;
- a Relationships list containing a very small fictional set;
- one detailed partner Relationship page;
- an Engagements list containing multiple engagement types for variation;
- one detailed senior delegation engagement;
- structured enquiry scope and open questions;
- engagement objectives and strategic themes;
- fictional internal stakeholder/capability assignments linked to objectives;
- objective-linked agenda activities;
- a deterministic Briefing view assembled from structured records;
- Outcomes and Commitments;
- one resettable interaction where recording a fictional outcome/commitment updates relationship context; and
- a preserved route into the existing Study Tour readiness experience.

### Mock or reference only

- CRM partner/account source;
- email enquiry source;
- calendar availability;
- agreement repository entries;
- internal people/capability directory;
- delegation contact details;
- meeting notes; and
- mobility/SIS source records.

### V2 or later

- genuine AI assistance;
- CRM, email, calendar, directory, agreement, mobility, or travel integrations;
- persistence, authentication, permissions, and audit history;
- configurable institutional taxonomies and workflows;
- full contact and relationship-data administration;
- collaboration, notifications, and approval routing;
- document generation/export;
- participant self-service and secure data handling; and
- reporting across a production engagement portfolio.

### Remove entirely from the concept

- generic sales pipeline and revenue forecasting;
- marketing campaigns and mass communications;
- universal task/project-management features;
- replacement claims for CRM, SIS, mobility, agreement, travel, or risk platforms;
- generic AI chat;
- decorative AI summaries;
- opaque relationship, participant, or risk scores; and
- AI use for deterministic due-date, readiness, or attention rules.

### Sprint 02 migration note

When separately authorised, Sprint 02 will migrate the existing Study Tour implementation into the broader `Relationship → Engagement` architecture without discarding the accepted vertical workflow.

Sprint 02 must preserve, adapting keys or scenario framing only where required:

- the 24-participant primary Study Tour workflow;
- participant readiness;
- requirements and document metadata;
- deterministic attention rules;
- itinerary, accommodation, transport, and logistics context;
- the fixed demo clock;
- `Confirm requirement`;
- `Reset demo`; and
- existing tests where relevant.

Application fixture names and scenario framing may be changed during Sprint 02 to comply with the approved real-world evidence policy. No migration, rename, fixture change, or code refactor occurs in this documentation-only PR.

## 13. Future AI opportunities

No AI API or AI implementation is authorised by PRD 0.4. Genuine AI remains deferred until the structured non-AI workflow has been implemented and reviewed.

| Priority | Candidate | Product judgment |
| ---: | --- | --- |
| 1 | Enquiry → structured engagement scope | Approved first future feature: bounded input/output, visible source grounding, useful missing-information detection, and a clear human confirmation gate |
| 2 | Structured engagement data → briefing draft | High value after relationship and engagement records are credible; requires provenance and review |
| 3 | Meeting notes → outcomes, commitments, owners, and due dates | Valuable but more generic; nothing updates relationship memory without explicit confirmation |
| 4 | Relationship history → engagement context summary | Useful once the fixture/history dataset is sufficiently rich and source links remain visible |
| 5 | Objectives → suggested stakeholders/capabilities | Start with controlled taxonomy and deterministic matching; AI adds value only with governed capability data |
| 6 | Objectives and constraints → proposed agenda structure | Defer until real constraints and stakeholder data exist |
| 7 | History and commitments → follow-up priorities | Deterministic owner/due-date rules should be exhausted first |

### Approved first future genuine AI feature

The first feature should transform a fictional incoming enquiry into a proposed structured engagement scope.

Required output:

- proposed engagement type;
- partner match or unresolved partner;
- proposed dates and delegation size;
- stated objectives and strategic themes, grounded to source excerpts;
- fields marked as missing or ambiguous;
- clarification questions; and
- confirmation state for every proposed field.

The officer must review and confirm the structure before it becomes product state. The AI may propose; it may not silently create commitments, invite stakeholders, or assert institutional history.

## 14. User stories and acceptance criteria

### US-01 — Relationship context

**As an International Relations Officer, I want the relevant history and open commitments for a partner so that I can prepare without relying on individual memory.**

Acceptance criteria:

- Relationship Overview shows the partner, relationship summary, themes, owner, key contacts, agreement references, and open commitments.
- Engagement History shows previous engagements with dates, types, outcomes, and status.
- Relationship summaries are derived from fictional source records, not unsupported AI prose.
- Selecting an engagement opens its context without losing the relationship connection.

### US-02 — Structured engagement scope

**As an officer, I want to convert an incoming request into a structured scope so that missing information and next questions are visible.**

Acceptance criteria:

- the original fictional enquiry remains visible as source context;
- type, partner, dates, delegation size, objectives, themes, and missing information are represented separately;
- stated facts are distinguishable from assumptions or proposed interpretation;
- clarification questions link to missing or ambiguous fields; and
- no AI capability is implied in the deterministic/manual MVP.

### US-03 — Objective-led coordination

**As an officer, I want objectives connected to internal stakeholders and agenda items so that the engagement plan has an explicit purpose.**

Acceptance criteria:

- every primary objective has at least one success signal or unresolved question;
- stakeholder assignments show role, internal capability, and linked objective;
- substantive agenda items show linked objectives and an owner;
- unmatched objectives remain visible rather than receiving fabricated stakeholders; and
- no invitations or commitments are sent externally.

### US-04 — Briefing preparation

**As an internal host, I want one structured briefing so that I understand the partner, visitors, objectives, history, agenda, and open issues.**

Acceptance criteria:

- Briefing assembles partner overview, relationship history, guests, objectives, hosts, prior commitments, talking points, agenda, and open issues from source records;
- each section identifies its source or links back to the relevant record;
- incomplete information is labelled explicitly; and
- the MVP does not claim to generate an AI-authored briefing.

### US-05 — Outcomes and commitments

**As an officer, I want to capture what was achieved and who owns follow-up so that the engagement changes the institutional relationship record.**

Acceptance criteria:

- outcomes link to at least one objective and optionally an agenda activity;
- commitments include an owner, due date, state, and source outcome;
- a resettable demo interaction adds or confirms one fictional outcome/commitment;
- the same state change updates Engagement Outcomes, Relationship Overview, and Home commitment triage; and
- Reset restores the exact fixture baseline.

### US-06 — Study Tour Delivery preservation

**As a Study Tour Coordinator, I want the accepted readiness workflow preserved so that the broader model does not weaken delivery operations.**

Acceptance criteria:

- a Study Tour is an Engagement with an explicit Study Tour Delivery extension;
- all 72 synthetic Sprint 01 participant records remain internally consistent;
- existing readiness, outstanding requirement, date, attention, and aggregate tests continue to pass;
- delegation engagements do not display Study Tour participant/readiness concepts; and
- the current confirm/reset interaction remains available and explainable.

## 15. Cross-product acceptance criteria

The approved pivot direction is acceptable in an eventual MVP only when:

- a first-time reviewer can explain the product’s relationship-to-engagement model within one minute;
- the reviewer can trace one objective through stakeholder, agenda, outcome, and commitment records;
- the resulting commitment is visible in future relationship context;
- the product remains useful without AI branding or external services;
- a generic delegation never inherits student-readiness concepts;
- a Study Tour retains the accepted Sprint 01 readiness workflow;
- engagement stage, Study Tour lifecycle, and Study Tour readiness remain independent typed concepts;
- every scenario and record is clearly classified as factual professional context, anonymised/composite, or fictional/synthetic;
- real institution names appear only with accurate, non-confidential, supportable facts and never with invented events or outcomes;
- no copy implies that the prototype was historically deployed or used in production;
- aggregate values are derived from source fixtures;
- all date-relative behaviour continues to use the fixed demo clock;
- no user-facing claim implies live CRM, SIS, mobility, agreement, calendar, email, or travel integration;
- objective and outcome links remain understandable at desktop and mobile widths;
- controls have accessible names, visible focus, and non-colour status cues;
- no external AI API, database, authentication, analytics, or Vercel deployment is added without a later approval; and
- the current Sprint 01 test/build baseline remains green after any authorised migration.

## 16. Out of scope for the pivot MVP

- repository or application rename without a separate naming decision;
- application refactor before separate Sprint 02 authorisation;
- production partner/contact master-data management;
- email or calendar synchronisation;
- agreement authoring, approval, signatures, or compliance;
- student application processing or mobility nomination management;
- travel registry, live safety/risk feeds, traveller tracking, or duty-of-care operations;
- real student identity, passport, health, emergency, confidential, or operational institutional data in demo records;
- authentication, permissions, database, audit history, or collaboration;
- automated invitations, messages, or stakeholder assignment;
- AI API, chatbot, autonomous agent, or unreviewed generated content;
- generic project management, sales pipeline, or marketing automation;
- predictive relationship, engagement, participant, or safety scoring; and
- Vercel deployment.

## 17. Risks and assumptions

| ID | Type | Statement | Response |
| --- | --- | --- | --- |
| A-01 | Approved product hypothesis | International engagement officers experience meaningful coordination work between systems of record. | Validate the two demo journeys with practitioners or hiring reviewers before broad implementation. |
| A-02 | Approved product hypothesis | Objective-to-outcome traceability is more valuable and distinctive than another relationship timeline. | Make the chain the primary prototype test, not a secondary detail. |
| A-03 | Confirmed asset | Sprint 01 is a valid Study Tour readiness foundation. | Preserve it as Study Tour Delivery and retain its rules/tests. |
| A-04 | Approved MVP direction | A delegation-first scenario best demonstrates the broader persona and product differentiation. | Use it as the primary next MVP; keep Study Tour as the supporting vertical. |
| R-01 | Strategic risk | Relationship pages, contacts, history, and commitments still overlap substantially with CRM. | Avoid system-of-record breadth and prove objective-led coordination and memory feedback. |
| R-02 | Competitive risk | International-office platforms already manage mobility, partnerships, agreements, workflows, and reporting. | Position this as a workflow concept and acknowledge where those platforms are stronger. |
| R-03 | Scope risk | Two scenarios can become a large enterprise prototype. | Build one delegation journey deeply and preserve, rather than expand, Study Tour Delivery. |
| R-04 | Model risk | A universal Engagement model could flatten meaningful differences between visits, meetings, and Study Tours. | Use a shared core plus explicit type-specific extensions. |
| R-05 | Data risk | Stakeholder matching can look fictitious without a credible internal capability source. | Use a small, explicit synthetic capability directory and show unmatched objectives. |
| R-06 | AI risk | “Copilot” naming or generated content may imply unsupported accuracy. | Keep the name provisional and AI deferred; require source grounding and confirmation when introduced. |
| R-07 | Privacy risk | Delegation and relationship records may include sensitive professional or institutional context. | Use minimal synthetic data and define permissions/governance before persistence. |
| R-08 | Narrative risk | Reframing Sprint 01 could make the existing Dashboard appear disconnected. | Keep it reachable as a named Study Tour Delivery workflow and document the migration story. |
| R-09 | Evidence risk | A real institution name attached to invented demo history could imply that fictional events occurred. | Apply the approved factual/anonymised/fictional classification and use a composite Partner Relationship for the connected demo. |

## 18. Approved decisions and implementation gate

The product owner approved the following direction on 22 August 2026:

1. position the broader concept as an **international engagement operating layer**;
2. use `Relationship → Engagement` as the central product model;
3. use `Partner Intent → Scope → Objectives → Stakeholders / Agenda → Outcomes → Commitments → Relationship Memory` as the signature workflow;
4. use `Home / Relationships / Engagements` as the minimal global information architecture;
5. use a delegation-first primary MVP while preserving Study Tour Delivery as the supporting vertical;
6. preserve **TourFlow** as the future name of the Study Tour Delivery workflow/module;
7. do not use **Copilot** as the user-facing umbrella name until genuine AI functionality exists;
8. defer genuine AI until the structured non-AI workflow has been implemented and reviewed;
9. use **Enquiry → Structured Engagement Scope** as the first future genuine AI feature; and
10. require a separate instruction before Sprint 02 implementation.

The real-world evidence policy and anonymised/composite relationship-memory demo strategy are also approved.

### Unresolved decisions

- final umbrella product name;
- exact public-facing name of the composite/anonymised partner;
- Sprint 02 implementation details and authorisation;
- genuine AI implementation and evaluation;
- external integrations; and
- database, authentication, and persistence.

No unresolved item authorises implementation. Sprint 02 remains closed until a separate instruction.

## 19. Supporting analysis

Detailed competitive reasoning, implementation impact, migration mapping, IA critique, MVP options, and AI prioritisation are recorded in [`PIVOT_ANALYSIS.md`](./PIVOT_ANALYSIS.md).

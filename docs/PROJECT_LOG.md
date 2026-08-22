# TourFlow AI — Project Log

This log records how TourFlow AI evolves from an operational problem into a tested portfolio prototype. It separates confirmed decisions from assumptions and preserves evidence of iteration.

## Project status

| Field | Current value |
| --- | --- |
| Phase | Product direction approved; implementation gate closed |
| Current version | PRD 0.2 |
| Implementation | Not started; separate authorisation required |
| Data approach | Realistic fictional data only |
| External services | None approved |
| Next gate | Documentation commit and push, followed by a separate implementation discussion |

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
| D-010 | 2026-08-22 | Keep implementation closed until a separate instruction. | Allows the approved documentation baseline to be committed and reviewed first. | Begin scaffolding immediately after product approval | Product owner |

## Remaining gate

The V1 product direction is approved. Application implementation remains intentionally closed until the product owner gives a separate instruction to discuss or begin the implementation phase. No dependency installation, scaffolding, application code, Supabase, database, authentication, or external AI integration is authorised by the decisions above.

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

## Problems and solutions

| ID | Date | Problem | Impact | Root cause | Solution | Verification |
| --- | --- | --- | --- | --- | --- | --- |
| — | — | No product or implementation problem recorded yet. | — | — | — | — |

## Testing record

| Date | Change or version | Check | Result | Evidence / notes |
| --- | --- | --- | --- | --- |
| 2026-08-22 | PRD draft 0.1 | Repository scope inspection | Pass | Initial repository contained only `README.md`. |
| 2026-08-22 | PRD draft 0.1 | Application tests/build | Not applicable | Application implementation has not started. |
| 2026-08-22 | PRD 0.2 | Documentation scope and terminology audit | Pass | Approved IA, participant terminology, fixture strategy, and phase gate recorded; no application code present. |

## Lessons learned

Record concise lessons that should influence later decisions.

| Date | Lesson | Implication |
| --- | --- | --- |
| 2026-08-22 | Real study-tour operations connect participant readiness, pre-departure activity, itinerary, transport, accommodation, and risk context. | V1 should connect these records inside a program workflow rather than present unrelated dashboard cards. |
| 2026-08-22 | Institutional processes and approval authorities vary. | The prototype must not claim universal policy compliance. |
| 2026-08-22 | “AI” is not required to make the first workflow valuable. | Start with transparent rules and add AI only after a validated use case exists. |

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
- [ ] a separate instruction authorises implementation planning or scaffolding.

import { DELEGATION_ENGAGEMENT_ID } from "./engagement-fixtures";
import type { AgendaItem, InternalStakeholder, UniversityCapability } from "../domain/types";

export const universityCapabilities: UniversityCapability[] = [
  { id: "cap-digital-innovation", name: "Digital Innovation Institute", category: "research", summary: "Connects applied AI research with interdisciplinary innovation partnerships.", themes: ["Artificial Intelligence", "Innovation"], synthetic: true },
  { id: "cap-business-school", name: "Business School", category: "academic", summary: "Leads business education, Business Analytics and international curriculum collaboration.", themes: ["Business Analytics", "Joint Programs"], synthetic: true },
  { id: "cap-global-mobility", name: "Global Mobility Team", category: "professional", summary: "Coordinates student exchange, short-term mobility and partner mobility pathways.", themes: ["Student Mobility"], synthetic: true },
  { id: "cap-international-partnerships", name: "International Partnerships", category: "engagement", summary: "Coordinates institutional partnership strategy and viable collaboration pathways.", themes: ["Joint Programs", "Institutional Collaboration"], synthetic: true },
  { id: "cap-data-science", name: "Data Science Centre", category: "research", summary: "Brings together data science, responsible analytics and applied research capability.", themes: ["Artificial Intelligence", "Business Analytics"], synthetic: true },
  { id: "cap-industry-engagement", name: "Industry Engagement", category: "engagement", summary: "Connects academic expertise with industry partners and applied innovation activity.", themes: ["Innovation", "Institutional Collaboration"], synthetic: true },
];

export const internalStakeholders: InternalStakeholder[] = [
  { id: "stakeholder-maya-chen", name: "Professor Maya Chen", role: "Director, Digital Innovation Institute", capabilityId: "cap-digital-innovation", synthetic: true },
  { id: "stakeholder-james-walker", name: "Dr James Walker", role: "Associate Dean International, Business School", capabilityId: "cap-business-school", synthetic: true },
  { id: "stakeholder-priya-nair", name: "Priya Nair", role: "Manager, Global Mobility", capabilityId: "cap-global-mobility", synthetic: true },
  { id: "stakeholder-sofia-martins", name: "Sofia Martins", role: "Director, International Partnerships", capabilityId: "cap-international-partnerships", synthetic: true },
  { id: "stakeholder-daniel-okafor", name: "Dr Daniel Okafor", role: "Research Lead, Data Science Centre", capabilityId: "cap-data-science", synthetic: true },
  { id: "stakeholder-amelia-brooks", name: "Amelia Brooks", role: "Head of Industry Engagement", capabilityId: "cap-industry-engagement", synthetic: true },
];

export const baselineConfirmedAssignmentIds = [
  "assignment-objective-broader-collaboration-stakeholder-sofia-martins",
];

export const delegationAgendaItems: AgendaItem[] = [
  { id: "agenda-executive-welcome", engagementId: DELEGATION_ENGAGEMENT_ID, date: "2026-10-19", startTime: "09:00", endTime: "09:30", title: "Executive Welcome", location: "Executive Boardroom", type: "welcome", objectiveIds: ["objective-broader-collaboration"], stakeholderAssignmentIds: ["assignment-objective-broader-collaboration-stakeholder-sofia-martins"], purpose: "Set the institutional context for the visit and confirm the intended areas of discussion.", status: "confirmed" },
  { id: "agenda-partnership-discussion", engagementId: DELEGATION_ENGAGEMENT_ID, date: "2026-10-19", startTime: "09:30", endTime: "10:30", title: "Institutional Partnership Discussion", location: "Executive Boardroom", type: "roundtable", objectiveIds: ["objective-broader-collaboration", "objective-joint-program-interest"], stakeholderAssignmentIds: ["assignment-objective-broader-collaboration-stakeholder-sofia-martins", "assignment-objective-joint-program-interest-stakeholder-james-walker"], purpose: "Clarify viable collaboration pathways beyond short-term programs and identify the partner's preferred joint-program model.", status: "proposed" },
  { id: "agenda-ai-session", engagementId: DELEGATION_ENGAGEMENT_ID, date: "2026-10-19", startTime: "11:00", endTime: "12:15", title: "AI Research and Innovation Session", location: "Digital Innovation Institute", type: "presentation", objectiveIds: ["objective-broader-collaboration"], stakeholderAssignmentIds: ["assignment-objective-broader-collaboration-stakeholder-maya-chen"], purpose: "Explore research collaboration and identify areas for future academic exchange.", status: "proposed" },
  { id: "agenda-hosted-lunch", engagementId: DELEGATION_ENGAGEMENT_ID, date: "2026-10-19", startTime: "12:30", endTime: "13:45", title: "Hosted Lunch", location: "University House", type: "meal", objectiveIds: [], stakeholderAssignmentIds: ["assignment-objective-broader-collaboration-stakeholder-sofia-martins"], purpose: "Provide informal relationship-building time for delegation and university hosts.", status: "draft" },
  { id: "agenda-business-programs", engagementId: DELEGATION_ENGAGEMENT_ID, date: "2026-10-19", startTime: "14:00", endTime: "15:15", title: "Business Analytics and Joint Programs", location: "Business School Council Room", type: "workshop", objectiveIds: ["objective-joint-program-interest"], stakeholderAssignmentIds: ["assignment-objective-joint-program-interest-stakeholder-james-walker", "assignment-objective-joint-program-interest-stakeholder-daniel-okafor"], purpose: "Test academic fit, program level and feasible forms of curriculum collaboration.", status: "proposed" },
  { id: "agenda-mobility", engagementId: DELEGATION_ENGAGEMENT_ID, date: "2026-10-19", startTime: "15:30", endTime: "16:15", title: "Student Mobility Discussion", location: "International Office", type: "meeting", objectiveIds: ["objective-mobility-pathways"], stakeholderAssignmentIds: ["assignment-objective-mobility-pathways-stakeholder-priya-nair"], purpose: "Clarify preferred mobility models and the inputs required for a feasibility review.", status: "proposed" },
  { id: "agenda-campus-innovation", engagementId: DELEGATION_ENGAGEMENT_ID, date: "2026-10-19", startTime: "16:30", endTime: "17:15", title: "Campus Innovation Visit", location: "Innovation Precinct", type: "campus_visit", objectiveIds: ["objective-broader-collaboration"], stakeholderAssignmentIds: ["assignment-objective-broader-collaboration-stakeholder-amelia-brooks"], purpose: "Demonstrate applied innovation capability and connect institutional interests with industry-facing activity.", status: "draft" },
];

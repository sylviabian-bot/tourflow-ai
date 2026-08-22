import type {
  ItineraryEntry,
  Milestone,
  Participant,
  Program,
  Requirement,
} from "@/domain/types";

export const programs: Program[] = [
  {
    id: "shanghai-sydney-innovation",
    name: "Shanghai Business School – Sydney Innovation Study Tour",
    destination: "Sydney, Australia",
    startDate: "2026-09-12",
    endDate: "2026-09-21",
    lifecycleStage: "pre_departure",
    coordinator: "Elena Park",
    academicLead: "Dr Marcus Lee",
  },
  {
    id: "osaka-global-business",
    name: "Osaka Global Business Program",
    destination: "Osaka, Japan",
    startDate: "2026-10-05",
    endDate: "2026-10-14",
    lifecycleStage: "pre_departure",
    coordinator: "Noah Bennett",
    academicLead: "Professor Emi Watanabe",
  },
  {
    id: "singapore-future-leaders",
    name: "Singapore Future Leaders Program",
    destination: "Singapore",
    startDate: "2027-01-18",
    endDate: "2027-01-27",
    lifecycleStage: "planning",
    coordinator: "Aisha Morgan",
    academicLead: "Dr Daniel Koh",
  },
];

type SyntheticIdentity = readonly [givenName: string, familyName: string];

const shanghaiIdentities: SyntheticIdentity[] = [
  ["Avery", "Lin"], ["Maya", "Hart"], ["Theo", "Nguyen"], ["Leila", "Brooks"],
  ["Jonah", "Park"], ["Sienna", "Cole"], ["Arlo", "Chen"], ["Nina", "Wallace"],
  ["Kai", "Mercer"], ["Zara", "Patel"], ["Eli", "Foster"], ["Mila", "Song"],
  ["Owen", "Reed"], ["Ivy", "Tran"], ["Leo", "Morgan"], ["Ana", "Kim"],
  ["Felix", "Young"], ["Lina", "Shaw"], ["Miles", "Gupta"], ["Ruby", "Ho"],
  ["Jude", "Lawson"], ["Cleo", "Wang"], ["Remy", "Stone"], ["Talia", "Lim"],
];

const osakaIdentities: SyntheticIdentity[] = [
  ["Ari", "Bell"], ["Mina", "Rowe"], ["Finn", "Lau"], ["Esme", "Price"],
  ["Hugo", "Tan"], ["Lara", "West"], ["Nico", "Yam"], ["Amara", "Quinn"],
  ["Louis", "Fang"], ["Mira", "Blake"], ["Oscar", "Shen"], ["Nora", "Dale"],
  ["Ellis", "Zhou"], ["Rhea", "Cruz"], ["Sam", "Ito"], ["Thea", "Miles"],
  ["Max", "Jin"], ["Lily", "Grant"],
];

const singaporeIdentities: SyntheticIdentity[] = [
  ["Ada", "Nash"], ["Ben", "Chow"], ["Cora", "Field"], ["Dylan", "Teo"],
  ["Eva", "Rhodes"], ["Gabe", "Low"], ["Hope", "Clarke"], ["Isaac", "Yeo"],
  ["June", "Moss"], ["Kiran", "Poon"], ["Luca", "Dean"], ["Mae", "Ong"],
  ["Noel", "Ward"], ["Orla", "Kwan"], ["Perry", "Fox"], ["Quinn", "Toh"],
  ["Romy", "Banks"], ["Seth", "Goh"], ["Tess", "Lane"], ["Uma", "Sim"],
  ["Vince", "Baird"], ["Willa", "Heng"], ["Xavi", "North"], ["Yara", "Loh"],
  ["Zane", "Pace"], ["Ayla", "Chua"], ["Beau", "Sloan"], ["Demi", "Neo"],
  ["Evan", "Pike"], ["Faye", "Quek"],
];

function createParticipants(
  programId: string,
  prefix: string,
  identities: SyntheticIdentity[],
): Participant[] {
  return identities.map(([givenName, familyName], index) => ({
    id: `${prefix}-participant-${String(index + 1).padStart(2, "0")}`,
    programId,
    displayName: `${givenName} ${familyName}`,
    participantType: "student",
    synthetic: true,
  }));
}

const shanghaiParticipants = createParticipants(
  "shanghai-sydney-innovation",
  "sha",
  shanghaiIdentities,
);
const osakaParticipants = createParticipants(
  "osaka-global-business",
  "osa",
  osakaIdentities,
);
const singaporeParticipants = createParticipants(
  "singapore-future-leaders",
  "sin",
  singaporeIdentities,
);

export const participants: Participant[] = [
  ...shanghaiParticipants,
  ...osakaParticipants,
  ...singaporeParticipants,
];

const shanghaiBaseRequirements: Requirement[] = shanghaiParticipants.flatMap(
  (participant, index) => [
    {
      id:
        index === 0
          ? "sha-req-travel-insurance-01"
          : `sha-req-travel-insurance-${String(index + 1).padStart(2, "0")}`,
      programId: participant.programId,
      participantId: participant.id,
      kind: "document" as const,
      title: "Travel insurance confirmation",
      status: index === 0 ? "action_required" as const : "approved" as const,
      documentStatus: index === 0 ? "not_provided" as const : "verified" as const,
      dueDate: "2026-08-18",
      updatedAt: index === 0 ? "2026-08-19" : "2026-08-15",
      isCritical: true,
    },
    {
      id: `sha-req-emergency-contact-${String(index + 1).padStart(2, "0")}`,
      programId: participant.programId,
      participantId: participant.id,
      kind: "confirmation" as const,
      title: "Emergency contact confirmed",
      status: index === 1 ? "action_required" as const : "approved" as const,
      dueDate: "2026-08-20",
      updatedAt: index === 1 ? "2026-08-20" : "2026-08-16",
      isCritical: true,
    },
  ],
);

const shanghaiFollowUpRequirements: Requirement[] = [
  {
    id: "sha-req-dietary-03",
    programId: "shanghai-sydney-innovation",
    participantId: shanghaiParticipants[2].id,
    kind: "confirmation",
    title: "Dietary requirements confirmed",
    status: "action_required",
    dueDate: "2026-08-30",
    updatedAt: "2026-08-21",
    isCritical: false,
  },
  {
    id: "sha-req-briefing-04",
    programId: "shanghai-sydney-innovation",
    participantId: shanghaiParticipants[3].id,
    kind: "briefing",
    title: "Pre-departure briefing completed",
    status: "submitted",
    dueDate: "2026-08-25",
    updatedAt: "2026-08-21",
    isCritical: false,
  },
  {
    id: "sha-req-passport-05",
    programId: "shanghai-sydney-innovation",
    participantId: shanghaiParticipants[4].id,
    kind: "document",
    title: "Passport validity confirmed",
    status: "under_review",
    documentStatus: "received",
    dueDate: "2026-08-29",
    updatedAt: "2026-08-21",
    isCritical: true,
  },
  {
    id: "sha-req-flight-06",
    programId: "shanghai-sydney-innovation",
    participantId: shanghaiParticipants[5].id,
    kind: "travel_detail",
    title: "Arrival flight details confirmed",
    status: "not_started",
    dueDate: "2026-09-01",
    updatedAt: "2026-08-18",
    isCritical: false,
  },
];

const osakaRequirements: Requirement[] = osakaParticipants.map((participant, index) => ({
  id: `osa-req-participation-${String(index + 1).padStart(2, "0")}`,
  programId: participant.programId,
  participantId: participant.id,
  kind: "confirmation",
  title: "Program participation confirmed",
  status: "approved",
  dueDate: "2026-09-10",
  updatedAt: "2026-08-17",
  isCritical: true,
}));

const singaporeRequirements: Requirement[] = singaporeParticipants.map(
  (participant, index) => ({
    id: `sin-req-planning-${String(index + 1).padStart(2, "0")}`,
    programId: participant.programId,
    participantId: participant.id,
    kind: "task",
    title: "Initial participation checklist",
    status: index < 10 ? "approved" : "not_started",
    dueDate: "2026-11-20",
    updatedAt: "2026-08-20",
    isCritical: false,
  }),
);

export const requirements: Requirement[] = [
  ...shanghaiBaseRequirements,
  ...shanghaiFollowUpRequirements,
  ...osakaRequirements,
  ...singaporeRequirements,
];

export const milestones: Milestone[] = [
  {
    id: "sha-milestone-provider-list",
    programId: "shanghai-sydney-innovation",
    title: "Final participant list to travel provider",
    dueDate: "2026-08-26",
    status: "in_progress",
    isBlocking: false,
  },
  {
    id: "sha-milestone-briefing",
    programId: "shanghai-sydney-innovation",
    title: "Pre-departure briefing",
    dueDate: "2026-09-02",
    status: "in_progress",
    isBlocking: false,
  },
  {
    id: "sha-milestone-manifest",
    programId: "shanghai-sydney-innovation",
    title: "Final travel manifest",
    dueDate: "2026-09-05",
    status: "not_started",
    isBlocking: false,
  },
  {
    id: "osa-milestone-briefing",
    programId: "osaka-global-business",
    title: "Cohort briefing",
    dueDate: "2026-09-20",
    status: "not_started",
    isBlocking: false,
  },
  {
    id: "osa-milestone-final-pack",
    programId: "osaka-global-business",
    title: "Final participant pack",
    dueDate: "2026-09-26",
    status: "not_started",
    isBlocking: false,
  },
  {
    id: "sin-milestone-budget",
    programId: "singapore-future-leaders",
    title: "Program budget approval",
    dueDate: "2026-10-10",
    status: "in_progress",
    isBlocking: false,
  },
  {
    id: "sin-milestone-applications",
    programId: "singapore-future-leaders",
    title: "Applications open",
    dueDate: "2026-11-02",
    status: "not_started",
    isBlocking: false,
  },
];

export const itineraryEntries: ItineraryEntry[] = [
  {
    id: "sha-itinerary-arrival-flight",
    programId: "shanghai-sydney-innovation",
    date: "2026-09-12",
    startTime: "09:30",
    title: "Flight MU561 arrives at SYD",
    location: "Sydney Airport · Terminal 1",
    type: "transport",
    details: "Group arrival and immigration buffer.",
    confirmationState: "confirmed",
  },
  {
    id: "sha-itinerary-coach",
    programId: "shanghai-sydney-innovation",
    date: "2026-09-12",
    startTime: "10:45",
    title: "Coach pickup — Bay 12",
    location: "Sydney Airport",
    type: "transport",
    details: "Coach allocation awaiting provider confirmation.",
    confirmationState: "pending",
  },
  {
    id: "sha-itinerary-accommodation",
    programId: "shanghai-sydney-innovation",
    date: "2026-09-12",
    startTime: "12:00",
    title: "Arrival at student accommodation",
    location: "Central Sydney",
    type: "accommodation",
    details: "Rooming list and early luggage storage confirmed.",
    confirmationState: "confirmed",
  },
  {
    id: "sha-itinerary-welcome",
    programId: "shanghai-sydney-innovation",
    date: "2026-09-12",
    startTime: "14:30",
    title: "Welcome briefing",
    location: "Accommodation seminar room",
    type: "briefing",
    details: "Orientation, local safety, communications, and program expectations.",
    confirmationState: "confirmed",
  },
  {
    id: "osa-itinerary-arrival",
    programId: "osaka-global-business",
    date: "2026-10-05",
    startTime: "15:10",
    title: "Arrival and rail transfer",
    location: "Kansai International Airport",
    type: "transport",
    details: "Group rail tickets confirmed.",
    confirmationState: "confirmed",
  },
];

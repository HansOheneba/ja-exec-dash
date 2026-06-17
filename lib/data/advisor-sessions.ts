type SessionStatus = "upcoming" | "completed" | "cancelled";
type SessionType =
  | "Annual Review"
  | "Quarterly Check-in"
  | "Onboarding"
  | "Planning"
  | "Ad-hoc"
  | "Estate Planning"
  | "Portfolio Review";

type AdvisorSession = {
  id: string;
  clientId: string;
  clientName: string;
  clientInitials: string;
  date: string;
  time: string;
  duration: string;
  type: SessionType;
  status: SessionStatus;
  notes?: string;
  agenda?: string;
};

const advisorSessions: AdvisorSession[] = [
  {
    id: "s1",
    clientId: "lois-lane",
    clientName: "Lois Lane",
    clientInitials: "LL",
    date: "16 Jun 2026",
    time: "10:00 AM",
    duration: "60 min",
    type: "Annual Review",
    status: "upcoming",
    agenda:
      "Succession planning update, digital assets allocation review, estate plan progress.",
  },
  {
    id: "s2",
    clientId: "theo-baxter",
    clientName: "Theo Baxter",
    clientInitials: "TB",
    date: "18 Jun 2026",
    time: "2:00 PM",
    duration: "45 min",
    type: "Onboarding",
    status: "upcoming",
    agenda:
      "Complete KYC walkthrough, confirm initial allocation, set up client portal access.",
  },
  {
    id: "s3",
    clientId: "daniel-osei",
    clientName: "Daniel Osei",
    clientInitials: "DO",
    date: "22 Jun 2026",
    time: "11:00 AM",
    duration: "30 min",
    type: "Quarterly Check-in",
    status: "upcoming",
    agenda:
      "Catch up on missed check-in. Discuss commodities underperformance and rebalancing options.",
  },
  {
    id: "s4",
    clientId: "priya-nair",
    clientName: "Priya Nair",
    clientInitials: "PN",
    date: "24 Jun 2026",
    time: "3:30 PM",
    duration: "60 min",
    type: "Estate Planning",
    status: "upcoming",
    agenda: "Trust structure setup, beneficiary assignments, timeline review.",
  },
  {
    id: "s5",
    clientId: "amara-diallo",
    clientName: "Amara Diallo",
    clientInitials: "AD",
    date: "13 Jun 2026",
    time: "9:00 AM",
    duration: "45 min",
    type: "Ad-hoc",
    status: "completed",
    notes:
      "Discussed African real estate opportunity. Agreed to prepare a property fund briefing by end of month.",
  },
  {
    id: "s6",
    clientId: "marcus-webb",
    clientName: "Marcus Webb",
    clientInitials: "MW",
    date: "28 Apr 2026",
    time: "11:00 AM",
    duration: "60 min",
    type: "Annual Review",
    status: "completed",
    notes:
      "Annual review completed. All targets met. Client looking to consolidate fixed income position over Q3.",
  },
  {
    id: "s7",
    clientId: "lois-lane",
    clientName: "Lois Lane",
    clientInitials: "LL",
    date: "3 Jun 2026",
    time: "2:00 PM",
    duration: "45 min",
    type: "Portfolio Review",
    status: "completed",
    notes:
      "Reviewed Q1 performance. Succession planning review formally requested by client.",
  },
  {
    id: "s8",
    clientId: "daniel-osei",
    clientName: "Daniel Osei",
    clientInitials: "DO",
    date: "1 Jun 2026",
    time: "3:00 PM",
    duration: "30 min",
    type: "Quarterly Check-in",
    status: "cancelled",
    notes: "Client did not attend. Rescheduled to 22 Jun 2026.",
  },
  {
    id: "s9",
    clientId: "priya-nair",
    clientName: "Priya Nair",
    clientInitials: "PN",
    date: "14 Apr 2026",
    time: "10:00 AM",
    duration: "60 min",
    type: "Portfolio Review",
    status: "completed",
    notes:
      "Mid-year review. Discussed increasing digital assets allocation. Will review risk profile.",
  },
  {
    id: "s10",
    clientId: "amara-diallo",
    clientName: "Amara Diallo",
    clientInitials: "AD",
    date: "10 Apr 2026",
    time: "9:00 AM",
    duration: "60 min",
    type: "Planning",
    status: "completed",
    notes:
      "Succession briefing with Amara and her family. Trust and succession framework now fully established.",
  },
];

export {
  advisorSessions,
  type AdvisorSession,
  type SessionStatus,
  type SessionType,
};

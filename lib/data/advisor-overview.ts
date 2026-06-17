type ActivityType = "document" | "review" | "request" | "meeting" | "note";

type RecentActivity = {
  client: string;
  clientId: string;
  action: string;
  time: string;
  type: ActivityType;
};

type UpcomingSession = {
  clientName: string;
  clientInitials: string;
  type: string;
  date: string;
  time: string;
};

type AdvisorOverview = {
  totalAum: number;
  activeClients: number;
  onboarding: number;
  reviewDue: number;
  openTasks: number;
  attentionRequired: number;
  recentActivity: RecentActivity[];
  upcomingSessions: UpcomingSession[];
};

const advisorOverview: AdvisorOverview = {
  totalAum: 32609130,
  activeClients: 4,
  onboarding: 1,
  reviewDue: 1,
  openTasks: 11,
  attentionRequired: 3,
  recentActivity: [
    {
      client: "Lois Lane",
      clientId: "lois-lane",
      action: "Requested succession planning review",
      time: "2 hours ago",
      type: "request",
    },
    {
      client: "Marcus Webb",
      clientId: "marcus-webb",
      action: "Document uploaded: Q1 statement",
      time: "Yesterday",
      type: "document",
    },
    {
      client: "Priya Nair",
      clientId: "priya-nair",
      action: "Estate plan milestone reached: will review complete",
      time: "3 days ago",
      type: "review",
    },
    {
      client: "Daniel Osei",
      clientId: "daniel-osei",
      action: "Missed quarterly check-in (rescheduled)",
      time: "5 days ago",
      type: "meeting",
    },
    {
      client: "Theo Baxter",
      clientId: "theo-baxter",
      action: "KYC documents submitted",
      time: "4 days ago",
      type: "document",
    },
    {
      client: "Amara Diallo",
      clientId: "amara-diallo",
      action: "Bi-monthly advisory call completed",
      time: "2 days ago",
      type: "meeting",
    },
  ],
  upcomingSessions: [
    {
      clientName: "Lois Lane",
      clientInitials: "LL",
      type: "Annual review",
      date: "16 Jun 2026",
      time: "10:00 AM",
    },
    {
      clientName: "Theo Baxter",
      clientInitials: "TB",
      type: "Onboarding call",
      date: "18 Jun 2026",
      time: "2:00 PM",
    },
    {
      clientName: "Daniel Osei",
      clientInitials: "DO",
      type: "Rescheduled check-in",
      date: "22 Jun 2026",
      time: "11:00 AM",
    },
    {
      clientName: "Priya Nair",
      clientInitials: "PN",
      type: "Trust structure review",
      date: "24 Jun 2026",
      time: "3:30 PM",
    },
  ],
};

export {
  advisorOverview,
  type AdvisorOverview,
  type RecentActivity,
  type UpcomingSession,
  type ActivityType,
};

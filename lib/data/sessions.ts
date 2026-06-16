// Sessions data: replace with API calls

export type SessionStatus = "Confirmed" | "Tentative" | "Completed" | "Cancelled";

export interface Session {
  id: string;
  type: string;
  advisor: string;
  date: string;
  time: string;
  format: string;
  status: SessionStatus;
  joinUrl: string | null;
}

export interface PastSession {
  id: string;
  type: string;
  date: string;
  outcome: string;
  hasMinutes: boolean;
}

export const upcomingSessions: Session[] = [
  {
    id: "s1",
    type: "Quarterly Portfolio Review",
    advisor: "Jude Addo",
    date: "25 Jun 2026",
    time: "10:00 AM",
    format: "Virtual (Zoom)",
    status: "Confirmed",
    joinUrl: "#",
  },
  {
    id: "s2",
    type: "Estate Planning Session",
    advisor: "Jude Addo",
    date: "14 Jul 2026",
    time: "2:00 PM",
    format: "Mayfair Office, London",
    status: "Tentative",
    joinUrl: null,
  },
];

export const pastSessions: PastSession[] = [
  { id: "h1", type: "Annual Wealth Review",       date: "12 Jan 2026", outcome: "2026 financial plan updated. New CBI goal added.",              hasMinutes: true },
  { id: "h2", type: "Q3 Portfolio Review",         date: "4 Oct 2025",  outcome: "Equities trimmed; fixed income increased by 3%.",               hasMinutes: true },
  { id: "h3", type: "Retirement Planning Session", date: "22 Jul 2025", outcome: "Retirement age confirmed at 60. Drawdown modelled at 4%.",       hasMinutes: true },
  { id: "h4", type: "Offshore Banking Review",     date: "3 Mar 2025",  outcome: "Singapore Standard Chartered account recommended.",              hasMinutes: true },
];

export const sessionTypes = [
  "Annual Wealth Review",
  "Quarterly Portfolio Review",
  "Retirement Planning Session",
  "Tax Planning Session",
  "Estate Planning Session",
  "Investment Strategy Session",
  "Family Wealth Session",
  "Citizenship by Investment Consultation",
  "Offshore Banking Review",
];

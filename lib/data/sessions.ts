// Sessions data: replace with API calls

export type SessionStatus = "Confirmed" | "Tentative" | "Completed" | "Cancelled";
export type AdvisoryDomain = "portfolio" | "legacy" | "tax" | "concierge" | "general";

export interface Session {
  id: string;
  type: string;
  advisor: string;
  date: string;
  time: string;
  format: string;
  status: SessionStatus;
  joinUrl: string | null;
  domain?: AdvisoryDomain;
  purpose?: string;
  expectedOutcome?: string;
  preparationNotes?: string;
  requiresPreparation?: boolean;
}

export interface PastSession {
  id: string;
  type: string;
  date: string;
  outcome: string;
  hasMinutes: boolean;
  domain?: AdvisoryDomain;
  decisions?: string[];
  actionsTriggered?: string[];
  changes?: string[];
  advisorSummary?: string;
}

export interface AdvisoryIntent {
  id: string;
  label: string;
  description: string;
  sessionType: string;
  domain: AdvisoryDomain;
}

export interface SessionsOverview {
  nextSessionDate: string;
  nextSessionType: string;
  upcomingCount: number;
  preparationCount: number;
  lastOutcome: string;
  advisorName: string;
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
    domain: "portfolio",
    purpose: "Review Q2 performance, rebalance recommendations, and fixed income positioning ahead of expected rate cuts.",
    expectedOutcome: "Agree portfolio adjustments and confirm implementation timeline for fixed income increase.",
    preparationNotes: "Review the fixed income rebalance recommendation (+4%). Confirm Q2 statements are uploaded. Note any liquidity needs for H2.",
    requiresPreparation: false,
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
    domain: "legacy",
    purpose: "Align will, trust structures, and beneficiary designations with current estate size and new residency goals.",
    expectedOutcome: "Scope will review with solicitor and confirm education sub-fund structure inside family trust.",
    preparationNotes: "List new assets since 2023 (Dubai property goal, Portugal NHR). Review beneficiary allocations and POA arrangements.",
    requiresPreparation: true,
  },
];

export const pastSessions: PastSession[] = [
  {
    id: "h1",
    type: "Annual Wealth Review",
    date: "12 Jan 2026",
    outcome: "2026 financial plan updated. New CBI goal added.",
    hasMinutes: true,
    domain: "general",
    decisions: ["2026 financial plan approved", "Portugal CBI goal added to wealth plan"],
    actionsTriggered: ["CBI concierge workflow initiated", "Wealth plan sections updated"],
    changes: ["Financial plan refreshed for 2026", "New cross-border residency goal documented"],
    advisorSummary: "Estate and goals have evolved materially. CBI pathway agreed; execution delegated to concierge.",
  },
  {
    id: "h2",
    type: "Q3 Portfolio Review",
    date: "4 Oct 2025",
    outcome: "Equities trimmed; fixed income increased by 3%.",
    hasMinutes: true,
    domain: "portfolio",
    decisions: ["Reduce equity allocation by 3%", "Increase fixed income by 3%"],
    actionsTriggered: ["Rebalance executed within 5 business days"],
    changes: ["Portfolio returned to target allocation after equity drift"],
    advisorSummary: "Strong equity performance caused allocation drift. Rebalance restores risk profile ahead of Q4.",
  },
  {
    id: "h3",
    type: "Retirement Planning Session",
    date: "22 Jul 2025",
    outcome: "Retirement age confirmed at 60. Drawdown modelled at 4%.",
    hasMinutes: true,
    domain: "portfolio",
    decisions: ["Retirement target age set at 60", "4% sustainable drawdown rate adopted"],
    actionsTriggered: ["Retirement cashflow model updated in wealth plan"],
    changes: ["Long-term funding strategy aligned to age-60 retirement"],
    advisorSummary: "Retirement timeline confirmed. Drawdown assumptions stress-tested against current portfolio.",
  },
  {
    id: "h4",
    type: "Offshore Banking Review",
    date: "3 Mar 2025",
    outcome: "Singapore Standard Chartered account recommended.",
    hasMinutes: true,
    domain: "concierge",
    decisions: ["Singapore as primary offshore banking jurisdiction", "Standard Chartered Private as preferred bank"],
    actionsTriggered: ["Concierge offshore banking application opened"],
    changes: ["Offshore banking strategy documented in wealth plan"],
    advisorSummary: "Singapore selected for regulatory stability and currency diversification. Concierge to manage onboarding.",
  },
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

export const advisoryIntents: AdvisoryIntent[] = [
  {
    id: "i1",
    label: "Optimize portfolio performance",
    description: "Review allocation, rebalance opportunities, and market positioning.",
    sessionType: "Quarterly Portfolio Review",
    domain: "portfolio",
  },
  {
    id: "i2",
    label: "Review estate planning",
    description: "Align wills, trusts, and beneficiaries with your current estate.",
    sessionType: "Estate Planning Session",
    domain: "legacy",
  },
  {
    id: "i3",
    label: "Plan liquidity strategy",
    description: "Discuss cash needs, drawdown, and funding for upcoming goals.",
    sessionType: "Investment Strategy Session",
    domain: "portfolio",
  },
  {
    id: "i4",
    label: "Schedule tax review",
    description: "Cross-border tax position, reporting, and planning opportunities.",
    sessionType: "Tax Planning Session",
    domain: "tax",
  },
  {
    id: "i5",
    label: "Annual wealth review",
    description: "Holistic review of goals, portfolio, legacy, and plan progress.",
    sessionType: "Annual Wealth Review",
    domain: "general",
  },
  {
    id: "i6",
    label: "Family wealth planning",
    description: "Intergenerational transfer, education funding, and family governance.",
    sessionType: "Family Wealth Session",
    domain: "legacy",
  },
];

export function getSessionsOverview(): SessionsOverview {
  const next = upcomingSessions[0];
  const preparationCount = upcomingSessions.filter((s) => s.requiresPreparation).length;
  const last = pastSessions[0];

  return {
    nextSessionDate: next ? `${next.date}, ${next.time}` : "None scheduled",
    nextSessionType: next?.type ?? "No upcoming session",
    upcomingCount: upcomingSessions.length,
    preparationCount,
    lastOutcome: last?.advisorSummary ?? last?.outcome ?? "No prior sessions on record",
    advisorName: next?.advisor ?? "Jude Addo",
  };
}

export const DOMAIN_LABEL: Record<AdvisoryDomain, string> = {
  portfolio: "Portfolio",
  legacy: "Legacy",
  tax: "Tax",
  concierge: "Concierge",
  general: "Wealth plan",
};

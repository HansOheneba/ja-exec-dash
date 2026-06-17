// Dashboard overview data: replace with real API calls

export interface AllocationSlice {
  name: string;
  value: number;
  color: string;
}

export interface ClientOverview {
  clientFirstName: string;
  portfolioValueUSD: number;
  aumWithJaUSD: number;
  cashPositionUSD: number;
  ytdPct: number;
  benchmarkYtdPct: number;
  inceptionPct: number;
  inceptionCostBasisUSD: number;
  allocationSlices: AllocationSlice[];
  upcomingSession: {
    type: string;
    advisor: string;
    date: string;
    time: string;
    format: string;
    status: "Confirmed" | "Tentative";
    joinUrl: string | null;
  };
  openActionItems: number;
  latestAdvisorNote: {
    advisor: string;
    date: string;
    preview: string;
  };
  recentDocument: {
    name: string;
    addedDate: string;
    format: string;
    sizeKb: number;
  };
  marketPulse: {
    date: string;
    headline: string;
  };
}

export const clientOverview: ClientOverview = {
  clientFirstName: "Lois",
  portfolioValueUSD: 4_180_000,
  aumWithJaUSD: 3_553_000,
  cashPositionUSD: 627_000,
  ytdPct: 7.2,
  benchmarkYtdPct: 12.4,
  inceptionPct: 18.5,
  inceptionCostBasisUSD: 3_525_000,
  allocationSlices: [
    { name: "Equities",     value: 45, color: "#b2936b" },
    { name: "Fixed Income", value: 22, color: "#202356" },
    { name: "Real Estate",  value: 8,  color: "#829850" },
    { name: "Alternatives", value: 10, color: "#484848" },
    { name: "Cash",         value: 15, color: "#c4b5a0" },
  ],
  upcomingSession: {
    type: "Quarterly Portfolio Review",
    advisor: "Jude Addo",
    date: "25 Jun 2026",
    time: "10:00 AM",
    format: "Virtual (Zoom)",
    status: "Confirmed",
    joinUrl: "#",
  },
  openActionItems: 3,
  latestAdvisorNote: {
    advisor: "Jude Addo",
    date: "10 Jun 2026",
    preview:
      "Your Q2 portfolio is broadly on track. The fixed income position has held well against rate volatility. I recommend we discuss increasing duration slightly ahead of expected Fed cuts in H2.",
  },
  recentDocument: {
    name: "Q1 2026 Portfolio Statement",
    addedDate: "1 Apr 2026",
    format: "PDF",
    sizeKb: 840,
  },
  marketPulse: {
    date: "16 Jun 2026",
    headline:
      "US Federal Reserve signals two rate cuts in H2 2026. Our house view is that this strengthens the case for duration in fixed income and selective re-entry into emerging market bonds.",
  },
};

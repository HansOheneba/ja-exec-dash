// Advisor insights data: replace with API calls

export type RecommendationStatus = "pending-acknowledgement" | "implemented" | "declined";
export type NoteType = "Market commentary" | "Portfolio review" | "Strategy update";

export interface PortfolioImpact {
  benefits: string[];
  projectedRisk: "Lower" | "Neutral" | "Higher";
  projectedReturn: "Lower" | "Neutral" | "Higher";
  timeHorizon: string;
}

export interface AdvisorNote {
  id: string;
  date: string;
  advisor: string;
  subject: string;
  body: string;
  type: NoteType;
  featured?: boolean;
}

export interface Recommendation {
  id: string;
  date: string;
  title: string;
  rationale: string;
  status: RecommendationStatus;
  featured?: boolean;
  impact?: PortfolioImpact;
}

export interface AdvisorActivity {
  id: string;
  date: string;
  label: string;
  category: "review" | "commentary" | "recommendation" | "planning";
}

export interface AdvisorRelationship {
  name: string;
  title: string;
  email: string;
  nextMeetingDate: string;
  nextMeetingType: string;
}

export interface InsightsSummary {
  pendingCount: number;
  implementedCount: number;
  declinedCount: number;
  portfolioUpdateCount: number;
  nextReviewDate: string;
  completionRatePct: number;
}

export const advisorRelationship: AdvisorRelationship = {
  name: "Jude Addo",
  title: "Senior Wealth Advisor",
  email: "jude.addo@jawealth.co",
  nextMeetingDate: "15 Jul 2026",
  nextMeetingType: "Quarterly Portfolio Review",
};

export const insightsSummary: InsightsSummary = {
  pendingCount: 2,
  implementedCount: 7,
  declinedCount: 1,
  portfolioUpdateCount: 1,
  nextReviewDate: "15 Jul 2026",
  completionRatePct: 78,
};

export const advisorNotes: AdvisorNote[] = [
  {
    id: "n1",
    date: "16 Jun 2026",
    advisor: "Jude Addo",
    subject: "H2 2026 Market Positioning",
    body: "US equities remain resilient despite rate uncertainty. The Federal Reserve's signal of two cuts in H2 strengthens the case for adding duration in fixed income. I recommend we discuss adjusting your bond allocation from 22% to 26% at the June session, funded by trimming the commodities position.",
    type: "Market commentary",
    featured: true,
  },
  {
    id: "n2",
    date: "10 Jun 2026",
    advisor: "Jude Addo",
    subject: "Q2 Portfolio Review",
    body: "Your Q2 portfolio is broadly on track. Equities have performed well, particularly US large-cap. Commodities drifted up due to gold. The cash position remains slightly high relative to strategy. We should deploy $150k into fixed income before quarter-end.",
    type: "Portfolio review",
  },
  {
    id: "n3",
    date: "28 Apr 2026",
    advisor: "Jude Addo",
    subject: "Portugal NHR Update",
    body: "Due diligence stage is complete. The next milestone is formal document submission to Portuguese immigration, which we are targeting for early July. I recommend no additional capital moves until the application is filed.",
    type: "Strategy update",
  },
];

export const recommendations: Recommendation[] = [
  {
    id: "r1",
    date: "15 Jun 2026",
    title: "Increase international equity exposure by 5%",
    rationale:
      "Your portfolio is concentrated in US and UK large-cap equities. Adding 5% to international developed and emerging market equities would improve diversification ahead of expected Fed rate cuts.",
    status: "pending-acknowledgement",
    featured: true,
    impact: {
      benefits: [
        "Improved diversification",
        "Reduce home market concentration",
        "Long-term growth exposure",
      ],
      projectedRisk: "Lower",
      projectedReturn: "Neutral",
      timeHorizon: "5+ years",
    },
  },
  {
    id: "r2",
    date: "10 Jun 2026",
    title: "Increase fixed income allocation from 22% to 26%",
    rationale:
      "Position ahead of expected Fed rate cuts. Duration extension improves yield without significant credit risk.",
    status: "pending-acknowledgement",
    impact: {
      benefits: [
        "Higher income yield",
        "Reduced portfolio volatility",
        "Duration benefit from rate cuts",
      ],
      projectedRisk: "Lower",
      projectedReturn: "Neutral",
      timeHorizon: "2 to 3 years",
    },
  },
  {
    id: "r3",
    date: "5 Feb 2026",
    title: "Rebalance: trim equities by 3%, add to fixed income",
    rationale:
      "Equities had drifted to 48% after strong performance. Rebalanced back to 45% target allocation.",
    status: "implemented",
    impact: {
      benefits: ["Restored target allocation", "Reduced equity concentration"],
      projectedRisk: "Lower",
      projectedReturn: "Neutral",
      timeHorizon: "Ongoing",
    },
  },
  {
    id: "r4",
    date: "12 Jan 2026",
    title: "Ring-fence $150k for education sub-account",
    rationale: "Children's education goal is at risk. Dedicated sub-account improves tracking and funding discipline.",
    status: "implemented",
  },
  {
    id: "r5",
    date: "8 Nov 2025",
    title: "Increase gold ETC allocation within commodities sleeve",
    rationale: "Inflation hedge and portfolio diversifier. Executed within existing 18% commodities target.",
    status: "implemented",
  },
  {
    id: "r6",
    date: "20 Sep 2025",
    title: "Deploy excess cash into short-duration gilts",
    rationale: "$150k cash above strategy buffer. Moved to 2-year UK gilts for improved yield.",
    status: "implemented",
  },
  {
    id: "r7",
    date: "3 Jul 2025",
    title: "Add ESG-screened global equity ETF",
    rationale: "Align core equity sleeve with stated preferences. 2% allocation from existing US equity position.",
    status: "implemented",
  },
  {
    id: "r8",
    date: "14 May 2025",
    title: "Review and update beneficiary designations",
    rationale: "Annual legacy review. Beneficiary schedule confirmed and documented in trust records.",
    status: "implemented",
  },
  {
    id: "r9",
    date: "2 Mar 2025",
    title: "Consolidate UK cash accounts for operational efficiency",
    rationale: "Reduced fragmentation across three UK accounts. Simplified reporting and fee structure.",
    status: "implemented",
  },
  {
    id: "r10",
    date: "15 Nov 2025",
    title: "Add exposure to Africa-focused private equity fund",
    rationale:
      "House view: African private equity offers 15-18% target return with uncorrelated risk. Minimum $250k.",
    status: "declined",
  },
];

export const advisorActivity: AdvisorActivity[] = [
  { id: "a1", date: "12 Jun 2026", label: "Portfolio review completed", category: "review" },
  { id: "a2", date: "15 Jun 2026", label: "International equity recommendation shared", category: "recommendation" },
  { id: "a3", date: "5 Jun 2026", label: "Market update shared", category: "commentary" },
  { id: "a4", date: "28 May 2026", label: "Tax planning note added", category: "planning" },
  { id: "a5", date: "10 Jun 2026", label: "Q2 portfolio review note published", category: "review" },
  { id: "a6", date: "28 Apr 2026", label: "Portugal NHR strategy update", category: "planning" },
];

export function getInsightsSummaryFromData(): InsightsSummary {
  const pending = recommendations.filter((r) => r.status === "pending-acknowledgement").length;
  const implemented = recommendations.filter((r) => r.status === "implemented").length;
  const declined = recommendations.filter((r) => r.status === "declined").length;

  return {
    ...insightsSummary,
    pendingCount: pending,
    implementedCount: implemented,
    declinedCount: declined,
  };
}

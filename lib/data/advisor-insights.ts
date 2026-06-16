// Advisor insights data: replace with API calls

export type RecommendationStatus = "pending-acknowledgement" | "implemented" | "declined";
export type NoteType = "Market commentary" | "Portfolio review" | "Strategy update";

export interface AdvisorNote {
  id: string;
  date: string;
  advisor: string;
  subject: string;
  body: string;
  type: NoteType;
}

export interface Recommendation {
  id: string;
  date: string;
  title: string;
  rationale: string;
  status: RecommendationStatus;
}

export const advisorNotes: AdvisorNote[] = [
  {
    id: "n1",
    date: "16 Jun 2026",
    advisor: "Jude Addo",
    subject: "H2 2026 Positioning",
    body: "The Federal Reserve's signal of two rate cuts in H2 strengthens the case for adding duration in fixed income. I recommend we discuss adjusting your bond allocation from 22% to 26% at the June session, funded by trimming the commodities position.",
    type: "Market commentary",
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
    date: "10 Jun 2026",
    title: "Increase fixed income allocation from 22% to 26%",
    rationale: "Position ahead of expected Fed rate cuts. Duration extension improves yield without significant credit risk.",
    status: "pending-acknowledgement",
  },
  {
    id: "r2",
    date: "5 Feb 2026",
    title: "Rebalance: trim equities by 3%, add to fixed income",
    rationale: "Equities had drifted to 48% after strong performance. Rebalanced back to 45% target allocation.",
    status: "implemented",
  },
  {
    id: "r3",
    date: "15 Nov 2025",
    title: "Add exposure to Africa-focused private equity fund",
    rationale: "JA Wealth house view: African PE offers 15-18% target return with uncorrelated risk. Minimum $250k.",
    status: "declined",
  },
];

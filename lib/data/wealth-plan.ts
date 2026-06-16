// Wealth plan data: replace with API calls

export type PlanSectionStatus = "Current" | "In progress" | "Review recommended";

export interface PlanSection {
  id: string;
  iconName: string;
  title: string;
  updatedDate: string;
  description: string;
  version: string;
  status: PlanSectionStatus;
}

export interface CbiStage {
  label: string;
  completed: boolean;
}

export interface WealthPlan {
  currentVersion: string;
  lastUpdated: string;
  preparedBy: string;
  pageCount: number;
  description: string;
  versions: { label: string; date: string }[];
  cbi: {
    program: string;
    stageIndex: number;
    stages: string[];
    updatedDate: string;
    progressPct: number;
  };
  sections: PlanSection[];
}

export const wealthPlan: WealthPlan = {
  currentVersion: "3.2",
  lastUpdated: "12 Apr 2026",
  preparedBy: "Jude Addo",
  pageCount: 84,
  description:
    "Your financial plan covers retirement planning, estate structuring, offshore banking, citizenship strategy, and tax planning across three jurisdictions. Revised April 2026 following annual review.",
  versions: [
    { label: "v3.1", date: "Jan 2026" },
    { label: "v3.0", date: "Oct 2025" },
    { label: "v2.4", date: "Jul 2025" },
    { label: "v2.3", date: "Apr 2025" },
  ],
  cbi: {
    program: "Portugal NHR",
    stageIndex: 2,
    stages: ["Initial inquiry","Eligibility check","Due diligence","Investment","Approval"],
    updatedDate: "10 Jun 2026",
    progressPct: 60,
  },
  sections: [
    {
      id: "strategy",
      iconName: "Wallet",
      title: "Wealth Strategy Summary",
      updatedDate: "12 Apr 2026",
      description:
        "Your strategy is built around capital preservation and long-term growth across multiple jurisdictions, with a primary allocation to global equities and diversified fixed income. JA Wealth manages your portfolio against a custom blended benchmark.",
      version: "v3.2",
      status: "Current",
    },
    {
      id: "retirement",
      iconName: "Clock",
      title: "Retirement Analysis",
      updatedDate: "1 Mar 2026",
      description:
        "Projected retirement at age 60 (2038). Monte Carlo simulations indicate an 84% probability of sustaining your target drawdown of $18,000/month at a 4% withdrawal rate.",
      version: "v2.1",
      status: "Current",
    },
    {
      id: "estate",
      iconName: "FileText",
      title: "Estate Planning Summary",
      updatedDate: "15 Jan 2026",
      description:
        "The Lois Lane Family Trust is established. Beneficiaries confirmed. Review of succession schedule recommended before Q3 2026.",
      version: "v1.4",
      status: "Review recommended",
    },
    {
      id: "cashflow",
      iconName: "ArrowRight",
      title: "Cash Flow Analysis",
      updatedDate: "1 Apr 2026",
      description:
        "Monthly income exceeds expenditure by $4,200 after contributions. Investment contributions represent 22% of net income. Stress-tested to sustain 18 months without additional income.",
      version: "v2.3",
      status: "Current",
    },
    {
      id: "tax",
      iconName: "Globe",
      title: "Tax Planning Summary",
      updatedDate: "28 Feb 2026",
      description:
        "Cross-jurisdictional tax position spans UK, Ghana, and UAE. NHR Portugal application in progress. Annual tax mitigation estimated at $38,000.",
      version: "v1.9",
      status: "Current",
    },
    {
      id: "offshore",
      iconName: "Building",
      title: "Offshore Banking Strategy",
      updatedDate: "5 Nov 2025",
      description:
        "Holdings distributed across Barclays Private (UK), Standard Chartered (Singapore), and CAL Bank (Ghana). Strategy note details rationale for jurisdiction selection and repatriation timeline.",
      version: "v1.1",
      status: "Current",
    },
    {
      id: "protection",
      iconName: "Shield",
      title: "Family Protection Coverage",
      updatedDate: "22 Mar 2026",
      description:
        "Life cover: $2.4m (Prudential). Critical illness: $500k. Total and permanent disability: $1.2m. Beneficiary: Spouse. Review recommended for top-up.",
      version: "v2.0",
      status: "Review recommended",
    },
    {
      id: "cbi",
      iconName: "Globe",
      title: "Citizenship by Investment Status",
      updatedDate: "10 Jun 2026",
      description:
        "Portugal NHR application in progress. Stage: Due diligence completed. Documents submitted to Portuguese immigration authorities. Estimated completion: Q1 2027.",
      version: "Active",
      status: "In progress",
    },
  ],
};

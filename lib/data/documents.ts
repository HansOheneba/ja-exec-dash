// Documents data: replace with API calls

export type DocStatus = "new" | "requires-signature" | "viewed" | "signed";

export interface Doc {
  id: string;
  name: string;
  date: string;
  sizeKb: number;
  status: DocStatus;
}

export interface DocSection {
  id: string;
  title: string;
  description: string;
  iconName: string;
  docs: Doc[];
}

export const docSections: DocSection[] = [
  {
    id: "reports",
    title: "Reports",
    description: "Quarterly and annual portfolio statements",
    iconName: "FileText",
    docs: [
      { id: "d1", name: "Q1 2026 Portfolio Statement",  date: "1 Apr 2026",  sizeKb: 840,  status: "new"    },
      { id: "d2", name: "Q4 2025 Annual Report",         date: "15 Jan 2026", sizeKb: 2100, status: "viewed" },
      { id: "d3", name: "Q3 2025 Portfolio Statement",   date: "1 Oct 2025",  sizeKb: 820,  status: "viewed" },
      { id: "d4", name: "Q2 2025 Performance Report",    date: "1 Jul 2025",  sizeKb: 910,  status: "viewed" },
    ],
  },
  {
    id: "financial-models",
    title: "Financial Models",
    description: "Retirement, cash flow, and scenario projections",
    iconName: "FileText",
    docs: [
      { id: "d5", name: "Retirement Model v2.1",          date: "5 Mar 2026",  sizeKb: 1400, status: "viewed" },
      { id: "d6", name: "Cash Flow Analysis 2026",         date: "10 Feb 2026", sizeKb: 680,  status: "viewed" },
      { id: "d7", name: "Monte Carlo Simulation Q1 2026",  date: "20 Mar 2026", sizeKb: 2800, status: "new"    },
      { id: "d8", name: "Wealth Forecast 10Y",             date: "12 Apr 2026", sizeKb: 1100, status: "viewed" },
    ],
  },
  {
    id: "meeting-deliverables",
    title: "Meeting Deliverables",
    description: "Minutes, action plans, and advisor recommendations",
    iconName: "FileCheck",
    docs: [
      { id: "d9",  name: "Q1 2026 Review: Meeting Minutes",     date: "18 Mar 2026", sizeKb: 420, status: "requires-signature" },
      { id: "d10", name: "Feb 2026 Rebalancing Recommendation", date: "5 Feb 2026",  sizeKb: 380, status: "signed"             },
      { id: "d11", name: "Q4 2025 Annual Review Action Plan",   date: "12 Jan 2026", sizeKb: 290, status: "signed"             },
      { id: "d12", name: "Strategy Update Note Nov 2025",       date: "2 Nov 2025",  sizeKb: 210, status: "viewed"             },
    ],
  },
  {
    id: "legal",
    title: "Legal and Compliance",
    description: "KYC, mandates, and compliance documents",
    iconName: "FileCheck",
    docs: [
      { id: "d13", name: "Investment Management Agreement", date: "4 Jan 2024",  sizeKb: 1800, status: "signed"             },
      { id: "d14", name: "KYC Renewal 2026",                date: "1 Feb 2026",  sizeKb: 350,  status: "requires-signature" },
      { id: "d15", name: "Risk Assessment Jan 2026",         date: "10 Jan 2026", sizeKb: 290,  status: "signed"             },
      { id: "d16", name: "Portugal CBI Application Pack",   date: "20 May 2026", sizeKb: 4200, status: "new"                },
    ],
  },
];

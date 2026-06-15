const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];

type PortfolioAsset = {
  name: string;
  value: number;
  allocation: number;
  ytd: string;
  color: string;
};

type ActivityItem = {
  title: string;
  date: string;
  type: "document" | "review" | "request" | "meeting" | "note";
};

type AdvisorClient = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  location: string;
  status: "Active" | "Review due" | "Onboarding";
  flags: string[];
  lastContact: string;
  onboardedDate: string;
  portfolio: {
    total: number;
    ytd: number;
    inceptionValue: number;
    assets: PortfolioAsset[];
    history: { month: string; value: number }[];
  };
  legacyProgress: number;
  legacyStatus: string;
  pendingRequests: number;
  openTasks: number;
  recentActivity: ActivityItem[];
  notes: string;
};

const clients: AdvisorClient[] = [
  {
    id: "lois-lane",
    name: "Lois Lane",
    initials: "LL",
    email: "lois.lane@email.com",
    phone: "+44 7700 900123",
    location: "London, UK",
    status: "Active",
    flags: ["Pending request"],
    lastContact: "3 days ago",
    onboardedDate: "Mar 2021",
    portfolio: {
      total: 3318930,
      ytd: 7.2,
      inceptionValue: 2800000,
      assets: [
        { name: "JA Wealth", value: 1240000, allocation: 37, ytd: "+18.1%", color: "#b2936b" },
        { name: "JA Realty", value: 826000, allocation: 25, ytd: "+14.7%", color: "#202356" },
        { name: "JA Digital", value: 531000, allocation: 16, ytd: "+39.7%", color: "#829850" },
        { name: "JA Capital", value: 352000, allocation: 11, ytd: "-9.7%", color: "#484848" },
        { name: "Cash & Equivalents", value: 369930, allocation: 11, ytd: "+3.1%", color: "#c4b5a0" },
      ],
      history: [2820000, 2890000, 2950000, 3010000, 2980000, 3050000, 3100000, 3160000, 3200000, 3240000, 3290000, 3318930].map((v, i) => ({ month: months[i], value: v })),
    },
    legacyProgress: 60,
    legacyStatus: "Estate plan review in progress",
    pendingRequests: 2,
    openTasks: 3,
    recentActivity: [
      { title: "Succession planning review requested", date: "12 Jun 2026", type: "request" },
      { title: "Quarterly portfolio review completed", date: "3 Jun 2026", type: "review" },
      { title: "Document uploaded: Trust deed amendment", date: "25 May 2026", type: "document" },
      { title: "Advisor meeting: estate planning session", date: "10 May 2026", type: "meeting" },
      { title: "Offshore banking enquiry submitted", date: "2 May 2026", type: "request" },
    ],
    notes: "Lois is focused on long-term legacy planning and succession for her estate. Prefers email communication. Has expressed interest in expanding JA Digital exposure subject to risk review.",
  },
  {
    id: "marcus-webb",
    name: "Marcus Webb",
    initials: "MW",
    email: "m.webb@webbgroup.com",
    phone: "+44 7700 900456",
    location: "Manchester, UK",
    status: "Active",
    flags: [],
    lastContact: "Yesterday",
    onboardedDate: "Jan 2019",
    portfolio: {
      total: 8140200,
      ytd: 5.4,
      inceptionValue: 6200000,
      assets: [
        { name: "JA Wealth", value: 3200000, allocation: 39, ytd: "+11.2%", color: "#b2936b" },
        { name: "JA Realty", value: 2600000, allocation: 32, ytd: "+8.4%", color: "#202356" },
        { name: "JA Capital", value: 1540000, allocation: 19, ytd: "+3.2%", color: "#484848" },
        { name: "Cash & Equivalents", value: 800200, allocation: 10, ytd: "+3.1%", color: "#c4b5a0" },
      ],
      history: [6200000, 6410000, 6580000, 6720000, 6850000, 7000000, 7150000, 7380000, 7520000, 7740000, 7940000, 8140200].map((v, i) => ({ month: months[i], value: v })),
    },
    legacyProgress: 85,
    legacyStatus: "Succession plan finalised",
    pendingRequests: 0,
    openTasks: 1,
    recentActivity: [
      { title: "Q1 2026 statement uploaded", date: "10 Jun 2026", type: "document" },
      { title: "Annual review completed", date: "28 Apr 2026", type: "review" },
      { title: "JA Realty acquisition briefing", date: "15 Mar 2026", type: "meeting" },
      { title: "Succession plan signed off", date: "20 Feb 2026", type: "document" },
    ],
    notes: "Marcus is one of our longest-standing clients. Very hands-on with property acquisitions. Prefers in-person meetings and monthly status calls. Looking to consolidate JA Capital position.",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    initials: "PN",
    email: "priya.nair@nairventures.co.uk",
    phone: "+44 7700 900789",
    location: "Birmingham, UK",
    status: "Active",
    flags: [],
    lastContact: "1 week ago",
    onboardedDate: "Sep 2022",
    portfolio: {
      total: 5620000,
      ytd: 9.1,
      inceptionValue: 4400000,
      assets: [
        { name: "JA Wealth", value: 2100000, allocation: 37, ytd: "+15.3%", color: "#b2936b" },
        { name: "JA Digital", value: 1480000, allocation: 26, ytd: "+42.1%", color: "#829850" },
        { name: "JA Realty", value: 1200000, allocation: 21, ytd: "+9.2%", color: "#202356" },
        { name: "JA Capital", value: 840000, allocation: 15, ytd: "-2.1%", color: "#484848" },
      ],
      history: [4400000, 4520000, 4610000, 4750000, 4880000, 4960000, 5050000, 5180000, 5290000, 5380000, 5510000, 5620000].map((v, i) => ({ month: months[i], value: v })),
    },
    legacyProgress: 40,
    legacyStatus: "Will review complete, trust structure pending",
    pendingRequests: 1,
    openTasks: 2,
    recentActivity: [
      { title: "Estate plan: will review marked complete", date: "8 Jun 2026", type: "review" },
      { title: "JA Digital position increased", date: "20 May 2026", type: "note" },
      { title: "Trust structure review initiated", date: "5 May 2026", type: "document" },
      { title: "Mid-year portfolio review", date: "14 Apr 2026", type: "review" },
    ],
    notes: "Priya has a strong appetite for digital assets and has doubled her JA Digital allocation this year. Key focus now is setting up a family trust. Prefers brief written updates over calls.",
  },
  {
    id: "daniel-osei",
    name: "Daniel Osei",
    initials: "DO",
    email: "d.osei@osei-holdings.com",
    phone: "+44 7700 900321",
    location: "Leeds, UK",
    status: "Review due",
    flags: ["Overdue review"],
    lastContact: "3 weeks ago",
    onboardedDate: "Jun 2020",
    portfolio: {
      total: 2440000,
      ytd: -1.8,
      inceptionValue: 2600000,
      assets: [
        { name: "JA Wealth", value: 980000, allocation: 40, ytd: "-3.2%", color: "#b2936b" },
        { name: "JA Capital", value: 820000, allocation: 34, ytd: "-8.1%", color: "#484848" },
        { name: "JA Realty", value: 440000, allocation: 18, ytd: "+6.4%", color: "#202356" },
        { name: "Cash & Equivalents", value: 200000, allocation: 8, ytd: "+3.1%", color: "#c4b5a0" },
      ],
      history: [2600000, 2580000, 2560000, 2520000, 2490000, 2510000, 2480000, 2460000, 2450000, 2440000, 2455000, 2440000].map((v, i) => ({ month: months[i], value: v })),
    },
    legacyProgress: 20,
    legacyStatus: "No active estate plan",
    pendingRequests: 0,
    openTasks: 4,
    recentActivity: [
      { title: "Quarterly check-in missed (rescheduled to 22 Jun)", date: "1 Jun 2026", type: "meeting" },
      { title: "Portfolio performance flagged for review", date: "15 May 2026", type: "note" },
      { title: "Annual review due (overdue)", date: "30 Apr 2026", type: "review" },
      { title: "JA Capital position declined 8% YTD", date: "14 Apr 2026", type: "note" },
    ],
    notes: "Daniel has been difficult to reach over the past month. His JA Capital and Wealth positions are underperforming. Urgent to schedule a review and discuss rebalancing strategy. Consider reducing high-risk exposure.",
  },
  {
    id: "amara-diallo",
    name: "Amara Diallo",
    initials: "AD",
    email: "amara@diallogroup.africa",
    phone: "+44 7700 900654",
    location: "London, UK",
    status: "Active",
    flags: [],
    lastContact: "2 days ago",
    onboardedDate: "Nov 2018",
    portfolio: {
      total: 11200000,
      ytd: 6.8,
      inceptionValue: 8500000,
      assets: [
        { name: "JA Wealth", value: 4400000, allocation: 39, ytd: "+9.4%", color: "#b2936b" },
        { name: "JA Realty", value: 3200000, allocation: 29, ytd: "+5.1%", color: "#202356" },
        { name: "JA Capital", value: 2100000, allocation: 19, ytd: "+2.8%", color: "#484848" },
        { name: "JA Digital", value: 900000, allocation: 8, ytd: "+38.5%", color: "#829850" },
        { name: "Cash & Equivalents", value: 600000, allocation: 5, ytd: "+3.1%", color: "#c4b5a0" },
      ],
      history: [8500000, 8800000, 9050000, 9280000, 9500000, 9700000, 9950000, 10200000, 10450000, 10700000, 10960000, 11200000].map((v, i) => ({ month: months[i], value: v })),
    },
    legacyProgress: 90,
    legacyStatus: "Succession plan and trusts fully established",
    pendingRequests: 0,
    openTasks: 1,
    recentActivity: [
      { title: "Bi-monthly advisory call completed", date: "13 Jun 2026", type: "meeting" },
      { title: "JA Realty new acquisition: Bristol property", date: "28 May 2026", type: "note" },
      { title: "Succession briefing with family completed", date: "10 Apr 2026", type: "meeting" },
      { title: "Annual review: all targets met", date: "15 Jan 2026", type: "review" },
    ],
    notes: "Amara is our highest-value client and has a very clear long-term strategy. Bi-monthly advisory calls are standard. She is exploring expansion into African real estate markets via a new JA Realty vehicle.",
  },
  {
    id: "theo-baxter",
    name: "Theo Baxter",
    initials: "TB",
    email: "theo.baxter@tbaxter.co.uk",
    phone: "+44 7700 900987",
    location: "Edinburgh, UK",
    status: "Onboarding",
    flags: ["Onboarding"],
    lastContact: "Today",
    onboardedDate: "Jun 2026",
    portfolio: {
      total: 1890000,
      ytd: 0,
      inceptionValue: 1890000,
      assets: [
        { name: "JA Wealth", value: 900000, allocation: 48, ytd: "0%", color: "#b2936b" },
        { name: "JA Realty", value: 600000, allocation: 32, ytd: "0%", color: "#202356" },
        { name: "Cash & Equivalents", value: 390000, allocation: 20, ytd: "0%", color: "#c4b5a0" },
      ],
      history: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1890000].map((v, i) => ({ month: months[i], value: v })),
    },
    legacyProgress: 0,
    legacyStatus: "Not started",
    pendingRequests: 0,
    openTasks: 5,
    recentActivity: [
      { title: "Onboarding call completed", date: "15 Jun 2026", type: "meeting" },
      { title: "KYC documents submitted", date: "12 Jun 2026", type: "document" },
      { title: "Initial portfolio allocation agreed", date: "10 Jun 2026", type: "note" },
      { title: "Welcome pack sent", date: "8 Jun 2026", type: "document" },
    ],
    notes: "Theo is a new client referred by Marcus Webb. He is a tech entrepreneur looking to diversify into managed wealth and property. Initial focus is JA Wealth and JA Realty. Still completing onboarding documentation.",
  },
];

function getClientById(id: string): AdvisorClient | undefined {
  return clients.find((c) => c.id === id);
}

export { clients, getClientById, type AdvisorClient, type ActivityItem };

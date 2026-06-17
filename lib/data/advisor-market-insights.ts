type InsightCategory =
  | "Macro"
  | "Equities"
  | "Property"
  | "Digital Assets"
  | "Fixed Income"
  | "General";

type InsightStatus = "published" | "draft";

type MarketInsight = {
  id: string;
  title: string;
  category: InsightCategory;
  summary: string;
  body: string;
  publishedAt?: string;
  status: InsightStatus;
  author: string;
  targetAudience: "all" | "select";
};

const advisorMarketInsights: MarketInsight[] = [
  {
    id: "i1",
    title: "UK Interest Rate Outlook: Second Half 2026",
    category: "Macro",
    summary:
      "The Bank of England held rates steady at 4.25% in June. Two cuts are expected by year-end as inflation approaches the 2% target.",
    body: "The Monetary Policy Committee voted 7-2 to hold the base rate at 4.25% at its June 2026 meeting. With CPI at 2.3% and core services inflation softening, the majority view is that conditions are approaching a point where easing can begin. Markets are pricing in two 25bp cuts before year-end, with the first likely in August. For clients with significant fixed income exposure, this is a constructive environment: short-duration bonds should be held or extended gradually as the rate cut cycle begins. Property-linked assets may also benefit as mortgage rates ease, though the lag is typically 6-9 months.",
    publishedAt: "10 Jun 2026",
    status: "published",
    author: "Jude Addo",
    targetAudience: "all",
  },
  {
    id: "i2",
    title: "Digital Assets: Q2 2026 Performance Review",
    category: "Digital Assets",
    summary:
      "Client digital asset allocations returned +39.7% YTD, driven by a broad recovery in tokenised assets. Volatility remains elevated; position sizing remains key.",
    body: "Digital asset allocations delivered exceptional performance in the first half of 2026, returning +39.7% year-to-date as of June. The primary drivers have been the recovery in tokenised real-world assets and growing institutional adoption of on-chain fixed income instruments. However, clients should note that the asset class remains significantly more volatile than traditional portfolios. Our allocation recommendation remains a maximum of 15-20% of total investable assets for clients with an aggressive or growth-oriented risk profile. For those approaching a liquidity event or with wealth transfer objectives, we recommend keeping digital exposure below 10%.",
    publishedAt: "5 Jun 2026",
    status: "published",
    author: "Jude Addo",
    targetAudience: "select",
  },
  {
    id: "i3",
    title: "Real Estate: Bristol Commercial Acquisition Briefing",
    category: "Property",
    summary:
      "We have identified a prime commercial property in central Bristol offering an estimated 6.8% gross yield.",
    body: "We are evaluating the acquisition of a mixed-use commercial property in the Temple Quarter regeneration zone, Bristol. The property offers approximately 18,000 sq ft of grade-A office and retail space, with a weighted average unexpired lease term (WAULT) of 7.2 years. The estimated gross yield is 6.8% based on current contracted rents, with upside potential from a rental reversion on two units currently let below market rate. We expect to complete due diligence and present a formal investment proposition to eligible clients by end of June 2026.",
    publishedAt: "28 May 2026",
    status: "published",
    author: "Jude Addo",
    targetAudience: "select",
  },
  {
    id: "i4",
    title: "Mid-Year Portfolio Strategy: Rebalancing Considerations",
    category: "General",
    summary:
      "As we enter Q3, clients with overweight equity or digital positions should consider partial rebalancing into fixed income and real estate.",
    body: "With strong equity and digital asset performance in the first half of 2026, several portfolios are now meaningfully overweight in their growth allocations relative to their agreed risk profiles. For clients who had target allocations set in 2025, we recommend a strategic review to consider partial profit-taking in equities and digital assets, with redeployment into real estate or a short-duration fixed income sleeve. This is not a defensive move, but a prudent rebalancing to ensure portfolios remain aligned with clients' long-term objectives and risk tolerance. We will discuss this at each client's next review session.",
    publishedAt: "1 Jun 2026",
    status: "published",
    author: "Jude Addo",
    targetAudience: "all",
  },
  {
    id: "i5",
    title: "African Real Estate: New Fund Vehicle in Lagos and Accra",
    category: "Property",
    summary:
      "We are exploring a new property fund targeting commercial and residential assets in Lagos and Accra.",
    body: "Draft briefing in preparation. We are conducting feasibility analysis for a new fund vehicle targeting prime commercial and residential assets in Lagos, Nigeria and Accra, Ghana. Preliminary modelling indicates gross yields in the 8-11% range, with significant capital appreciation potential in both markets over a 5-7 year horizon. Currency risk (NGN, GHS) will be managed via hedging arrangements. This vehicle will be suitable for clients with a long-term horizon, emerging market exposure appetite, and a minimum commitment of £500,000. Formal IM expected Q3 2026.",
    status: "draft",
    author: "Jude Addo",
    targetAudience: "select",
  },
  {
    id: "i6",
    title: "Fixed Income: Navigating the Cut Cycle",
    category: "Fixed Income",
    summary: "Draft note on positioning for the anticipated rate cut cycle in H2 2026.",
    body: "As the Bank of England begins its easing cycle, duration extension in fixed income portfolios becomes increasingly attractive. Gilts and investment-grade corporate bonds with maturities of 3-7 years offer a compelling risk-adjusted return profile given current valuations. We are reviewing fixed income sleeves across client portfolios and will propose rebalancing where appropriate.",
    status: "draft",
    author: "Jude Addo",
    targetAudience: "all",
  },
];

export {
  advisorMarketInsights,
  type MarketInsight,
  type InsightCategory,
  type InsightStatus,
};

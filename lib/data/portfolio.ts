// Portfolio data: all monetary values in USD. Replace with API calls

export interface Holding {
  ticker: string;
  name: string;
  qty: string;
  price: string;
  valueUSD: number;
  dayChangePct: number;
  totalReturnPct: number;
}

export interface MonthlyPoint {
  month: string;
  value: number;
}

export interface AssetClass {
  id: string;
  label: string;
  color: string;
  gradientId: string;
  totalUSD: number;
  allocationPct: number;
  ytdPct: number;
  history: MonthlyPoint[];
  holdings: Holding[];
}

const MONTHS = ["Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun"];

export const assetClasses: AssetClass[] = [
  {
    id: "equities",
    label: "Equities",
    color: "#b2936b",
    gradientId: "pf-eq",
    totalUSD: 1_879_000,
    allocationPct: 45,
    ytdPct: 12.4,
    history: [1_500_000,1_548_000,1_590_000,1_635_000,1_601_000,1_670_000,1_720_000,1_770_000,1_806_000,1_833_000,1_858_000,1_879_000].map((v,i)=>({month:MONTHS[i],value:v})),
    holdings: [
      { ticker:"AAPL",  name:"Apple Inc",        qty:"2,100 shs",  price:"$206.80", valueUSD:432_000, dayChangePct:1.2,  totalReturnPct:34.2  },
      { ticker:"MSFT",  name:"Microsoft",         qty:"800 shs",    price:"$449.60", valueUSD:360_500, dayChangePct:0.4,  totalReturnPct:28.7  },
      { ticker:"SHEL",  name:"Shell plc",         qty:"12,200 shs", price:"$32.20",  valueUSD:392_900, dayChangePct:-0.8, totalReturnPct:12.4  },
      { ticker:"HSBA",  name:"HSBC Holdings",     qty:"28,800 shs", price:"$10.90",  valueUSD:314_200, dayChangePct:0.2,  totalReturnPct:8.1   },
      { ticker:"ULVR",  name:"Unilever",           qty:"4,300 shs",  price:"$53.60",  valueUSD:230_500, dayChangePct:-0.3, totalReturnPct:4.2   },
      { ticker:"BP.",   name:"BP plc",             qty:"29,300 shs", price:"$6.15",   valueUSD:148_900, dayChangePct:-1.1, totalReturnPct:-8.4  },
    ],
  },
  {
    id: "fixed-income",
    label: "Fixed Income",
    color: "#202356",
    gradientId: "pf-fi",
    totalUSD: 923_000,
    allocationPct: 22,
    ytdPct: 3.8,
    history: [873_000,877_000,882_000,888_000,891_000,896_000,901_000,906_000,912_000,917_000,920_000,923_000].map((v,i)=>({month:MONTHS[i],value:v})),
    holdings: [
      { ticker:"UKG31", name:"UK Gilts 2031",      qty:"$354k nominal", price:"4.2% yield", valueUSD:354_200, dayChangePct:0.1,  totalReturnPct:3.8  },
      { ticker:"UST28", name:"US Treasury 2028",   qty:"$234k nominal", price:"4.8% yield", valueUSD:234_000, dayChangePct:-0.1, totalReturnPct:2.1  },
      { ticker:"IGCB",  name:"IG Corp Bond Fund",  qty:"8,200 units",   price:"$40.85",     valueUSD:334_800, dayChangePct:0.0,  totalReturnPct:5.2  },
    ],
  },
  {
    id: "commodities",
    label: "Commodities",
    color: "#829850",
    gradientId: "pf-com",
    totalUSD: 750_000,
    allocationPct: 18,
    ytdPct: 18.6,
    history: [582_000,601_000,590_000,621_000,646_000,630_000,665_000,687_000,676_000,707_000,725_000,750_000].map((v,i)=>({month:MONTHS[i],value:v})),
    holdings: [
      { ticker:"IGLN", name:"iShares Physical Gold",   qty:"11,200 units", price:"$36.20",  valueUSD:405_000, dayChangePct:0.6,  totalReturnPct:18.2  },
      { ticker:"ISLN", name:"iShares Physical Silver", qty:"17,300 units", price:"$10.39",  valueUSD:179_700, dayChangePct:1.2,  totalReturnPct:8.4   },
      { ticker:"OILB", name:"WisdomTree Brent Crude",  qty:"15,400 units", price:"$10.73",  valueUSD:165_300, dayChangePct:-2.4, totalReturnPct:-15.2 },
    ],
  },
  {
    id: "cash",
    label: "Cash",
    color: "#c4b5a0",
    gradientId: "pf-cash",
    totalUSD: 628_000,
    allocationPct: 15,
    ytdPct: 3.1,
    history: [608_000,610_000,611_000,614_000,616_000,617_000,619_000,622_000,624_000,626_000,627_000,628_000].map((v,i)=>({month:MONTHS[i],value:v})),
    holdings: [
      { ticker:"USD", name:"US Dollar Cash",  qty:"", price:"Fed 5.50%", valueUSD:340_000, dayChangePct:0, totalReturnPct:3.1 },
      { ticker:"GBP", name:"Sterling Cash",   qty:"", price:"BoE 5.25%", valueUSD:288_000, dayChangePct:0, totalReturnPct:3.1 },
    ],
  },
];

export const portfolioSummary = {
  totalUSD: assetClasses.reduce((s, c) => s + c.totalUSD, 0),
  inceptionCostBasisUSD: 3_525_000,
  bestAssetClassYtd: "Commodities",
  bestAssetClassYtdPct: 18.6,
  topHolding: "AAPL",
  topHoldingReturnPct: 34.2,
};

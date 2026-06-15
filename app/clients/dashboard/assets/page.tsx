import { TrendingUp, TrendingDown, Minus } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import {
  AllocationPieChart,
  AssetAreaChart,
} from "@/components/charts/asset-charts";
import {
  DashCard,
  DashCardContent,
  DashCardDescription,
  DashCardHeader,
  DashCardTitle,
} from "@/components/ui/dash-card";
import { KpiItem, KpiStrip } from "@/components/ui/kpi-strip";
import { Badge } from "@/components/ui/badge";
import { H1, Muted, TextSmall } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

// ─── Data ────────────────────────────────────────────────────────────────────

const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];

type Holding = {
  ticker: string;
  name: string;
  qty: string;
  price: string;
  value: number;
  dayChange: number;
  totalReturn: number;
};

type AssetClass = {
  id: string;
  label: string;
  color: string;
  gradientId: string;
  totalValue: number;
  allocation: number;
  ytd: number;
  history: { month: string; value: number }[];
  holdings: Holding[];
};

const assetClasses: AssetClass[] = [
  {
    id: "equities",
    label: "Equities",
    color: "#b2936b",
    gradientId: "grad-eq",
    totalValue: 1509000,
    allocation: 45,
    ytd: 12.4,
    history: [1200000, 1240000, 1270000, 1310000, 1280000, 1340000, 1380000, 1420000, 1450000, 1470000, 1490000, 1509000].map((v, i) => ({ month: months[i], value: v })),
    holdings: [
      { ticker: "AAPL",  name: "Apple Inc",      qty: "2,100 shares", price: "$206.80",  value: 342000, dayChange: 1.2,  totalReturn: 34.2 },
      { ticker: "MSFT",  name: "Microsoft",      qty: "800 shares",   price: "$449.60",  value: 285000, dayChange: 0.4,  totalReturn: 28.7 },
      { ticker: "SHEL",  name: "Shell plc",      qty: "12,200 shares",price: "£25.40",   value: 310000, dayChange: -0.8, totalReturn: 12.4 },
      { ticker: "HSBA",  name: "HSBC Holdings",  qty: "28,800 shares",price: "£8.60",    value: 248000, dayChange: 0.2,  totalReturn: 8.1  },
      { ticker: "ULVR",  name: "Unilever",       qty: "4,300 shares", price: "£42.30",   value: 182000, dayChange: -0.3, totalReturn: 4.2  },
      { ticker: "BP.",   name: "BP plc",         qty: "29,300 shares",price: "£4.85",    value: 142000, dayChange: -1.1, totalReturn: -8.4 },
    ],
  },
  {
    id: "fixed-income",
    label: "Fixed Income",
    color: "#202356",
    gradientId: "grad-fi",
    totalValue: 730000,
    allocation: 22,
    ytd: 3.8,
    history: [690000, 694000, 698000, 702000, 705000, 709000, 712000, 716000, 720000, 724000, 727000, 730000].map((v, i) => ({ month: months[i], value: v })),
    holdings: [
      { ticker: "UKG31",  name: "UK Gilts 2031",         qty: "£280,000 nominal", price: "4.2% yield", value: 280000, dayChange: 0.1,  totalReturn: 3.8 },
      { ticker: "UST28",  name: "US Treasury 2028",      qty: "£185,000 nominal", price: "4.8% yield", value: 185000, dayChange: -0.1, totalReturn: 2.1 },
      { ticker: "IGCB",   name: "IG Corp Bond Fund",     qty: "8,200 units",      price: "£32.32",     value: 265000, dayChange: 0.0,  totalReturn: 5.2 },
    ],
  },
  {
    id: "commodities",
    label: "Commodities",
    color: "#829850",
    gradientId: "grad-com",
    totalValue: 582000,
    allocation: 18,
    ytd: 18.6,
    history: [460000, 475000, 468000, 490000, 510000, 498000, 525000, 542000, 535000, 558000, 572000, 582000].map((v, i) => ({ month: months[i], value: v })),
    holdings: [
      { ticker: "IGLN",  name: "iShares Physical Gold",  qty: "11,200 units",  price: "£28.60",     value: 320000, dayChange: 0.6,  totalReturn: 18.2 },
      { ticker: "ISLN",  name: "iShares Physical Silver",qty: "17,300 units",  price: "£8.20",      value: 142000, dayChange: 1.2,  totalReturn: 8.4  },
      { ticker: "OILB",  name: "WisdomTree Brent Crude", qty: "15,400 units",  price: "£7.80",      value: 120000, dayChange: -2.4, totalReturn: -15.2},
    ],
  },
  {
    id: "cash",
    label: "Cash",
    color: "#c4b5a0",
    gradientId: "grad-cash",
    totalValue: 497930,
    allocation: 15,
    ytd: 3.1,
    history: [480000, 481000, 482000, 483000, 484000, 485000, 486000, 488000, 490000, 493000, 495000, 497930].map((v, i) => ({ month: months[i], value: v })),
    holdings: [
      { ticker: "GBP", name: "Sterling Cash",  qty: "",   price: "BoE base 5.25%", value: 268000, dayChange: 0, totalReturn: 3.1 },
      { ticker: "USD", name: "US Dollar Cash", qty: "",   price: "Fed rate 5.50%", value: 229930, dayChange: 0, totalReturn: 3.1 },
    ],
  },
];

const totalPortfolio = assetClasses.reduce((s, c) => s + c.totalValue, 0);
const inceptionValue = 2_800_000;
const totalGain = totalPortfolio - inceptionValue;
const gainPct = (((totalPortfolio - inceptionValue) / inceptionValue) * 100).toFixed(1);
const bestClass = [...assetClasses].sort((a, b) => b.ytd - a.ytd)[0];
const bestHolding = assetClasses.flatMap((c) => c.holdings).sort((a, b) => b.totalReturn - a.totalReturn)[0];

function formatGBP(n: number) {
  return `£${n.toLocaleString("en-GB")}`;
}

function ChangeCell({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const positive = value > 0;
  const neutral = value === 0;
  const Icon = neutral ? Minus : positive ? TrendingUp : TrendingDown;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium",
        positive && "text-brand-accent",
        !positive && !neutral && "text-destructive",
        neutral && "text-muted-foreground"
      )}
    >
      <Icon className="size-3" />
      {positive ? "+" : ""}{value}{suffix}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClientAssetsPage() {
  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-1">
        <H1>Assets</H1>
        <Muted>Live holdings across equities, fixed income, commodities and cash</Muted>
      </header>

      {/* Top-level KPIs */}
      <KpiStrip>
        <KpiItem
          label="Total Portfolio"
          value={formatGBP(totalPortfolio)}
          change={`+${gainPct}% since inception`}
          trend="up"
        />
        <KpiItem
          label="Unrealised Gain"
          value={formatGBP(totalGain)}
          change="vs. inception value"
          trend="up"
        />
        <KpiItem
          label="Best Asset Class"
          value={bestClass.label}
          change={`+${bestClass.ytd}% YTD`}
          trend="up"
        />
        <KpiItem
          label="Top Holding"
          value={bestHolding.ticker}
          change={`+${bestHolding.totalReturn}% total return`}
          trend="up"
        />
      </KpiStrip>

      {/* Overview row: allocation + growth chart */}
      <div className="grid grid-cols-1 gap-(--spacing-grid) lg:grid-cols-3">
        <DashCard>
          <DashCardHeader>
            <div>
              <DashCardTitle>Asset Allocation</DashCardTitle>
              <DashCardDescription>By asset class, % of portfolio</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent>
            <AllocationPieChart
              data={assetClasses.map((c) => ({
                name: c.label,
                value: c.allocation,
                color: c.color,
              }))}
            />
            <div className="mt-2 flex flex-col gap-2">
              {assetClasses.map((c) => (
                <div key={c.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                    <TextSmall>{c.label}</TextSmall>
                  </div>
                  <div className="flex items-center gap-3">
                    <TextSmall className="text-muted-foreground">
                      {formatGBP(c.totalValue)}
                    </TextSmall>
                    <TextSmall className="w-8 text-right font-medium">
                      {c.allocation}%
                    </TextSmall>
                  </div>
                </div>
              ))}
            </div>
          </DashCardContent>
        </DashCard>

        <DashCard className="lg:col-span-2">
          <DashCardHeader>
            <div>
              <DashCardTitle>Portfolio Growth</DashCardTitle>
              <DashCardDescription>
                Combined value by asset class, Jul 2025 to Jun 2026
              </DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent className="gap-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {assetClasses.map((c) => (
                <div key={c.id}>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                    <Muted>{c.label}</Muted>
                  </div>
                  <AssetAreaChart
                    data={c.history}
                    color={c.color}
                    gradientId={c.gradientId}
                    positive={c.ytd >= 0}
                  />
                  <TextSmall className="mt-1 font-medium">{formatGBP(c.totalValue)}</TextSmall>
                  <ChangeCell value={c.ytd} />
                </div>
              ))}
            </div>
          </DashCardContent>
        </DashCard>
      </div>

      {/* Holdings by asset class */}
      {assetClasses.map((cls) => (
        <DashCard key={cls.id}>
          <DashCardHeader>
            <div className="flex items-center gap-3">
              <span
                className="size-3 shrink-0 rounded-full"
                style={{ backgroundColor: cls.color }}
              />
              <div>
                <DashCardTitle>{cls.label}</DashCardTitle>
                <DashCardDescription>
                  {formatGBP(cls.totalValue)} · {cls.allocation}% of portfolio
                </DashCardDescription>
              </div>
            </div>
            <Badge variant={cls.ytd >= 0 ? "secondary" : "outline"}>
              {cls.ytd > 0 ? "+" : ""}{cls.ytd}% YTD
            </Badge>
          </DashCardHeader>
          <DashCardContent className="p-0">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-6 border-b border-border/40 px-6 py-2">
              <Muted>Name</Muted>
              <Muted className="text-right">Value</Muted>
              <Muted className="w-20 text-right">Day</Muted>
              <Muted className="w-24 text-right">Total return</Muted>
            </div>
            {cls.holdings.map((h, i) => (
              <div
                key={h.ticker}
                className={cn(
                  "grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-6 px-6 py-3.5",
                  i < cls.holdings.length - 1 && "border-b border-border/40"
                )}
              >
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <TextSmall className="font-medium font-numeric">
                      {h.ticker}
                    </TextSmall>
                    <Muted className="truncate">{h.name}</Muted>
                  </div>
                  {h.qty ? (
                    <Muted className="text-xs">
                      {h.qty} · {h.price}
                    </Muted>
                  ) : (
                    <Muted className="text-xs">{h.price}</Muted>
                  )}
                </div>
                <TextSmall className="text-right font-medium font-numeric">
                  {formatGBP(h.value)}
                </TextSmall>
                <div className="w-20 text-right">
                  <ChangeCell value={h.dayChange} />
                </div>
                <div className="w-24 text-right">
                  <ChangeCell value={h.totalReturn} />
                </div>
              </div>
            ))}
          </DashCardContent>
        </DashCard>
      ))}
    </PageShell>
  );
}

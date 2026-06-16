"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { AllocationPieChart, AssetAreaChart } from "@/components/charts/asset-charts";
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
import { useCurrency } from "@/lib/currency-context";
import { assetClasses, portfolioSummary } from "@/lib/data/portfolio";
import { cn } from "@/lib/utils";

function ChangeCell({ value }: { value: number }) {
  const Icon = value === 0 ? Minus : value > 0 ? TrendingUp : TrendingDown;
  return (
    <span className={cn(
      "inline-flex items-center gap-1 font-numeric text-xs font-medium",
      value > 0 && "text-brand-accent",
      value < 0 && "text-destructive",
      value === 0 && "text-muted-foreground"
    )}>
      <Icon className="size-3 shrink-0" />
      {value > 0 ? "+" : ""}{value}%
    </span>
  );
}

export default function ClientPortfolioPage() {
  const { format } = useCurrency();
  const { totalUSD, inceptionCostBasisUSD, bestAssetClassYtd, bestAssetClassYtdPct, topHolding, topHoldingReturnPct } = portfolioSummary;

  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-1">
        <H1>My Portfolio</H1>
        <Muted>Holdings across equities, fixed income, commodities and cash. All values in selected currency.</Muted>
      </header>

      <KpiStrip>
        <KpiItem label="Total Portfolio"   value={format(totalUSD)}                         change={`+${(((totalUSD - inceptionCostBasisUSD) / inceptionCostBasisUSD) * 100).toFixed(1)}% since inception`} trend="up" />
        <KpiItem label="Unrealised Gain"   value={format(totalUSD - inceptionCostBasisUSD)} change="vs inception value" trend="up" />
        <KpiItem label="Best Asset Class"  value={bestAssetClassYtd}                        change={`+${bestAssetClassYtdPct}% YTD`} trend="up" />
        <KpiItem label="Top Holding"       value={topHolding}                               change={`+${topHoldingReturnPct}% total return`} trend="up" />
      </KpiStrip>

      {/* Allocation + sparklines */}
      <div className="grid grid-cols-1 gap-(--spacing-grid) lg:grid-cols-3">
        <DashCard>
          <DashCardHeader>
            <div>
              <DashCardTitle>Asset Allocation</DashCardTitle>
              <DashCardDescription>By class, % of portfolio</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent>
            <AllocationPieChart data={assetClasses.map(c => ({ name: c.label, value: c.allocationPct, color: c.color }))} />
            <div className="mt-2 flex flex-col gap-2">
              {assetClasses.map(c => (
                <div key={c.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: c.color }} />
                    <TextSmall>{c.label}</TextSmall>
                  </div>
                  <div className="flex items-center gap-3">
                    <TextSmall className="text-muted-foreground">{format(c.totalUSD, { compact: true })}</TextSmall>
                    <TextSmall className="w-8 text-right font-medium">{c.allocationPct}%</TextSmall>
                  </div>
                </div>
              ))}
            </div>
          </DashCardContent>
        </DashCard>

        <DashCard className="lg:col-span-2">
          <DashCardHeader>
            <div>
              <DashCardTitle>Growth by Asset Class</DashCardTitle>
              <DashCardDescription>Jul 2025 to Jun 2026</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {assetClasses.map(c => (
                <div key={c.id}>
                  <div className="mb-1 flex items-center gap-1.5">
                    <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: c.color }} />
                    <Muted>{c.label}</Muted>
                  </div>
                  <AssetAreaChart data={c.history} color={c.color} gradientId={c.gradientId} positive={c.ytdPct >= 0} />
                  <TextSmall className="mt-1 font-medium">{format(c.totalUSD, { compact: true })}</TextSmall>
                  <ChangeCell value={c.ytdPct} />
                </div>
              ))}
            </div>
          </DashCardContent>
        </DashCard>
      </div>

      {/* Holdings tables per asset class */}
      {assetClasses.map(cls => (
        <DashCard key={cls.id}>
          <DashCardHeader>
            <div className="flex items-center gap-3">
              <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: cls.color }} />
              <div>
                <DashCardTitle>{cls.label}</DashCardTitle>
                <DashCardDescription>{format(cls.totalUSD)} · {cls.allocationPct}% of portfolio</DashCardDescription>
              </div>
            </div>
            <Badge variant={cls.ytdPct >= 0 ? "secondary" : "outline"}>
              {cls.ytdPct > 0 ? "+" : ""}{cls.ytdPct}% YTD
            </Badge>
          </DashCardHeader>

          {/* Horizontally scrollable on small screens */}
          <DashCardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-[520px]">
                {/* Column headings */}
                <div className="grid grid-cols-[1fr_120px_80px_110px] gap-x-4 border-b border-border/40 px-6 py-2">
                  <Muted>Name</Muted>
                  <Muted className="text-right">Value</Muted>
                  <Muted className="text-right">Day</Muted>
                  <Muted className="text-right">Total return</Muted>
                </div>
                {cls.holdings.map((h, i) => (
                  <div
                    key={h.ticker}
                    className={cn(
                      "grid grid-cols-[1fr_120px_80px_110px] items-center gap-x-4 px-6 py-3.5",
                      i < cls.holdings.length - 1 && "border-b border-border/40"
                    )}
                  >
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-numeric text-sm font-semibold">{h.ticker}</span>
                        <Muted className="truncate">{h.name}</Muted>
                      </div>
                      {(h.qty || h.price) && (
                        <Muted className="text-xs">
                          {h.qty ? `${h.qty} · ${h.price}` : h.price}
                        </Muted>
                      )}
                    </div>
                    <TextSmall className="text-right font-numeric font-medium">
                      {format(h.valueUSD)}
                    </TextSmall>
                    <div className="text-right">
                      <ChangeCell value={h.dayChangePct} />
                    </div>
                    <div className="text-right">
                      <ChangeCell value={h.totalReturnPct} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DashCardContent>
        </DashCard>
      ))}
    </PageShell>
  );
}

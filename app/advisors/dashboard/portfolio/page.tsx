import { TrendingDown, TrendingUp } from "lucide-react";

import { DashboardGrid, PageShell } from "@/components/layout/page-shell";
import { KpiItem, KpiStrip } from "@/components/ui/kpi-strip";
import {
  DashCard,
  DashCardContent,
  DashCardDescription,
  DashCardHeader,
  DashCardTitle,
} from "@/components/ui/dash-card";
import { H1, Muted, TextSmall } from "@/components/ui/typography";
import { clients } from "@/lib/advisor-clients-data";
import { cn } from "@/lib/utils";

// Aggregate asset class totals across all clients
type AssetRollup = { name: string; totalUSD: number; clientCount: number; color: string };

const ASSET_COLORS: Record<string, string> = {
  Equities: "#b2936b",
  "Fixed Income": "#202356",
  "Real Estate": "#484848",
  Commodities: "#829850",
  "Digital Assets": "#7c3aed",
  Cash: "#c4b5a0",
};

const rollupMap = new Map<string, AssetRollup>();

for (const client of clients) {
  for (const asset of client.portfolio.assets) {
    const existing = rollupMap.get(asset.name);
    if (existing) {
      existing.totalUSD += asset.value;
      existing.clientCount += 1;
    } else {
      rollupMap.set(asset.name, {
        name: asset.name,
        totalUSD: asset.value,
        clientCount: 1,
        color: ASSET_COLORS[asset.name] ?? "#888",
      });
    }
  }
}

const assetRollups = Array.from(rollupMap.values()).sort((a, b) => b.totalUSD - a.totalUSD);
const totalAUM = clients.reduce((s, c) => s + c.portfolio.total, 0);
const avgYtd = (clients.reduce((s, c) => s + c.portfolio.ytd, 0) / clients.length).toFixed(1);
const largestClient = [...clients].sort((a, b) => b.portfolio.total - a.portfolio.total)[0];
const activeCount = clients.filter((c) => c.status === "Active").length;

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n}`;
}

export default function AdvisorPortfolioPage() {
  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-1">
        <H1>Portfolio</H1>
        <Muted>Aggregated view across your book of business</Muted>
      </header>

      <KpiStrip>
        <KpiItem label="Total AUM" value={fmt(totalAUM)} change={`${clients.length} clients`} trend="neutral" />
        <KpiItem label="Avg YTD Return" value={`${Number(avgYtd) >= 0 ? "+" : ""}${avgYtd}%`} change="Book average" trend={Number(avgYtd) >= 0 ? "up" : "down"} />
        <KpiItem label="Active Clients" value={String(activeCount)} change={`of ${clients.length} total`} trend="neutral" />
        <KpiItem label="Largest Client" value={fmt(largestClient.portfolio.total)} change={largestClient.name} trend="neutral" />
      </KpiStrip>

      <DashboardGrid>
        <DashCard span="wide">
          <DashCardHeader>
            <div>
              <DashCardTitle>AUM by Asset Class</DashCardTitle>
              <DashCardDescription>Aggregated across all client portfolios</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent className="gap-0">
            {assetRollups.map((row) => {
              const pct = ((row.totalUSD / totalAUM) * 100).toFixed(1);
              return (
                <div
                  key={row.name}
                  className="flex items-center gap-4 border-b border-border/60 py-4 last:border-0"
                >
                  <span
                    className="size-3 shrink-0 rounded-full"
                    style={{ backgroundColor: row.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <TextSmall className="font-medium">{row.name}</TextSmall>
                    <Muted className="text-xs">{row.clientCount} client{row.clientCount !== 1 ? "s" : ""} · {pct}% of AUM</Muted>
                  </div>
                  <div className="w-32 shrink-0">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, backgroundColor: row.color }}
                      />
                    </div>
                  </div>
                  <TextSmall className="w-28 shrink-0 text-right font-numeric font-semibold">
                    {fmt(row.totalUSD)}
                  </TextSmall>
                </div>
              );
            })}
          </DashCardContent>
        </DashCard>

        <DashCard span="full">
          <DashCardHeader>
            <div>
              <DashCardTitle>Client Portfolio Summary</DashCardTitle>
              <DashCardDescription>YTD return and asset class breakdown per client</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent className="gap-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-left text-xs text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Client</th>
                    <th className="pb-3 pr-4 font-medium text-right">AUM</th>
                    <th className="pb-3 pr-4 font-medium text-right">YTD</th>
                    <th className="pb-3 font-medium">Allocation</th>
                  </tr>
                </thead>
                <tbody>
                  {[...clients]
                    .sort((a, b) => b.portfolio.total - a.portfolio.total)
                    .map((c) => (
                      <tr key={c.id} className="border-b border-border/40 last:border-0">
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sidebar text-xs font-semibold text-sidebar-foreground">
                              {c.initials}
                            </div>
                            <div>
                              <TextSmall className="font-medium">{c.name}</TextSmall>
                              <Muted className="text-xs">{c.status}</Muted>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-right font-numeric font-semibold">
                          {fmt(c.portfolio.total)}
                        </td>
                        <td className={cn(
                          "py-3 pr-4 text-right font-numeric font-semibold",
                          c.portfolio.ytd >= 0 ? "text-green-600" : "text-red-500"
                        )}>
                          <span className="inline-flex items-center gap-1">
                            {c.portfolio.ytd >= 0
                              ? <TrendingUp className="size-3.5" />
                              : <TrendingDown className="size-3.5" />}
                            {c.portfolio.ytd > 0 ? "+" : ""}{c.portfolio.ytd}%
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex h-2.5 w-40 overflow-hidden rounded-full">
                            {c.portfolio.assets.map((a) => (
                              <div
                                key={a.name}
                                title={`${a.name}: ${a.allocation}%`}
                                className="h-full"
                                style={{
                                  width: `${a.allocation}%`,
                                  backgroundColor: ASSET_COLORS[a.name] ?? "#888",
                                }}
                              />
                            ))}
                          </div>
                          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">
                            {c.portfolio.assets.map((a) => (
                              <span key={a.name} className="flex items-center gap-1 text-xs text-muted-foreground">
                                <span className="size-2 rounded-full" style={{ backgroundColor: ASSET_COLORS[a.name] ?? "#888" }} />
                                {a.allocation}% {a.name}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </DashCardContent>
        </DashCard>
      </DashboardGrid>
    </PageShell>
  );
}

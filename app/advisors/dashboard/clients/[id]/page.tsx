"use client";

import { useState } from "react";
import { useParams, notFound, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  CheckCircle2,
  CheckSquare,
  Clock,
  Download,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  TrendingDown,
  TrendingUp,
  Upload,
  XCircle,
} from "lucide-react";

import { AddClientTaskSheet } from "@/components/advisors/add-client-task-sheet";
import { AdvisorConciergePanel } from "@/components/advisors/client-panels/concierge-panel";
import { AdvisorInsightsPanel } from "@/components/advisors/client-panels/insights-panel";
import { AdvisorLegacyPanel } from "@/components/advisors/client-panels/legacy-panel";
import { AdvisorSessionsPanel } from "@/components/advisors/client-panels/sessions-panel";
import { AddGoalSheet } from "@/components/advisors/add-goal-sheet";
import { AddHoldingSheet } from "@/components/advisors/add-holding-sheet";
import { AddLiabilitySheet } from "@/components/advisors/add-liability-sheet";
import { AddTaskSheet } from "@/components/advisors/add-task-sheet";
import { EditAllocationSheet } from "@/components/advisors/edit-allocation-sheet";
import { AdvisorGoalCard } from "@/components/advisors/advisor-goal-card";
import { GoalsAnalyticsSection } from "@/components/goals/goals-analytics";
import { EditHoldingSheet } from "@/components/advisors/edit-holding-sheet";
import { EditNotesSheet } from "@/components/advisors/edit-notes-sheet";
import { EditPlanSectionSheet } from "@/components/advisors/edit-plan-section-sheet";
import { LogNoteSheet } from "@/components/advisors/log-note-sheet";
import { PostInsightSheet } from "@/components/advisors/post-insight-sheet";
import { ScheduleSessionSheet } from "@/components/advisors/schedule-session-sheet";
import { UpdateCBIStageSheet } from "@/components/advisors/update-cbi-stage-sheet";
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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { H1, H2, TextSmall, Muted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { getClientById, type ActivityItem } from "@/lib/advisor-clients-data";
import { advisorSessions } from "@/lib/data/advisor-sessions";
import { advisorTasks } from "@/lib/data/advisor-tasks";
import { assetClasses, portfolioSummary } from "@/lib/data/portfolio";
import { goals } from "@/lib/data/goals";
import { wealthPlan } from "@/lib/data/wealth-plan";
import { liabilities, liabilitySummary } from "@/lib/data/liabilities";
import { tasks } from "@/lib/data/tasks";
import { docSections } from "@/lib/data/documents";

// ─── helpers ────────────────────────────────────────────────────────────────

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}m`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n.toLocaleString()}`;
}

function fmtGBP(n: number) {
  return `£${n.toLocaleString("en-GB")}`;
}

const ACTIVITY_ICON: Record<ActivityItem["type"], React.ElementType> = {
  document: FileText,
  review: CheckCircle,
  request: Clock,
  meeting: Calendar,
  note: MessageSquare,
};

const TABS = [
  "Overview",
  "Portfolio",
  "Goals",
  "Wealth Plan",
  "Legacy",
  "Liabilities",
  "Sessions",
  "Concierge",
  "Tasks",
  "Documents",
  "Advisor Insights",
] as const;

type Tab = (typeof TABS)[number];

// ─── sub-components ──────────────────────────────────────────────────────────

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <div className="sticky top-0 z-10 -mx-4 overflow-x-auto border-b border-border bg-background/95 px-4 backdrop-blur-sm sm:-mx-6 sm:px-6">
      <nav className="flex min-w-max gap-1 py-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={cn(
              "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active === t
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            {t}
          </button>
        ))}
      </nav>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "on-track": "bg-green-100 text-green-700",
    ahead: "bg-blue-100 text-blue-700",
    "at-risk": "bg-amber-100 text-amber-700",
    "in-progress": "bg-muted text-muted-foreground",
    completed: "bg-green-100 text-green-700",
    "in-progress-m": "bg-amber-100 text-amber-700",
    pending: "bg-muted text-muted-foreground",
    current: "bg-green-100 text-green-700",
    "attention-required": "bg-red-100 text-red-700",
    "review-required": "bg-amber-100 text-amber-700",
    "not-in-place": "bg-red-100 text-red-700",
    "in-place": "bg-green-100 text-green-700",
    active: "bg-green-100 text-green-700",
  };
  const cls = map[status] ?? "bg-muted text-muted-foreground";
  return (
    <span className={cn("rounded-md px-2 py-0.5 text-xs font-medium capitalize", cls)}>
      {status.replace(/-/g, " ")}
    </span>
  );
}

// ─── tab panels ──────────────────────────────────────────────────────────────

function OverviewPanel({
  client,
  clientSessions,
  clientTasks,
}: {
  client: ReturnType<typeof getClientById> & {};
  clientSessions: typeof advisorSessions;
  clientTasks: typeof advisorTasks;
}) {
  const gain = client.portfolio.total - client.portfolio.inceptionValue;
  const gainPositive = gain >= 0;
  const upcoming = clientSessions.filter((s) => s.status === "upcoming");
  const openTasks = clientTasks.filter((t) => !t.done);

  return (
    <div className="flex flex-col gap-(--spacing-section)">
      <KpiStrip>
        <KpiItem
          label="Portfolio Value"
          value={fmtGBP(client.portfolio.total)}
          change={`${gainPositive ? "+" : ""}${(((client.portfolio.total - client.portfolio.inceptionValue) / client.portfolio.inceptionValue) * 100).toFixed(1)}% since inception`}
          trend={gainPositive ? "up" : "down"}
        />
        <KpiItem
          label="YTD Return"
          value={`${client.portfolio.ytd > 0 ? "+" : ""}${client.portfolio.ytd}%`}
          change="Year to date"
          trend={client.portfolio.ytd >= 0 ? "up" : "down"}
        />
        <KpiItem
          label="Legacy Progress"
          value={`${client.legacyProgress}%`}
          change={client.legacyStatus}
          trend={client.legacyProgress >= 70 ? "up" : "neutral"}
        />
        <KpiItem
          label="Open Tasks"
          value={String(openTasks.length)}
          change={client.pendingRequests > 0 ? `${client.pendingRequests} pending` : "No pending requests"}
          trend={openTasks.length > 3 ? "down" : "neutral"}
        />
      </KpiStrip>

      <div className="grid grid-cols-1 gap-(--spacing-grid) lg:grid-cols-3">
        <DashCard>
          <DashCardHeader>
            <div>
              <DashCardTitle>Allocation</DashCardTitle>
              <DashCardDescription>By asset class</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent>
            <AllocationPieChart
              data={client.portfolio.assets.map((a) => ({ name: a.name, value: a.allocation, color: a.color }))}
            />
            <div className="mt-2 flex flex-col gap-2">
              {client.portfolio.assets.map((a) => (
                <div key={a.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: a.color }} />
                    <TextSmall>{a.name}</TextSmall>
                  </div>
                  <div className="flex items-center gap-2">
                    <TextSmall className="font-medium">{fmtGBP(a.value)}</TextSmall>
                    <Muted className="w-8 text-right">{a.allocation}%</Muted>
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
              <DashCardDescription>Jul 2025 to Jun 2026</DashCardDescription>
            </div>
            <div className="flex flex-col items-end">
              <p className="font-numeric text-2xl font-semibold tracking-tight">{fmtGBP(client.portfolio.total)}</p>
              <Muted>{gainPositive ? "+" : ""}{fmtGBP(Math.abs(gain))} gain</Muted>
            </div>
          </DashCardHeader>
          <DashCardContent>
            <AssetAreaChart
              data={client.portfolio.history}
              color="#b2936b"
              gradientId={`grad-${client.id}`}
              positive={gainPositive}
            />
          </DashCardContent>
        </DashCard>
      </div>

      <div className="grid grid-cols-1 gap-(--spacing-grid) lg:grid-cols-3">
        <DashCard>
          <DashCardHeader>
            <div><DashCardTitle>Sessions</DashCardTitle><DashCardDescription>{upcoming.length} upcoming</DashCardDescription></div>
            <ScheduleSessionSheet preselectedClientId={client.id} />
          </DashCardHeader>
          <DashCardContent className="gap-3">
            {upcoming.length === 0 ? <Muted className="text-center text-sm">No upcoming sessions.</Muted> : upcoming.map((s) => (
              <div key={s.id} className="flex flex-col gap-0.5 border-b border-border/60 pb-3 last:border-0 last:pb-0">
                <TextSmall className="font-medium">{s.type}</TextSmall>
                <Muted>{s.date} at {s.time}</Muted>
              </div>
            ))}
          </DashCardContent>
        </DashCard>

        <DashCard>
          <DashCardHeader>
            <div><DashCardTitle>Open Tasks</DashCardTitle></div>
          </DashCardHeader>
          <DashCardContent className="gap-3">
            {openTasks.length === 0 ? <Muted className="text-center text-sm">No open tasks.</Muted> : openTasks.map((t) => (
              <div key={t.id} className="flex items-start gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0">
                <CheckSquare className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <TextSmall className="font-medium leading-snug">{t.title}</TextSmall>
                  <Muted>Due {t.due}</Muted>
                </div>
              </div>
            ))}
          </DashCardContent>
        </DashCard>

        <DashCard>
          <DashCardHeader>
            <DashCardTitle>Advisor Notes</DashCardTitle>
          </DashCardHeader>
          <DashCardContent>
            <TextSmall className="leading-relaxed text-muted-foreground">{client.notes}</TextSmall>
            <div className="mt-4 flex flex-col gap-2">
              <EditNotesSheet clientName={client.name} currentNotes={client.notes} />
              <PostInsightSheet clientName={client.name} />
            </div>
          </DashCardContent>
        </DashCard>
      </div>

      <DashCard>
        <DashCardHeader>
          <div><DashCardTitle>Recent Activity</DashCardTitle></div>
        </DashCardHeader>
        <DashCardContent className="gap-4">
          {client.recentActivity.map((item) => {
            const Icon = ACTIVITY_ICON[item.type];
            return (
              <div key={item.title} className="flex items-start gap-3 border-b border-border/60 pb-4 last:border-0 last:pb-0">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
                  <Icon className="size-3.5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <TextSmall className="font-medium">{item.title}</TextSmall>
                  <Muted>{item.date}</Muted>
                </div>
              </div>
            );
          })}
        </DashCardContent>
      </DashCard>
    </div>
  );
}

function PortfolioPanel() {
  return (
    <div className="flex flex-col gap-(--spacing-section)">
      <KpiStrip>
        <KpiItem label="Total Portfolio" value={fmt(portfolioSummary.totalUSD)} change="All asset classes" trend="neutral" />
        <KpiItem label="Best Asset Class" value={portfolioSummary.bestAssetClassYtd} change={`+${portfolioSummary.bestAssetClassYtdPct}% YTD`} trend="up" />
        <KpiItem label="Top Holding" value={portfolioSummary.topHolding} change={`+${portfolioSummary.topHoldingReturnPct}% total return`} trend="up" />
        <KpiItem label="Cost Basis" value={fmt(portfolioSummary.inceptionCostBasisUSD)} change="Inception" trend="neutral" />
      </KpiStrip>

      <div className="flex justify-end">
        <EditAllocationSheet assetClasses={assetClasses} />
      </div>

      {assetClasses.map((ac) => (
        <DashCard key={ac.id}>
          <DashCardHeader>
            <div>
              <DashCardTitle className="flex items-center gap-2">
                <span className="size-3 rounded-full" style={{ backgroundColor: ac.color }} />
                {ac.label}
              </DashCardTitle>
              <DashCardDescription>{ac.allocationPct}% of portfolio</DashCardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end gap-1">
                <p className="font-numeric text-xl font-semibold">{fmt(ac.totalUSD)}</p>
                <span className={cn("flex items-center gap-1 text-xs font-medium", ac.ytdPct >= 0 ? "text-green-600" : "text-red-500")}>
                  {ac.ytdPct >= 0 ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
                  {ac.ytdPct > 0 ? "+" : ""}{ac.ytdPct}% YTD
                </span>
              </div>
              <AddHoldingSheet assetClass={ac.label} />
            </div>
          </DashCardHeader>
          <DashCardContent>
            <AssetAreaChart data={ac.history} color={ac.color} gradientId={ac.gradientId} positive={ac.ytdPct >= 0} />
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-left text-xs text-muted-foreground">
                    <th className="pb-2 pr-4 font-medium">Ticker</th>
                    <th className="pb-2 pr-4 font-medium">Name</th>
                    <th className="pb-2 pr-4 font-medium text-right">Value</th>
                    <th className="pb-2 pr-4 font-medium text-right">Day</th>
                    <th className="pb-2 pr-4 font-medium text-right">Total Return</th>
                    <th className="pb-2 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {ac.holdings.map((h) => (
                    <tr key={h.ticker} className="group border-b border-border/40 last:border-0">
                      <td className="py-2 pr-4 font-mono text-xs font-semibold">{h.ticker}</td>
                      <td className="py-2 pr-4">{h.name}</td>
                      <td className="py-2 pr-4 text-right font-numeric">{fmt(h.valueUSD)}</td>
                      <td className={cn("py-2 pr-4 text-right font-numeric", h.dayChangePct >= 0 ? "text-green-600" : "text-red-500")}>
                        {h.dayChangePct > 0 ? "+" : ""}{h.dayChangePct}%
                      </td>
                      <td className={cn("py-2 pr-4 text-right font-numeric", h.totalReturnPct >= 0 ? "text-green-600" : "text-red-500")}>
                        {h.totalReturnPct > 0 ? "+" : ""}{h.totalReturnPct}%
                      </td>
                      <td className="py-2 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-0 transition-opacity group-hover:opacity-100">
                          <EditHoldingSheet holding={h} assetClass={ac.label} />
                          <button className="text-xs text-muted-foreground hover:text-destructive">
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashCardContent>
        </DashCard>
      ))}
    </div>
  );
}

function GoalsPanel({ clientName }: { clientName: string }) {
  const formatGoalValue = (usd: number) => fmt(usd);

  return (
    <div className="flex flex-col gap-(--spacing-section)">
      <div className="flex justify-end">
        <AddGoalSheet clientName={clientName} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {goals.map((g) => (
          <AdvisorGoalCard key={g.id} goal={g} formatValue={formatGoalValue} />
        ))}
      </div>

      <GoalsAnalyticsSection goals={goals} formatValue={formatGoalValue} />
    </div>
  );
}

function WealthPlanPanel() {
  return (
    <div className="flex flex-col gap-(--spacing-section)">
      <DashCard>
        <DashCardHeader>
          <div>
            <DashCardTitle>Financial Plan v{wealthPlan.currentVersion}</DashCardTitle>
            <DashCardDescription>Prepared by {wealthPlan.preparedBy} · Last updated {wealthPlan.lastUpdated} · {wealthPlan.pageCount} pages</DashCardDescription>
          </div>
          <Button size="sm" variant="outline"><Download className="size-4" />Download</Button>
        </DashCardHeader>
        <DashCardContent>
          <TextSmall className="leading-relaxed text-muted-foreground">{wealthPlan.description}</TextSmall>
        </DashCardContent>
      </DashCard>

      <DashCard>
        <DashCardHeader>
          <div>
            <DashCardTitle>CBI Programme: {wealthPlan.cbi.program}</DashCardTitle>
            <DashCardDescription>Updated {wealthPlan.cbi.updatedDate}</DashCardDescription>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="in-progress" />
            <UpdateCBIStageSheet cbi={wealthPlan.cbi} />
          </div>
        </DashCardHeader>
        <DashCardContent className="gap-3">
          <div className="flex items-center justify-between">
            <TextSmall className="text-muted-foreground">Overall progress</TextSmall>
            <TextSmall className="font-numeric font-semibold">{wealthPlan.cbi.progressPct}%</TextSmall>
          </div>
          <Progress value={wealthPlan.cbi.progressPct} className="h-2" />
          <div className="flex gap-2 overflow-x-auto pt-1">
            {wealthPlan.cbi.stages.map((stage, i) => (
              <div key={stage} className={cn("flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium", i <= wealthPlan.cbi.stageIndex ? "bg-sidebar text-sidebar-foreground" : "bg-muted text-muted-foreground")}>
                {i < wealthPlan.cbi.stageIndex && <CheckCircle2 className="size-3" />}
                {i === wealthPlan.cbi.stageIndex && <Clock className="size-3" />}
                {stage}
              </div>
            ))}
          </div>
        </DashCardContent>
      </DashCard>

      <div className="grid grid-cols-1 gap-(--spacing-grid) lg:grid-cols-2">
        {wealthPlan.sections.map((s) => (
          <DashCard key={s.id}>
            <DashCardHeader>
              <div>
                <DashCardTitle>{s.title}</DashCardTitle>
                <DashCardDescription>Updated {s.updatedDate} · {s.version}</DashCardDescription>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={s.status.toLowerCase().replace(/ /g, "-")} />
                <EditPlanSectionSheet section={s} />
              </div>
            </DashCardHeader>
            <DashCardContent>
              <TextSmall className="leading-relaxed text-muted-foreground">{s.description}</TextSmall>
            </DashCardContent>
          </DashCard>
        ))}
      </div>
    </div>
  );
}

function LiabilitiesPanel() {
  const total = liabilitySummary.totalOutstandingUSD;
  const monthly = liabilitySummary.monthlyDebtServiceUSD;
  const assets = liabilitySummary.totalAssetValueUSD;
  const ratio = ((total / assets) * 100).toFixed(1);
  const TYPE_LABEL: Record<string, string> = { mortgage: "Mortgage", "personal-loan": "Personal Loan", "credit-facility": "Credit Facility", "business-loan": "Business Loan" };
  return (
    <div className="flex flex-col gap-(--spacing-section)">
      <KpiStrip>
        <KpiItem label="Total Outstanding" value={fmt(total)} change="All liabilities" trend="neutral" />
        <KpiItem label="Monthly Debt Service" value={`$${monthly.toLocaleString()}`} change="Combined payments" trend="neutral" />
        <KpiItem label="Debt-to-Asset" value={`${ratio}%`} change="Outstanding vs portfolio" trend={parseFloat(ratio) > 20 ? "down" : "neutral"} />
        <KpiItem label="Liabilities" value={String(liabilities.length)} change="Across lenders" trend="neutral" />
      </KpiStrip>
      <div className="flex justify-end">
        <AddLiabilitySheet />
      </div>
      {liabilities.map((l) => {
        const repaid = ((l.originalAmountUSD - l.outstandingUSD) / l.originalAmountUSD) * 100;
        return (
          <DashCard key={l.id}>
            <DashCardHeader>
              <div>
                <DashCardTitle>{l.name}</DashCardTitle>
                <DashCardDescription>{l.lender} · {TYPE_LABEL[l.type]}</DashCardDescription>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={l.status} />
                <button className="text-xs text-muted-foreground hover:text-destructive">Remove</button>
              </div>
            </DashCardHeader>
            <DashCardContent className="gap-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div><Muted className="text-xs">Outstanding</Muted><TextSmall className="font-numeric font-semibold">{fmt(l.outstandingUSD)}</TextSmall></div>
                <div><Muted className="text-xs">Interest rate</Muted><TextSmall className="font-numeric font-semibold">{l.interestRatePct}%</TextSmall></div>
                <div><Muted className="text-xs">Monthly payment</Muted><TextSmall className="font-numeric font-semibold">{l.monthlyPaymentUSD > 0 ? `$${l.monthlyPaymentUSD.toLocaleString()}` : "Interest only"}</TextSmall></div>
                <div><Muted className="text-xs">Matures</Muted><TextSmall className="font-semibold">{l.maturityDate}</TextSmall></div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between"><Muted className="text-xs">Repayment progress</Muted><Muted className="text-xs font-numeric">{repaid.toFixed(0)}% repaid</Muted></div>
                <Progress value={repaid} className="h-1.5" />
              </div>
              {l.notes && <TextSmall className="text-muted-foreground">{l.notes}</TextSmall>}
            </DashCardContent>
          </DashCard>
        );
      })}
    </div>
  );
}

function TasksPanel({ clientTasks, clientName }: { clientTasks: typeof advisorTasks; clientName: string }) {
  const open = clientTasks.filter((t) => !t.done);
  const CLIENT_TYPE_ICON: Record<string, React.ElementType> = { upload: Upload, approve: CheckCircle, information: MessageSquare, confirm: Calendar };
  return (
    <div className="flex flex-col gap-(--spacing-section)">
      <DashCard>
        <DashCardHeader>
          <div><DashCardTitle>Assigned to Client</DashCardTitle><DashCardDescription>Tasks {clientName} must complete</DashCardDescription></div>
          <AddClientTaskSheet clientName={clientName} />
        </DashCardHeader>
        <DashCardContent className="gap-4">
          {tasks.filter((t) => t.status !== "completed").map((t) => {
            const Icon = CLIENT_TYPE_ICON[t.type] ?? CheckSquare;
            return (
              <div key={t.id} className="flex items-start gap-3 border-b border-border/60 pb-4 last:border-0 last:pb-0">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted"><Icon className="size-4 text-muted-foreground" /></div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <TextSmall className="font-semibold">{t.title}</TextSmall>
                    <Badge variant={t.status === "overdue" ? "default" : "outline"} className="shrink-0 text-xs">{t.status}</Badge>
                  </div>
                  <TextSmall className="text-muted-foreground">{t.description}</TextSmall>
                  <Muted className="text-xs">Due {t.deadline} · Raised by {t.raisedBy}</Muted>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <button className="text-xs text-green-600 hover:underline">Mark done</button>
                  <button className="text-xs text-muted-foreground hover:text-destructive">Remove</button>
                </div>
              </div>
            );
          })}
        </DashCardContent>
      </DashCard>

      <DashCard>
        <DashCardHeader>
          <div><DashCardTitle>Advisor Tasks</DashCardTitle><DashCardDescription>Your open tasks for this client</DashCardDescription></div>
          <AddTaskSheet />
        </DashCardHeader>
        <DashCardContent className="gap-3">
          {open.map((t) => (
            <div key={t.id} className="flex items-center gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <TextSmall className="font-medium">{t.title}</TextSmall>
                <Muted>Due {t.due} · {t.category}</Muted>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Badge variant={t.priority === "High" ? "default" : t.priority === "Medium" ? "secondary" : "outline"}>{t.priority}</Badge>
                <button className="text-xs text-green-600 hover:underline">Done</button>
                <button className="text-xs text-muted-foreground hover:text-destructive">Remove</button>
              </div>
            </div>
          ))}
          {open.length === 0 && <Muted className="text-xs">No open advisor tasks for this client.</Muted>}
        </DashCardContent>
      </DashCard>
    </div>
  );
}

function DocumentsPanel() {
  const STATUS_BADGE: Record<string, "default" | "secondary" | "outline"> = { new: "default", "requires-signature": "default", viewed: "outline", signed: "secondary" };
  return (
    <div className="flex flex-col gap-(--spacing-section)">
      {docSections.map((section) => (
        <DashCard key={section.id}>
          <DashCardHeader>
            <div><DashCardTitle>{section.title}</DashCardTitle><DashCardDescription>{section.description}</DashCardDescription></div>
            <Button size="sm" variant="outline"><Upload className="size-4" />Upload</Button>
          </DashCardHeader>
          <DashCardContent className="gap-3">
            {section.docs.map((doc) => (
              <div key={doc.id} className="flex items-center gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted"><FileText className="size-4 text-muted-foreground" /></div>
                <div className="min-w-0 flex-1">
                  <TextSmall className="truncate font-medium">{doc.name}</TextSmall>
                  <Muted className="text-xs">{doc.date} · {doc.sizeKb >= 1000 ? `${(doc.sizeKb / 1000).toFixed(1)} MB` : `${doc.sizeKb} KB`}</Muted>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge variant={STATUS_BADGE[doc.status]} className="hidden text-xs sm:inline-flex">{doc.status.replace(/-/g, " ")}</Badge>
                  <Button variant="ghost" size="icon-sm" aria-label="Download"><Download className="size-4" /></Button>
                </div>
              </div>
            ))}
          </DashCardContent>
        </DashCard>
      ))}
    </div>
  );
}

// ─── main page ───────────────────────────────────────────────────────────────

export default function ClientDetailPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const client = getClientById(params.id);
  if (!client) notFound();

  const tabFromUrl = searchParams.get("tab");
  const initialTab =
    tabFromUrl && TABS.includes(tabFromUrl as Tab) ? (tabFromUrl as Tab) : "Overview";

  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const clientSessions = advisorSessions.filter((s) => s.clientId === params.id);
  const clientTasks = advisorTasks.filter((t) => t.clientId === params.id);

  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-6">
      {/* Back */}
      <Link
        href="/advisors/dashboard/clients"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All clients
      </Link>

      {/* Client header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="size-14">
            <AvatarFallback className="bg-sidebar text-sidebar-foreground text-lg font-medium">
              {client.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <H1 className="leading-none">{client.name}</H1>
              <Badge variant={client.status === "Active" ? "secondary" : client.status === "Onboarding" ? "default" : "outline"}>
                {client.status}
              </Badge>
              {client.flags.map((f) => <Badge key={f} variant="outline">{f}</Badge>)}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {[{ icon: Mail, text: client.email }, { icon: Phone, text: client.phone }, { icon: MapPin, text: client.location }, { icon: Calendar, text: `Client since ${client.onboardedDate}` }].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Icon className="size-3.5" />{text}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <LogNoteSheet clientName={client.name} />
          <PostInsightSheet clientName={client.name} />
          <ScheduleSessionSheet preselectedClientId={client.id} />
        </div>
      </div>

      {/* Tabs */}
      <TabBar active={activeTab} onChange={setActiveTab} />

      {/* Content */}
      <div className="pb-12">
        {activeTab === "Overview"        && <OverviewPanel client={client} clientSessions={clientSessions} clientTasks={clientTasks} />}
        {activeTab === "Portfolio"       && <PortfolioPanel />}
        {activeTab === "Goals"           && <GoalsPanel clientName={client.name} />}
        {activeTab === "Wealth Plan"     && <WealthPlanPanel />}
        {activeTab === "Legacy"          && <AdvisorLegacyPanel clientName={client.name} />}
        {activeTab === "Liabilities"     && <LiabilitiesPanel />}
        {activeTab === "Sessions"        && (
          <AdvisorSessionsPanel
            clientName={client.name}
            clientId={client.id}
            clientSessions={clientSessions}
          />
        )}
        {activeTab === "Concierge"       && <AdvisorConciergePanel clientName={client.name} />}
        {activeTab === "Tasks"           && <TasksPanel clientTasks={clientTasks} clientName={client.name} />}
        {activeTab === "Documents"       && <DocumentsPanel />}
        {activeTab === "Advisor Insights"&& <AdvisorInsightsPanel clientName={client.name} />}
      </div>
    </div>
  );
}

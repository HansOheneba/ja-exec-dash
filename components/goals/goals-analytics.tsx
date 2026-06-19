"use client";

import {
  DashCard,
  DashCardContent,
  DashCardDescription,
  DashCardHeader,
  DashCardTitle,
} from "@/components/ui/dash-card";
import { KpiItem, KpiStrip } from "@/components/ui/kpi-strip";
import { Progress } from "@/components/ui/progress";
import { Muted, TextSmall } from "@/components/ui/typography";
import { computeGoalsAnalytics } from "@/lib/data/goals-analytics";
import type { Goal, GoalStatus } from "@/lib/data/goals";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<GoalStatus, string> = {
  "on-track": "On track",
  ahead: "Ahead",
  "at-risk": "At risk",
  "in-progress": "In progress",
};

const STATUS_COLOR: Record<GoalStatus, string> = {
  "on-track": "bg-green-500",
  ahead: "bg-blue-500",
  "at-risk": "bg-amber-500",
  "in-progress": "bg-muted-foreground/50",
};

const PROB_TONE = (pct: number) =>
  pct >= 80 ? "text-green-600 dark:text-green-400"
  : pct >= 65 ? "text-amber-600 dark:text-amber-400"
  : "text-red-500 dark:text-red-400";

type GoalsAnalyticsSectionProps = {
  goals: Goal[];
  formatValue: (usd: number, opts?: { compact?: boolean }) => string;
};

function GoalsAnalyticsSection({ goals, formatValue }: GoalsAnalyticsSectionProps) {
  const a = computeGoalsAnalytics(goals);
  const onTrackTotal = a.onTrackCount + a.aheadCount;

  const statusRows = [
    { key: "on-track" as const, count: a.onTrackCount },
    { key: "ahead" as const, count: a.aheadCount },
    { key: "at-risk" as const, count: a.atRiskCount },
    { key: "in-progress" as const, count: a.inProgressCount },
  ].filter((row) => row.count > 0);

  return (
    <div className="flex flex-col gap-(--spacing-section)">
      <KpiStrip cols={5}>
        <KpiItem
          label="Total target"
          value={formatValue(a.totalTargetUSD, { compact: true })}
          subline={`Across ${goals.length} goals`}
          tone="neutral"
        />
        <KpiItem
          label="Total saved"
          value={formatValue(a.totalCurrentUSD, { compact: true })}
          subline={`${a.overallProgressPct}% of combined target`}
          tone="good"
        />
        <KpiItem
          label="Funding gap"
          value={formatValue(a.totalGapUSD, { compact: true })}
          subline="Remaining to all targets"
          tone={a.totalGapUSD > 0 ? "warning" : "good"}
        />
        <KpiItem
          label="Avg probability"
          value={`${a.avgProbabilityPct}%`}
          subline="Success likelihood"
          tone={a.avgProbabilityPct >= 75 ? "good" : a.avgProbabilityPct >= 60 ? "warning" : "danger"}
        />
        <KpiItem
          label="On track"
          value={`${onTrackTotal}/${goals.length}`}
          subline={a.atRiskCount > 0 ? `${a.atRiskCount} need attention` : "All goals healthy"}
          tone={a.atRiskCount > 0 ? "warning" : "good"}
        />
      </KpiStrip>

      <div className="grid grid-cols-1 gap-(--spacing-grid) lg:grid-cols-3">
        <DashCard className="lg:col-span-2">
          <DashCardHeader>
            <div>
              <DashCardTitle>Funding progress</DashCardTitle>
              <DashCardDescription>How far each goal is from its target</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent className="gap-4">
            {a.fundingByGoal.map((row) => (
              <div key={row.id} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <TextSmall className="truncate font-medium">{row.name}</TextSmall>
                    <Muted className="text-[11px]">{row.category}</Muted>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className={cn("size-2 rounded-full", STATUS_COLOR[row.status])}
                      title={STATUS_LABEL[row.status]}
                    />
                    <TextSmall className="font-numeric font-semibold">{row.pct}%</TextSmall>
                  </div>
                </div>
                <Progress
                  value={row.pct}
                  className={cn("h-1.5", row.status === "at-risk" && "[&>div]:bg-amber-500")}
                />
              </div>
            ))}
          </DashCardContent>
        </DashCard>

        <div className="flex flex-col gap-(--spacing-grid) self-start">
          <DashCard className="h-auto">
            <DashCardHeader>
              <DashCardTitle>Status breakdown</DashCardTitle>
              <DashCardDescription>Goal health overview</DashCardDescription>
            </DashCardHeader>
            <DashCardContent className="gap-3">
              {statusRows.map((row) => {
                const pct = Math.round((row.count / goals.length) * 100);
                return (
                  <div key={row.key} className="flex items-center gap-3">
                    <span className={cn("size-2.5 shrink-0 rounded-full", STATUS_COLOR[row.key])} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <TextSmall className="font-medium">{STATUS_LABEL[row.key]}</TextSmall>
                        <TextSmall className="font-numeric font-semibold">{row.count}</TextSmall>
                      </div>
                      <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn("h-full rounded-full", STATUS_COLOR[row.key])}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </DashCardContent>
          </DashCard>

          <DashCard className="h-auto">
            <DashCardHeader>
              <DashCardTitle>Largest gaps</DashCardTitle>
              <DashCardDescription>Where additional funding is needed most</DashCardDescription>
            </DashCardHeader>
            <DashCardContent className="gap-3">
              {a.largestGaps.length > 0 ? (
                a.largestGaps.map((row) => (
                  <div
                    key={row.id}
                    className="flex items-start justify-between gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <TextSmall className="font-medium leading-snug">{row.name}</TextSmall>
                      <Muted className="text-[11px]">{row.pct}% funded</Muted>
                    </div>
                    <div className="shrink-0 text-right">
                      <TextSmall className="font-numeric font-semibold">
                        {formatValue(row.gapUSD, { compact: true })}
                      </TextSmall>
                      <Muted className={cn("text-[11px] font-numeric", PROB_TONE(row.probabilityPct))}>
                        {row.probabilityPct}% likely
                      </Muted>
                    </div>
                  </div>
                ))
              ) : (
                <Muted className="text-sm">All goals are fully funded.</Muted>
              )}
            </DashCardContent>
          </DashCard>
        </div>
      </div>
    </div>
  );
}

export { GoalsAnalyticsSection };

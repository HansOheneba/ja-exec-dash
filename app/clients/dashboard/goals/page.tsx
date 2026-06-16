"use client";

import Link from "next/link";
import {
  Building2,
  Globe,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Shield,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  DashCard,
  DashCardContent,
  DashCardDescription,
  DashCardHeader,
  DashCardTitle,
} from "@/components/ui/dash-card";
import { H1, Muted, TextSmall } from "@/components/ui/typography";
import { Progress } from "@/components/ui/progress";
import { useCurrency } from "@/lib/currency-context";
import { goals, type GoalStatus } from "@/lib/data/goals";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  Landmark, GraduationCap, Building2, Globe, HeartHandshake, Shield, TrendingUp,
};

const STATUS_CONFIG: Record<GoalStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  "on-track":    { label: "On track",    variant: "secondary"   },
  "ahead":       { label: "Ahead",       variant: "secondary"   },
  "at-risk":     { label: "At risk",     variant: "destructive" },
  "in-progress": { label: "In progress", variant: "outline"     },
};

export default function ClientGoalsPage() {
  const { format } = useCurrency();
  const onTrack = goals.filter(g => g.status === "on-track" || g.status === "ahead").length;

  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-1">
        <H1>My Goals</H1>
        <Muted>{onTrack} of {goals.length} goals on track. Your advisor reviews these each quarter.</Muted>
      </header>

      <div className="grid grid-cols-1 gap-(--spacing-grid) md:grid-cols-2 xl:grid-cols-3">
        {goals.map(goal => {
          const cfg = STATUS_CONFIG[goal.status];
          const GoalIcon = ICON_MAP[goal.iconName] ?? Landmark;
          const gap = goal.targetUSD - goal.currentUSD;
          const pct = Math.min(100, Math.round((goal.currentUSD / goal.targetUSD) * 100));

          return (
            <DashCard key={goal.id} className="flex flex-col">
              <DashCardHeader>
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                    <GoalIcon className="size-5 text-brand-primary" />
                  </div>
                  <div className="min-w-0">
                    <DashCardTitle className="leading-tight">{goal.name}</DashCardTitle>
                    <DashCardDescription>{goal.category}</DashCardDescription>
                  </div>
                </div>
                <Badge variant={cfg.variant}>{cfg.label}</Badge>
              </DashCardHeader>

              <DashCardContent className="flex flex-1 flex-col gap-4">
                {/* Progress bar */}
                <div className="space-y-1.5">
                  <Progress
                    value={pct}
                    className={cn("h-2", goal.status === "at-risk" && "[&>div]:bg-destructive")}
                  />
                  <div className="flex justify-between">
                    <Muted>{pct}% funded</Muted>
                    <Muted>{100 - pct}% remaining</Muted>
                  </div>
                </div>

                {/* Key figures */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Muted>Target</Muted>
                    <TextSmall className="font-medium font-numeric">{format(goal.targetUSD, { compact: true })}</TextSmall>
                  </div>
                  <div>
                    <Muted>Current</Muted>
                    <TextSmall className="font-medium font-numeric">{format(goal.currentUSD, { compact: true })}</TextSmall>
                  </div>
                  <div>
                    <Muted>Target date</Muted>
                    <TextSmall className="font-medium">{goal.targetDate}</TextSmall>
                  </div>
                  <div>
                    <Muted>Probability</Muted>
                    <TextSmall className={cn("font-medium font-numeric",
                      goal.probabilityPct >= 80 ? "text-brand-accent" : goal.probabilityPct >= 65 ? "text-amber-600" : "text-destructive"
                    )}>
                      {goal.probabilityPct}%
                    </TextSmall>
                  </div>
                </div>

                {gap > 0 && (
                  <div className="rounded-lg bg-muted/50 px-3 py-2.5">
                    <Muted>Funding gap</Muted>
                    <TextSmall className="font-medium font-numeric">{format(gap, { compact: true })}</TextSmall>
                  </div>
                )}

                {/* Advisor note */}
                <div className="border-t border-border/40 pt-3">
                  <Muted className="mb-1.5 font-medium">Advisor note</Muted>
                  <TextSmall className="leading-relaxed text-muted-foreground">{goal.advisorNote}</TextSmall>
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-2 pt-1">
                  <Link href="/clients/dashboard/messages" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1")}>
                    Request goal review
                  </Link>
                  {goal.jaService && goal.jaServiceHref && (
                    <Link href={goal.jaServiceHref} className={cn(buttonVariants({ size: "sm" }), "flex-1")}>
                      {goal.jaService}
                    </Link>
                  )}
                </div>
              </DashCardContent>
            </DashCard>
          );
        })}
      </div>
    </PageShell>
  );
}

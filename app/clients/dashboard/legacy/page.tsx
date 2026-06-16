"use client";

import Link from "next/link";
import { AlertTriangle, CheckCircle2, Circle, Clock, Heart } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DashCard,
  DashCardContent,
  DashCardDescription,
  DashCardHeader,
  DashCardTitle,
} from "@/components/ui/dash-card";
import { H1, Muted, TextSmall } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { useCurrency } from "@/lib/currency-context";
import { legacyProfile, type WillStatus, type SuccessionMilestone } from "@/lib/data/legacy";
import { cn } from "@/lib/utils";

const WILL_STATUS_CONFIG: Record<WillStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  "current":         { label: "Current",          variant: "secondary"  },
  "review-required": { label: "Review required",   variant: "destructive" },
  "not-in-place":    { label: "Not in place",      variant: "destructive" },
};

type MilestoneStatus = SuccessionMilestone["status"];
const MILESTONE_ICON: Record<MilestoneStatus, React.ElementType> = {
  completed:   CheckCircle2,
  "in-progress": Clock,
  pending:     Circle,
};
const MILESTONE_COLOR: Record<MilestoneStatus, string> = {
  completed:   "text-brand-accent",
  "in-progress": "text-amber-500",
  pending:     "text-muted-foreground/40",
};

export default function LegacyPage() {
  const { format } = useCurrency();
  const p = legacyProfile;
  const willCfg = WILL_STATUS_CONFIG[p.willStatus];

  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <H1>Legacy</H1>
          <Heart className="size-5 fill-brand-accent text-brand-accent" />
        </div>
        <Muted>Dependents, beneficiaries, trust structures, and succession planning.</Muted>
      </header>

      {/* Advisor note */}
      <DashCard className={cn(p.willStatus === "review-required" && "border-amber-200 bg-amber-50/50")}>
        <DashCardHeader>
          <div className="flex items-start gap-2">
            {p.willStatus === "review-required" && <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />}
            <div>
              <DashCardTitle>Advisor Note</DashCardTitle>
              <DashCardDescription>Jude Addo</DashCardDescription>
            </div>
          </div>
        </DashCardHeader>
        <DashCardContent>
          <TextSmall className="leading-relaxed text-muted-foreground">{p.advisorNote}</TextSmall>
          <Link href="/clients/dashboard/sessions" className={cn(buttonVariants({ size: "sm" }), "mt-4")}>
            Book estate planning session
          </Link>
        </DashCardContent>
      </DashCard>

      {/* Will + POA status */}
      <div className="grid grid-cols-1 gap-(--spacing-grid) sm:grid-cols-2">
        <DashCard>
          <DashCardHeader>
            <DashCardTitle>Will</DashCardTitle>
            <Badge variant={willCfg.variant}>{willCfg.label}</Badge>
          </DashCardHeader>
          <DashCardContent>
            <dl className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-4">
                <Muted>Last updated</Muted>
                <TextSmall className="font-medium">{p.willLastUpdated}</TextSmall>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <Muted>Solicitor</Muted>
                <TextSmall className="font-medium text-right">{p.willSolicitor}</TextSmall>
              </div>
            </dl>
            <Button variant="outline" size="sm" className="mt-4 w-full">Request will review</Button>
          </DashCardContent>
        </DashCard>

        <DashCard>
          <DashCardHeader>
            <DashCardTitle>Power of Attorney</DashCardTitle>
            <Badge variant={p.powerOfAttorney === "in-place" ? "secondary" : "destructive"}>
              {p.powerOfAttorney === "in-place" ? "In place" : "Not in place"}
            </Badge>
          </DashCardHeader>
          <DashCardContent>
            <dl className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-4">
                <Muted>POA holder</Muted>
                <TextSmall className="font-medium text-right">{p.poaHolder}</TextSmall>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <Muted>Type</Muted>
                <TextSmall className="font-medium">Lasting Power of Attorney</TextSmall>
              </div>
            </dl>
            <Button variant="outline" size="sm" className="mt-4 w-full">View document</Button>
          </DashCardContent>
        </DashCard>
      </div>

      {/* Dependents */}
      <DashCard>
        <DashCardHeader>
          <DashCardTitle>Dependents</DashCardTitle>
          <DashCardDescription>{p.dependents.length} registered</DashCardDescription>
        </DashCardHeader>
        <DashCardContent className="p-0">
          <div className="divide-y divide-border/40">
            {p.dependents.map(dep => (
              <div key={dep.id} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <TextSmall className="font-medium">{dep.name}</TextSmall>
                  <Muted>{dep.relation} · DOB: {dep.dateOfBirth}</Muted>
                  {dep.guardian && <Muted className="text-xs">Guardian: {dep.guardian}</Muted>}
                </div>
                {dep.notes && (
                  <TextSmall className="text-muted-foreground sm:max-w-xs sm:text-right">
                    {dep.notes}
                  </TextSmall>
                )}
              </div>
            ))}
          </div>
        </DashCardContent>
      </DashCard>

      {/* Beneficiary allocations */}
      <DashCard>
        <DashCardHeader>
          <DashCardTitle>Beneficiary Allocations</DashCardTitle>
          <DashCardDescription>Distribution of estate and trust assets</DashCardDescription>
        </DashCardHeader>
        <DashCardContent className="p-0">
          <div className="divide-y divide-border/40">
            {p.beneficiaries.map(b => (
              <div key={b.id} className="grid grid-cols-[1fr_auto] items-center gap-4 px-6 py-3.5">
                <div>
                  <TextSmall className="font-medium">{b.name}</TextSmall>
                  <Muted>{b.relation} · {b.instrument}</Muted>
                </div>
                <div className="text-right">
                  <p className="font-numeric text-xl font-bold">{b.allocationPct}%</p>
                  <Muted className="font-numeric">{format(legacyProfile.trustStructures[0].estimatedValueUSD * b.allocationPct / 100, { compact: true })}</Muted>
                </div>
              </div>
            ))}
          </div>
        </DashCardContent>
      </DashCard>

      {/* Trust structures */}
      <div>
        <DashCardTitle className="mb-4">Trust Structures</DashCardTitle>
        {p.trustStructures.map(trust => (
          <DashCard key={trust.id}>
            <DashCardHeader>
              <div>
                <DashCardTitle>{trust.name}</DashCardTitle>
                <DashCardDescription>{trust.type} · {trust.jurisdictionFormed} · Est. {trust.established}</DashCardDescription>
              </div>
              <Badge variant={trust.status === "active" ? "secondary" : "outline"} className="capitalize">
                {trust.status}
              </Badge>
            </DashCardHeader>
            <DashCardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <Muted>Estimated value</Muted>
                  <TextSmall className="font-medium font-numeric">{format(trust.estimatedValueUSD)}</TextSmall>
                </div>
                <div>
                  <Muted>Trustees</Muted>
                  {trust.trustees.map(t => (
                    <TextSmall key={t} className="block font-medium">{t}</TextSmall>
                  ))}
                </div>
                <div>
                  <Muted>Beneficiaries</Muted>
                  <TextSmall className="font-medium">{trust.beneficiaries.join(", ")}</TextSmall>
                </div>
              </div>
              <div className="mt-3 rounded-lg bg-muted/50 px-3 py-2.5">
                <TextSmall className="text-muted-foreground">{trust.notes}</TextSmall>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm">View trust deed</Button>
                <Link href="/clients/dashboard/documents" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  All legal documents
                </Link>
              </div>
            </DashCardContent>
          </DashCard>
        ))}
      </div>

      <Separator />

      {/* Succession milestones */}
      <div>
        <DashCardTitle className="mb-4">Succession Planning Milestones</DashCardTitle>
        <DashCard>
          <DashCardContent className="p-0">
            <div className="divide-y divide-border/40">
              {p.successionMilestones.map(milestone => {
                const Icon = MILESTONE_ICON[milestone.status];
                return (
                  <div key={milestone.id} className="flex items-start gap-4 px-6 py-4">
                    <Icon className={cn("mt-0.5 size-5 shrink-0", MILESTONE_COLOR[milestone.status])} />
                    <div className="flex-1 min-w-0">
                      <TextSmall className="font-medium">{milestone.title}</TextSmall>
                      <Muted>{milestone.targetDate}</Muted>
                      <TextSmall className="mt-0.5 text-muted-foreground">{milestone.notes}</TextSmall>
                    </div>
                    <Badge
                      variant={milestone.status === "completed" ? "secondary" : milestone.status === "in-progress" ? "default" : "outline"}
                      className="shrink-0 capitalize"
                    >
                      {milestone.status.replace("-", " ")}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </DashCardContent>
        </DashCard>
      </div>
    </PageShell>
  );
}

"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Clock,
  FileText,
  Shield,
  XCircle,
} from "lucide-react";

import { AddDependentSheet } from "@/components/advisors/add-dependent-sheet";
import { EditLegacyStatusSheet } from "@/components/advisors/edit-legacy-status-sheet";
import { EditMilestoneSheet } from "@/components/advisors/edit-milestone-sheet";
import { EditTrustSheet } from "@/components/advisors/edit-trust-sheet";
import { Button } from "@/components/ui/button";
import { H2, H3, H4, Lead, Muted, Numeric, Overline, TextSmall } from "@/components/ui/typography";
import {
  getBeneficiaryAllocationSummary,
  getLegacyHealthOverview,
  legacyProfile,
  type LegacyHealthStatus,
  type SuccessionMilestone,
} from "@/lib/data/legacy";
import { cn } from "@/lib/utils";

const HEALTH_STATUS_STYLE: Record<LegacyHealthStatus, { ring: string; badge: string }> = {
  healthy: { ring: "text-emerald-600", badge: "border-emerald-200/60 bg-emerald-50/80 text-emerald-900" },
  warning: { ring: "text-amber-600", badge: "border-amber-200/60 bg-amber-50/80 text-amber-900" },
  critical: { ring: "text-red-600", badge: "border-red-200/60 bg-red-50/80 text-red-900" },
};

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}m`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n.toLocaleString()}`;
}

function ReadinessRing({ score, status }: { score: number; status: LegacyHealthStatus }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const style = HEALTH_STATUS_STYLE[status];

  return (
    <div className="relative size-28 shrink-0">
      <svg className="size-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
        <circle cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/40" />
        <circle cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className={style.ring} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Numeric className="text-[1.6rem]">{score}</Numeric>
        <Overline className="mt-0.5 text-[10px]">Readiness</Overline>
      </div>
    </div>
  );
}

type MilestoneStatus = SuccessionMilestone["status"];
const MILESTONE_DOT: Record<MilestoneStatus, string> = {
  completed: "bg-brand-accent",
  "in-progress": "bg-amber-500",
  pending: "bg-muted-foreground/30",
};

function AdvisorLegacyPanel({ clientName }: { clientName: string }) {
  const l = legacyProfile;
  const health = getLegacyHealthOverview(l);
  const summary = getBeneficiaryAllocationSummary(l);
  const style = HEALTH_STATUS_STYLE[health.status];
  const [trustsExpanded, setTrustsExpanded] = useState(false);
  const [beneficiariesExpanded, setBeneficiariesExpanded] = useState(false);
  const previewCount = 2;

  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-2xl border border-border/20 bg-linear-to-br from-card via-card to-muted/15 px-6 py-7 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Overline className="mb-2 block">Legacy health · {clientName}</Overline>
            <H3 className="mb-2">{health.statusLabel}</H3>
            <span className={cn("inline-flex rounded-full border px-3 py-1.5 text-body-sm font-medium", style.badge)}>
              {health.readinessScorePct}% readiness
            </span>
          </div>
          <ReadinessRing score={health.readinessScorePct} status={health.status} />
        </div>
        {health.risks.length > 0 ? (
          <ul className="mt-6 flex flex-col gap-2 border-t border-border/30 pt-5">
            {health.risks.map((risk) => (
              <li key={risk} className="flex items-start gap-2 text-body-sm">
                <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-600" />
                {risk}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <H2 className="text-h3">Legal foundation</H2>
          <EditLegacyStatusSheet
            willStatus={l.willStatus}
            willLastUpdated={l.willLastUpdated}
            willSolicitor={l.willSolicitor}
            powerOfAttorney={l.powerOfAttorney}
            poaHolder={l.poaHolder}
          />
        </div>
        <div className="overflow-hidden rounded-2xl border border-border/25 bg-card">
          <div className="grid grid-cols-1 divide-y divide-border/30 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            <div className="px-5 py-5 sm:px-6">
              <div className="mb-3 flex items-center gap-2">
                <Shield className="size-4 text-brand-accent" />
                <H4 className="text-body">Will</H4>
              </div>
              <TextSmall className="font-medium capitalize">{l.willStatus.replace(/-/g, " ")}</TextSmall>
              <Muted className="mt-2 text-body-sm">Updated {l.willLastUpdated} · {l.willSolicitor}</Muted>
            </div>
            <div className="px-5 py-5 sm:px-6">
              <H4 className="mb-3 text-body">Power of attorney</H4>
              <TextSmall className="font-medium capitalize">{l.powerOfAttorney.replace(/-/g, " ")}</TextSmall>
              <Muted className="mt-2 text-body-sm">Holder: {l.poaHolder}</Muted>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <H2 className="text-h3">Beneficiary impact</H2>
            <Muted className="text-body-sm">{summary.totalPct}% allocated across {summary.beneficiaryCount} beneficiaries</Muted>
          </div>
          <AddDependentSheet mode="beneficiary" />
        </div>
        <div className="rounded-2xl border border-border/25 bg-card px-5 py-6 sm:px-6">
          {(beneficiariesExpanded ? l.beneficiaries : l.beneficiaries.slice(0, previewCount)).map((b, i) => (
            <div key={b.id} className={cn("flex items-center justify-between gap-4 py-3", i > 0 && "border-t border-border/20")}>
              <div>
                <TextSmall className="font-semibold">{b.name}</TextSmall>
                <Muted className="text-body-sm">{b.relation} · {b.instrument}</Muted>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-numeric text-xl font-bold">{b.allocationPct}%</span>
                <button type="button" className="text-xs text-muted-foreground hover:text-destructive">Remove</button>
              </div>
            </div>
          ))}
          {l.beneficiaries.length > previewCount ? (
            <Button variant="ghost" size="sm" className="mt-2 gap-2 px-0" onClick={() => setBeneficiariesExpanded((v) => !v)}>
              {beneficiariesExpanded ? "Show fewer" : "View all beneficiaries"}
              {beneficiariesExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </Button>
          ) : null}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <H2 className="text-h3">Dependents</H2>
          <AddDependentSheet mode="dependent" />
        </div>
        <div className="rounded-xl border border-border/20 bg-muted/10 divide-y divide-border/20">
          {l.dependents.map((d) => (
            <div key={d.id} className="flex items-center justify-between gap-4 px-5 py-3">
              <div>
                <TextSmall className="font-medium">{d.name}</TextSmall>
                <Muted className="text-body-sm">{d.relation} · DOB {d.dateOfBirth}</Muted>
              </div>
              <button type="button" className="text-xs text-muted-foreground hover:text-destructive">Remove</button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <H2 className="text-h3">Trust structures</H2>
          <Button variant="ghost" size="sm" className="gap-2" onClick={() => setTrustsExpanded((v) => !v)}>
            {trustsExpanded ? "Collapse" : "Expand"}
            {trustsExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </Button>
        </div>
        {trustsExpanded ? (
          <div className="flex flex-col gap-4">
            {l.trustStructures.map((t) => (
              <div key={t.id} className="rounded-xl border border-border/20 bg-card px-5 py-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <TextSmall className="font-semibold">{t.name}</TextSmall>
                    <Muted className="text-body-sm">{t.type} · {fmt(t.estimatedValueUSD)}</Muted>
                  </div>
                  <EditTrustSheet trust={t} />
                </div>
                <Muted className="mt-3 text-body-sm">{t.notes}</Muted>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border/20 bg-muted/10 px-5 py-4">
            {l.trustStructures.map((t) => (
              <div key={t.id} className="flex items-center gap-3">
                <FileText className="size-4 text-muted-foreground" />
                <TextSmall className="font-medium">{t.name}</TextSmall>
                <Muted className="text-body-sm">· {fmt(t.estimatedValueUSD)}</Muted>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <H2 className="text-h3">Succession timeline</H2>
          <EditMilestoneSheet mode="add" />
        </div>
        <div className="relative pl-1">
          <div className="absolute bottom-2 left-[5px] top-2 w-px bg-border/60" aria-hidden />
          <ul>
            {l.successionMilestones.map((m) => (
              <li key={m.id} className="relative flex gap-5 pb-7 last:pb-0">
                <span className={cn("relative z-10 mt-1.5 size-[11px] shrink-0 rounded-full border-2 border-card", MILESTONE_DOT[m.status])} />
                <div className="min-w-0 flex-1">
                  <TextSmall className="font-semibold">{m.title}</TextSmall>
                  <Overline className="mt-1 block">{m.targetDate}</Overline>
                  <Muted className="mt-1 text-body-sm">{m.notes}</Muted>
                </div>
                <EditMilestoneSheet mode="edit" milestone={m} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-amber-200/40 bg-amber-50/30 px-6 py-6">
        <Overline className="mb-2 block text-amber-800/90">Client-facing advisor note</Overline>
        <Lead className="text-foreground/85">{l.advisorNote}</Lead>
        <Button variant="outline" size="sm" className="mt-4">Edit advisor note</Button>
      </section>
    </div>
  );
}

export { AdvisorLegacyPanel };

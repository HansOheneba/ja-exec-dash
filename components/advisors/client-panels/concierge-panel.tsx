"use client";

import {
  Briefcase,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Gavel,
  Globe,
  Home,
  Plane,
  Shield,
  Sparkles,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { H2, H3, H4, Lead, Muted, Overline, TextSmall } from "@/components/ui/typography";
import {
  activeRequests,
  exclusiveEvents,
  getConciergeOverview,
  partnerCategories,
  serviceCategories,
} from "@/lib/data/concierge";

const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  CreditCard,
  Gavel,
  Car,
  Plane,
  Sparkles,
  Home,
  Shield,
  Briefcase,
};

function WorkflowProgress({ pct }: { pct: number }) {
  return (
    <div className="mt-3">
      <div className="mb-1 flex justify-between">
        <Overline>Progress</Overline>
        <TextSmall className="font-numeric font-semibold">{pct}%</TextSmall>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted/50">
        <div className="h-full rounded-full bg-brand-accent" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function AdvisorConciergePanel({ clientName }: { clientName: string }) {
  const overview = getConciergeOverview();
  const attention = activeRequests.filter((r) => r.requiresAttention);
  const inProgress = activeRequests.filter((r) => r.status !== "completed" && !r.requiresAttention);
  const completed = activeRequests.filter((r) => r.status === "completed");
  const [showCompleted, setShowCompleted] = useState(false);
  const featured = exclusiveEvents.find((e) => e.featured) ?? exclusiveEvents[0];

  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-2xl border border-border/20 bg-linear-to-br from-card via-card to-muted/15 px-6 py-7 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Overline className="mb-2 block">Concierge desk · {clientName}</Overline>
            <H3 className="mb-3">Manage client workflows and access</H3>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-border/40 px-3 py-1.5 text-body-sm font-medium">{overview.activeCount} Active</span>
              {overview.attentionCount > 0 ? (
                <span className="rounded-full border border-amber-200/60 bg-amber-50/80 px-3 py-1.5 text-body-sm font-medium text-amber-900">
                  {overview.attentionCount} Need client action
                </span>
              ) : null}
            </div>
          </div>
          <Button size="sm">New service request</Button>
        </div>
      </section>

      {attention.length > 0 ? (
        <section>
          <H2 className="mb-2 text-h3">Requires client attention</H2>
          <Muted className="mb-6 text-body-sm">Update status, progress, and next steps visible in the client portal.</Muted>
          <div className="flex flex-col gap-4">
            {attention.map((req) => {
              const Icon = ICON_MAP[req.iconName] ?? Globe;
              return (
                <article key={req.id} className="rounded-2xl border border-amber-200/50 bg-amber-50/35 px-6 py-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-amber-100/80">
                        <Icon className="size-5 text-amber-800" />
                      </div>
                      <div>
                        <H4>{req.title}</H4>
                        <Muted className="text-body-sm">Officer {req.officer} · {req.category}</Muted>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Update workflow</Button>
                  </div>
                  {req.nextStep ? (
                    <div className="mt-4 rounded-lg bg-background/60 px-3 py-2.5">
                      <Overline className="mb-1 block">Next step (client-facing)</Overline>
                      <TextSmall className="font-medium">{req.nextStep}</TextSmall>
                    </div>
                  ) : null}
                  {req.progressPct !== undefined ? <WorkflowProgress pct={req.progressPct} /> : null}
                  <Muted className="mt-3 text-body-sm">{req.notes}</Muted>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {inProgress.length > 0 ? (
        <section>
          <H2 className="mb-6 text-h3">In progress</H2>
          <div className="flex flex-col gap-4">
            {inProgress.map((req) => {
              const Icon = ICON_MAP[req.iconName] ?? Globe;
              return (
                <article key={req.id} className="rounded-xl border border-border/25 bg-card px-5 py-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <Icon className="mt-1 size-5 text-brand-primary" />
                      <div>
                        <TextSmall className="font-semibold">{req.title}</TextSmall>
                        <Muted className="text-body-sm">{req.officer} · {req.status}</Muted>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Update</Button>
                  </div>
                  {req.progressPct !== undefined ? <WorkflowProgress pct={req.progressPct} /> : null}
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {completed.length > 0 ? (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <H2 className="text-h3">Completed</H2>
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => setShowCompleted((v) => !v)}>
              {showCompleted ? "Hide" : "Show"}
              {showCompleted ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </Button>
          </div>
          {showCompleted ? (
            <div className="flex flex-col gap-3">
              {completed.map((req) => (
                <div key={req.id} className="rounded-xl border border-border/20 bg-muted/10 px-5 py-4">
                  <TextSmall className="font-medium">{req.title}</TextSmall>
                  <Muted className="text-body-sm">{req.notes}</Muted>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-xl border border-border/20 bg-muted/10 px-5 py-4">
              <CheckCircle2 className="size-4 text-brand-accent" />
              <Muted className="text-body-sm">{completed.length} completed workflow(s)</Muted>
            </div>
          )}
        </section>
      ) : null}

      <section>
        <H2 className="mb-2 text-h3">Service catalog</H2>
        <Muted className="mb-6 text-body-sm">Services available to this client in the concierge portal.</Muted>
        <div className="flex flex-col gap-6">
          {serviceCategories.map((cat) => (
            <div key={cat.heading}>
              <H4 className="mb-3">{cat.heading}</H4>
              <div className="rounded-xl border border-border/20 bg-card divide-y divide-border/20">
                {cat.services.map((svc) => (
                  <div key={svc.label} className="flex items-center justify-between gap-4 px-5 py-3">
                    <div>
                      <TextSmall className="font-medium">{svc.label}</TextSmall>
                      <Muted className="text-body-sm">{svc.description}</Muted>
                    </div>
                    <Button size="sm" variant="ghost">Initiate</Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <H2 className="mb-6 text-h3">Opportunities and access</H2>
        <article className="rounded-2xl border border-border/25 bg-card px-6 py-6">
          <div className="mb-2 flex items-center gap-2">
            <BadgeFeatured />
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
          </div>
          <H4>{featured.title}</H4>
          <Muted className="mt-1 text-body-sm">{featured.date} · {featured.location}</Muted>
          <Lead className="mt-3 text-foreground/80">{featured.description}</Lead>
          <Button size="sm" className="mt-4">Manage opportunity</Button>
        </article>
      </section>

      <section>
        <H2 className="mb-6 text-h3">Partner introductions</H2>
        <div className="rounded-xl border border-border/20 bg-card divide-y divide-border/20">
          {partnerCategories.map((cat) => (
            <div key={cat.label} className="px-5 py-4">
              <div className="mb-2 flex items-center gap-2">
                <Users className="size-4 text-brand-accent" />
                <TextSmall className="font-semibold">{cat.label}</TextSmall>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.partners.map((p) => (
                  <span key={p} className="rounded-full border border-border/40 bg-muted/20 px-3 py-1 text-caption font-medium">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function BadgeFeatured() {
  return (
    <span className="rounded-full border border-border/40 bg-muted/30 px-2.5 py-0.5 text-caption font-medium">
      Featured
    </span>
  );
}

export { AdvisorConciergePanel };

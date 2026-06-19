"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Download,
} from "lucide-react";

import { ScheduleSessionSheet } from "@/components/advisors/schedule-session-sheet";
import { Button } from "@/components/ui/button";
import { H2, H3, H4, Lead, Muted, Overline, TextSmall } from "@/components/ui/typography";
import type { AdvisorSession } from "@/lib/data/advisor-sessions";
import {
  DOMAIN_LABEL,
  getSessionsOverview,
  pastSessions,
  upcomingSessions,
  type AdvisoryDomain,
  type PastSession,
  type Session,
} from "@/lib/data/sessions";
import { cn } from "@/lib/utils";

const DOMAIN_TONE: Record<AdvisoryDomain, string> = {
  portfolio: "border-brand-primary/30 bg-brand-primary/5 text-brand-primary",
  legacy: "border-amber-200/60 bg-amber-50/70 text-amber-900",
  tax: "border-slate-200/60 bg-slate-50/70 text-slate-800",
  concierge: "border-brand-accent/30 bg-brand-accent/8 text-brand-accent",
  general: "border-border/40 bg-muted/30 text-foreground/80",
};

function DomainBadge({ domain }: { domain: AdvisoryDomain }) {
  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-caption font-medium", DOMAIN_TONE[domain])}>
      {DOMAIN_LABEL[domain]}
    </span>
  );
}

function AdvisorUpcomingCard({ session, emphasis }: { session: Session; emphasis: "preparation" | "default" }) {
  const domain = session.domain ?? "general";
  return (
    <article className={cn("rounded-2xl border px-6 py-6", emphasis === "preparation" ? "border-amber-200/50 bg-amber-50/35" : "border-border/30 bg-card")}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {emphasis === "preparation" ? <Overline className="mb-1.5 block text-amber-800/90">Client preparation required</Overline> : null}
          <H4>{session.type}</H4>
          <Muted className="mt-1 text-body-sm">{session.date}, {session.time} · {session.format}</Muted>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <DomainBadge domain={domain} />
          <span className="text-caption font-semibold uppercase text-muted-foreground">{session.status}</span>
        </div>
      </div>
      {session.purpose ? (
        <div className="mt-4">
          <Overline className="mb-1 block">Purpose</Overline>
          <TextSmall className="text-muted-foreground">{session.purpose}</TextSmall>
        </div>
      ) : null}
      {session.expectedOutcome ? (
        <div className="mt-3 rounded-lg bg-background/60 px-3 py-2.5">
          <Overline className="mb-1 block">Expected outcome</Overline>
          <TextSmall className="font-medium">{session.expectedOutcome}</TextSmall>
        </div>
      ) : null}
      {session.preparationNotes ? (
        <div className="mt-3">
          <Overline className="mb-1 block">Preparation notes (client-facing)</Overline>
          <Muted className="text-body-sm">{session.preparationNotes}</Muted>
        </div>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" variant="outline">Edit session</Button>
        <Button size="sm" variant="ghost">Add outcome notes</Button>
      </div>
    </article>
  );
}

function AdvisorOutcomeCard({ session }: { session: PastSession }) {
  const [expanded, setExpanded] = useState(false);
  const domain = session.domain ?? "general";

  return (
    <article className="rounded-xl border border-border/20 bg-card px-5 py-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <DomainBadge domain={domain} />
            <Overline>{session.date}</Overline>
          </div>
          <TextSmall className="font-semibold">{session.type}</TextSmall>
          <Muted className="mt-2 text-body-sm">{session.advisorSummary ?? session.outcome}</Muted>
        </div>
        {session.hasMinutes ? (
          <Button variant="outline" size="sm" className="shrink-0 gap-1.5">
            <Download className="size-3.5" />
            Minutes
          </Button>
        ) : null}
      </div>
      {(session.decisions?.length ?? 0) > 0 ? (
        <>
          <Button variant="ghost" size="sm" className="mt-3 gap-2 px-0 text-brand-primary hover:bg-transparent" onClick={() => setExpanded((v) => !v)}>
            {expanded ? "Hide outcomes" : "Edit outcomes"}
            {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </Button>
          {expanded ? (
            <div className="mt-4 grid gap-4 border-t border-border/30 pt-4 sm:grid-cols-3">
              {session.decisions ? (
                <div>
                  <Overline className="mb-2 block">Decisions</Overline>
                  {session.decisions.map((d) => (
                    <TextSmall key={d} className="mb-1 block">{d}</TextSmall>
                  ))}
                </div>
              ) : null}
              {session.actionsTriggered ? (
                <div>
                  <Overline className="mb-2 block">Actions triggered</Overline>
                  {session.actionsTriggered.map((a) => (
                    <TextSmall key={a} className="mb-1 block text-muted-foreground">{a}</TextSmall>
                  ))}
                </div>
              ) : null}
              <div className="flex items-end">
                <Button size="sm" variant="outline">Save outcomes</Button>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </article>
  );
}

function FirmSessionRow({ session }: { session: AdvisorSession }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/20 py-4 last:border-0">
      <div>
        <TextSmall className="font-semibold">{session.type}</TextSmall>
        <Muted className="text-body-sm">{session.date} at {session.time} · {session.duration}</Muted>
        {session.agenda ? <Muted className="mt-1 text-body-sm">Agenda: {session.agenda}</Muted> : null}
        {session.notes ? <Muted className="mt-1 text-body-sm">{session.notes}</Muted> : null}
      </div>
      <span className="shrink-0 text-caption font-medium capitalize text-muted-foreground">{session.status}</span>
    </div>
  );
}

function AdvisorSessionsPanel({
  clientName,
  clientId,
  clientSessions,
}: {
  clientName: string;
  clientId: string;
  clientSessions: AdvisorSession[];
}) {
  const overview = getSessionsOverview();
  const useRichData = clientId === "lois-lane";
  const prepSessions = useRichData ? upcomingSessions.filter((s) => s.requiresPreparation) : [];
  const otherUpcoming = useRichData ? upcomingSessions.filter((s) => !s.requiresPreparation) : [];
  const firmUpcoming = clientSessions.filter((s) => s.status === "upcoming");
  const firmPast = clientSessions.filter((s) => s.status !== "upcoming");

  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-2xl border border-border/20 bg-linear-to-br from-card via-card to-muted/15 px-6 py-7 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Overline className="mb-2 block">Advisory sessions · {clientName}</Overline>
            <H3 className="mb-3">Next: {overview.nextSessionType}</H3>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-border/40 px-3 py-1.5 text-body-sm font-medium">
                {useRichData ? overview.upcomingCount : firmUpcoming.length} Upcoming
              </span>
              {overview.preparationCount > 0 && useRichData ? (
                <span className="rounded-full border border-amber-200/60 bg-amber-50/80 px-3 py-1.5 text-body-sm font-medium text-amber-900">
                  {overview.preparationCount} Need prep
                </span>
              ) : null}
            </div>
            <Muted className="mt-3 text-body-sm">Last outcome: {overview.lastOutcome}</Muted>
          </div>
          <ScheduleSessionSheet preselectedClientId={clientId} />
        </div>
      </section>

      {useRichData ? (
        <>
          {prepSessions.length > 0 ? (
            <section>
              <H2 className="mb-2 text-h3">Requires client preparation</H2>
              <Muted className="mb-6 text-body-sm">Edit purpose, outcomes, and prep notes before the client sees them.</Muted>
              <div className="flex flex-col gap-4">
                {prepSessions.map((s) => (
                  <AdvisorUpcomingCard key={s.id} session={s} emphasis="preparation" />
                ))}
              </div>
            </section>
          ) : null}

          {otherUpcoming.length > 0 ? (
            <section>
              <H2 className="mb-6 text-h3">Upcoming sessions</H2>
              <div className="flex flex-col gap-4">
                {otherUpcoming.map((s) => (
                  <AdvisorUpcomingCard key={s.id} session={s} emphasis="default" />
                ))}
              </div>
            </section>
          ) : null}

          <section>
            <H2 className="mb-6 text-h3">Advisory outcomes</H2>
            <div className="flex flex-col gap-4">
              {pastSessions.map((s) => (
                <AdvisorOutcomeCard key={s.id} session={s} />
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          {firmUpcoming.length > 0 ? (
            <section>
              <H2 className="mb-6 text-h3">Upcoming sessions</H2>
              <div className="rounded-xl border border-border/20 bg-card px-5">
                {firmUpcoming.map((s) => (
                  <FirmSessionRow key={s.id} session={s} />
                ))}
              </div>
            </section>
          ) : (
            <Muted className="rounded-xl border border-border/20 bg-muted/10 px-5 py-6 text-center">
              No upcoming sessions. Schedule one above.
            </Muted>
          )}

          {firmPast.length > 0 ? (
            <section>
              <H2 className="mb-6 text-h3">Session history</H2>
              <div className="rounded-xl border border-border/20 bg-muted/10 px-5">
                {firmPast.map((s) => (
                  <FirmSessionRow key={s.id} session={s} />
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}

export { AdvisorSessionsPanel };

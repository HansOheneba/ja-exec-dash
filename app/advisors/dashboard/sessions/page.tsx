"use client";

import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  XCircle,
} from "lucide-react";

import { ScheduleSessionSheet } from "@/components/advisors/schedule-session-sheet";
import { DashboardGrid, PageShell } from "@/components/layout/page-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DashCard,
  DashCardContent,
  DashCardDescription,
  DashCardHeader,
  DashCardTitle,
} from "@/components/ui/dash-card";
import { KpiItem, KpiStrip } from "@/components/ui/kpi-strip";
import { H1, Muted, TextSmall } from "@/components/ui/typography";
import { advisorSessions, type SessionStatus } from "@/lib/data/advisor-sessions";

const STATUS_ICON: Record<SessionStatus, React.ElementType> = {
  upcoming: Clock,
  completed: CheckCircle2,
  cancelled: XCircle,
};

const STATUS_BADGE: Record<SessionStatus, "default" | "secondary" | "outline"> = {
  upcoming: "default",
  completed: "secondary",
  cancelled: "outline",
};

function StatusBadge({ status }: { status: SessionStatus }) {
  return (
    <Badge variant={STATUS_BADGE[status]} className="capitalize">
      {status}
    </Badge>
  );
}

export default function AdvisorSessionsPage() {
  const upcoming = advisorSessions.filter((s) => s.status === "upcoming");
  const completed = advisorSessions.filter((s) => s.status === "completed");
  const cancelled = advisorSessions.filter((s) => s.status === "cancelled");

  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <H1>Sessions</H1>
          <Muted>
            {upcoming.length} upcoming, {completed.length} completed
          </Muted>
        </div>
        <ScheduleSessionSheet />
      </header>

      <KpiStrip>
        <KpiItem
          label="Upcoming"
          value={String(upcoming.length)}
          change="Next 2 weeks"
          trend="neutral"
        />
        <KpiItem
          label="Completed"
          value={String(completed.length)}
          change="This quarter"
          trend="up"
        />
        <KpiItem
          label="Cancelled"
          value={String(cancelled.length)}
          change="Needs rescheduling"
          trend={cancelled.length > 0 ? "down" : "neutral"}
        />
        <KpiItem
          label="Total Sessions"
          value={String(advisorSessions.length)}
          change="All time"
          trend="neutral"
        />
      </KpiStrip>

      <DashboardGrid>
        <DashCard span="full">
          <DashCardHeader>
            <div>
              <DashCardTitle>Upcoming Sessions</DashCardTitle>
              <DashCardDescription>Scheduled sessions with clients</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent className="gap-4">
            {upcoming.length === 0 && (
              <Muted className="py-4 text-center">No upcoming sessions scheduled.</Muted>
            )}
            {upcoming.map((session) => (
              <div
                key={session.id}
                className="flex items-start gap-4 border-b border-border/60 pb-4 last:border-0 last:pb-0"
              >
                <Avatar size="sm">
                  <AvatarFallback className="bg-muted text-xs font-medium">
                    {session.clientInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <TextSmall className="font-medium">{session.clientName}</TextSmall>
                    <Link
                      href={`/advisors/dashboard/clients/${session.clientId}`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`View ${session.clientName}`}
                    >
                      <ExternalLink className="size-3" />
                    </Link>
                    <Badge variant="outline" className="text-xs">
                      {session.type}
                    </Badge>
                  </div>
                  <Muted>
                    {session.date} at {session.time} · {session.duration}
                  </Muted>
                  {session.agenda && (
                    <TextSmall className="mt-1 text-muted-foreground">
                      Agenda: {session.agenda}
                    </TextSmall>
                  )}
                </div>
                <StatusBadge status={session.status} />
              </div>
            ))}
          </DashCardContent>
        </DashCard>

        <DashCard span="full">
          <DashCardHeader>
            <div>
              <DashCardTitle>Past Sessions</DashCardTitle>
              <DashCardDescription>Completed and cancelled sessions</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent className="gap-4">
            {[...completed, ...cancelled]
              .sort((a, b) => {
                const parseDate = (d: string) => new Date(d.split(" ").reverse().join(" "));
                return parseDate(b.date).getTime() - parseDate(a.date).getTime();
              })
              .map((session) => {
                const Icon = STATUS_ICON[session.status];
                return (
                  <div
                    key={session.id}
                    className="flex items-start gap-4 border-b border-border/60 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                      <Icon
                        className={
                          session.status === "cancelled"
                            ? "size-4 text-muted-foreground"
                            : "size-4 text-brand-accent"
                        }
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <TextSmall className="font-medium">{session.clientName}</TextSmall>
                        <Link
                          href={`/advisors/dashboard/clients/${session.clientId}`}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                          aria-label={`View ${session.clientName}`}
                        >
                          <ExternalLink className="size-3" />
                        </Link>
                        <Badge variant="outline" className="text-xs">
                          {session.type}
                        </Badge>
                      </div>
                      <Muted>
                        {session.date} at {session.time} · {session.duration}
                      </Muted>
                      {session.notes && (
                        <TextSmall className="mt-1 text-muted-foreground">
                          {session.notes}
                        </TextSmall>
                      )}
                    </div>
                    <StatusBadge status={session.status} />
                  </div>
                );
              })}
          </DashCardContent>
        </DashCard>
      </DashboardGrid>
    </PageShell>
  );
}

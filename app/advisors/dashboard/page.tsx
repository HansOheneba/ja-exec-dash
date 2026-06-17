import Link from "next/link";
import { Users, ClipboardList, FileText, MessageSquare, Calendar } from "lucide-react";
import type { ActivityType } from "@/lib/data/advisor-overview";

import { DashboardGrid, PageShell } from "@/components/layout/page-shell";
import { buttonVariants } from "@/components/ui/button";
import { ClientDate } from "@/components/ui/client-date";
import {
  DashCard,
  DashCardContent,
  DashCardDescription,
  DashCardHeader,
  DashCardTitle,
} from "@/components/ui/dash-card";
import { KpiItem, KpiStrip } from "@/components/ui/kpi-strip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { H1, H2, Muted, TextSmall } from "@/components/ui/typography";
import { advisorOverview } from "@/lib/data/advisor-overview";
import { cn } from "@/lib/utils";

function formatGBP(n: number) {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}m`;
  return `£${n.toLocaleString("en-GB")}`;
}

const ACTIVITY_ICON: Record<ActivityType, React.ElementType> = {
  document: FileText,
  review: ClipboardList,
  request: MessageSquare,
  meeting: Calendar,
  note: MessageSquare,
};

export default function AdvisorDashboardPage() {
  const { recentActivity, upcomingSessions } = advisorOverview;

  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <H1>Good morning, Jude</H1>
          <ClientDate />
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/advisors/dashboard/clients"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <Users className="size-4" />
            View all clients
          </Link>
          <Link
            href="/advisors/dashboard/tasks"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            <ClipboardList className="size-4" />
            Open tasks
          </Link>
        </div>
      </header>

      <KpiStrip>
        <KpiItem
          label="Total AUM"
          value={formatGBP(advisorOverview.totalAum)}
          change="+2.8% this quarter"
          trend="up"
        />
        <KpiItem
          label="Active Clients"
          value={String(advisorOverview.activeClients)}
          change={`${advisorOverview.onboarding} onboarding, ${advisorOverview.reviewDue} pending review`}
          trend="neutral"
        />
        <KpiItem
          label="Open Tasks"
          value={String(advisorOverview.openTasks)}
          change="4 due this week"
          trend="neutral"
        />
        <KpiItem
          label="Attention Required"
          value={String(advisorOverview.attentionRequired)}
          change="Overdue reviews, unsigned documents"
          trend="down"
        />
      </KpiStrip>

      <DashboardGrid>
        <DashCard className="lg:col-span-2">
          <DashCardHeader>
            <div>
              <DashCardTitle>Recent Client Activity</DashCardTitle>
              <DashCardDescription>
                Latest updates across your book of business
              </DashCardDescription>
            </div>
            <Link
              href="/advisors/dashboard/clients"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "shrink-0 text-xs"
              )}
            >
              View all
            </Link>
          </DashCardHeader>
          <DashCardContent className="gap-4">
            {recentActivity.map((item) => {
              const Icon = ACTIVITY_ICON[item.type];
              return (
                <Link
                  key={item.client + item.time}
                  href={`/advisors/dashboard/clients/${item.clientId}`}
                  className="flex items-start gap-3 border-b border-border/60 pb-4 transition-colors hover:text-foreground last:border-0 last:pb-0"
                >
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
                    <Icon className="size-3.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <TextSmall className="font-medium">{item.client}</TextSmall>
                    <TextSmall className="text-muted-foreground">
                      {item.action}
                    </TextSmall>
                  </div>
                  <Muted className="shrink-0">{item.time}</Muted>
                </Link>
              );
            })}
          </DashCardContent>
        </DashCard>

        <DashCard>
          <DashCardHeader>
            <div>
              <DashCardTitle>Upcoming Sessions</DashCardTitle>
              <DashCardDescription>Next 2 weeks</DashCardDescription>
            </div>
            <Link
              href="/advisors/dashboard/sessions"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "shrink-0 text-xs"
              )}
            >
              View all
            </Link>
          </DashCardHeader>
          <DashCardContent className="gap-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.clientName + session.date}
                className="flex items-start gap-3 border-b border-border/60 pb-4 last:border-0 last:pb-0"
              >
                <Avatar size="sm">
                  <AvatarFallback className="bg-muted text-xs font-medium">
                    {session.clientInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <TextSmall className="font-medium">{session.clientName}</TextSmall>
                  <TextSmall className="text-muted-foreground">{session.type}</TextSmall>
                  <Muted>
                    {session.date} at {session.time}
                  </Muted>
                </div>
              </div>
            ))}
          </DashCardContent>
        </DashCard>
      </DashboardGrid>
    </PageShell>
  );
}

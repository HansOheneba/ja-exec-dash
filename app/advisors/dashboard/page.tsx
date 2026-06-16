import { Users, ClipboardList } from "lucide-react";

import { DashboardGrid, PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { ClientDate } from "@/components/ui/client-date";
import {
  DashCard,
  DashCardContent,
  DashCardDescription,
  DashCardHeader,
  DashCardTitle,
} from "@/components/ui/dash-card";
import { KpiItem, KpiStrip } from "@/components/ui/kpi-strip";
import { H1, Muted, TextSmall } from "@/components/ui/typography";

const recentActivity = [
  {
    client: "Lois Lane",
    action: "Requested succession planning review",
    time: "2 hours ago",
  },
  {
    client: "Marcus Webb",
    action: "Document uploaded: Q1 statement",
    time: "Yesterday",
  },
  {
    client: "Priya Nair",
    action: "Estate plan milestone reached: will review complete",
    time: "3 days ago",
  },
  {
    client: "Daniel Osei",
    action: "Missed quarterly check-in (rescheduled)",
    time: "5 days ago",
  },
];

export default function AdvisorDashboardPage() {
  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <H1>Good morning, Jude</H1>
          <ClientDate />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Users />
            View all clients
          </Button>
          <Button size="sm">
            <ClipboardList />
            Open tasks
          </Button>
        </div>
      </header>

      <KpiStrip>
        <KpiItem
          label="Total AUM"
          value="£48,740,000"
          change="+2.8% this quarter"
          trend="up"
        />
        <KpiItem
          label="Active Clients"
          value="24"
          change="3 onboarding, 2 pending review"
          trend="neutral"
        />
        <KpiItem
          label="Open Tasks"
          value="11"
          change="4 due this week"
          trend="neutral"
        />
        <KpiItem
          label="Attention Required"
          value="3"
          change="Overdue reviews, unsigned documents"
          trend="down"
        />
      </KpiStrip>

      <DashboardGrid>
        <DashCard span="full">
          <DashCardHeader>
            <div>
              <DashCardTitle>Recent Client Activity</DashCardTitle>
              <DashCardDescription>
                Latest updates across your book of business
              </DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent className="gap-4">
            {recentActivity.map((item) => (
              <div
                key={item.client + item.time}
                className="flex items-start justify-between gap-4 border-b border-border/60 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex flex-col gap-0.5">
                  <TextSmall className="font-medium">{item.client}</TextSmall>
                  <TextSmall className="text-muted-foreground">
                    {item.action}
                  </TextSmall>
                </div>
                <Muted className="shrink-0">{item.time}</Muted>
              </div>
            ))}
          </DashCardContent>
        </DashCard>
      </DashboardGrid>
    </PageShell>
  );
}

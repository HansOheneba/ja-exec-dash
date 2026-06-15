import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClientDate } from "@/components/ui/client-date";
import { Calendar } from "lucide-react";
import { DashboardGrid, PageShell } from "@/components/layout/page-shell";
import {
  DashCard,
  DashCardContent,
  DashCardDescription,
  DashCardHeader,
  DashCardTitle,
} from "@/components/ui/dash-card";
import { KpiItem, KpiStrip } from "@/components/ui/kpi-strip";
import { H1, Muted, TextSmall } from "@/components/ui/typography";

export default function ClientDashboardPage() {
  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <H1>Welcome back, Lois</H1>
          <ClientDate />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Calendar />
            Schedule
          </Button>
          <Button size="sm">Share Report</Button>
        </div>
      </header>

      {/* Portfolio breakdown - simple numeric metrics */}
      <KpiStrip>
        <KpiItem
          label="JA Wealth"
          value="£1,240,000"
          change="42% of portfolio"
          trend="up"
        />
        <KpiItem
          label="JA Realty"
          value="£826,000"
          change="28% of portfolio"
          trend="up"
        />
        <KpiItem
          label="JA Digital"
          value="£531,000"
          change="18% of portfolio"
          trend="up"
        />
        <KpiItem
          label="Pending Requests"
          value="2"
          change="Succession review, offshore banking"
          trend="neutral"
        />
      </KpiStrip>

      {/* Rich content cards */}
      <DashboardGrid>
        <DashCard span="wide">
          <DashCardHeader>
            <div>
              <DashCardTitle>Total Net Worth</DashCardTitle>
              <DashCardDescription>
                Across all JA Wealth managed assets
              </DashCardDescription>
            </div>
            <Badge variant="secondary">+4.2% this quarter</Badge>
          </DashCardHeader>
          <DashCardContent>
            <p className="font-numeric text-3xl font-semibold tracking-tight">
              £3,318,930.86
            </p>
            <div className="mt-6 flex h-28 items-end gap-1.5">
              {[40, 55, 45, 70, 60, 85, 75].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-md bg-brand-accent/80"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </DashCardContent>
        </DashCard>

        <DashCard>
          <DashCardHeader>
            <DashCardTitle>Legacy Planning</DashCardTitle>
          </DashCardHeader>
          <DashCardContent className="gap-3">
            <div className="flex items-center justify-between">
              <TextSmall>Estate plan review</TextSmall>
              <Badge>In progress</Badge>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-3/5 rounded-full bg-brand-accent" />
            </div>
            <TextSmall className="text-muted-foreground">
              60% complete. Next step with your advisor.
            </TextSmall>
          </DashCardContent>
        </DashCard>
      </DashboardGrid>

      {/* Full-width activity feed */}
      <DashCard>
        <DashCardHeader>
          <div>
            <DashCardTitle>Recent Activity</DashCardTitle>
            <DashCardDescription>
              Latest updates across your JA Group services
            </DashCardDescription>
          </div>
        </DashCardHeader>
        <DashCardContent className="gap-4">
          {[
            {
              title: "Quarterly portfolio review completed",
              date: "3 days ago",
            },
            {
              title: "New document uploaded: Trust deed amendment",
              date: "1 week ago",
            },
            {
              title: "Advisor meeting scheduled for succession planning",
              date: "2 weeks ago",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between border-b border-border/60 pb-4 last:border-0 last:pb-0"
            >
              <TextSmall>{item.title}</TextSmall>
              <Muted>{item.date}</Muted>
            </div>
          ))}
        </DashCardContent>
      </DashCard>
    </PageShell>
  );
}

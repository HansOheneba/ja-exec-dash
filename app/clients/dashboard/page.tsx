"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckSquare,
  Download,
  ExternalLink,
  TrendingUp,
} from "lucide-react";

import { DashboardGrid, PageShell } from "@/components/layout/page-shell";
import { AllocationPieChart } from "@/components/charts/asset-charts";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ClientDate } from "@/components/ui/client-date";
import {
  DashCard,
  DashCardContent,
  DashCardDescription,
  DashCardHeader,
  DashCardTitle,
} from "@/components/ui/dash-card";
import { KpiItem, KpiStrip } from "@/components/ui/kpi-strip";
import { Muted, TextSmall, H1 } from "@/components/ui/typography";
import { useCurrency } from "@/lib/currency-context";
import { clientOverview } from "@/lib/data/overview";
import { cn } from "@/lib/utils";

const { clientFirstName, portfolioValueUSD, aumWithJaUSD, cashPositionUSD, ytdPct, benchmarkYtdPct, inceptionPct, inceptionCostBasisUSD, allocationSlices, upcomingSession, openActionItems, latestAdvisorNote, recentDocument, marketPulse } = clientOverview;

export default function ClientDashboardPage() {
  const { format } = useCurrency();

  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      {/* Welcome banner */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-body-sm font-medium text-brand-accent">Prosper with Purpose</p>
          <H1>Good morning, {clientFirstName}.</H1>
          <ClientDate />
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/clients/dashboard/sessions" className={buttonVariants({ variant: "outline", size: "sm" })}>
            <CalendarDays className="size-4" />
            Schedule session
          </Link>
          <Link href="/clients/dashboard/advisor-insights" className={buttonVariants({ size: "sm" })}>
            View insights
          </Link>
        </div>
      </header>

      {/* KPI strip */}
      <KpiStrip>
        <KpiItem label="Total Net Worth"         value={format(portfolioValueUSD)} change={`+${inceptionPct}% since inception`} trend="up" emphasis="primary" />
        <KpiItem label="Total AUM with JA Wealth" value={format(aumWithJaUSD)}     change="Fully managed" trend="neutral" />
        <KpiItem label="Cash Position"            value={format(cashPositionUSD)}  change="15% of portfolio" trend="neutral" />
        <KpiItem label="YTD Performance"          value={`+${ytdPct}%`}            change={`vs +${benchmarkYtdPct}% benchmark`} trend="up" />
      </KpiStrip>

      {/* Middle row */}
      <div className="grid grid-cols-1 gap-(--spacing-grid) lg:grid-cols-3">
        {/* Allocation donut */}
        <DashCard>
          <DashCardHeader>
            <div>
              <DashCardTitle>Portfolio Allocation</DashCardTitle>
              <DashCardDescription>Current vs target strategy</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent>
            <AllocationPieChart data={allocationSlices} />
            <div className="mt-3 flex flex-col gap-2">
              {allocationSlices.map((a) => (
                <div key={a.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: a.color }} />
                    <TextSmall>{a.name}</TextSmall>
                  </div>
                  <TextSmall className="font-medium">{a.value}%</TextSmall>
                </div>
              ))}
            </div>
            <Link href="/clients/dashboard/portfolio" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4 w-full")}>
              View full portfolio
              <ArrowRight className="size-3.5" />
            </Link>
          </DashCardContent>
        </DashCard>

        {/* Right column */}
        <div className="flex flex-col gap-(--spacing-grid) lg:col-span-2">
          <DashCard>
            <DashCardHeader>
              <div>
                <DashCardTitle>Upcoming Session</DashCardTitle>
                <DashCardDescription>Your next advisor meeting</DashCardDescription>
              </div>
              <Badge variant="secondary">{upcomingSession.status}</Badge>
            </DashCardHeader>
            <DashCardContent>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                  <TextSmall className="font-medium">{upcomingSession.type}</TextSmall>
                  <Muted>{upcomingSession.advisor} · {upcomingSession.date}, {upcomingSession.time} · {upcomingSession.format}</Muted>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button variant="outline" size="sm">Add to calendar</Button>
                  {upcomingSession.joinUrl && (
                    <Button size="sm">
                      <ExternalLink className="size-3.5" />
                      Join
                    </Button>
                  )}
                </div>
              </div>
            </DashCardContent>
          </DashCard>

          <div className="grid grid-cols-1 gap-(--spacing-grid) sm:grid-cols-2">
            <DashCard>
              <DashCardHeader>
                <DashCardTitle>Since Inception</DashCardTitle>
                <TrendingUp className="size-4 text-brand-accent" />
              </DashCardHeader>
              <DashCardContent>
                <p className="font-numeric text-[2.25rem] font-bold tracking-tight">+{inceptionPct}%</p>
                <TextSmall className="mt-1 text-muted-foreground">{format(portfolioValueUSD - inceptionCostBasisUSD)} total gain</TextSmall>
              </DashCardContent>
            </DashCard>

            <DashCard>
              <DashCardHeader>
                <DashCardTitle>Action Items</DashCardTitle>
                <CheckSquare className="size-4 text-muted-foreground" />
              </DashCardHeader>
              <DashCardContent>
                <p className="font-numeric text-[2.25rem] font-bold tracking-tight">{openActionItems}</p>
                <TextSmall className="mt-1 text-muted-foreground">Pending your review</TextSmall>
                <Link href="/clients/dashboard/tasks" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-3 w-full")}>
                  View tasks
                </Link>
              </DashCardContent>
            </DashCard>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <DashboardGrid>
        <DashCard>
          <DashCardHeader>
            <div>
              <DashCardTitle>Latest Advisor Note</DashCardTitle>
              <DashCardDescription>{latestAdvisorNote.advisor} · {latestAdvisorNote.date}</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent>
            <TextSmall className="leading-relaxed text-muted-foreground">{latestAdvisorNote.preview}</TextSmall>
            <Link href="/clients/dashboard/advisor-insights" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4")}>
              Read full note
              <ArrowRight className="size-3.5" />
            </Link>
          </DashCardContent>
        </DashCard>

        <DashCard>
          <DashCardHeader>
            <div>
              <DashCardTitle>Recent Document</DashCardTitle>
              <DashCardDescription>Latest report added to your vault</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent>
            <div className="flex flex-col gap-1">
              <TextSmall className="font-medium">{recentDocument.name}</TextSmall>
              <Muted>Added {recentDocument.addedDate} · {recentDocument.format} · {recentDocument.sizeKb} KB</Muted>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="size-3.5" />
                Download
              </Button>
              <Link href="/clients/dashboard/documents" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                All documents
              </Link>
            </div>
          </DashCardContent>
        </DashCard>

        <DashCard>
          <DashCardHeader>
            <div>
              <DashCardTitle>JA Group Market Pulse</DashCardTitle>
              <DashCardDescription>House view · {marketPulse.date}</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent>
            <TextSmall className="leading-relaxed text-muted-foreground">{marketPulse.headline}</TextSmall>
            <Link href="/clients/dashboard/market-insights" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4")}>
              Read full commentary
              <ArrowRight className="size-3.5" />
            </Link>
          </DashCardContent>
        </DashCard>
      </DashboardGrid>
    </PageShell>
  );
}

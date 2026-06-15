import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  MessageSquare,
  CheckCircle,
  Clock,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import {
  AllocationPieChart,
  AssetAreaChart,
} from "@/components/charts/asset-charts";
import {
  DashCard,
  DashCardContent,
  DashCardDescription,
  DashCardHeader,
  DashCardTitle,
} from "@/components/ui/dash-card";
import { KpiItem, KpiStrip } from "@/components/ui/kpi-strip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { H1, H2, TextSmall, Muted } from "@/components/ui/typography";
import { getClientById, type ActivityItem } from "@/lib/advisor-clients-data";

const activityIconMap: Record<ActivityItem["type"], React.ElementType> = {
  document: FileText,
  review: CheckCircle,
  request: Clock,
  meeting: Calendar,
  note: MessageSquare,
};

function formatGBP(n: number) {
  return `£${n.toLocaleString("en-GB")}`;
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = getClientById(id);

  if (!client) notFound();

  const gain = client.portfolio.total - client.portfolio.inceptionValue;
  const gainPositive = gain >= 0;

  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      {/* Back nav */}
      <div>
        <Link
          href="/advisors/dashboard/clients"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          All clients
        </Link>
      </div>

      {/* Client header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="size-14">
            <AvatarFallback className="bg-sidebar text-sidebar-foreground text-lg font-medium">
              {client.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <H1 className="leading-none">{client.name}</H1>
              <Badge
                variant={
                  client.status === "Active"
                    ? "secondary"
                    : client.status === "Onboarding"
                    ? "default"
                    : "outline"
                }
              >
                {client.status}
              </Badge>
              {client.flags.map((f) => (
                <Badge key={f} variant="outline">
                  {f}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="size-3.5" />
                {client.email}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Phone className="size-3.5" />
                {client.phone}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5" />
                {client.location}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="size-3.5" />
                Client since {client.onboardedDate}
              </span>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm">
            <MessageSquare className="size-4" />
            Log note
          </Button>
          <Button size="sm">
            <Calendar className="size-4" />
            Schedule meeting
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <KpiStrip>
        <KpiItem
          label="Portfolio Value"
          value={formatGBP(client.portfolio.total)}
          change={`${gainPositive ? "+" : ""}${(((client.portfolio.total - client.portfolio.inceptionValue) / client.portfolio.inceptionValue) * 100).toFixed(1)}% since inception`}
          trend={gainPositive ? "up" : "down"}
        />
        <KpiItem
          label="YTD Return"
          value={`${client.portfolio.ytd > 0 ? "+" : ""}${client.portfolio.ytd}%`}
          change="Year to date"
          trend={client.portfolio.ytd >= 0 ? "up" : "down"}
        />
        <KpiItem
          label="Legacy Progress"
          value={`${client.legacyProgress}%`}
          change={client.legacyStatus}
          trend={client.legacyProgress >= 70 ? "up" : "neutral"}
        />
        <KpiItem
          label="Open Tasks"
          value={String(client.openTasks)}
          change={
            client.pendingRequests > 0
              ? `${client.pendingRequests} pending request${client.pendingRequests > 1 ? "s" : ""}`
              : "No pending requests"
          }
          trend={client.openTasks > 3 ? "down" : "neutral"}
        />
      </KpiStrip>

      {/* Portfolio overview row */}
      <div className="grid grid-cols-1 gap-(--spacing-grid) lg:grid-cols-3">
        {/* Allocation donut */}
        <DashCard>
          <DashCardHeader>
            <div>
              <DashCardTitle>Allocation</DashCardTitle>
              <DashCardDescription>By entity, % of portfolio</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent>
            <AllocationPieChart
              data={client.portfolio.assets.map((a) => ({
                name: a.name,
                value: a.allocation,
                color: a.color,
              }))}
            />
            <div className="mt-2 flex flex-col gap-2">
              {client.portfolio.assets.map((a) => (
                <div key={a.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: a.color }}
                    />
                    <TextSmall>{a.name}</TextSmall>
                  </div>
                  <div className="flex items-center gap-2">
                    <TextSmall className="font-medium">{formatGBP(a.value)}</TextSmall>
                    <Muted className="w-8 text-right">{a.allocation}%</Muted>
                  </div>
                </div>
              ))}
            </div>
          </DashCardContent>
        </DashCard>

        {/* Portfolio growth sparkline */}
        <DashCard className="lg:col-span-2">
          <DashCardHeader>
            <div>
              <DashCardTitle>Portfolio Growth</DashCardTitle>
              <DashCardDescription>
                Total portfolio value, Jul 2025 to Jun 2026
              </DashCardDescription>
            </div>
            <div className="flex flex-col items-end">
              <p className="font-numeric text-2xl font-semibold tracking-tight">
                {formatGBP(client.portfolio.total)}
              </p>
              <Muted>
                {gainPositive ? "+" : ""}{formatGBP(Math.abs(gain))} gain
              </Muted>
            </div>
          </DashCardHeader>
          <DashCardContent>
            <AssetAreaChart
              data={client.portfolio.history}
              color="#b2936b"
              gradientId={`grad-${client.id}`}
              positive={gainPositive}
            />
          </DashCardContent>
        </DashCard>
      </div>

      {/* Asset breakdown + activity + notes */}
      <div className="grid grid-cols-1 gap-(--spacing-grid) lg:grid-cols-3">
        {/* Recent activity */}
        <DashCard className="lg:col-span-2">
          <DashCardHeader>
            <div>
              <DashCardTitle>Recent Activity</DashCardTitle>
              <DashCardDescription>Latest actions and updates</DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent className="gap-4">
            {client.recentActivity.map((item) => {
              const Icon = activityIconMap[item.type];
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3 border-b border-border/60 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
                    <Icon className="size-3.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <TextSmall className="font-medium">{item.title}</TextSmall>
                    <Muted>{item.date}</Muted>
                  </div>
                </div>
              );
            })}
          </DashCardContent>
        </DashCard>

        {/* Advisor notes */}
        <DashCard>
          <DashCardHeader>
            <DashCardTitle>Advisor Notes</DashCardTitle>
          </DashCardHeader>
          <DashCardContent>
            <TextSmall className="leading-relaxed text-muted-foreground">
              {client.notes}
            </TextSmall>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              Edit notes
            </Button>
          </DashCardContent>
        </DashCard>
      </div>
    </PageShell>
  );
}

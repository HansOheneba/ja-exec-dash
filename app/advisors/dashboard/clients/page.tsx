import Link from "next/link";
import { ChevronRight, UserPlus } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { buttonVariants } from "@/components/ui/button";
import {
  DashCard,
  DashCardContent,
  DashCardDescription,
  DashCardHeader,
  DashCardTitle,
} from "@/components/ui/dash-card";
import { Badge } from "@/components/ui/badge";
import { H1, TextSmall, Muted } from "@/components/ui/typography";
import { KpiItem, KpiStrip } from "@/components/ui/kpi-strip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { clients } from "@/lib/advisor-clients-data";

const totalAum = clients.reduce((s, c) => s + c.portfolio.total, 0);
const activeCount = clients.filter((c) => c.status === "Active").length;
const reviewDue = clients.filter((c) => c.status === "Review due").length;
const onboarding = clients.filter((c) => c.status === "Onboarding").length;

function formatGBP(n: number) {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}m`;
  return `£${n.toLocaleString("en-GB")}`;
}

export default function AdvisorClientsPage() {
  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <H1>Clients</H1>
          <Muted>Your active book of business</Muted>
        </div>
        <Link
          href="/advisors/dashboard/clients/new"
          className={buttonVariants({ size: "sm" })}
        >
          <UserPlus className="size-4" />
          Add client
        </Link>
      </header>

      <KpiStrip>
        <KpiItem
          label="Total AUM"
          value={`£${(totalAum / 1_000_000).toFixed(1)}m`}
          change={`${clients.length} clients`}
          trend="neutral"
        />
        <KpiItem
          label="Active"
          value={String(activeCount)}
          change="No action needed"
          trend="up"
        />
        <KpiItem
          label="Review Due"
          value={String(reviewDue)}
          change="Requires attention"
          trend="down"
        />
        <KpiItem
          label="Onboarding"
          value={String(onboarding)}
          change="In progress"
          trend="neutral"
        />
      </KpiStrip>

      <DashCard>
        <DashCardHeader>
          <div>
            <DashCardTitle>All Clients</DashCardTitle>
            <DashCardDescription>
              {clients.length} clients. Click a row to view the full profile.
            </DashCardDescription>
          </div>
        </DashCardHeader>
        <DashCardContent className="gap-0 p-0">
          {clients.map((client) => (
            <Link
              key={client.id}
              href={`/advisors/dashboard/clients/${client.id}`}
              className="flex items-center gap-4 border-b border-border/60 px-6 py-4 transition-colors hover:bg-muted/40 last:border-0"
            >
              <Avatar size="sm">
                <AvatarFallback className="bg-muted text-xs font-medium">
                  {client.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <TextSmall className="font-medium">{client.name}</TextSmall>
                <Muted>
                  {formatGBP(client.portfolio.total)} AUM · {client.location} · Last contact {client.lastContact}
                </Muted>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {client.flags.map((flag) => (
                  <Badge key={flag} variant="outline" className="hidden sm:inline-flex">
                    {flag}
                  </Badge>
                ))}
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
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </DashCardContent>
      </DashCard>
    </PageShell>
  );
}

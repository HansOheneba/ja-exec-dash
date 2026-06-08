"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";
import { H1, Lead, Overline } from "@/components/ui/typography";

function DashboardPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <DashboardShell>
      <PageShell className="flex flex-col gap-2">
        <Overline>Client Dashboard</Overline>
        <H1>{title}</H1>
        <Lead>{description}</Lead>
      </PageShell>
    </DashboardShell>
  );
}

export { DashboardPage };

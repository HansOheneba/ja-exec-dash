"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { advisorNavItems } from "@/lib/advisor-navigation";

export default function AdvisorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      navItems={advisorNavItems}
      basePath="/advisors/dashboard"
      accountLabel="Advisor account"
    >
      {children}
    </DashboardShell>
  );
}

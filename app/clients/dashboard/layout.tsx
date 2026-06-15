"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { clientNavItems } from "@/lib/client-navigation";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      navItems={clientNavItems}
      basePath="/clients/dashboard"
      accountLabel="Client account"
    >
      {children}
    </DashboardShell>
  );
}

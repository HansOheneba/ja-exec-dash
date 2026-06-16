"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { CurrencyProvider } from "@/lib/currency-context";
import { clientNavItems } from "@/lib/client-navigation";
import { clientProfile } from "@/lib/data/profile";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CurrencyProvider>
      <DashboardShell
        navItems={clientNavItems}
        basePath="/clients/dashboard"
        accountLabel="Client account"
        showCurrencyToggle
        userName={clientProfile.fullName}
        userInitials={clientProfile.initials}
        profileHref="/clients/dashboard/profile"
      >
        {children}
      </DashboardShell>
    </CurrencyProvider>
  );
}

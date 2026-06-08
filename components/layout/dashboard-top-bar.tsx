"use client";

import { DashboardBreadcrumbs } from "@/components/layout/dashboard-breadcrumbs";
import { DashboardTopBarActions } from "@/components/layout/dashboard-top-bar-actions";
import { SidebarToggle } from "@/components/layout/sidebar-toggle";
import { cn } from "@/lib/utils";

function DashboardTopBar({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex h-14 shrink-0 items-center gap-4 border-b border-border/50 bg-background/60 px-4 backdrop-blur-sm md:px-6",
        className
      )}
    >
      <SidebarToggle />
      <DashboardBreadcrumbs className="hidden min-w-0 sm:block" />

      <div className="ml-auto flex shrink-0 items-center">
        <DashboardTopBarActions />
      </div>
    </header>
  );
}

export { DashboardTopBar };

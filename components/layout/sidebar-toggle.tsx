"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

function SidebarToggle({
  className,
  variant = "topbar",
}: {
  className?: string;
  variant?: "topbar" | "sidebar";
}) {
  const { state, toggleSidebar } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2",
        variant === "topbar" &&
          "text-foreground hover:bg-muted focus-visible:ring-ring",
        variant === "sidebar" &&
          "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-sidebar-ring",
        className
      )}
    >
      {isExpanded ? (
        <PanelLeftClose className="size-4" />
      ) : (
        <PanelLeftOpen className="size-4" />
      )}
    </button>
  );
}

export { SidebarToggle };

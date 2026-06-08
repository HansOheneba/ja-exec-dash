"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Portfolio", icon: BarChart3 },
  { label: "Documents", icon: FileText },
  { label: "Advisors", icon: Users },
  { label: "Settings", icon: Settings },
];

function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border px-4 py-5">
          <span className="font-heading text-lg font-semibold tracking-tight">
            JA Group
          </span>
          <span className="text-xs text-sidebar-foreground/70">
            Client Dashboard
          </span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item, index) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton isActive={index === 0}>
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border p-4">
          <p className="text-xs text-sidebar-foreground/70">
            Signed in as Advisor
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
          <span className="text-body-sm text-muted-foreground">
            Design System Preview
          </span>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export { DashboardShell };

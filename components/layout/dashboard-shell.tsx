"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";

import { DashboardTopBar } from "@/components/layout/dashboard-top-bar";
import { mainNavItems } from "@/lib/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider
      defaultOpen={false}
      style={
        {
          "--sidebar-width-icon": "4.5rem",
        } as React.CSSProperties
      }
    >
      <Sidebar collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader className="gap-3 px-3 pb-4 pt-5 flex ">
          <Link
            href="/"
            className="flex mx-auto size-10 shrink-0 items-center justify-center rounded-lg transition-opacity hover:opacity-80"
          >
            <Image
              src="/logos/ja-symbol-white.png"
              alt="JA Group"
              width={32}
              height={32}
              className="size-8 object-contain"
              priority
            />
          </Link>

          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {mainNavItems.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.label}
                        size="lg"
                        className={cn(
                          "data-active:bg-sidebar-primary data-active:text-sidebar-primary-foreground",
                          "group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:rounded-lg",
                          "group-data-[collapsible=icon]:[&>span]:hidden"
                        )}
                        render={<Link href={item.href} />}
                      >
                        <item.icon className="size-5" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarHeader>

        <SidebarContent className="flex-1" />

        <SidebarFooter className="items-center px-3 pb-5 pt-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Settings"
                size="lg"
                className="group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:rounded-lg group-data-[collapsible=icon]:[&>span]:hidden"
              >
                <Settings className="size-5" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-dashboard-gradient">
        <DashboardTopBar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export { DashboardShell };

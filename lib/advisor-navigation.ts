import {
  CalendarDays,
  ClipboardList,
  ConciergeBell,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  PieChart,
  Users,
} from "lucide-react";

import { CELEREY_ICON_SRC } from "@/lib/data/celerey";
import { appConfig } from "@/lib/app-config";
import type { NavItem } from "@/lib/navigation";

const advisorNavItems: NavItem[] = [
  { label: "Overview", href: appConfig.routes.advisor.dashboard, icon: LayoutDashboard },
  { label: "Clients", href: `${appConfig.routes.advisor.clients}`, icon: Users },
  { label: "Portfolio", href: `${appConfig.routes.advisor.dashboard}/portfolio`, icon: PieChart },
  { label: "Sessions", href: `${appConfig.routes.advisor.dashboard}/sessions`, icon: CalendarDays },
  {
    label: "Concierge",
    href: `${appConfig.routes.advisor.clients}/lois-lane?tab=Concierge`,
    icon: ConciergeBell,
  },
  { label: "Tasks", href: `${appConfig.routes.advisor.dashboard}/tasks`, icon: ClipboardList, badge: 8 },
  { label: "Messages", href: `${appConfig.routes.advisor.dashboard}/messages`, icon: MessageSquare, badge: 3 },
  { label: "Market Insights", href: `${appConfig.routes.advisor.dashboard}/insights`, icon: Newspaper },
  { label: "Documents", href: `${appConfig.routes.advisor.dashboard}/documents`, icon: FileText },
  { label: "Ask Celerey", href: `${appConfig.routes.advisor.dashboard}/celerey`, iconSrc: CELEREY_ICON_SRC },
];

export { advisorNavItems };

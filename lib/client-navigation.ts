import {
  BookOpen,
  CalendarDays,
  CheckSquare,
  FileText,
  LayoutDashboard,
  Lightbulb,
  MessageSquare,
  Newspaper,
  PieChart,
  Receipt,
  Star,
  Target,
  User,
  Users2,
} from "lucide-react";

import { appConfig } from "@/lib/app-config";
import type { NavItem } from "@/lib/navigation";
import { CELEREY_ICON_SRC } from "@/lib/data/celerey";

const { dashboard } = appConfig.routes.client;

const clientNavItems: NavItem[] = [
  { label: "Dashboard",        href: dashboard,                  icon: LayoutDashboard },
  { label: "My Portfolio",     href: `${dashboard}/portfolio`,        icon: PieChart },
  { label: "My Goals",         href: `${dashboard}/goals`,            icon: Target },
  { label: "Wealth Plan",      href: `${dashboard}/wealth-plan`,      icon: BookOpen },
  { label: "Legacy",           href: `${dashboard}/legacy`,           icon: Users2 },
  { label: "Ask Celerey",      href: `${dashboard}/celerey`,          iconSrc: CELEREY_ICON_SRC },
  { label: "Advisor Insights", href: `${dashboard}/advisor-insights`, icon: Lightbulb },
  { label: "Sessions",         href: `${dashboard}/sessions`,         icon: CalendarDays },
  { label: "Documents",        href: `${dashboard}/documents`,        icon: FileText },
  { label: "Concierge",        href: `${dashboard}/concierge`,        icon: Star },
  { label: "Liabilities",      href: `${dashboard}/liabilities`,      icon: Receipt },
  { label: "Messages",         href: `${dashboard}/messages`,         icon: MessageSquare, badge: 2 },
  { label: "Tasks",            href: `${dashboard}/tasks`,            icon: CheckSquare,   badge: 3 },
  { label: "Market Insights",  href: `${dashboard}/market-insights`,  icon: Newspaper },
  { label: "Profile",          href: `${dashboard}/profile`,          icon: User },
];

export { clientNavItems };

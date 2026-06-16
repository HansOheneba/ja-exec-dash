import {
  BookOpen,
  CalendarDays,
  CheckSquare,
  FileText,
  Heart,
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
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
};

const clientNavItems: NavItem[] = [
  { label: "Dashboard",        href: "/clients/dashboard",                  icon: LayoutDashboard },
  { label: "My Portfolio",     href: "/clients/dashboard/portfolio",        icon: PieChart },
  { label: "My Goals",         href: "/clients/dashboard/goals",            icon: Target },
  { label: "Wealth Plan",      href: "/clients/dashboard/wealth-plan",      icon: BookOpen },
  { label: "Legacy",           href: "/clients/dashboard/legacy",           icon: Heart },
  { label: "Advisor Insights", href: "/clients/dashboard/advisor-insights", icon: Lightbulb },
  { label: "Sessions",         href: "/clients/dashboard/sessions",         icon: CalendarDays },
  { label: "Documents",        href: "/clients/dashboard/documents",        icon: FileText },
  { label: "Concierge",        href: "/clients/dashboard/concierge",        icon: Star },
  { label: "Liabilities",      href: "/clients/dashboard/liabilities",      icon: Receipt },
  { label: "Messages",         href: "/clients/dashboard/messages",         icon: MessageSquare, badge: 2 },
  { label: "Tasks",            href: "/clients/dashboard/tasks",            icon: CheckSquare,   badge: 3 },
  { label: "Market Insights",  href: "/clients/dashboard/market-insights",  icon: Newspaper },
  { label: "Profile",          href: "/clients/dashboard/profile",          icon: User },
];

export { clientNavItems, type NavItem };

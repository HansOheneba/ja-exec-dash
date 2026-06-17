import {
  CalendarDays,
  ClipboardList,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  PieChart,
  Users,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
};

const advisorNavItems: NavItem[] = [
  { label: "Overview", href: "/advisors/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/advisors/dashboard/clients", icon: Users },
  { label: "Portfolio", href: "/advisors/dashboard/portfolio", icon: PieChart },
  { label: "Sessions", href: "/advisors/dashboard/sessions", icon: CalendarDays },
  { label: "Tasks", href: "/advisors/dashboard/tasks", icon: ClipboardList, badge: 8 },
  { label: "Messages", href: "/advisors/dashboard/messages", icon: MessageSquare, badge: 3 },
  { label: "Market Insights", href: "/advisors/dashboard/insights", icon: Newspaper },
  { label: "Documents", href: "/advisors/dashboard/documents", icon: FileText },
];

export { advisorNavItems, type NavItem };

import {
  BookOpen,
  FileText,
  HandHelping,
  LayoutDashboard,
  PieChart,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const mainNavItems: NavItem[] = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Design System", href: "/assets", icon: PieChart },
  { label: "Request a Service", href: "/request", icon: HandHelping },
  { label: "Legacy", href: "/legacy", icon: BookOpen },
  { label: "Documents", href: "/documents", icon: FileText },
];

export { mainNavItems, type NavItem };

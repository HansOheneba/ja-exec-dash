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
  badge?: number;
};

const mainNavItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Assets", href: "/dashboard/assets", icon: PieChart },
  { label: "Request a Service", href: "/dashboard/request", icon: HandHelping },
  { label: "Legacy", href: "/dashboard/legacy", icon: BookOpen },
  { label: "Documents", href: "/dashboard/documents", icon: FileText },
];

export { mainNavItems, type NavItem };

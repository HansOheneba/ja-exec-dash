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

const clientNavItems: NavItem[] = [
  { label: "Overview", href: "/clients/dashboard", icon: LayoutDashboard },
  { label: "Assets", href: "/clients/dashboard/assets", icon: PieChart },
  {
    label: "Request a Service",
    href: "/clients/dashboard/request",
    icon: HandHelping,
  },
  { label: "Legacy", href: "/clients/dashboard/legacy", icon: BookOpen },
  {
    label: "Documents",
    href: "/clients/dashboard/documents",
    icon: FileText,
  },
];

export { clientNavItems, type NavItem };

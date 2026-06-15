import {
  ClipboardList,
  FileText,
  LayoutDashboard,
  PieChart,
  Users,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const advisorNavItems: NavItem[] = [
  { label: "Overview", href: "/advisors/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/advisors/dashboard/clients", icon: Users },
  {
    label: "Portfolio",
    href: "/advisors/dashboard/portfolio",
    icon: PieChart,
  },
  { label: "Tasks", href: "/advisors/dashboard/tasks", icon: ClipboardList },
  {
    label: "Documents",
    href: "/advisors/dashboard/documents",
    icon: FileText,
  },
];

export { advisorNavItems, type NavItem };

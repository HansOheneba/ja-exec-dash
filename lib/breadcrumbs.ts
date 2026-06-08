import { mainNavItems } from "@/lib/navigation";

type BreadcrumbItem = {
  label: string;
  href: string;
};

function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [
    { label: "Dashboard", href: "/" },
  ];

  if (pathname === "/") {
    return crumbs;
  }

  const match = mainNavItems.find(
    (item) => item.href !== "/" && pathname.startsWith(item.href)
  );

  if (match) {
    crumbs.push({ label: match.label, href: match.href });
  } else if (pathname === "/assets" || pathname === "/design-system") {
    crumbs.push({ label: "Design System", href: "/assets" });
  }

  return crumbs;
}

export { getBreadcrumbs, type BreadcrumbItem };

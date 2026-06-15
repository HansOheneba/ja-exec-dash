import type { NavItem } from "@/lib/navigation";

type BreadcrumbItem = {
  label: string;
  href: string;
};

function getBreadcrumbs(
  pathname: string,
  navItems: NavItem[],
  rootHref: string,
  rootLabel = "Dashboard"
): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ label: rootLabel, href: rootHref }];

  if (pathname === rootHref) {
    return crumbs;
  }

  const match = navItems.find(
    (item) => item.href !== rootHref && pathname.startsWith(item.href)
  );

  if (match) {
    crumbs.push({ label: match.label, href: match.href });
  }

  return crumbs;
}

export { getBreadcrumbs, type BreadcrumbItem };

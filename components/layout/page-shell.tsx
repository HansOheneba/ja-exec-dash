import { cn } from "@/lib/utils";

function PageShell({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full px-(--spacing-page-x) py-(--spacing-section)",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function PageSection({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("flex w-full flex-col gap-(--spacing-grid)", className)}
      {...props}
    >
      {children}
    </section>
  );
}

function DashboardGrid({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-fr grid-cols-1 gap-(--spacing-grid)",
        "sm:grid-cols-[repeat(auto-fit,minmax(min(100%,var(--card-min-width)),1fr))]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { DashboardGrid, PageSection, PageShell };

import { cn } from "@/lib/utils";

function PageShell({
  className,
  children,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-(--container-dashboard) px-(--spacing-page-x) py-(--spacing-section)",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}

function PageSection({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export { PageSection, PageShell };

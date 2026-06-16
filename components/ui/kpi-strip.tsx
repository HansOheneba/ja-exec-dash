import { cva, type VariantProps } from "class-variance-authority";
import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Caption, Numeric, TextSmall } from "@/components/ui/typography";

const kpiStripVariants = cva(
  "flex w-full flex-col gap-(--spacing-grid) sm:flex-row",
  {
    variants: {
      layout: {
        default: "",
        wrap: "flex-wrap",
      },
    },
    defaultVariants: {
      layout: "default",
    },
  }
);

const kpiItemVariants = cva(
  "flex min-w-0 flex-1 flex-col gap-1 rounded-(--radius-card) border border-border/40 bg-card px-5 py-4 shadow-sm",
  {
    variants: {
      emphasis: {
        default: "",
        primary: "border-primary/20 bg-primary/5",
      },
    },
    defaultVariants: {
      emphasis: "default",
    },
  }
);

type KpiItemProps = React.ComponentProps<"div"> &
  VariantProps<typeof kpiItemVariants> & {
    label: string;
    value: string;
    change?: string;
    trend?: "up" | "down" | "neutral";
  };

function KpiStrip({
  className,
  layout,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof kpiStripVariants>) {
  return (
    <div
      data-slot="kpi-strip"
      className={cn(kpiStripVariants({ layout }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

function KpiItem({
  className,
  emphasis,
  label,
  value,
  change,
  trend = "neutral",
  ...props
}: KpiItemProps) {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : null;

  return (
    <div
      data-slot="kpi-item"
      className={cn(kpiItemVariants({ emphasis }), className)}
      {...props}
    >
      <Caption>{label}</Caption>
      <Numeric>{value}</Numeric>
      {change ? (
        <div
          className={cn(
            "flex items-center gap-1 text-body-sm",
            trend === "up" && "text-brand-accent",
            trend === "down" && "text-destructive",
            trend === "neutral" && "text-muted-foreground"
          )}
        >
          {TrendIcon ? <TrendIcon className="size-3.5" /> : null}
          <TextSmall className="text-inherit">{change}</TextSmall>
        </div>
      ) : null}
    </div>
  );
}

export { KpiItem, KpiStrip, kpiItemVariants, kpiStripVariants };

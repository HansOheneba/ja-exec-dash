import { cn } from "@/lib/utils";

interface ProgressProps {
  value?: number;
  className?: string;
  indicatorClassName?: string;
}

function Progress({ value = 0, className, indicatorClassName }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
    >
      <div
        className={cn("h-full rounded-full bg-brand-primary transition-all duration-500", indicatorClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export { Progress };

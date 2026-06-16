"use client";

import { useCurrency, type Currency } from "@/lib/currency-context";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Currency; label: string }[] = [
  { value: "USD", label: "USD" },
  { value: "GBP", label: "GBP" },
  { value: "GHS", label: "GHS" },
];

function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border/60 bg-muted/60 p-0.5">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setCurrency(opt.value)}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
            currency === opt.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export { CurrencyToggle };

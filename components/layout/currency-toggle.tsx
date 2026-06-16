"use client";

import { Check, ChevronDown, DollarSign } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrency, type Currency } from "@/lib/currency-context";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Currency; label: string; symbol: string }[] = [
  { value: "USD", label: "US Dollar",       symbol: "$" },
  { value: "GBP", label: "British Pound",   symbol: "£" },
  { value: "GHS", label: "Ghanaian Cedi",   symbol: "₵" },
];

function CurrencyToggle() {
  const { currency, setCurrency, ratesLoading } = useCurrency();
  const active = OPTIONS.find((o) => o.value === currency) ?? OPTIONS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-1.5 rounded-lg border border-border/60 bg-background px-2.5 py-1.5 text-xs font-medium text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
          ratesLoading && "opacity-70"
        )}
      >
        <DollarSign className="size-3 text-muted-foreground" />
        {active.value}
        <ChevronDown className="size-3 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Display currency</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {OPTIONS.map((opt) => (
            <DropdownMenuItem
              key={opt.value}
              onClick={() => setCurrency(opt.value)}
              className="flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span className="w-4 text-center font-numeric font-semibold text-muted-foreground">
                  {opt.symbol}
                </span>
                <span>
                  {opt.value}
                  <span className="ml-1.5 text-xs text-muted-foreground">{opt.label}</span>
                </span>
              </span>
              {currency === opt.value && <Check className="size-3.5 text-brand-accent" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { CurrencyToggle };

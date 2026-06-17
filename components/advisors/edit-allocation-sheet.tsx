"use client";

import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { AssetClass } from "@/lib/data/portfolio";
import { cn } from "@/lib/utils";

type EditAllocationSheetProps = { assetClasses: AssetClass[] };

function EditAllocationSheet({ assetClasses }: EditAllocationSheetProps) {
  const total = assetClasses.reduce((s, ac) => s + ac.allocationPct, 0);

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button size="sm">
            <SlidersHorizontal className="size-4" />
            Edit allocation
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit portfolio allocation</SheetTitle>
          <SheetDescription>
            Adjust the target allocation across asset classes. Percentages must sum to 100%.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          {assetClasses.map((ac) => (
            <div key={ac.id} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="size-3 shrink-0 rounded-full"
                  style={{ backgroundColor: ac.color }}
                />
                <Label htmlFor={`alloc-${ac.id}`}>{ac.label}</Label>
              </div>
              <div className="relative">
                <Input
                  id={`alloc-${ac.id}`}
                  type="number"
                  min="0"
                  max="100"
                  defaultValue={ac.allocationPct}
                  className="pr-8"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  %
                </span>
              </div>
            </div>
          ))}

          <div
            className={cn(
              "flex items-center justify-between rounded-lg border px-4 py-3",
              total === 100
                ? "border-green-200 bg-green-50/60 dark:border-green-900/40 dark:bg-green-950/20"
                : "border-amber-200 bg-amber-50/60 dark:border-amber-900/40 dark:bg-amber-950/20"
            )}
          >
            <span className="text-sm text-muted-foreground">Current total</span>
            <span
              className={cn(
                "font-numeric text-sm font-semibold",
                total === 100 ? "text-green-700 dark:text-green-400" : "text-amber-700 dark:text-amber-400"
              )}
            >
              {total}%{total !== 100 && ` (${total > 100 ? "over" : "under"} by ${Math.abs(total - 100)}%)`}
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="alloc-rationale">Rebalancing rationale</Label>
            <Textarea
              id="alloc-rationale"
              rows={3}
              placeholder="Explain the reason for this rebalance (will appear in advisor insights)..."
            />
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <SheetClose render={<Button variant="outline" className="flex-1">Cancel</Button>} />
          <Button className="flex-1">Save allocation</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { EditAllocationSheet };

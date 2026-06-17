"use client";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
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
import type { Holding } from "@/lib/data/portfolio";

type EditHoldingSheetProps = { holding: Holding; assetClass: string };

function EditHoldingSheet({ holding, assetClass }: EditHoldingSheetProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <button className="text-xs text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100">
            Edit
          </button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit holding</SheetTitle>
          <SheetDescription>
            Update {holding.ticker} in the {assetClass} allocation.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="eh-ticker">Ticker / ISIN</Label>
              <Input id="eh-ticker" defaultValue={holding.ticker} className="font-mono" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="eh-type">Instrument type</Label>
              <Select id="eh-type">
                <option>Stock</option>
                <option>ETF</option>
                <option>Bond</option>
                <option>Fund</option>
                <option>Commodity ETC</option>
                <option>Cash</option>
                <option>Other</option>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="eh-name">Full name</Label>
            <Input id="eh-name" defaultValue={holding.name} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="eh-qty">Quantity / Nominal</Label>
              <Input id="eh-qty" defaultValue={holding.qty} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="eh-price">Price per unit (USD)</Label>
              <Input id="eh-price" defaultValue={holding.price} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="eh-value">Total value (USD)</Label>
            <Input id="eh-value" type="number" defaultValue={holding.valueUSD} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="eh-day">Day change (%)</Label>
              <Input id="eh-day" type="number" step="0.01" defaultValue={holding.dayChangePct} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="eh-total-return">Total return (%)</Label>
              <Input id="eh-total-return" type="number" step="0.01" defaultValue={holding.totalReturnPct} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="eh-notes">Update note (optional)</Label>
            <Textarea id="eh-notes" rows={3} placeholder="Reason for this update..." />
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <SheetClose render={<Button variant="outline" className="flex-1">Cancel</Button>} />
          <Button className="flex-1">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { EditHoldingSheet };

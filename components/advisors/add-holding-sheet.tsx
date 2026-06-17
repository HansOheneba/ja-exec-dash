"use client";

import { Plus } from "lucide-react";

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

type AddHoldingSheetProps = { assetClass: string };

function AddHoldingSheet({ assetClass }: AddHoldingSheetProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm">
            <Plus className="size-4" />
            Add holding
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Add holding</SheetTitle>
          <SheetDescription>
            Add a new position to the client&apos;s {assetClass} allocation.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="h-ticker">Ticker / ISIN</Label>
              <Input id="h-ticker" placeholder="e.g. AAPL" className="font-mono" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="h-type">Instrument type</Label>
              <Select id="h-type">
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
            <Label htmlFor="h-name">Full name</Label>
            <Input id="h-name" placeholder="e.g. Apple Inc" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="h-qty">Quantity / Nominal</Label>
              <Input id="h-qty" placeholder="e.g. 500 shs" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="h-price">Price per unit (USD)</Label>
              <Input id="h-price" type="number" placeholder="206.80" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="h-value">Total value (USD)</Label>
              <Input id="h-value" type="number" placeholder="103400" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="h-purchase-date">Purchase date</Label>
              <Input id="h-purchase-date" type="date" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="h-exchange">Exchange / Market</Label>
            <Select id="h-exchange">
              <option value="">Select exchange</option>
              <option>NASDAQ</option>
              <option>NYSE</option>
              <option>LSE</option>
              <option>Euronext</option>
              <option>Tokyo SE</option>
              <option>OTC / Other</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="h-rationale">Investment rationale (optional)</Label>
            <Textarea id="h-rationale" rows={3} placeholder="Why this position was added..." />
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <SheetClose render={<Button variant="outline" className="flex-1">Cancel</Button>} />
          <Button className="flex-1">Add holding</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { AddHoldingSheet };

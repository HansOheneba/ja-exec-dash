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

function AddLiabilitySheet() {
  return (
    <Sheet>
      <SheetTrigger render={<Button size="sm"><Plus className="size-4" />Add liability</Button>} />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Add liability</SheetTitle>
          <SheetDescription>
            Record a new debt or credit obligation for this client.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="l-name">Liability name</Label>
            <Input id="l-name" placeholder="e.g. Canary Wharf Residential Mortgage" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="l-type">Type</Label>
              <Select id="l-type">
                <option value="mortgage">Mortgage</option>
                <option value="personal-loan">Personal Loan</option>
                <option value="credit-facility">Credit Facility</option>
                <option value="business-loan">Business Loan</option>
                <option value="other">Other</option>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="l-lender">Lender</Label>
              <Input id="l-lender" placeholder="e.g. Barclays Private" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="l-original">Original amount (USD)</Label>
              <Input id="l-original" type="number" placeholder="500000" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="l-outstanding">Outstanding (USD)</Label>
              <Input id="l-outstanding" type="number" placeholder="320000" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="l-rate">Interest rate (%)</Label>
              <Input id="l-rate" type="number" step="0.01" placeholder="3.85" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="l-monthly">Monthly payment (USD)</Label>
              <Input id="l-monthly" type="number" placeholder="2410" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="l-start">Start date</Label>
              <Input id="l-start" placeholder="e.g. Mar 2019" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="l-maturity">Maturity date</Label>
              <Input id="l-maturity" placeholder="e.g. Mar 2034" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="l-status">Status</Label>
            <Select id="l-status">
              <option value="current">Current</option>
              <option value="attention-required">Attention required</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="l-notes">Notes (optional)</Label>
            <Textarea id="l-notes" rows={3} placeholder="Any context, rate reset dates, renewal terms..." />
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <SheetClose render={<Button variant="outline" className="flex-1">Cancel</Button>} />
          <Button className="flex-1">Add liability</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { AddLiabilitySheet };

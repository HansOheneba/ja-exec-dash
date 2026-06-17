"use client";

import { FilePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
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
import type { LegacyProfile } from "@/lib/data/legacy";

type EditLegacyStatusSheetProps = Pick<
  LegacyProfile,
  "willStatus" | "willLastUpdated" | "willSolicitor" | "powerOfAttorney" | "poaHolder"
>;

function EditLegacyStatusSheet({
  willStatus,
  willLastUpdated,
  willSolicitor,
  powerOfAttorney,
  poaHolder,
}: EditLegacyStatusSheetProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm">
            <FilePen className="size-4" />
            Edit will &amp; POA
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit will &amp; power of attorney</SheetTitle>
          <SheetDescription>
            Update the client&apos;s will and POA status. Changes will appear in their Legacy tab.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Will</p>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ls-will-status">Will status</Label>
            <Select id="ls-will-status" defaultValue={willStatus}>
              <option value="current">Current</option>
              <option value="review-required">Review required</option>
              <option value="not-in-place">Not in place</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ls-will-updated">Last updated</Label>
            <Input id="ls-will-updated" defaultValue={willLastUpdated} placeholder="e.g. March 2023" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ls-will-solicitor">Solicitor</Label>
            <Input id="ls-will-solicitor" defaultValue={willSolicitor} />
          </div>

          <div className="border-t border-border/60 pt-2" />

          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Power of Attorney</p>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ls-poa-status">POA status</Label>
            <Select id="ls-poa-status" defaultValue={powerOfAttorney}>
              <option value="in-place">In place</option>
              <option value="not-in-place">Not in place</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ls-poa-holder">POA holder</Label>
            <Input id="ls-poa-holder" defaultValue={poaHolder} placeholder="e.g. Marcus Lane (Spouse)" />
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

export { EditLegacyStatusSheet };

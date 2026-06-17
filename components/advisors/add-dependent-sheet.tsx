"use client";

import { UserPlus } from "lucide-react";

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

type AddDependentSheetProps = { mode: "dependent" | "beneficiary" };

function AddDependentSheet({ mode }: AddDependentSheetProps) {
  const isBeneficiary = mode === "beneficiary";
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm">
            <UserPlus className="size-4" />
            Add {isBeneficiary ? "beneficiary" : "dependent"}
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Add {isBeneficiary ? "beneficiary" : "dependent"}</SheetTitle>
          <SheetDescription>
            {isBeneficiary
              ? "Add a new beneficiary and set their allocation percentage."
              : "Add a dependent to the client's legacy profile."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dep-name">Full name</Label>
            <Input id="dep-name" placeholder="e.g. Amara Lane" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="dep-relation">Relationship</Label>
              <Select id="dep-relation">
                <option value="">Select</option>
                <option>Spouse</option>
                <option>Partner</option>
                <option>Child</option>
                <option>Parent</option>
                <option>Sibling</option>
                <option>Other</option>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="dep-dob">Date of birth</Label>
              <Input id="dep-dob" type="date" />
            </div>
          </div>

          {isBeneficiary ? (
            <>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="dep-allocation">Allocation (%)</Label>
                <div className="relative">
                  <Input id="dep-allocation" type="number" min="0" max="100" placeholder="25" className="pr-8" />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="dep-instrument">Instrument</Label>
                <Input id="dep-instrument" placeholder="e.g. Family Trust + Life Insurance" />
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="dep-guardian">Guardian (if minor)</Label>
              <Input id="dep-guardian" placeholder="e.g. Marcus Lane" />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dep-notes">Notes (optional)</Label>
            <Textarea id="dep-notes" rows={3} placeholder="Any context, specific wishes, or arrangements..." />
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <SheetClose render={<Button variant="outline" className="flex-1">Cancel</Button>} />
          <Button className="flex-1">Add {isBeneficiary ? "beneficiary" : "dependent"}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { AddDependentSheet };

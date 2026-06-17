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
import type { TrustStructure } from "@/lib/data/legacy";

type EditTrustSheetProps = { trust: TrustStructure };

function EditTrustSheet({ trust }: EditTrustSheetProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="sm">
            <Pencil className="size-4" />
            Edit trust
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit trust structure</SheetTitle>
          <SheetDescription>Update details for &ldquo;{trust.name}&rdquo;.</SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="et-name">Trust name</Label>
            <Input id="et-name" defaultValue={trust.name} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="et-type">Type</Label>
              <Select id="et-type" defaultValue={trust.type}>
                <option>Discretionary trust</option>
                <option>Fixed interest trust</option>
                <option>Bare trust</option>
                <option>Interest in possession trust</option>
                <option>Mixed trust</option>
                <option>Other</option>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="et-status">Status</Label>
              <Select id="et-status" defaultValue={trust.status}>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="dormant">Dormant</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="et-jurisdiction">Jurisdiction</Label>
              <Input id="et-jurisdiction" defaultValue={trust.jurisdictionFormed} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="et-established">Established</Label>
              <Input id="et-established" defaultValue={trust.established} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="et-value">Estimated value (USD)</Label>
            <Input id="et-value" type="number" defaultValue={trust.estimatedValueUSD} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="et-trustees">Trustees (comma-separated)</Label>
            <Textarea id="et-trustees" rows={2} defaultValue={trust.trustees.join(", ")} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="et-beneficiaries">Beneficiaries (comma-separated)</Label>
            <Textarea id="et-beneficiaries" rows={2} defaultValue={trust.beneficiaries.join(", ")} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="et-notes">Notes</Label>
            <Textarea id="et-notes" rows={3} defaultValue={trust.notes} />
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <SheetClose render={<Button variant="outline" className="flex-1">Cancel</Button>} />
          <Button className="flex-1">Save trust</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { EditTrustSheet };

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
import type { PlanSection } from "@/lib/data/wealth-plan";

type EditPlanSectionSheetProps = { section: PlanSection };

function EditPlanSectionSheet({ section }: EditPlanSectionSheetProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="sm">
            <Pencil className="size-4" />
            Edit section
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit plan section</SheetTitle>
          <SheetDescription>Update &ldquo;{section.title}&rdquo;.</SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ps-title">Section title</Label>
            <Input id="ps-title" defaultValue={section.title} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ps-description">Content</Label>
            <Textarea id="ps-description" rows={6} defaultValue={section.description} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ps-version">Version label</Label>
              <Input id="ps-version" defaultValue={section.version} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ps-updated">Updated date</Label>
              <Input id="ps-updated" defaultValue={section.updatedDate} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ps-status">Status</Label>
            <Select id="ps-status" defaultValue={section.status}>
              <option value="Current">Current</option>
              <option value="In progress">In progress</option>
              <option value="Review recommended">Review recommended</option>
            </Select>
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <SheetClose render={<Button variant="outline" className="flex-1">Cancel</Button>} />
          <Button className="flex-1">Save section</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { EditPlanSectionSheet };

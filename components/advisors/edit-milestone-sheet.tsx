"use client";

import { CheckSquare, Pencil, Plus } from "lucide-react";

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
import type { SuccessionMilestone } from "@/lib/data/legacy";

type EditMilestoneSheetProps =
  | { mode: "edit"; milestone: SuccessionMilestone }
  | { mode: "add"; milestone?: never };

function EditMilestoneSheet(props: EditMilestoneSheetProps) {
  const isEdit = props.mode === "edit";
  const m = isEdit ? props.milestone : null;

  return (
    <Sheet>
      <SheetTrigger
        render={
          isEdit ? (
            <Button variant="ghost" size="sm">
              <Pencil className="size-4" />
            </Button>
          ) : (
            <Button variant="outline" size="sm">
              <Plus className="size-4" />
              Add milestone
            </Button>
          )
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit milestone" : "Add succession milestone"}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? `Update "${m?.title}".`
              : "Add a new estate planning or succession milestone for this client."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ms-title">Milestone</Label>
            <Input id="ms-title" defaultValue={m?.title ?? ""} placeholder="e.g. Will review and update" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ms-date">Target date</Label>
              <Input id="ms-date" defaultValue={m?.targetDate ?? ""} placeholder="e.g. Sep 2026" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ms-status">Status</Label>
              <Select id="ms-status" defaultValue={m?.status ?? "pending"}>
                <option value="pending">Pending</option>
                <option value="in-progress">In progress</option>
                <option value="completed">Completed</option>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ms-notes">Notes</Label>
            <Textarea id="ms-notes" rows={4} defaultValue={m?.notes ?? ""} placeholder="Context or instructions for this milestone..." />
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <SheetClose render={<Button variant="outline" className="flex-1">Cancel</Button>} />
          <Button className="flex-1">{isEdit ? "Save changes" : "Add milestone"}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { EditMilestoneSheet };

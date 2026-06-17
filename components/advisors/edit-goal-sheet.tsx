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
import type { Goal } from "@/lib/data/goals";

type EditGoalSheetProps = { goal: Goal };

function EditGoalSheet({ goal }: EditGoalSheetProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm">
            <Pencil className="size-4" />
            Edit
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit goal</SheetTitle>
          <SheetDescription>Update the details for &ldquo;{goal.name}&rdquo;.</SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="eg-category">Category</Label>
            <Select id="eg-category" defaultValue={goal.category}>
              <option>Retirement Planning</option>
              <option>Property Purchase</option>
              <option>Children&apos;s Education</option>
              <option>Wealth Preservation</option>
              <option>Family Protection</option>
              <option>Business Expansion</option>
              <option>Second Citizenship</option>
              <option>Philanthropic Giving</option>
              <option>Other</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="eg-name">Goal name</Label>
            <Input id="eg-name" defaultValue={goal.name} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="eg-target">Target amount (USD)</Label>
              <Input id="eg-target" type="number" defaultValue={goal.targetUSD} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="eg-current">Current amount (USD)</Label>
              <Input id="eg-current" type="number" defaultValue={goal.currentUSD} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="eg-date">Target date</Label>
              <Input id="eg-date" defaultValue={goal.targetDate} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="eg-probability">Success probability (%)</Label>
              <Input id="eg-probability" type="number" min="0" max="100" defaultValue={goal.probabilityPct} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="eg-status">Status</Label>
            <Select id="eg-status" defaultValue={goal.status}>
              <option value="on-track">On track</option>
              <option value="ahead">Ahead</option>
              <option value="at-risk">At risk</option>
              <option value="in-progress">In progress</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="eg-note">Advisor note (visible to client)</Label>
            <Textarea id="eg-note" rows={4} defaultValue={goal.advisorNote} />
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

export { EditGoalSheet };

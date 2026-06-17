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

type AddGoalSheetProps = { clientName: string };

function AddGoalSheet({ clientName }: AddGoalSheetProps) {
  return (
    <Sheet>
      <SheetTrigger render={<Button size="sm"><Plus className="size-4" />Add goal</Button>} />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Add goal</SheetTitle>
          <SheetDescription>
            Create a new financial goal for {clientName}. It will appear immediately in their Goals tab.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="goal-category">Category</Label>
            <Select id="goal-category">
              <option value="">Select category</option>
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
            <Label htmlFor="goal-name">Goal name</Label>
            <Input id="goal-name" placeholder="e.g. Retirement at 60" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="goal-target">Target amount (USD)</Label>
              <Input id="goal-target" type="number" placeholder="5000000" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="goal-current">Current amount (USD)</Label>
              <Input id="goal-current" type="number" placeholder="0" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="goal-date">Target date</Label>
              <Input id="goal-date" placeholder="e.g. December 2038" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="goal-probability">Success probability (%)</Label>
              <Input id="goal-probability" type="number" min="0" max="100" placeholder="75" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="goal-status">Status</Label>
            <Select id="goal-status">
              <option value="on-track">On track</option>
              <option value="ahead">Ahead</option>
              <option value="at-risk">At risk</option>
              <option value="in-progress">In progress</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="goal-advisor-note">Advisor note (visible to client)</Label>
            <Textarea
              id="goal-advisor-note"
              rows={4}
              placeholder="Write context or recommendations for this goal..."
            />
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <SheetClose render={<Button variant="outline" className="flex-1">Cancel</Button>} />
          <Button className="flex-1">Add goal</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { AddGoalSheet };

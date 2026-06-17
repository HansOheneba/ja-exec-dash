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
import { clients } from "@/lib/advisor-clients-data";

function AddTaskSheet() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button size="sm">
            <Plus className="size-4" />
            Add task
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Add task</SheetTitle>
          <SheetDescription>
            Create a new task. Link it to a client if applicable.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-title">Task title</Label>
            <Input id="task-title" placeholder="e.g. Annual review: Client Name" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-priority">Priority</Label>
              <Select id="task-priority">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-category">Category</Label>
              <Select id="task-category">
                <option>Review</option>
                <option>Legal</option>
                <option>Reporting</option>
                <option>Onboarding</option>
                <option>Check-in</option>
                <option>Compliance</option>
                <option>Planning</option>
                <option>Admin</option>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-due">Due date</Label>
            <Input id="task-due" type="date" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-client">Linked client (optional)</Label>
            <Select id="task-client">
              <option value="">No client (general task)</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-notes">Notes (optional)</Label>
            <Textarea
              id="task-notes"
              rows={3}
              placeholder="Any context or instructions for this task..."
            />
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <SheetClose
            render={
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
            }
          />
          <Button className="flex-1">Create task</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { AddTaskSheet };

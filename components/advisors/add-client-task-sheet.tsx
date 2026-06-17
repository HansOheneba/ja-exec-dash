"use client";

import { ClipboardList } from "lucide-react";

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

type AddClientTaskSheetProps = { clientName: string };

function AddClientTaskSheet({ clientName }: AddClientTaskSheetProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button size="sm">
            <ClipboardList className="size-4" />
            Assign task to client
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Assign task to client</SheetTitle>
          <SheetDescription>
            Create an action item that {clientName} must complete. It will appear in their Tasks tab.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ct-title">Task title</Label>
            <Input id="ct-title" placeholder="e.g. Upload Q2 bank statements" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ct-description">Description</Label>
            <Textarea
              id="ct-description"
              rows={3}
              placeholder="Explain what the client needs to do and why..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ct-type">Task type</Label>
              <Select id="ct-type">
                <option value="upload">Document upload</option>
                <option value="approve">Approval required</option>
                <option value="confirm">Confirmation needed</option>
                <option value="information">Information request</option>
                <option value="review">Review and sign</option>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ct-due">Due date</Label>
              <Input id="ct-due" type="date" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ct-priority">Priority</Label>
            <Select id="ct-priority">
              <option value="urgent">Urgent</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </Select>
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <SheetClose render={<Button variant="outline" className="flex-1">Cancel</Button>} />
          <Button className="flex-1">Assign task</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { AddClientTaskSheet };

"use client";

import { MessageSquarePlus } from "lucide-react";

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

type LogNoteSheetProps = {
  clientName: string;
};

function LogNoteSheet({ clientName }: LogNoteSheetProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm">
            <MessageSquarePlus className="size-4" />
            Log note
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Log a note</SheetTitle>
          <SheetDescription>
            Add a private note to {clientName}&apos;s record. Not visible to the client.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="note-type">Note type</Label>
            <Select id="note-type">
              <option>General note</option>
              <option>Meeting summary</option>
              <option>Follow-up reminder</option>
              <option>Risk observation</option>
              <option>Client preference</option>
              <option>Compliance note</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="note-content">Note</Label>
            <Textarea
              id="note-content"
              rows={8}
              placeholder={`Write a note about ${clientName}...`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="note-date">Date of note</Label>
            <Input
              id="note-date"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
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
          <Button className="flex-1">Save note</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { LogNoteSheet };

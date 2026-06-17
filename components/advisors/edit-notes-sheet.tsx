"use client";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

type EditNotesSheetProps = {
  clientName: string;
  currentNotes: string;
};

function EditNotesSheet({ clientName, currentNotes }: EditNotesSheetProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm" className="w-full">
            <Pencil className="size-4" />
            Edit notes
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit advisor notes</SheetTitle>
          <SheetDescription>
            Update the private advisor notes for {clientName}. Clients cannot see these.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-notes">Notes</Label>
            <Textarea id="edit-notes" rows={12} defaultValue={currentNotes} />
          </div>
          <p className="text-xs text-muted-foreground">
            Last updated: 16 Jun 2026. Changes are saved to the client record.
          </p>
        </div>

        <SheetFooter className="flex gap-2">
          <SheetClose
            render={
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
            }
          />
          <Button className="flex-1">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { EditNotesSheet };

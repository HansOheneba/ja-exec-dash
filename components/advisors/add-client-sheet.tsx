"use client";

import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

function AddClientSheet() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button size="sm">
            <UserPlus className="size-4" />
            Add client
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Add new client</SheetTitle>
          <SheetDescription>
            Enter the client details. They will receive an access invitation once added.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Jane" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Smith" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="jane.smith@email.com" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" type="tel" placeholder="+44 7700 000000" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="London, UK" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="initial-aum">Initial AUM (£)</Label>
            <Input id="initial-aum" type="number" placeholder="1000000" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="notes">Initial notes</Label>
            <textarea
              id="notes"
              rows={4}
              placeholder="Any relevant background or onboarding notes..."
              className="flex min-h-[80px] w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <SheetFooter className="flex gap-2 border-t border-border/60 pt-4">
          <SheetClose
            render={
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
            }
          />
          <Button className="flex-1">Send invite</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { AddClientSheet };

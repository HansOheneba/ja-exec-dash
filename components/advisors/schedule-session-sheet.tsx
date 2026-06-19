"use client";

import { CalendarPlus } from "lucide-react";

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
import { sessionTypes } from "@/lib/data/sessions";
import { clients } from "@/lib/advisor-clients-data";

type ScheduleSessionSheetProps = {
  preselectedClientId?: string;
};

function ScheduleSessionSheet({ preselectedClientId }: ScheduleSessionSheetProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button size="sm">
            <CalendarPlus className="size-4" />
            Schedule session
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Schedule advisory session</SheetTitle>
          <SheetDescription>
            Fields map to what the client sees: purpose, expected outcome, and preparation notes.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="session-client">Client</Label>
            <Select id="session-client" defaultValue={preselectedClientId ?? ""}>
              <option value="" disabled>
                Select a client
              </option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="session-type">Session type</Label>
            <Select id="session-type">
              {sessionTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="session-domain">Advisory domain</Label>
            <Select id="session-domain">
              <option value="portfolio">Portfolio</option>
              <option value="legacy">Legacy</option>
              <option value="tax">Tax</option>
              <option value="concierge">Concierge</option>
              <option value="general">Wealth plan</option>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="session-date">Date</Label>
              <Input id="session-date" type="date" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="session-time">Time</Label>
              <Input id="session-time" type="time" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="session-format">Format</Label>
            <Select id="session-format">
              <option>Virtual (Zoom)</option>
              <option>Mayfair Office, London</option>
              <option>Client location</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="session-purpose">Purpose (client-facing)</Label>
            <Textarea
              id="session-purpose"
              rows={3}
              placeholder="Why this session exists and what domain it covers..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="session-outcome">Expected outcome</Label>
            <Textarea
              id="session-outcome"
              rows={2}
              placeholder="What decision or agreement should result from this session?"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="session-prep">Preparation notes (client-facing)</Label>
            <Textarea
              id="session-prep"
              rows={3}
              placeholder="What the client should review or prepare beforehand..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input id="requires-prep" type="checkbox" className="size-4 rounded border-border" defaultChecked />
            <Label htmlFor="requires-prep" className="font-normal">Flag as requires preparation</Label>
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
          <Button className="flex-1">Confirm session</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { ScheduleSessionSheet };

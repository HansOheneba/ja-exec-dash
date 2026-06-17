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
          <SheetTitle>Schedule a session</SheetTitle>
          <SheetDescription>
            Book a session with a client. They will receive a calendar invite once confirmed.
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
              <option>Annual Review</option>
              <option>Quarterly Check-in</option>
              <option>Portfolio Review</option>
              <option>Estate Planning</option>
              <option>Planning</option>
              <option>Onboarding</option>
              <option>Ad-hoc</option>
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
            <Label htmlFor="session-duration">Duration</Label>
            <Select id="session-duration">
              <option>30 min</option>
              <option>45 min</option>
              <option>60 min</option>
              <option>90 min</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="session-agenda">Agenda (optional)</Label>
            <Textarea
              id="session-agenda"
              rows={4}
              placeholder="Outline what will be covered in this session..."
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
          <Button className="flex-1">Confirm session</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { ScheduleSessionSheet };

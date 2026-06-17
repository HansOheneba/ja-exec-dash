"use client";

import { RefreshCw } from "lucide-react";

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
import type { WealthPlan } from "@/lib/data/wealth-plan";

type UpdateCBIStageSheetProps = { cbi: WealthPlan["cbi"] };

function UpdateCBIStageSheet({ cbi }: UpdateCBIStageSheetProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm">
            <RefreshCw className="size-4" />
            Update stage
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Update CBI programme</SheetTitle>
          <SheetDescription>
            Update the progress stage and completion percentage for {cbi.program}.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cbi-program">Programme name</Label>
            <Input id="cbi-program" defaultValue={cbi.program} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cbi-stage">Current stage</Label>
            <Select id="cbi-stage" defaultValue={String(cbi.stageIndex)}>
              {cbi.stages.map((stage, i) => (
                <option key={stage} value={String(i)}>
                  {i + 1}. {stage}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cbi-progress">Overall progress (%)</Label>
            <div className="relative">
              <Input
                id="cbi-progress"
                type="number"
                min="0"
                max="100"
                defaultValue={cbi.progressPct}
                className="pr-8"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                %
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cbi-update-note">Update note</Label>
            <Textarea
              id="cbi-update-note"
              rows={4}
              placeholder="Describe what happened at this stage, next steps, expected timeline..."
            />
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <SheetClose render={<Button variant="outline" className="flex-1">Cancel</Button>} />
          <Button className="flex-1">Update programme</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { UpdateCBIStageSheet };

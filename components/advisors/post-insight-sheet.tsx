"use client";

import { Lightbulb } from "lucide-react";

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

type PostInsightSheetProps = {
  clientName: string;
};

function PostInsightSheet({ clientName }: PostInsightSheetProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm">
            <Lightbulb className="size-4" />
            Post insight
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Post advisor insight</SheetTitle>
          <SheetDescription>
            Write an insight for {clientName}. This will appear in their Advisor Insights tab.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="insight-type">Type</Label>
            <Select id="insight-type">
              <option>Note</option>
              <option>Recommendation</option>
              <option>Alert</option>
              <option>Update</option>
              <option>Action required</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="insight-title">Title</Label>
            <Input
              id="insight-title"
              placeholder="e.g. Portfolio rebalancing recommendation"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="insight-content">Content</Label>
            <Textarea
              id="insight-content"
              rows={8}
              placeholder={`Write your insight for ${clientName}...`}
            />
          </div>

          <div className="rounded-lg border border-border/60 bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground">
              This insight will be visible to {clientName} immediately after posting. You can
              edit or remove it at any time from the client profile.
            </p>
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
          <Button className="flex-1">Post insight</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { PostInsightSheet };

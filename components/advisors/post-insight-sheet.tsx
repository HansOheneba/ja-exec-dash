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
            Publish to {clientName}&apos;s Advisor Insights tab. Matches the client portal structure.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="insight-type">Content type</Label>
            <Select id="insight-type" defaultValue="note">
              <option value="note">Advisor note</option>
              <option value="recommendation">Recommendation</option>
              <option value="commentary">Market commentary</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="insight-note-type">Note category</Label>
            <Select id="insight-note-type">
              <option>Market commentary</option>
              <option>Portfolio review</option>
              <option>Strategy update</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="insight-title">Title / subject</Label>
            <Input
              id="insight-title"
              placeholder="e.g. Increase international equity exposure by 5%"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="insight-content">Body / rationale</Label>
            <Textarea
              id="insight-content"
              rows={6}
              placeholder={`Write the insight or recommendation rationale for ${clientName}...`}
            />
          </div>

          <div className="rounded-lg border border-border/60 bg-muted/40 p-4">
            <p className="mb-3 text-xs font-medium text-foreground">Portfolio impact (recommendations)</p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="impact-benefits">Key benefits (one per line)</Label>
                <Textarea id="impact-benefits" rows={3} placeholder="Improved diversification&#10;Reduce home market concentration" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="impact-risk">Projected risk</Label>
                  <Select id="impact-risk">
                    <option>Lower</option>
                    <option>Neutral</option>
                    <option>Higher</option>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="impact-return">Projected return</Label>
                  <Select id="impact-return">
                    <option>Lower</option>
                    <option>Neutral</option>
                    <option>Higher</option>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="impact-horizon">Time horizon</Label>
                <Input id="impact-horizon" placeholder="e.g. 5+ years" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input id="featured" type="checkbox" className="size-4 rounded border-border" />
            <Label htmlFor="featured" className="font-normal">Feature as market commentary</Label>
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
          <Button className="flex-1">Post to client portal</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { PostInsightSheet };

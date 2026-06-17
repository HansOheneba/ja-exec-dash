"use client";

import { Newspaper } from "lucide-react";

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

function PublishInsightSheet() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button size="sm">
            <Newspaper className="size-4" />
            New insight
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Publish market insight</SheetTitle>
          <SheetDescription>
            Write and publish market commentary. Published insights appear in clients&apos; Market
            Insights tab.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="mi-title">Title</Label>
            <Input id="mi-title" placeholder="e.g. UK Interest Rate Outlook: H2 2026" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="mi-category">Category</Label>
              <Select id="mi-category">
                <option>Macro</option>
                <option>Equities</option>
                <option>Property</option>
                <option>Digital Assets</option>
                <option>Fixed Income</option>
                <option>General</option>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="mi-audience">Audience</Label>
              <Select id="mi-audience">
                <option value="all">All clients</option>
                <option value="select">Select clients</option>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="mi-summary">Summary (1-2 sentences)</Label>
            <Textarea
              id="mi-summary"
              rows={2}
              placeholder="A brief summary shown in the insight card..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="mi-body">Full content</Label>
            <Textarea
              id="mi-body"
              rows={10}
              placeholder="Write the full insight here. Clients see this when they open it..."
            />
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <SheetClose
            render={
              <Button variant="outline" className="flex-1">
                Save as draft
              </Button>
            }
          />
          <Button className="flex-1">Publish now</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { PublishInsightSheet };

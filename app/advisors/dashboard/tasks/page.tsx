import { PageShell } from "@/components/layout/page-shell";
import {
  DashCard,
  DashCardContent,
  DashCardHeader,
  DashCardTitle,
  DashCardDescription,
} from "@/components/ui/dash-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { H1, TextSmall, Muted } from "@/components/ui/typography";
import { DashboardGrid } from "@/components/layout/page-shell";

const tasks = [
  {
    title: "Annual review: Lois Lane",
    due: "16 Jun 2026",
    priority: "High",
    category: "Review",
    done: false,
  },
  {
    title: "Sign off trust amendment: Priya Nair",
    due: "17 Jun 2026",
    priority: "High",
    category: "Legal",
    done: false,
  },
  {
    title: "Prepare Q2 performance report: Marcus Webb",
    due: "20 Jun 2026",
    priority: "Medium",
    category: "Reporting",
    done: false,
  },
  {
    title: "Onboarding call: Theo Baxter",
    due: "18 Jun 2026",
    priority: "Medium",
    category: "Onboarding",
    done: false,
  },
  {
    title: "Rescheduled check-in: Daniel Osei",
    due: "22 Jun 2026",
    priority: "Low",
    category: "Check-in",
    done: false,
  },
  {
    title: "Update risk profile: Amara Diallo",
    due: "30 Jun 2026",
    priority: "Low",
    category: "Compliance",
    done: false,
  },
  {
    title: "Q1 portfolio summary submitted",
    due: "1 Apr 2026",
    priority: "Low",
    category: "Reporting",
    done: true,
  },
];

const priorityVariant: Record<string, "default" | "secondary" | "outline"> = {
  High: "default",
  Medium: "secondary",
  Low: "outline",
};

export default function AdvisorTasksPage() {
  const open = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  return (
    <PageShell className="flex flex-col gap-(--spacing-section)">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <H1>Tasks</H1>
          <Muted>{open.length} open, {done.length} completed</Muted>
        </div>
        <Button size="sm">Add task</Button>
      </header>

      <DashboardGrid>
        <DashCard span="full">
          <DashCardHeader>
            <div>
              <DashCardTitle>Open Tasks</DashCardTitle>
              <DashCardDescription>
                Sorted by due date
              </DashCardDescription>
            </div>
          </DashCardHeader>
          <DashCardContent className="gap-3">
            {open.map((task) => (
              <div
                key={task.title}
                className="flex items-center gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <TextSmall className="font-medium">{task.title}</TextSmall>
                  <Muted>Due {task.due} · {task.category}</Muted>
                </div>
                <Badge variant={priorityVariant[task.priority]} className="shrink-0">
                  {task.priority}
                </Badge>
              </div>
            ))}
          </DashCardContent>
        </DashCard>

        {done.length > 0 && (
          <DashCard span="full">
            <DashCardHeader>
              <DashCardTitle>Completed</DashCardTitle>
            </DashCardHeader>
            <DashCardContent className="gap-3">
              {done.map((task) => (
                <div
                  key={task.title}
                  className="flex items-center gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                >
                  <TextSmall className="flex-1 text-muted-foreground line-through">
                    {task.title}
                  </TextSmall>
                  <Muted className="shrink-0">{task.due}</Muted>
                </div>
              ))}
            </DashCardContent>
          </DashCard>
        )}
      </DashboardGrid>
    </PageShell>
  );
}

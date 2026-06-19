"use client";

import { useState } from "react";

import { EditGoalSheet } from "@/components/advisors/edit-goal-sheet";
import { GoalCard } from "@/components/goals/goal-card";
import type { Goal } from "@/lib/data/goals";

type AdvisorGoalCardProps = {
  goal: Goal;
  formatValue: (usd: number, opts?: { compact?: boolean }) => string;
};

/** Advisor portal wrapper. Keeps advisor edit UI out of the client-safe GoalCard. */
function AdvisorGoalCard({ goal, formatValue }: AdvisorGoalCardProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <GoalCard
        goal={goal}
        formatValue={formatValue}
        onEdit={() => setEditOpen(true)}
      />
      <EditGoalSheet goal={goal} open={editOpen} onOpenChange={setEditOpen} hideTrigger />
    </>
  );
}

export { AdvisorGoalCard };

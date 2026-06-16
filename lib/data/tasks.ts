// Tasks data: replace with API calls

export type TaskType = "upload" | "approve" | "information" | "confirm";
export type TaskStatus = "pending" | "overdue" | "completed";

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  deadline: string;
  raisedBy: string;
  status: TaskStatus;
}

export const tasks: Task[] = [
  {
    id: "t1",
    type: "upload",
    title: "KYC Renewal: Updated ID",
    description: "Please upload a current passport copy and proof of address issued within the last 3 months.",
    deadline: "30 Jun 2026",
    raisedBy: "Jude Addo",
    status: "overdue",
  },
  {
    id: "t2",
    type: "approve",
    title: "Approve Q1 2026 Review Minutes",
    description: "Confirm you have read and approved the minutes from your Q1 portfolio review session.",
    deadline: "30 Jun 2026",
    raisedBy: "Jude Addo",
    status: "pending",
  },
  {
    id: "t3",
    type: "information",
    title: "Updated Income Statement",
    description: "Your advisor needs your latest annual income documentation for the Q2 financial plan refresh.",
    deadline: "15 Jul 2026",
    raisedBy: "Jude Addo",
    status: "pending",
  },
  {
    id: "t4",
    type: "confirm",
    title: "Confirm Q2 Portfolio Review Session",
    description: "Please confirm your attendance for the Quarterly Portfolio Review on 25 Jun 2026 at 10:00 AM.",
    deadline: "20 Jun 2026",
    raisedBy: "Jude Addo",
    status: "pending",
  },
  {
    id: "t5",
    type: "upload",
    title: "Portugal NHR: Bank Statement",
    description: "Upload 3 months of bank statements from your primary account for the CBI application.",
    deadline: "28 Jun 2026",
    raisedBy: "Kwame Asare (Concierge)",
    status: "completed",
  },
];

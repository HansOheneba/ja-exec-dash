type TaskPriority = "High" | "Medium" | "Low";
type TaskCategory =
  | "Review"
  | "Legal"
  | "Reporting"
  | "Onboarding"
  | "Check-in"
  | "Compliance"
  | "Planning"
  | "Admin";

type AdvisorTask = {
  id: string;
  title: string;
  due: string;
  priority: TaskPriority;
  category: TaskCategory;
  clientId?: string;
  clientName?: string;
  done: boolean;
};

const advisorTasks: AdvisorTask[] = [
  {
    id: "t1",
    title: "Annual review: Lois Lane",
    due: "16 Jun 2026",
    priority: "High",
    category: "Review",
    clientId: "lois-lane",
    clientName: "Lois Lane",
    done: false,
  },
  {
    id: "t2",
    title: "Sign off trust amendment: Priya Nair",
    due: "17 Jun 2026",
    priority: "High",
    category: "Legal",
    clientId: "priya-nair",
    clientName: "Priya Nair",
    done: false,
  },
  {
    id: "t3",
    title: "Prepare Q2 performance report: Marcus Webb",
    due: "20 Jun 2026",
    priority: "Medium",
    category: "Reporting",
    clientId: "marcus-webb",
    clientName: "Marcus Webb",
    done: false,
  },
  {
    id: "t4",
    title: "Onboarding call: Theo Baxter",
    due: "18 Jun 2026",
    priority: "Medium",
    category: "Onboarding",
    clientId: "theo-baxter",
    clientName: "Theo Baxter",
    done: false,
  },
  {
    id: "t5",
    title: "Rescheduled check-in: Daniel Osei",
    due: "22 Jun 2026",
    priority: "Low",
    category: "Check-in",
    clientId: "daniel-osei",
    clientName: "Daniel Osei",
    done: false,
  },
  {
    id: "t6",
    title: "Update risk profile: Amara Diallo",
    due: "30 Jun 2026",
    priority: "Low",
    category: "Compliance",
    clientId: "amara-diallo",
    clientName: "Amara Diallo",
    done: false,
  },
  {
    id: "t7",
    title: "Quarterly report: Amara Diallo",
    due: "30 Jun 2026",
    priority: "Medium",
    category: "Reporting",
    clientId: "amara-diallo",
    clientName: "Amara Diallo",
    done: false,
  },
  {
    id: "t8",
    title: "Review digital assets rebalancing proposal",
    due: "25 Jun 2026",
    priority: "Medium",
    category: "Planning",
    done: false,
  },
  {
    id: "t9",
    title: "Q1 portfolio summary submitted",
    due: "1 Apr 2026",
    priority: "Low",
    category: "Reporting",
    done: true,
  },
  {
    id: "t10",
    title: "Onboarding documents reviewed: Theo Baxter",
    due: "14 Jun 2026",
    priority: "High",
    category: "Onboarding",
    clientId: "theo-baxter",
    clientName: "Theo Baxter",
    done: true,
  },
];

export { advisorTasks, type AdvisorTask, type TaskPriority, type TaskCategory };

// Goals data: all monetary values in USD. Domain API (mock). Prefer @/lib/api/domain

import { appConfig } from "@/lib/app-config";

export type GoalStatus = "on-track" | "at-risk" | "ahead" | "in-progress";

export interface Goal {
  id: string;
  iconName: string;
  category: string;
  name: string;
  targetUSD: number;
  currentUSD: number;
  targetDate: string;
  probabilityPct: number;
  status: GoalStatus;
  advisorNote: string;
  jaService?: string;
  jaServiceHref?: string;
}

export const goals: Goal[] = [
  {
    id: "retirement",
    iconName: "Landmark",
    category: "Retirement Planning",
    name: "Retirement at 60",
    targetUSD: 5_000_000,
    currentUSD: 4_180_000,
    targetDate: "December 2038",
    probabilityPct: 84,
    status: "on-track",
    advisorNote:
      "Current trajectory is strong. A modest increase in monthly contributions of $2,500 would raise your probability of success to 91%. I recommend we review this at your next session.",
  },
  {
    id: "education",
    iconName: "GraduationCap",
    category: "Children's Education",
    name: "University fees for Amara and Kofi",
    targetUSD: 280_000,
    currentUSD: 97_000,
    targetDate: "September 2031",
    probabilityPct: 73,
    status: "at-risk",
    advisorNote:
      "The gap between your current savings rate and the target is widening due to rising tuition inflation. Consider ring-fencing an additional $1,200/month into the education sub-account.",
  },
  {
    id: "property",
    iconName: "Building2",
    category: "Property Purchase",
    name: "Dubai residential property",
    targetUSD: 1_200_000,
    currentUSD: 620_000,
    targetDate: "June 2028",
    probabilityPct: 68,
    status: "in-progress",
    advisorNote:
      "Two qualifying properties are currently in the pipeline for this target. Your current liquid position could support a purchase deposit now if you chose to move early.",
  },
  {
    id: "citizenship",
    iconName: "Globe",
    category: "Second Citizenship",
    name: "Malta / Portugal residency",
    targetUSD: 500_000,
    currentUSD: 210_000,
    targetDate: "December 2027",
    probabilityPct: 79,
    status: "on-track",
    advisorNote:
      "Application preparation is well underway. Portugal's NHR route requires the investment threshold to be met by Q4 2027. You are on track. JA's Citizenship team can guide the legal process.",
    jaService: "CBI consultation",
    jaServiceHref: appConfig.routes.client.concierge,
  },
  {
    id: "legacy",
    iconName: "HeartHandshake",
    category: "Wealth Preservation",
    name: "Generational Legacy Trust",
    targetUSD: 10_000_000,
    currentUSD: 4_180_000,
    targetDate: "Ongoing",
    probabilityPct: 62,
    status: "in-progress",
    advisorNote:
      "The trust structure is established. We should review beneficiary designations and the succession schedule ahead of your estate planning session in Q3.",
  },
  {
    id: "protection",
    iconName: "Shield",
    category: "Family Protection",
    name: "Life coverage milestone",
    targetUSD: 3_000_000,
    currentUSD: 2_400_000,
    targetDate: "March 2027",
    probabilityPct: 91,
    status: "ahead",
    advisorNote:
      "Existing coverage is solid. The gap of $600k can be closed with a term top-up policy at minimal cost. I will prepare a comparison from JA's insurance partners before our next session.",
  },
  {
    id: "business",
    iconName: "TrendingUp",
    category: "Business Expansion",
    name: "Capital reserve for Group expansion",
    targetUSD: 2_000_000,
    currentUSD: 940_000,
    targetDate: "December 2029",
    probabilityPct: 77,
    status: "on-track",
    advisorNote:
      "The earmarked liquidity buffer is growing steadily. Consider moving a portion into short-duration commercial paper to improve yield without sacrificing accessibility.",
  },
];

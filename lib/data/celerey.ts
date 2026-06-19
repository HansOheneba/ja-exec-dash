// Celerey: simulated chatbot responses until backend is connected.

export const CELEREY_ICON_SRC = "/logos/CelereySymbolLight.png";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

export type PromptChip = {
  id: string;
  label: string;
  query: string;
  category: "legacy" | "portfolio" | "goals" | "general";
};

export const CELEREY_WELCOME =
  "I am Celerey, your private wealth assistant. I can help you understand your portfolio, legacy readiness, goals, and estate planning gaps. Ask anything below, or choose a suggested question.";

export const clientPromptChips: PromptChip[] = [
  {
    id: "legacy-1",
    label: "What happens if I die today?",
    query: "What happens if I die today?",
    category: "legacy",
  },
  {
    id: "legacy-2",
    label: "Assets without beneficiaries",
    query: "What assets have no beneficiaries assigned?",
    category: "legacy",
  },
  {
    id: "legacy-3",
    label: "Missing estate documents",
    query: "Which estate documents are missing or out of date?",
    category: "legacy",
  },
  {
    id: "legacy-4",
    label: "Estate plan risks",
    query: "What risks exist in my current estate plan?",
    category: "legacy",
  },
  {
    id: "legacy-5",
    label: "Improve readiness score",
    query: "How can I improve my legacy readiness score?",
    category: "legacy",
  },
  {
    id: "portfolio-1",
    label: "Portfolio summary",
    query: "Give me a summary of my portfolio allocation and performance.",
    category: "portfolio",
  },
  {
    id: "goals-1",
    label: "Goals at risk",
    query: "Which of my financial goals are at risk?",
    category: "goals",
  },
  {
    id: "general-1",
    label: "Next session prep",
    query: "What should I prepare for my next advisor session?",
    category: "general",
  },
];

export const advisorPromptChips: PromptChip[] = [
  {
    id: "adv-1",
    label: "Clients needing review",
    query: "Which clients are overdue for an estate or annual review?",
    category: "general",
  },
  {
    id: "adv-2",
    label: "Legacy gaps across book",
    query: "Summarise legacy planning gaps across my client book.",
    category: "legacy",
  },
  {
    id: "adv-3",
    label: "At-risk goals",
    query: "Which clients have goals marked at risk?",
    category: "goals",
  },
  {
    id: "adv-4",
    label: "Rebalancing opportunities",
    query: "Where do I have rebalancing opportunities this quarter?",
    category: "portfolio",
  },
];

function matchResponse(query: string, audience: "client" | "advisor"): string {
  const q = query.toLowerCase();

  if (q.includes("die today") || q.includes("if i die") || q.includes("if something happened")) {
    return audience === "client"
      ? "Based on your current profile, your family would have partial visibility but not full clarity.\n\n**What they would know:** Portfolio holdings and account structures held with JA Group, beneficiary allocations on the Lois Lane Family Trust (50% spouse, 25% each child), and your POA holder (Marcus Lane).\n\n**Critical gaps:** Your will was last updated in March 2023 and is flagged for review. Dubai property and Portugal NHR goals are not yet reflected in estate documents. No consolidated emergency contact sheet or executor playbook is on file.\n\n**Immediate risk:** Without an updated will and documented asset register, your family may face delays accessing accounts, uncertainty on non-trust assets, and probate complexity across UK jurisdictions.\n\nI recommend booking an estate planning session with Jude Addo. This is guidance only, not legal advice."
      : "Across your book, 2 of 6 clients have wills marked review-required or not in place. Daniel Osei has no active estate plan. Lois Lane's will predates significant portfolio growth and new goals.\n\nIf any client passed away today, families would rely on advisor notes and partial trust documentation. Executor workflows are not formalised in the platform for any client.\n\nPriority actions: schedule Q3 estate reviews for Lois Lane and Daniel Osei, and confirm POA documentation is uploaded for all active clients.";
  }

  if (q.includes("no beneficiaries") || q.includes("without beneficiaries") || q.includes("beneficiaries assigned")) {
    return "Assets potentially without clear beneficiary designation:\n\n1. **Dubai residential property goal** ($620k saved toward $1.2m target): not yet mapped to a beneficiary instrument.\n2. **Portugal NHR investment allocation** ($210k): succession treatment unclear until application completes.\n3. **Business expansion capital reserve** ($940k): held as liquid buffer, not ring-fenced in trust.\n4. **Offshore cash** (Barclays Private, Standard Chartered): confirm POD or trust nominations with your advisor.\n\nTrust-covered assets (Lois Lane Family Trust) have named beneficiaries. Gaps are mainly in goals and liquid accounts outside the trust structure.";
  }

  if (q.includes("missing") && (q.includes("document") || q.includes("estate"))) {
    return "Document gaps identified in your vault:\n\n**Out of date:** Will (last updated March 2023, review required).\n\n**In place:** Power of Attorney (Marcus Lane), Family Trust deed (January 2024).\n\n**Likely missing or not uploaded:** Updated beneficiary schedule reflecting 2025-2026 portfolio changes, insurance policy schedules with current beneficiary nominations, property deed for any UK residential holdings, Portugal NHR application correspondence, digital asset access instructions.\n\nYour advisor can request uploads via the Documents tab or assign tasks for anything outstanding.";
  }

  if (q.includes("risk") && q.includes("estate")) {
    return "Key estate plan risks for your profile:\n\n1. **Stale will:** Estate has grown materially since 2023. New goals (Dubai property, Portugal residency) may not be covered.\n2. **Concentration in trust:** $4.18m in one discretionary trust. Tax and distribution rules should be reviewed with your solicitor.\n3. **Education funding gap:** Children's education goal is at risk (73% probability). No dedicated sub-fund in the trust yet.\n4. **Cross-border complexity:** UK, Ghana, and UAE exposure without an uploaded offshore succession memo.\n5. **Single POA holder:** No documented backup attorney.\n\nSeverity: medium-high. A structured review would address most items within one to two sessions.";
  }

  if (q.includes("readiness") || q.includes("improve")) {
    return "Your estimated legacy readiness is **62%**. To improve it:\n\n**High impact (next 30 days):**\n- Schedule will review with Freshfields or your advisor-facilitated solicitor.\n- Upload current insurance policies with beneficiary pages.\n- Complete the children's education trust sub-fund milestone (pending, target Dec 2026).\n\n**Medium impact (90 days):**\n- Document digital asset and account access for your executor.\n- Align beneficiary allocations with the Dubai and Portugal goals.\n- Finalise offshore succession memo (milestone due Mar 2027).\n\nCompleting the will review alone would likely raise your score to approximately 72%.";
  }

  if (q.includes("portfolio") || q.includes("allocation")) {
    return "Your portfolio totals approximately **$4.18m** across four asset classes:\n\n- **Equities (45%):** $1.88m, +12.4% YTD. Largest holding: AAPL.\n- **Fixed Income (22%):** $923k, +3.8% YTD.\n- **Commodities (18%):** $750k, +18.6% YTD. Gold ETC is the top contributor.\n- **Cash (15%):** $628k, +3.1% YTD.\n\nJude Addo has a pending recommendation to increase fixed income from 22% to 26% ahead of expected rate cuts. View full holdings in My Portfolio.";
  }

  if (q.includes("goals") && (q.includes("risk") || q.includes("at risk"))) {
    return "Goals requiring attention:\n\n1. **University fees for Amara and Kofi** (At risk, 73% probability): $183k funding gap. Tuition inflation is widening the shortfall.\n2. **Generational Legacy Trust** (In progress, 62% probability): Long-horizon goal, beneficiary review needed in Q3.\n3. **Dubai residential property** (In progress, 68%): $580k gap, timeline June 2028.\n\nGoals on track: Retirement at 60, Portugal residency, life coverage, business expansion reserve.";
  }

  if (q.includes("session") || q.includes("prepare")) {
    return "For your upcoming sessions, I suggest preparing:\n\n1. Questions on the fixed income rebalance recommendation (+4% allocation).\n2. Will review scope: which new assets and goals to include.\n3. Education sub-fund structure inside the family trust.\n4. Any changes to beneficiary designations since 2024.\n\nOpen Documents to confirm Q2 statements are uploaded. Check Tasks for any overdue items before the meeting.";
  }

  if (q.includes("overdue") || q.includes("clients")) {
    return "Clients flagged for advisor attention:\n\n- **Daniel Osei:** Overdue annual review (30 Apr 2026). No active estate plan. Portfolio -1.8% YTD.\n- **Lois Lane:** Will review required. Succession planning review requested 12 Jun.\n- **Priya Nair:** Trust structure setup in progress. Will review complete.\n\nTheo Baxter is in onboarding with 5 open tasks. Amara Diallo and Marcus Webb are current on reviews.";
  }

  if (q.includes("rebalanc")) {
    return "Rebalancing opportunities this quarter:\n\n1. **Lois Lane:** Trim commodities slightly, add to fixed income per pending recommendation.\n2. **Priya Nair:** Digital assets at 26% may exceed risk profile. Consider profit-taking.\n3. **Daniel Osei:** Commodities overweight at 34% with negative YTD. Review defensive repositioning.\n4. **Book-wide:** Several clients overweight growth after H1 equity and digital performance.\n\nMarket Insights has the mid-year strategy note published 1 Jun 2026.";
  }

  if (q.includes("legacy") && q.includes("book")) {
    return "Legacy planning summary across your book:\n\n- **Fully established:** Amara Diallo (90% legacy progress, trusts and succession complete).\n- **In progress:** Lois Lane (60%), Priya Nair (40%), Marcus Webb (85%).\n- **Not started / at risk:** Daniel Osei (20%, no estate plan), Theo Baxter (onboarding).\n\nCommon gaps: stale wills, missing trust sub-funds for education, undocumented digital assets. Two clients have Portugal or Dubai goals not reflected in estate documents.";
  }

  return "I have reviewed your question against your current portfolio, goals, and legacy data on file.\n\nI do not have enough specific context to give a precise answer to that query yet. For account-specific decisions, tax treatment, or legal matters, please speak with Jude Addo or your qualified solicitor.\n\nTry asking about legacy readiness, beneficiary gaps, portfolio allocation, goals at risk, or missing estate documents. I can also help you prepare for your next advisor session.";
}

function getSimulatedResponse(query: string, audience: "client" | "advisor" = "client"): string {
  return matchResponse(query, audience);
}

function createMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    content,
  };
}

export { createMessage, getSimulatedResponse };

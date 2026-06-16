// Messages data: replace with API calls or WebSocket subscription

export type ThreadType = "advisor" | "system" | "service";

export interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  isOwn: boolean;
}

export interface Thread {
  id: string;
  type: ThreadType;
  name: string;
  preview: string;
  time: string;
  unreadCount?: number;
  messages: Message[];
}

export const messageThreads: Thread[] = [
  {
    id: "t1",
    type: "advisor",
    name: "Jude Addo",
    preview: "Happy to discuss the fixed income recommendation ahead of the session.",
    time: "11:42 AM",
    unreadCount: 2,
    messages: [
      { id: "m1", sender: "Jude Addo", content: "Good morning Lois. I have reviewed the Q1 results and your portfolio is performing broadly in line with expectations.", time: "10 Jun, 9:15 AM", isOwn: false },
      { id: "m2", sender: "You", content: "Thanks Jude. I noticed the commodities exposure is up. Is that intentional or do we need to rebalance?", time: "10 Jun, 9:42 AM", isOwn: true },
      { id: "m3", sender: "Jude Addo", content: "Good point. The commodities drift is partly intentional given gold's performance. I recommend we hold for Q2 and review at the quarterly session.", time: "10 Jun, 10:05 AM", isOwn: false },
      { id: "m4", sender: "You", content: "Understood. What about the fixed income recommendation you mentioned last month?", time: "16 Jun, 11:20 AM", isOwn: true },
      { id: "m5", sender: "Jude Addo", content: "Happy to discuss the fixed income recommendation ahead of the session.", time: "16 Jun, 11:42 AM", isOwn: false },
    ],
  },
  {
    id: "t2",
    type: "system",
    name: "JA Wealth",
    preview: "Your Q1 2026 Portfolio Statement is ready to download.",
    time: "1 Apr",
    messages: [
      { id: "ms1", sender: "JA Wealth", content: "Your Q1 2026 Portfolio Statement is ready to download from your Documents vault.", time: "1 Apr 2026, 8:00 AM", isOwn: false },
      { id: "ms2", sender: "JA Wealth", content: "Reminder: Your KYC document renewal is due by 30 Jun 2026. Please complete this in the Tasks section.", time: "15 May 2026, 8:00 AM", isOwn: false },
    ],
  },
  {
    id: "t3",
    type: "service",
    name: "Concierge, Sarah Kim",
    preview: "Your offshore bank account application has been received.",
    time: "2 Jun",
    messages: [
      { id: "mc1", sender: "Sarah Kim", content: "Hi Lois, your Standard Chartered offshore bank account application has been received and is currently under review. Expected timeline: 3-4 weeks.", time: "2 Jun 2026, 2:10 PM", isOwn: false },
    ],
  },
];

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TextSmall, Muted } from "@/components/ui/typography";
import {
  ADVISOR_CHIP_GROUPS,
  CELEREY_ADVISOR_WELCOME,
  CELEREY_ICON_SRC,
  CELEREY_WELCOME,
  createMessage,
  getSimulatedResponse,
  type ChatMessage,
  type PromptChip,
} from "@/lib/data/celerey";
import { cn } from "@/lib/utils";

type CelereyChatProps = {
  audience: "client" | "advisor";
  promptChips: PromptChip[];
  initialQuery?: string;
};

function CelereyAvatar({ className }: { className?: string }) {
  return (
    <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar", className)}>
      <Image
        src={CELEREY_ICON_SRC}
        alt="Celerey"
        width={20}
        height={20}
        className="size-5 object-contain"
      />
    </div>
  );
}

function formatMarkdownLite(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}

const ADVISOR_BOOK_PULSE = [
  { label: "Active clients", value: "6" },
  { label: "Reviews overdue", value: "2" },
  { label: "At-risk goals", value: "3" },
  { label: "Open tasks", value: "8" },
];

function AdvisorQueryPanel({
  promptChips,
  onSelect,
}: {
  promptChips: PromptChip[];
  onSelect: (query: string) => void;
}) {
  return (
    <aside className="hidden w-72 shrink-0 flex-col border-l border-border/50 bg-muted/15 lg:flex">
      <div className="border-b border-border/40 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Book pulse
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {ADVISOR_BOOK_PULSE.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-border/60 bg-card px-3 py-2.5"
            >
              <p className="text-lg font-bold tabular-nums leading-none">{item.value}</p>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Quick queries
        </p>
        <div className="mt-3 flex flex-col gap-4">
          {ADVISOR_CHIP_GROUPS.map((group) => {
            const chips = promptChips.filter((chip) => chip.category === group.category);
            if (chips.length === 0) return null;

            return (
              <div key={group.label} className="flex flex-col gap-2">
                <p className="text-xs font-medium text-foreground">{group.label}</p>
                <div className="flex flex-col gap-1.5">
                  {chips.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => onSelect(chip.query)}
                      className="rounded-lg border border-border/60 bg-card px-3 py-2 text-left text-xs font-medium text-foreground transition-colors hover:border-brand-accent/40 hover:bg-muted/50"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function CelereyChat({ audience, promptChips, initialQuery }: CelereyChatProps) {
  const welcomeMessage = audience === "advisor" ? CELEREY_ADVISOR_WELCOME : CELEREY_WELCOME;
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage("assistant", welcomeMessage),
  ]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialSent = useRef(false);

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  };

  const startNewChat = () => {
    setMessages([createMessage("assistant", welcomeMessage)]);
    setDraft("");
    setThinking(false);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    const userMsg = createMessage("user", trimmed);
    setMessages((prev) => [...prev, userMsg]);
    setDraft("");
    setThinking(true);

    window.setTimeout(() => {
      const reply = createMessage("assistant", getSimulatedResponse(trimmed, audience));
      setMessages((prev) => [...prev, reply]);
      setThinking(false);
    }, 700 + Math.random() * 500);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking]);

  useEffect(() => {
    if (!initialQuery || initialSent.current) return;
    initialSent.current = true;
    const trimmed = initialQuery.trim();
    if (!trimmed) return;

    const userMsg = createMessage("user", trimmed);
    setMessages((prev) => [...prev, userMsg]);
    setThinking(true);

    const timer = window.setTimeout(() => {
      const reply = createMessage("assistant", getSimulatedResponse(trimmed, audience));
      setMessages((prev) => [...prev, reply]);
      setThinking(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [initialQuery, audience]);

  const showStarters = messages.length <= 1 && !thinking;
  const isAdvisor = audience === "advisor";

  return (
    <div className={cn("flex h-full min-h-0 flex-1", isAdvisor && "lg:flex-row")}>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center justify-between border-b border-border/40 px-4 py-2 sm:px-6">
          {isAdvisor ? (
            <Muted className="text-xs">
              Internal book intelligence. Not for client distribution.
            </Muted>
          ) : (
            <span />
          )}
          <Button variant="outline" size="sm" onClick={startNewChat}>
            <SquarePen className="size-4" />
            New session
          </Button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                {msg.role === "assistant" && (
                  <CelereyAvatar className={isAdvisor ? "bg-primary" : undefined} />
                )}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[78%]",
                    msg.role === "user"
                      ? isAdvisor
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-br-md bg-sidebar text-sidebar-foreground"
                      : "rounded-bl-md border border-border/50 bg-card text-foreground shadow-sm"
                  )}
                >
                  <TextSmall
                    className={cn(
                      "leading-relaxed",
                      msg.role === "user" &&
                        (isAdvisor ? "text-primary-foreground" : "text-sidebar-foreground")
                    )}
                  >
                    {formatMarkdownLite(msg.content)}
                  </TextSmall>
                </div>
              </div>
            ))}

            {thinking && (
              <div className="flex gap-3">
                <CelereyAvatar className={isAdvisor ? "bg-primary" : undefined} />
                <div className="rounded-2xl rounded-bl-md border border-border/50 bg-card px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
                    <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
                    <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            {showStarters && !isAdvisor && (
              <div className="flex flex-col gap-3 pt-2">
                <Muted className="text-center text-xs">Suggested questions</Muted>
                <div className="flex flex-wrap justify-center gap-2">
                  {promptChips.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => sendMessage(chip.query)}
                      className="rounded-full border border-border/60 bg-card px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-brand-accent/40 hover:bg-muted/60"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showStarters && isAdvisor && (
              <div className="flex flex-col gap-3 pt-2 lg:hidden">
                <Muted className="text-center text-xs">Quick queries</Muted>
                <div className="flex flex-wrap justify-center gap-2">
                  {promptChips.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => sendMessage(chip.query)}
                      className="rounded-lg border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-brand-accent/40 hover:bg-muted/60"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 border-t border-border/50 bg-background/80 px-4 py-4 backdrop-blur-sm sm:px-6">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-2">
            <div className="relative flex items-end gap-2 rounded-2xl border border-border/60 bg-card px-3 py-2 shadow-sm focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(draft);
                  }
                }}
                placeholder={
                  isAdvisor
                    ? "Query client books, flag reviews, legacy gaps, or rebalancing opportunities..."
                    : "Ask Celerey anything about your wealth, goals, or legacy..."
                }
                rows={1}
                className="max-h-32 min-h-[44px] resize-none border-0 bg-transparent px-1 py-2.5 shadow-none focus-visible:ring-0"
              />
              <Button
                size="icon"
                className="mb-0.5 shrink-0 rounded-xl"
                disabled={!draft.trim() || thinking}
                onClick={() => sendMessage(draft)}
                aria-label="Send message"
              >
                <ArrowUp className="size-4" />
              </Button>
            </div>
            <Muted className="text-center text-[11px]">
              {isAdvisor
                ? "Internal advisory support only. Verify outputs before any client-facing action."
                : "Celerey provides guidance only. Not legal, tax, or investment advice. Confirm decisions with your advisor."}
            </Muted>
          </div>
        </div>
      </div>

      {isAdvisor && <AdvisorQueryPanel promptChips={promptChips} onSelect={sendMessage} />}
    </div>
  );
}

export { CelereyChat };

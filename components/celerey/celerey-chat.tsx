"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TextSmall, Muted } from "@/components/ui/typography";
import {
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

function CelereyChat({ audience, promptChips, initialQuery }: CelereyChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage("assistant", CELEREY_WELCOME),
  ]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialSent = useRef(false);

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  };

  const startNewChat = () => {
    setMessages([createMessage("assistant", CELEREY_WELCOME)]);
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

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center justify-end border-b border-border/40 px-4 py-2 sm:px-6">
        <Button variant="outline" size="sm" onClick={startNewChat}>
          <SquarePen className="size-4" />
          New chat
        </Button>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
            >
              {msg.role === "assistant" && <CelereyAvatar />}
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[78%]",
                  msg.role === "user"
                    ? "rounded-br-md bg-sidebar text-sidebar-foreground"
                    : "rounded-bl-md border border-border/50 bg-card text-foreground shadow-sm"
                )}
              >
                <TextSmall className={cn("leading-relaxed", msg.role === "user" && "text-sidebar-foreground")}>
                  {formatMarkdownLite(msg.content)}
                </TextSmall>
              </div>
            </div>
          ))}

          {thinking && (
            <div className="flex gap-3">
              <CelereyAvatar />
              <div className="rounded-2xl rounded-bl-md border border-border/50 bg-card px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          {showStarters && (
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
              placeholder="Ask Celerey anything about your wealth, goals, or legacy..."
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
            Celerey provides guidance only. Not legal, tax, or investment advice. Confirm decisions with your advisor.
          </Muted>
        </div>
      </div>
    </div>
  );
}

export { CelereyChat };

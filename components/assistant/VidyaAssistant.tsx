"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, Send, Sparkles, X } from "lucide-react";
import { vidyaOpeningMessage } from "@/lib/vidya/config";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const starterPrompts = ["Admissions", "Facilities", "Contact", "Leadership"];

function createMessage(role: Message["role"], content: string): Message {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content
  };
}

export function VidyaAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([createMessage("assistant", vidyaOpeningMessage)]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [messages, loading, open]);

  async function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || loading) return;

    const userMessage = createMessage("user", trimmed);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/vidya", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "VIDYA could not answer right now.");
      }

      setMessages((current) => [...current, createMessage("assistant", data.reply)]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "VIDYA could not answer right now.");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="fixed bottom-5 right-5 z-[80] font-sans sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open ? (
          <motion.section
            aria-label="VIDYA school assistant"
            className="mb-4 flex h-[min(620px,calc(100vh-7rem))] w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-white/70 bg-white shadow-glass sm:w-[390px]"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="bg-teal-texture px-5 py-4 text-white">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/14 text-amber ring-1 ring-white/20">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-semibold leading-none">VIDYA</h2>
                    <p className="mt-1 text-xs font-medium text-white/72">SVPHIS digital assistant</p>
                  </div>
                </div>
                <button className="focus-ring rounded-full p-2 text-white/78 transition hover:bg-white/10 hover:text-white" aria-label="Close VIDYA assistant" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-surface px-4 py-5">
              {messages.map((message) => (
                <div className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")} key={message.id}>
                  <div
                    className={cn(
                      "max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm",
                      message.role === "user" ? "bg-primary text-white" : "border border-slate-200 bg-white text-slate-700"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {loading ? (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-text-muted shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    VIDYA is typing
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-slate-200 bg-white p-4">
              {messages.length === 1 ? (
                <div className="mb-3 flex flex-wrap gap-2">
                  {starterPrompts.map((prompt) => (
                    <button
                      className="focus-ring rounded-full border border-primary/15 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/8"
                      key={prompt}
                      onClick={() => void sendMessage(`Tell me about ${prompt.toLowerCase()}.`)}
                      type="button"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              ) : null}

              {error ? <p className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700">{error}</p> : null}

              <form className="flex items-center gap-2" onSubmit={onSubmit}>
                <input
                  ref={inputRef}
                  className="focus-ring min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-text-main placeholder:text-slate-400"
                  disabled={loading}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask VIDYA about SVPHIS..."
                  value={input}
                />
                <button
                  aria-label="Send message to VIDYA"
                  className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-[#b96105] disabled:pointer-events-none disabled:opacity-55"
                  disabled={loading || !input.trim()}
                  type="submit"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <button
        aria-label={open ? "Close VIDYA assistant" : "Open VIDYA assistant"}
        className="focus-ring ml-auto flex items-center gap-3 rounded-full bg-primary px-4 py-3 font-semibold text-white shadow-glass transition hover:-translate-y-0.5 hover:bg-primary-light"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/12 text-amber">
          <Bot className="h-5 w-5" />
        </span>
        <span className="hidden sm:block">Ask VIDYA</span>
      </button>
    </div>
  );
}

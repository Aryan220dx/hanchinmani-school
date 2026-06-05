import { NextResponse } from "next/server";
import { vidyaSystemPrompt } from "@/lib/vidya/knowledgeBase";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
const MAX_HISTORY_MESSAGES = 10;

function isValidMessage(message: unknown): message is ChatMessage {
  if (!message || typeof message !== "object") return false;

  const candidate = message as Partial<ChatMessage>;
  return (candidate.role === "user" || candidate.role === "assistant") && typeof candidate.content === "string" && candidate.content.trim().length > 0;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "VIDYA is not configured yet. Please add GROQ_API_KEY on the server." }, { status: 500 });
    }

    const body = await request.json();
    const messages = Array.isArray(body?.messages) ? body.messages.filter(isValidMessage).slice(-MAX_HISTORY_MESSAGES) : [];

    if (!messages.length || messages[messages.length - 1].role !== "user") {
      return NextResponse.json({ error: "Please send a valid question for VIDYA." }, { status: 400 });
    }

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: "system", content: vidyaSystemPrompt }, ...messages],
        temperature: 0.3,
        max_completion_tokens: 450
      })
    });

    if (!groqResponse.ok) {
      const details = await groqResponse.text();
      console.error("Groq VIDYA request failed:", details);
      return NextResponse.json({ error: "VIDYA could not answer right now. Please try again shortly." }, { status: 502 });
    }

    const data = await groqResponse.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (typeof reply !== "string" || !reply.trim()) {
      return NextResponse.json({ error: "VIDYA returned an empty response. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ reply: reply.trim() });
  } catch (error) {
    console.error("VIDYA route error:", error);
    return NextResponse.json({ error: "VIDYA is unavailable right now. Please try again shortly." }, { status: 500 });
  }
}

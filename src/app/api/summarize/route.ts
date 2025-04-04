import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { content } = await req.json();
  
  if (!content) {
    return NextResponse.json({ error: "Missing content" }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat", // or a specific DeepSeek model name
        messages: [
          {
            role: "system",
            content: "You are a helpful and motivational journaling assistant. Summarize the user's journal entry in 2-3 sentences, focusing on emotional tone, key points, and constructive insight.",
          },
          {
            role: "user",
            content,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    console.log("DeepSeek API response:", data);

    const summary = data.choices?.[0]?.message?.content;

    return NextResponse.json({ summary });
  } catch (err) {
    console.error("DeepSeek API error:", err);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}

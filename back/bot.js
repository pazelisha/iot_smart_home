const { Bot } = require("grammy");
require("dotenv").config();
const fetch = require("node-fetch");

const bot = new Bot(process.env.TELEGRAM_KEY);
const BACKEND_URL = "http://localhost:5001/send-to-groq";

const conversationHistories = new Map();

const SYSTEM_PROMPT = {
  role: "system",
  content: `You are a highly knowledgeable dog care expert specializing in Golden Retrievers. You answer concisely. My name is Paz ('פז'), and I have a 5-year-old Golden Retriever named Buddy. Provide brief, expert advice tailored to Golden Retrievers' care and well-being.`,
};

async function sendMessageToBackend(messages) {
  // Format the conversation history as a text string
  const text = messages
    .map((msg) => {
      if (msg.role === "system") return `System: ${msg.content}`;
      if (msg.role === "user") return `User: ${msg.content}`;
      if (msg.role === "assistant") return `Assistant: ${msg.content}`;
      return `${msg.role}: ${msg.content}`;
    })
    .join("\n");

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send the concatenated text in the "text" field
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    console.log("Backend response:", data);
    return data.choices?.[0]?.message?.content || "No response from AI.";
  } catch (error) {
    console.error("Error communicating with backend:", error);
    return "Error fetching response.";
  }
}

// Listen for text messages from users
bot.on("message:text", async (ctx) => {
  const chatId = ctx.chat.id;
  const userMessage = ctx.message.text;

  // Initialize conversation history if not already present
  if (!conversationHistories.has(chatId)) {
    conversationHistories.set(chatId, [SYSTEM_PROMPT]);
  }
  const history = conversationHistories.get(chatId);

  // Append the user's message to the history
  history.push({ role: "user", content: userMessage });

  // Send the entire conversation (formatted as text) to the backend
  const aiReply = await sendMessageToBackend(history);

  // Append the AI's reply to the history
  history.push({ role: "assistant", content: aiReply });

  // Reply to the user with the AI's response
  ctx.reply(aiReply);
});

bot.command("clear", (ctx) => {
  conversationHistories.delete(ctx.chat.id);
  ctx.reply("Conversation history cleared.");
});

bot.start();
console.log("Bot started");

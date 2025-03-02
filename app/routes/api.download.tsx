import type { Route } from "./+types/api.download";
import { data } from "react-router";

export const action = async ({ request }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    return data({ message: `only POST is allowed` }, { status: 405 });
  }

  const update = await request.json();
  // Handle messages
  if (update.message?.text) {
    const chatId = update.message.chat.id;
    const text = update.message.text;
    // Send reply
    console.log(`Sending reply to chat ${chatId}, text: ${text}`);
  }
};

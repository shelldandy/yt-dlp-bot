import type { Route } from "./+types/api.download";
import { downloader } from "~/utils/downloader";
import { data } from "react-router";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  if (!q)
    return data(
      { ok: false, message: `missing query to download` },
      { status: 400 }
    );
  const chatId = url.searchParams.get("chat_id");
  const downloadUrl = downloader({ url: q });
  return { ok: true, q, chatId, downloadUrl };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const update = await request.json();
  // Handle messages
  if (update.message?.text) {
    const chatId = update.message.chat.id;
    const text = update.message.text;
    // Send reply
    console.log(`Sending reply to chat ${chatId}, text: ${text}`);
  }
};

import type { Route } from "./+types/api.download";
import { data } from "react-router";
import type { Update } from "node-telegram-bot-api";
import { getBot } from "~/utils/getBot";
import { getInfo, download } from "~/utils/downloader";

const handleDownload = async (url: string, chatId: number) => {
  const bot = getBot();
  const message = await download(url);
  bot.sendMessage(chatId, `${message}`);
};

export const action = async ({ request }: Route.ActionArgs) => {
  let update: Update;
  const bot = getBot();
  if (request.method !== "POST") {
    return data({ message: `only POST is allowed` }, { status: 405 });
  }

  if (request.headers.get("content-type") !== "application/json") {
    return data(
      { message: `only application/json is allowed` },
      { status: 415 }
    );
  }

  update = await request.json();
  if (update.message?.text && update.message?.chat?.id) {
    const chatId = update.message.chat.id;
    const url = update.message.text;
    bot.sendMessage(chatId, `Instruction received. Processing...`);

    const info = await getInfo(url, {});

    if (typeof info === "string") return { status: "ERROR", message: info };

    handleDownload(url, chatId);

    return {
      status: "OK",
      chatId,
      title: info.title,
    };
  }
};

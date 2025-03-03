import type { Route } from "./+types/api.download";
import { data } from "react-router";
import type { Update } from "node-telegram-bot-api";
import youtubedl from "youtube-dl-exec";
import type { Flags, Payload } from "youtube-dl-exec";
import { getConfig } from "~/utils/getConfig";
import { getBot } from "~/utils/getBot";

const getInfo = (url: string, flags: Flags): Promise<Payload | string> =>
  youtubedl(url, { dumpSingleJson: true, ...flags });

export const download = (url: string) => {
  const config = getConfig();
  return youtubedl.exec(url, {
    output: `${config.mediaDir}/%(title)s.%(ext)s`,
    recodeVideo: config.preferredVideoExtension,
  });
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

  // Handle messages
  if (update.message?.text && update.message?.chat?.id) {
    const chatId = update.message.chat.id;
    const url = update.message.text;
    bot.sendMessage(chatId, `Instruction received. Processing...`);

    const info = await getInfo(url, {});

    if (typeof info === "string") return { status: "ERROR", message: info };

    bot.sendMessage(
      chatId,
      `Video: ${info.title} | Resolution ${info.resolution}`
    );
    //await download(url);

    return {
      status: "OK",
      chatId,
      title: info.title,
    };
  }
};

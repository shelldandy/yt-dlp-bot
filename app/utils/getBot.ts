import TelegramBot from "node-telegram-bot-api";
import { getConfig } from "~/utils/getConfig";
const config = getConfig();

const bot = new TelegramBot(config.token);

export const getBot = (): TelegramBot => bot;

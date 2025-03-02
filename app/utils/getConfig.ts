import config from "config";

export type Config = {
  token: string;
  serverUrl: string;
  preferredVideoExtension?: string;
};

export function getConfig(): Config {
  return {
    token: config.get("TG_BOT_TOKEN"),
    serverUrl: config.get("SERVER_URL"),
    preferredVideoExtension: config.get("PREFERRED_VIDEO_EXTENSION"),
  };
}

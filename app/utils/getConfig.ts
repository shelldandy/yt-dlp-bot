import config from "config";

export type Config = {
  token: string;
  serverUrl: string;
  preferredVideoExtension?: string;
  mediaDir?: string;
};

const defaultConfig: Partial<Config> = {
  preferredVideoExtension: "mp4",
  mediaDir: "/share",
};

export function getConfig(): Config {
  const userConfig: Config = {
    token: config.get("TG_BOT_TOKEN"),
    serverUrl: config.get("SERVER_URL"),
    preferredVideoExtension: config.get("PREFERRED_VIDEO_EXTENSION"),
    mediaDir: config.get("MEDIA_DIR"),
  };

  return {
    ...defaultConfig,
    ...userConfig,
  };
}

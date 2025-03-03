import youtubedl from "youtube-dl-exec";
import type { Flags, Payload } from "youtube-dl-exec";
import { getConfig } from "~/utils/getConfig";

export const getInfo = (url: string, flags: Flags): Promise<Payload | string> =>
  youtubedl(url, { dumpSingleJson: true, ...flags });

export const download = (url: string) => {
  const config = getConfig();
  return youtubedl.exec(url, {
    output: `${config.mediaDir}/%(title)s.%(ext)s`,
    recodeVideo: config.preferredVideoExtension,
  });
};

import youtubedl from "youtube-dl-exec";
import type { Flags, Payload } from "youtube-dl-exec";
import { getConfig } from "~/utils/getConfig";

const getDefaultOptions = (): Partial<Flags> => {
  const config = getConfig();
  return {
    output: `${config.mediaDir}/%(title)s.%(ext)s`,
    recodeVideo: config.preferredVideoExtension,
  };
};

export const getInfo = (url: string, flags: Flags): Promise<Payload | string> =>
  youtubedl(url, { ...getDefaultOptions(), dumpSingleJson: true, ...flags });

export const download = (url: string) => {
  return youtubedl.exec(url, getDefaultOptions());
};

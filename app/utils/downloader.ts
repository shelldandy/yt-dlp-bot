interface Downloader {
  url: string;
}

export const downloader = (props: Downloader) => {
  const { url } = props;
  return url;
};

import type { Route } from "./+types/home";
import { getConfig } from "~/utils/getConfig";

export const meta = [{ title: "yt-dlp telegram-bot" }];

export const loader = async () => {
  const config = getConfig();
  return {
    ok: true,
    message: `hello world, try searching on '/api/download'`,
    config,
  };
};

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <pre>
      <code>{JSON.stringify(loaderData, null, 2)}</code>
    </pre>
  );
}

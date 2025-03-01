const message = `hello world, try searching on '/api/download'`;

export const loader = async () => {
  return { ok: true, message };
};

export default function Home() {
  return message;
}

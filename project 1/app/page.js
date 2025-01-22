import Link from "next/link";

export default function Home() {
  return (
    <main>
      <img src="/logo.png" alt="A server surrounded by magic sparkles." />
      <h1>Welcome to this NextJS Course!</h1>
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p>
        About us: <Link href="/about">link</Link>
      </p>
      <p>
        Blog: <Link href="/blog">link</Link>
      </p>
    </main>
  );
}

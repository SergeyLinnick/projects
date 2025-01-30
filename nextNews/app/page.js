import Link from "next/link";

export default function HomePage() {
  return (
    <div id="home">
      <h1>NextNews</h1>
      <Link href="/news">News</Link>
    </div>
  );
}

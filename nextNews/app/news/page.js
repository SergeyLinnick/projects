import Link from "next/link";

export default function NewsPage() {
  return (
    <div>
      <h1>News</h1>
      <ul>
        <li>
          <Link href="news/1">First News Item</Link>
        </li>
        <li>
          <Link href="news/2">Second News Item</Link>
        </li>
      </ul>
    </div>
  );
}

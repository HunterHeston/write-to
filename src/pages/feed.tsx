import type { PostMeta } from "@/types/post";
import { getUserFeed } from "@/utils/data/fakeFeed";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Feed() {
  const { data, status } = useSession();
  const [feed, setFeed] = useState<PostMeta[]>([]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <>
        <div>Your feed would go here!</div>
        <div>But you&apos;re not logged in, so you can&apos;t see it.</div>
        <div>
          Head to the <Link href="/login">login</Link> page or{" "}
          <Link href="/signup">sign up</Link> to start building your feed!
        </div>
      </>
    );
  }

  getUserFeed(data?.user.name ?? "")
    .then((feed) => setFeed(feed))
    .catch(console.error);

  return (
    <div>
      {data && (
        <div>
          <h1>Welcome, {data.user.name}!</h1>
        </div>
      )}
      <div>
        <h2 className="mb-8">Your feed</h2>
        <ul>
          {feed.map((post) => (
            <li key={post.slug} className="mb-4">
              <Link href={`/${post.author}/${post.slug}`}>{post.title}</Link>
              <div>By {post.author}</div>
              <div>Published {post.publishDate}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

type PostMeta = {
  slug: string;
  author: string;
  title: string;
  publishDate: string;
};

export default function Feed() {
  const { data, status, update } = useSession();
  const [feed, setFeed] = useState<PostMeta[]>([]);

  getUserFeed().then((feed) => setFeed(feed));

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <>
        <div>Your feed would go here!</div>
        <div>But you're not logged in, so you can't see it.</div>
        <div>
          Head to the <Link href="/login">login</Link> page or{" "}
          <Link href="/signup">sign up</Link> to start building your feed!
        </div>
      </>
    );
  }

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

async function getUserFeed() {
  const fakePosts: PostMeta[] = [
    {
      slug: "one",
      author: "jane",
      title: "My first post",
      publishDate: "2021-01-01",
    },
    {
      slug: "two",
      author: "jane",
      title: "My second post",
      publishDate: "2021-01-02",
    },
    {
      slug: "three",
      author: "jane",
      title: "My third post",
      publishDate: "2021-01-03",
    },
  ];

  const p = new Promise<PostMeta[]>((res, rej) => {
    res(fakePosts);
  });
  return p;
}

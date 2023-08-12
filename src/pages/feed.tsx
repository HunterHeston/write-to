import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

type PostMeta = {
  slug: string;
  author: string;
  title: string;
  publishDate: string;
};

export default function Feed() {
  const { data, status } = useSession();
  const [feed, setFeed] = useState<PostMeta[]>([]);

  getUserFeed()
    .then((feed) => setFeed(feed))
    .catch(console.error);

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

async function getUserFeed(author: string = "jane") {
  const fakePosts: PostMeta[] = [
    {
      slug: "one",
      author: author,
      title: "My first post",
      publishDate: "2021-01-01",
    },
    {
      slug: "two",
      author: author,
      title: "My second post",
      publishDate: "2021-01-02",
    },
    {
      slug: "three",
      author: author,
      title: "My third post",
      publishDate: "2021-01-03",
    },
  ];

  const p = new Promise<PostMeta[]>((res, _) => {
    res(fakePosts);
  });
  return p;
}

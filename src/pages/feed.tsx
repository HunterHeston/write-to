import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Feed() {
  const { data, status } = useSession();
  const {
    data: feedData,
    status: feedStatus,
    error: feedError,
  } = api.feed.getFeed.useQuery();

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
          {feedData?.map((post) => (
            <li key={post.post.slug} className="mb-4">
              <Link href={`/${post.profileName}/${post.post.slug}`}>
                {post.post.title}
              </Link>
              <div>By {post.profileName}</div>
              <div>Published {post.post.createdAt.toDateString()}</div>
            </li>
          ))}
        </ul>
        {feedStatus === "loading" && <div>feed is loading...</div>}
        {feedStatus === "error" && (
          <div>failed to load feed {feedError.message}</div>
        )}
      </div>
    </div>
  );
}

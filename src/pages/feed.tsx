import PostCard from "@/components/post/postCard";
import { H1 } from "@/components/ui/typography";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Feed() {
  const { status } = useSession();
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
    <div className="flex flex-col p-5">
      <H1 className="mb-5">New things</H1>
      <div>
        <ul>
          {feedData?.map((post) => (
            <PostCard
              className="mb-5"
              postMeta={{
                title: post.post.title,
                slug: post.post.slug,
                id: post.post.id,
                publishDate: post.post.createdAt.toISOString(),
                profileName: post.profileName,
                avatar: post.avatar,
              }}
              key={post.post.id}
            ></PostCard>
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

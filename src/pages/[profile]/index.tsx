/**
 * The main profile page for any individual author.
 *
 * It's main purposes are to:
 * 1. Display the basic available information about an author. Username, About, etc.
 * 2. Display a reverse chronological list of all posts by the author.
 */

import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { PostMeta } from "@/types/post";
import { getUserFeed } from "@/utils/data/fakeFeed";

interface ProfileProps {
  profile: string;
}

export default function Profile({ profile }: ProfileProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<PostMeta[]>([]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  getUserFeed(profile)
    .then((posts) => setPosts(posts))
    .catch(console.error);

  return (
    <div>
      <h1>{profile}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-4">
            <Link href={`/${post.author}/${post.slug}`}>{post.title}</Link>
            <div>Published {post.publishDate}</div>
            <div>{post.visibility}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

////////////////////////////////////
// NextJS build time functions
////////////////////////////////////
export const getStaticPaths: GetStaticPaths = () => {
  // Fetch profiles from an API or database
  const profiles = ["john", "jane", "doe"];

  // Map the profiles to an array of objects with `params` key
  const paths = profiles.map((profile) => ({
    params: { profile },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<ProfileProps> = ({ params }) => {
  // Fetch profile data from an API or database
  const profile = params?.profile as string;

  return { props: { profile } };
};

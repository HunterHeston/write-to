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

interface ProfileProps {
  profile: string;
}

type PostMeta = {
  slug: string;
  author: string;
  title: string;
  publishDate: string;
  visibility: string;
};

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

export const getStaticProps: GetStaticProps<ProfileProps> = async ({
  params,
}) => {
  // Fetch profile data from an API or database
  const profile = params?.profile as string;

  return { props: { profile } };
};

// Fake fetching of the users posts
async function getUserFeed(author: string) {
  const fakePosts: PostMeta[] = [
    {
      slug: "one",
      author: author,
      title: "My first post",
      publishDate: "2021-01-01",
      visibility: "All",
    },
    {
      slug: "two",
      author: author,
      title: "My second post",
      publishDate: "2021-01-02",
      visibility: "Just Me",
    },
    {
      slug: "three",
      author: author,
      title: "My third post",
      publishDate: "2021-01-03",
      visibility: "Approved",
    },
  ];

  const p = new Promise<PostMeta[]>((res, _) => {
    res(fakePosts);
  });
  return p;
}

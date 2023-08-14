/**
 * The main profile page for any individual author.
 *
 * It's main purposes are to:
 * 1. Display the basic available information about an author. Username, About, etc.
 * 2. Display a reverse chronological list of all posts by the author.
 */

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { getUserFeed } from "@/utils/data/fakeFeed";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { PostMeta } from "@/types/post";
import { prisma } from "@/server/db";
import { PostVisibility } from "@prisma/client";

interface ProfileProps {
  profile: string;
  posts?: PostMeta[];
}

export default function Profile({ profile, posts }: ProfileProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{profile}</h1>
      <h2>Posts</h2>
      {!posts ||
        (posts.length === 0 && (
          <div>
            This human is working on their first post. Check back later!
          </div>
        ))}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.slug} className="mb-4">
              <Link href={`/${post.profile}/${post.slug}`}>{post.title}</Link>
              <div>Published {post.publishDate}</div>
              <div>{post.visibility}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

////////////////////////////////////
// NextJS build time functions
////////////////////////////////////
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const profiles = await prisma.profile.findMany({
      select: {
        name: true,
      },
    });

    console.log("Generating paths for profiles: ", profiles);

    // Map the profiles to an array of objects with `params` key
    const paths = profiles.map((profile) => ({
      params: { profile: profile.name },
    }));

    return { paths, fallback: true };
  } catch (e) {
    console.error("Error generating static paths: ", e);
    throw e;
  }
};

export const getStaticProps: GetStaticProps<ProfileProps> = async ({
  params,
}) => {
  // Fetch profile data from an API or database
  const profile = params?.profile as string;

  try {
    const user = await prisma.profile.findUnique({
      where: {
        name: profile,
      },
    });

    if (!user) {
      return { notFound: true };
    }

    const posts = await prisma.post.findMany({
      where: {
        profile: {
          name: profile,
        },
        visibility: PostVisibility.PUBLIC,
      },
      select: {
        title: true,
        createdAt: true,
        id: true,
        slug: true,
      },
    });
    const postMetaData: PostMeta[] = posts.map((post) => ({
      title: post.title,
      publishDate: post.createdAt.toISOString(),
      profile: profile,
      slug: post.slug,
    }));

    return { props: { profile, posts: postMetaData } };
  } catch (e) {
    console.error("Error fetching profile data: ", e);
    return { notFound: true };
  }
};

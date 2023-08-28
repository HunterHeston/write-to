/**
 * The main profile page for any individual author.
 *
 * It's main purposes are to:
 * 1. Display the basic available information about an author. Username, About, etc.
 * 2. Display a reverse chronological list of all posts by the author.
 */

import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { PostMeta } from "@/types/post";
import { prisma } from "@/server/db";
import { PostVisibility, Profile } from "@prisma/client";
import { useSession } from "next-auth/react";
import { EditableBio } from "@/components/editableBio";
import PostCard from "@/components/post/postCard";
import FollowButton from "@/components/followButton";
import { H1, H2 } from "@/components/ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { daysSince } from "@/utils/dates";
import { Cake } from "lucide-react";

interface ProfileProps {
  profileName: string;
  bio: string | null;
  dateJoined: string;
  posts?: PostMeta[];
  profileId: string;
  avatarURL: string | null;
}

export default function Profile({
  profileName,
  bio,
  dateJoined,
  posts,
  profileId,
  avatarURL,
}: ProfileProps) {
  const router = useRouter();
  const { data } = useSession();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const userViewingOwnProfile = data?.user.name === profileName;

  return (
    <div className="flex flex-col p-5">
      <AvatarContainer profileName={profileName} avatarURL={avatarURL} />
      {/* profile meta data */}
      <div className="mb-4 flex h-8 items-center gap-2">
        <Cake className="inline"></Cake>
        <p className="align-middle">
          Joined{" "}
          <span className="text-primary">
            {daysSince(new Date(dateJoined))}
          </span>{" "}
          days ago
        </p>
      </div>

      {/* bio */}
      <EditableBio
        className="mb-8"
        bio={bio ?? ""}
        canEdit={userViewingOwnProfile}
      />
      {!userViewingOwnProfile && (
        <FollowButton profileId={profileId}></FollowButton>
      )}
      <H2 className="mb-6">Posts</H2>
      {!posts ||
        (posts.length === 0 && (
          <div>
            This human is working on their first post. Check back later!
          </div>
        ))}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-4">
              <PostCard postMeta={post} showEdit={userViewingOwnProfile} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AvatarContainer({
  profileName,
  avatarURL,
}: {
  profileName: string;
  avatarURL: string | null;
}) {
  return (
    <div className="mb-6 flex gap-5">
      <Avatar>
        <AvatarImage
          src={avatarURL ?? ""}
          alt={`${profileName}'s avatar`}
        ></AvatarImage>
        <AvatarFallback>{profileName.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <H1>{profileName}</H1>
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
  const profileName = params?.profile as string;

  try {
    const profile = await prisma.profile.findUnique({
      where: {
        name: profileName,
      },
    });

    if (!profile) {
      return { notFound: true };
    }

    const posts = await prisma.post.findMany({
      where: {
        profile: {
          name: profileName,
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
      profileName: profile.name,
      slug: post.slug,
      id: post.id,
      avatar: profile.avatar,
    }));

    return {
      props: {
        profileName: profile.name,
        bio: profile.bio,
        dateJoined: profile.createdAt.toISOString(),
        profileId: profile.id,
        posts: postMetaData,
        avatarURL: profile.avatar,
      },
      revalidate: 15,
    };
  } catch (e) {
    console.error("Error fetching profile data: ", e);
    return { notFound: true };
  }
};

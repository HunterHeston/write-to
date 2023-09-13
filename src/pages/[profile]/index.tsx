/**
 * The main profile page for any individual author.
 *
 * It's main purposes are to:
 * 1. Display the basic available information about an author. Username, About, etc.
 * 2. Display a reverse chronological list of all posts by the author.
 */

import type { GetServerSideProps } from "next";
import { Profile } from "@prisma/client";
import { getSession, useSession } from "next-auth/react";
import { EditableBio } from "@/components/editableBio";
import PostCard from "@/components/post/postCard";
import FollowButton from "@/components/followButton";
import { H1, H2 } from "@/components/ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { daysSince } from "@/utils/dates";
import { Cake } from "lucide-react";
import {
  type ProfileData,
  getProfileData,
  isUserApprovedFollower,
} from "@/server/db/posts";

interface ProfileProps {
  profile: ProfileData;
  state: ViewingState;
}

enum ViewingState {
  OWN_PROFILE,
  FOLLOWING_PROFILE,
  NOT_FOLLOWING_PROFILE,
}

export default function Profile({ profile }: ProfileProps) {
  const { data } = useSession();

  const userViewingOwnProfile = data?.user.name === profile.name;

  return (
    <div className="flex flex-col p-5">
      <AvatarContainer
        profileName={profile.name}
        avatarURL={profile.avatarURL}
      />
      {/* profile meta data */}
      <div className="mb-4 flex h-8 items-center gap-2">
        <Cake className="inline"></Cake>
        <p className="align-middle">
          Joined{" "}
          <span className="text-primary">
            {daysSince(new Date(profile.dateJoined))}
          </span>{" "}
          days ago
        </p>
      </div>

      {/* bio */}
      <EditableBio
        className="mb-8"
        bio={profile.bio ?? ""}
        canEdit={userViewingOwnProfile}
      />
      {!userViewingOwnProfile && (
        <FollowButton profileId={profile.profileId}></FollowButton>
      )}
      <H2 className="mb-6">Posts</H2>
      {!profile.posts ||
        (profile.posts.length === 0 && (
          <div>
            This human is working on their first post. Check back later!
          </div>
        ))}
      {profile.posts && (
        <ul>
          {profile.posts.map((post) => (
            <li key={post.id} className="mb-4">
              <PostCard postMeta={post} />
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
// NextJS page functions
////////////////////////////////////
export const getServerSideProps: GetServerSideProps<ProfileProps> = async (
  context
) => {
  const session = await getSession(context);

  try {
    const profile = await getProfileData(context.params?.profile as string);
    if (!profile) {
      return { notFound: true };
    }

    // if there is no session the result is the same as if they are logged in but not following.
    const isFollowing = await isUserApprovedFollower(
      profile.profileId,
      session?.user.profileId ?? ""
    );

    if (!isFollowing) {
      // non-followers can't see posts.
      profile.posts = [];
      return {
        props: {
          profile: profile,
          state: ViewingState.NOT_FOLLOWING_PROFILE,
        },
      };
    }

    // user is logged in and approved to see this users posts.
    return {
      props: {
        profile: profile,
        state: ViewingState.FOLLOWING_PROFILE,
      },
    };
  } catch (e) {
    console.error("Error fetching profile data: ", e);
    return { notFound: true };
  }
};

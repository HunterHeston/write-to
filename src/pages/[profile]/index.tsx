/**
 * The main profile page for any individual author.
 *
 * It's main purposes are to:
 * 1. Display the basic available information about an author. Username, About, etc.
 * 2. Display a reverse chronological list of all posts by the author.
 */

import Link from "next/link";
import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import type { PostMeta } from "@/types/post";
import { prisma } from "@/server/db";
import { PostVisibility, Profile } from "@prisma/client";
import { Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";

interface ProfileProps {
  profileName: string;
  bio: string | null;
  dateJoined: string;
  posts?: PostMeta[];
}

export default function Profile({
  profileName,
  bio,
  dateJoined,
  posts,
}: ProfileProps) {
  const router = useRouter();
  const { data } = useSession();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{profileName}</h1>
      <p>Member since {new Date(dateJoined).toDateString()}</p>
      <EditableBio bio={bio} canEdit={profileName === data?.user.name} />
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
              <Link href={`/${post.profileName}/${post.slug}`}>
                {post.title}
              </Link>
              <div>Published {post.publishDate}</div>
              <div>{post.visibility}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EditableBio({
  bio,
  canEdit,
}: {
  bio: string | null;
  canEdit: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBio, setUpdatedBio] = useState(bio);

  if (isEditing) {
    return (
      <BioEditor
        bio={updatedBio ?? ""}
        setIsEditing={setIsEditing}
        setUpdatedBio={setUpdatedBio}
      />
    );
  }

  return (
    <div className="flex">
      <p>About: {updatedBio}</p>
      {canEdit && (
        <button onClick={() => setIsEditing(!isEditing)}>
          <Edit size={24}></Edit>
        </button>
      )}
    </div>
  );
}

function BioEditor({
  bio = "",
  setIsEditing,
  setUpdatedBio,
}: {
  bio: string;
  setIsEditing: (isEditing: boolean) => void;
  setUpdatedBio: (bio: string) => void;
}) {
  const [newBio, setNewBio] = useState(bio);
  const { mutate, error } = api.profile.updateBio.useMutation();

  const update = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ bio: newBio });
    setIsEditing(false);
    setUpdatedBio(newBio);
    console.log("Updating bio to: ", newBio);
  };

  return (
    <form onSubmit={(e) => update(e)}>
      <textarea
        onChange={(e) => setNewBio(e.target.value)}
        value={newBio}
      ></textarea>
      {error && <div>Error updating bio: {error.message}</div>}
      <button>Save</button>
    </form>
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
    }));

    return {
      props: {
        profileName: profile.name,
        bio: profile.bio,
        dateJoined: profile.createdAt.toISOString(),
        posts: postMetaData,
      },
    };
  } catch (e) {
    console.error("Error fetching profile data: ", e);
    return { notFound: true };
  }
};

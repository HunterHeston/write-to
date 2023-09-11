import { prisma } from "@/server/db/db";
import { PostMeta } from "@/types/post";

export type ProfileData = {
  name: string;
  bio: string | null;
  dateJoined: string;
  posts?: PostMeta[];
  profileId: string;
  avatarURL: string | null;
};

export async function getProfileData(
  name: string
): Promise<ProfileData | null> {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        name: name,
      },
    });

    if (!profile) {
      return null;
    }

    const posts = await prisma.post.findMany({
      where: {
        profile: {
          name: name,
        },
      },
      select: {
        title: true,
        createdAt: true,
        id: true,
        slug: true,
      },
      orderBy: {
        createdAt: "desc",
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
      name: profile.name,
      bio: profile.bio,
      dateJoined: profile.createdAt.toISOString(),
      profileId: profile.id,
      posts: postMetaData,
      avatarURL: profile.avatar,
    };
  } catch (e) {
    console.error("Error fetching profile data: ", e);
    return null;
  }
}

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import type { FeedItem } from "@/types/post";
import type { Profile } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const feedRouter = createTRPCRouter({
  getFeed: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    try {
      // get the profile id associated with the user logged in.
      const profile = await ctx.prisma.profile.findUnique({
        where: {
          userId: userId,
        },
      });
      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Profile not found",
        });
      }

      // get the profiles ids that this user is following
      const following = await ctx.prisma.profileFollower.findMany({
        where: {
          followerId: profile.id,
        },
        select: {
          followingId: true,
        },
      });

      // get the profiles that this user is following
      const profiles = await ctx.prisma.profile.findMany({
        where: {
          id: {
            in: following.map((res) => res.followingId),
          },
        },
      });

      const profileMap = new Map<string, Profile>();
      for (const p of profiles) {
        profileMap.set(p.id, p);
      }

      const profilePostsToFetch = profiles.map((p) => p.id);

      const feedPosts = await ctx.prisma.post.findMany({
        where: {
          profileId: {
            in: profilePostsToFetch,
          },
        },
      });

      const feedItems: FeedItem[] = [];
      for (const post of feedPosts) {
        const p = profileMap.get(post.profileId);
        if (!p) {
          console.error(
            `Did not fetch profile for postId: ${post.id} by profileId: ${post.profileId}`
          );
          continue;
        }

        feedItems.push({
          post: post,
          profileName: p.name,
        });
      }

      return feedItems;
    } catch (e) {
      console.error("Failed to update post: ", e);
    }
  }),

  // deletePost
  // getPostById
  // getPostBySlug

  // getPostsByAuthor
});

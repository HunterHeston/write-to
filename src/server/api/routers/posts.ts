import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { PostVisibility } from "@prisma/client";
import { slugify } from "@/utils/slug";
import { TRPCError } from "@trpc/server";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        visibility: z.nativeEnum(PostVisibility),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      try {
        const slug = slugify(input.title);
        await ctx.prisma.post.create({
          data: {
            title: input.title,
            content: input.content,
            visibility: input.visibility,
            slug: slug,
            profile: {
              connect: {
                userId: userId,
              },
            },
          },
        });
      } catch (e) {
        console.error("Failed to create post: ", e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  updatePost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        visibility: z.nativeEnum(PostVisibility),
        pid: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
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

        const slug = slugify(input.title);

        const post = await ctx.prisma.post.update({
          where: {
            // Update the existing post.
            id: input.pid,
            // Only update it if the post is associated with the logged in user.
            profileId: profile.id,
          },
          data: {
            title: input.title,
            content: input.content,
            visibility: input.visibility,
            slug: slug,
          },
        });

        console.log("Updated post", post);
      } catch (e) {
        console.error("Failed to update post: ", e);
      }
    }),
  deletePost: protectedProcedure
    .input(
      z.object({
        pid: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
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

        const post = await ctx.prisma.post.delete({
          where: {
            // Update the existing post.
            id: input.pid,
            // Only update it if the post is associated with the logged in user.
            profileId: profile.id,
          },
        });

        console.log("Deleted post", post);
      } catch (e) {
        console.error("Failed to update post: ", e);
      }
    }),

  // deletePost
  // getPostById
  // getPostBySlug

  // getPostsByAuthor
});

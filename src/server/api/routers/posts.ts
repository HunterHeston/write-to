import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { PostVisibility } from "@prisma/client";
import { slugify } from "@/utils/slug";

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

      const slug = slugify(input.title);

      try {
        const post = await ctx.prisma.post.create({
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

        console.log("Created post", post);
      } catch (e) {
        console.error("Failed to create post: ", e);
      }
    }),
  // updatePost
  // deletePost
  // getPostById
  // getPostBySlug

  // getPostsByAuthor
});

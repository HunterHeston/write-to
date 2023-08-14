import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        profileId: z.string(),
      })
    )
    .mutation(({ input }) => {
      return input;
    }),
  // updatePost
  // deletePost
  // getPostById
  // getPostBySlug

  // getPostsByAuthor
});

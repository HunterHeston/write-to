import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { PostVisibility } from "@prisma/client";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        visibility: z.nativeEnum(PostVisibility),
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

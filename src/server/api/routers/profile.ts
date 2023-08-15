import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const profileRouter = createTRPCRouter({
  updateBio: protectedProcedure
    .input(
      z.object({
        bio: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { bio } = input;

      const profile = await ctx.prisma.profile.findUnique({
        where: {
          userId: ctx.session?.user?.id,
        },
      });

      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Profile not found",
        });
      }

      const updatedProfile = ctx.prisma.profile.update({
        where: {
          id: profile.id,
        },
        data: {
          bio: bio,
        },
      });

      return updatedProfile;
    }),
});

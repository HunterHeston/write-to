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
  followRequest: protectedProcedure
    .input(
      z.object({
        profileId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const requestor = ctx.session.user.id;
      const profileToFollow = input.profileId;

      try {
        const requestingProfile = await ctx.prisma.profile.findUnique({
          where: {
            userId: requestor,
          },
          select: {
            id: true,
          },
        });

        if (!requestingProfile) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "The profile requesting to follow does not exist.",
          });
        }

        await ctx.prisma.followRequest.create({
          data: {
            requesting: {
              connect: {
                id: profileToFollow,
              },
            },
            requestor: {
              connect: {
                id: requestingProfile.id,
              },
            },
          },
        });
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  listFollowerRequests: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

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

    const followerRequests = await ctx.prisma.followRequest.findMany({
      where: {
        requestingId: profile.id,
      },
      include: {
        requestor: {
          select: {
            name: true,
            bio: true,
          },
        },
      },
    });

    return followerRequests;
  }),
  acceptFollowerRequest: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        requestorId: z.string(),
        requestingId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const deletedFollowRequest = ctx.prisma.followRequest.delete({
          where: {
            id: input.id,
          },
        });

        const newFollower = ctx.prisma.profileFollower.create({
          data: {
            follower: {
              connect: {
                id: input.requestorId,
              },
            },
            following: {
              connect: {
                id: input.requestingId,
              },
            },
          },
        });

        await ctx.prisma.$transaction([deletedFollowRequest, newFollower]);

        return { success: true };
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  rejectFollowerRequest: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        requestorId: z.string(),
        requestingId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const res = await ctx.prisma.followRequest.delete({
          where: {
            id: input.id,
          },
        });

        return { success: true };
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});

import type { Post } from "@prisma/client";

export type PostMeta = {
  slug: string;
  profileName: string;
  title: string;
  publishDate: string;
  id: string;
  avatar: string | null;
};

export type FeedItem = {
  profileName: string;
  post: Post;
  avatar: string | null;
};

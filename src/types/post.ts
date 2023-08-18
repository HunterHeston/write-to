import { Post, Profile } from "@prisma/client";

export type PostMeta = {
  slug: string;
  profileName: string;
  title: string;
  publishDate: string;
  visibility?: string;
  id: string;
};

export enum Visibility {
  All = "All",
  Approved = "Approved",
  JustMe = "Just Me",
  IntoTheEther = "Into the ether",
}

export type FeedItem = {
  profileName: string;
  post: Post;
};

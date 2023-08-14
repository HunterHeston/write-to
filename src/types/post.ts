export type PostMeta = {
  slug: string;
  author: string;
  title: string;
  publishDate: string;
  visibility: string;
};

export type Post = {
  meta: PostMeta;
  content: string;
};

export enum Visibility {
  All = "All",
  Approved = "Approved",
  JustMe = "Just Me",
  IntoTheEther = "Into the ether",
}

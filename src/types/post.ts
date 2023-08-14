export type PostMeta = {
  slug: string;
  profile: string;
  title: string;
  publishDate: string;
  visibility?: string;
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

export type PostMeta = {
  slug: string;
  profileName: string;
  title: string;
  publishDate: string;
  visibility?: string;
  id: string;
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

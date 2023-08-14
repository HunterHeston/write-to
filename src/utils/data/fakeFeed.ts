import type { PostMeta } from "@/types/post";

export async function getUserFeed(profile: string) {
  const fakePosts: PostMeta[] = [
    {
      slug: "one",
      profile: profile,
      title: "My first post",
      publishDate: "2021-01-01",
      visibility: "All",
    },
    {
      slug: "two",
      profile: profile,
      title: "My second post",
      publishDate: "2021-01-02",
      visibility: "Just Me",
    },
    {
      slug: "three",
      profile: profile,
      title: "My third post",
      publishDate: "2021-01-03",
      visibility: "Approved",
    },
  ];

  const p = new Promise<PostMeta[]>((res, _) => {
    res(fakePosts);
  });
  return p;
}

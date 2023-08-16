import type { PostMeta } from "@/types/post";

export async function getUserFeed(profile: string) {
  const fakePosts: PostMeta[] = [
    {
      slug: "one",
      id: "1",
      profileName: profile,
      title: "My first post",
      publishDate: "2021-01-01",
      visibility: "All",
    },
    {
      slug: "two",
      id: "2",
      profileName: profile,
      title: "My second post",
      publishDate: "2021-01-02",
      visibility: "Just Me",
    },
    {
      slug: "three",
      id: "3",
      profileName: profile,
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

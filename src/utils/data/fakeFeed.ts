import { PostMeta } from "@/types/post";

export async function getUserFeed(author: string) {
  const fakePosts: PostMeta[] = [
    {
      slug: "one",
      author: author,
      title: "My first post",
      publishDate: "2021-01-01",
      visibility: "All",
    },
    {
      slug: "two",
      author: author,
      title: "My second post",
      publishDate: "2021-01-02",
      visibility: "Just Me",
    },
    {
      slug: "three",
      author: author,
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

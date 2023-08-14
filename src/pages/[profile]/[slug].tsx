/**
 * This is the article page. It is used to display a single article.
 * Currently rendered at /:profile/:article.
 *
 * All articles are rendered at build time using getStaticProps and getStaticPaths.
 * At run time if there is no static article we will query and generate the static article.
 *
 * This is the route and component where people will spend their time reading.
 */

import ReactMarkdown from "react-markdown";
import type { GetStaticProps, GetStaticPaths } from "next";
import { fakePostMap } from "@/utils/data/posts";

type Article = {
  title: string;
  publishDate: string;
  content: string;
};

type Props = {
  article: Article;
};

export default function ArticlePage({ article }: Props) {
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.publishDate}</p>
      <ReactMarkdown>{article.content}</ReactMarkdown>
    </div>
  );
}

type Params = {
  params: {
    profile: string;
    slug: string;
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  // Replace this with your own implementation to fetch the article slugs

  const paths: Params[] = [];

  for (const user of Object.keys(fakePostMap)) {
    const posts = fakePostMap[user];
    if (posts) {
      for (const post of posts) {
        paths.push({
          params: { profile: post.meta.author, slug: post.meta.slug },
        });
      }
    }
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  Props,
  { profile: string; slug: string }
> = ({ params }) => {
  if (!params) throw new Error("No params");

  const { profile, slug } = params;

  const posts = fakePostMap[profile];
  const post = posts?.find((post) => post.meta.slug === slug);

  const article = {
    title: post?.meta.title || "No title",
    content: post?.content || "No content",
    publishDate: post?.meta.publishDate || "No publish date",
  };

  return { props: { article } };
};

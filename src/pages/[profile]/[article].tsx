import ReactMarkdown from "react-markdown";
import { GetStaticProps, GetStaticPaths } from "next";

type Article = {
  title: string;
  content: string;
};

type Profile = {
  name: string;
};

type Props = {
  article: Article;
};

export default function ArticlePage({ article }: Props) {
  return (
    <div>
      <h1>{article.title}</h1>
      <ReactMarkdown>{article.content}</ReactMarkdown>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Replace this with your own implementation to fetch the article slugs
  const articleSlugs = ["stub-article-slug-1", "stub-article-slug-2"];

  const paths = articleSlugs.map((slug) => ({
    params: { profile: "jane", article: slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  // Replace this with your own implementation to fetch the article content
  const article = {
    title: "Stub Article Title",
    content: "Stub Article Content",
  };

  return { props: { article } };
};

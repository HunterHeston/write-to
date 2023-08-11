import ReactMarkdown from "react-markdown";
import type { GetStaticProps, GetStaticPaths } from "next";

type Article = {
  title: string;
  content: string;
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

export const getStaticPaths: GetStaticPaths = () => {
  // Replace this with your own implementation to fetch the article slugs
  const articleSlugs = ["stub-article-slug-1", "stub-article-slug-2"];

  const paths = articleSlugs.map((slug) => ({
    params: { profile: "jane", article: slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  // Replace this with your own implementation to fetch the article content
  const article = {
    title: "Stub Article Title",
    content: "Stub Article Content",
  };

  return { props: { article } };
};

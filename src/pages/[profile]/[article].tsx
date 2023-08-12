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

export const getStaticPaths: GetStaticPaths = () => {
  // Replace this with your own implementation to fetch the article slugs
  const articleSlugs = ["one", "two"];

  const paths = articleSlugs.map((slug) => ({
    params: { profile: "jane", article: slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  // Replace this with your own implementation to fetch the article content
  const article = {
    title: "Stub Article Title",
    content: `
# Stub Article Content
This is some stub content for the article.

## Subheading
This is a subheading containing some **bold** text.

### Subsubheading
This is a subsubheading containing some *italic* text.

#### Subsubsubheading
This is a subsubsubheading containing some ~~strikethrough~~ text.

##### Subsubsubsubheading
This is a subsubsubsubheading containing some \`inline code\`.

###### Subsubsubsubsubheading
This is a subsubsubsubsubheading containing some [link text](https://example.com).
    `,
    publishDate: new Date().toDateString(),
  };

  return { props: { article } };
};

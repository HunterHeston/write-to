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
import { prisma } from "@/server/db";
import { useRouter } from "next/router";
import { PostVisibility } from "@prisma/client";

type Article = {
  title?: string;
  publishDate?: string;
  content?: string;
};

type Props = {
  article: Article;
};

export default function ArticlePage({ article }: Props) {
  const router = useRouter();

  if (!article) {
    return <div>Article not found</div>;
  }

  if (router.isFallback) {
    <div>Loading...</div>;
  }

  console.log(article);
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.publishDate}</p>
      <ReactMarkdown>{article.content ?? ""}</ReactMarkdown>
    </div>
  );
}

type Params = {
  params: {
    profile: string;
    slug: string;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: Params[] = [];

  try {
    const profiles = await prisma.profile.findMany({
      select: {
        name: true,
      },
    });

    for (const profile of profiles) {
      const posts = await prisma.post.findMany({
        where: {
          profile: {
            name: profile.name,
          },
          visibility: PostVisibility.PUBLIC,
        },
        select: {
          slug: true,
        },
      });

      for (const post of posts) {
        paths.push({
          params: {
            profile: profile.name,
            slug: post.slug,
          },
        });
      }
    }
  } catch (e) {
    console.error(e);
    throw e;
  }

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<
  Props,
  { profile: string; slug: string }
> = async ({ params }) => {
  if (!params) {
    return { notFound: true };
  }

  const { profile, slug } = params;

  try {
    const post = await prisma.post.findMany({
      where: {
        profile: {
          name: profile,
        },
        slug: slug,
      },
    });

    if (post.length === 0) {
      return { notFound: true };
    }

    return {
      props: {
        article: {
          content: post[0]?.content,
          publishDate: post[0]?.createdAt.toISOString(),
          title: post[0]?.title,
        },
      },
    };
  } catch (e) {
    console.error(e);
    return { notFound: true };
  }
};

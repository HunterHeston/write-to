/**
 * This is the article page. It is used to display a single article.
 * Currently rendered at /:profile/:article.
 *
 * All articles are rendered at build time using getStaticProps and getStaticPaths.
 * At run time if there is no static article we will query and generate the static article.
 *
 * This is the route and component where people will spend their time reading.
 */

import type { GetStaticProps, GetStaticPaths } from "next";
import { prisma } from "@/server/db";
import { useRouter } from "next/router";
import { PostVisibility } from "@prisma/client";
import Link from "next/link";
import { H1 } from "@/components/ui/typography";
import { Markdown } from "@/components/ui/reactMarkdown";
import Head from "next/head";

type Article = {
  title?: string;
  publishDate?: string;
  content?: string;
  profile: string;
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

  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta name="author" content={article.profile} />
        <meta name="date" content={article.publishDate ?? ""} />
      </Head>
      <div className="flex justify-center">
        <div className=" w-full px-5 pt-16">
          <H1>{article.title}</H1>
          <div className="my-5">
            <Link href={`/${article.profile}`}>
              By <span className="text-primary">{article.profile}</span>
            </Link>
          </div>
          <p className="border-l-2 border-l-zinc-600 pl-2 align-middle">
            {dateStringToDayMonthYear(article.publishDate ?? "")}
          </p>
          <Markdown>{article.content ?? ""}</Markdown>
        </div>
      </div>
    </>
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
          profile: profile,
        },
      },
    };
  } catch (e) {
    console.error(e);
    return { notFound: true };
  }
};

// Helper functions
// gets the human readable month, day and year from a date string
function dateStringToDayMonthYear(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

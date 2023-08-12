/**
 * The main profile page for any individual author.
 *
 * It's main purposes are to:
 * 1. Display the basic available information about an author. Username, About, etc.
 * 2. Display a reverse chronological list of all posts by the author.
 */

import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps } from "next";

interface ProfileProps {
  profile: string;
}

export default function Profile({ profile }: ProfileProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <div>Profile for {profile}</div>;
}

export const getStaticPaths: GetStaticPaths = () => {
  // Fetch profiles from an API or database
  const profiles = ["john", "jane", "doe"];

  // Map the profiles to an array of objects with `params` key
  const paths = profiles.map((profile) => ({
    params: { profile },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<ProfileProps> = ({ params }) => {
  // Fetch profile data from an API or database
  const profile = params?.profile as string;

  return { props: { profile } };
};

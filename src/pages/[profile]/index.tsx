import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";

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

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch profiles from an API or database
  const profiles = ["john", "jane", "doe"];

  // Map the profiles to an array of objects with `params` key
  const paths = profiles.map((profile) => ({
    params: { profile },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<ProfileProps> = async ({
  params,
}) => {
  // Fetch profile data from an API or database
  const profile = params?.profile as string;

  return { props: { profile } };
};

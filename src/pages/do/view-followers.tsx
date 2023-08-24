import { api } from "@/utils/api";
import Link from "next/link";

export default function ViewFollowers() {
  const { data, status } = api.profile.listFollowers.useQuery();

  return (
    <div>
      <h1>Followers</h1>
      <ul>
        {data?.map((follower) => (
          <Link key={follower.id} href={`/${follower.follower.name}`}>
            {follower.follower.name}
          </Link>
        ))}
      </ul>
    </div>
  );
}

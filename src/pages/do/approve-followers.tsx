import { api } from "@/utils/api";
import Link from "next/link";

export default function ApproveFollowers() {
  const { data, status, error } = api.profile.listFollowerRequests.useQuery();
  console.log(data);
  return (
    <div>
      <h1>Approve Followers</h1>
      <ul>
        {data?.map((follower) => (
          <Link href={`/${follower.requestor?.name}`}>
            <li key={follower.id}>
              <p>{follower.requestor?.name}</p>
              <p>{follower.requestor?.bio}</p>
              <p>{follower.createdAt.toDateString()}</p>
            </li>
          </Link>
        ))}
      </ul>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error: {error.message}</div>}
    </div>
  );
}

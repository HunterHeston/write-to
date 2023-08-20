import { api } from "@/utils/api";
import { type FollowRequest } from "@prisma/client";
import Link from "next/link";

export default function ApproveFollowers() {
  const { data, status, error } = api.profile.listFollowerRequests.useQuery();
  const { mutate } = api.profile.acceptFollowerRequest.useMutation();

  const approve = (request: FollowRequest) => {
    if (!request.id || !request.requestingId || !request.requestorId) {
      return;
    }

    mutate(
      {
        id: request.id,
        requestingId: request.requestingId,
        requestorId: request.requestorId,
      },
      {}
    );
  };
  // const reject = (id: string) => {};

  return (
    <div>
      <h1>Approve Followers</h1>
      <ul>
        {data?.map((followerRequest) => (
          <li key={followerRequest.id}>
            <Link href={`/${followerRequest.requestor?.name}`}>
              {followerRequest.requestor?.name}
            </Link>
            <p>{followerRequest.requestor?.bio}</p>
            <p>{followerRequest.createdAt.toDateString()}</p>
            <button onClick={() => approve(followerRequest)}>Approve</button>
            {/* <button onClick={() => reject(followerRequest.id)}>Deny</button> */}
          </li>
        ))}
      </ul>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error: {error.message}</div>}
    </div>
  );
}

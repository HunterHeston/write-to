import { api } from "@/utils/api";
import { type FollowRequest } from "@prisma/client";
import Link from "next/link";

export default function ApproveFollowers() {
  const { data, status, error } = api.profile.listFollowerRequests.useQuery();
  const { mutate: acceptMutate } =
    api.profile.acceptFollowerRequest.useMutation();
  const { mutate: rejectMutate } =
    api.profile.rejectFollowerRequest.useMutation();

  const approve = (request: FollowRequest) => {
    if (!request.id || !request.requestingId || !request.requestorId) {
      return;
    }

    acceptMutate(
      {
        id: request.id,
        requestingId: request.requestingId,
        requestorId: request.requestorId,
      },
      {}
    );
  };
  const reject = (request: FollowRequest) => {
    if (!request.id || !request.requestingId || !request.requestorId) {
      return;
    }

    rejectMutate({
      id: request.id,
      requestingId: request.requestingId,
      requestorId: request.requestorId,
    });
  };

  return (
    <div>
      <h1>Approve Followers</h1>
      <ul>
        {data?.length ? (
          data?.map((followerRequest) => (
            <li key={followerRequest.id}>
              <Link href={`/${followerRequest.requestor?.name}`}>
                {followerRequest.requestor?.name}
              </Link>
              <p>{followerRequest.requestor?.bio}</p>
              <p>{followerRequest.createdAt.toDateString()}</p>
              <button onClick={() => approve(followerRequest)}>Approve</button>
              <button onClick={() => reject(followerRequest)}>Deny</button>
            </li>
          ))
        ) : (
          <div>No new follow requests</div>
        )}
      </ul>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error: {error.message}</div>}
    </div>
  );
}

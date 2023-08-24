import { api } from "@/utils/api";
import Link from "next/link";

export default function ViewFollowers() {
  const {
    data: listData,
    status: listStatus,
    error: listError,
  } = api.profile.listFollowers.useQuery();

  const { mutate: removeMutate, error: removeError } =
    api.profile.deleteFollower.useMutation();

  const remove = (id: string) => {
    removeMutate({ id });
  };

  return (
    <div>
      <h1>Followers</h1>
      {listStatus === "loading" && <p>Loading...</p>}
      <ul>
        {listData?.map((follower) => (
          <li key={follower.id} className="flex flex-col">
            <Link href={`/${follower.follower.name}`}>
              {follower.follower.name}
            </Link>
            <button onClick={() => remove(follower.id)}>Remove</button>
          </li>
        ))}
      </ul>
      {listError && <p>{listError.message}</p>}
      {removeError && <p>{removeError.message}</p>}
    </div>
  );
}

/**
 * This is the main landing page for any logged in user.
 *
 * It's main purposes are:
 * 1. Display the users basic into.
 * 2. Display a list of reverse chronological posts from the users a person is following.
 */
import { useSession } from "next-auth/react";

export default function Feed() {
  const { data, status, update } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data && (
        <div>
          <h1>Welcome, {data.user.name}!</h1>
        </div>
      )}
    </div>
  );
}

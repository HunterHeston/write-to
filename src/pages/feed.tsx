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

import { useSession } from "next-auth/react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
}

function Nav() {
  const { data, status } = useSession();
  if (status === "loading") {
    return <div>loading....</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div>
        <ul className="flex h-20 items-center justify-center gap-5">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">SignUp</Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div>
      <ul className="flex h-20 items-center justify-center gap-5">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href={`/${data?.user.name}`}>Profile</Link>
        </li>
        <li>
          <Link href="/feed">Feed</Link>
        </li>
        <li>
          <Link href="/do/write">Write</Link>
        </li>
      </ul>
    </div>
  );
}

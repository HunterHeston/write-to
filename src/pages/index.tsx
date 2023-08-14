/**
 * This is the homepage of the entire application.
 *
 * It's main purposes are:
 * 1. To encourage people to create an account and start writing.
 * 2. To encourage people to share their link.
 * 3. Give users a sense of the purpose of the application.
 */

import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { AuthShowcase } from "@/components/ui/authShowcase";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Write<span className="text-[hsl(280,100%,70%)]">To</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
}

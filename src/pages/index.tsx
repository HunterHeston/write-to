/**
 * This is the homepage of the entire application.
 *
 * It's main purposes are:
 * 1. To encourage people to create an account and start writing.
 * 2. To encourage people to share their link.
 * 3. Give users a sense of the purpose of the application.
 */

import { AuthShowcase } from "@/components/ui/authShowcase";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Write<span className="text-[hsl(280,100%,70%)]">To</span>
          </h1>
          <p>Write to the people you care about, not the entire planet.</p>
          <p>
            If you&apos;re looking for hot takes and viral content. You&apos;re
            in the wrong place.
          </p>
          <p>
            This is about sharing your important or trivial things with the
            people you care about, even if it&apos;s just you.
          </p>
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>
        </div>
      </div>
    </>
  );
}

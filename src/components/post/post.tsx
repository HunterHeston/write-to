import Link from "next/link";
import { Markdown } from "@/components/ui/reactMarkdown";
import { H1 } from "@/components/ui/typography";
import { Button } from "../ui/button";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import DeleteButton from "./deleteButton";

type PostProps = {
  title?: string;
  publishDate?: string;
  content?: string;
  profile: string;
  showEdit?: boolean;
  pid: string;
};

export default function Post({
  title,
  profile,
  content,
  publishDate,
  showEdit = true,
  pid,
}: PostProps) {
  return (
    <div className="flex justify-center ">
      <div className="w-full px-5 pt-16">
        <H1>{title}</H1>
        {showEdit && (
          <div className="my-3 flex gap-3">
            <Button variant={"secondary"} size="sm">
              Edit
            </Button>
            <DeleteButton pid={pid} profile={profile} />
          </div>
        )}
        <div className="my-5">
          <Link href={`/${profile}`}>
            By <span className="text-primary">{profile}</span>
          </Link>
        </div>
        <p className="mb-12 border-l-2 border-l-zinc-600 pl-2 align-middle">
          {dateStringToDayMonthYear(publishDate ?? "")}
        </p>
        <Markdown>{content ?? ""}</Markdown>
      </div>
    </div>
  );
}

// Helper functions
// gets the human readable month, day and year from a date string
function dateStringToDayMonthYear(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

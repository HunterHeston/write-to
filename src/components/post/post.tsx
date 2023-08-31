import Link from "next/link";
import { Markdown } from "@/components/ui/reactMarkdown";
import { H1, Small } from "@/components/ui/typography";
import { Card } from "../ui/card";
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
};

// {
//   showEdit && (
//     <Link
//       className={buttonVariants({ variant: "default", size: "sm" })}
//       href={`do/write?pid=${postMeta.id}`}
//     >
//       Edit
//     </Link>
//   );
// }
// {
//   showEdit && (
//     <button onClick={() => deletePost(postMeta.id)}>
//       <Trash2></Trash2>
//     </button>
//   );
// }
// {
//   error && <p>{error.message}</p>;
// }

export default function Post({
  title,
  profile,
  content,
  publishDate,
  showEdit = true,
}: PostProps) {
  const { mutate, error, status } = api.posts.deletePost.useMutation();
  const router = useRouter();

  const deletePost = (id: string) => {
    mutate({ pid: id });
  };

  if (status === "success") {
    router.push(`/${profile}`);
  }

  return (
    <div className="flex justify-center ">
      <div className="w-full px-5 pt-16">
        <H1>{title}</H1>
        {showEdit && (
          <div className="my-3 flex gap-3">
            <Button variant={"secondary"} size="sm">
              Edit
            </Button>
            <DeleteButton />
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

import type { PostMeta } from "@/types/post";
import { api } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import { Trash, Trash2 } from "lucide-react";

export default function PostCard({
  postMeta,
  showEdit,
}: {
  postMeta: PostMeta;
  showEdit: boolean;
}) {
  const { mutate, error, status } = api.posts.deletePost.useMutation();
  const router = useRouter();

  const deletePost = (id: string) => {
    mutate({ pid: id });
  };

  if (status === "success") {
    router.reload();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/${postMeta.profileName}/${postMeta.slug}`}>
            <h2>{postMeta.title}</h2>
          </Link>
        </CardTitle>
        <CardDescription>
          {new Date(postMeta.publishDate).toDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        {showEdit && (
          <Link
            className={buttonVariants({ variant: "default", size: "sm" })}
            href={`do/write?pid=${postMeta.id}`}
          >
            Edit
          </Link>
        )}
        {showEdit && (
          <button onClick={() => deletePost(postMeta.id)}>
            <Trash2></Trash2>
          </button>
        )}
        {error && <p>{error.message}</p>}
      </CardContent>
    </Card>
  );
}

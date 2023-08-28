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
import { buttonVariants } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { truncate } from "@/utils/strings";

export default function PostCard({
  postMeta,
  showEdit,
  className,
}: {
  postMeta: PostMeta;
  showEdit: boolean;
  className?: string;
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
    <Link href={`/${postMeta.profileName}/${postMeta.slug}`}>
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AvatarContainer
              profileName={postMeta.profileName}
              avatar={postMeta.avatar}
            ></AvatarContainer>
            <p>{truncate(postMeta.title, 5)}</p>
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
    </Link>
  );
}

///////////////////////
// helpers
///////////////////////

function AvatarContainer({
  profileName,
  avatar,
}: {
  profileName: string;
  avatar: string | null;
}) {
  return (
    <Avatar className="flex h-6 w-6 justify-center">
      <AvatarImage
        src={avatar ?? ""}
        alt={`${profileName}'s avatar`}
      ></AvatarImage>
      <AvatarFallback>{profileName.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
}

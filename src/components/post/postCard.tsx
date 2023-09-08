import type { PostMeta } from "@/types/post";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { truncate } from "@/utils/strings";
import { formatDate } from "@/utils/dates";
import { H3 } from "../ui/typography";

export default function PostCard({
  postMeta,
  className,
}: {
  postMeta: PostMeta;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          <Link href={`/${postMeta.profileName}`}>
            <div className="flex items-center gap-2">
              <AvatarContainer
                profileName={postMeta.profileName}
                avatar={postMeta.avatar}
              ></AvatarContainer>
              <div>
                <p className="text-sm">{postMeta.profileName}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(new Date(postMeta.publishDate))}
                </p>
              </div>
            </div>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Link href={`/${postMeta.profileName}/${postMeta.slug}`}>
          <H3 className="text-foreground">{truncate(postMeta.title, 4)}</H3>
        </Link>
      </CardContent>
    </Card>
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
    <Avatar className="flex h-9 w-9 justify-center">
      <AvatarImage
        src={avatar ?? ""}
        alt={`${profileName}'s avatar`}
      ></AvatarImage>
      <AvatarFallback>{profileName.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
}

import type { PostMeta } from "@/types/post";
import Link from "next/link";

export default function PostCard({
  postMeta,
  showEdit,
}: {
  postMeta: PostMeta;
  showEdit: boolean;
}) {
  return (
    <div>
      <Link href={`/${postMeta.profileName}/${postMeta.slug}`}>
        <h2>{postMeta.title}</h2>
        <p>{new Date(postMeta.publishDate).toDateString()}</p>
      </Link>
      {showEdit && <Link href={`do/write?pid=${postMeta.id}`}>Edit</Link>}
    </div>
  );
}

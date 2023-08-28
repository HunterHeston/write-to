import type { PostMeta } from "@/types/post";
import { api } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";

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
    <div>
      <Link href={`/${postMeta.profileName}/${postMeta.slug}`}>
        <h2>{postMeta.title}</h2>
        <p>{new Date(postMeta.publishDate).toDateString()}</p>
      </Link>
      {showEdit && <Link href={`do/write?pid=${postMeta.id}`}>Edit</Link>}
      {showEdit && (
        <button onClick={() => deletePost(postMeta.id)}>Delete Post</button>
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
}

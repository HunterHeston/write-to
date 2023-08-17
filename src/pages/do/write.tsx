/**
 * This is the page where users write their posts.
 *
 * It's main purposes are:
 * 1. Allow users to write their posts in markdown.
 * 2. Allow users to preview their posts in markdown.
 * 3. Allow users to publish their posts with a selected visibility: All, Approved, None.
 */

import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { PostVisibility } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  title: string;
  content: string;
  visibility: PostVisibility;
  pid: string;
  isEdit: boolean;
};

/**
 * This is the page where users write their posts.
 */
export default function Write(props: Props) {
  const [title, setTitle] = useState(props.title || "");
  const [content, setContent] = useState(props.content || "");
  const [visibility, setVisibility] = useState<PostVisibility>(
    props.visibility || PostVisibility.PRIVATE
  );

  const { mutate: create, error: createError } =
    api.posts.createPost.useMutation();
  const { mutate: update, error: updateError } =
    api.posts.updatePost.useMutation();

  const onSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (props.isEdit) {
      update({ title, content, visibility, pid: props.pid });
    } else {
      create({ title, content, visibility });
    }
  };

  return (
    <div className="flex flex-col">
      <h1>Write your page article</h1>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <ReactMarkdown>{content}</ReactMarkdown>
      <form onSubmit={onSend}>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value as PostVisibility)}
        >
          <option value={PostVisibility.PRIVATE}>Private</option>
          <option value={PostVisibility.APPROVED_FOLLOWERS}>
            Approved Followers
          </option>
          <option value={PostVisibility.PUBLIC}>Anyone!</option>
        </select>
        <button type="submit">Sent it</button>
      </form>
      {createError && <p>{createError.message}</p>}
      {updateError && <p>{updateError.message}</p>}
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/login", // Redirect to the login page if the user is not authenticated
        permanent: false,
      },
    };
  }

  const pid = ctx.query.pid;

  if (pid) {
    const post = await prisma.post.findUnique({
      where: { id: pid as string },
    });
    console.log(post);
    if (post) {
      return {
        props: {
          title: post.title,
          content: post.content,
          visibility: post.visibility,
          pid: post.id,
          isEdit: true,
        },
      };
    }
  }

  return { props: {} };
}

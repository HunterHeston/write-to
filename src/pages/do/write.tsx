/**
 * This is the page where users write their posts.
 *
 * It's main purposes are:
 * 1. Allow users to write their posts in markdown.
 * 2. Allow users to preview their posts in markdown.
 * 3. Allow users to publish their posts.
 */

import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  title: string;
  content: string;
  pid: string;
  isEdit: boolean;
};

/**
 * This is the page where users write their posts.
 */
export default function Write(props: Props) {
  const [title, setTitle] = useState(props.title || "");
  const [content, setContent] = useState(props.content || "");

  const { mutate: create, error: createError } =
    api.posts.createPost.useMutation();
  const { mutate: update, error: updateError } =
    api.posts.updatePost.useMutation();

  const onSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (props.isEdit) {
      update({ title, content, pid: props.pid });
    } else {
      create({ title, content });
    }
  };

  return (
    <div className="flex flex-col">
      <h1>Write your page article</h1>
      <form onSubmit={onSend}>
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Sent it</button>
      </form>
      <ReactMarkdown>{content}</ReactMarkdown>
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
    if (post) {
      return {
        props: {
          title: post.title,
          content: post.content,
          pid: post.id,
          isEdit: true,
        },
      };
    }
  }

  return { props: {} };
}

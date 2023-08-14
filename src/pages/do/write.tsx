/**
 * This is the page where users write their posts.
 *
 * It's main purposes are:
 * 1. Allow users to write their posts in markdown.
 * 2. Allow users to preview their posts in markdown.
 * 3. Allow users to publish their posts with a selected visibility: All, Approved, None.
 */

import { api } from "@/utils/api";
import { PostVisibility } from "@prisma/client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

/**
 * This is the page where users write their posts.
 */
export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<PostVisibility>(
    PostVisibility.PRIVATE
  );

  const { mutate, error } = api.posts.createPost.useMutation();

  const onSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ title, content, visibility });
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
      {error && <p>{error.message}</p>}
    </div>
  );
}

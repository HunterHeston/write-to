/**
 * This is the page where users write their posts.
 *
 * It's main purposes are:
 * 1. Allow users to write their posts in markdown.
 * 2. Allow users to preview their posts in markdown.
 * 3. Allow users to publish their posts with a selected visibility: All, Approved, None.
 */

import { useState } from "react";
import ReactMarkdown from "react-markdown";

/**
 * This is the page where users write their posts.
 */
export default function Write() {
  const [text, setText] = useState("");

  return (
    <div>
      <h1>Write your page article</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

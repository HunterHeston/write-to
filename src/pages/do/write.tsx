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

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

enum Visibility {
  All = "All",
  Approved = "Approved",
  JustMe = "Just Me",
  IntoTheEther = "Into the ether",
}

/**
 * This is the page where users write their posts.
 */
export default function Write() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.All);

  return (
    <div className="flex flex-col">
      <h1>Write your page article</h1>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <ReactMarkdown>{text}</ReactMarkdown>
      <select onChange={(e) => setVisibility(e.target.value as Visibility)}>
        <option value={Visibility.All}>{Visibility.All}</option>
        <option value={Visibility.Approved}>{Visibility.Approved}</option>
        <option value={Visibility.JustMe}>{Visibility.JustMe}</option>
        <option value={Visibility.IntoTheEther}>
          {Visibility.IntoTheEther}
        </option>
      </select>
      <button onClick={() => onSend(title, text, visibility)}>Sent it</button>
    </div>
  );
}

function onSend(title: string, text: string, visibility: string) {
  console.log(
    `title: ${title}
text: ${text}
visibility: ${visibility}`
  );
}

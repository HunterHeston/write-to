import ReactMarkdown from "react-markdown";
import {
  H1,
  H2,
  H3,
  H4,
  Blockquote,
  InlineCode,
  Ul,
  Li,
  Ol,
  P,
  THead,
  TBody,
  Table,
  Th,
  Td,
  Tr,
} from "@/components/ui/typography";
import Link from "next/link";

type Props = {
  children: string;
};

export function Markdown({ children }: Props) {
  return (
    <ReactMarkdown
      className="text-lg leading-loose"
      components={{
        h1: ({ ...props }) => <H1 className="mt-14" {...props} />,
        h2: ({ ...props }) => <H2 className="mt-14" {...props} />,
        h3: ({ ...props }) => <H3 className="mt-14" {...props} />,
        h4: ({ ...props }) => <H4 className="mt-14" {...props} />,
        h5: ({ ...props }) => <h5 className="mt-14" {...props} />,
        h6: ({ ...props }) => <h6 className="mt-14" {...props} />,
        p: ({ ...props }) => <P className="leading-loose" {...props} />,
        a: ({ ...props }) => (
          <Link
            href={props.href ?? ""}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),
        blockquote: ({ ...props }) => <Blockquote {...props} />,
        br: ({ ...props }) => <br {...props} />,
        em: ({ ...props }) => <em {...props} />,
        hr: ({ ...props }) => <hr className="my-4" {...props} />,
        img: ({ ...props }) => (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img {...props} />
        ),
        pre: ({ ...props }) => <pre className="" {...props} />,
        strong: ({ ...props }) => <strong {...props} />,
        ol: ({ ...props }) => <Ol {...props} />,
        ul: ({ ...props }) => <Ul {...props} />,
        li: ({ ...props }) => <Li {...props} />,
        code: ({ inline, className, children, ...props }) =>
          inline ? (
            <InlineCode {...props}>{children}</InlineCode>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          ),
        table: ({ ...props }) => <Table {...props} />,
        thead: ({ ...props }) => <THead {...props} />,
        tbody: ({ ...props }) => <TBody {...props} />,
        tr: ({ ...props }) => (
          <Tr
            className="even:dark:text-darkAccent even:text-accent"
            {...props}
          />
        ),
        th: ({ ...props }) => <Th {...props} />,
        td: ({ ...props }) => <Td {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

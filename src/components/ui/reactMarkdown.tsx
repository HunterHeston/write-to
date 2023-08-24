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

type Props = {
  children: string;
};

export function Markdown({ children }: Props) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ ...props }) => <H1 {...props} />,
        h2: ({ ...props }) => <H2 {...props} />,
        h3: ({ ...props }) => <H3 {...props} />,
        h4: ({ ...props }) => <H4 {...props} />,
        h5: ({ ...props }) => <h5 className="mb-2" {...props} />,
        h6: ({ ...props }) => <h6 className="mb-2" {...props} />,
        p: ({ ...props }) => <P className="my-5 leading-loose" {...props} />,
        a: ({ ...props }) => (
          <a
            className="text-primary transition-all hover:text-zinc-600"
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

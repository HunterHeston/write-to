type Props = {
  children: React.ReactNode;
};

export function TR({ children }: Props) {
  return <tr className="m-0 border-t p-0 even:bg-muted">{children}</tr>;
}

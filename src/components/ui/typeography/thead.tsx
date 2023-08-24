type Props = {
  children: React.ReactNode;
};

export function THead({ children }: Props) {
  return <thead>{children}</thead>;
}

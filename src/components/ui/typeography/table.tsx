type Props = {
  children: React.ReactNode;
};

export function Table({ children }: Props) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">{children}</table>
    </div>
  );
}

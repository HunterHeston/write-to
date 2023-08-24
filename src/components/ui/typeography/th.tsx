type Props = {
  children: React.ReactNode;
};

export function TH({ children }: Props) {
  return (
    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
      {children}
    </th>
  );
}

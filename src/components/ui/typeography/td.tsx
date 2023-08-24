type Props = {
  children: React.ReactNode;
};

export function TD({ children }: Props) {
  return (
    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
      {children}
    </td>
  );
}

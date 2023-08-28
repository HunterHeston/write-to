export function truncate(title: string, limit: number = 8): string {
  const words = title.split(" ");
  if (words.length > limit) {
    return [...words.slice(0, limit), "..."].join(" ");
  }
  return title;
}

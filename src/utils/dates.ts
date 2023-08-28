export function daysSince(targetDate: Date): number {
  const today = new Date();
  return Math.floor(
    (today.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24)
  );
}

export function daysSince(targetDate: Date): number {
  const today = new Date();
  return Math.floor(
    (today.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24)
  );
}

const Months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// function that returns a human readable month day year string
export function formatDate(date: Date): string {
  return `${Months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function addHoursToTimestamp(timestamp: string, hoursToAdd: number): string {
  const date = new Date(timestamp);
  date.setHours(date.getHours() + hoursToAdd);

  const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
  });

  return formattedDate;
}
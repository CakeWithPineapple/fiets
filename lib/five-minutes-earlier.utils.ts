export function fiveMinutesEarlier(timestamp: string): string {
  const [h, m] = timestamp.split(':').map(Number);

  let total = h * 60 + m;

  total -= 5;

  if (total < 0) {
    total += 24 * 60;
  }

  const newH = Math.floor(total / 60);
  const newM = total % 60;

  const formatH = String(newH).padStart(2, '0');
  const formatM = String(newM).padStart(2, '0');

  return `${formatH}:${formatM}`;
}
export const straffen: Record<string, string> = {
  "1": "NVT",
  "2": "NVT",
  "3": "1 uur confiscatie",
  "4": "2 uur confiscatie",
  "5": "4 uur confiscatie",
  "6": "8 uur confiscatie",
  "7": "12 uur confiscatie",
  "8": "24 uur confiscatie",
  "9": "permanente confiscatie",
};

export const confiscatie: Record<string, number> = {
  "1": 0,
  "2": 0,
  "3": 1,
  "4": 2,
  "5": 4,
  "6": 8,
  "7": 12,
  "8": 24,
  "9": Number.POSITIVE_INFINITY,
};

export const colors: Record<string, string> = {
  "1": "green-500",
  "2": "amber-500",
  "3": "rose-500"
};

export const secondaryColors: Record<string, string> = {
  "1": "green-400",
  "2": "amber-400",
  "3": "rose-400"
}
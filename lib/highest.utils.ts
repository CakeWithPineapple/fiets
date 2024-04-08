// Function to find the object with the highest date
export function highest(objects: any[]) {
  let highestDateObject: any | null = null;
  let highestDate = "";

  objects.forEach(obj => {
      if (obj.overtreding_datum > highestDate) {
          highestDate = obj.overtreding_datum;
          highestDateObject = obj;
      }
  });

  if (highestDateObject === null) {
    return objects;
  }

  return highestDateObject;
}
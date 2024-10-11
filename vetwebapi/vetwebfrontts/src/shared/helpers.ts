export const convertDateString = (date: string) => {
  const dateObj: Date = new Date(date);
  const month: string = dateObj.toLocaleString("default", { month: "long" });
  const year: number = dateObj.getFullYear();
  const day: number = dateObj.getDate();
  const quarter: number = Math.floor((dateObj.getMonth() + 3) / 3);
  const fullDate: string = `${day} ${month} ${year}`;
  const shortDate: string = dateObj.toLocaleDateString();

  return { day, month, year, quarter, fullDate, shortDate };
};

export const diseasesString = (diseases: string[]) => {
  return new Set(diseases.map((disease) => disease.toLowerCase() + " "));
};

export const timeToExpiration = (date: Date | number) => {
  const timeMs = typeof date === "number" ? date : date.getTime();
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);
  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ];
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds)
  );
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  const rtf = new Intl.RelativeTimeFormat("ru", {
    numeric: "auto",
    style: "long",
    localeMatcher: "best fit",
  });

  const result = rtf.format(
    Math.floor(deltaSeconds / divisor),
    units[unitIndex]
  );

  return { result, deltaSeconds };
};

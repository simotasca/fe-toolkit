export function startOfDay(value: Date | string | number = Date.now()) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function endOfDay(value: Date | string | number = Date.now()) {
  const date = new Date(value);
  date.setHours(23, 59, 59, 999);
  return date;
}

export function startOfWeek(value: Date | string | number = Date.now(), weekStartsOn: number = 1) {
  // weekStartsOn: 0 = Sunday, 1 = Monday
  const date = new Date(value);
  const day = date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function endOfWeek(value: Date | string | number = Date.now(), weekStartsOn: number = 1) {
  const start = startOfWeek(value, weekStartsOn);
  start.setDate(start.getDate() + 6);
  start.setHours(23, 59, 59, 999);
  return start;
}

export function startOfMonth(value: Date | string | number = Date.now()) {
  const date = new Date(value);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function endOfMonth(value: Date | string | number = Date.now()) {
  const date = new Date(value);
  date.setMonth(date.getMonth() + 1, 0); // 0th day of next month = last day of current
  date.setHours(23, 59, 59, 999);
  return date;
}

export function startOfYear(value: Date | string | number = Date.now()) {
  const date = new Date(value);
  date.setMonth(0, 1); // January 1
  date.setHours(0, 0, 0, 0);
  return date;
}

export function endOfYear(value: Date | string | number = Date.now()) {
  const date = new Date(value);
  date.setMonth(11, 31); // December 31
  date.setHours(23, 59, 59, 999);
  return date;
}

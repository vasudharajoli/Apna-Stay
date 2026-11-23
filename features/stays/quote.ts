import type { Stay } from "./catalog";

export type SearchValues = Record<string, string | string[] | undefined>;

export function first(value: SearchValues[string]) {
  return typeof value === "string" ? value : undefined;
}

const dayMilliseconds = 86_400_000;
export const maximumNights = 30;

export function todayInIndia(now = new Date()) {
  const formatter = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(now).map(({ type, value }) => [type, value]),
  );
  return [parts.year, parts.month, parts.day].join("-");
}

function dayIndex(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const timestamp = Date.parse(value + "T00:00:00.000Z");
  if (
    !Number.isFinite(timestamp) ||
    new Date(timestamp).toISOString().slice(0, 10) !== value
  )
    return null;
  return timestamp / dayMilliseconds;
}

export function readTrip(values: SearchValues) {
  return {
    arrival: first(values.arrival) ?? "",
    departure: first(values.departure) ?? "",
    guests: first(values.guests) ?? "1",
  };
}

export type Trip = ReturnType<typeof readTrip>;

export function guestCount(value: string) {
  return /^[1-6]$/.test(value) ? Number(value) : null;
}

export function stayNights(trip: Trip, today = todayInIndia()) {
  const start = dayIndex(trip.arrival);
  const end = dayIndex(trip.departure);
  const current = dayIndex(today);
  if (start === null || end === null || current === null || start < current)
    return null;
  const nights = end - start;
  return nights >= 1 && nights <= maximumNights ? nights : null;
}

export function makeQuote(stay: Stay, trip: Trip, today = todayInIndia()) {
  const nights = stayNights(trip, today);
  const guests = guestCount(trip.guests);
  if (nights === null || guests === null || guests > stay.guests) return null;
  const accommodation = stay.price * nights;
  return {
    nights,
    guests,
    accommodation,
    cleaning: stay.cleaning,
    total: accommodation + stay.cleaning,
  };
}

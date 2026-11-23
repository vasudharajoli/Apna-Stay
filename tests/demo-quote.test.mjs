import assert from "node:assert/strict";
import test from "node:test";
import { stays } from "../features/stays/catalog.ts";
import {
  makeQuote,
  stayNights,
  todayInIndia,
} from "../features/stays/quote.ts";

const today = "2030-02-27";
const trip = { arrival: today, departure: "2030-03-01", guests: "2" };

test("counts checkout-exclusive calendar nights across month boundaries", () => {
  assert.equal(stayNights(trip, today), 2);
});

test("rejects invalid calendar dates, past stays, and out-of-range lengths", () => {
  for (const overrides of [
    { departure: "2030-02-30" },
    { arrival: "2030-02-26" },
    { departure: today },
    { departure: "2030-04-01" },
  ]) {
    assert.equal(stayNights({ ...trip, ...overrides }, today), null);
  }
});

test("prices only valid party sizes using catalog prices in integer paise", () => {
  assert.deepEqual(makeQuote(stays[0], trip, today), {
    nights: 2,
    guests: 2,
    accommodation: 1360000,
    cleaning: 65000,
    total: 1425000,
  });
  assert.equal(makeQuote(stays[0], { ...trip, guests: "5" }, today), null);
  assert.equal(makeQuote(stays[0], { ...trip, guests: "2.0" }, today), null);
});

test("uses the India-local calendar date at the UTC day boundary", () => {
  assert.equal(todayInIndia(new Date("2030-03-01T18:45:00Z")), "2030-03-02");
});

import { destinations } from "@/features/stays/catalog";
import type { Trip } from "@/features/stays/quote";

export function TripFields({
  today,
  trip,
  maxGuests = 6,
  requireDates = false,
  city,
}: {
  today: string;
  trip: Trip;
  maxGuests?: number;
  requireDates?: boolean;
  city?: string;
}) {
  return (
    <>
      {city !== undefined && (
        <div className="form-field">
          <label htmlFor="trip-city">Destination</label>
          <select id="trip-city" name="city" defaultValue={city}>
            <option value="">All destinations</option>
            {destinations.map((destination) => (
              <option key={destination}>{destination}</option>
            ))}
          </select>
        </div>
      )}
      <div className="form-field">
        <label htmlFor="trip-arrival">Check-in</label>
        <input
          id="trip-arrival"
          name="arrival"
          type="date"
          min={today}
          defaultValue={trip.arrival}
          required={requireDates}
        />
      </div>
      <div className="form-field">
        <label htmlFor="trip-departure">Check-out</label>
        <input
          id="trip-departure"
          name="departure"
          type="date"
          min={today}
          defaultValue={trip.departure}
          required={requireDates}
        />
      </div>
      <div className="form-field">
        <label htmlFor="trip-guests">Guests</label>
        <select id="trip-guests" name="guests" defaultValue={trip.guests}>
          {Array.from({ length: maxGuests }, (_, index) => index + 1).map(
            (count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? "guest" : "guests"}
              </option>
            ),
          )}
        </select>
      </div>
    </>
  );
}

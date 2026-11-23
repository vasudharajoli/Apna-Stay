import Image from "next/image";
import Link from "next/link";
import { StayCard } from "@/components/stay-card";
import { TripFields } from "@/components/trip-fields";
import { destinations, stays } from "@/features/stays/catalog";
import {
  first,
  guestCount,
  readTrip,
  stayNights,
  todayInIndia,
  type SearchValues,
} from "@/features/stays/quote";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchValues>;
}) {
  const values = await searchParams;
  const city = first(values.city) ?? "";
  const trip = readTrip(values);
  const today = todayInIndia();
  const guests = guestCount(trip.guests);
  const invalidCity =
    city !== "" && !destinations.some((destination) => destination === city);
  const invalidDates =
    Boolean(trip.arrival || trip.departure) && stayNights(trip, today) === null;
  const invalid = invalidDates || invalidCity || guests === null;
  const results = invalid
    ? []
    : stays.filter(
        (stay) => (!city || stay.city === city) && stay.guests >= guests,
      );
  const searching = Object.keys(values).length > 0;

  return (
    <main id="main-content" className="shell">
      <section className="hero" aria-labelledby="hero-title">
        <Image
          src="/images/hero.webp"
          alt=""
          fill
          preload
          sizes="(max-width: 1240px) 95vw, 1200px"
        />
        <div className="hero-copy">
          <h1 id="hero-title">
            Find your kind
            <br />
            of stay.
          </h1>
          <p>
            From quiet mountain mornings to warm coastal evenings, discover a
            different side of India.
          </p>
        </div>
      </section>
      <form
        className="search form-fields"
        action="/#stays"
        aria-label="Search demo stays"
      >
        <TripFields today={today} trip={trip} city={city} />
        <button className="button" type="submit">
          Find stays
        </button>
      </form>
      <section id="stays" className="discover" aria-labelledby="stays-title">
        <div className="section-heading">
          <div>
            <h2 id="stays-title">
              {searching ? "Search results" : "Stays worth exploring"}
            </h2>
            <p>Fictional properties for the Apna Stay demo.</p>
          </div>
          {searching && (
            <Link className="text-link" href="/#stays">
              Clear filters
            </Link>
          )}
        </div>
        {invalid && (
          <p className="notice" role="alert">
            Choose a destination from the list and a party of 1 to 6. Leave
            dates blank or select a stay of 1 to 30 nights.
          </p>
        )}
        {!invalid && results.length === 0 && (
          <p className="notice">
            No demo stays match those filters. Try another destination or a
            smaller party.
          </p>
        )}
        <div className="stay-grid">
          {results.map((stay) => (
            <StayCard key={stay.slug} stay={stay} trip={trip} />
          ))}
        </div>
      </section>
    </main>
  );
}

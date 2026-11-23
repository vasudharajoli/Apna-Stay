import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoReservation } from "@/components/demo-reservation";
import { TripFields } from "@/components/trip-fields";
import { formatPrice, stays } from "@/features/stays/catalog";
import {
  makeQuote,
  readTrip,
  todayInIndia,
  type SearchValues,
} from "@/features/stays/quote";

type StayPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchValues>;
};

export async function generateMetadata({ params }: StayPageProps) {
  const { slug } = await params;
  const stay = stays.find((candidate) => candidate.slug === slug);
  return { title: stay?.name ?? "Stay unavailable" };
}

export default async function StayPage({
  params,
  searchParams,
}: StayPageProps) {
  const [{ slug }, values] = await Promise.all([params, searchParams]);
  const stay = stays.find((candidate) => candidate.slug === slug);
  if (!stay) notFound();

  const today = todayInIndia();
  const trip = readTrip(values);
  const quote = makeQuote(stay, trip, today);
  const attemptedQuote = "arrival" in values || "departure" in values;

  return (
    <main id="main-content" className="shell detail">
      <Link href="/#stays" className="text-link">
        ← Explore stays
      </Link>
      <div className="detail-heading">
        <p className="location">
          {stay.kind} · {stay.area}
        </p>
        <h1>{stay.name}</h1>
        <p>
          Fictional demo property · Up to {stay.guests} guests · {stay.rooms}{" "}
          {stay.rooms === 1 ? "bedroom" : "bedrooms"}
        </p>
      </div>
      <div className="detail-image">
        <Image
          src={stay.image}
          alt={stay.alt}
          fill
          preload
          sizes="(max-width: 1240px) 95vw, 1200px"
        />
      </div>
      <div className="detail-grid">
        <section aria-labelledby="about-title" className="property-description">
          <h2 id="about-title">About this stay</h2>
          <p>{stay.description}</p>
          <h2>Amenities</h2>
          <ul className="amenities">
            {stay.amenities.map((amenity) => (
              <li key={amenity}>{amenity}</li>
            ))}
          </ul>
        </section>
        <section
          className="booking"
          id="booking"
          aria-labelledby="booking-title"
        >
          <h2 id="booking-title">Plan a demo stay</h2>
          <p className="booking-rate">
            <strong>{formatPrice(stay.price)}</strong> / night
          </p>
          <form
            action={"/stays/" + stay.slug + "#booking"}
            className="form-fields booking-form"
          >
            <TripFields
              today={today}
              trip={trip}
              maxGuests={stay.guests}
              requireDates
            />
            <button className="button" type="submit">
              Calculate total
            </button>
          </form>
          {attemptedQuote && !quote && (
            <p className="notice" role="alert">
              Choose 1 to 30 nights starting today or later, with up to{" "}
              {stay.guests} guests.
            </p>
          )}
          {quote && (
            <div className="quote">
              <dl aria-label="Demo price breakdown">
                <div>
                  <dt>
                    {formatPrice(stay.price)} × {quote.nights}{" "}
                    {quote.nights === 1 ? "night" : "nights"}
                  </dt>
                  <dd>{formatPrice(quote.accommodation)}</dd>
                </div>
                <div>
                  <dt>Cleaning fee</dt>
                  <dd>{formatPrice(quote.cleaning)}</dd>
                </div>
                <div className="quote-total">
                  <dt>Demo total</dt>
                  <dd>{formatPrice(quote.total)}</dd>
                </div>
              </dl>
              <DemoReservation
                key={trip.arrival + ":" + trip.departure + ":" + trip.guests}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

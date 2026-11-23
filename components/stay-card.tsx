import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Stay } from "@/features/stays/catalog";
import type { Trip } from "@/features/stays/quote";

export function StayCard({ stay, trip }: { stay: Stay; trip?: Trip }) {
  const query =
    trip?.arrival && trip.departure
      ? trip
      : trip
        ? { guests: trip.guests }
        : undefined;
  return (
    <article className="stay-card">
      <Link
        href={{ pathname: "/stays/" + stay.slug, query }}
        className="stay-link"
      >
        <div className="stay-image">
          <Image
            src={stay.image}
            alt={stay.alt}
            fill
            sizes="(max-width: 599px) 90vw, (max-width: 999px) 44vw, 280px"
          />
        </div>
        <div className="stay-copy">
          <p className="location">
            {stay.kind} · {stay.city}
          </p>
          <h3>{stay.name}</h3>
          <p className="stay-capacity">Up to {stay.guests} guests</p>
          <p className="stay-price">
            <strong>{formatPrice(stay.price)}</strong> / night
          </p>
        </div>
      </Link>
    </article>
  );
}

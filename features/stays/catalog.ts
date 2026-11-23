export const destinations = ["Goa", "Manali", "Jaipur", "Bengaluru"] as const;

export const stays = [
  {
    slug: "palm-courtyard",
    name: "Palm Courtyard Villa",
    city: "Goa",
    area: "Siolim, Goa",
    kind: "Villa",
    image: "/images/goa.webp",
    alt: "Yellow Goan villa with a shaded veranda and palms",
    price: 680000,
    cleaning: 65000,
    guests: 4,
    rooms: 2,
    amenities: ["Garden", "Kitchen", "Wi-Fi"],
    description:
      "An open veranda and leafy courtyard give this Goan villa plenty of room for slow afternoons. Use the kitchen for a quiet night in or spend the day exploring Siolim.",
  },
  {
    slug: "cedar-ridge",
    name: "Cedar Ridge Retreat",
    city: "Manali",
    area: "Manali, Himachal Pradesh",
    kind: "Mountain retreat",
    image: "/images/hero.webp",
    alt: "Stone and timber house overlooking forested mountain ridges",
    price: 820000,
    cleaning: 85000,
    guests: 6,
    rooms: 3,
    amenities: ["Mountain view", "Fireplace", "Wi-Fi"],
    description:
      "A stone and timber retreat above the valley, with a fireplace for cool evenings and a veranda that looks out over forested ridges.",
  },
  {
    slug: "rose-courtyard",
    name: "Rose Courtyard Haveli",
    city: "Jaipur",
    area: "Jaipur, Rajasthan",
    kind: "Heritage home",
    image: "/images/jaipur.webp",
    alt: "Pink sandstone courtyard with arched windows and bougainvillea",
    price: 540000,
    cleaning: 45000,
    guests: 2,
    rooms: 1,
    amenities: ["Courtyard", "Air conditioning", "Wi-Fi"],
    description:
      "A compact haveli suite opening onto a sheltered pink sandstone courtyard. Settle in with a morning chai before heading into the city.",
  },
  {
    slug: "fern-garden-house",
    name: "Fern Garden House",
    city: "Bengaluru",
    area: "Bengaluru, Karnataka",
    kind: "Guesthouse",
    image: "/images/bengaluru.webp",
    alt: "Modern Bengaluru guesthouse framed by ferns and trees",
    price: 390000,
    cleaning: 35000,
    guests: 3,
    rooms: 1,
    amenities: ["Workspace", "Garden", "Wi-Fi"],
    description:
      "A garden guesthouse with a dedicated desk, quiet outdoor seating, and tall windows that look directly into the greenery.",
  },
] as const;

export type Stay = (typeof stays)[number];

const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPrice(paise: number) {
  return rupees.format(paise / 100);
}

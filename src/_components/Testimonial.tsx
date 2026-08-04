"use client";

/**
 * Testimonials — "popped-out avatar" card grid
 * ------------------------------------------------------------
 * Stack: Next.js (App Router) + TypeScript + Tailwind + react-icons
 *
 * Each card: circular avatar overlaps the top edge of a white
 * rounded card, star rating, bold one-line headline, quote text,
 * then a small tail pointing down to the person's name + role.
 */

import Image from "next/image";
import { BsFillStarFill } from "react-icons/bs";

type Testimonial = {
  name: string;
  role: string;
  headline: string;
  quote: string;
  rating: number;
  avatar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Hindley Earnshaw",
    role: "@HindleyEs",
    headline: "I really appreciate!!",
    quote:
      "They understood exactly what we needed and delivered ahead of schedule. Communication was clear the whole way through.",
    rating: 5,
    avatar: "/testimonial-2.png",
  },
  {
    name: "Wibbins Micawber",
    role: "Founder",
    headline: "Very impressed!!",
    quote:
      "Our site loads fast even on weak connections, which matters a lot for our customers. Support has stuck around after launch too.",
    rating: 5,
    avatar: "/testimonial-3.png",
  },
  {
    name: "James Brown",
    role: "OOOing Company",
    headline: "Great to work with",
    quote:
      "Competitive pricing and genuinely helpful support. It's refreshing to get this level of personal attention.",
    rating: 5,
    avatar: "/testimonial-4.png",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="relative flex flex-col items-center pt-10">
      {/* Avatar, overlapping the card's top edge */}
      <div className="absolute -top-2 z-10">
        <Image
          src={t.avatar}
          alt={t.name}
          width={72}
          height={72}
          className="h-18 w-18 rounded-full border-4 border-[#F3F1EA] object-cover shadow-md"
        />
      </div>

      {/* Card body */}
      <div className="flex w-full flex-col items-center rounded-3xl bg-white px-6 pb-6 pt-12 text-center shadow-sm">
        <div className="flex gap-1 text-[#FFB627]">
          {[...Array(t.rating)].map((_, i) => (
            <BsFillStarFill key={i} className="text-sm" />
          ))}
        </div>

        <h3 className="mt-3 text-lg font-bold text-[#11142B]">{t.headline}</h3>

        <p className="mt-3 text-sm leading-relaxed text-[#11142B]/60">
          {t.quote}
        </p>
      </div>

      {/* Tail pointing down to the name */}
      <div className="h-3 w-3 -translate-y-px rotate-45 bg-white" />

      <div className="mt-1 text-center">
        <p className="text-sm font-semibold text-[#11142B]">{t.name}</p>
        <p className="text-xs text-[#11142B]/45">{t.role}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-[#F3F1EA] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#92600a]">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#11142B] sm:text-4xl">
            What clients say after we're done.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

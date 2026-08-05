"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import NavBar from "@/_components/NavBar";
import Footer from "@/_components/Footer";
import DeviceCTABanner from "@/_components/DeviceCTABanner";
import { ctaConfigs } from "@/_components/ctaConfigs";

type Member = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  order: number;
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

function MemberCard({ member, index }: { member: Member; index: number }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-[#11142B]/[0.06] transition-shadow hover:shadow-xl hover:shadow-[#11142B]/5"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image src={member.image} alt={member.name} fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold">{member.name}</h3>
        <p className="mt-1 text-sm font-medium text-[#92600a]">{member.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-[#11142B]/60">{member.bio}</p>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetch("/api/team").then(r => r.json()).then(setMembers).catch(() => {});
  }, []);

  const founder = members[0];
  const rest = members.slice(1);

  return (
    <main className="bg-[#F3F1EA] font-sans text-[#11142B]">
      <NavBar />

      {/* hero */}
      <section className="px-5 pb-10 pt-16 md:px-10 md:pb-14 md:pt-24">
        <div className="mx-auto max-w-[1400px]">
          <motion.span {...fadeUp} transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-[#11142B]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#11142B]/50">
            The people
          </motion.span>
          <motion.h1 {...fadeUp} transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 max-w-3xl text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl">
            Builders who<br /><span className="font-semibold">teach what they ship.</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-xl text-base text-[#11142B]/60 sm:text-lg">
            The same team that builds websites, apps and brands for paying clients is the team
            in the classroom. Here&apos;s who you&apos;ll be learning from and working with.
          </motion.p>
        </div>
      </section>

      {/* founder feature */}
      {founder && (
        <section className="px-5 py-8 md:px-10">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }}
            className="mx-auto grid max-w-[1400px] grid-cols-1 overflow-hidden rounded-[36px] bg-[#11142B] md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[340px] w-full">
              <Image src={founder.image} alt={founder.name} fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover object-top" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-14">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#FFB627]">
                {founder.role}
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{founder.name}</h2>
              <p className="mt-5 text-base leading-relaxed text-white/60">{founder.bio}</p>
            </div>
          </motion.div>
        </section>
      )}

      {/* team grid */}
      {rest.length > 0 && (
        <section className="px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1400px]">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}
              className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">The mentors</h2>
              <p className="max-w-sm text-sm text-[#11142B]/55">
                A small team by design — so every learner is known by name and every project gets real attention.
              </p>
            </motion.div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((member, i) => (
                <MemberCard key={member.id} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* join us */}
      <section className="px-5 py-8 md:px-10">
        <motion.div {...fadeUp} transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 rounded-[36px] bg-[#EAE7DD] p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h3 className="text-2xl font-semibold sm:text-3xl">Want to build with us?</h3>
            <p className="mt-3 max-w-lg text-[#11142B]/65">
              We&apos;re always glad to meet mentors and builders who care about the work. Reach out and tell us what you do.
            </p>
          </div>
          <Link href="/contact"
            className="flex shrink-0 items-center gap-2 rounded-full bg-[#11142B] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
            Get in touch <FiArrowRight className="text-xs" />
          </Link>
        </motion.div>
      </section>

      <DeviceCTABanner {...ctaConfigs.about} />
      <Footer />
    </main>
  );
}

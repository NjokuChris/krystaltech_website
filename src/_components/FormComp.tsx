"use client";

/**
 * Contact form with a Tech Hub / Service Hub toggle.
 * ------------------------------------------------------------
 * The two hubs need different information:
 *   - Tech Hub  (training)  -> learner name, age, program of interest
 *   - Service Hub (business) -> company, service needed, budget
 * Shared fields (contact name, email, phone, message) stay in both.
 *
 * Design system: white card on the sand/ink palette, amber accents.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

type Hub = "tech" | "service";

const PROGRAMS = [
  "ICT Fundamentals",
  "Scratch Programming",
  "Web Development",
  "Graphics Design",
  "Video Editing",
  "UI/UX Design",
  "Robotics",
  "Intro to AI",
  "Not sure yet",
];

const SERVICES = [
  "Website Development",
  "Mobile App Development",
  "Graphic Design",
  "Online Marketing",
  "Cyber Security",
  "Not sure yet",
];

const inputClass =
  "w-full rounded-xl border border-[#11142B]/15 bg-white px-4 py-3 text-sm text-[#11142B] outline-none transition-colors placeholder:text-[#11142B]/35 focus:border-[#FFB627] focus:ring-2 focus:ring-[#FFB627]/20";

const labelClass = "mb-1.5 block text-sm font-medium text-[#11142B]";

const fieldFade = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.25 },
};

export default function ContactForm() {
  const [hub, setHub] = useState<Hub>("tech");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend wired yet - show a friendly confirmation.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-xl shadow-[#11142B]/5 md:p-14">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2DD4BF]/15 text-[#0D9488]">
          <FiCheckCircle className="text-3xl" />
        </span>
        <h3 className="mt-6 text-2xl font-semibold text-[#11142B]">
          Thanks, we&apos;ve got it.
        </h3>
        <p className="mt-3 max-w-sm text-sm text-[#11142B]/60">
          We&apos;ll get back to you within a day about your{" "}
          {hub === "tech" ? "enrolment" : "project"}. In the meantime, feel free
          to call us if it&apos;s urgent.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 rounded-full border border-[#11142B]/20 px-6 py-2.5 text-sm font-semibold text-[#11142B] transition-colors hover:bg-[#11142B]/5"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl shadow-[#11142B]/5 md:p-10">
      {/* hub toggle */}
      <div>
        <p className={labelClass}>What are you contacting us about?</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setHub("tech")}
            className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
              hub === "tech"
                ? "border-[#FFB627] bg-[#FFB627]/8 ring-2 ring-[#FFB627]/20"
                : "border-[#11142B]/12 hover:border-[#11142B]/25"
            }`}
          >
            <span
              className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                hub === "tech"
                  ? "bg-[#FFB627] text-[#11142B]"
                  : "bg-[#11142B]/5 text-[#11142B]/50"
              }`}
            >
              <FaGraduationCap />
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#11142B]">
                Tech Hub
              </span>
              <span className="mt-0.5 block text-xs text-[#11142B]/55">
                Training and programs for learners
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setHub("service")}
            className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
              hub === "service"
                ? "border-[#FFB627] bg-[#FFB627]/8 ring-2 ring-[#FFB627]/20"
                : "border-[#11142B]/12 hover:border-[#11142B]/25"
            }`}
          >
            <span
              className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                hub === "service"
                  ? "bg-[#FFB627] text-[#11142B]"
                  : "bg-[#11142B]/5 text-[#11142B]/50"
              }`}
            >
              <FaBriefcase />
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#11142B]">
                Service Hub
              </span>
              <span className="mt-0.5 block text-xs text-[#11142B]/55">
                Software, design and business work
              </span>
            </span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {/* shared: your name + email */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Full name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
        </div>

        {/* shared: phone */}
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+234 ..."
            className={inputClass}
          />
        </div>

        {/* adaptive fields */}
        <AnimatePresence mode="wait" initial={false}>
          {hub === "tech" ? (
            <motion.div key="tech" {...fieldFade} className="space-y-5 overflow-hidden">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="learner" className={labelClass}>
                    Learner&apos;s name
                  </label>
                  <input
                    id="learner"
                    name="learner"
                    type="text"
                    placeholder="Who is the training for?"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="age" className={labelClass}>
                    Learner&apos;s age
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min={5}
                    max={99}
                    placeholder="e.g. 12"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="program" className={labelClass}>
                  Program of interest
                </label>
                <select id="program" name="program" className={inputClass}>
                  {PROGRAMS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="service"
              {...fieldFade}
              className="space-y-5 overflow-hidden"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company / business name
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Your business"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="budget" className={labelClass}>
                    Rough budget (optional)
                  </label>
                  <select id="budget" name="budget" className={inputClass}>
                    <option value="">Prefer not to say</option>
                    <option value="under-250k">Under ₦250,000</option>
                    <option value="250k-1m">₦250,000 - ₦1,000,000</option>
                    <option value="1m-5m">₦1,000,000 - ₦5,000,000</option>
                    <option value="over-5m">Over ₦5,000,000</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="service" className={labelClass}>
                  Service you need
                </label>
                <select id="service" name="service" className={inputClass}>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* shared: message */}
        <div>
          <label htmlFor="message" className={labelClass}>
            {hub === "tech"
              ? "Anything else we should know?"
              : "Tell us about the project"}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder={
              hub === "tech"
                ? "Questions, preferred start date, anything at all."
                : "What are you trying to build, and by when?"
            }
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-[#11142B] py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          {hub === "tech" ? "Send enrolment enquiry" : "Send project enquiry"}
        </button>
      </form>
    </div>
  );
}

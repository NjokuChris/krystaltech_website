'use client';

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function AcceptInvitePage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full rounded-xl border border-[#11142B]/15 bg-[#F3F1EA] px-4 py-2.5 text-sm text-[#11142B] " +
    "outline-none transition focus:border-[#11142B]/40 focus:ring-2 focus:ring-[#FFB627]/30 " +
    "placeholder:text-[#11142B]/35";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter the email address this invite was sent to.");
      return;
    }
    if (username.trim().length < 2) {
      setError("Username must be at least 2 characters.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/invites/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email: email.trim().toLowerCase(),
          username: username.trim(),
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      router.replace("/admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F3F1EA] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg shadow-[#11142B]/10">
        <div className="mb-8 flex justify-center">
          <Image
            src="/krystal4.png"
            alt="Krystal Tech"
            width={160}
            height={50}
            className="h-10 w-auto"
          />
        </div>

        <h1 className="mb-1 text-2xl font-bold text-[#11142B]">Set up your account</h1>
        <p className="mb-6 text-sm text-[#11142B]/55">
          Enter the email address this invite was sent to, then choose your username and password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email — must match what was invited */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#11142B]">
              Invited email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className={inputClass}
              placeholder="you@example.com"
            />
            <p className="mt-1 text-xs text-[#11142B]/40">
              Must match the email this invite link was sent to.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#11142B]">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              required
              className={inputClass}
              placeholder="yourname"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#11142B]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClass}
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#11142B]">
              Confirm password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className={inputClass}
              placeholder="Repeat password"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#11142B] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

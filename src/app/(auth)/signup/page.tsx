'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/validation";
import * as z from "zod";
import { useState } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import AuthShell from "../AuthShell";
import { ui } from "@/app/admin/components/dashboard/ui";

type SignupData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupData) => {
    setMessage("");
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json().catch(() => ({}));
    setOk(res.ok);
    setMessage(result.message || (res.ok ? "Account created." : "Could not sign up."));
  };

  return (
    <AuthShell
      title="Create account"
      subtitle="Add a new admin user."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#11142B] underline-offset-2 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {message && (
          <div
            className={
              ok
                ? "rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm text-emerald-700"
                : ui.errorBox
            }
          >
            {message}
          </div>
        )}

        <div>
          <label className={ui.label}>Username</label>
          <input
            {...register("username")}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className={ui.input}
            placeholder="your username"
          />
          {errors.username && <p className={ui.errorText}>{errors.username.message}</p>}
        </div>

        <div>
          <label className={ui.label}>Email</label>
          <input {...register("email")} className={ui.input} placeholder="you@example.com" />
          {errors.email && <p className={ui.errorText}>{errors.email.message}</p>}
        </div>

        <div>
          <label className={ui.label}>Password</label>
          <input
            type="password"
            {...register("password")}
            className={ui.input}
            placeholder="••••••••"
          />
          {errors.password && <p className={ui.errorText}>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className={`${ui.btnPrimary} w-full`}>
          {isSubmitting ? "Creating…" : "Create account"}
          {!isSubmitting && <FiArrowRight className="text-xs" />}
        </button>
      </form>
    </AuthShell>
  );
}

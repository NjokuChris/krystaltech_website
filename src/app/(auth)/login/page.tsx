'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import AuthShell from "../AuthShell";
import { ui } from "@/app/admin/components/dashboard/ui";

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setMessage("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json().catch(() => ({}));

    if (res.ok) {
      router.push("/admin/dashboard");
      router.refresh();
      return;
    }
    setMessage(result.message || "Invalid credentials");
  };

  return (
    <AuthShell title="Sign in" subtitle="Access the Krystal Tech Hub admin.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {message && <div className={ui.errorBox}>{message}</div>}

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
          {isSubmitting ? "Signing in…" : "Sign in"}
          {!isSubmitting && <FiArrowRight className="text-xs" />}
        </button>
      </form>
    </AuthShell>
  );
}

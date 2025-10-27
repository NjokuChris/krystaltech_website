'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setMessage(result.message);

    if (res.ok) {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>username</label>
          <input {...form.register("username")} className="border p-2 w-full" />
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...form.register("password")} className="border p-2 w-full" />
        </div>

        <button type="submit" className="bg-green-600 text-white p-2 w-full rounded">
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

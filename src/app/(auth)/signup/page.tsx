'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/validation";
import * as z from "zod";
import { useState } from "react";

type SignupData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [message, setMessage] = useState("");

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupData) => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setMessage(result.message);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Username</label>
          <input {...form.register("username")} className="border p-2 w-full" />
          <p className="text-red-500">{form.formState.errors.username?.message}</p>
        </div>

        <div>
          <label>Email</label>
          <input {...form.register("email")} className="border p-2 w-full" />
          <p className="text-red-500">{form.formState.errors.email?.message}</p>
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...form.register("password")} className="border p-2 w-full" />
          <p className="text-red-500">{form.formState.errors.password?.message}</p>
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">
          Sign Up
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

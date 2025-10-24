import * as z from "zod";

export const signupSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  password: z.string().min(6, "Password too short"),
});

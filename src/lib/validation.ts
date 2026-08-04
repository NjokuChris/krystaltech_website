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

// ---------------------------------------------------------------
// Contact form (Tech Hub / Service Hub) - powers /api/contact
// ---------------------------------------------------------------

export const contactSchema = z.object({
  hub: z.enum(["tech", "service"]),

  // shared
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(5000).optional().or(z.literal("")),

  // tech hub
  learner: z.string().trim().max(120).optional().or(z.literal("")),
  age: z.string().trim().max(3).optional().or(z.literal("")),
  program: z.string().trim().max(120).optional().or(z.literal("")),

  // service hub
  company: z.string().trim().max(160).optional().or(z.literal("")),
  budget: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().trim().max(120).optional().or(z.literal("")),

  // honeypot - real users leave this empty. Kept loose here so browser
  // autofill can't produce a hard validation error; the route inspects
  // it separately and silently drops bot submissions.
  website: z.string().optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;

// ---------------------------------------------------------------
// Blog posts (CMS) - powers /api/posts
// ---------------------------------------------------------------

export const POST_CATEGORIES = ["Tech Hub", "Service Hub", "Guides"] as const;

export const postSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(160),
  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase words separated by hyphens"),
  excerpt: z.string().trim().min(10, "Excerpt is too short").max(400),
  content: z.string().trim().min(1, "Content is required"),
  category: z.enum(POST_CATEGORIES),
  image: z.string().trim().min(1, "Image path is required").max(500),
  readTime: z.string().trim().min(1, "Read time is required").max(40),
  published: z.boolean().default(false),
});

export type PostPayload = z.infer<typeof postSchema>;
// Input type (before defaults are applied) - use for react-hook-form values.
export type PostInput = z.input<typeof postSchema>;

// ---------------------------------------------------------------
// Announcements (CMS) - powers /api/announcements + "Happening Now"
// ---------------------------------------------------------------

export const announcementSchema = z.object({
  eyebrow: z.string().trim().min(1).max(60).optional().default("Happening now"),
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(160),
  body: z.string().trim().min(10, "Body is too short").max(600),
  primaryLabel: z.string().trim().max(60).optional().or(z.literal("")),
  primaryHref: z.string().trim().max(500).optional().or(z.literal("")),
  secondaryLabel: z.string().trim().max(60).optional().or(z.literal("")),
  secondaryHref: z.string().trim().max(500).optional().or(z.literal("")),
  active: z.boolean().optional().default(false),
});

export type AnnouncementPayload = z.infer<typeof announcementSchema>;

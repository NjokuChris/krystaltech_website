import * as z from "zod";

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

  // honeypot
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
export type PostInput = z.input<typeof postSchema>;

// ---------------------------------------------------------------
// Announcements (CMS) - powers /api/announcements
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

// ---------------------------------------------------------------
// Projects / Work (CMS) - powers /api/projects
// ---------------------------------------------------------------

export const PROJECT_CATEGORIES = ["Website", "Mobile App", "Branding", "Security"] as const;

export const projectSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(160),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase words separated by hyphens"),
  client: z.string().trim().min(1, "Client name is required").max(120),
  category: z.enum(PROJECT_CATEGORIES),
  summary: z.string().trim().min(10, "Summary is too short").max(600),
  image: z.string().trim().min(1, "Image is required").max(500),
  tags: z.union([
    z.array(z.string().trim().max(40)),
    z.string().transform((s) => s.split(",").map((t) => t.trim()).filter(Boolean)),
  ]),
  published: z.boolean().default(false),
});

export type ProjectPayload = z.infer<typeof projectSchema>;
export type ProjectInput = z.input<typeof projectSchema>;

// ---------------------------------------------------------------
// Team members (CMS) - powers /api/team
// ---------------------------------------------------------------

export const teamMemberSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  role: z.string().trim().min(2, "Role is required").max(120),
  bio: z.string().trim().min(10, "Bio is too short").max(600),
  image: z.string().trim().min(1, "Image is required").max(500),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export type TeamMemberPayload = z.infer<typeof teamMemberSchema>;
export type TeamMemberInput = z.input<typeof teamMemberSchema>;

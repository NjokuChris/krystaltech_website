/**
 * Blog post detail - /blog/[slug]
 * ------------------------------------------------------------
 * Server component: fetches one published post from the CMS and
 * renders its Markdown body. Returns 404 for missing/unpublished slugs.
 */

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FiArrowLeft } from "react-icons/fi";
import NavBar from "@/_components/NavBar";
import Footer from "@/_components/Footer";
import DeviceCTABanner from "@/_components/DeviceCTABanner";
import { ctaConfigs } from "@/_components/ctaConfigs";
import { getPublishedPostBySlug, getPublishedPosts, formatPostDate } from "@/lib/content";
import JsonLd, { articleSchema, breadcrumbSchema } from "@/_components/JsonLd";

export const dynamic = "force-dynamic";

// Pre-render the known published slugs at build time.
export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      images: [{ url: post.image.startsWith("http") ? post.image : `https://www.krystaltechhub.com${post.image}` }],
    },
  };
}

const categoryTint: Record<string, string> = {
  "Tech Hub": "bg-[#2DD4BF]/15 text-[#0f766e]",
  "Service Hub": "bg-[#FFB627]/20 text-[#92600a]",
  Guides: "bg-[#11142B]/10 text-[#11142B]",
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) notFound();

  const tint = categoryTint[post.category] ?? "bg-[#11142B]/10 text-[#11142B]";

  return (
    <main className="bg-[#F3F1EA] font-sans text-[#11142B]">
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: post.title, url: `/blog/${post.slug}` }])} />
      <NavBar />

      <article className="px-5 pb-16 pt-12 md:px-10 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#11142B]/60 transition-colors hover:text-[#11142B]"
          >
            <FiArrowLeft /> All posts
          </Link>

          <div className="mt-8">
            <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${tint}`}>
              {post.category}
            </span>
            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-[#11142B]/50">
              {formatPostDate(post.createdAt)} · {post.readTime}
            </p>
          </div>

          <div className="relative mt-8 h-64 w-full overflow-hidden rounded-3xl sm:h-96">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg mt-10 max-w-none prose-headings:font-semibold prose-headings:text-[#11142B] prose-p:text-[#11142B]/80 prose-a:text-[#92600a] prose-strong:text-[#11142B] prose-li:text-[#11142B]/80">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>

      <DeviceCTABanner {...ctaConfigs.blog} />

      <Footer />
    </main>
  );
}

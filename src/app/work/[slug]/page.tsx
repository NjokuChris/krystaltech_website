import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import NavBar from "@/_components/NavBar";
import Footer from "@/_components/Footer";
import DeviceCTABanner from "@/_components/DeviceCTABanner";
import { ctaConfigs } from "@/_components/ctaConfigs";
import { db } from "@/lib/prisma";
import JsonLd, { breadcrumbSchema } from "@/_components/JsonLd";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

const categoryStyles: Record<string, string> = {
  Website: "bg-red-50 text-red-700",
  "Mobile App": "bg-teal-50 text-teal-700",
  Branding: "bg-violet-50 text-violet-700",
  Security: "bg-indigo-50 text-indigo-700",
};

async function getProject(slug: string) {
  return db.project.findFirst({ where: { slug, published: true } });
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.image.startsWith("http")
        ? [{ url: project.image }]
        : [{ url: `https://www.krystaltechhub.com${project.image}` }],
    },
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const categoryStyle = categoryStyles[project.category] ?? "bg-[#11142B]/10 text-[#11142B]";

  return (
    <main className="bg-[#F3F1EA] font-sans text-[#11142B]">
      <JsonLd data={breadcrumbSchema([
        { name: "Our Work", url: "/work" },
        { name: project.title, url: `/work/${project.slug}` },
      ])} />
      <NavBar />

      <article className="px-5 pb-16 pt-12 md:px-10 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#11142B]/60 transition-colors hover:text-[#11142B]"
          >
            <FiArrowLeft /> All work
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_0.8fr] lg:items-end">
            <div>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${categoryStyle}`}>
                {project.category}
              </span>
              <p className="mt-5 text-sm font-medium uppercase tracking-[0.16em] text-[#11142B]/50">
                {project.client}
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                {project.title}
              </h1>
            </div>

            <p className="max-w-xl text-lg leading-relaxed text-[#11142B]/65">
              {project.summary}
            </p>
          </div>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[32px] bg-[#11142B]/10">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1152px"
              className="object-cover"
            />
          </div>

          <section className="mt-10 grid gap-8 border-y border-[#11142B]/10 py-8 sm:grid-cols-[180px_1fr]">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#11142B]/50">
              Project details
            </h2>
            <div>
              <p className="max-w-2xl text-lg leading-relaxed text-[#11142B]/75">{project.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#11142B]/5 px-3 py-1.5 text-sm text-[#11142B]/65">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#11142B] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Start a project <FiArrowRight />
          </Link>
        </div>
      </article>

      <DeviceCTABanner {...ctaConfigs.work} />
      <Footer />
    </main>
  );
}

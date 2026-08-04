import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PROGRAM_DETAILS } from "@/_components/programDetails";
import ProgramDetailView from "@/_components/ProgramDetailView";

type Params = { slug: string };

// Pre-render a static page for every program slug at build time.
export function generateStaticParams(): Params[] {
  return Object.keys(PROGRAM_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = PROGRAM_DETAILS[slug];

  if (!data) {
    return { title: "Program not found | Krystal Tech Hub" };
  }

  const description = data.intro[0] ?? "";
  return {
    title: `${data.titleTop} ${data.titleBottom} | Krystal Tech Hub`,
    description: description.slice(0, 160),
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const data = PROGRAM_DETAILS[slug];

  if (!data) {
    notFound();
  }

  return <ProgramDetailView data={data} />;
}

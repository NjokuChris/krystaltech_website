/**
 * Blog - Krystal Tech Hub
 * ------------------------------------------------------------
 * All published posts from the CMS, filterable by category.
 * Server component: reads posts from the DB, then hands them to the
 * BlogList client child for the filter UI.
 */

import NavBar from "@/_components/NavBar";
import Footer from "@/_components/Footer";
import BlogList from "@/_components/BlogList";
import DeviceCTABanner from "@/_components/DeviceCTABanner";
import { ctaConfigs } from "@/_components/ctaConfigs";
import { getPublishedPosts, toCardPost } from "@/lib/content";

// Always reflect the latest published posts.
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = (await getPublishedPosts()).map(toCardPost);

  return (
    <main className="bg-[#F3F1EA] font-sans text-[#11142B]">
      <NavBar />

      <BlogList posts={posts} />

      <DeviceCTABanner {...ctaConfigs.blog} />

      <Footer />
    </main>
  );
}

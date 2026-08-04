import BlogSectionView from "./BlogSectionView";
import { getPublishedPosts, toCardPost } from "@/lib/content";

/**
 * Blog section for the home page. Server component: fetches the latest
 * published posts from the DB and hands them to the client view, which
 * renders the animated header + card grid.
 */

const BlogSection = async () => {
  const posts = (await getPublishedPosts()).slice(0, 3).map(toCardPost);
  return <BlogSectionView posts={posts} />;
};

export default BlogSection;

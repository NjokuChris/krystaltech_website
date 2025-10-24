import { db } from "@/lib/prisma";
import Link from "next/link";


export default async function PostsPage() {
    const posts = await db.post.findMany();

    return (
        <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
            <h1>All posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/posts/${post.id}`}>
                            {post.title}
                        </Link>

                    </li>
                ))}
            </ul>
        </main>
    );
}
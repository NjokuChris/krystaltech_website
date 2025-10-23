import { prisma } from "@/lib/prisma";


export default async function PostsPage() {
    const posts = await prisma.post.findMany();

    return (
        <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
            <h1>All posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
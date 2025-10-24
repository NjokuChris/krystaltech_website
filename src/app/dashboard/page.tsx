import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies(); // ✅ await added
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold">Welcome to your Dashboard 🎉</h1>
      <p className="mt-2">You are now logged in!</p>
      <form action="/api/logout" method="post">
        <button
          type="submit"
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </form>
    </div>
  );
}

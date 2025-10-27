// import { NextResponse } from "next/server";

// export async function POST() {
//   const response = NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
//   response.cookies.set("token", "", {
//     maxAge: 0,
//     path: "/",
//   });
//   return response;
// }


import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set("token", "", { maxAge: 0, path: "/" }); // clear cookie
  return response;
}

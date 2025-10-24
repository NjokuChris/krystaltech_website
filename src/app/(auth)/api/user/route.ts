import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
   // return NextResponse.json({ Success: "User route is under construction." });
    try {
        const body = await req.json();
        const {email, username, password } = body;

        const existingUserByEmail = await db.user.findUnique({
            where: { email: email },
        });
        if (existingUserByEmail) {
            return NextResponse.json({user: null, error: "User already exists." }, { status: 409 });
        }
        const existingUserByUsername = await db.user.findUnique({
            where: { username: username },
        });
        if (existingUserByUsername) {
            return NextResponse.json({user: null, error: "User with name exists." }, { status: 409 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });
        const {password: _, ...userWithoutPassword } = newUser;
        return NextResponse.json({ user: userWithoutPassword, message: "User created successfully." }, { status: 201 });
    } catch (error) {
       return NextResponse.json({ user: null, error: "Internal server error." }, { status: 500 });
    }
}
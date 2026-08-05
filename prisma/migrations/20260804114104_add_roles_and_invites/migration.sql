## Error Type
Build Error

## Error Message
Module not found: Can't resolve 'cloudinary'

## Build Output
./src/app/api/upload/route.ts:4:1
Module not found: Can't resolve 'cloudinary'
  2 | // without exposing the API secret. The client gets back a signed URL + params.
  3 | import { NextResponse } from "next/server";
> 4 | import { v2 as cloudinary } from "cloudinary";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  5 |
  6 | cloudinary.config({
  7 |   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,

https://nextjs.org/docs/messages/module-not-found

Next.js version: 15.5.6 (Turbopack)
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN';

-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "invitedById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invite_email_key" ON "Invite"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Invite_token_key" ON "Invite"("token");

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

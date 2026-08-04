import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

/**
 * Creates (or updates) the admin user from environment variables.
 * Reads ADMIN_USERNAME / ADMIN_EMAIL / ADMIN_PASSWORD.
 *
 * Run with:  npm run admin:create
 * To rotate the password, change ADMIN_PASSWORD in .env.local and rerun.
 */
async function main() {
  const username = process.env.ADMIN_USERNAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !email || !password) {
    console.error(
      "Missing ADMIN_USERNAME, ADMIN_EMAIL, or ADMIN_PASSWORD in the environment (.env.local).",
    );
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await db.user.upsert({
    where: { username },
    update: { email, password: hashed, role: "SUPER_ADMIN" },
    create: { username, email, password: hashed, role: "SUPER_ADMIN" },
  });

  console.log(`Admin user ready: ${user.username} <${user.email}> (id ${user.id})`);
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });

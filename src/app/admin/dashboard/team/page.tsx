import { db } from "@/lib/prisma";
import TeamManager from "../../components/dashboard/TeamManager";

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const members = await db.teamMember.findMany({ orderBy: { order: "asc" } });
  return <TeamManager members={members} />;
}

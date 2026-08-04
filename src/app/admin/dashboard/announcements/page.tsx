/**
 * Admin announcements page. Server component: reads all announcements
 * and hands them to the client manager.
 */

import { db } from "@/lib/prisma";
import AnnouncementsManager from "../../components/dashboard/AnnouncementsManager";

export const dynamic = "force-dynamic";

export default async function AdminAnnouncementsPage() {
  const announcements = await db.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <AnnouncementsManager announcements={announcements} />;
}

import { db } from "@/lib/prisma";
import ProjectsManager from "../../components/dashboard/ProjectsManager";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({ orderBy: { createdAt: "desc" } });
  return <ProjectsManager projects={projects} />;
}

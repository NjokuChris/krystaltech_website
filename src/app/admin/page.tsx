/**
 * Admin dashboard home. Server component: shows real CMS counts and
 * quick links into posts + announcements.
 */

import Link from "next/link";
import { ArrowRightIcon, PencilSquareIcon, BellAlertIcon, BriefcaseIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { db } from "@/lib/prisma";
import Card from "./components/dashboard/Card";
import { ui } from "./components/dashboard/ui";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [totalPosts, announcements, projects, teamMembers] = await Promise.all([
    db.post.count(),
    db.announcement.count(),
    db.project.count(),
    db.teamMember.count(),
  ]);

  const cards = [
    { title: "Posts", value: totalPosts, accent: true },
    { title: "Announcements", value: announcements },
    { title: "Projects", value: projects },
    { title: "Team members", value: teamMembers },
  ];

  const links = [
    {
      title: "Manage posts",
      desc: "Create, edit, publish and delete blog posts.",
      href: "/admin/dashboard/posts",
      icon: PencilSquareIcon,
    },
    {
      title: "Manage announcements",
      desc: "Update the Happening Now band on the home page.",
      href: "/admin/dashboard/announcements",
      icon: BellAlertIcon,
    },
    {
      title: "Manage projects",
      desc: "Showcase client work in the portfolio section.",
      href: "/admin/dashboard/projects",
      icon: BriefcaseIcon,
    },
    {
      title: "Manage team",
      desc: "Add and update team member profiles.",
      href: "/admin/dashboard/team",
      icon: UserGroupIcon,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className={ui.heading}>Dashboard</h2>
        <p className={`mt-1 ${ui.subheading}`}>An overview of your content.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {cards.map((card) => (
          <Card key={card.title} title={card.title} value={card.value.toString()} accent={card.accent} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
        {links.map(({ title, desc, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-start gap-4 rounded-2xl border border-[#11142B]/10 bg-white p-6 shadow-sm shadow-[#11142B]/5 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#11142B]/10"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#11142B]/5 text-[#11142B]">
              <Icon className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <h3 className="flex items-center gap-1.5 text-base font-medium text-[#11142B]">
                {title}
                <ArrowRightIcon className="h-4 w-4 -translate-x-1 text-[#FFB627] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </h3>
              <p className="mt-1 text-sm text-[#11142B]/60">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

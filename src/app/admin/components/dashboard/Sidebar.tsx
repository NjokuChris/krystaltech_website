'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon, HomeIcon, PencilSquareIcon, BellAlertIcon, UsersIcon, BriefcaseIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface SidebarProps {
  collapsed?: boolean;
  toggleCollapse?: () => void;
  mobileOpen?: boolean;
  setMobileOpen?: (val: boolean) => void;
}

const baseMenuItems = [
  { name: "Dashboard", icon: HomeIcon, href: "/admin" },
  { name: "Posts", icon: PencilSquareIcon, href: "/admin/dashboard/posts" },
  { name: "Announcements", icon: BellAlertIcon, href: "/admin/dashboard/announcements" },
  { name: "Projects", icon: BriefcaseIcon, href: "/admin/dashboard/projects" },
  { name: "Team", icon: UserGroupIcon, href: "/admin/dashboard/team" },
];

const superAdminItems = [
  { name: "Users", icon: UsersIcon, href: "/admin/dashboard/users" },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar({
  collapsed = false,
  toggleCollapse,
  mobileOpen = false,
  setMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const { user } = useCurrentUser();

  const menuItems = [
    ...baseMenuItems,
    ...(user?.role === "SUPER_ADMIN" ? superAdminItems : []),
  ];

  const NavItems = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex-1 space-y-1 px-3 py-4">
      {menuItems.map(({ name, icon: Icon, href }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={name}
            href={href}
            onClick={onNavigate}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className="relative flex items-center">
              {active && (
                <span className="absolute -left-3 h-5 w-1 rounded-full bg-[#FFB627]" />
              )}
              <Icon className="h-5 w-5" />
            </span>
            <span className={collapsed ? "hidden" : "inline"}>{name}</span>
          </Link>
        );
      })}
    </nav>
  );

  const Brand = ({ showToggle }: { showToggle?: boolean }) => (
    <div className="flex h-20 items-center justify-between border-b border-white/10 px-4">
      <Link href="/admin" className={collapsed && !showToggle ? "hidden" : "flex items-center"}>
        <Image
          src="/krystal4.png"
          alt="Krystal"
          width={160}
          height={50}
          className="h-8 w-auto brightness-0 invert"
        />
      </Link>
      {showToggle && (
        <button
          className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white"
          onClick={toggleCollapse}
          aria-label="Collapse sidebar"
        >
          <Bars3Icon className="h-5 w-5" />
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden h-full flex-col bg-[#11142B] transition-all duration-300 md:flex ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <Brand showToggle />
        <NavItems />
        <div className="border-t border-white/10 px-3 py-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white"
          >
            <HomeIcon className="h-5 w-5" />
            <span className={collapsed ? "hidden" : "inline"}>View site</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-[#11142B]/40 backdrop-blur-sm"
            onClick={() => setMobileOpen?.(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 bg-[#11142B] shadow-xl">
            <div className="flex h-20 items-center justify-between border-b border-white/10 px-4">
              <Image
                src="/krystal4.png"
                alt="Krystal"
                width={160}
                height={50}
                className="h-8 w-auto brightness-0 invert"
              />
              <button
                className="rounded-lg p-2 text-white/70 hover:bg-white/10"
                onClick={() => setMobileOpen?.(false)}
                aria-label="Close menu"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <NavItems onNavigate={() => setMobileOpen?.(false)} />
          </div>
        </div>
      )}
    </>
  );
}

'use client';
import { useState } from "react";
import { Bars3Icon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface HeaderProps {
  toggleMobileMenu?: () => void;
}

export default function Header({ toggleMobileMenu }: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();
  const { user } = useCurrentUser();

  const displayName = user?.username ?? "Admin";
  const initial = displayName[0].toUpperCase();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#11142B]/10 bg-[#F3F1EA]/80 px-4 py-3 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-3">
        <button
          className="rounded-lg p-2 text-[#11142B] hover:bg-[#11142B]/5 md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Open menu"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#11142B]/50">
          Content Manager
        </span>
      </div>

      <div className="relative">
        <button
          className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-[#11142B]/5"
          onClick={() => setProfileOpen((v) => !v)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#11142B] text-xs font-semibold text-white">
            {initial}
          </span>
          <div className="hidden flex-col items-start md:flex">
            <span className="text-sm font-medium leading-tight text-[#11142B]">{displayName}</span>
            {user?.role === "SUPER_ADMIN" && (
              <span className="text-[10px] font-semibold uppercase tracking-wide text-[#b07d00]">
                Super Admin
              </span>
            )}
          </div>
          <svg
            className={`h-4 w-4 text-[#11142B]/50 transition-transform duration-200 ${
              profileOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {profileOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
            <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-2xl border border-[#11142B]/10 bg-white p-1.5 shadow-xl shadow-[#11142B]/10">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#11142B]/80 transition-colors hover:bg-[#11142B]/5 hover:text-[#11142B]"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

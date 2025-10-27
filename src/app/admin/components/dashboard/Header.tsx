'use client';
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface HeaderProps {
  toggleMobileMenu?: () => void;
}

export default function Header({ toggleMobileMenu }: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  // Logout function
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" }); // call your logout API
    router.replace("/login"); // redirect to login page
  };

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={toggleMobileMenu}
        >
          <Bars3Icon className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 hidden md:block">Dashboard</h1>
      </div>

      <div className="relative">
        <button
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <img
            src="/avatar.png"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="hidden md:inline">Admin</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
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
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded border border-gray-200 z-10">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

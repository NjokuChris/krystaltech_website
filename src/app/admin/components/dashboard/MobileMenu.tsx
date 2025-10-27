'use client';
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  if (!isOpen) return null;

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Tables", href: "/admin/dashboard/tables" },
    { name: "Forms", href: "/admin/dashboard/forms" },
    { name: "Notifications", href: "/admin/dashboard/notifications" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
      <div className="w-64 bg-blue-900 text-white p-6 h-full">
        <button
          className="mb-6 text-white"
          onClick={() => setIsOpen(false)}
        >
          Close ✕
        </button>
        <nav className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 p-2 rounded hover:bg-blue-800 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

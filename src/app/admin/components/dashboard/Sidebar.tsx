'use client';
import { Bars3Icon, XMarkIcon, HomeIcon, TableCellsIcon, PencilIcon, BellIcon } from "@heroicons/react/24/outline";

interface SidebarProps {
  collapsed?: boolean; // desktop collapse
  toggleCollapse?: () => void; // desktop toggle
  mobileOpen?: boolean; // mobile open
  setMobileOpen?: (val: boolean) => void; // mobile toggle
}

export default function Sidebar({
  collapsed = false,
  toggleCollapse,
  mobileOpen = false,
  setMobileOpen,
}: SidebarProps) {
  const menuItems = [
    { name: "Dashboard", icon: <HomeIcon className="w-6 h-6" />, href: "/admin/dashboard" },
    { name: "Tables", icon: <TableCellsIcon className="w-6 h-6" />, href: "/admin/dashboard/tables" },
    { name: "Forms", icon: <PencilIcon className="w-6 h-6" />, href: "/admin/dashboard/forms" },
    { name: "Notifications", icon: <BellIcon className="w-6 h-6" />, href: "/admin/dashboard/notifications" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col h-full bg-blue-900 text-white transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}
      >
        <div className="flex items-center justify-between h-20 border-b border-blue-700 px-2">
          <span className={`text-xl font-bold ${collapsed ? "hidden" : "block"}`}>Admin</span>
          <button className="p-2 hover:bg-blue-800 rounded" onClick={toggleCollapse}>
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 p-2 rounded hover:bg-blue-800 transition"
            >
              {item.icon}
              <span className={`${collapsed ? "hidden" : "inline"}`}>{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`absolute top-0 left-0 h-full w-64 md:hidden transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-blue-900 h-full text-white shadow-xl">
          <div className="flex items-center justify-between h-20 border-b border-blue-700 px-2">
            <span className="text-xl font-bold">Admin</span>
            <button
              className="p-2 hover:bg-blue-800 rounded"
              onClick={() => setMobileOpen && setMobileOpen(false)}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 p-2 rounded hover:bg-blue-800 transition"
                onClick={() => setMobileOpen && setMobileOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

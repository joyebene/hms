"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  CalendarDaysIcon,
  ArrowRightOnRectangleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

type Role = "ADMIN" | "DOCTOR" | "NURSE" | "RECEPTIONIST";

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  roles: Role[];
}

const sidebarItems: SidebarItem[] = [
  {
    icon: HomeIcon,
    label: "Dashboard",
    href: "/dashboard",
    roles: ["ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST"],
  },
  {
    icon: UsersIcon,
    label: "Patients",
    href: "/dashboard/patients",
    roles: ["ADMIN", "DOCTOR", "NURSE"],
  },
  {
    icon: UsersIcon,
    label: "Doctors",
    href: "/dashboard/doctor",
    roles: ["ADMIN"],
  },
  {
    icon: UsersIcon,
    label: "Nurses",
    href: "/dashboard/nurse",
    roles: ["ADMIN"],
  },
  {
    icon: UsersIcon,
    label: "Receptionists",
    href: "/dashboard/receptionist",
    roles: ["ADMIN"],
  },
  {
    icon: CalendarDaysIcon,
    label: "Appointments",
    href: "/dashboard/appointments",
    roles: ["ADMIN", "DOCTOR", "RECEPTIONIST"],
  },
  {
    icon: CreditCardIcon,
    label: "Billing",
    href: "/dashboard/billing",
    roles: ["ADMIN", "RECEPTIONIST"],
  }
];

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<Role>(() => {
  if (typeof window === "undefined") return "ADMIN"; // SSR safety
  return (localStorage.getItem("role") as Role) ?? "ADMIN";
});



  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 
          bg-white backdrop-blur-xl border-r border-gray-200
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-300 pt-20">
          <h2 className="text-lg font-semibold text-indigo-600">HMS</h2>
          <button onClick={onClose}>
            {<XMarkIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Logo / Role */}
        <div className="hidden md:block px-6 py-6 border-b border-gray-300 pt-23">
          <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">
            HMS
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Logged in as <span className="font-medium">{role}</span>
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {sidebarItems
            .filter((item) => item.roles.includes(role))
            .map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <button
                  key={item.href}
                  onClick={() => {
                    router.push(item.href);
                    onClose();
                  }}
                  className={`
                    group flex items-center w-full mb-2 px-4 py-2 rounded-xl text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <span
                    className={`
                      mr-3 flex h-9 w-9 items-center justify-center rounded-lg
                      ${
                        isActive
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-gray-100 text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  {item.label}
                </button>
              );
            })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-300">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
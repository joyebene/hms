"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../shared/Sidebar";
import {
  Bars3Icon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface DashboardLayoutProps {
  children: ReactNode;
  user?: {
    name: string;
    role: "Admin" | "Doctor" | "Nurse";
  };
}

export default function DashboardLayout({
  children,
  user = { name: "Admin User", role: "Admin" },
}: DashboardLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  //  Auth check
  useEffect(() => {
    let token = localStorage.getItem("token");
    token = 'djnchbhn;,l';
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F9FAF7]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 md:p-4 md:pl-4 flex items-center justify-between">
        {/* Mobile menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden text-gray-600 hover:text-gray-900"
        >
          {<Bars3Icon className="w-10 h-10 text-indigo-600" />}
        </button>

        {/* Title */}
        <div className="md:ml-4 flex flex-col items-end md:items-start text-right md:text-left">
          <h1 className="text-lg md:text-2xl font-semibold text-gray-800">
            Hospital Management System
          </h1>
          <p className="text-xs text-gray-500">
            {user.role} Dashboard
          </p>
        </div>

        {/* Desktop logout */}
        <button
          onClick={() => router.push("/login")}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4" />
          Logout
        </button>
      </header>

      {/* Content */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main */}
        <main className="flex-1 overflow-auto p-6 md:p-10 md:ml-64">
              {children}
        </main>
      </div>
    </div>
  );
}
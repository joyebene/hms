"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Button from "@/components/shared/button";
import { UserPlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface Receptionist {
  id: string;
  name: string;
  shift: string;
  email: string;
}

const dummyReceptionists: Receptionist[] = [
  {
    id: "REC-001",
    name: "Alice Brown",
    shift: "Morning",
    email: "alice@example.com",
  },
  {
    id: "REC-002",
    name: "Bob Johnson",
    shift: "Afternoon",
    email: "bob@example.com",
  },
  {
    id: "REC-003",
    name: "Carol Davis",
    shift: "Evening",
    email: "carol@example.com",
  },
  {
    id: "REC-004",
    name: "David Wilson",
    shift: "Night",
    email: "david@example.com",
  },
  {
    id: "REC-005",
    name: "Eve Martinez",
    shift: "Morning",
    email: "eve@example.com",
  },
  // Add more dummy receptionists as needed
];

export default function ReceptionistsPage() {
  const [receptionists, setReceptionists] = useState<Receptionist[]>([]);

  useEffect(() => {
    // For now, use dummy data
    setReceptionists(dummyReceptionists);

    // In the future, replace with actual fetch from backend
    // fetch('/api/receptionists')
    //   .then(res => res.json())
    //   .then(data => setReceptionists(data))
    //   .catch(error => console.error('Error fetching receptionists:', error));
  }, []);

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold text-gray-800">Receptionists Management</h2>
          <p className="text-sm sm:text-base text-gray-500 sm:mt-2">Manage hospital receptionists, assign duties, and view details.</p>
        </div>
        <div className="flex-1 flex justify-end items-center w-full">
          <Button size="sm" className="flex items-center gap-2 w-fit sm:px-8 sm:py-3.5">
            <UserPlusIcon className="w-5 h-5" />
            Add Receptionist
          </Button>
        </div>
      </div>

      {/* Receptionists table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h3 className="font-semibold text-gray-800">All Receptionists</h3>
          <div className="text-sm text-gray-500">Showing 1–{receptionists.length} of {receptionists.length}</div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-max divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {receptionists.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                    No receptionists found
                  </td>
                </tr>
              ) : (
                receptionists.map((receptionist) => (
                  <tr key={receptionist.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{receptionist.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receptionist.shift}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receptionist.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex">
                      <Button size="sm" className="text-indigo-600 hover:text-indigo-900 mr-3">
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="text-red-600 hover:text-red-900">
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
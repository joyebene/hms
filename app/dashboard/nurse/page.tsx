"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Button from "@/components/shared/button";
import Modal from "@/components/shared/modal";
import { UserPlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface Nurse {
  id: string;
  name: string;
  department: string;
  email: string;
}

const dummyNurses: Nurse[] = [
  {
    id: "NUR-001",
    name: "John Doe",
    department: "Emergency",
    email: "john@example.com",
  },
  {
    id: "NUR-002",
    name: "Jane Smith",
    department: "Pediatrics",
    email: "jane@example.com",
  },
  {
    id: "NUR-003",
    name: "Michael Johnson",
    department: "ICU",
    email: "michael@example.com",
  },
  {
    id: "NUR-004",
    name: "Emily Davis",
    department: "Surgery",
    email: "emily@example.com",
  },
  {
    id: "NUR-005",
    name: "Chris Wilson",
    department: "General Ward",
    email: "chris@example.com",
  },
  // Add more dummy nurses as needed
];

export default function NursesPage() {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // For now, use dummy data
    setNurses(dummyNurses);

    // In the future, replace with actual fetch from backend
    // fetch('/api/nurses')
    //   .then(res => res.json())
    //   .then(data => setNurses(data))
    //   .catch(error => console.error('Error fetching nurses:', error));
  }, []);

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold text-gray-800">Nurses Management</h2>
          <p className="text-sm sm:text-base text-gray-500 sm:mt-2">Manage hospital nurses, assign shifts, and view details.</p>
        </div>
        <div className="flex-1 flex justify-end items-center w-full">
          <Button size="sm" className="flex items-center gap-2 w-fit sm:px-8 sm:py-3.5" onClick={() => setIsModalOpen(true)}>
            <UserPlusIcon className="w-5 h-5" />
            Add Nurse
          </Button>
        </div>
      </div>

      {/* Nurses table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h3 className="font-semibold text-gray-800">All Nurses</h3>
          <div className="text-sm text-gray-500">Showing 1–{nurses.length} of {nurses.length}</div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-max divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {nurses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                    No nurses found
                  </td>
                </tr>
              ) : (
                nurses.map((nurse) => (
                  <tr key={nurse.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nurse.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{nurse.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{nurse.email}</td>
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Nurse"
      >
        <form>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                id="department"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <Button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-700 hover:bg-gray-300">
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
              Save Nurse
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Button from "@/components/shared/button";
import { UserPlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
}

const dummyDoctors: Doctor[] = [
  {
    id: "DOC-001",
    name: "Dr. Jane Smith",
    specialty: "Cardiology",
    email: "jane@example.com",
  },
  {
    id: "DOC-002",
    name: "Dr. Michael Brown",
    specialty: "Neurology",
    email: "michael@example.com",
  },
  {
    id: "DOC-003",
    name: "Dr. Sarah Johnson",
    specialty: "Pediatrics",
    email: "sarah@example.com",
  },
  {
    id: "DOC-004",
    name: "Dr. David Wilson",
    specialty: "Orthopedics",
    email: "david@example.com",
  },
];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    // Temporary dummy data
    setDoctors(dummyDoctors);

    // Future API fetch
    // fetch('/api/doctors')
    //   .then(res => res.json())
    //   .then(data => setDoctors(data))
    //   .catch(err => console.error(err));
  }, []);

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold text-gray-800">
            Doctors Management
          </h2>
          <p className="text-sm sm:text-base text-gray-500 sm:mt-2">
            Manage hospital doctors, assign specialties, and view details.
          </p>
        </div>

        <div className="flex-1 flex justify-end items-center w-full">
          <Button size="sm" className="flex items-center gap-2 w-fit sm:px-8 sm:py-3.5">
            <UserPlusIcon className="w-5 h-5" />
            Add Doctor
          </Button>
        </div>
      </div>

      {/* Doctors table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Table header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h3 className="font-semibold text-gray-800">All Doctors</h3>
          <div className="text-sm text-gray-500">
            Showing 1–{doctors.length} of {doctors.length}
          </div>
        </div>

        {/* Scroll wrapper */}
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-max divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {doctors.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-sm text-gray-500"
                  >
                    No doctors found
                  </td>
                </tr>
              ) : (
                doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {doctor.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doctor.specialty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doctor.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex">
                      <Button
                        size="sm"
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="text-red-600 hover:text-red-900"
                      >
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
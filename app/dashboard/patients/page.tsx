"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Button from "@/components/shared/button";
import { UserPlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface Patient {
  id: string;
  fullName: string;
  diagnosis: string;
  age: number;
  gender: string;
  lastVisit: string;
}

const dummyPatients: Patient[] = [
  { id: "PAT-001", fullName: "John Doe", diagnosis: "Hypertension", age: 45, gender: "Male", lastVisit: "2023-10-15" },
  { id: "PAT-002", fullName: "Jane Smith", diagnosis: "Diabetes Type 2", age: 52, gender: "Female", lastVisit: "2023-11-20" },
  { id: "PAT-003", fullName: "Michael Johnson", diagnosis: "Asthma", age: 38, gender: "Male", lastVisit: "2023-09-12" },
  { id: "PAT-004", fullName: "Emily Davis", diagnosis: "Migraine", age: 29, gender: "Female", lastVisit: "2023-08-30" },
  { id: "PAT-005", fullName: "Chris Wilson", diagnosis: "Allergy", age: 41, gender: "Male", lastVisit: "2023-12-01" },
];

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    // Load dummy patients for now
    setPatients(dummyPatients);

    // Future API fetch
    // fetch('/api/patients')
    //   .then(res => res.json())
    //   .then(data => setPatients(data))
    //   .catch(err => console.error(err));
  }, []);

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold text-gray-800">Patients Management</h2>
          <p className="text-sm sm:text-base text-gray-500 sm:mt-2">View and manage patient records, including diagnoses and details.</p>
        </div>

        <div className="flex-1 flex justify-end items-center w-full">
          <Button size="sm" className="flex items-center gap-2 w-fit sm:px-8 sm:py-3.5">
            <UserPlusIcon className="w-5 h-5" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Patients table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Table header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h3 className="font-semibold text-gray-800">All Patients</h3>
          <div className="text-sm text-gray-500">
            Showing 1–{patients.length} of {patients.length}
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-max divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">
                    No patients found
                  </td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr key={patient.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.diagnosis}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.lastVisit}</td>
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
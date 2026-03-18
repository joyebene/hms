"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Button from "@/components/shared/button";
import { CalendarDaysIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  time: string;
  date: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  reason: string;
}

const dummyAppointments: Appointment[] = [
  {
    id: "APP-20250302-001",
    patient: "Aisha Bello",
    doctor: "Dr. Jane Smith",
    time: "10:00 AM",
    date: "2025-03-02",
    status: "Confirmed",
    reason: "Routine check-up",
  },
  {
    id: "APP-20250301-045",
    patient: "Chinedu Okoro",
    doctor: "Dr. Chukwuma Okoro",
    time: "11:30 AM",
    date: "2025-03-01",
    status: "Pending",
    reason: "Chest pain",
  },
  {
    id: "APP-20250228-112",
    patient: "Fatima Yusuf",
    doctor: "Dr. Fatima Yusuf",
    time: "02:00 PM",
    date: "2025-02-28",
    status: "Cancelled",
    reason: "High-risk pregnancy consultation",
  },
  {
    id: "APP-20250227-089",
    patient: "Emeka Nwosu",
    doctor: "Dr. Emeka Nwosu",
    time: "09:30 AM",
    date: "2025-02-27",
    status: "Completed",
    reason: "Sports injury follow-up",
  },
  {
    id: "APP-20250226-023",
    patient: "Ngozi Eze",
    doctor: "Dr. Ngozi Eze",
    time: "03:00 PM",
    date: "2025-02-26",
    status: "Confirmed",
    reason: "Preventive medicine check",
  },
  // Add more dummy appointments as needed
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // For now, use dummy data
    setAppointments(dummyAppointments);

    // In the future, replace with actual fetch from backend
    // fetch('/api/appointments')
    //   .then(res => res.json())
    //   .then(data => setAppointments(data))
    //   .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-600 font-medium";
      case "Pending":
        return "bg-amber-100 text-amber-600 font-medium";
      case "Cancelled":
        return "bg-red-100 text-red-600 font-medium";
      case "Completed":
        return "bg-indigo-100 text-indigo-600 font-medium";
      default:
        return "bg-gray-100 text-gray-600 font-medium";
    }
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold text-gray-800">Appointments</h2>
          <p className="text-sm sm:text-base text-gray-500 sm:mt-2">View and manage today&apos;s appointments.</p>
        </div>
        <div className="flex-1 flex justify-end items-center w-full mt-6">
          <Button size="sm" className="flex items-center gap-2 w-fit sm:px-8 sm:py-3.5">
            <CalendarDaysIcon className="w-5 h-5" />
            Schedule Appointment
          </Button>
        </div>
      </div>

      {/* Appointments table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h3 className="font-semibold text-gray-800">All Appointments</h3>
          <div className="text-sm text-gray-500">Showing 1–{appointments.length} of {appointments.length}</div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-max divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                    No appointments scheduled
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.patient}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.doctor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>{appointment.status}</span>
                    </td>
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
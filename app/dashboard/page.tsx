import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Button from "@/components/shared/button";
import {
    UsersIcon,
    CalendarDaysIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
    return (
        <DashboardLayout>
            {/* Page header */}
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold text-gray-800">
                    Dashboard Overview
                </h2>
                <p className="text-sm sm:text-base text-gray-500 sm:mt-2">
                    Welcome back! Here’s what’s happening in the hospital today.
                </p>
            </div>

            {/* Hospital brief / description */}
            <div className="mb-8 bg-white border border-gray-200 rounded-2xl p-6 relative overflow-hidden">
                {/* Accent bar */}
                <div className="absolute left-0 top-0 h-full w-1 bg-indigo-600" />

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Hospital Overview
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                    For over <span className="font-medium text-gray-900">25 years</span>, our hospital has delivered
                    <span className="font-medium text-gray-900"> high-quality, patient-centered healthcare</span>,
                    serving thousands of patients every year. We provide specialized care in
                    <span className="font-medium text-gray-900"> cardiology</span>,
                    <span className="font-medium text-gray-900"> emergency services</span>,
                    <span className="font-medium text-gray-900"> pediatrics</span>, and
                    <span className="font-medium text-gray-900"> surgical treatment</span>.
                    Our dedicated doctors and healthcare professionals work together to ensure
                    safe, efficient, and compassionate care for every patient.
                </p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {/* Patients */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <div className="flex flex-col gap-2">
                        <div className="p-3 bg-indigo-100 rounded-xl w-fit">
                            <UsersIcon className="w-6 h-6 text-indigo-600" />
                        </div>
                        <p className="text-sm text-gray-500">Total Patients</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">1,248</h3>
                    </div>
                </div>

                {/* Appointments */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <div className="flex flex-col gap-2">
                        <div className="p-3 bg-green-100 rounded-xl w-fit">
                            <CalendarDaysIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-500">Today’s Appointments</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">32</h3>
                    </div>
                </div>

                {/* Staff */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <div className="flex flex-col gap-2">
                        <div className="p-3 bg-purple-100 rounded-xl w-fit">
                            <UsersIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <p className="text-sm text-gray-500">Total Staff</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">58</h3>
                    </div>
                </div>
            </div>

            {/* Admin-only section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Staff Management
                        </h3>
                        <p className="text-sm text-gray-500">
                            Only administrators can add or manage hospital staff.
                        </p>
                    </div>

                    <Button size="sm" className="flex items-center justify-center gap-2 w-full sm:w-fit my-4 sm:my-auto sm:px-8 sm:py-3.5">
                        <UserPlusIcon className="w-5 h-5" />
                        Add Staff
                    </Button>
                </div>

                <div className="text-sm text-gray-600">
                    From here, you can add doctors, nurses, and receptionists, assign
                    roles, and manage access permissions.
                </div>
            </div>
        </DashboardLayout>
    );
}
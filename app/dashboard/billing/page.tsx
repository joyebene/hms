"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Button from "@/components/shared/button";
import Modal from "@/components/shared/modal";
import {
    CreditCardIcon,
    DocumentPlusIcon,
    EyeIcon,
    ArrowDownTrayIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface Invoice {
    id: string;
    patient: string;
    service: string;
    issued: string;
    amount: string;
    status: "Paid" | "Pending" | "Overdue";
}

const dummyInvoices: Invoice[] = [
    {
        id: "#INV-20250302-001",
        patient: "Aisha Bello",
        service: "Cardiology Consultation + ECG",
        issued: "02 Mar 2025",
        amount: "₦48,500",
        status: "Paid",
    },
    {
        id: "#INV-20250301-045",
        patient: "Chinedu Okoro",
        service: "Lab Tests + Ultrasound",
        issued: "01 Mar 2025",
        amount: "₦27,800",
        status: "Pending",
    },
    {
        id: "#INV-20250228-112",
        patient: "Fatima Yusuf",
        service: "Minor Surgery + Anesthesia",
        issued: "28 Feb 2025",
        amount: "₦185,000",
        status: "Overdue",
    },
    {
        id: "#INV-20250227-089",
        patient: "Emeka Nwosu",
        service: "General Checkup + Blood Test",
        issued: "27 Feb 2025",
        amount: "₦15,000",
        status: "Paid",
    },
    {
        id: "#INV-20250226-023",
        patient: "Zainab Ahmed",
        service: "Dental Cleaning",
        issued: "26 Feb 2025",
        amount: "₦32,000",
        status: "Pending",
    },
    // Add more dummy invoices as needed
];

export default function BillingPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // For now, use dummy data
        setInvoices(dummyInvoices);

        // In the future, replace with actual fetch from backend
        // fetch('/api/invoices')
        //   .then(res => res.json())
        //   .then(data => setInvoices(data))
        //   .catch(error => console.error('Error fetching invoices:', error));
    }, []);

    const getStatusColor = (status: Invoice["status"]) => {
        switch (status) {
            case "Paid":
                return "bg-emerald-100 text-emerald-700";
            case "Pending":
                return "bg-amber-100 text-amber-700";
            case "Overdue":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <DashboardLayout>
            {/* Page header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold text-gray-800">Billing & Invoices</h2>
                    <p className="text-sm sm:text-base text-gray-500 sm:mt-2">
                        Manage patient invoices, payments and generate receipts
                    </p>
                </div>
                <div className="flex-1 flex justify-end items-center w-full">
                    <Button size="sm" className="flex items-center gap-2 w-fit sm:px-8 sm:py-3.5" onClick={() => setIsModalOpen(true)}>
                        <DocumentPlusIcon className="w-5 h-5" />
                        Create New Invoice
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Revenue */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">

                    <div className="flex flex-col gap-2">
                        <div className="p-3 bg-emerald-100 rounded-xl w-fit">
                            <CreditCardIcon className="w-6 h-6 text-emerald-600" />
                        </div>
                        <p className="text-sm text-gray-500">Total Revenue (This Month)</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">₦4,872,450</h3>
                    </div>
                </div>

                {/* Pending Payments */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <div className="flex flex-col gap-2">
                        <div className="p-3 bg-amber-300 rounded-xl w-fit">
                            <CreditCardIcon className="w-6 h-6 text-amber-600" />
                        </div>
                        <p className="text-sm text-gray-500">Pending Payments</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">₦1,245,800</h3>
                        <p className="text-xs text-amber-600">12 invoices</p>
                    </div>
                </div>

                {/* Paid Today */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <div className="flex flex-col gap-2">
                        <div className="p-3 bg-indigo-100 rounded-xl w-fit">
                            <CheckCircleIcon className="w-6 h-6 text-indigo-600" />
                        </div>
                            <p className="text-sm text-gray-500">Paid Today</p>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">₦387,200</h3>
                            <p className="text-xs text-green-600">8 payments</p>
                        </div>
                    </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                    <h3 className="font-semibold text-gray-800">All Invoices</h3>
                    <div className="text-sm text-gray-500">Showing 1–{invoices.length} of {invoices.length}</div>
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="w-full min-w-max divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Invoice #
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Patient
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Service
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Issued
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {invoices.length > 0 ? (
                                invoices.map((invoice) => (
                                    <tr key={invoice.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.patient}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.service}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.issued}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                    invoice.status
                                                )}`}
                                            >
                                                {invoice.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex">
                                            <Button size="sm" className="text-indigo-600 hover:text-indigo-900 mr-3">
                                                <EyeIcon className="w-4 h-4" />
                                            </Button>
                                            <Button size="sm" className="text-gray-600 hover:text-gray-900">
                                                <ArrowDownTrayIcon className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                        No invoices found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer note */}
            <p className="text-center text-xs text-gray-400 mt-8">
                All amounts in Nigerian Naira (₦). Last updated: March 02, 2026
            </p>

                        {/* Create Invoice Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Invoice"
            >
                <form>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Patient Name</label>
                            <input
                                type="text"
                                id="patientName"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service Description</label>
                            <input
                                type="text"
                                id="service"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (₦)</label>
                            <input
                                type="number"
                                id="amount"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                id="status"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option>Pending</option>
                                <option>Paid</option>
                                <option>Overdue</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <Button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
                            Save Invoice
                        </Button>
                    </div>
                </form>
            </Modal>
        </DashboardLayout>
    );
}
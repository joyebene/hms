'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";


interface Doctor {
    id: number;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    image: string;
    bio: string;
    available: boolean;
}

const doctors: Doctor[] = [
    {
        id: 1,
        name: "Dr. Aisha Bello",
        specialty: "Cardiology",
        rating: 4.98,
        reviews: 1243,
        image: "https://picsum.photos/id/64/300/300",
        bio: "10+ years experience. Fellow of the West African College of Physicians.",
        available: true,
    },
    {
        id: 2,
        name: "Dr. Chukwuma Okoro",
        specialty: "Pediatrics",
        rating: 4.95,
        reviews: 987,
        image: "https://picsum.photos/id/91/300/300",
        bio: "Special interest in childhood asthma & vaccinations.",
        available: true,
    },
    {
        id: 3,
        name: "Dr. Fatima Yusuf",
        specialty: "Gynecology",
        rating: 4.97,
        reviews: 1567,
        image: "https://picsum.photos/id/1011/300/300",
        bio: "Expert in fertility & high-risk pregnancies.",
        available: true,
    },
    {
        id: 4,
        name: "Dr. Emeka Nwosu",
        specialty: "Orthopedics",
        rating: 4.89,
        reviews: 743,
        image: "https://picsum.photos/id/201/300/300",
        bio: "Sports injuries & joint replacement specialist.",
        available: true,
    },
    {
        id: 5,
        name: "Dr. Ngozi Eze",
        specialty: "General Medicine",
        rating: 4.92,
        reviews: 2104,
        image: "https://picsum.photos/id/1005/300/300",
        bio: "Primary care with focus on preventive medicine.",
        available: true,
    },
];

const specialties = ["All", "Cardiology", "Pediatrics", "Gynecology", "Orthopedics", "General Medicine"];

const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM",
];

export default function AppointmentPage() {
    const [selectedSpecialty, setSelectedSpecialty] = useState("All");
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        reason: "",
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [bookingReference, setBookingReference] = useState(() => `HMS-${Date.now().toString().slice(-6)}`);

    // Generate next 7 days
    const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
            date: d.toISOString().split("T")[0],
            display: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        };
    });

    const filteredDoctors = selectedSpecialty === "All"
        ? doctors
        : doctors.filter(d => d.specialty === selectedSpecialty);

    const handleBook = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDoctor || !selectedDate || !selectedTime) return;
        setShowSuccess(true);

        // Reset after 3 seconds
        setTimeout(() => {
            setShowSuccess(false);
            // You can redirect or clear form here
        }, 10000);
    };

    return (
        <div className="min-h-screen bg-[#F9FAF7]">
            {/* Navbar (same as home) */}
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-md">
                            🏥
                        </div>
                        <div className="text-2xl font-bold tracking-tighter text-gray-900">HospitalMS</div>
                    </Link>

                    <div className="flex items-center">
                        <Button href="/" variant="ghost" size="sm">Home</Button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-10 sm:py-12">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        {/* <div className="text-emerald-600 font-semibold text-sm tracking-widest">STEP 1 OF 3</div> */}
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tighter text-gray-900">Book Appointment</h1>
                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mt-3">Choose a doctor and time that works for you</p>
                    </div>
                   
                </div>

                <div className="grid lg:grid-cols-12 gap-10">
                    {/* LEFT: Doctors & Filters */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Specialty Filter */}
                        <div className="flex flex-wrap gap-3">
                            {specialties.map((spec) => (
                                <button
                                    key={spec}
                                    onClick={() => {
                                        setSelectedSpecialty(spec);
                                        setSelectedDoctor(null);
                                    }}
                                    className={` px-4 py-2 sm:px-6 sm:py-3 rounded-3xl text-xs sm:text-sm font-semibold transition-all ${selectedSpecialty === spec
                                            ? "bg-indigo-600 text-white shadow-md"
                                            : "bg-white border border-gray-200 hover:border-indigo-300 text-gray-700"
                                        }`}
                                >
                                    {spec}
                                </button>
                            ))}
                        </div>

                        {/* Doctors Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {filteredDoctors.map((doctor) => (
                                <div
                                    key={doctor.id}
                                    onClick={() => setSelectedDoctor(doctor)}
                                    className={`group bg-white border-2 border-gray-200 rounded-3xl p-6 cursor-pointer transition-all hover:shadow-xl ${selectedDoctor?.id === doctor.id
                                            ? "border-indigo-400 shadow-lg"
                                            : "border-transparent hover:border-indigo-200"
                                        }`}
                                >
                                    <div className="flex gap-5">
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow">
                                            <Image
                                                src={doctor.image}
                                                alt={doctor.name}
                                                width={80}
                                                height={80}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-lg sm:text-xl">{doctor.name}</div>
                                            <div className="text-indigo-600 font-medium">{doctor.specialty}</div>

                                            <div className="flex items-center gap-2 mt-3">
                                                <div className="text-lg sm:text-xl">⭐</div>
                                                <div>
                                                    <span className="font-bold text-lg">{doctor.rating}</span>
                                                    <span className="text-gray-500 text-sm ml-1">({doctor.reviews})</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="mt-6 text-gray-600 text-sm line-clamp-2">{doctor.bio}</p>

                                    <div className="mt-6 text-emerald-600 text-sm font-medium flex items-center gap-2">
                                        ✅ Available this week
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Booking Panel (Sticky) */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 bg-white border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-8">
                            {!selectedDoctor ? (
                                <div className="text-center py-20 text-gray-400">
                                    <div className="text-6xl mb-6">👩‍⚕️</div>
                                    <div className="text-xl font-medium">Select a doctor to continue</div>
                                </div>
                            ) : (
                                <>
                                    {/* Selected Doctor Summary */}
                                    <div className="flex gap-5 items-center pb-6 border-b border-gray-300">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow">
                                            <Image
                                                src={selectedDoctor.image}
                                                alt={selectedDoctor.name}
                                                width={64}
                                                height={64}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-xl sm:text-2xl">{selectedDoctor.name}</div>
                                            <div className="text-indigo-600">{selectedDoctor.specialty}</div>
                                            <div className="flex items-center gap-1 text-sm mt-1">
                                                ⭐ {selectedDoctor.rating} • {selectedDoctor.reviews} reviews
                                            </div>
                                        </div>
                                    </div>

                                    {/* Date Picker */}
                                    <div className="mt-8">
                                        <div className="text-sm font-semibold text-gray-500 mb-4">SELECT DATE</div>
                                        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide flex-wrap min-w-0">
                                            {dates.map((d, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        setSelectedDate(d.date);
                                                        setSelectedTime("");
                                                    }}
                                                    className={`shrink-0 snap-center w-20 py-4 rounded-2xl text-center transition-all border ${selectedDate === d.date
                                                            ? "bg-indigo-600 text-white border-indigo-600"
                                                            : "bg-white border-gray-200 hover:border-indigo-300"
                                                        }`}
                                                >
                                                    <div className="text-xs opacity-70">{d.display.split(" ")[0]}</div>
                                                    <div className="font-semibold text-base sm:text-lg leading-none mt-1">{d.display.split(" ")[1]} {d.display.split(" ")[2]}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Time Slots */}
                                    {selectedDate && (
                                        <div className="mt-8">
                                            <div className="text-sm font-semibold text-gray-500 mb-4">AVAILABLE TIMES</div>
                                            <div className="grid grid-cols-3 gap-3">
                                                {timeSlots.map((time) => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`py-4 text-sm font-medium rounded-2xl border transition-all ${selectedTime === time
                                                                ? "bg-indigo-600 text-white border-indigo-600"
                                                                : "bg-white border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                                                            }`}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Patient Form */}
                                    {selectedTime && (
                                        <form onSubmit={handleBook} className="mt-10 space-y-6">
                                                <Input
                                                    label="Full Name"
                                                    type="text"
                                                    required
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    placeholder="Aisha Mohammed"
                                                />

                                            <div className="grid grid-cols-2 gap-4">
                                                    <Input
                                                       label="Email"
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        placeholder="you@email.com"
                                                    />
                                        
                                                    <Input
                                                       label="Phone"
                                                        type="tel"
                                                        required
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        placeholder="+234 803 555 0192"
                                                    />
                                            </div>

                                            <div>
                                                <label className="block text-sm text-gray-500 mb-2">Reason for visit</label>
                                                <textarea
                                                    required
                                                    value={formData.reason}
                                                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                                    rows={3}
                                                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-600 resize-none"
                                                    placeholder="Routine check-up / Chest pain / etc."
                                                />
                                            </div>

                                                <Button
                                                type="submit"
                                                size="md"
                                                className="w-full"
                                            >
                                                Confirm Appointment
                                            </Button>
                                            

                                            <p className="text-center text-xs text-gray-500">
                                                You can cancel or reschedule up to 24 hours before
                                            </p>
                                        </form>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && selectedDoctor && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
                    <div className="bg-white rounded-3xl max-w-md w-full mx-4 p-10 text-center">
                        <div className="text-6xl md:text-7xl mb-6">🎉</div>
                        <h3 className="text-2xl md:text-3xl font-bold">Appointment Confirmed!</h3>
                        <div className="mt-4 text-gray-600">
                            {selectedDoctor.name}<br />
                            {selectedDate} at {selectedTime}
                        </div>
                        <div className="mt-8 text-emerald-600 font-semibold text-sm md:text-base">
                            Booking Reference: {bookingReference}
                        </div>

                        <Button
                            onClick={() => window.location.href = "/"}
                            size="md"
                            className="mt-10 w-full"
                        >
                            Back to Home
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
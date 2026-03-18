'use client';

import Button from "@/components/shared/button";
import { ArrowRightIcon, StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAF7] font-sans">
      {/* Navbar - Modern & Sticky */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 sm:py-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-md">
              🏥
            </div>
            <div className="text-2xl font-bold tracking-tighter text-gray-900">HospitalMS</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-9 text-sm font-medium text-gray-600">
            <Link href="#services" className="hover:text-indigo-600 transition-colors">Services</Link>
            <Link href="#doctors" className="hover:text-indigo-600 transition-colors">Doctors</Link>
            <Link href="#how" className="hover:text-indigo-600 transition-colors">How it Works</Link>
            <Link href="#about" className="hover:text-indigo-600 transition-colors">About</Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button href="/appointment" variant="primary">
              Book Appointment
            </Button>

            <Button href="/login" variant="outline">
              Staff Login
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6h12v12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-300 py-8">
            <div className="flex flex-col items-center gap-8 text-lg">
              <Link href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-600">Services</Link>
              <Link href="#doctors" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-600">Doctors</Link>
              <Link href="#how" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-600">How it Works</Link>
              <Link href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-600">About</Link>

              <div className="w-4/5 flex flex-col gap-4 pt-6">
                <Button
                  href="/appointment"
                  variant="primary"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full"
                >
                  Book Appointment
                </Button>

                <Button
                  href="/login"
                  variant="outline"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full"
                >
                  Staff Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO - Super Cool */}
      <section className="relative pt-14 sm:pt-20 pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 md:space-y-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white rounded-full shadow text-xs md:text-sm font-medium text-emerald-700">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              OPEN 24/7 IN ABUJA
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-none tracking-tighter">
              Healthcare,<br />
              <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">reimagined.</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 max-w-lg">
              Book top doctors instantly. Get quality care without the hassle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 ">
              <Button
                href="/appointment"
                variant="primary"
                className="flex items-center justify-center"
              >
                Book Now
                <ArrowRightIcon className="w-4 h-4 inline-block ml-2" />
              </Button>

              <Button
                href="#how"
                variant="outline"
              >
                Watch 45s Video
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm pt-6">
              <div className="flex -space-x-4">
                {[64, 91, 1015].map((id) => (
                  <div key={id} className="w-9 h-9 rounded-2xl border-2 border-white overflow-hidden shadow">
                    <Image src={`https://picsum.photos/id/${id}/64/64`} alt="patient" width={36} height={36} className="object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="font-semibold text-2xl text-emerald-600">12,459+</div>
                <div className="text-xs text-gray-500">Happy patients in Abuja</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-linear-gradient(to-br, from-indigo-100 to-purple-100 rounded-4xl md:rounded-[3rem] -rotate-6" />
            <Image
              src="https://picsum.photos/id/1015/900/620"
              alt="Doctor consulting patient"
              width={900}
              height={620}
              className="relative rounded-4xl md:rounded-[3rem] shadow-2xl object-cover"
              priority
            />
            {/* Floating card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-4 md:p-6 rounded-3xl shadow-xl sm:shadow-2xl max-w-60">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-3xl sm:text-4xl md:text-5xl"><StarIcon color="gold" fill="gold" width={35} /></div>
                <div>
                  <div className=" text-sm sm:text-base font-semibold">4.98/5</div>
                  <div className="text-xs text-gray-500">from 2,341 reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="bg-white py-6 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-16 gap-y-4 text-sm text-gray-500 items-center">
          <div>✅ Licensed by MDCN</div>
          <div>✅ NHIA Accredited</div>
          <div>✅ 300+ Verified Doctors</div>
          <div>✅ Secure Health Records</div>
        </div>
      </div>

      {/* FEATURES */}
      <section id="services" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-purple-600 font-semibold tracking-widest text-sm">NEXT-GEN HEALTHCARE</div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-3">Everything you need in one app</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: 40, title: "Instant Booking", desc: "See real-time availability and book in under 30 seconds." },
              { id: 100, title: "Top Specialists", desc: "Cardiologists, pediatricians, gynecologists & more — all verified." },
              { id: 0, title: "Digital Records", desc: "Your full medical history, prescriptions & lab results in your pocket." },
            ].map((item, i) => (
              <div key={i} className="group bg-[#F9FAF7] border border-transparent hover:border-indigo-200 p-10 rounded-3xl transition-all hover:-translate-y-2">
                <div className="mb-8 group-hover:scale-110 transition-transform">
                  <Image
                    src={`https://picsum.photos/id/${item.id}/64/64`}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="object-cover rounded-xl"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold">{item.title}</h3>
                <p className="text-sm md:text-base mt-4 text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="relative py-28 text-white text-center overflow-hidden"
        style={{
           backgroundImage: `
      linear-gradient(
        to bottom right,
        rgba(67, 56, 202, 0.75),
        rgba(126, 34, 206, 0.9)
      ),
      url(https://picsum.photos/id/1011/1600/900)
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative max-w-2xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold leading-tight">
            Ready for stress-free healthcare?
          </h2>

          <p className="mt-6 text-xl text-indigo-100">
            Join thousands of Abuja residents who now book smarter.
          </p>

          <div className="pt-10">
            <Button href="/appointment">
              Book Appointment in 30 seconds
              <ArrowRightIcon className="w-4 h-4 inline-block ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 text-white text-3xl font-bold tracking-tighter">
              🏥 HospitalMS
            </div>
            <p className="mt-6 max-w-md">
              Nigeria’s smartest hospital management platform.<br />
              Quality care. Zero stress.
            </p>
            <div className="mt-10 flex gap-6">
              <a href="#" className="hover:text-white">𝕏</a>
              <a href="#" className="hover:text-white">📘</a>
              <a href="#" className="hover:text-white">📷</a>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="font-medium text-white mb-6">Company</div>
            <div className="space-y-3 text-sm">
              <Link href="#" className="block hover:text-white">About Us</Link>
              <Link href="#" className="block hover:text-white">Careers</Link>
              <Link href="#" className="block hover:text-white">Press</Link>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="font-medium text-white mb-6">Contact</div>
            <div className="text-sm space-y-3">
              <div>📍 45 Garki Road, Abuja, Nigeria</div>
              <div>☎️ +234 809 888 0199</div>
              <div>✉️ hello@hospitalms.ng</div>
              <div className="pt-4 text-emerald-400 font-medium">Emergency: +234 803 111 0199</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} HospitalMS Nigeria. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
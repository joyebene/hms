"use client";

import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import Select from "@/components/shared/select";
import { useRouter } from "next/navigation";
 import { useState } from "react"; 
  
 const roles = ["ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST", "PATIENT", "BILLING"]; 
  
 export default function LoginPage() { 
   const router = useRouter();
   const [email, setEmail] = useState(""); 
   const [password, setPassword] = useState(""); 
   const [role, setRole] = useState(""); 
  
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     if (!role) {
       alert("Please select a role to continue.");
       return;
     }
     // Since we are not using a backend, we'll just redirect based on the role
     localStorage.setItem("role", role);
     const dashboardPath = "/dashboard";
     router.push(dashboardPath);
   };
  
   return (
    <div className="relative min-h-screen flex items-center justify-center px-6 text-[#111111]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://picsum.photos/1920/1080?hospital)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-900/70 via-blue-900/70 to-black/70" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 sm:p-8 ">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            🏥 <br /> HospitalMS
          </h1>
          <p className="text-gray-800 mt-4">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="doctor@hospital.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={roles}
            placeholder="Select your role"
            required
          />

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded border-gray-300" />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Hospital Management System
        </p>
      </div>
    </div>
  );
}
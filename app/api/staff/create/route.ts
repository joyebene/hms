
import User from "@/app/models/User";
import { NextResponse } from "next/server";

import { connectDB } from "../../utils/db";
import { requireRole } from "../../utils/role";

async function getUserFromRequest(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return null;

  // Your verifyAccessToken should return { id, role }
  const payload = { id: "adminId", role: "ADMIN" }; // placeholder
  return payload;
}

export async function POST(req: Request) {
  await connectDB();

  const currentUser = await getUserFromRequest(req);
  if (!currentUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    requireRole(currentUser, ["ADMIN"]); // Only Admin can create staff

    const body = await req.json();
    const { name, email, role } = body;

    if (!name || !email || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Check if role is valid
    const validRoles = ["DOCTOR", "NURSE", "RECEPTIONIST"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // Create staff with default password
    const newUser = await User.create({
      name,
      email,
      role,
      password: "87654321",
    });

    return NextResponse.json({ message: "Staff created", user: newUser });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Server error" }, { status: 500 });
  }
}
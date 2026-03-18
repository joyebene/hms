import { connectDB } from "@/app/api/utils/db";
import User from "@/app/models/User";

import { NextResponse } from "next/server";
import { signAccessToken, signRefreshToken } from "../../utils/auth";

export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse request body
    const body = await req.json();
    const email = body.email?.toLowerCase().trim();
    const password = body.password;
    const role = body.role?.toUpperCase().trim(); // ADMIN, DOCTOR, NURSE, RECEPTIONIST

    if (!email || !password || !role) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
    }

    // Find user by email and role
    const user = await User.findOne({ email, role });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Check plain text password
    if (password !== user.password) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT tokens
    const accessToken = signAccessToken({ id: user._id.toString(), role: user.role });
    const refreshToken = signRefreshToken({ id: user._id.toString(), role: user.role });

    // Return response
    const response = NextResponse.json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Store refresh token securely in HTTP-only cookie
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
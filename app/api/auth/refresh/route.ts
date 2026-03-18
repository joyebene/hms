import { cookies } from "next/headers";

import User from "@/app/models/User";

import { NextResponse } from "next/server";
import { connectDB } from "../../utils/db";
import { signAccessToken, verifyRefreshToken } from "../../utils/auth";

export async function POST() {
    await connectDB();

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
        return NextResponse.json({ message: "No refresh token" }, { status: 401 });
    }

    try {
        const decoded = verifyRefreshToken(refreshToken);

        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return NextResponse.json({ message: "Invalid refresh token" }, { status: 403 });
        }

        const newAccessToken = signAccessToken({ id: user._id.toString(), role: user.role });

        return NextResponse.json({ accessToken: newAccessToken });
    } catch {
        return NextResponse.json({ message: "Refresh token expired" }, { status: 403 });
    }
}

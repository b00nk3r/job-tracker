import { NextResponse } from "next/server";
import { createSession, verifyUser } from "@/lib/store"; // was createUser

const cookieOpts = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const user = await verifyUser(email, password); // was createUser
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const sid = createSession(user.email);
    const res = NextResponse.json({ ok: true, user: { email: user.email } }, { status: 200 });
    res.cookies.set("sid", sid, cookieOpts);
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
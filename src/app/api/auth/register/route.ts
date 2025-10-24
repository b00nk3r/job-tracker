import { NextResponse } from "next/server";
import { createSession, createUser } from "@/lib/store";

const cookieOpts = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const user = await createUser(email, password);
    const sid = createSession(user.email);

    const res = NextResponse.json({ ok: true, user: { email: user.email } }, { status: 201 });
    res.cookies.set("sid", sid, cookieOpts);
    return res;
  } catch (e: any) {
    if (e?.message === "UserExists") {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

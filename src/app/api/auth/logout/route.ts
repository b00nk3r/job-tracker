import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/store";

export async function POST(request: Request) {
  const sid = (await (request.headers.get("cookie") ?? ""))
    .split(";")
    .map((s) => s.trim())
    .find((c) => c.startsWith("sid="))
    ?.split("=")[1];

  deleteSession(sid);

  const res = NextResponse.json({ ok: true });
  res.cookies.set("sid", "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  return res;
}
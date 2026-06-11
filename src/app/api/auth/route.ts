import { NextRequest, NextResponse } from "next/server";

const PASSWORD = "2026herewego!";
const COOKIE = "eab_auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password === PASSWORD) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE, PASSWORD, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 30 });
    return res;
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}

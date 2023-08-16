import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();

  const token = cookieStore.get("token");

  if (token) {
    return NextResponse.json({ autherized: true });
  }

  return NextResponse.json({ autherized: false });
}

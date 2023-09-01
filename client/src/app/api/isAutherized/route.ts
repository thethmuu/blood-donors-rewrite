import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwtDecode, { JwtPayload } from "jwt-decode";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();

  const token = cookieStore.get("token");

  if (token) {
    const decode = jwtDecode<JwtPayload>(token.value as string);

    if (decode.exp && decode.exp * 1000 <= Date.now()) {
      cookies().delete("token");
      NextResponse.redirect(new URL("/login", req.url));
      return NextResponse.json({ autherized: false });
    }

    return NextResponse.json({ autherized: true });
  }

  return NextResponse.json({ autherized: false });
}

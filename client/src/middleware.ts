import { NextRequest, NextResponse } from "next/server";
import jwtDecode, { JwtPayload } from "jwt-decode";

export default async function middleware(req: NextRequest) {
  let token = req.cookies.get("token");

  const path = req.nextUrl.pathname;

  if (path === "/") {
    return NextResponse.next();
  }

  if (!token && (path.startsWith("/donors") || path.startsWith("/donations"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && path === "/login") {
    return NextResponse.redirect(new URL("/donors", req.url));
  }

  if (token) {
    const decode = jwtDecode<JwtPayload>(token.value as string);

    if (decode.exp && decode.exp * 1000 <= Date.now()) {
      req.cookies.delete("token");

      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/donors/:path*", "/donations/:path*"],
};

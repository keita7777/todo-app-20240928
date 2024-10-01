import { NextResponse } from "next/server";

export function middleware(request: Request) {
  return NextResponse.redirect(new URL("/signup", request.url));
}

export const config = {
  matcher: ["/todos/:path*", "/profile/:path*"],
};

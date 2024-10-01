import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(request: Request) {
  const session = auth();
  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/todos/:path*", "/profile/:path*"],
};

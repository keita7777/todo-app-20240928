import { NextResponse } from "next/server";
import { auth } from "./auth";

// sessionが無い状態で/todos、/profileにアクセスすると/signinにリダイレクトさせる

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

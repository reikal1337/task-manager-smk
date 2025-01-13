import { NextResponse } from "next/server";
import { auth } from "../auth";

const protectedRoutes = ["/protected"];

export default async function middleware(req) {
  const session = await auth();

  const isRouteProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!session && isRouteProtected) {
    const absoluteURL = new URL("/", req.nextUrl.origin);

    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

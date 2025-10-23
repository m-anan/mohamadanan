import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ["/dashboard"];

const authMiddleware = withAuth(
  async function middleware(req: any) {
    const pathname = req.nextUrl.pathname;

    // If accessing a protected page and not authenticated, redirect to login
    if (req.nextUrl.pathname.startsWith("/dashboard") && !req.nextauth.token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to login page
        if (pathname === "/login") {
          return true;
        }

        // Allow access to protected pages only if authenticated
        if (protectedPages.includes(pathname)) {
          return !!token;
        }

        // Allow access to other pages
        return true;
      },
    },
  }
);

export default function middleware(req: NextRequest) {
  const isProtectedPage = req.nextUrl.pathname.startsWith("/dashboard");

  if (!isProtectedPage) {
    return req;
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next", and all files with an extension (e.g., favicon.ico)
  matcher: ["/dashboard/:path*"],
};

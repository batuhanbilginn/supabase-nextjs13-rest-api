import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { Database } from "@/types/supabase";
import { NextRequest } from "next/server";

const allowedOrigins =
  process.env.VERCEL_ENV === "production"
    ? ["https://yoururl.com"]
    : process.env.VERCEL_ENV === "preview"
    ? ["htpps://preview.yoururl.com"]
    : ["http://localhost:3000"];

const isAllowed = (origin: string) => allowedOrigins.includes(origin);

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });
  const origin = req.headers.get("origin");

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If it's an API Route, check the CORS origin
  if (origin && pathname.startsWith("/api") && !isAllowed(origin)) {
    return new NextResponse(null, { status: 401, statusText: "Unauthorized" });
  }

  // If it's an API Route and User is not logged in, return 401
  /*   if (pathname.startsWith("/api") && !session) {
    return NextResponse.json(
      { message: "You are not authorised to make this request!" },
      { status: 401 }
    );
  } */

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

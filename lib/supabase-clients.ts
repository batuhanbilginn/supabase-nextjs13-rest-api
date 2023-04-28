import {
  createRouteHandlerSupabaseClient,
  createServerComponentSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

// We will use this client in Server Components
export const createServerSupabase = () => {
  return createServerComponentSupabaseClient({ headers, cookies });
};

// We will use this client in Route Handlers
export const createRouteHandlerSupabase = () => {
  return createRouteHandlerSupabaseClient({ headers, cookies });
};

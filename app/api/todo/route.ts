import { createRouteHandlerSupabase } from "@/lib/supabase-clients";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { task } = await request.json();

  if (!task || typeof task !== "string") {
    return NextResponse.json(
      {
        message: "Wrong payload.",
        hint: "May you forgot to pass the task?",
      },
      {
        status: 400,
      }
    );
  }

  // Get Supabase Client
  const supabase = createRouteHandlerSupabase();

  // Check User is logged in
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Rate Limitter
  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "60 s"), // 3 requests per 60 seconds
  });

  const identifier = session?.user.id;
  const { success } = await ratelimit.limit(identifier!!);

  if (!success) {
    return NextResponse.json(
      { message: "You are sending too many requests." },
      { status: 429 }
    );
  }

  // Insert a new todo
  const { data, error } = await supabase
    .from("todos")
    .insert({ task, creator: session?.user.id })
    .select("*");

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function GET(request: Request) {
  // Create Supabase Client
  const supabase = createRouteHandlerSupabase();

  // Get todos
  const { data: todos, error } = await supabase.from("todos").select("*");

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  const origin = request.headers.get("origin");

  return new NextResponse(JSON.stringify(todos), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": origin || "*",
    },
  });
}

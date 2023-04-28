import { createRouteHandlerSupabase } from "@/lib/supabase-clients";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  // Get Supabase Client
  const supabase = createRouteHandlerSupabase();

  // Delete a todo
  const { error } = await supabase.from("todos").delete().match({ id });

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({ message: "Todo deleted." }, { status: 200 });
}

// PATCH
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { status } = await req.json();
  if (!status || typeof status !== "string") {
    return NextResponse.json({ message: "Wrong payload." }, { status: 400 });
  }
  // Create Supabase Client
  const supabase = createRouteHandlerSupabase();

  // Update a todo
  const { data, error } = await supabase
    .from("todos")
    .update({ status })
    .match({ id })
    .select("*");

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

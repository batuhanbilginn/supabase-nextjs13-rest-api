import { Database } from "./supabase";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Todo = Database["public"]["Tables"]["todos"]["Row"];

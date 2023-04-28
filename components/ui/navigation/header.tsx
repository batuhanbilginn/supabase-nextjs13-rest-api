"use client";
import { useSupabase } from "@/app/supabase-provider";

import { Profile } from "@/types/collections";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import { AddNewTodo } from "@/components/todos/add-new-todo";

const Header = () => {
  const { supabase } = useSupabase();
  const [user, setUser] = useState<Profile | null>(null);
  const router = useRouter();

  // Get User
  const getUser = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      setUser(profile);
    }
  }, [supabase]);

  // Logout Handler
  const logoutHandler = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="flex items-center justify-between pb-8 border-b border-b-neutral-200">
      {/* Avatar */}
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user?.avatar_url!!} alt={user?.full_name!!} />
          <AvatarFallback>
            {user?.full_name?.slice(0, 2).toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-lg font-medium">{user?.full_name}</div>
      </div>
      {/* Buttons */}
      <div className="flex items-center gap-4">
        <Button onClick={logoutHandler}>Logout</Button>
        <AddNewTodo />
      </div>
    </div>
  );
};

export default Header;

"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useSupabase } from "../supabase-provider";

const LoginForm = () => {
  const { supabase } = useSupabase();
  const loginHandler = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Button className="flex items-center gap-2" onClick={loginHandler}>
        Login with Github <Github size="12" />
      </Button>
    </div>
  );
};

export default LoginForm;

"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";

interface AuthContextProps {
  session: Session | null;
  user: string | null;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const user = session?.user?.email ?? null;

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

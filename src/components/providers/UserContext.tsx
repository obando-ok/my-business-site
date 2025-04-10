"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";

type UserContextType = {
  email: string | null;
};

const UserContext = createContext<UserContextType>({ email: null });

interface UserContextProviderProps {
  children: React.ReactNode;
  user?: User | null;
}

export const UserContextProvider = ({ children, user }: UserContextProviderProps) => {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState<string | null>(user?.email || null);

  useEffect(() => {
    // If user is already provided (from server components), don't fetch again
    if (user) return;
    
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Failed to fetch session", error);
        return;
      }
      setEmail(data.session?.user?.email ?? null);
    };

    getSession();
  }, [supabase, user]);

  return (
    <UserContext.Provider value={{ email }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

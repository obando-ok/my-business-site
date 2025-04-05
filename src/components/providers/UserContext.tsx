"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type UserContextType = {
  email: string | null;
};

const UserContext = createContext<UserContextType>({ email: null });

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Failed to fetch session", error);
        return;
      }
      setEmail(data.session?.user?.email ?? null);
    };

    getSession();
  }, [supabase]);

  return (
    <UserContext.Provider value={{ email }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

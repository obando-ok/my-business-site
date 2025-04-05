import { ReactNode } from "react";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import SupabaseProvider from "@/components/providers/SupabaseProvider";
import { UserContextProvider } from "@/components/providers/UserContext";
import { ThemeProvider } from "@/components/providers/theme-provider";

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user ?? null;

  console.log("✅ Layout user:", user); // TEMP debug

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SupabaseProvider>
        <UserContextProvider user={user}>
          {children}
        </UserContextProvider>
      </SupabaseProvider>
    </ThemeProvider>
  );
}

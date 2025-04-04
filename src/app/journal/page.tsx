"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import JournalSection from "@/components/layout/JournalSection";  // Corrected import path

export default function JournalPage() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth");
      } else {
        setSession(session);
      }
    };

    fetchSession();
  }, [router]);

  if (!session) {
    return null; // Show a loader or similar until session is loaded
  }

  return (
    <div className="py-10 px-4">
      <JournalSection />
    </div>
  );
}

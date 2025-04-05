"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useUserContext } from "@/components/providers/UserContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function UserDropdown() {
  const { email } = useUserContext();
  const supabase = createClientComponentClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    window.location.href = "/auth";
  };

  const initials = email?.[0]?.toUpperCase() || "U";

  return (
    <div className="relative z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-9 w-9 cursor-pointer border border-border shadow-sm hover:ring-2 hover:ring-orange-500 transition-all">
            <AvatarFallback className="text-sm font-semibold">
              {mounted && email ? initials : "…"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="absolute right-0 mt-2 w-56 rounded-xl border bg-popover p-2 text-popover-foreground shadow-xl z-50"
        >
          <DropdownMenuLabel className="text-xs text-muted-foreground px-2 pb-1 pt-0.5">
            Signed in as
          </DropdownMenuLabel>

          <DropdownMenuItem disabled className="px-2 py-1.5 text-sm truncate opacity-80">
            {!mounted ? "Loading..." : email || "Not logged in"}
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1 bg-border" />

          <DropdownMenuItem
            onClick={handleLogout}
            className="gap-2 px-2 py-1.5 text-red-500 hover:text-red-600 hover:bg-destructive/10 cursor-pointer text-sm rounded-md"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

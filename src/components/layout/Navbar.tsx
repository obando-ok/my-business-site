"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/SupabaseProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import UserDropdown from "@/components/layout/UserDropdown";

export default function Navbar() {
  const pathname = usePathname();
  const { session } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold">
          MAiN
        </Link>

        <nav className="hidden gap-4 sm:flex">
          <Link
            href="#about"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="/journal"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Journal
          </Link>
          <Link
            href="/evaluation"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Evaluation
          </Link>
        </nav>

        <div className="hidden sm:flex items-center gap-2">
          {session ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/profile/mission">Mission Control</Link>
              </Button>
              <UserDropdown />
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/auth">Begin</Link>
            </Button>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 py-6">
              <Link href="#about" className="text-sm font-medium">
                About
              </Link>
              <Link href="#features" className="text-sm font-medium">
                Features
              </Link>
              <Link href="/journal" className="text-sm font-medium">
                Journal
              </Link>
              <Link href="/evaluation" className="text-sm font-medium">
                Evaluation
              </Link>
              {session ? (
                <Link href="/profile/mission" className="text-sm font-medium">
                  Mission Control
                </Link>
              ) : (
                <Link href="/auth" className="text-sm font-medium">
                  Begin
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
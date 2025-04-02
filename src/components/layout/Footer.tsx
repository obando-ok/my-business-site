// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="border-t border-border bg-background py-10 px-6 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} YourBusiness. All rights reserved.</div>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="#features" className="hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">
            Privacy
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle Theme"
            className="hover:text-primary transition-colors"
          >
            {theme === "dark" ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>
        </nav>
      </div>
    </footer>
  );
}
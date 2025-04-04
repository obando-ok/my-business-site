"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="group transition-all"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <span
        className="inline-block transition-transform duration-300 ease-in-out group-hover:rotate-180 text-foreground"
      >
        {isDark ? (
          // Sun Icon (Light Mode)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36 6.36l-1.42-1.42M6.05 6.05l-1.42-1.42m12.02 0l1.42 1.42M6.05 17.95l1.42-1.42M12 8a4 4 0 100 8 4 4 0 000-8z"
            />
          </svg>
        ) : (
          // Moon Icon (Dark Mode)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            />
          </svg>
        )}
      </span>
    </Button>
  );
}

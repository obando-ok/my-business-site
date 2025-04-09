"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/SupabaseProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, BookText, ClipboardList, Flame, Dumbbell, Trophy, LogIn, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const { session } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/about", label: "About", icon: <Trophy size={18} className="text-amber-500" /> },
    { href: "/self-mastery", label: "Information", icon: <Dumbbell size={18} className="text-blue-500" /> },
    { href: "/journal", label: "Journal", icon: <BookText size={18} className="text-emerald-500" /> },
    { href: "/evaluation", label: "Evaluation", icon: <ClipboardList size={18} className="text-purple-500" /> },
  ];

  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-0 z-50 w-full border-b bg-[#0a0a0a]/95 backdrop-blur-xl transition-all duration-300 ${
        isScrolled ? "border-b-neutral-800 shadow-xl" : "border-transparent"
      }`}
    >
      <div className="container px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
        {/* Branding */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-neutral-100 to-neutral-400 p-2 rounded-lg"
          >
            <Rocket className="h-6 w-6 text-neutral-900" />
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            MAiN
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative group flex items-center gap-2 px-1"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-1.5 bg-neutral-800 rounded-lg"
              >
                {link.icon}
              </motion.div>
              
              <span className="text-sm font-semibold text-neutral-300 group-hover:text-white transition-colors">
                {link.label}
              </span>

              {isActive(link.href) && (
                <motion.div
                  className="absolute -bottom-3 left-0 w-full h-1 bg-neutral-200 rounded-t-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-4">
          {session ? (
            <Button 
              asChild
              variant="premium"
              className="group bg-gradient-to-br from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800 border border-neutral-700 rounded-xl"
            >
              <Link href="/profile/mission" className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Mission Control
                </span>
                <Rocket className="h-4 w-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl px-6 py-3 font-bold text-neutral-900 shadow-lg shadow-amber-500/20"
            >
              <Link href="/auth" className="flex items-center gap-2">
                <Flame className="h-5 w-5" />
                Begin Journey
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="sm:hidden hover:bg-neutral-800"
            >
              <Menu className="h-6 w-6 text-neutral-300" />
            </Button>
          </SheetTrigger>
          
          <SheetContent side="right" className="w-[300px] bg-neutral-900 border-l border-neutral-800">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col h-full py-8"
            >
              <div className="flex-1 space-y-8">
                {/* Navigation Links */}
                <div className="space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3 text-neutral-300 hover:bg-neutral-800 rounded-xl ${
                        isActive(link.href) ? "bg-neutral-800" : ""
                      }`}
                    >
                      <div className="p-2 bg-neutral-800 rounded-lg">
                        {link.icon}
                      </div>
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  ))}
                </div>

                {/* Auth Section */}
                <div className="border-t border-neutral-800 pt-6">
                  {session ? (
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start gap-3 px-4 py-3 hover:bg-neutral-800"
                    >
                      <Link href="/profile/mission" onClick={() => setMobileOpen(false)}>
                        <Rocket className="h-5 w-5 text-amber-500" />
                        <span className="text-neutral-300">Mission Control</span>
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className="w-full gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-neutral-900 font-bold"
                    >
                      <Link href="/auth" onClick={() => setMobileOpen(false)}>
                        <Flame className="h-5 w-5" />
                        Begin Journey
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
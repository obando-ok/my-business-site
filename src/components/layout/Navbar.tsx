"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/SupabaseProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  Menu, 
  BookText, 
  ClipboardList, 
  Flame, 
  Dumbbell, 
  Trophy, 
  LogIn, 
  Rocket,
  User,
  LogOut,
  ChevronDown,
  Sword,
  Shield,
  Target,
  Compass,
  Brain,
  Scroll,
  BarChart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const { session, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Only run client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { 
      href: "/about", 
      label: "The Mission", 
      icon: <Compass size={18} className="text-amber-500" /> 
    },
    { 
      href: "/self-mastery", 
      label: "The Forge", 
      icon: <Sword size={18} className="text-amber-500" /> 
    },
    { 
      href: "/journal", 
      label: "Battle Journal", 
      icon: <Scroll size={18} className="text-amber-500" /> 
    },
    { 
      href: "/evaluation", 
      label: "War Room", 
      icon: <Target size={18} className="text-amber-500" /> 
    },
    { 
      href: "/analytics", 
      label: "Battle Stats", 
      icon: <BarChart size={18} className="text-amber-500" /> 
    },
  ];

  const isActive = (href: string) => pathname?.startsWith(href);

  const handleSignOut = async () => {
    try {
      await signOut();
      setMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, rotate: 5, transition: { duration: 0.2 } }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  // Don't render anything during SSR to prevent hydration issues
  if (!mounted) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-b-amber-800/30 shadow-lg shadow-black/40" 
          : "bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-b-amber-800/10"
      }`}
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto flex h-20 items-center justify-between">
        {/* Branding */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group"
          aria-label="MAiN - Go to homepage"
        >
          <motion.div
            variants={logoVariants}
            initial="initial"
            whileHover="hover"
            className="bg-gradient-to-br from-amber-500 to-amber-700 p-2.5 rounded-lg shadow-lg"
          >
            <Shield className="h-6 w-6 text-neutral-900" />
          </motion.div>
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent tracking-tight">
            MAiN
          </span>
        </Link>

        {/* Desktop Navigation */}
        <motion.nav 
          className="hidden sm:flex items-center gap-10"
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((link) => (
            <motion.div key={link.href} variants={itemVariants}>
              <Link
                href={link.href}
                className="relative group flex items-center gap-2 px-1"
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 bg-neutral-800/70 rounded-lg transition-colors group-hover:bg-amber-900/30"
                >
                  {link.icon}
                </motion.div>
                
                <span className="text-sm font-medium text-neutral-100 group-hover:text-amber-400 transition-colors">
                  {link.label}
                </span>

                <AnimatePresence>
                  {isActive(link.href) && (
                    <motion.div
                      className="absolute -bottom-3 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 to-amber-700 rounded-t-full"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <ThemeToggle />
          
          {session ? (
            <div className="relative">
              <Button 
                variant="outline"
                className="group bg-gradient-to-br from-neutral-800 to-neutral-900 hover:from-amber-900/50 hover:to-neutral-900 border border-amber-900/50 rounded-xl flex items-center gap-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-semibold">
                  Command Center
                </span>
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.5 }}
                >
                  <Sword className="h-4 w-4 text-amber-500" />
                </motion.div>
                <ChevronDown size={16} className="text-neutral-400 ml-1" />
              </Button>
              
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-neutral-900 border border-amber-900/30 rounded-md shadow-lg shadow-amber-900/10 z-50 overflow-hidden">
                  <div className="py-2 px-4 border-b border-amber-900/30 bg-gradient-to-r from-amber-900/20 to-neutral-900">
                    <p className="text-sm text-amber-500 font-semibold">Battle Station</p>
                  </div>
                  
                  <div className="py-1">
                    <Link 
                      href="/profile/mission" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-300 hover:bg-amber-900/20 hover:text-amber-400 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <User className="h-4 w-4 text-amber-500" />
                      Warrior Profile
                    </Link>
                  </div>
                  
                  <div className="py-1 border-t border-amber-900/30">
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-950/20"
                    >
                      <LogOut className="h-4 w-4" />
                      Retreat
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 rounded-xl px-6 py-3 font-bold text-neutral-900 shadow-lg shadow-amber-500/20"
              >
                <Link href="/auth" className="flex items-center gap-2">
                  <Flame className="h-5 w-5" />
                  Enter The Forge
                </Link>
              </Button>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden flex items-center gap-3">
          <ThemeToggle />
          
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-6 w-6 text-amber-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-neutral-900 border-l border-amber-900/30 w-72 p-0">
              <div className="py-4 px-5 border-b border-amber-900/30 bg-gradient-to-r from-amber-900/20 to-neutral-900">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-700 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-neutral-900" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    Battle Station
                  </span>
                </div>
              </div>
              <div className="py-6 px-4 flex flex-col gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive(link.href) 
                        ? "bg-amber-900/20 text-amber-400" 
                        : "text-neutral-300 hover:bg-neutral-800/50 hover:text-amber-400"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="p-1.5 bg-neutral-800 rounded-lg">
                      {link.icon}
                    </div>
                    <span className="font-medium">{link.label}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-auto py-4 px-4 border-t border-amber-900/30">
                {session ? (
                  <div className="space-y-4">
                    <Link
                      href="/profile/mission"
                      className="flex items-center gap-2 px-4 py-2 text-neutral-300 hover:text-amber-400"
                      onClick={() => setMobileOpen(false)}
                    >
                      <User className="h-4 w-4 text-amber-500" />
                      Warrior Profile
                    </Link>
                    <Button
                      onClick={() => {
                        handleSignOut();
                        setMobileOpen(false);
                      }}
                      variant="destructive"
                      className="w-full justify-start"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Retreat
                    </Button>
                  </div>
                ) : (
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-700"
                  >
                    <Link href="/auth" onClick={() => setMobileOpen(false)}>
                      <LogIn className="h-4 w-4 mr-2" />
                      Enter The Forge
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
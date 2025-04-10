"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Rocket, ChevronUp, Shield, Dumbbell, Trophy, Book } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800/30 bg-gradient-to-b from-background to-neutral-900/90 py-16 px-6 mt-24 relative">
      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={handleBackToTop}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-600 p-3 rounded-full shadow-lg hover:shadow-amber-500/20 transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5 text-neutral-900" />
        </button>
      )}
      
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-neutral-100 to-neutral-400 p-2 rounded-lg">
                <Rocket className="h-5 w-5 text-neutral-900" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                MAiN
              </span>
            </div>
            <p className="text-sm text-neutral-400 max-w-xs">
              Empowering men to build discipline, develop mental fortitude, and forge their strongest legacy.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-800/50 hover:bg-amber-500/20 transition-colors duration-300"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.03 10.03 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-800/50 hover:bg-amber-500/20 transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-800/50 hover:bg-amber-500/20 transition-colors duration-300"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-neutral-100 font-bold mb-4 text-lg">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-amber-500 transition-colors duration-300 text-sm flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-neutral-500" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/self-mastery" className="text-neutral-400 hover:text-amber-500 transition-colors duration-300 text-sm flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-neutral-500" />
                  <span>Self-Mastery</span>
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-neutral-400 hover:text-amber-500 transition-colors duration-300 text-sm flex items-center gap-2">
                  <Book className="w-4 h-4 text-neutral-500" />
                  <span>Journal</span>
                </Link>
              </li>
              <li>
                <Link href="/evaluation" className="text-neutral-400 hover:text-amber-500 transition-colors duration-300 text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-neutral-500" />
                  <span>Evaluation</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-neutral-100 font-bold mb-4 text-lg">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-neutral-400 hover:text-amber-500 transition-colors duration-300 text-sm">
                  Discipline Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-neutral-400 hover:text-amber-500 transition-colors duration-300 text-sm">
                  Self-Mastery Guides
                </Link>
              </li>
              <li>
                <Link href="/brotherhood" className="text-neutral-400 hover:text-amber-500 transition-colors duration-300 text-sm">
                  Join the Brotherhood
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-neutral-400 hover:text-amber-500 transition-colors duration-300 text-sm">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact / Legal */}
          <div>
            <h4 className="text-neutral-100 font-bold mb-4 text-lg">Contact & Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contact@example.com" className="text-neutral-400 hover:text-amber-500 transition-colors duration-300 text-sm">
                  contact@example.com
                </a>
              </li>
              <li>
                <Link href="/privacy" className="text-neutral-400 hover:text-amber-500 transition-colors duration-300 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-400 hover:text-amber-500 transition-colors duration-300 text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-800/30">
          <div className="text-sm text-neutral-500">
            © {year} MAiN. The Forge of Modern Masculinity.
          </div>
          
          <div className="flex items-center gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle Theme"
                className="p-2 rounded-full bg-neutral-800/50 hover:bg-amber-500/20 transition-colors duration-300"
              >
                {theme === "dark" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

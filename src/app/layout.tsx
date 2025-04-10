import "@/styles/globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SupabaseProvider from "@/components/providers/SupabaseProvider";
import { UserContextProvider } from "@/components/providers/UserContext";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const metadata = {
  title: "MAiN | The Forge of Modern Masculinity",
  description: "Build unbreakable discipline, develop mental fortitude, and forge your strongest legacy with our data-driven self-mastery system for men.",
  keywords: [
    "self-mastery", 
    "discipline", 
    "masculine development", 
    "mental fortitude", 
    "habit building", 
    "personal growth", 
    "men's development", 
    "productivity system"
  ],
  authors: [{ name: "MAiN Development Team" }],
  creator: "MAiN",
  publisher: "MAiN Systems",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://main-system.com',
    title: 'MAiN | The Forge of Modern Masculinity',
    description: 'Build unbreakable discipline, develop mental fortitude, and forge your strongest legacy',
    siteName: 'MAiN System',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAiN | The Forge of Modern Masculinity',
    description: 'Build unbreakable discipline, develop mental fortitude, and forge your strongest legacy',
    creator: '@main_system',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user ?? null;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SupabaseProvider>
            <UserContextProvider user={user}>
              <Navbar />
              <main className="pt-20 min-h-screen">
                {children}
              </main>
              <Footer />
            </UserContextProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

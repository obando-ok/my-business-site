import "@/styles/globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SupabaseProvider } from "@/components/providers/SupabaseProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SupabaseProvider>
            <Navbar />
            {children}
            <Footer />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

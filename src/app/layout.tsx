// src/app/layout.tsx
import "@/styles/globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const metadata = {
  title: "Your Business Name",
  description: "Premium web platform inspired by Stripe",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${grotesk.variable} font-sans bg-background text-foreground`}>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer /> {/* ✅ Add this below main content */}
        </ThemeProvider>
      </body>
    </html>
  );
}

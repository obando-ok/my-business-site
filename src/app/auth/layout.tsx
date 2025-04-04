// ✅ src/app/auth/layout.tsx — safe version
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-sans">
      {children}
    </div>
  );
}

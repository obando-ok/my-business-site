"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct for App Router
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleAuth = async () => {
    setMessage("");
    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) return setMessage(error.message);

    if (isLogin) {
      setMessage("Logged in!");
      router.push("/profile"); // ✅ Redirect after login
    } else {
      setMessage("Check your inbox to confirm.");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {isLogin ? "Login to your account" : "Create an account"}
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          {isLogin
            ? "Welcome back. Enter your credentials to continue."
            : "Start your journey with a secure account."}
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm shadow-sm transition-all focus:ring focus:ring-primary/40"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-foreground">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm shadow-sm transition-all focus:ring focus:ring-primary/40"
          />
        </div>
        <Button onClick={handleAuth} className="w-full text-base font-semibold" disabled={loading}>
          {loading ? (isLogin ? "Logging in..." : "Signing up...") : isLogin ? "Login" : "Sign Up"}
        </Button>
        {message && (
          <p className="text-sm text-center text-muted-foreground mt-2">
            {message}
          </p>
        )}
        <p className="text-center text-xs text-muted-foreground mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="underline text-primary"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
}

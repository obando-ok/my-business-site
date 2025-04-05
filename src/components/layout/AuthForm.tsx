"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AuthForm() {
const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
  const { data } = await supabase.auth.getSession(); // <-- force refresh
  if (data.session) {
    setMessage("Logged in!");
    const redirectTo = searchParams.get("redirect") || "/profile/mission";
    router.push(redirectTo);
  } else {
    setMessage("Login succeeded but session not found. Please refresh.");
  }
}

  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) setMessage(error.message);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto bg-muted/10 backdrop-blur-md border border-border shadow-xl rounded-2xl p-8 space-y-6"
    >
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isLogin
            ? "Log in to continue your self-mastery journey."
            : "Start unlocking clarity, discipline, and purpose."}
        </p>
      </div>

      <div>
        <Button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black border border-border hover:bg-gray-100 transition"
        >
          Continue with Google
        </Button>
        <div className="text-xs text-muted-foreground text-center mt-2">or use email</div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAuth();
        }}
        className="space-y-4"
      >
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
            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring focus:ring-primary/40 transition"
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
            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring focus:ring-primary/40 transition"
          />
        </div>

        <Button
          type="submit"
          className="w-full text-base font-semibold"
          disabled={loading}
        >
          {loading
            ? isLogin
              ? "Logging in..."
              : "Signing up..."
            : isLogin
            ? "Login"
            : "Sign Up"}
        </Button>

        {message && (
          <p className="text-sm text-center text-muted-foreground mt-2">
            {message}
          </p>
        )}
      </form>

      <div className="text-center text-sm text-muted-foreground">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary font-semibold underline hover:opacity-90 transition"
        >
          {isLogin ? "Sign Up" : "Log In"}
        </button>
      </div>

      <div className="text-center text-xs text-muted-foreground mt-4 italic">
        “Every day is a new chance to begin again.”
      </div>
    </motion.div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2, ArrowRight, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormState {
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function AuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    // Check if we have a redirect from OAuth
    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      setMessage("Processing login...");
      handleOAuthResponse();
    }
  }, []);

  useEffect(() => {
    // Validate password strength when signing up
    if (!isLogin && formState.password) {
      const strength = calculatePasswordStrength(formState.password);
      setPasswordStrength(strength);
    }
  }, [formState.password, isLogin]);

  const calculatePasswordStrength = (password: string): number => {
    let score = 0;
    if (password.length > 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  };

  const handleOAuthResponse = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        const redirectTo = searchParams?.get("redirect") || "/profile/mission";
        router.push(redirectTo);
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      }
    } catch (error) {
      setMessage("Error processing OAuth login. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formState.password) {
      newErrors.password = "Password is required";
    } else if (!isLogin && formState.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (!isLogin && formState.password !== formState.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async () => {
    setMessage("");
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const { error } = isLogin
        ? await supabase.auth.signInWithPassword({
            email: formState.email,
            password: formState.password
          })
        : await supabase.auth.signUp({
            email: formState.email,
            password: formState.password
          });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (isLogin) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          toast({
            title: "Login successful",
            description: "Welcome back!",
          });
          const redirectTo = searchParams?.get("redirect") || "/profile/mission";
          router.push(redirectTo);
        } else {
          setMessage("Login succeeded but session not found. Please refresh.");
        }
      } else {
        setMessage("Check your email for the confirmation link!");
        toast({
          title: "Account created",
          description: "Please check your email for verification instructions.",
        });
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) setMessage(error.message);
    } catch (error) {
      setMessage("Failed to initialize Google login");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setMessage("");
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
          variant="outline"
          className="w-full bg-background hover:bg-muted transition flex items-center justify-center gap-2"
          disabled={loading}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" className="text-foreground">
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z" fill="currentColor"></path>
            </g>
          </svg>
          Continue with Google
        </Button>
        <div className="text-xs text-muted-foreground text-center mt-2 relative">
          <span className="bg-background/80 px-2">or use email</span>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border -z-10"></div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAuth();
        }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formState.email}
              onChange={handleInputChange}
              autoComplete="email"
              className={cn(
                "pl-9",
                errors.email && "border-destructive focus-visible:ring-destructive"
              )}
              aria-invalid={!!errors.email}
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            {errors.email && (
              <div className="text-xs text-destructive mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.email}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className={errors.password ? "text-destructive" : ""}>
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formState.password}
              onChange={handleInputChange}
              autoComplete={isLogin ? "current-password" : "new-password"}
              className={cn(
                "pl-9 pr-10",
                errors.password && "border-destructive focus-visible:ring-destructive"
              )}
              aria-invalid={!!errors.password}
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
            {errors.password && (
              <div className="text-xs text-destructive mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.password}
              </div>
            )}
          </div>
          {!isLogin && passwordStrength > 0 && (
            <div className="space-y-1 pt-1">
              <div className="flex gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors",
                      i < passwordStrength 
                        ? passwordStrength === 1 
                          ? "bg-red-500" 
                          : passwordStrength === 2 
                            ? "bg-orange-500" 
                            : passwordStrength === 3 
                              ? "bg-yellow-500" 
                              : "bg-green-500"
                        : "bg-border"
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {passwordStrength === 0 && "Enter a password"}
                {passwordStrength === 1 && "Weak password"}
                {passwordStrength === 2 && "Fair password"}
                {passwordStrength === 3 && "Good password"}
                {passwordStrength === 4 && "Strong password"}
              </p>
            </div>
          )}
        </div>

        <AnimatePresence>
          {!isLogin && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 overflow-hidden"
            >
              <Label
                htmlFor="confirmPassword"
                className={errors.confirmPassword ? "text-destructive" : ""}
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formState.confirmPassword}
                  onChange={handleInputChange}
                  className={cn(
                    "pl-9",
                    errors.confirmPassword &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                  aria-invalid={!!errors.confirmPassword}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                {errors.confirmPassword && (
                  <div className="text-xs text-destructive mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          className="w-full text-base font-semibold flex items-center justify-center gap-1.5 h-11"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {isLogin ? "Logging in..." : "Creating account..."}
            </>
          ) : (
            <>
              {isLogin ? (
                <>
                  <LogIn className="h-4 w-4" />
                  Login
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </>
          )}
        </Button>

        {message && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "text-sm text-center mt-2 px-3 py-2 rounded-md",
              message.includes("success") || message.includes("Check your email")
                ? "bg-green-500/10 text-green-500 border border-green-500/20"
                : "bg-destructive/10 text-destructive border border-destructive/20"
            )}
          >
            {message}
          </motion.p>
        )}
      </form>

      <div className="text-center text-sm">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={toggleMode}
          className="text-primary font-semibold hover:underline transition"
        >
          {isLogin ? "Sign Up" : "Log In"}
        </button>
      </div>

      <div className="text-center text-xs text-muted-foreground mt-4 italic border-t border-border pt-4">
        "Every day is a new chance to begin again."
      </div>
    </motion.div>
  );
}

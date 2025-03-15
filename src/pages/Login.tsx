
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, Lock, ArrowRight, User, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login - replace with actual authentication
    setTimeout(() => {
      setLoading(false);
      if (email && password) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Please enter both email and password");
      }
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background to-background via-secondary/50">
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="space-y-6">
              <div>
                <h2 className="mt-2 text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Welcome back
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Sign in to continue to your financial dashboard
                </p>
              </div>

              <Card className="border border-border/50 shadow-lg">
                <CardContent className="pt-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block text-sm text-muted-foreground"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="text-sm">
                        <Link
                          to="#"
                          className="font-medium text-primary hover:text-primary/80"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="ai-chat-button w-full"
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Sign in"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <div className="mt-4 text-center text-sm">
                      <span className="text-muted-foreground">
                        Don't have an account?{" "}
                      </span>
                      <Link
                        to="/register"
                        className="font-medium text-primary hover:text-primary/80"
                      >
                        Register now
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="relative hidden flex-1 lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-background to-secondary/30">
            <div className="flex h-full flex-col items-center justify-center p-12">
              <Card className="glass-card max-w-md w-full shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Take control of your finances
                  </CardTitle>
                  <CardDescription>
                    Track your expenses, manage debts, and achieve your financial goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Track all your expenses in one place</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Smart debt management strategies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Personalized investment recommendations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Set and monitor financial goals</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Mail, Lock, User, ArrowRight } from "lucide-react";
import authBg from "@/assets/auth-bg.jpg";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await signup(name, email, password);
      navigate("/role-selection");
    } catch (err: any) {
      setError(err?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        <img src={authBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 p-12 max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="gradient-accent p-3 rounded-xl">
              <GraduationCap className="h-8 w-8 text-accent-foreground" />
            </div>
            <span className="text-3xl font-heading font-bold text-primary-foreground">AcadVault</span>
          </div>
          <h1 className="text-4xl font-heading font-bold text-primary-foreground mb-4 leading-tight">
            Join the Future of{" "}
            <span className="text-gradient-accent">Academic Management</span>
          </h1>
          <p className="text-primary-foreground/70 text-lg font-body">
            Create your account and start managing academic records with ease and security.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="gradient-accent p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-accent-foreground" />
            </div>
            <span className="text-2xl font-heading font-bold text-foreground">AcadVault</span>
          </div>

          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Create Account</h2>
          <p className="text-muted-foreground mb-8">Get started with AcadVault</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="pl-10 h-12 bg-secondary" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@institution.edu" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12 bg-secondary" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-12 bg-secondary" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 h-12 bg-secondary" required />
              </div>
            </div>
            <Button type="submit" className="w-full h-12 gradient-accent text-accent-foreground font-semibold text-base hover:opacity-90 transition-opacity">
              Create Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {/* Error message */}
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
              {error}
            </div>
          )}

          <p className="text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-accent font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

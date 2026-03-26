import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"participant" | "organizer">("participant");
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    navigate(role === "organizer" ? "/organizer" : "/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/8 rounded-full blur-3xl" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 w-full max-w-md relative z-10">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-display text-2xl font-bold gradient-text">HackConnect</span>
        </div>
        <h2 className="font-display text-xl font-semibold text-center mb-6">Create Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-muted border border-glass-border text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="Alex Chen" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-muted border border-glass-border text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="you@example.com" />
          </div>
          <div className="relative">
            <label className="text-sm text-muted-foreground mb-1 block">Password</label>
            <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-muted border border-glass-border text-foreground focus:outline-none focus:border-primary transition-colors pr-10" placeholder="••••••••" />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-9 text-muted-foreground hover:text-foreground">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Role</label>
            <div className="flex gap-3">
              {(["participant", "organizer"] as const).map(r => (
                <button key={r} type="button" onClick={() => setRole(r)} className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-all ${role === r ? "border-primary bg-primary/10 text-primary" : "border-glass-border bg-muted text-muted-foreground hover:border-primary/30"}`}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="gradient-btn w-full">Create Account</button>
        </form>
        <p className="text-sm text-muted-foreground text-center mt-6">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;

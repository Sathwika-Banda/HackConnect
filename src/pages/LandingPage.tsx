import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Users, Trophy, BarChart3, Bell, Briefcase, Zap, ArrowRight, CheckCircle, Star, Sparkles, Target, Globe, MessageSquare } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Matchmaking", desc: "Smart algorithms match you with ideal teammates based on skills, experience, and goals." },
  { icon: Users, title: "Skill-Based Team Formation", desc: "Build balanced teams with complementary skills for maximum hackathon impact." },
  { icon: Trophy, title: "Hackathon Listings", desc: "Discover and register for hackathons across themes, locations, and prize pools." },
  { icon: BarChart3, title: "Team Collaboration Dashboard", desc: "Manage tasks, share files, and communicate all in one place." },
  { icon: Bell, title: "Notifications & Alerts", desc: "Stay updated on invitations, deadlines, and teammate suggestions." },
  { icon: Briefcase, title: "Organizer Analytics", desc: "Track participation, skill distribution, and team balance with rich analytics." },
  { icon: Zap, title: "Portfolio Integration", desc: "Showcase your GitHub, LinkedIn, and project portfolio to potential teammates." },
  { icon: Globe, title: "Post-Hackathon Collaboration", desc: "Continue working with your team even after the hackathon ends." },
];

const steps = [
  { num: "01", title: "Create Profile", desc: "Set up your profile with skills, experience, and portfolio links." },
  { num: "02", title: "Discover Hackathons", desc: "Browse and register for hackathons that match your interests." },
  { num: "03", title: "AI Suggests Teammates", desc: "Our AI analyzes skills to find your perfect team match." },
  { num: "04", title: "Form Team & Build", desc: "Collaborate with your team using built-in tools and win." },
];

const comparison = [
  { feature: "AI-Powered Matching", devpost: false, hackconnect: true },
  { feature: "Skill-Based Teams", devpost: false, hackconnect: true },
  { feature: "Built-in Team Chat", devpost: false, hackconnect: true },
  { feature: "Task Management", devpost: false, hackconnect: true },
  { feature: "Organizer Analytics", devpost: false, hackconnect: true },
  { feature: "Hackathon Listings", devpost: true, hackconnect: true },
  { feature: "Project Submission", devpost: true, hackconnect: true },
  { feature: "Portfolio Integration", devpost: true, hackconnect: true },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-glass-border backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold gradient-text">HackConnect</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="nav-link text-sm">Features</a>
            <a href="#how-it-works" className="nav-link text-sm">How It Works</a>
            <Link to="/hackathons" className="nav-link text-sm">Hackathons</Link>
            <a href="#compare" className="nav-link text-sm">Compare</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/login")} className="nav-link text-sm font-medium">Log In</button>
            <button onClick={() => navigate("/signup")} className="gradient-btn text-sm !py-2 !px-4">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-glow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm mb-8">
              <Sparkles className="h-4 w-4" />
              AI-Powered Team Formation
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Intelligent Collaboration{" "}
              <span className="gradient-text">for Hackathons</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Find your perfect teammates using AI-powered matchmaking. Build balanced teams, collaborate seamlessly, and win hackathons together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate("/signup")} className="gradient-btn text-base flex items-center justify-center gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => navigate("/hackathons")} className="gradient-btn-outline text-base">
                Browse Hackathons
              </button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-muted-foreground text-sm">
              <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> 10,000+ Users</div>
              <div className="flex items-center gap-2"><Trophy className="h-4 w-4 text-primary" /> 500+ Hackathons</div>
              <div className="flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> 2,000+ Teams</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to dominate your next hackathon.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover p-6 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">Four simple steps to hackathon success.</p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-6 text-center relative"
              >
                <span className="font-display text-5xl font-bold gradient-text opacity-30">{s.num}</span>
                <h3 className="font-display font-semibold text-lg mt-2 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Why HackConnect?</h2>
            <p className="text-muted-foreground">See how we compare to traditional platforms.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto glass-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-glass-border">
                  <th className="p-4 text-left text-sm font-display">Feature</th>
                  <th className="p-4 text-center text-sm font-display text-muted-foreground">Devpost</th>
                  <th className="p-4 text-center text-sm font-display gradient-text">HackConnect</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-glass-border/50 last:border-0">
                    <td className="p-4 text-sm">{row.feature}</td>
                    <td className="p-4 text-center">
                      {row.devpost ? <CheckCircle className="h-5 w-5 text-muted-foreground mx-auto" /> : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-glass-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-display font-bold gradient-text">HackConnect</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The intelligent collaboration platform for hackathon participants.
            </p>
            <p className="text-xs text-muted-foreground">© 2025 HackConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

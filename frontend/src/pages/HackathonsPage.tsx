import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Calendar, Trophy, Users as UsersIcon } from "lucide-react";
import { hackathons } from "@/data/mockData";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";

const themes = ["All", "Artificial Intelligence", "Financial Technology", "Healthcare", "Sustainability", "Decentralization"];

const HackathonsPage = () => {
  const [search, setSearch] = useState("");
  const [themeFilter, setThemeFilter] = useState("All");
  const { isLoggedIn } = useAuth();

  const filtered = hackathons.filter(h => {
    const matchSearch = h.title.toLowerCase().includes(search.toLowerCase());
    const matchTheme = themeFilter === "All" || h.theme === themeFilter;
    return matchSearch && matchTheme;
  });

  const content = (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold mb-1">Hackathon Listings</h1>
        <p className="text-muted-foreground text-sm">Discover and register for hackathons worldwide.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search hackathons..." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-glass-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {themes.map(t => (
            <button key={t} onClick={() => setThemeFilter(t)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${themeFilter === t ? "bg-primary/10 text-primary border border-primary/30" : "bg-muted text-muted-foreground border border-glass-border hover:border-primary/20"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((h, i) => (
          <motion.div key={h.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card-hover p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">{h.organizer}</span>
            </div>
            <h3 className="font-display text-lg font-semibold mb-1">{h.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{h.description}</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {h.tags.map(t => <span key={t} className="badge-theme">{t}</span>)}
            </div>
            <div className="mt-auto space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {h.date}</span>
                <span className="flex items-center gap-1"><UsersIcon className="h-3 w-3" /> {h.participants}</span>
              </div>
              <div className="flex justify-between">
                <span>Deadline: {h.deadline}</span>
                <span className="text-primary font-semibold">{h.prize}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="gradient-btn text-xs !py-2 flex-1">Register</button>
              <button className="gradient-btn-outline text-xs !py-2 flex-1">Details</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return isLoggedIn ? <DashboardLayout>{content}</DashboardLayout> : (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-glass-border backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold gradient-text">HackConnect</span>
          </a>
        </div>
      </nav>
      <div className="container mx-auto px-6 pt-24 pb-12">{content}</div>
    </div>
  );
};

export default HackathonsPage;

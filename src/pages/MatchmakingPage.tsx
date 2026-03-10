import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Search, Filter } from "lucide-react";
import { users, currentUser } from "@/data/mockData";
import DashboardLayout from "@/components/DashboardLayout";

const skillFilters = ["All", "React", "Python", "ML", "Node.js", "UI/UX", "Blockchain", "Flutter"];

const MatchmakingPage = () => {
  const [skillFilter, setSkillFilter] = useState("All");
  const [search, setSearch] = useState("");
  const teammates = users
    .filter(u => u.id !== currentUser.id && u.role === "participant")
    .filter(u => skillFilter === "All" || u.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase())))
    .filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1 flex items-center gap-2"><Brain className="h-6 w-6 text-primary" /> AI Matchmaking</h1>
          <p className="text-muted-foreground text-sm">AI suggests teammates with complementary skills for your next hackathon.</p>
        </div>

        <div className="glass-card p-4 bg-gradient-to-r from-primary/5 to-secondary/5">
          <p className="text-sm text-muted-foreground">💡 Our AI analyzes your skills, experience, and project preferences to find teammates who complement your strengths and fill skill gaps.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search teammates..." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-glass-border text-foreground text-sm focus:outline-none focus:border-primary" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {skillFilters.map(s => (
              <button key={s} onClick={() => setSkillFilter(s)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${skillFilter === s ? "bg-primary/10 text-primary border border-primary/30" : "bg-muted text-muted-foreground border border-glass-border hover:border-primary/20"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teammates.map((u, i) => (
            <motion.div key={u.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card-hover p-6 text-center">
              <img src={u.avatar} alt={u.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-primary/30" />
              <h3 className="font-display font-semibold text-lg">{u.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-3">{u.bio}</p>
              <div className="flex flex-wrap gap-1 justify-center mb-4">
                {u.skills.map(s => <span key={s} className="badge-skill">{s}</span>)}
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Match Score</span>
                  <span className="text-primary font-semibold">{u.matchPercentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${u.matchPercentage}%` }} />
                </div>
              </div>
              <button className="gradient-btn text-sm w-full">Connect</button>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MatchmakingPage;

import { motion } from "framer-motion";
import { BarChart3, Users, Trophy, TrendingUp, Plus, Edit, Eye } from "lucide-react";
import { hackathons } from "@/data/mockData";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, Bell, LogOut } from "lucide-react";
import { useState } from "react";
import { notifications } from "@/data/mockData";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const orgStats = [
  { label: "Total Hackathons", value: "5", icon: Trophy, color: "text-primary" },
  { label: "Total Participants", value: "1,011", icon: Users, color: "text-secondary" },
  { label: "Teams Formed", value: "87", icon: Users, color: "text-accent" },
  { label: "Engagement Rate", value: "94%", icon: TrendingUp, color: "text-primary" },
];

const skillData = [
  { name: "React", value: 35 },
  { name: "Python", value: 28 },
  { name: "ML/AI", value: 22 },
  { name: "UI/UX", value: 18 },
  { name: "Node.js", value: 15 },
  { name: "Blockchain", value: 12 },
];

const engagementData = [
  { month: "Jan", participants: 120 },
  { month: "Feb", participants: 180 },
  { month: "Mar", participants: 250 },
  { month: "Apr", participants: 310 },
  { month: "May", participants: 420 },
];

const COLORS = ["hsl(165, 80%, 48%)", "hsl(250, 60%, 60%)", "hsl(280, 60%, 55%)", "hsl(200, 70%, 50%)", "hsl(30, 80%, 55%)", "hsl(340, 65%, 50%)"];

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-glass-border bg-card/40 backdrop-blur-xl flex flex-col fixed h-full z-40">
        <Link to="/organizer" className="flex items-center gap-2 px-6 py-5 border-b border-glass-border">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-display text-lg font-bold gradient-text">HackConnect</span>
        </Link>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link to="/organizer" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-primary/10 text-primary font-medium">
            <BarChart3 className="h-4 w-4" /> Dashboard
          </Link>
          <Link to="/hackathons" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <Trophy className="h-4 w-4" /> Hackathons
          </Link>
        </nav>
        <div className="px-3 py-4 border-t border-glass-border">
          <button onClick={() => { logout(); navigate("/"); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 w-full">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 ml-64">
        <header className="h-14 border-b border-glass-border bg-card/40 backdrop-blur-xl flex items-center justify-end px-6 sticky top-0 z-30">
          <div className="relative">
            <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-2 rounded-lg hover:bg-muted/50">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </button>
            {showNotifs && (
              <div className="absolute right-0 top-12 w-80 glass-card border border-glass-border shadow-xl max-h-80 overflow-auto">
                <div className="p-3 border-b border-glass-border font-display font-semibold text-sm">Notifications</div>
                {notifications.map(n => (
                  <div key={n.id} className="p-3 border-b border-glass-border/50 last:border-0 text-sm">{n.message}</div>
                ))}
              </div>
            )}
          </div>
        </header>

        <main className="p-6 space-y-8">
          <div>
            <h1 className="font-display text-2xl font-bold mb-1">Organizer Dashboard</h1>
            <p className="text-muted-foreground text-sm">Manage your hackathons and track engagement.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {orgStats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <span className="font-display text-2xl font-bold">{s.value}</span>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Hackathon Management */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold">My Hackathons</h2>
              <button className="gradient-btn text-sm flex items-center gap-2"><Plus className="h-4 w-4" /> Create Hackathon</button>
            </div>
            <div className="glass-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-glass-border text-left">
                    <th className="p-4 text-sm font-display">Title</th>
                    <th className="p-4 text-sm font-display">Theme</th>
                    <th className="p-4 text-sm font-display">Deadline</th>
                    <th className="p-4 text-sm font-display">Participants</th>
                    <th className="p-4 text-sm font-display">Prize</th>
                    <th className="p-4 text-sm font-display">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hackathons.map(h => (
                    <tr key={h.id} className="border-b border-glass-border/50 last:border-0">
                      <td className="p-4 text-sm font-medium">{h.title}</td>
                      <td className="p-4"><span className="badge-theme">{h.theme}</span></td>
                      <td className="p-4 text-sm text-muted-foreground">{h.deadline}</td>
                      <td className="p-4 text-sm">{h.participants}</td>
                      <td className="p-4 text-sm text-primary font-semibold">{h.prize}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="p-1.5 rounded hover:bg-muted/50"><Edit className="h-4 w-4 text-muted-foreground" /></button>
                          <button className="p-1.5 rounded hover:bg-muted/50"><Eye className="h-4 w-4 text-muted-foreground" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Analytics */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4">Skill Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={skillData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {skillData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(230, 20%, 12%)", border: "1px solid hsl(230, 15%, 25%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4">Participant Engagement</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 15%, 20%)" />
                  <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(230, 20%, 12%)", border: "1px solid hsl(230, 15%, 25%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
                  <Bar dataKey="participants" fill="hsl(165, 80%, 48%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrganizerDashboard;

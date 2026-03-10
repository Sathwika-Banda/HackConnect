import { motion } from "framer-motion";
import { Trophy, Users, MessageSquare, Bell, Brain, Calendar, ArrowRight } from "lucide-react";
import { currentUser, users, hackathons, teams, notifications } from "@/data/mockData";
import DashboardLayout from "@/components/DashboardLayout";
import { Link } from "react-router-dom";

const stats = [
  { label: "Hackathons Joined", value: "3", icon: Trophy, color: "text-primary" },
  { label: "Teams Formed", value: "2", icon: Users, color: "text-secondary" },
  { label: "Messages", value: "12", icon: MessageSquare, color: "text-accent" },
  { label: "Notifications", value: String(notifications.filter(n => !n.read).length), icon: Bell, color: "text-primary" },
];

const ParticipantDashboard = () => {
  const suggestedTeammates = users.filter(u => u.id !== currentUser.id && u.role === "participant").slice(0, 4);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
          <h1 className="font-display text-2xl font-bold mb-1">Welcome back, {currentUser.name}! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with your hackathon journey.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card">
              <div className="flex items-center justify-between">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <span className="font-display text-2xl font-bold">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Suggested Teammates */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold flex items-center gap-2"><Brain className="h-5 w-5 text-primary" /> AI Suggested Teammates</h2>
            <Link to="/matchmaking" className="text-sm text-primary hover:underline flex items-center gap-1">View All <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {suggestedTeammates.map((u, i) => (
              <motion.div key={u.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="glass-card-hover p-4 text-center">
                <img src={u.avatar} alt={u.name} className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-primary/30" />
                <h3 className="font-display font-semibold text-sm">{u.name}</h3>
                <div className="flex flex-wrap gap-1 justify-center mt-2">
                  {u.skills.slice(0, 2).map(s => <span key={s} className="badge-skill">{s}</span>)}
                </div>
                <div className="mt-3 text-xs font-medium text-primary">{u.matchPercentage}% Match</div>
                <button className="gradient-btn text-xs !py-1.5 !px-3 mt-3">Connect</button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hackathons */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Registered Hackathons</h2>
            <Link to="/hackathons" className="text-sm text-primary hover:underline flex items-center gap-1">Browse All <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hackathons.slice(0, 3).map((h, i) => (
              <motion.div key={h.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }} className="glass-card-hover p-5">
                <h3 className="font-display font-semibold mb-1">{h.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{h.theme}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {h.tags.map(t => <span key={t} className="badge-theme">{t}</span>)}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Prize: {h.prize}</span>
                  <span>{h.participants} participants</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Deadline: {h.deadline}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* My Teams */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> My Teams</h2>
            <Link to="/teams" className="text-sm text-primary hover:underline flex items-center gap-1">View All <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {teams.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.1 }} className="glass-card-hover p-5">
                <h3 className="font-display font-semibold mb-1">{t.teamName}</h3>
                <p className="text-xs text-muted-foreground mb-3">{t.hackathon}</p>
                <div className="flex -space-x-2 mb-3">
                  {t.members.map(m => (
                    <img key={m.userId} src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full border-2 border-card" title={m.name} />
                  ))}
                </div>
                <Link to={`/teams/${t.id}`} className="text-xs text-primary hover:underline">Open Dashboard →</Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2"><Bell className="h-5 w-5 text-primary" /> Recent Notifications</h2>
          <div className="glass-card divide-y divide-glass-border/50">
            {notifications.slice(0, 4).map(n => (
              <div key={n.id} className={`p-4 flex items-start gap-3 ${!n.read ? "bg-primary/5" : ""}`}>
                <div className={`w-2 h-2 rounded-full mt-2 ${!n.read ? "bg-primary" : "bg-muted-foreground/30"}`} />
                <div>
                  <p className="text-sm">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(n.timestamp).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ParticipantDashboard;

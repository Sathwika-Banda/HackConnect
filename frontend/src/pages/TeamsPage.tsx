import { motion } from "framer-motion";
import { Users, Plus, MessageSquare } from "lucide-react";
import { teams } from "@/data/mockData";
import DashboardLayout from "@/components/DashboardLayout";
import { Link } from "react-router-dom";

const TeamsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold mb-1">My Teams</h1>
            <p className="text-muted-foreground text-sm">Manage your hackathon teams.</p>
          </div>
          <button className="gradient-btn text-sm flex items-center gap-2"><Plus className="h-4 w-4" /> Create Team</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {teams.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card-hover p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-lg font-semibold">{t.teamName}</h3>
                <span className="badge-theme">{t.hackathon}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Project: {t.project}</p>
              <div className="space-y-2 mb-4">
                {t.members.map(m => (
                  <div key={m.userId} className="flex items-center gap-3">
                    <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full border border-glass-border" />
                    <div>
                      <span className="text-sm font-medium">{m.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{m.role}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="gradient-btn-outline text-xs !py-2 flex-1 flex items-center justify-center gap-1"><Plus className="h-3 w-3" /> Invite</button>
                <Link to={`/teams/${t.id}`} className="gradient-btn text-xs !py-2 flex-1 flex items-center justify-center gap-1"><MessageSquare className="h-3 w-3" /> Dashboard</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamsPage;

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { teams, messages } from "@/data/mockData";
import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { Send } from "lucide-react";

const MessagesPage = () => {
  const [activeTeam, setActiveTeam] = useState(teams[0].id);
  const [newMsg, setNewMsg] = useState("");
  const teamMessages = messages.filter(m => m.teamId === activeTeam);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="font-display text-2xl font-bold">Messages</h1>
        <div className="flex gap-4 h-[600px]">
          {/* Team list */}
          <div className="w-64 glass-card p-3 space-y-1 overflow-auto flex-shrink-0">
            {teams.map(t => (
              <button key={t.id} onClick={() => setActiveTeam(t.id)} className={`w-full text-left px-3 py-3 rounded-lg text-sm transition-all ${activeTeam === t.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50"}`}>
                <div className="font-medium">{t.teamName}</div>
                <div className="text-xs text-muted-foreground">{t.hackathon}</div>
              </button>
            ))}
          </div>
          {/* Chat */}
          <div className="flex-1 glass-card flex flex-col">
            <div className="p-4 border-b border-glass-border">
              <h3 className="font-display font-semibold">{teams.find(t => t.id === activeTeam)?.teamName}</h3>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {teamMessages.map(m => (
                <div key={m.id} className="flex gap-3">
                  <img src={m.senderAvatar} alt={m.senderName} className="w-8 h-8 rounded-full border border-glass-border flex-shrink-0" />
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium">{m.senderName}</span>
                      <span className="text-xs text-muted-foreground">{new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{m.content}</p>
                  </div>
                </div>
              ))}
              {teamMessages.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No messages yet.</p>}
            </div>
            <div className="border-t border-glass-border p-3 flex gap-2">
              <input value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-2 rounded-lg bg-muted border border-glass-border text-foreground text-sm focus:outline-none focus:border-primary" />
              <button className="gradient-btn !py-2 !px-4"><Send className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;

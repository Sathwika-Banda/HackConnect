import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, CheckSquare, FileText, Users, Send } from "lucide-react";
import { teams, messages, tasks as mockTasks } from "@/data/mockData";
import DashboardLayout from "@/components/DashboardLayout";

const tabs = [
  { id: "chat", label: "Team Chat", icon: MessageSquare },
  { id: "tasks", label: "Task Board", icon: CheckSquare },
  { id: "files", label: "Files", icon: FileText },
  { id: "members", label: "Members", icon: Users },
];

const mockFiles = [
  { name: "project-proposal.pdf", size: "2.4 MB", date: "May 8, 2025" },
  { name: "wireframes.fig", size: "8.1 MB", date: "May 9, 2025" },
  { name: "api-docs.md", size: "156 KB", date: "May 10, 2025" },
];

const TeamDashboardPage = () => {
  const { id } = useParams();
  const team = teams.find(t => t.id === Number(id)) || teams[0];
  const [activeTab, setActiveTab] = useState("chat");
  const [newMsg, setNewMsg] = useState("");
  const teamMessages = messages.filter(m => m.teamId === team.id);
  const teamTasks = mockTasks.filter(t => t.teamId === team.id);

  const taskCols = [
    { status: "todo" as const, label: "To Do", color: "border-muted-foreground/30" },
    { status: "in-progress" as const, label: "In Progress", color: "border-secondary/50" },
    { status: "completed" as const, label: "Completed", color: "border-primary/50" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">{team.teamName}</h1>
          <p className="text-muted-foreground text-sm">{team.hackathon} · {team.project}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-glass-border pb-2">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${activeTab === t.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}>
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* Chat */}
        {activeTab === "chat" && (
          <div className="glass-card flex flex-col h-[500px]">
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
            </div>
            <div className="border-t border-glass-border p-3 flex gap-2">
              <input value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-2 rounded-lg bg-muted border border-glass-border text-foreground text-sm focus:outline-none focus:border-primary" />
              <button className="gradient-btn !py-2 !px-4"><Send className="h-4 w-4" /></button>
            </div>
          </div>
        )}

        {/* Tasks */}
        {activeTab === "tasks" && (
          <div className="grid md:grid-cols-3 gap-4">
            {taskCols.map(col => (
              <div key={col.status} className={`glass-card p-4 border-t-2 ${col.color}`}>
                <h3 className="font-display font-semibold text-sm mb-3">{col.label} ({teamTasks.filter(t => t.status === col.status).length})</h3>
                <div className="space-y-2">
                  {teamTasks.filter(t => t.status === col.status).map(t => (
                    <div key={t.id} className="p-3 rounded-lg bg-muted/50 border border-glass-border/50">
                      <p className="text-sm font-medium">{t.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{t.assignee}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Files */}
        {activeTab === "files" && (
          <div className="glass-card divide-y divide-glass-border/50">
            {mockFiles.map(f => (
              <div key={f.name} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.size} · {f.date}</p>
                  </div>
                </div>
                <button className="text-xs text-primary hover:underline">Download</button>
              </div>
            ))}
          </div>
        )}

        {/* Members */}
        {activeTab === "members" && (
          <div className="grid md:grid-cols-3 gap-4">
            {team.members.map(m => (
              <div key={m.userId} className="glass-card-hover p-6 text-center">
                <img src={m.avatar} alt={m.name} className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-primary/30" />
                <h3 className="font-display font-semibold">{m.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TeamDashboardPage;

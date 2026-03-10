import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Globe, Users, Brain, MessageSquare, User, Bell, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { notifications } from "@/data/mockData";
import { useState } from "react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/hackathons", icon: Globe, label: "Hackathons" },
  { to: "/teams", icon: Users, label: "Teams" },
  { to: "/matchmaking", icon: Brain, label: "Matchmaking" },
  { to: "/messages", icon: MessageSquare, label: "Messages" },
  { to: "/profile", icon: User, label: "Profile" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showNotifs, setShowNotifs] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-glass-border bg-card/40 backdrop-blur-xl flex flex-col fixed h-full z-40">
        <Link to="/dashboard" className="flex items-center gap-2 px-6 py-5 border-b border-glass-border">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-display text-lg font-bold gradient-text">HackConnect</span>
        </Link>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => {
            const active = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-glass-border">
          <button onClick={() => { logout(); navigate("/"); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all w-full">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-64">
        {/* Top bar */}
        <header className="h-14 border-b border-glass-border bg-card/40 backdrop-blur-xl flex items-center justify-end px-6 sticky top-0 z-30">
          <div className="relative">
            <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {unread > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />}
            </button>
            {showNotifs && (
              <div className="absolute right-0 top-12 w-80 glass-card border border-glass-border shadow-xl max-h-80 overflow-auto">
                <div className="p-3 border-b border-glass-border font-display font-semibold text-sm">Notifications</div>
                {notifications.map(n => (
                  <div key={n.id} className={`p-3 border-b border-glass-border/50 last:border-0 text-sm ${!n.read ? "bg-primary/5" : ""}`}>
                    <p className="text-foreground">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(n.timestamp).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

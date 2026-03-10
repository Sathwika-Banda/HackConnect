import { useState } from "react";
import { motion } from "framer-motion";
import { User, Github, Linkedin, Globe, FileText, Save } from "lucide-react";
import { currentUser } from "@/data/mockData";
import DashboardLayout from "@/components/DashboardLayout";

const ProfilePage = () => {
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [skills, setSkills] = useState(currentUser.skills.join(", "));
  const [github, setGithub] = useState(currentUser.github);
  const [linkedin, setLinkedin] = useState(currentUser.linkedin);
  const [portfolio, setPortfolio] = useState(currentUser.portfolio);

  const mockFiles = [
    { name: "resume_alex_chen.pdf", type: "Resume" },
    { name: "aws_certification.pdf", type: "Certification" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="font-display text-2xl font-bold">My Profile</h1>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <div className="flex items-center gap-6 mb-6">
            <img src={currentUser.avatar} alt={name} className="w-20 h-20 rounded-full border-2 border-primary/30" />
            <div>
              <h2 className="font-display text-xl font-semibold">{name}</h2>
              <p className="text-sm text-muted-foreground capitalize">{currentUser.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
              <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-muted border border-glass-border text-foreground text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Bio</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-lg bg-muted border border-glass-border text-foreground text-sm focus:outline-none focus:border-primary resize-none" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Skills (comma separated)</label>
              <input value={skills} onChange={e => setSkills(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-muted border border-glass-border text-foreground text-sm focus:outline-none focus:border-primary" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><Github className="h-3 w-3" /> GitHub</label>
                <input value={github} onChange={e => setGithub(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-muted border border-glass-border text-foreground text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><Linkedin className="h-3 w-3" /> LinkedIn</label>
                <input value={linkedin} onChange={e => setLinkedin(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-muted border border-glass-border text-foreground text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><Globe className="h-3 w-3" /> Portfolio</label>
                <input value={portfolio} onChange={e => setPortfolio(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-muted border border-glass-border text-foreground text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>
            <button className="gradient-btn text-sm flex items-center gap-2"><Save className="h-4 w-4" /> Save Profile</button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Documents</h3>
          <div className="space-y-3">
            {mockFiles.map(f => (
              <div key={f.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-glass-border/50">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.type}</p>
                  </div>
                </div>
                <button className="text-xs text-primary hover:underline">View</button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;

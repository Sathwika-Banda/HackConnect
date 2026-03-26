export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  skills: string[];
  role: "participant" | "organizer";
  bio: string;
  github: string;
  linkedin: string;
  portfolio: string;
  matchPercentage?: number;
}

export interface Hackathon {
  id: number;
  title: string;
  theme: string;
  organizer: string;
  date: string;
  deadline: string;
  prize: string;
  participants: number;
  tags: string[];
  description: string;
  image: string;
}

export interface Team {
  id: number;
  teamName: string;
  hackathonId: number;
  hackathon: string;
  members: TeamMember[];
  project: string;
}

export interface TeamMember {
  userId: number;
  name: string;
  avatar: string;
  role: string;
}

export interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  teamId: number;
}

export interface Notification {
  id: number;
  type: "invitation" | "reminder" | "match" | "info";
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Task {
  id: number;
  title: string;
  status: "todo" | "in-progress" | "completed";
  assignee: string;
  teamId: number;
}

const avatarUrl = (seed: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

export const users: User[] = [
  { id: 1, name: "Alex Chen", email: "alex@example.com", avatar: avatarUrl("Alex"), skills: ["React", "TypeScript", "UI/UX"], role: "participant", bio: "Full-stack developer passionate about hackathons and AI.", github: "github.com/alexchen", linkedin: "linkedin.com/in/alexchen", portfolio: "alexchen.dev", matchPercentage: 95 },
  { id: 2, name: "Sarah Kim", email: "sarah@example.com", avatar: avatarUrl("Sarah"), skills: ["Python", "ML", "Data Science"], role: "participant", bio: "ML engineer specializing in NLP and computer vision.", github: "github.com/sarahkim", linkedin: "linkedin.com/in/sarahkim", portfolio: "sarahkim.io", matchPercentage: 92 },
  { id: 3, name: "John Doe", email: "john@example.com", avatar: avatarUrl("John"), skills: ["Node.js", "AWS", "DevOps"], role: "participant", bio: "Cloud architect and backend specialist.", github: "github.com/johndoe", linkedin: "linkedin.com/in/johndoe", portfolio: "johndoe.dev", matchPercentage: 88 },
  { id: 4, name: "Maria Garcia", email: "maria@example.com", avatar: avatarUrl("Maria"), skills: ["Figma", "UI/UX", "Branding"], role: "participant", bio: "Designer crafting beautiful user experiences.", github: "github.com/mariagarcia", linkedin: "linkedin.com/in/mariagarcia", portfolio: "mariagarcia.design", matchPercentage: 85 },
  { id: 5, name: "James Wilson", email: "james@example.com", avatar: avatarUrl("James"), skills: ["Rust", "Blockchain", "Smart Contracts"], role: "participant", bio: "Web3 developer building decentralized solutions.", github: "github.com/jameswilson", linkedin: "linkedin.com/in/jameswilson", portfolio: "jameswilson.xyz", matchPercentage: 80 },
  { id: 6, name: "Emily Zhang", email: "emily@example.com", avatar: avatarUrl("Emily"), skills: ["Flutter", "Firebase", "Mobile"], role: "participant", bio: "Mobile developer creating cross-platform apps.", github: "github.com/emilyzhang", linkedin: "linkedin.com/in/emilyzhang", portfolio: "emilyzhang.dev", matchPercentage: 78 },
  { id: 7, name: "Organizer Admin", email: "admin@example.com", avatar: avatarUrl("Admin"), skills: ["Management", "Strategy"], role: "organizer", bio: "Hackathon organizer and tech community leader.", github: "", linkedin: "", portfolio: "" },
];

export const hackathons: Hackathon[] = [
  { id: 1, title: "AI Innovation Hackathon", theme: "Artificial Intelligence", organizer: "TechCorp", date: "2025-06-01", deadline: "2025-05-15", prize: "$10,000", participants: 245, tags: ["AI", "ML", "Deep Learning"], description: "Build AI-powered solutions that solve real-world problems.", image: "" },
  { id: 2, title: "FinTech Disrupt", theme: "Financial Technology", organizer: "FinLabs", date: "2025-07-10", deadline: "2025-06-20", prize: "$15,000", participants: 180, tags: ["Fintech", "Blockchain", "Payments"], description: "Reimagine the future of finance and banking.", image: "" },
  { id: 3, title: "HealthTech Challenge", theme: "Healthcare", organizer: "MedInnovate", date: "2025-08-05", deadline: "2025-07-15", prize: "$12,000", participants: 156, tags: ["HealthTech", "AI", "IoT"], description: "Create technology solutions for healthcare challenges.", image: "" },
  { id: 4, title: "Green Energy Hack", theme: "Sustainability", organizer: "EcoTech", date: "2025-09-12", deadline: "2025-08-25", prize: "$8,000", participants: 120, tags: ["CleanTech", "IoT", "Data"], description: "Develop sustainable energy solutions for a greener future.", image: "" },
  { id: 5, title: "Web3 Builder Fest", theme: "Decentralization", organizer: "ChainDAO", date: "2025-10-01", deadline: "2025-09-15", prize: "$20,000", participants: 310, tags: ["Web3", "DeFi", "NFT"], description: "Build the next generation of decentralized applications.", image: "" },
];

export const teams: Team[] = [
  { id: 1, teamName: "Code Wizards", hackathonId: 1, hackathon: "AI Innovation Hackathon", members: [
    { userId: 1, name: "Alex Chen", avatar: avatarUrl("Alex"), role: "Frontend Lead" },
    { userId: 2, name: "Sarah Kim", avatar: avatarUrl("Sarah"), role: "ML Engineer" },
    { userId: 3, name: "John Doe", avatar: avatarUrl("John"), role: "Backend Dev" },
  ], project: "AI-powered code reviewer" },
  { id: 2, teamName: "Pixel Pirates", hackathonId: 2, hackathon: "FinTech Disrupt", members: [
    { userId: 1, name: "Alex Chen", avatar: avatarUrl("Alex"), role: "Frontend Dev" },
    { userId: 4, name: "Maria Garcia", avatar: avatarUrl("Maria"), role: "UI/UX Designer" },
  ], project: "Smart payment dashboard" },
];

export const messages: Message[] = [
  { id: 1, senderId: 2, senderName: "Sarah Kim", senderAvatar: avatarUrl("Sarah"), content: "Hey team! I've pushed the ML model. Check the repo.", timestamp: "2025-05-10T10:30:00", teamId: 1 },
  { id: 2, senderId: 1, senderName: "Alex Chen", senderAvatar: avatarUrl("Alex"), content: "Awesome! I'll integrate it with the frontend today.", timestamp: "2025-05-10T10:35:00", teamId: 1 },
  { id: 3, senderId: 3, senderName: "John Doe", senderAvatar: avatarUrl("John"), content: "API endpoints are ready. Let me know if you need changes.", timestamp: "2025-05-10T11:00:00", teamId: 1 },
  { id: 4, senderId: 1, senderName: "Alex Chen", senderAvatar: avatarUrl("Alex"), content: "Perfect. Let's sync at 3 PM?", timestamp: "2025-05-10T11:05:00", teamId: 1 },
  { id: 5, senderId: 2, senderName: "Sarah Kim", senderAvatar: avatarUrl("Sarah"), content: "Works for me! 👍", timestamp: "2025-05-10T11:10:00", teamId: 1 },
];

export const notifications: Notification[] = [
  { id: 1, type: "invitation", message: "You have been invited to join Team Innovators.", timestamp: "2025-05-10T09:00:00", read: false },
  { id: 2, type: "reminder", message: "Hackathon deadline approaching: AI Innovation Hackathon (May 15).", timestamp: "2025-05-09T15:00:00", read: false },
  { id: 3, type: "match", message: "New teammate match found: Sarah Kim (92% match).", timestamp: "2025-05-08T12:00:00", read: true },
  { id: 4, type: "info", message: "Your team Code Wizards has been registered for AI Innovation Hackathon.", timestamp: "2025-05-07T10:00:00", read: true },
  { id: 5, type: "reminder", message: "Team meeting scheduled for tomorrow at 3 PM.", timestamp: "2025-05-06T18:00:00", read: true },
];

export const tasks: Task[] = [
  { id: 1, title: "Design landing page wireframe", status: "completed", assignee: "Maria Garcia", teamId: 1 },
  { id: 2, title: "Implement ML model API", status: "completed", assignee: "Sarah Kim", teamId: 1 },
  { id: 3, title: "Build frontend dashboard", status: "in-progress", assignee: "Alex Chen", teamId: 1 },
  { id: 4, title: "Set up CI/CD pipeline", status: "in-progress", assignee: "John Doe", teamId: 1 },
  { id: 5, title: "Write project documentation", status: "todo", assignee: "Alex Chen", teamId: 1 },
  { id: 6, title: "Prepare demo presentation", status: "todo", assignee: "Sarah Kim", teamId: 1 },
];

export const currentUser = users[0];

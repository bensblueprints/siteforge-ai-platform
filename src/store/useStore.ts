import { create } from 'zustand';

export interface Project {
  id: string;
  name: string;
  industry: string;
  industryId: string;
  status: 'draft' | 'generating' | 'ready' | 'published';
  url?: string;
  inputUrl: string;
  inputType: 'maps' | 'website';
  createdAt: string;
  updatedAt: string;
  preview?: string;
  content: WebsiteContent;
  sections: PageSection[];
}

export interface WebsiteContent {
  businessName: string;
  tagline: string;
  description: string;
  services: string[];
  phone: string;
  email: string;
  address: string;
  hours: string;
  rating: string;
  reviewCount: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  rawText: string;
}

export interface PageSection {
  id: string;
  type: string;
  name: string;
  enabled: boolean;
  order: number;
  content: Record<string, any>;
}

interface AppState {
  user: { name: string; email: string; plan: 'free' | 'starter' | 'pro' | 'agency' } | null;
  projects: Project[];
  currentProject: Project | null;
  isAuthenticated: boolean;
  setUser: (user: AppState['user']) => void;
  logout: () => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  setCurrentProject: (project: Project | null) => void;
  deleteProject: (id: string) => void;
  loadProjects: () => void;
}

// Load from localStorage
const loadFromStorage = (): Partial<AppState> => {
  try {
    const saved = localStorage.getItem('siteforge-projects');
    const savedUser = localStorage.getItem('siteforge-user');
    const projects = saved ? JSON.parse(saved) : [];
    const user = savedUser ? JSON.parse(savedUser) : null;
    return { projects, user: user || null, isAuthenticated: !!user };
  } catch {
    return { projects: [], user: null, isAuthenticated: false };
  }
};

const initial = loadFromStorage();

export const useStore = create<AppState>((set) => ({
  user: initial.user ?? null,
  projects: initial.projects ?? [],
  isAuthenticated: initial.isAuthenticated ?? false,
  currentProject: null,
  setUser: (user) => {
    if (user) localStorage.setItem('siteforge-user', JSON.stringify(user));
    else localStorage.removeItem('siteforge-user');
    set({ user, isAuthenticated: !!user });
  },
  logout: () => {
    localStorage.removeItem('siteforge-user');
    set({ user: null, isAuthenticated: false, currentProject: null });
  },
  addProject: (project) =>
    set((state) => {
      const projects = [project, ...state.projects];
      localStorage.setItem('siteforge-projects', JSON.stringify(projects));
      return { projects };
    }),
  updateProject: (id, updates) =>
    set((state) => {
      const projects = state.projects.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
      );
      localStorage.setItem('siteforge-projects', JSON.stringify(projects));
      return { projects };
    }),
  setCurrentProject: (project) => set({ currentProject: project }),
  deleteProject: (id) =>
    set((state) => {
      const projects = state.projects.filter((p) => p.id !== id);
      localStorage.setItem('siteforge-projects', JSON.stringify(projects));
      return { projects };
    }),
  loadProjects: () => {
    try {
      const saved = localStorage.getItem('siteforge-projects');
      if (saved) set({ projects: JSON.parse(saved) });
    } catch { /* ignore */ }
  },
}));

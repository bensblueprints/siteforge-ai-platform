import { create } from 'zustand';

export interface Project {
  id: string;
  name: string;
  industry: string;
  status: 'draft' | 'generating' | 'ready' | 'published';
  url?: string;
  createdAt: Date;
  updatedAt: Date;
  preview?: string;
  content?: WebsiteContent;
}

export interface WebsiteContent {
  businessName: string;
  tagline: string;
  description: string;
  services: string[];
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  hours: string;
  heroImage: string;
  gallery: string[];
  testimonials: { name: string; text: string }[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
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
}

export const useStore = create<AppState>((set) => ({
  user: null,
  projects: [],
  currentProject: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false, currentProject: null }),
  addProject: (project) => set((state) => ({ projects: [project, ...state.projects] })),
  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  setCurrentProject: (project) => set({ currentProject: project }),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),
}));

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  architecture: string;
  metrics: string[];
  tags: string[];
}

export interface ServicePillar {
  title: string;
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  isVenture?: boolean;
  link?: string;
  tagline?: string;
  pillars?: ServicePillar[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; info?: string }[];
}

export interface LeadershipItem {
  role: string;
  organization: string;
  highlight?: string;
}

export interface Achievement {
  role: string;
  organization: string;
  impact: string;
  image: string;
  credentialUrl?: string;
}

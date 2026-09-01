export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  department?: string;
  period: string;
  status?: string;
  type: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
  iconType: 'military' | 'education' | 'tech';
}

export interface EducationItem {
  id: string;
  title: string;
  institution: string;
  period: string;
  status: 'Concluído' | 'Em Andamento';
  category: 'formacao' | 'certificacao' | 'especializacao';
  description: string;
  badge: string;
  keyLearnings: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    description: string;
  }[];
}

export interface PersonalProject {
  id: string;
  title: string;
  category: 'música' | 'esporte' | 'tecnologia' | 'ia';
  tagline: string;
  description: string;
  learnings: string[];
  extraContent?: {
    lyricsSnippet?: string[];
    details?: string;
  };
}

export type VisitorReason = 
  | 'recruitment' 
  | 'networking' 
  | 'partnership' 
  | 'evaluation' 
  | 'military'
  | 'curiosity' 
  | 'other';

export interface VisitorRecord {
  id: string;
  name: string;
  email: string;
  organization?: string;
  role?: string;
  reason: VisitorReason;
  whatsapp?: string;
  linkedin?: string;
  notes?: string;
  createdAt: string; // ISO string
  syncedToSupabase: boolean;
  userAgent?: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  tableName: string;
}

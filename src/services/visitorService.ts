import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { VisitorRecord, SupabaseConfig, VisitorReason } from '../types';

const STORAGE_KEY_VISITORS = 'gabriel_portfolio_visitors_v1';
const STORAGE_KEY_CURRENT_VISITOR = 'gabriel_portfolio_current_user_v1';
const STORAGE_KEY_SUPABASE_CONFIG = 'gabriel_portfolio_supabase_cfg_v1';
const STORAGE_KEY_GATE_DISMISSED = 'gabriel_portfolio_gate_dismissed_v1';

// Get default or saved Supabase configuration
export function getSupabaseConfig(): SupabaseConfig {
  const saved = localStorage.getItem(STORAGE_KEY_SUPABASE_CONFIG);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }

  // Check import.meta.env
  const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env || {};
  const envUrl = metaEnv.VITE_SUPABASE_URL || '';
  const envKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';

  return {
    url: envUrl,
    anonKey: envKey,
    tableName: 'visitors',
  };
}

export function saveSupabaseConfig(config: SupabaseConfig): void {
  localStorage.setItem(STORAGE_KEY_SUPABASE_CONFIG, JSON.stringify(config));
}

// Create Supabase client dynamically
export function getSupabaseClient(): SupabaseClient | null {
  const cfg = getSupabaseConfig();
  if (cfg.url && cfg.anonKey && cfg.url.startsWith('http')) {
    try {
      return createClient(cfg.url, cfg.anonKey);
    } catch (e) {
      console.warn('Erro ao inicializar Supabase:', e);
      return null;
    }
  }
  return null;
}

// Fetch all visitors from LocalStorage
export function getLocalVisitors(): VisitorRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VISITORS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao ler visitantes locais:', e);
    return [];
  }
}

// Save visitors array to LocalStorage
export function saveLocalVisitors(visitors: VisitorRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_VISITORS, JSON.stringify(visitors));
  } catch (e) {
    console.error('Erro ao salvar visitantes locais:', e);
  }
}

// Current logged in / registered visitor in this browser
export function getCurrentVisitor(): VisitorRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT_VISITOR);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentVisitor(visitor: VisitorRecord | null): void {
  if (visitor) {
    localStorage.setItem(STORAGE_KEY_CURRENT_VISITOR, JSON.stringify(visitor));
  } else {
    localStorage.removeItem(STORAGE_KEY_CURRENT_VISITOR);
  }
}

export function isGateDismissed(): boolean {
  return localStorage.getItem(STORAGE_KEY_GATE_DISMISSED) === 'true';
}

export function setGateDismissed(dismissed: boolean): void {
  localStorage.setItem(STORAGE_KEY_GATE_DISMISSED, dismissed ? 'true' : 'false');
}

// Register a new visitor
export async function registerVisitor(data: {
  name: string;
  email: string;
  organization?: string;
  role?: string;
  reason: VisitorReason;
  whatsapp?: string;
  linkedin?: string;
  notes?: string;
}): Promise<{ success: boolean; visitor: VisitorRecord; supabaseSynced: boolean; error?: string }> {
  const newVisitor: VisitorRecord = {
    id: `vis_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    organization: data.organization?.trim() || '',
    role: data.role?.trim() || '',
    reason: data.reason || 'networking',
    whatsapp: data.whatsapp?.trim() || '',
    linkedin: data.linkedin?.trim() || '',
    notes: data.notes?.trim() || '',
    createdAt: new Date().toISOString(),
    syncedToSupabase: false,
    userAgent: navigator.userAgent || 'Web Browser',
  };

  // 1. Save locally
  const currentList = getLocalVisitors();
  // Filter out exact duplicate if re-registering in same session
  const updatedList = [newVisitor, ...currentList.filter(v => v.email !== newVisitor.email)];
  saveLocalVisitors(updatedList);
  setCurrentVisitor(newVisitor);

  // 2. Try syncing to Supabase if configured
  let supabaseSynced = false;
  const client = getSupabaseClient();
  const cfg = getSupabaseConfig();

  if (client && cfg.tableName) {
    try {
      const { error } = await client.from(cfg.tableName).insert([
        {
          id: newVisitor.id,
          name: newVisitor.name,
          email: newVisitor.email,
          organization: newVisitor.organization,
          role: newVisitor.role,
          reason: newVisitor.reason,
          whatsapp: newVisitor.whatsapp,
          linkedin: newVisitor.linkedin,
          notes: newVisitor.notes,
          user_agent: newVisitor.userAgent,
          created_at: newVisitor.createdAt,
        },
      ]);

      if (!error) {
        supabaseSynced = true;
        newVisitor.syncedToSupabase = true;
        // Update local status
        const listAfterSync = getLocalVisitors().map(v => 
          v.id === newVisitor.id ? { ...v, syncedToSupabase: true } : v
        );
        saveLocalVisitors(listAfterSync);
        setCurrentVisitor(newVisitor);
      } else {
        console.warn('Aviso Supabase insert:', error.message);
      }
    } catch (err: any) {
      console.warn('Falha na sincronização imediata com Supabase:', err.message);
    }
  }

  return {
    success: true,
    visitor: newVisitor,
    supabaseSynced,
  };
}

// Sync all pending offline records to Supabase
export async function syncPendingToSupabase(): Promise<{ syncedCount: number; error?: string }> {
  const client = getSupabaseClient();
  const cfg = getSupabaseConfig();

  if (!client) {
    return { syncedCount: 0, error: 'Supabase ainda não configurado (URL e Chave necessárias).' };
  }

  const visitors = getLocalVisitors();
  const pending = visitors.filter(v => !v.syncedToSupabase);

  if (pending.length === 0) {
    return { syncedCount: 0 };
  }

  try {
    const payload = pending.map(v => ({
      id: v.id,
      name: v.name,
      email: v.email,
      organization: v.organization || '',
      role: v.role || '',
      reason: v.reason,
      whatsapp: v.whatsapp || '',
      linkedin: v.linkedin || '',
      notes: v.notes || '',
      user_agent: v.userAgent || '',
      created_at: v.createdAt,
    }));

    const { error } = await client.from(cfg.tableName || 'visitors').upsert(payload, { onConflict: 'email' });

    if (error) {
      return { syncedCount: 0, error: error.message };
    }

    // Mark as synced
    const updated = visitors.map(v => ({ ...v, syncedToSupabase: true }));
    saveLocalVisitors(updated);

    return { syncedCount: pending.length };
  } catch (err: any) {
    return { syncedCount: 0, error: err.message || 'Erro inesperado na sincronização.' };
  }
}

// Test Supabase connection
export async function testSupabaseConnection(config: SupabaseConfig): Promise<{ success: boolean; message: string }> {
  if (!config.url || !config.anonKey) {
    return { success: false, message: 'URL e Chave Anônima do Supabase são obrigatórias.' };
  }

  try {
    const client = createClient(config.url, config.anonKey);
    const { error } = await client.from(config.tableName || 'visitors').select('count', { count: 'exact', head: true });
    
    if (error) {
      if (error.code === '42P01' || error.message.includes('relation') || error.message.includes('does not exist')) {
        return { 
          success: true, 
          message: `Conexão bem sucedida com o Supabase! Porém a tabela '${config.tableName}' ainda não foi criada. Copie o script SQL abaixo e execute no editor do Supabase.` 
        };
      }
      return { success: false, message: `Erro do Supabase: ${error.message}` };
    }

    return { success: true, message: `Conexão e tabela '${config.tableName}' validadas com sucesso no Supabase!` };
  } catch (err: any) {
    return { success: false, message: `Erro ao conectar: ${err.message}` };
  }
}

// Export visitors to CSV
export function exportVisitorsCSV(visitors: VisitorRecord[]): void {
  if (visitors.length === 0) return;

  const headers = ['Data e Hora (ISO)', 'Nome', 'E-mail', 'Empresa / Batalhão', 'Cargo', 'Motivo da Visita', 'WhatsApp', 'LinkedIn', 'Observações'];
  
  const rows = visitors.map(v => [
    v.createdAt,
    `"${(v.name || '').replace(/"/g, '""')}"`,
    `"${(v.email || '').replace(/"/g, '""')}"`,
    `"${(v.organization || '').replace(/"/g, '""')}"`,
    `"${(v.role || '').replace(/"/g, '""')}"`,
    `"${v.reason}"`,
    `"${(v.whatsapp || '').replace(/"/g, '""')}"`,
    `"${(v.linkedin || '').replace(/"/g, '""')}"`,
    `"${(v.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `visitantes_portfolio_gabriel_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// SQL Script for Gabriel to create table in Supabase
export const SUPABASE_SQL_MIGRATION = `-- ==========================================
-- SCRIPT SQL PARA O SUPABASE (Gabriel Silva Evangelista)
-- Execute este script no menu: Supabase Dashboard > SQL Editor > New Query
-- ==========================================

CREATE TABLE IF NOT EXISTS public.visitors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    organization TEXT,
    role TEXT,
    reason TEXT DEFAULT 'networking',
    whatsapp TEXT,
    linkedin TEXT,
    notes TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ativar segurança em nível de linha (RLS)
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Política 1: Permitir que qualquer visitante anônimo insira seu cadastro
CREATE POLICY "Permitir insercao publica de visitantes" 
ON public.visitors 
FOR INSERT 
WITH CHECK (true);

-- Política 2: Permitir leitura publica (ou para o dono do portfólio)
CREATE POLICY "Permitir leitura de visitantes" 
ON public.visitors 
FOR SELECT 
USING (true);

-- Criar índices de busca rápida
CREATE INDEX IF NOT EXISTS idx_visitors_email ON public.visitors(email);
CREATE INDEX IF NOT EXISTS idx_visitors_created_at ON public.visitors(created_at DESC);
`;

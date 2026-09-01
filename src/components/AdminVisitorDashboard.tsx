import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Download, 
  Database, 
  Search, 
  Calendar, 
  Mail, 
  Phone, 
  Building2, 
  Briefcase, 
  Linkedin, 
  RefreshCw, 
  X, 
  Lock, 
  Check, 
  Copy, 
  ExternalLink,
  Trash2,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  KeyRound
} from 'lucide-react';
import { 
  getLocalVisitors, 
  saveLocalVisitors, 
  getSupabaseConfig, 
  saveSupabaseConfig, 
  testSupabaseConnection, 
  syncPendingToSupabase,
  exportVisitorsCSV,
  SUPABASE_SQL_MIGRATION 
} from '../services/visitorService';
import { VisitorRecord, SupabaseConfig, VisitorReason } from '../types';

interface AdminVisitorDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminVisitorDashboard: React.FC<AdminVisitorDashboardProps> = ({
  isOpen,
  onClose,
}) => {
  // Authentication PIN state (Default Gabriel Admin PIN: 1234 or 'gabriel')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('gabriel_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<'visitors' | 'supabase' | 'stats'>('visitors');

  // Visitors State
  const [visitors, setVisitors] = useState<VisitorRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterReason, setFilterReason] = useState<string>('all');
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorRecord | null>(null);

  // Supabase Config State
  const [supabaseCfg, setSupabaseCfg] = useState<SupabaseConfig>(getSupabaseConfig());
  const [testingSupabase, setTestingSupabase] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [copiedSQL, setCopiedSQL] = useState(false);

  // Load visitors whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      setVisitors(getLocalVisitors());
      setSupabaseCfg(getSupabaseConfig());
    }
  }, [isOpen]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput.toLowerCase() === 'gabriel' || pinInput === '2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('gabriel_admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleCopySQL = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_MIGRATION);
    setCopiedSQL(true);
    setTimeout(() => setCopiedSQL(false), 2500);
  };

  const handleSaveSupabaseConfig = () => {
    saveSupabaseConfig(supabaseCfg);
    setTestResult({ success: true, message: 'Configurações do Supabase salvas com sucesso!' });
    setTimeout(() => setTestResult(null), 3000);
  };

  const handleTestConnection = async () => {
    setTestingSupabase(true);
    setTestResult(null);
    const result = await testSupabaseConnection(supabaseCfg);
    setTestingSupabase(false);
    setTestResult(result);
  };

  const handleSyncNow = async () => {
    setSyncing(true);
    setSyncResult(null);
    const res = await syncPendingToSupabase();
    setSyncing(false);
    if (res.error) {
      setSyncResult(`Erro: ${res.error}`);
    } else {
      setSyncResult(`${res.syncedCount} visitantes sincronizados com sucesso!`);
      setVisitors(getLocalVisitors());
    }
    setTimeout(() => setSyncResult(null), 4000);
  };

  const handleDeleteVisitor = (id: string) => {
    if (window.confirm('Deseja realmente remover este registro de visitante?')) {
      const updated = visitors.filter(v => v.id !== id);
      saveLocalVisitors(updated);
      setVisitors(updated);
      if (selectedVisitor?.id === id) setSelectedVisitor(null);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Atenção: deseja limpar todos os visitantes da lista local?')) {
      saveLocalVisitors([]);
      setVisitors([]);
      setSelectedVisitor(null);
    }
  };

  // Filtered list
  const filteredVisitors = useMemo(() => {
    return visitors.filter(v => {
      const matchesSearch = 
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (v.organization && v.organization.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (v.role && v.role.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesReason = filterReason === 'all' || v.reason === filterReason;

      return matchesSearch && matchesReason;
    });
  }, [visitors, searchTerm, filterReason]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = visitors.length;
    const recruiters = visitors.filter(v => v.reason === 'recruitment').length;
    const networking = visitors.filter(v => v.reason === 'networking').length;
    const military = visitors.filter(v => v.reason === 'military').length;
    const companies = new Set(visitors.map(v => v.organization).filter(Boolean)).size;
    const syncedCount = visitors.filter(v => v.syncedToSupabase).length;

    return { total, recruiters, networking, military, companies, syncedCount };
  }, [visitors]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl h-[90vh] max-h-[850px] bg-[#00005c] border border-[#170ba4] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Header */}
        <div className="px-6 py-4 bg-[#070448] border-b border-[#170ba4] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2f15ed]/20 border border-[#2f15ed]/50 flex items-center justify-center text-[#9d90ff]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-display flex items-center gap-2">
                <span>Painel de Controle de Visitantes</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2f15ed] text-white font-mono-code">
                  ADMIN
                </span>
              </h2>
              <p className="text-[11px] font-mono-code text-zinc-400">
                Gabriel Silva Evangelista • Controle de Leads & Integração Supabase
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#00005c] hover:bg-[#0c0580] text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Security Gate */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-[#020228]">
            <form onSubmit={handlePinSubmit} className="max-w-sm w-full p-8 rounded-3xl bg-[#070448] border border-[#170ba4] text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-[#2f15ed]/20 border border-[#2f15ed] mx-auto flex items-center justify-center text-[#9d90ff]">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">Acesso Restrito ao Administrador</h3>
                <p className="text-xs text-zinc-400 font-mono-code mt-1">
                  Digite seu PIN de acesso (Padrão: <span className="text-[#9d90ff] font-bold">1234</span> ou <span className="text-[#9d90ff] font-bold">gabriel</span>)
                </p>
              </div>

              <div>
                <input
                  type="password"
                  autoFocus
                  placeholder="PIN de Acesso"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  className="w-full bg-[#00005c] border border-[#170ba4] focus:border-[#2f15ed] text-center tracking-widest text-lg font-mono-code text-white rounded-xl py-2.5 outline-none"
                />
                {pinError && (
                  <p className="text-xs text-rose-400 font-mono-code mt-2">PIN incorreto. Tente 1234.</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#2f15ed] hover:bg-[#2310c8] text-white font-mono-code text-xs font-bold transition-all shadow-md shadow-[#2f15ed]/30"
              >
                ENTRAR NO PAINEL
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Content */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#020228]">
            
            {/* Top Sub-Navigation Tabs */}
            <div className="px-6 py-2.5 bg-[#00005c] border-b border-[#170ba4] flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('visitors')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-code transition-all flex items-center gap-2 ${
                    activeTab === 'visitors' 
                      ? 'bg-[#2f15ed] text-white font-bold' 
                      : 'bg-[#070448] text-zinc-300 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>VISITANTES CADASTRADOS ({visitors.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('stats')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-code transition-all flex items-center gap-2 ${
                    activeTab === 'stats' 
                      ? 'bg-[#2f15ed] text-white font-bold' 
                      : 'bg-[#070448] text-zinc-300 hover:text-white'
                  }`}
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>MÉTRICAS & ANÁLISES</span>
                </button>

                <button
                  onClick={() => setActiveTab('supabase')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-code transition-all flex items-center gap-2 ${
                    activeTab === 'supabase' 
                      ? 'bg-[#2f15ed] text-white font-bold' 
                      : 'bg-[#070448] text-zinc-300 hover:text-white'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>BANCO SUPABASE {supabaseCfg.url ? '🟢' : '⚪'}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportVisitorsCSV(visitors)}
                  disabled={visitors.length === 0}
                  className="px-3 py-1.5 rounded-xl bg-[#070448] hover:bg-[#0c0580] border border-[#170ba4] text-xs font-mono-code text-[#9d90ff] hover:text-white flex items-center gap-1.5 transition-all disabled:opacity-50"
                  title="Exportar dados para planilha Excel / CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">EXPORTAR CSV</span>
                </button>

                <button
                  onClick={handleClearAll}
                  disabled={visitors.length === 0}
                  className="px-2.5 py-1.5 rounded-xl bg-[#070448] hover:bg-rose-950/60 border border-[#170ba4] text-xs font-mono-code text-zinc-400 hover:text-rose-300 transition-all disabled:opacity-50"
                  title="Limpar todos os registros"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* TAB 1: VISITORS LIST & DETAILS */}
            {activeTab === 'visitors' && (
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Left Column: Search & List */}
                <div className="w-full md:w-1/2 border-r border-[#170ba4] flex flex-col h-full overflow-hidden">
                  
                  {/* Search Bar & Filter */}
                  <div className="p-3 bg-[#070448] border-b border-[#170ba4] space-y-2 flex-shrink-0">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="Buscar por nome, email, empresa ou cargo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#00005c] border border-[#170ba4] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#2f15ed]"
                      />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] font-mono-code scrollbar-none">
                      <button
                        onClick={() => setFilterReason('all')}
                        className={`px-2.5 py-0.5 rounded-lg whitespace-nowrap ${filterReason === 'all' ? 'bg-[#2f15ed] text-white' : 'bg-[#00005c] text-zinc-400'}`}
                      >
                        Todos ({visitors.length})
                      </button>
                      <button
                        onClick={() => setFilterReason('recruitment')}
                        className={`px-2.5 py-0.5 rounded-lg whitespace-nowrap ${filterReason === 'recruitment' ? 'bg-[#2f15ed] text-white' : 'bg-[#00005c] text-zinc-400'}`}
                      >
                        🎯 Recrutamento
                      </button>
                      <button
                        onClick={() => setFilterReason('networking')}
                        className={`px-2.5 py-0.5 rounded-lg whitespace-nowrap ${filterReason === 'networking' ? 'bg-[#2f15ed] text-white' : 'bg-[#00005c] text-zinc-400'}`}
                      >
                        🤝 Networking
                      </button>
                      <button
                        onClick={() => setFilterReason('military')}
                        className={`px-2.5 py-0.5 rounded-lg whitespace-nowrap ${filterReason === 'military' ? 'bg-[#2f15ed] text-white' : 'bg-[#00005c] text-zinc-400'}`}
                      >
                        🎖️ Exército/DEC
                      </button>
                    </div>
                  </div>

                  {/* Visitors Scrollable List */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {filteredVisitors.length === 0 ? (
                      <div className="text-center py-12 text-zinc-500 text-xs font-mono-code">
                        Nenhum visitante encontrado nesta categoria.
                      </div>
                    ) : (
                      filteredVisitors.map((v) => (
                        <div
                          key={v.id}
                          onClick={() => setSelectedVisitor(v)}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                            selectedVisitor?.id === v.id
                              ? 'bg-[#0c0580] border-[#2f15ed] shadow-md shadow-[#2f15ed]/20'
                              : 'bg-[#070448] border-[#170ba4] hover:bg-[#0c0580]/50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
                                <span>{v.name}</span>
                                {v.syncedToSupabase ? (
                                  <span title="Sincronizado com Supabase" className="text-[10px] text-emerald-400">⚡</span>
                                ) : (
                                  <span title="Armazenado localmente" className="text-[10px] text-zinc-400">💾</span>
                                )}
                              </h4>
                              <p className="text-xs text-zinc-300 font-mono-code">{v.email}</p>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00005c] border border-[#170ba4] text-[#9d90ff] font-mono-code whitespace-nowrap">
                              {new Date(v.createdAt).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          {(v.organization || v.role) && (
                            <div className="mt-2 text-[11px] text-zinc-400 font-sans flex items-center gap-2">
                              {v.organization && (
                                <span className="flex items-center gap-1">
                                  <Building2 className="w-3 h-3 text-[#2f15ed]" />
                                  <span>{v.organization}</span>
                                </span>
                              )}
                              {v.role && (
                                <span className="flex items-center gap-1">
                                  <Briefcase className="w-3 h-3 text-[#9d90ff]" />
                                  <span>{v.role}</span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Right Column: Selected Visitor Detail Card */}
                <div className="w-full md:w-1/2 p-6 overflow-y-auto bg-[#00005c]">
                  {selectedVisitor ? (
                    <div className="space-y-6">
                      <div className="flex items-start justify-between border-b border-[#0c0580] pb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white font-display">{selectedVisitor.name}</h3>
                          <p className="text-xs font-mono-code text-[#9d90ff]">{selectedVisitor.email}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteVisitor(selectedVisitor.id)}
                          className="text-xs font-mono-code text-rose-400 hover:text-rose-300 p-2 rounded-xl bg-rose-500/10 border border-rose-500/20"
                          title="Excluir este visitante"
                        >
                          Excluir Registro
                        </button>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-code">
                        <div className="p-3 rounded-xl bg-[#070448] border border-[#170ba4]">
                          <span className="text-zinc-400 block text-[10px] mb-1">EMPRESA / ÓRGÃO:</span>
                          <span className="text-white font-bold">{selectedVisitor.organization || 'Não informado'}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#070448] border border-[#170ba4]">
                          <span className="text-zinc-400 block text-[10px] mb-1">CARGO / FUNÇÃO:</span>
                          <span className="text-white font-bold">{selectedVisitor.role || 'Não informado'}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#070448] border border-[#170ba4]">
                          <span className="text-zinc-400 block text-[10px] mb-1">MOTIVO DA VISITA:</span>
                          <span className="text-[#9d90ff] font-bold uppercase">{selectedVisitor.reason}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#070448] border border-[#170ba4]">
                          <span className="text-zinc-400 block text-[10px] mb-1">DATA E HORA:</span>
                          <span className="text-white">{new Date(selectedVisitor.createdAt).toLocaleString('pt-BR')}</span>
                        </div>
                      </div>

                      {/* Direct Actions */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <a
                          href={`mailto:${selectedVisitor.email}?subject=Contato%20Portfólio%20Gabriel%20Silva`}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2f15ed] hover:bg-[#2310c8] text-white text-xs font-mono-code font-bold transition-all"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>ENVIAR E-MAIL</span>
                        </a>

                        {selectedVisitor.whatsapp && (
                          <a
                            href={`https://wa.me/${selectedVisitor.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono-code font-bold transition-all"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>WHATSAPP</span>
                          </a>
                        )}

                        {selectedVisitor.linkedin && (
                          <a
                            href={selectedVisitor.linkedin.startsWith('http') ? selectedVisitor.linkedin : `https://${selectedVisitor.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#070448] border border-[#170ba4] text-[#9d90ff] hover:text-white text-xs font-mono-code transition-all"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                            <span>LINKEDIN</span>
                          </a>
                        )}
                      </div>

                      {selectedVisitor.notes && (
                        <div className="p-4 rounded-xl bg-[#070448] border border-[#170ba4]">
                          <span className="text-[10px] font-mono-code text-zinc-400 block mb-1">MENSAGEM / NOTAS:</span>
                          <p className="text-xs text-zinc-200">{selectedVisitor.notes}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 text-zinc-400">
                      <Users className="w-12 h-12 text-[#170ba4] mb-3" />
                      <p className="text-xs font-mono-code">Selecione um visitante na lista para ver os detalhes completos de contato.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: STATS & ANALYTICS */}
            {activeTab === 'stats' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-[#070448] border border-[#170ba4]">
                    <span className="text-xs font-mono-code text-zinc-400 block">TOTAL DE VISITAS</span>
                    <span className="text-3xl font-display font-bold text-white mt-1 block">{stats.total}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#070448] border border-[#170ba4]">
                    <span className="text-xs font-mono-code text-zinc-400 block">RECRUTADORES</span>
                    <span className="text-3xl font-display font-bold text-[#9d90ff] mt-1 block">{stats.recruiters}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#070448] border border-[#170ba4]">
                    <span className="text-xs font-mono-code text-zinc-400 block">EMPRESAS DISTINTAS</span>
                    <span className="text-3xl font-display font-bold text-emerald-400 mt-1 block">{stats.companies}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#070448] border border-[#170ba4]">
                    <span className="text-xs font-mono-code text-zinc-400 block">SINCRONIZADOS</span>
                    <span className="text-3xl font-display font-bold text-cyan-400 mt-1 block">{stats.syncedCount}</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#070448] border border-[#170ba4]">
                  <h4 className="text-sm font-bold text-white font-display mb-4">Como funciona este controle de acessos:</h4>
                  <ul className="space-y-2 text-xs font-mono-code text-zinc-300 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-[#2f15ed]">✔</span>
                      <span><strong>Armazenamento Local Imediato:</strong> Todos os visitantes que preenchem o formulário são guardados de forma segura e imediata no navegador (LocalStorage).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#2f15ed]">✔</span>
                      <span><strong>Sincronização com o Supabase:</strong> Assim que você criar sua conta no Supabase, basta colar a URL e a Chave na aba "Banco Supabase" para que todos os cadastros sejam enviados para a nuvem automaticamente.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#2f15ed]">✔</span>
                      <span><strong>Exportação para Excel:</strong> A qualquer momento você pode clicar em "Exportar CSV" para baixar a lista completa de contatos e abrir no Excel ou Google Sheets.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: SUPABASE CONFIGURATION & SQL */}
            {activeTab === 'supabase' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Supabase Status Banner */}
                <div className="p-5 rounded-2xl bg-[#070448] border border-[#170ba4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2f15ed]/20 border border-[#2f15ed] flex items-center justify-center text-emerald-400">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">Integração Supabase Pronta</h4>
                      <p className="text-xs font-mono-code text-zinc-400">
                        {supabaseCfg.url ? 'Credenciais configuradas' : 'Aguardando credenciais do projeto Supabase'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleTestConnection}
                      disabled={testingSupabase || !supabaseCfg.url}
                      className="px-3.5 py-2 rounded-xl bg-[#2f15ed] hover:bg-[#2310c8] text-white text-xs font-mono-code font-bold transition-all disabled:opacity-50"
                    >
                      {testingSupabase ? 'Testando...' : 'TESTAR CONEXÃO'}
                    </button>

                    <button
                      onClick={handleSyncNow}
                      disabled={syncing || !supabaseCfg.url}
                      className="px-3.5 py-2 rounded-xl bg-[#00005c] hover:bg-[#0c0580] border border-[#170ba4] text-white text-xs font-mono-code transition-all disabled:opacity-50"
                    >
                      {syncing ? 'Sincronizando...' : 'SINCRONIZAR PENDENTES'}
                    </button>
                  </div>
                </div>

                {testResult && (
                  <div className={`p-4 rounded-xl text-xs font-mono-code flex items-start gap-2 ${
                    testResult.success ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                  }`}>
                    {testResult.success ? <CheckCircle2 className="w-4 h-4 mt-0.5" /> : <AlertCircle className="w-4 h-4 mt-0.5" />}
                    <span>{testResult.message}</span>
                  </div>
                )}

                {syncResult && (
                  <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono-code">
                    {syncResult}
                  </div>
                )}

                {/* Form to Input Supabase URL and Key */}
                <div className="p-6 rounded-2xl bg-[#070448] border border-[#170ba4] space-y-4">
                  <h4 className="text-sm font-bold text-white font-display">Credenciais do seu Projeto Supabase:</h4>
                  
                  <div className="space-y-3 text-xs font-mono-code">
                    <div>
                      <label className="block text-zinc-300 mb-1">SUPABASE PROJECT URL:</label>
                      <input
                        type="text"
                        placeholder="https://xyzcompany.supabase.co"
                        value={supabaseCfg.url}
                        onChange={(e) => setSupabaseCfg({ ...supabaseCfg, url: e.target.value })}
                        className="w-full bg-[#00005c] border border-[#170ba4] rounded-xl px-3.5 py-2 text-white outline-none focus:border-[#2f15ed]"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 mb-1">SUPABASE ANON / PUBLIC KEY:</label>
                      <input
                        type="password"
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        value={supabaseCfg.anonKey}
                        onChange={(e) => setSupabaseCfg({ ...supabaseCfg, anonKey: e.target.value })}
                        className="w-full bg-[#00005c] border border-[#170ba4] rounded-xl px-3.5 py-2 text-white outline-none focus:border-[#2f15ed]"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 mb-1">NOME DA TABELA (Padrão: visitors):</label>
                      <input
                        type="text"
                        value={supabaseCfg.tableName}
                        onChange={(e) => setSupabaseCfg({ ...supabaseCfg, tableName: e.target.value })}
                        className="w-full bg-[#00005c] border border-[#170ba4] rounded-xl px-3.5 py-2 text-white outline-none focus:border-[#2f15ed]"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveSupabaseConfig}
                    className="px-5 py-2.5 rounded-xl bg-[#2f15ed] hover:bg-[#2310c8] text-white font-mono-code text-xs font-bold transition-all shadow-md shadow-[#2f15ed]/25"
                  >
                    SALVAR CONFIGURAÇÕES DO SUPABASE
                  </button>
                </div>

                {/* SQL Script Viewer */}
                <div className="p-6 rounded-2xl bg-[#070448] border border-[#170ba4] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">Script SQL para Criar a Tabela no Supabase:</h4>
                      <p className="text-xs font-mono-code text-zinc-400">
                        Copie este script e cole na aba <strong>SQL Editor</strong> do seu Supabase Dashboard:
                      </p>
                    </div>

                    <button
                      onClick={handleCopySQL}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2f15ed] text-white text-xs font-mono-code font-bold transition-all active:scale-95"
                    >
                      {copiedSQL ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSQL ? 'COPIADO!' : 'COPIAR SQL'}</span>
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-[#00005c] border border-[#170ba4] text-[11px] font-mono-code text-[#9d90ff] overflow-x-auto max-h-48 leading-relaxed">
                    {SUPABASE_SQL_MIGRATION}
                  </pre>
                </div>

              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

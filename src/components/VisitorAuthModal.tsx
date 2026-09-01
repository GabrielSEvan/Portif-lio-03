import React, { useState } from 'react';
import { 
  Shield, 
  UserCheck, 
  Building2, 
  Briefcase, 
  Mail, 
  Phone, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  X,
  Linkedin,
  Clock
} from 'lucide-react';
import { registerVisitor, setGateDismissed } from '../services/visitorService';
import { VisitorRecord, VisitorReason } from '../types';

interface VisitorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistered: (visitor: VisitorRecord) => void;
  isRegisteredUser?: boolean;
}

export const VisitorAuthModal: React.FC<VisitorAuthModalProps> = ({
  isOpen,
  onClose,
  onRegistered,
  isRegisteredUser = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    reason: 'recruitment' as VisitorReason,
    whatsapp: '',
    linkedin: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Por favor, informe seu nome completo.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Por favor, informe um e-mail corporativo ou pessoal válido.');
      return;
    }

    setLoading(true);

    try {
      const result = await registerVisitor(formData);
      setLoading(false);

      if (result.success) {
        setSuccessMsg(true);
        onRegistered(result.visitor);
        setTimeout(() => {
          onClose();
          setSuccessMsg(false);
        }, 1200);
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-xl bg-[#00005c] border border-[#170ba4] rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2f15ed] via-[#00f0ff] to-[#ff2e63]" />

        {/* Close button only shown if user is already registered and just editing */}
        {isRegisteredUser && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#070448] text-zinc-400 hover:text-white hover:bg-[#0c0580] transition-colors"
            title="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Header Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#070448] border border-[#170ba4] text-[11px] font-mono-code text-[#9d90ff] mb-3">
            <Lock className="w-3.5 h-3.5 text-[#2f15ed]" />
            <span className="font-bold text-amber-400">CADASTRO OBRIGATÓRIO DE ACESSO</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-tight">
            Portfólio Profissional de <br />
            <span className="text-gradient-accent">Gabriel Silva Evangelista</span>
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            Identifique-se abaixo para liberar o acesso irrestrito ao portfólio, projetos de Inteligência Artificial, processos no DEC e currículo completo.
          </p>
        </div>

        {/* Success State */}
        {successMsg ? (
          <div className="py-10 flex flex-col items-center justify-center text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">Acesso Liberado com Sucesso!</h3>
            <p className="text-xs text-zinc-300 font-mono-code">
              Bem-vindo(a), {formData.name.split(' ')[0]}. Redirecionando para o portfólio...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono-code">
                {errorMsg}
              </div>
            )}

            {/* Grid Nome & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono-code text-zinc-300 mb-1">
                  Seu Nome Completo *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ana Clara Rodrigues"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#070448] border border-[#170ba4] focus:border-[#2f15ed] focus:ring-1 focus:ring-[#2f15ed] text-white text-xs rounded-xl px-3 py-2.5 outline-none transition-all placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono-code text-zinc-300 mb-1">
                  E-mail de Contato *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Ex: ana.recrutamento@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#070448] border border-[#170ba4] focus:border-[#2f15ed] focus:ring-1 focus:ring-[#2f15ed] text-white text-xs rounded-xl px-3 py-2.5 outline-none transition-all placeholder:text-zinc-500"
                  />
                </div>
              </div>
            </div>

            {/* Grid Empresa & Cargo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono-code text-zinc-300 mb-1">
                  Empresa / Organização / Batalhão
                </label>
                <input
                  type="text"
                  placeholder="Ex: Tech Corp, Exército, Consultoria"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full bg-[#070448] border border-[#170ba4] focus:border-[#2f15ed] focus:ring-1 focus:ring-[#2f15ed] text-white text-xs rounded-xl px-3 py-2.5 outline-none transition-all placeholder:text-zinc-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-code text-zinc-300 mb-1">
                  Cargo / Função
                </label>
                <input
                  type="text"
                  placeholder="Ex: Recrutador(a), Gerente, Tech Lead"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-[#070448] border border-[#170ba4] focus:border-[#2f15ed] focus:ring-1 focus:ring-[#2f15ed] text-white text-xs rounded-xl px-3 py-2.5 outline-none transition-all placeholder:text-zinc-500"
                />
              </div>
            </div>

            {/* Motivo da Visita */}
            <div>
              <label className="block text-[11px] font-mono-code text-zinc-300 mb-1">
                Objetivo / Motivo do Acesso *
              </label>
              <select
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value as VisitorReason })}
                className="w-full bg-[#070448] border border-[#170ba4] focus:border-[#2f15ed] text-white text-xs rounded-xl px-3 py-2.5 outline-none transition-all"
              >
                <option value="recruitment">🎯 Recrutamento / Vaga / Oportunidade</option>
                <option value="networking">🤝 Conexão Profissional / Networking</option>
                <option value="military">🎖️ Conhecer Trajetória no Exército / DEC</option>
                <option value="partnership">💼 Parceria / Consultoria em IA & Processos</option>
                <option value="evaluation">🔍 Avaliação de Portfólio / Projetos</option>
                <option value="curiosity">✨ Conhecer o Trabalho & Tecnologia</option>
                <option value="other">💬 Outro Motivo</option>
              </select>
            </div>

            {/* Contato Opcional (WhatsApp / LinkedIn) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono-code text-zinc-300 mb-1 flex items-center gap-1.5">
                  <span>WhatsApp / Telefone (Opcional)</span>
                </label>
                <input
                  type="text"
                  placeholder="(61) 99999-9999"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full bg-[#070448] border border-[#170ba4] focus:border-[#2f15ed] text-white text-xs rounded-xl px-3 py-2 outline-none transition-all placeholder:text-zinc-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-code text-zinc-300 mb-1 flex items-center gap-1.5">
                  <span>LinkedIn (Opcional)</span>
                </label>
                <input
                  type="text"
                  placeholder="linkedin.com/in/seunome"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full bg-[#070448] border border-[#170ba4] focus:border-[#2f15ed] text-white text-xs rounded-xl px-3 py-2 outline-none transition-all placeholder:text-zinc-500"
                />
              </div>
            </div>

            {/* Ação Obrigatória de Cadastro */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2f15ed] hover:bg-[#240fbe] active:scale-[0.99] text-white font-mono-code text-xs font-bold shadow-lg shadow-[#2f15ed]/40 transition-all cursor-pointer"
              >
                {loading ? (
                  <span>Registrando e liberando acesso...</span>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>CADASTRAR E ACESSAR O PORTFÓLIO</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
              <p className="text-[10px] text-zinc-400 font-mono-code text-center mt-2">
                🔒 Seus dados serão mantidos em segurança e utilizados apenas para controle de visitas e contato profissional.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};


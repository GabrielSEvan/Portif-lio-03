import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { ChromaticName } from './ChromaticName';
import { 
  Shield, 
  ArrowUpRight, 
  FileText, 
  Copy, 
  Check, 
  MapPin,
  ArrowDown,
  Sparkles
} from 'lucide-react';

interface HeroSectionProps {
  onOpenCV: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCV }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] flex flex-col justify-between pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 overflow-hidden border-b border-[#170ba4]/50"
    >
      {/* Sutil iluminação de fundo suave */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#2f15ed]/8 rounded-full blur-[180px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#170ba4]/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Badges de Identificação Direta */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#070448] border border-[#170ba4] text-xs font-mono-code text-[#9d90ff]">
              <Shield className="w-3.5 h-3.5 text-[#2f15ed]" />
              <span>SOLDADO DO EXÉRCITO BRASILEIRO • DEC</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00005c] border border-[#170ba4] text-xs font-mono-code text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-[#2f15ed]" />
              <span>BRASÍLIA, DF — BRASIL</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#070448] border border-[#170ba4] text-xs font-mono-code text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>DISPONÍVEL PARA NOVAS OPORTUNIDADES</span>
          </div>
        </div>

        {/* Bloco Principal do Nome e Apresentação com amplo espaçamento */}
        <div className="max-w-5xl mb-14">
          <p className="font-mono-code text-xs sm:text-sm text-zinc-400 tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="h-px w-8 bg-[#2f15ed]"></span>
            <span>OLÁ, SEJA BEM-VINDO AO MEU ESPAÇO PROFISSIONAL</span>
          </p>

          {/* Nome com Efeito Interativo de Distorção de Cores / Ilusão Óptica */}
          <div className="mb-8">
            <ChromaticName 
              firstName="GABRIEL SILVA" 
              lastName="Evangelista" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-200 font-normal leading-relaxed">
                20 anos. Atuo com rigor, integridade e organização no <strong className="text-white font-semibold">Exército Brasileiro como Protocolista no DEC</strong>. 
                Desenvolvendo soluções práticas e estruturadas em <strong className="text-[#9d90ff] font-medium">Gestão de Pessoas</strong>, <strong className="text-[#9d90ff] font-medium">Mapeamento de Processos</strong> e <strong className="text-[#9d90ff] font-medium">Inteligência Artificial</strong>.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end space-y-3 bg-[#070448] p-5 rounded-2xl border border-[#170ba4] font-mono-code text-xs text-zinc-300">
              <div className="flex justify-between items-center border-b border-[#0c0580] pb-2.5">
                <span className="text-zinc-400">CARGO ATUAL:</span>
                <span className="text-white font-medium">Protocolista DEC / EB</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#0c0580] pb-2.5">
                <span className="text-zinc-400">FORMAÇÃO:</span>
                <span className="text-white font-medium">IA + Gestão & Liderança</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">LOCALIZAÇÃO:</span>
                <span className="text-[#9d90ff] font-semibold">Brasília, DF</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação com excelente espaçamento e acabamento sóbrio */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            id="hero-work-cta"
            href="#trabalhos"
            className="group flex items-center gap-2 px-7 py-4 rounded-xl bg-[#2f15ed] hover:bg-[#2310c8] text-white font-mono-code font-bold text-xs sm:text-sm tracking-wider shadow-md shadow-[#2f15ed]/25 transition-all duration-200 active:scale-95"
          >
            <span>VER PROJETOS & HISTÓRICO</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </a>

          <a
            id="hero-contact-cta"
            href="#contato"
            className="group flex items-center gap-2 px-6 py-4 rounded-xl bg-[#070448] hover:bg-[#0c0580] text-white font-mono-code font-medium text-xs sm:text-sm tracking-wider border border-[#170ba4] hover:border-[#2f15ed] transition-all duration-200 active:scale-95"
          >
            <span>ENTRAR EM CONTATO</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#9d90ff]" />
          </a>

          <button
            id="hero-cv-cta"
            onClick={onOpenCV}
            className="flex items-center gap-2 px-6 py-4 rounded-xl bg-[#00005c] hover:bg-[#070448] text-zinc-200 hover:text-white font-mono-code text-xs sm:text-sm tracking-wider border border-[#170ba4] transition-all duration-200 active:scale-95"
          >
            <FileText className="w-4 h-4 text-[#9d90ff]" />
            <span>VISUALIZAR CURRÍCULO</span>
          </button>

          {/* Botão de Copiar E-mail */}
          <button
            id="hero-copy-email"
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-5 py-4 rounded-xl bg-[#00005c] hover:bg-[#070448] border border-[#170ba4] text-xs font-mono-code text-zinc-300 hover:text-white transition-all active:scale-95"
            title="Copiar e-mail para a área de transferência"
          >
            {copiedEmail ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 font-semibold">E-MAIL COPIADO!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#9d90ff]" />
                <span>COPIAR E-MAIL</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Faixa inferior de navegação suave */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 pt-8 border-t border-[#170ba4]/40 flex items-center justify-between text-xs font-mono-code text-zinc-400">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#2f15ed]"></span>
          <span>ROLE A PÁGINA PARA EXPLORAR A TRAJETÓRIA E HABILIDADES</span>
        </div>
        <div className="hidden md:flex items-center gap-5 text-[11px]">
          <span>[ GESTÃO DE PESSOAS ]</span>
          <span>[ PROTOCOLO INSTITUCIONAL ]</span>
          <span>[ INTELIGÊNCIA ARTIFICIAL ]</span>
        </div>
      </div>
    </section>
  );
};

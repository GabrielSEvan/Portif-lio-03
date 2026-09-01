import React from 'react';
import { 
  UserCheck, 
  UserPlus, 
  ShieldCheck, 
  FileText, 
  Send, 
  ArrowUp
} from 'lucide-react';
import { VisitorRecord } from '../types';

interface VisitorFloatingBadgeProps {
  currentVisitor: VisitorRecord | null;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
  onOpenCV: () => void;
}

export const VisitorFloatingBadge: React.FC<VisitorFloatingBadgeProps> = ({
  currentVisitor,
  onOpenAuth,
  onOpenAdmin,
  onOpenCV,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      
      {/* Floating Action Bar */}
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#00005c]/95 border border-[#170ba4] shadow-2xl backdrop-blur-md">
        
        {/* Visitor Status / Identification trigger */}
        <button
          onClick={onOpenAuth}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-code transition-all ${
            currentVisitor 
              ? 'bg-[#070448] text-[#9d90ff] hover:text-white border border-[#2f15ed]/50' 
              : 'bg-[#2f15ed] text-white font-bold hover:bg-[#240fbe] shadow-md shadow-[#2f15ed]/25'
          }`}
          title={currentVisitor ? `Identificado como ${currentVisitor.name}. Clique para editar.` : 'Registrar sua visita'}
        >
          {currentVisitor ? (
            <>
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="max-w-[130px] truncate">{currentVisitor.name.split(' ')[0]}</span>
            </>
          ) : (
            <>
              <UserPlus className="w-3.5 h-3.5" />
              <span>Identificar-se</span>
            </>
          )}
        </button>

        {/* Quick CV Button */}
        <button
          onClick={onOpenCV}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#070448] hover:bg-[#0c0580] text-zinc-300 hover:text-white text-xs font-mono-code border border-[#170ba4] transition-all"
          title="Ver Currículo Completo"
        >
          <FileText className="w-3.5 h-3.5 text-[#9d90ff]" />
          <span className="hidden sm:inline">CV</span>
        </button>

        {/* Quick Contact Button */}
        <a
          href="#contato"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#070448] hover:bg-[#0c0580] text-zinc-300 hover:text-white text-xs font-mono-code border border-[#170ba4] transition-all"
          title="Ir para Contato"
        >
          <Send className="w-3.5 h-3.5 text-[#2f15ed]" />
        </a>

        {/* Gabriel Admin Dashboard Access */}
        <button
          onClick={onOpenAdmin}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#070448] hover:bg-[#2f15ed] text-zinc-400 hover:text-white text-xs font-mono-code border border-[#170ba4] transition-all"
          title="Painel Administrativo do Gabriel (Controle de Visitantes)"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden md:inline text-[10px]">ADMIN</span>
        </button>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          className="p-1.5 rounded-full bg-[#070448] hover:bg-[#0c0580] text-zinc-400 hover:text-white transition-all"
          title="Voltar ao Topo"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

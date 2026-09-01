import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#00005c] border-t border-[#170ba4] pt-20 pb-16 text-zinc-400 font-mono-code text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Faixa animada superior */}
        <div className="overflow-hidden border-y border-[#170ba4] py-3.5 mb-16 bg-[#020228]">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs tracking-widest text-[#9d90ff]">
            <span>[ GABRIEL SILVA EVANGELISTA ]</span>
            <span>•</span>
            <span>SOLDADO DO EXÉRCITO BRASILEIRO</span>
            <span>•</span>
            <span>PROTOCOLISTA NO DEC</span>
            <span>•</span>
            <span>GESTÃO DE PESSOAS</span>
            <span>•</span>
            <span>MAPEAMENTO DE PROCESSOS</span>
            <span>•</span>
            <span>INTELIGÊNCIA ARTIFICIAL</span>
            <span>•</span>
            <span>DISCIPLINA &amp; ÉTICA</span>
            <span>•</span>
            <span>BRASÍLIA — DF</span>
            <span>•</span>
            <span>[ GABRIEL SILVA EVANGELISTA ]</span>
            <span>•</span>
            <span>SOLDADO DO EXÉRCITO BRASILEIRO</span>
            <span>•</span>
            <span>PROTOCOLISTA NO DEC</span>
          </div>
        </div>

        {/* Linha Principal do Rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-16">
          
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2f15ed] to-[#170ba4] p-[1px]">
                <div className="w-full h-full bg-[#00005c] rounded-[10px] flex items-center justify-center font-bold text-white text-xs">
                  GE
                </div>
              </div>
              <span className="font-display font-bold text-white text-lg tracking-tight">
                Gabriel Silva Evangelista
              </span>
            </div>
            <p className="text-zinc-300 max-w-md font-sans text-xs sm:text-sm leading-relaxed">
              Soldado do Exército Brasileiro atuando no Protocolo do Departamento de Engenharia e Construção (DEC). Dedicado ao aperfeiçoamento contínuo em Gestão, Processos e Soluções Tecnológicas.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="text-white font-bold block mb-3">[ NAVEGAÇÃO ]</span>
            <div className="flex flex-col space-y-2 text-zinc-300">
              <a href="#trabalhos" className="hover:text-[#9d90ff] transition-colors">01. Projetos &amp; Trabalhos</a>
              <a href="#sobre" className="hover:text-[#9d90ff] transition-colors">02. Sobre Mim &amp; Filosofia</a>
              <a href="#experiencia" className="hover:text-[#9d90ff] transition-colors">03. Histórico Profissional</a>
              <a href="#formacao" className="hover:text-[#9d90ff] transition-colors">04. Formação &amp; Cursos</a>
              <a href="#competencias" className="hover:text-[#9d90ff] transition-colors">05. Matriz de Habilidades</a>
              <a href="#contato" className="hover:text-[#9d90ff] transition-colors">06. Canal de Contato</a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="text-white font-bold block mb-3">[ LOCALIZAÇÃO &amp; BASE ]</span>
            <div className="text-zinc-300 space-y-1.5 leading-relaxed">
              <p>Brasília, Distrito Federal — Brasil</p>
              <p>Departamento de Engenharia e Construção (DEC)</p>
              <p className="text-[#9d90ff] pt-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                Disponível para novas oportunidades
              </p>
            </div>
          </div>

        </div>

        {/* Direitos Autorais & Voltar ao Topo */}
        <div className="pt-8 border-t border-[#170ba4] flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400">
          <div>
            <span>© {new Date().getFullYear()} Gabriel Silva Evangelista. Todos os direitos reservados.</span>
          </div>

          <button
            id="footer-back-to-top"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#070448] hover:bg-[#0c0580] border border-[#170ba4] text-zinc-200 hover:text-white transition-all active:scale-95"
          >
            <span>VOLTAR AO TOPO</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#2f15ed]" />
          </button>
        </div>

      </div>
    </footer>
  );
};

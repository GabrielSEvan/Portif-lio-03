import React, { useState } from 'react';
import { personalEndeavors } from '../data/portfolioData';
import { 
  Music, 
  Flame, 
  Sparkles, 
  Laptop, 
  Quote, 
  Play, 
  Pause, 
  Heart, 
  ArrowRight,
  Compass,
  Volume2,
  CheckCircle,
  Lightbulb
} from 'lucide-react';

export const ProjectsAndAspirations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'musica' | 'esporte' | 'tecnologia'>('musica');
  const [isPlayingSnippet, setIsPlayingSnippet] = useState(false);

  return (
    <section 
      id="projetos" 
      className="py-20 lg:py-28 relative border-t border-[#1e172e] bg-[#0c0a13]"
    >
      {/* Glow */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#830cc4]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181326] border border-[#2e234a] text-xs font-mono-code text-[#c084fc] mb-3">
            <span>05 // DIMENSÃO PESSOAL & PROJETOS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight mb-4">
            Projetos de Vida, Criatividade <br className="hidden sm:block" />
            <span className="text-gradient-purple">& Lições de Persistência</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
            "Embora alguns caminhos não tenham seguido adiante, essas experiências contribuíram para que eu aprendesse sobre dedicação, iniciativa e persistência."
          </p>
        </div>

        {/* 3 Major Dimension Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Música Gospel */}
          <div 
            id="endeavor-card-music"
            className="p-6 sm:p-7 rounded-2xl bg-[#130f1f] border border-[#271d3c] hover:border-[#830cc4]/70 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#23173a] flex items-center justify-center text-[#c084fc] group-hover:bg-[#830cc4] group-hover:text-white transition-all">
                  <Music className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono-code px-2.5 py-0.5 rounded-full bg-[#1f1730] text-[#c084fc] border border-[#372659]">
                  Autoral & Fé
                </span>
              </div>

              <h3 className="text-xl font-display font-bold text-white mb-2">
                Músicas Gospel Autorais
              </h3>
              <p className="text-xs text-[#a49fb2] leading-relaxed mb-4">
                Desenvolvi composições gospel autorais escritas, aprimorando sensibilidade poética, escolha métrica das palavras e expressão de fé.
              </p>

              {/* Interactive Lyrics Snippet Box */}
              <div className="p-4 rounded-xl bg-[#1b1429] border border-[#2f2249] space-y-2 mb-4">
                <div className="flex items-center justify-between text-[11px] font-mono-code text-[#a855f7]">
                  <span className="flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" /> Trechos de Letras Autorais
                  </span>
                </div>
                <div className="text-xs italic text-[#e3e0ef] space-y-1.5 pt-1">
                  <p>“Em cada passo dado, há um propósito a ser construído...”</p>
                  <p>“A força para seguir em frente nasce da fé e da persistência diária.”</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#231b34]">
              <div className="text-[11px] font-mono-code text-[#c084fc] mb-1">Aprendizado:</div>
              <p className="text-xs text-[#8f8a9d]">
                Paciência no processo criativo, dedicação individual e comunicação com sensibilidade.
              </p>
            </div>
          </div>

          {/* Card 2: Esportes & Superação */}
          <div 
            id="endeavor-card-sports"
            className="p-6 sm:p-7 rounded-2xl bg-[#130f1f] border border-[#271d3c] hover:border-[#830cc4]/70 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#23173a] flex items-center justify-center text-[#c084fc] group-hover:bg-[#830cc4] group-hover:text-white transition-all">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono-code px-2.5 py-0.5 rounded-full bg-[#1f1730] text-[#c084fc] border border-[#372659]">
                  Saúde & Resiliência
                </span>
              </div>

              <h3 className="text-xl font-display font-bold text-white mb-2">
                Esportes & Jogos
              </h3>
              <p className="text-xs text-[#a49fb2] leading-relaxed mb-4">
                A prática de esportes e jogos sempre fez parte da minha vida, ensinando sobre limites, trabalho em equipe e superação de adversidades.
              </p>

              <div className="p-4 rounded-xl bg-[#1b1429] border border-[#2f2249] space-y-2 mb-4">
                <div className="text-[11px] font-mono-code text-[#a855f7]">Pilares Cultivados:</div>
                <ul className="space-y-1 text-xs text-[#d1cee0]">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#830cc4]" />
                    <span>Disciplina e resistência física e mental</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#830cc4]" />
                    <span>Espírito esportivo e convivência saudável</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#830cc4]" />
                    <span>Lazer com amigos e família</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#231b34]">
              <div className="text-[11px] font-mono-code text-[#c084fc] mb-1">Aprendizado:</div>
              <p className="text-xs text-[#8f8a9d]">
                O resultado é fruto da constância. Superar o cansaço para alcançar o objetivo.
              </p>
            </div>
          </div>

          {/* Card 3: Tecnologia, IA & Soluções Digitais */}
          <div 
            id="endeavor-card-tech"
            className="p-6 sm:p-7 rounded-2xl bg-[#151024] border border-[#39285c] hover:border-[#830cc4] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#830cc4]/15 rounded-full blur-xl"></div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#2e1c4e] flex items-center justify-center text-[#c084fc] group-hover:bg-[#830cc4] group-hover:text-white transition-all">
                  <Laptop className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono-code px-2.5 py-0.5 rounded-full bg-[#2a1b47] text-[#e0b8ff] border border-[#52338c]">
                  Futuro & Criação
                </span>
              </div>

              <h3 className="text-xl font-display font-bold text-white mb-2">
                Criação Digital & IA
              </h3>
              <p className="text-xs text-[#a49fb2] leading-relaxed mb-4">
                Exploração e criação de sites modernos, portfólios, aplicativos e automação com Inteligência Artificial para agregar valor real.
              </p>

              <div className="p-4 rounded-xl bg-[#1f1633] border border-[#3a275f] space-y-2 mb-4">
                <div className="text-[11px] font-mono-code text-[#c084fc]">Frentes em Prática:</div>
                <ul className="space-y-1 text-xs text-[#dcd7ed]">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#a855f7]" />
                    <span>Design e estrutura de portfólios modernos</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#a855f7]" />
                    <span>Engenharia de prompts & IA Generativa</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#a855f7]" />
                    <span>Mapeamento de soluções para processos reais</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#312350]">
              <div className="text-[11px] font-mono-code text-[#c084fc] mb-1">Aprendizado:</div>
              <p className="text-xs text-[#aba5bd]">
                Aprender fazendo. Curiosidade contínua e aplicação prática em ferramentas digitais.
              </p>
            </div>
          </div>

        </div>

        {/* Future Horizon Statement Quote Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#18112b] via-[#120d20] to-[#0d0917] border border-[#342457] relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono-code text-[#a855f7] uppercase tracking-wider">
                Visão de Longo Prazo
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                "Meu principal objetivo é continuar aprendendo, adquirir novas experiências e construir um futuro cada vez melhor."
              </h3>
              <p className="text-xs sm:text-sm text-[#9ca3af]">
                Pronto para contribuir com ética, disciplina e dedicação inabalável em novos desafios profissionais.
              </p>
            </div>

            <a
              href="#contato"
              className="shrink-0 px-6 py-3.5 rounded-xl bg-[#830cc4] hover:bg-[#9918df] text-white font-semibold text-sm shadow-lg shadow-[#830cc4]/30 transition-all flex items-center gap-2"
            >
              <span>Vamos Conversar</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

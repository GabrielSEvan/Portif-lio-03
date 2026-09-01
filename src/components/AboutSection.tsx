import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  ShieldCheck, 
  Quote, 
  Music, 
  Activity, 
  Users,
  Award
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'perfil' | 'gestao' | 'vida'>('perfil');

  return (
    <section 
      id="sobre" 
      className="py-32 lg:py-40 relative border-b border-[#170ba4]/50 bg-[#020228]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-[#170ba4]/40 pb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070448] border border-[#170ba4] text-xs font-mono-code text-[#9d90ff] mb-5">
              <span className="text-[#2f15ed] font-bold">[ 02 ]</span>
              <span>SOBRE MIM & PRINCÍPIOS</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Movido pela <span className="font-serif-accent italic font-normal text-gradient-accent">Disciplina</span>, <br />
              Guiado pelo Propósito
            </h2>
          </div>

          {/* Seletor de Abas em Português */}
          <div className="flex flex-wrap bg-[#00005c] p-1.5 rounded-2xl border border-[#170ba4] w-fit font-mono-code text-xs gap-1">
            {[
              { id: 'perfil', label: '[ 01 ] BIOGRAFIA' },
              { id: 'gestao', label: '[ 02 ] FILOSOFIA DE GESTÃO' },
              { id: 'vida', label: '[ 03 ] MÚSICA & ESPORTES' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl transition-all active:scale-95 ${
                  activeTab === tab.id
                    ? 'bg-[#2f15ed] text-white font-bold shadow-md shadow-[#2f15ed]/25'
                    : 'text-zinc-400 hover:text-white hover:bg-[#070448]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Aba 1: Biografia */}
        {activeTab === 'perfil' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start animate-in fade-in duration-300">
            {/* Texto Biográfico */}
            <div className="lg:col-span-7 bg-[#070448] p-8 sm:p-10 rounded-2xl border border-[#170ba4] space-y-6">
              <div className="flex items-center justify-between border-b border-[#0c0580] pb-4">
                <span className="font-mono-code text-xs text-[#2f15ed] font-bold">MINHA TRAJETÓRIA</span>
                <span className="text-xs font-mono-code text-zinc-400">20 ANOS • BRASÍLIA, DF</span>
              </div>

              <div className="space-y-4 text-zinc-200 text-sm sm:text-base leading-relaxed font-sans">
                <p>
                  Meu nome é <strong className="text-white font-semibold">Gabriel Silva Evangelista</strong>, tenho 20 anos e busco crescer profissionalmente, descobrir novas possibilidades e ser uma pessoa útil, confiável e capaz de agregar valor onde estiver atuando.
                </p>
                <p>
                  Atualmente, atuo com rigor e responsabilidade como <strong className="text-[#9d90ff] font-medium">Soldado do Exército Brasileiro e Protocolista no Departamento de Engenharia e Construção (DEC)</strong>. Essa vivência fortaleceu minha capacidade de cumprir normas, manter sigilo institucional, zelar pela pontualidade e garantir a rastreabilidade integral de processos oficiais.
                </p>
                <p>
                  Anteriormente, atuei na <strong className="text-white font-medium">Escola Montessori</strong> através do programa <strong className="text-white font-medium">CIEE</strong>, prestando suporte à coordenação pedagógica, organizando arquivos e desenvolvendo atendimento humanizado com professores, pais e alunos.
                </p>
                <p>
                  Tenho perfil analítico, facilidade de adaptação rápida e foco permanente em <strong className="text-[#9d90ff] font-medium">Gestão de Pessoas</strong> e <strong className="text-[#9d90ff] font-medium">Inteligência Artificial</strong>.
                </p>
              </div>

              {/* Indicadores Chave */}
              <div className="pt-6 border-t border-[#0c0580] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 rounded-xl bg-[#00005c] border border-[#170ba4]">
                  <span className="block font-mono-code text-lg font-bold text-white">20</span>
                  <span className="text-[11px] font-mono-code text-zinc-400">ANOS</span>
                </div>
                <div className="p-4 rounded-xl bg-[#00005c] border border-[#170ba4]">
                  <span className="block font-mono-code text-lg font-bold text-[#9d90ff]">DEC / EB</span>
                  <span className="text-[11px] font-mono-code text-zinc-400">PROTOCOLO</span>
                </div>
                <div className="p-4 rounded-xl bg-[#00005c] border border-[#170ba4]">
                  <span className="block font-mono-code text-lg font-bold text-white">05+</span>
                  <span className="text-[11px] font-mono-code text-zinc-400">CURSOS</span>
                </div>
                <div className="p-4 rounded-xl bg-[#00005c] border border-[#170ba4]">
                  <span className="block font-mono-code text-lg font-bold text-[#9d90ff]">100%</span>
                  <span className="text-[11px] font-mono-code text-zinc-400">DEDICAÇÃO</span>
                </div>
              </div>
            </div>

            {/* Valores e Pilares */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-mono-code text-xs text-zinc-400 tracking-wider uppercase border-b border-[#0c0580] pb-3 mb-2">
                VALORES & PRINCÍPIOS FUNDAMENTAIS
              </h3>

              {personalInfo.coreValues.map((val, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#070448] border border-[#170ba4] hover:border-[#2f15ed] transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#00005c] border border-[#170ba4] flex items-center justify-center text-[#9d90ff] group-hover:bg-[#2f15ed] group-hover:text-white transition-all shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-display font-bold text-white">
                      {val.title}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed pl-11">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aba 2: Filosofia de Gestão */}
        {activeTab === 'gestao' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start animate-in fade-in duration-300">
            <div className="lg:col-span-8 bg-[#070448] p-8 sm:p-12 rounded-2xl border border-[#170ba4] relative overflow-hidden">
              <Quote className="w-16 h-16 text-[#2f15ed]/10 absolute -top-2 -left-2 pointer-events-none" />

              <span className="font-mono-code text-xs text-[#9d90ff] block mb-5">
                [ VISÃO DE LIDERANÇA & GESTÃO ]
              </span>

              <blockquote className="font-serif-accent text-2xl sm:text-3xl lg:text-4xl text-white italic leading-relaxed mb-8">
                “Uma boa gestão depende não apenas de conhecimento técnico, mas de <span className="text-[#d3ceff]">saber ouvir, compreender as pessoas</span>, organizar processos e buscar soluções conjuntas.”
              </blockquote>

              <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-[#0c0580] pt-6">
                <p>
                  Acredito que os melhores resultados nascem da harmonia entre <strong>processos bem definidos</strong> e <strong>pessoas motivadas, ouvidas e respeitadas</strong>.
                </p>
                <p>
                  Minha postura une a disciplina operacional e o rigor às normas aprendidos no serviço militar à empatia e escuta ativa desenvolvidas na formação de Chefia & Liderança e na atuação na Escola Montessori/CIEE.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="p-6 rounded-2xl bg-[#070448] border border-[#170ba4]">
                <span className="text-[10px] font-mono-code text-[#2f15ed] font-bold block mb-1">01. ESCUTA ATIVA</span>
                <h4 className="text-base font-bold text-white mb-2">Compreender para Agir</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Identificar a raiz dos problemas ouvindo com atenção quem está na linha de execução.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#070448] border border-[#170ba4]">
                <span className="text-[10px] font-mono-code text-[#2f15ed] font-bold block mb-1">02. MAPEAMENTO CLARO</span>
                <h4 className="text-base font-bold text-white mb-2">Rastreabilidade & Prazos</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Estruturar etapas, eliminar redundâncias e garantir que cada processo tenha clareza de entrega.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#070448] border border-[#170ba4]">
                <span className="text-[10px] font-mono-code text-[#2f15ed] font-bold block mb-1">03. TECNOLOGIA & IA</span>
                <h4 className="text-base font-bold text-white mb-2">Automação & Inteligência</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Integrar ferramentas modernas de IA para acelerar tarefas mecânicas e focar na estratégia humana.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Aba 3: Música & Esportes */}
        {activeTab === 'vida' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start animate-in fade-in duration-300">
            {/* Música */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#070448] border border-[#170ba4] space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#00005c] border border-[#170ba4] flex items-center justify-center text-[#9d90ff]">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono-code text-[#2f15ed] font-bold">CRIATIVIDADE & FÉ</span>
                  <h3 className="text-xl font-display font-bold text-white">Composições Gospel Autorais</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Ao longo da minha vida, dedico-me a escrever letras de músicas gospel autorais. Essa prática me ensinou sensibilidade poética, escolha cuidadosa de palavras, paciência no processo de criação e persistência para transmitir mensagens que tocam vidas.
              </p>

              <div className="p-5 rounded-xl bg-[#00005c] border border-[#170ba4] space-y-2 italic font-serif-accent text-sm text-zinc-200">
                <p>“Em cada passo dado, vejo a mão que me sustenta...”</p>
                <p>“A força não vem do homem, mas da graça que renova a esperança.”</p>
                <p>“Mesmo em silêncio, a jornada constrói o propósito.”</p>
              </div>
            </div>

            {/* Esportes */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#070448] border border-[#170ba4] space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#00005c] border border-[#170ba4] flex items-center justify-center text-[#9d90ff]">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono-code text-[#2f15ed] font-bold">DISCIPLINA & CORPO</span>
                  <h3 className="text-xl font-display font-bold text-white">Treinamento Físico & Superação</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                A prática de esportes e a rotina do Treinamento Físico Militar (TFM) no Exército fortalecem minha resiliência, senso de superação de limites e espírito esportivo. É a base que mantém minha mente focada, clara e equilibrada.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#00005c] border border-[#170ba4]">
                  <span className="text-[11px] font-mono-code text-[#9d90ff] block mb-1">RESILIÊNCIA</span>
                  <span className="text-xs text-zinc-300">Firmeza e foco sob pressão física e mental.</span>
                </div>
                <div className="p-4 rounded-xl bg-[#00005c] border border-[#170ba4]">
                  <span className="text-[11px] font-mono-code text-[#9d90ff] block mb-1">ESPÍRITO DE EQUIPE</span>
                  <span className="text-xs text-zinc-300">Cooperação e lealdade com o time.</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

import React from 'react';
import { experiences } from '../data/portfolioData';
import { Shield, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section 
      id="experiencia" 
      className="py-32 lg:py-40 relative border-b border-[#170ba4]/50 bg-[#020228]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-[#170ba4]/40 pb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070448] border border-[#170ba4] text-xs font-mono-code text-[#9d90ff] mb-5">
              <span className="text-[#2f15ed] font-bold">[ 03 ]</span>
              <span>HISTÓRICO PROFISSIONAL</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Experiência <span className="font-serif-accent italic font-normal text-gradient-accent">Institucional</span> & <br />
              Serviço Militar
            </h2>
          </div>

          <p className="text-sm sm:text-base text-zinc-300 max-w-md font-normal leading-relaxed">
            Trajetória construída sobre pilares de seriedade, disciplina hierárquica, protocolo institucional e suporte operacional dedicado.
          </p>
        </div>

        {/* Linha do Tempo Espaçada */}
        <div className="space-y-10">
          {experiences.map((exp, index) => {
            const isMilitary = exp.iconType === 'military';

            return (
              <div 
                key={exp.id}
                className="group p-8 sm:p-10 rounded-2xl bg-[#070448] border border-[#170ba4] hover:border-[#2f15ed] transition-all duration-300 relative overflow-hidden"
              >
                {/* Linha de Destaque Suave */}
                <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#2f15ed] to-[#170ba4]"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Coluna Esquerda: Organização & Período */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-2 font-mono-code text-xs text-[#9d90ff]">
                      <span className="text-[#2f15ed] font-bold">[ 0{index + 1} ]</span>
                      <span className="uppercase">{exp.type}</span>
                    </div>

                    <h3 className="text-2xl font-display font-bold text-white">
                      {exp.organization}
                    </h3>

                    {exp.department && (
                      <div className="inline-block px-3 py-1 rounded-lg bg-[#00005c] text-xs font-mono-code text-[#d3ceff] border border-[#170ba4]">
                        {exp.department}
                      </div>
                    )}

                    <div className="space-y-1.5 text-xs font-mono-code text-zinc-400 pt-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#2f15ed]" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#2f15ed]" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Coluna Direita: Cargo & Destaques */}
                  <div className="lg:col-span-8 space-y-5">
                    <div className="flex items-center justify-between border-b border-[#0c0580] pb-4">
                      <span className="text-xl font-bold text-white">
                        {exp.role}
                      </span>
                      {isMilitary && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00005c] border border-[#170ba4] text-xs font-mono-code text-[#9d90ff]">
                          <Shield className="w-3.5 h-3.5 text-[#2f15ed]" />
                          <span>MISSÃO ATIVA</span>
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Destaques */}
                    <div className="space-y-3 pt-2">
                      <span className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider block">
                        Destaques da Atuação:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {exp.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-200 bg-[#00005c] p-3.5 rounded-xl border border-[#170ba4]">
                            <CheckCircle2 className="w-4 h-4 text-[#2f15ed] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

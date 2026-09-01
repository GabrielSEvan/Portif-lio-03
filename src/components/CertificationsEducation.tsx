import React from 'react';
import { educationAndCertificates } from '../data/portfolioData';
import { GraduationCap, Award, CheckCircle, Sparkles, BookOpen } from 'lucide-react';

export const CertificationsEducation: React.FC = () => {
  return (
    <section 
      id="formacao" 
      className="py-32 lg:py-40 relative border-b border-[#170ba4]/50 bg-[#020228]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-[#170ba4]/40 pb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070448] border border-[#170ba4] text-xs font-mono-code text-[#9d90ff] mb-5">
              <span className="text-[#2f15ed] font-bold">[ 04 ]</span>
              <span>QUALIFICAÇÕES & FORMAÇÃO</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Formação & <br />
              <span className="font-serif-accent italic font-normal text-gradient-accent">Certificações</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-zinc-300 max-w-md font-normal leading-relaxed">
            Formação contínua abrangendo novas tecnologias de Inteligência Artificial, metodologias de gestão, processos de liderança e educação básica.
          </p>
        </div>

        {/* Grade de Formação e Certificados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {educationAndCertificates.map((item, idx) => {
            const isOngoing = item.status.toLowerCase().includes('andamento');

            return (
              <div 
                key={item.id}
                className="group p-8 rounded-2xl bg-[#070448] border border-[#170ba4] hover:border-[#2f15ed] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-mono-code text-xs text-zinc-400 mb-5 pb-3.5 border-b border-[#0c0580]">
                    <span className="text-[#2f15ed] font-bold">[ 0{idx + 1} ]</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono-code ${
                      isOngoing 
                        ? 'bg-[#2f15ed]/20 text-[#9d90ff] border border-[#2f15ed]' 
                        : 'bg-[#00005c] text-zinc-300 border border-[#170ba4]'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-[#d3ceff] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs font-mono-code text-[#9d90ff] mb-4">
                    {item.institution}
                  </p>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Aprendizados Principais */}
                {item.keyLearnings && (
                  <div className="pt-5 border-t border-[#0c0580] flex flex-wrap gap-2">
                    {item.keyLearnings.map((s, i) => (
                      <span 
                        key={i} 
                        className="text-[11px] font-mono-code px-2.5 py-1 rounded-lg bg-[#00005c] text-[#d3ceff] border border-[#170ba4]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

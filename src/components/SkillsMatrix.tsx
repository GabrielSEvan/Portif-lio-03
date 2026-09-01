import React from 'react';
import { skillCategories } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  return (
    <section 
      id="competencias" 
      className="py-32 lg:py-40 relative border-b border-[#170ba4]/50 bg-[#020228]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-[#170ba4]/40 pb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070448] border border-[#170ba4] text-xs font-mono-code text-[#9d90ff] mb-5">
              <span className="text-[#2f15ed] font-bold">[ 05 ]</span>
              <span>MATRIZ DE COMPETÊNCIAS</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Habilidades & <br />
              <span className="font-serif-accent italic font-normal text-gradient-accent">Domínios Técnicos</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-zinc-300 max-w-md font-normal leading-relaxed">
            Matriz completa de competências técnicas, operacionais e comportamentais desenvolvidas ao longo de experiências institucionais e estudos contínuos.
          </p>
        </div>

        {/* Grade de Categorias de Competências */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillCategories.map((cat, idx) => (
            <div 
              key={idx}
              className="p-8 sm:p-10 rounded-2xl bg-[#070448] border border-[#170ba4] hover:border-[#2f15ed] transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center justify-between font-mono-code text-xs text-zinc-400 mb-6 pb-4 border-b border-[#0c0580]">
                <span className="text-[#2f15ed] font-bold">[ 0{idx + 1} ]</span>
                <span className="text-[#9d90ff] uppercase">{cat.title}</span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-2">
                {cat.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 mb-8">
                {cat.description}
              </p>

              <div className="space-y-5">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono-code">
                      <span className="text-zinc-200 font-medium">{skill.name}</span>
                      <span className="text-[#9d90ff]">{skill.level}</span>
                    </div>

                    {/* Barra de Progresso Suave */}
                    <div className="h-2 w-full bg-[#00005c] rounded-full overflow-hidden border border-[#0c0580]">
                      <div 
                        className="h-full bg-gradient-to-r from-[#170ba4] via-[#2310c8] to-[#2f15ed] rounded-full transition-all duration-500"
                        style={{ 
                          width: skill.level.includes('Avançado') || skill.level.includes('Especialista') || skill.level.includes('Incondicional') || skill.level.includes('Destaque') 
                            ? '95%' 
                            : skill.level.includes('Prática') || skill.level.includes('Constante') || skill.level.includes('Certificado') 
                            ? '85%' 
                            : '75%' 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

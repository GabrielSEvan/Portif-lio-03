import React, { useState } from 'react';
import { personalInfo, experiences, educationAndCertificates, skillCategories } from '../data/portfolioData';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  Mail, 
  MapPin, 
  Shield, 
  Award, 
  CheckCircle2,
  FileText
} from 'lucide-react';

interface CurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurriculumModal: React.FC<CurriculumModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCV = () => {
    const cvText = `
CURRÍCULO VITAE — GABRIEL SILVA EVANGELISTA
--------------------------------------------------
Idade: ${personalInfo.age} anos
Localização: ${personalInfo.location}
E-mail: ${personalInfo.email}
Atuação Atual: ${personalInfo.currentRole}

OBJETIVO PROFISSIONAL:
Crescer profissionalmente, descobrir novas possibilidades e ser uma pessoa útil, confiável e capaz de contribuir onde estiver atuando, com ênfase em Gestão de Pessoas, Liderança, Organização de Processos e Tecnologia/IA.

RESUMO PROFISSIONAL:
Jovem de 20 anos com sólida disciplina e responsabilidade adquiridas no serviço militar como Soldado Protocolista no Departamento de Engenharia e Construção (DEC). Experiência anterior em ambiente educacional e administrativo na Escola Montessori via CIEE. Facilidade em trabalhar em equipe ou com autonomia, adaptabilidade rápida e busca constante por aperfeiçoamento.

EXPERIÊNCIA PROFISSIONAL:
1. Exército Brasileiro — DEC (2024 — Presente)
Cargo: Soldado / Protocolista
- Controle, registro e tramitação de documentos oficiais e processos administrativos.
- Cumprimento rigoroso de normas, sigilo e disciplina institucional.

2. Escola Montessori / CIEE (Experiência Anterior)
Cargo: Auxiliar de Coordenação e Aprendiz de Práticas (Jovem Aprendiz)
- Suporte à coordenação pedagógica, atendimento ao público e rotinas administrativas.

FORMAÇÃO E CURSOS:
- Operador de Computador com Inteligência Artificial (Em andamento)
- Chefia e Liderança (Certificado)
- Mapeamento de Processos (Certificado)
- Informática Básica & Ferramentas Digitais (Certificado)
- Ensino Médio Completo (Educação Básica)

COMPETÊNCIAS CHAVE:
- Gestão de Pessoas, Liderança e Escuta Ativa
- Organização de Processos e Rotina Protocolar
- Inteligência Artificial aplicada, Criação de Sites e Soluções Digitais
- Honestidade, Educação, Dedicação e Resiliência
    `.trim();

    navigator.clipboard.writeText(cvText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      id="cv-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        id="cv-modal-content"
        className="relative w-full max-w-4xl bg-[#00005c] border border-[#170ba4] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#070448] border-b border-[#170ba4] shrink-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-white font-mono-code">
            <FileText className="w-4 h-4 text-[#9d90ff]" />
            <span>CURRÍCULO VITAE ESTRUTURADO</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="cv-copy-btn"
              onClick={handleCopyCV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0c0580] hover:bg-[#170ba4] text-xs font-mono-code text-white border border-[#170ba4] transition-all"
              title="Copiar texto do currículo"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#9d90ff]" />
                  <span className="hidden sm:inline">Copiar Texto</span>
                </>
              )}
            </button>

            <button
              id="cv-print-btn"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2f15ed] hover:bg-[#2310c8] text-xs font-mono-code font-bold text-white shadow-md shadow-[#2f15ed]/35 transition-all"
              title="Imprimir ou Salvar em PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Imprimir / PDF</span>
            </button>

            <button
              id="cv-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#0c0580] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Printable Area */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-[#e3e1ec] bg-[#00005c]">
          
          {/* Header CV Block */}
          <div className="border-b border-[#170ba4] pb-6">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">
              Gabriel Silva Evangelista
            </h1>
            <p className="text-sm font-medium text-[#9d90ff] mb-3">
              Soldado do Exército Brasileiro • Protocolista no DEC • Foco em Gestão, Processos &amp; IA
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#2f15ed]" />
                Brasília, DF — Brasil (20 anos)
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#2f15ed]" />
                gabrielsilva50029061@gmail.com
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Disponível para novas oportunidades
              </span>
            </div>
          </div>

          {/* Objetivo */}
          <div>
            <h2 className="text-xs font-mono-code uppercase tracking-wider text-[#9d90ff] mb-2 font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#2f15ed]" />
              Objetivo Profissional
            </h2>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-[#070448] p-3.5 rounded-xl border border-[#170ba4]">
              Crescer profissionalmente, descobrir novas possibilidades e, principalmente, ser uma pessoa útil, confiável e capaz de contribuir onde estiver. Interesse contínuo em áreas de gestão de pessoas, liderança, organização e gerenciamento de atividades, além do desenvolvimento em tecnologia e inteligência artificial.
            </p>
          </div>

          {/* Resumo de Qualificações */}
          <div>
            <h2 className="text-xs font-mono-code uppercase tracking-wider text-[#9d90ff] mb-2 font-bold">
              Resumo de Qualificações
            </h2>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-[#070448] p-3.5 rounded-xl border border-[#170ba4]">
              Pessoa honesta, educada, organizada e dedicada, com facilidade para aprender novas funções e se adaptar rapidamente a diferentes atividades. Atuação diária no protocolo do DEC (Exército Brasileiro), desenvolvendo alta responsabilidade, disciplina e trabalho orientado a processos institucionais padronizados. Visão de liderança baseada em escuta ativa, empatia e busca conjunta de soluções.
            </p>
          </div>

          {/* Experiência Profissional */}
          <div>
            <h2 className="text-xs font-mono-code uppercase tracking-wider text-[#9d90ff] mb-3 font-bold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#2f15ed]" />
              Experiência Profissional
            </h2>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-[#070448] border border-[#170ba4]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="text-sm font-bold text-white">{exp.role}</span>
                    <span className="text-xs font-mono-code text-[#9d90ff]">{exp.period}</span>
                  </div>
                  <div className="text-xs text-zinc-400 mb-2">
                    {exp.organization} {exp.department ? `— ${exp.department}` : ''} | {exp.location}
                  </div>
                  <p className="text-xs text-zinc-300 mb-3">
                    {exp.description}
                  </p>
                  <ul className="space-y-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-[11px] sm:text-xs text-zinc-300 flex items-start gap-2">
                        <span className="text-[#2f15ed] font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Formação e Certificados */}
          <div>
            <h2 className="text-xs font-mono-code uppercase tracking-wider text-[#9d90ff] mb-3 font-bold">
              Formação Acadêmica &amp; Cursos de Qualificação
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {educationAndCertificates.map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-[#070448] border border-[#170ba4]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-white">{item.title}</span>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#0c0580] text-[#9d90ff] border border-[#170ba4]">
                      {item.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400">{item.institution}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Principais Competências */}
          <div>
            <h2 className="text-xs font-mono-code uppercase tracking-wider text-[#9d90ff] mb-3 font-bold">
              Principais Competências
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Chefia e Liderança",
                "Mapeamento de Processos",
                "Gestão de Protocolo & Documentos",
                "Disciplina e Rigor Procedimental",
                "Inteligência Artificial Aplicada",
                "Informática Básica e Ferramentas Digitais",
                "Escuta Ativa & Gestão Humanizada",
                "Trabalho em Equipe e Autonomia",
                "Facilidade de Aprendizado e Adaptação",
                "Organização e Resolução de Problemas"
              ].map((skill, idx) => (
                <span 
                  key={idx}
                  className="text-xs px-3 py-1 rounded-lg bg-[#0c0580] text-zinc-200 border border-[#170ba4]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#070448] border-t border-[#170ba4] flex items-center justify-between text-xs text-zinc-400 shrink-0 font-mono-code">
          <span>Brasília, DF • Gabriel Silva Evangelista</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0c0580] hover:bg-[#170ba4] text-white font-medium transition-all"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Shield, 
  GraduationCap, 
  BrainCircuit, 
  Users, 
  Workflow, 
  Music, 
  Activity, 
  X, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

export interface WorkProject {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'militar' | 'gestao' | 'tecnologia' | 'vida';
  categoryLabel: string;
  organization: string;
  period: string;
  badge: string;
  summary: string;
  impacts: string[];
  skills: string[];
  caseStudy: {
    challenge: string;
    action: string;
    outcome: string;
    quote?: string;
  };
}

export const workProjectsData: WorkProject[] = [
  {
    id: 'eb-dec-protocol',
    index: '01',
    title: 'Protocolo Institucional & Tramitação de Processos',
    subtitle: 'Departamento de Engenharia e Construção (DEC)',
    category: 'militar',
    categoryLabel: 'Militar & Protocolo',
    organization: 'Exército Brasileiro',
    period: '2024 — Presente',
    badge: 'Atuação Atual',
    summary: 'Gerenciamento minucioso do fluxo de documentos oficiais, processos administrativos e comunicações internas de alta relevância com rigor militar.',
    impacts: [
      'Triagem, registro e encaminhamento diário de processos confidenciais e prioritários do DEC.',
      'Rigor absoluto no cumprimento de prazos, normas de sigilo e procedimentos formais do Exército.',
      'Atendimento e mediação profissional com diversas seções e oficiais do departamento.',
      'Construção de ambiente de trabalho organizado e altamente rastreável.'
    ],
    skills: ['Gestão de Protocolo', 'Rigor Administrativo', 'Sigilo Institucional', 'Comunicação Formal', 'Disciplina Operacional'],
    caseStudy: {
      challenge: 'Garantir precisão absoluta e velocidade na triagem de volumes elevados de documentos oficiais em um dos órgãos mais estratégicos do Exército.',
      action: 'Aplicação de rotinas rigorosas de conferência, registro metódico e priorização inteligente de despachos urgentes.',
      outcome: 'Fluxo sem extravios, rastreabilidade integral e reconhecimento pela disciplina e postura institucional.',
      quote: 'A disciplina militar no protocolo ensina que cada detalhe importa para o sucesso de uma grande organização.'
    }
  },
  {
    id: 'montessori-ciee-exp',
    index: '02',
    title: 'Apoio à Coordenação & Rotinas Pedagógicas',
    subtitle: 'Escola Montessori • Programa CIEE',
    category: 'gestao',
    categoryLabel: 'Gestão & Educação',
    organization: 'Escola Montessori / CIEE',
    period: 'Concluído',
    badge: 'Jovem Aprendiz',
    summary: 'Suporte operacional e administrativo à coordenação escolar, atendendo pais, professores e organizando fluxos de secretaria.',
    impacts: [
      'Organização e digitalização de arquivos pedagógicos e prontuários acadêmicos.',
      'Atendimento humanizado, cordial e resolutivo a docentes, alunos e responsáveis.',
      'Apoio na logística de eventos escolares, reuniões de pais e controle de demandas diárias.',
      'Desenvolvimento precoce de senso de serviço público e responsabilidade interpessoal.'
    ],
    skills: ['Apoio à Coordenação', 'Atendimento ao Público', 'Organização de Arquivos', 'Mediação Interpessoal', 'Solução de Problemas'],
    caseStudy: {
      challenge: 'Conciliar múltiplas solicitações simultâneas de professores, direção e pais mantendo a calma e precisão.',
      action: 'Estruturação de listas de prioridade diárias e comunicação transparente com todos os envolvidos.',
      outcome: 'Apoio elogiado pela equipe de coordenação e sólido fortalecimento das relações interpessoais.'
    }
  },
  {
    id: 'ia-automation-tech',
    index: '03',
    title: 'Operação de Computadores com Inteligência Artificial',
    subtitle: 'Formação Técnica & Aplicação Prática',
    category: 'tecnologia',
    categoryLabel: 'IA & Tecnologia',
    organization: 'Formação Profissionalizante',
    period: '2025 — Em Andamento',
    badge: 'Inovação',
    summary: 'Capacitação prática em sistemas modernos, automação de tarefas e integração de ferramentas de IA para ganho exponencial de produtividade.',
    impacts: [
      'Engenharia de prompts para síntese rápida de documentos, relatórios e instruções de trabalho.',
      'Automação de rotinas em planilhas e editores de texto para eliminação de trabalho manual.',
      'Exploração de interfaces digitais, sistemas operacionais e criação de projetos tecnológicos.',
      'Estudo contínuo de novidades em IA generativa para aplicação em processos corporativos.'
    ],
    skills: ['Inteligência Artificial', 'Engenharia de Prompts', 'Automação de Tarefas', 'Operação de Sistemas', 'Produtividade Digital'],
    caseStudy: {
      challenge: 'Transformar conceitos teóricos de IA em ferramentas práticas para acelerar tarefas diárias e rotinas administrativas.',
      action: 'Desenvolvimento de roteiros de prompts e automações simples para organização de dados e redação estruturada.',
      outcome: 'Capacidade de multiplicar a velocidade de entrega sem abrir mão da precisão humana.'
    }
  },
  {
    id: 'lideranca-gestao-curso',
    index: '04',
    title: 'Chefia & Liderança Humanizada de Pessoas',
    subtitle: 'Qualificação Profissional em Gestão',
    category: 'gestao',
    categoryLabel: 'Liderança & Pessoas',
    organization: 'Certificação Profissional',
    period: 'Certificado',
    badge: 'Gestão de Pessoas',
    summary: 'Desenvolvimento de competências essenciais de liderança: mediação de conflitos, escuta ativa, feedback construtivo e motivação de equipes.',
    impacts: [
      'Compreensão de liderança situacional: adaptar a postura às necessidades de cada liderado.',
      'Técnicas de comunicação não-violenta e alinhamento de expectativas em grupo.',
      'Delegação consciente de atividades com acompanhamento amigável de metas.',
      'Construção de clima de cooperação mútua e sentimento de pertencimento.'
    ],
    skills: ['Chefia e Liderança', 'Escuta Ativa', 'Comunicação Assertiva', 'Gestão de Conflitos', 'Motivação de Equipes'],
    caseStudy: {
      challenge: 'Superar o modelo tradicional de chefia autoritária e aplicar uma liderança baseada no exemplo, na empatia e na clareza.',
      action: 'Aprofundamento em metodologias de escuta ativa, inteligência emocional e resolução colaborativa.',
      outcome: 'Formulação da filosofia pessoal: liderar é capacitar o outro para o sucesso coletivo.'
    }
  },
  {
    id: 'mapeamento-processos-sipoc',
    index: '05',
    title: 'Mapeamento & Otimização de Processos (SIPOC)',
    subtitle: 'Qualificação Técnica em Gestão da Qualidade',
    category: 'gestao',
    categoryLabel: 'Processos & Eficiência',
    organization: 'Certificação Profissional',
    period: 'Certificado',
    badge: 'Processos',
    summary: 'Modelagem de fluxos de trabalho através de ferramentas como SIPOC e fluxogramas para eliminar gargalos e desperdícios operacionais.',
    impacts: [
      'Mapeamento de fornecedores, entradas, processos, saídas e clientes (SIPOC).',
      'Identificação de gargalos em fluxos burocráticos e elaboração de planos de melhoria.',
      'Padronização de Procedimentos Operacionais Padrão (POP) claros e acessíveis.',
      'Visão sistêmica de ponta a ponta em rotinas administrativas.'
    ],
    skills: ['Mapeamento de Processos', 'Matriz SIPOC', 'Melhoria Contínua', 'Padronização de Tarefas', 'Eliminação de Gargalos'],
    caseStudy: {
      challenge: 'Visualizar etapas redundantes em fluxos de trabalho e propor simplificações viáveis.',
      action: 'Desenho de fluxogramas detalhados com identificação precisa de pontos de decisão e tempo de resposta.',
      outcome: 'Clareza operacional, redução de retrabalho e facilidade de integração de novos membros.'
    }
  },
  {
    id: 'musica-letras-gospel',
    index: '06',
    title: 'Composições Musicais Gospel Autorais',
    subtitle: 'Expressão Artística, Fé & Criatividade',
    category: 'vida',
    categoryLabel: 'Criatividade & Vida',
    organization: 'Projetos Autorais',
    period: 'Contínuo',
    badge: 'Autoral',
    summary: 'Escrita dedicada de letras e mensagens autorais focadas em fé, esperança, sensibilidade humana e reflexão espiritual.',
    impacts: [
      'Desenvolvimento de sensibilidade profunda para a escolha métrica e poética das palavras.',
      'Expressão autêntica de valores, integridade, fé e superação através da música.',
      'Capacidade de inspirar, tocar pessoas e construir narrativas comoventes.',
      'Paciência no processo criativo e busca contínua por harmonia e mensagem.'
    ],
    skills: ['Composição Lírica', 'Sensibilidade Artística', 'Comunicação Emocional', 'Criatividade Narrativa', 'Persistência Criativa'],
    caseStudy: {
      challenge: 'Transformar experiências de vida e sentimentos profundos em mensagens inspiradoras e coesas.',
      action: 'Prática contínua de escrita, estudo lírico e conexão de reflexões de fé com a vida real.',
      outcome: 'Acervo de composições que expressam o propósito espiritual e a integridade de caráter.'
    }
  },
  {
    id: 'esportes-disciplina-tfm',
    index: '07',
    title: 'Condicionamento Físico & Resiliência Militar',
    subtitle: 'Treinamento Físico Militar & Superação',
    category: 'vida',
    categoryLabel: 'Disciplina & Saúde',
    organization: 'Treinamento Físico Militar (TFM)',
    period: 'Diário / Contínuo',
    badge: 'Saúde & Foco',
    summary: 'Prática contínua de esportes e treinamento físico como alicerce para resiliência mental, clareza sob pressão e disciplina inabalável.',
    impacts: [
      'Construção diária de foco inabalável através de rotinas físicas intensas.',
      'Desenvolvimento de espírito de corpo, lealdade e suporte aos companheiros de treino.',
      'Capacidade de tomar decisões sob estresse e fadiga física.',
      'Estilo de vida ativo, focado em longevidade e equilíbrio.'
    ],
    skills: ['Resiliência Sob Pressão', 'Espírito de Equipe', 'Disciplina Diária', 'Saúde & Foco', 'Superação de Limites'],
    caseStudy: {
      challenge: 'Manter a disciplina física e mental constante mesmo em dias de cansaço extremo ou exigência militar elevada.',
      action: 'Construção de mentalidade de superação progressiva e respeito ao processo de evolução.',
      outcome: 'Excelente condicionamento, vigor diário e estabilidade emocional diante de pressões.'
    }
  }
];

export const WorkSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'militar' | 'gestao' | 'tecnologia' | 'vida'>('all');
  const [hoveredProject, setHoveredProject] = useState<WorkProject | null>(workProjectsData[0]);
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(null);

  const filteredProjects = activeFilter === 'all' 
    ? workProjectsData 
    : workProjectsData.filter(p => p.category === activeFilter);

  return (
    <section 
      id="trabalhos" 
      className="py-32 lg:py-40 relative border-b border-[#170ba4]/50 bg-[#020228]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção com espaçamento generoso */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-[#170ba4]/40 pb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070448] border border-[#170ba4] text-xs font-mono-code text-[#9d90ff] mb-5">
              <span className="text-[#2f15ed] font-bold">[ 01 ]</span>
              <span>PROJETOS EM DESTAQUE & ATUAÇÃO</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Projetos & <br />
              <span className="font-serif-accent italic font-normal text-gradient-accent">
                Principais Realizações
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-zinc-300 max-w-md font-normal leading-relaxed">
            Uma seleção estruturada das minhas principais experiências profissionais no Exército Brasileiro (DEC), qualificações em liderança, mapeamento de processos, IA e realizações autorais.
          </p>
        </div>

        {/* Filtros em Português */}
        <div className="flex flex-wrap items-center gap-2.5 mb-14">
          {[
            { key: 'all', label: 'TODOS OS PROJETOS [ 07 ]' },
            { key: 'militar', label: 'MILITAR & DEC [ 01 ]' },
            { key: 'gestao', label: 'GESTÃO & PROCESSOS [ 03 ]' },
            { key: 'tecnologia', label: 'IA & TECNOLOGIA [ 01 ]' },
            { key: 'vida', label: 'AUTORAIS & VIDA [ 02 ]' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono-code tracking-wider transition-all active:scale-95 ${
                activeFilter === tab.key
                  ? 'bg-[#2f15ed] text-white font-bold shadow-md shadow-[#2f15ed]/25'
                  : 'bg-[#070448] hover:bg-[#0c0580] text-zinc-300 hover:text-white border border-[#170ba4]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Lista Espaçada de Projetos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Coluna Esquerda: Linhas de Projetos */}
          <div className="lg:col-span-8 divide-y divide-[#170ba4]/40 border-y border-[#170ba4]/40">
            {filteredProjects.map((project) => {
              const isHovered = hoveredProject?.id === project.id;
              
              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setHoveredProject(project)}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative py-7 px-5 -mx-5 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-5 ${
                    isHovered 
                      ? 'bg-[#070448] border-l-4 border-[#2f15ed] pl-6 shadow-md' 
                      : 'hover:bg-[#070448]/40'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono-code text-xs text-[#2f15ed] font-bold pt-1">
                      [{project.index}]
                    </span>
                    
                    <div>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-[#d3ceff] transition-colors flex items-center gap-2">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#9d90ff]" />
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-2.5 mt-2 text-xs text-zinc-400">
                        <span className="font-medium text-zinc-200">{project.organization}</span>
                        <span>•</span>
                        <span className="font-mono-code text-[11px] text-[#9d90ff] bg-[#00005c] border border-[#170ba4] px-2.5 py-0.5 rounded-lg">
                          {project.categoryLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:text-right font-mono-code text-xs text-zinc-400 shrink-0 pl-8 sm:pl-0">
                    <span className="px-3 py-1 rounded-lg bg-[#00005c] border border-[#170ba4] text-zinc-300">
                      {project.period}
                    </span>
                    <span className="hidden sm:inline-block text-[#2f15ed] font-bold text-sm">→</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coluna Direita: Prévia Fixa do Projeto */}
          <div className="hidden lg:block lg:col-span-4 sticky top-32">
            {hoveredProject && (
              <div className="p-7 rounded-2xl bg-[#070448] border border-[#170ba4] shadow-xl relative overflow-hidden transition-all duration-300 space-y-5">
                <div className="flex items-center justify-between font-mono-code text-xs text-zinc-400 pb-3 border-b border-[#0c0580]">
                  <span className="text-[#2f15ed] font-bold">PRÉVIA [{hoveredProject.index}]</span>
                  <span className="text-[#9d90ff] px-2 py-0.5 rounded bg-[#00005c] border border-[#170ba4]">{hoveredProject.badge}</span>
                </div>

                <h4 className="text-xl font-display font-bold text-white leading-snug">
                  {hoveredProject.title}
                </h4>

                <p className="text-xs font-mono-code text-[#9d90ff]">
                  {hoveredProject.subtitle}
                </p>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {hoveredProject.summary}
                </p>

                {/* Tags de Competências */}
                <div>
                  <div className="text-[11px] font-mono-code text-zinc-400 uppercase tracking-wider mb-2.5">
                    Competências & Métodos:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {hoveredProject.skills.slice(0, 4).map((skill, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-[#00005c] text-zinc-200 border border-[#170ba4] text-[11px] font-mono-code"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botão de Ver Detalhes */}
                <button
                  onClick={() => setSelectedProject(hoveredProject)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2f15ed] hover:bg-[#2310c8] text-white text-xs font-mono-code font-bold shadow-md shadow-[#2f15ed]/25 transition-all active:scale-95"
                >
                  <span>LER DETALHES COMPLETOS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Modal de Detalhes do Projeto */}
      {selectedProject && (
        <div 
          id="project-case-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#00005c] border border-[#170ba4] shadow-2xl p-6 sm:p-10 text-white relative animate-in zoom-in-95 duration-200 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-[#070448] border border-[#170ba4] text-zinc-400 hover:text-white hover:bg-[#0c0580] transition-all"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabeçalho do modal */}
            <div className="flex items-center gap-2 font-mono-code text-xs text-[#9d90ff]">
              <span className="text-[#2f15ed] font-bold">[{selectedProject.index}]</span>
              <span>{selectedProject.categoryLabel.toUpperCase()}</span>
              <span>•</span>
              <span className="text-zinc-400">{selectedProject.period}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
              {selectedProject.title}
            </h3>

            <p className="text-sm font-mono-code text-[#9d90ff]">
              {selectedProject.subtitle} • {selectedProject.organization}
            </p>

            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed bg-[#070448] p-5 rounded-2xl border border-[#170ba4]">
              {selectedProject.summary}
            </p>

            {/* Estrutura da Experiência */}
            <div className="space-y-4">
              <h4 className="font-mono-code text-xs text-zinc-400 tracking-wider uppercase border-b border-[#0c0580] pb-2">
                ESTRUTURA DA EXPERIÊNCIA & METODOLOGIA
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#070448] border border-[#170ba4]">
                  <span className="text-[11px] font-mono-code text-[#9d90ff] font-bold block mb-1">01. O DESAFIO</span>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {selectedProject.caseStudy.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#070448] border border-[#170ba4]">
                  <span className="text-[11px] font-mono-code text-[#9d90ff] font-bold block mb-1">02. A AÇÃO</span>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {selectedProject.caseStudy.action}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#070448] border border-[#170ba4]">
                  <span className="text-[11px] font-mono-code text-[#9d90ff] font-bold block mb-1">03. O RESULTADO</span>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {selectedProject.caseStudy.outcome}
                  </p>
                </div>
              </div>
            </div>

            {/* Entregas e Impactos */}
            <div className="space-y-3">
              <h4 className="font-mono-code text-xs text-zinc-400 tracking-wider uppercase border-b border-[#0c0580] pb-2">
                PRINCIPAIS ENTREGAS & IMPACTOS
              </h4>
              <div className="space-y-2.5">
                {selectedProject.impacts.map((impact, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-[#2f15ed] shrink-0 mt-0.5" />
                    <span>{impact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Competências */}
            <div className="space-y-3">
              <h4 className="font-mono-code text-xs text-zinc-400 tracking-wider uppercase border-b border-[#0c0580] pb-2">
                COMPETÊNCIAS APLICADAS
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-[#070448] border border-[#170ba4] text-xs font-mono-code text-zinc-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Fechar */}
            <div className="pt-4 border-t border-[#0c0580] flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded-xl bg-[#070448] hover:bg-[#0c0580] text-white text-xs font-mono-code border border-[#170ba4] transition-all"
              >
                FECHAR
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

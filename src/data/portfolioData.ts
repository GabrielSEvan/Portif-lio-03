import { ExperienceItem, EducationItem, SkillCategory, PersonalProject } from '../types';

export const personalInfo = {
  name: "Gabriel Silva Evangelista",
  age: 20,
  currentRole: "Soldado do Exército Brasileiro — Protocolista no DEC",
  location: "Brasília, DF — Brasil",
  email: "gabrielsilva50029061@gmail.com",
  status: "Ativo • Disponível para novas oportunidades e conexões",
  summaryHeadline: "20 anos. Disciplina militar, rigor em processos e foco em Gestão de Pessoas, Inteligência Artificial e Tecnologia.",
  bio: `Meu nome é Gabriel Silva Evangelista, tenho 20 anos e sou uma pessoa que busca constantemente aprender, evoluir e encontrar novas oportunidades para crescer tanto profissionalmente quanto pessoalmente.

Atualmente, atuo como Soldado do Exército Brasileiro e Protocolista no Departamento de Engenharia e Construção (DEC), onde desenvolvo diariamente organização, responsabilidade, disciplina e trabalho orientado a processos institucionais.

Tenho especial interesse por áreas ligadas à gestão de pessoas, liderança, organização e gerenciamento de atividades, acreditando firmemente que uma boa gestão depende de saber ouvir, compreender as pessoas, organizar fluxos e buscar soluções eficientes.`,
  coreValues: [
    {
      title: "Honestidade & Ética",
      description: "Transparência inegociável e postura íntegra em todas as relações e tarefas assumidas.",
      icon: "ShieldCheck"
    },
    {
      title: "Disciplina & Organização",
      description: "Comprometimento com prazos, precisão em processos e metodologia operacional sólida.",
      icon: "ListChecks"
    },
    {
      title: "Liderança Humanizada",
      description: "Escuta ativa, empatia e clareza para impulsionar equipes e encontrar soluções conjuntas.",
      icon: "Users"
    },
    {
      title: "Aprendizado Contínuo",
      description: "Curiosidade constante por novas ferramentas, IA, tecnologia e autodesenvolvimento.",
      icon: "Sparkles"
    }
  ],
  managementPhilosophy: "Uma boa gestão depende não apenas de conhecimento técnico, mas também de saber ouvir, compreender as pessoas, organizar processos e buscar soluções conjuntas."
};

export const experiences: ExperienceItem[] = [
  {
    id: "eb-dec",
    role: "Soldado do Exército Brasileiro — Protocolista",
    organization: "Exército Brasileiro",
    department: "Departamento de Engenharia e Construção (DEC)",
    period: "2024 — Presente",
    status: "Em Exercício",
    type: "Serviço Militar / Administrativo",
    location: "Brasília - DF",
    description: "Atuação direta no protocolo institucional do DEC, gerenciando o fluxo de documentos oficiais, processos administrativos e comunicações internas de alta relevância.",
    highlights: [
      "Controle, triagem, registro e tramitação precisa de processos e documentos oficiais do DEC.",
      "Aplicação de rigorosa disciplina militar, confidencialidade, pontualidade e responsabilidade no cumprimento de normas.",
      "Atendimento a diferentes seções e escalões, aprimorando comunicação formal e postura profissional.",
      "Desenvolvimento de alta capacidade de trabalhar sob processos padronizados e exigência de precisão."
    ],
    skills: ["Gestão de Protocolo", "Processos Administrativos", "Disciplina Militar", "Organização", "Comunicação Institucional", "Trabalho em Equipe"],
    iconType: "military"
  },
  {
    id: "montessori-ciee",
    role: "Auxiliar de Coordenação & Aprendiz de Práticas",
    organization: "Escola Montessori",
    department: "Coordenação Pedagógica / CIEE",
    period: "Experiência Anterior (Jovem Aprendiz)",
    status: "Concluído",
    type: "Programa Jovem Aprendiz (CIEE)",
    location: "Brasília - DF",
    description: "Atuação no suporte às atividades de coordenação escolar e rotina pedagógica/administrativa pelo programa do Centro de Integração Empresa-Escola.",
    highlights: [
      "Apoio direto à coordenação no planejamento, organização de arquivos e controle de demandas.",
      "Atendimento cordial e eficaz a professores, alunos, pais e equipe escolar.",
      "Colaboração ativa na rotina operacional da instituição, desenvolvendo agilidade e senso de serviço.",
      "Fortalecimento das bases de convivência profissional, pontualidade e resolução proativa de problemas."
    ],
    skills: ["Apoio à Coordenação", "Atendimento ao Público", "Rotina Administrativa", "Colaboração Interpessoal", "Resolução de Problemas"],
    iconType: "education"
  }
];

export const educationAndCertificates: EducationItem[] = [
  {
    id: "ia-curso",
    title: "Operador de Computador com Inteligência Artificial",
    institution: "Formação Técnica / Profissionalizante",
    period: "2025 — Em Andamento",
    status: "Em Andamento",
    category: "especializacao",
    badge: "Tecnologia & IA",
    description: "Capacitação prática em operação de sistemas computacionais e aplicação de ferramentas modernas de Inteligência Artificial para produtividade, automação e soluções digitais.",
    keyLearnings: [
      "Operação avançada de computadores e sistemas operacionais",
      "Uso de IA generativa para automação de tarefas e produtividade",
      "Criação de soluções tecnológicas e fundamentos digitais",
      "Integração de ferramentas modernas de inteligência artificial"
    ]
  },
  {
    id: "chefia-lideranca",
    title: "Chefia e Liderança",
    institution: "Curso de Qualificação Profissional",
    period: "Certificado",
    status: "Concluído",
    category: "certificacao",
    badge: "Gestão & Pessoas",
    description: "Formação focada em desenvolvimento de competências de liderança, gestão de equipes, mediação de conflitos, tomada de decisão e motivação organizacional.",
    keyLearnings: [
      "Técnicas de liderança situacional e gestão de pessoas",
      "Comunicação interpessoal assertiva e escuta ativa",
      "Delegação consciente de tarefas e acompanhamento de resultados",
      "Ambiente de cooperação e engajamento coletivo"
    ]
  },
  {
    id: "mapeamento-processos",
    title: "Mapeamento de Processos",
    institution: "Curso de Qualificação Profissional",
    period: "Certificado",
    status: "Concluído",
    category: "certificacao",
    badge: "Processos & Eficiência",
    description: "Estudo e prática na identificação, modelagem, análise e melhoria de fluxos de trabalho e processos operacionais dentro de organizações.",
    keyLearnings: [
      "Compreensão de fluxos de entrada, processamento e saída (SIPOC)",
      "Identificação de gargalos e oportunidades de melhoria contínua",
      "Padronização de procedimentos e documentação de rotinas",
      "Alinhamento entre pessoas, tarefas e metas organizacionais"
    ]
  },
  {
    id: "informatica-basica",
    title: "Informática Básica & Ferramentas Digitais",
    institution: "Curso de Qualificação Profissional",
    period: "Certificado",
    status: "Concluído",
    category: "certificacao",
    badge: "Informática",
    description: "Domínio essencial de softwares de escritório, digitação, planilhas, editores de texto, gerenciamento de arquivos e navegação segura.",
    keyLearnings: [
      "Pacote Office / Editores de Documentos e Planilhas",
      "Gerenciamento estruturado de arquivos e pastas",
      "Comunicação digital e rotina corporativa informatizada"
    ]
  },
  {
    id: "ensino-medio",
    title: "Ensino Médio Completo",
    institution: "Educação Básica",
    period: "Concluído",
    status: "Concluído",
    category: "formacao",
    badge: "Educação Formal",
    description: "Formação escolar básica concluída com sólida base de conhecimentos gerais, responsabilidade acadêmica e prontidão para o ensino superior e técnico.",
    keyLearnings: [
      "Comunicação escrita e raciocínio lógico estruturado",
      "Base multidisciplinar e preparação para qualificações superiores"
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Gestão, Liderança & Pessoas",
    description: "Interesse primordial e foco de atuação: guiar pessoas e organizar tarefas com empatia e firmeza.",
    skills: [
      { name: "Chefia & Liderança", level: "Avançado", description: "Habilidade para orientar, mediar e inspirar foco em objetivos." },
      { name: "Escuta Ativa & Empatia", level: "Destaque", description: "Compreensão atenta das necessidades de colegas e equipes." },
      { name: "Trabalho em Equipe e Individual", level: "Destaque", description: "Capacidade de colaborar harmoniosamente ou executar com autonomia." },
      { name: "Gerenciamento de Atividades", level: "Avançado", description: "Distribuição, priorização e acompanhamento de tarefas diárias." }
    ]
  },
  {
    title: "Processos & Organização",
    description: "Desenvolvidos com rigor no Exército Brasileiro (DEC) e Escola Montessori.",
    skills: [
      { name: "Mapeamento de Processos", level: "Certificado", description: "Análise de fluxos operacionais e identificação de melhorias." },
      { name: "Rotina Protocolar & Documental", level: "Prática Militar", description: "Tramitação, registro, sigilo e rastreabilidade documental." },
      { name: "Disciplina & Cumprimento de Normas", level: "Destaque", description: "Rigor com procedimentos padrão, pontualidade e responsabilidade." },
      { name: "Adaptabilidade & Aprendizado Rápido", level: "Destaque", description: "Facilidade em assimilar novas ferramentas e funções rapidamente." }
    ]
  },
  {
    title: "Tecnologia, IA & Digital",
    description: "Área de constante aprofundamento, estudo e aplicação prática de soluções modernas.",
    skills: [
      { name: "Operador de Computador com IA", level: "Em Andamento", description: "Integração prática de Inteligência Artificial no fluxo de trabalho." },
      { name: "Criação de Sites, Portfólios & Apps", level: "Em Estudo/Prática", description: "Construção de interfaces e projetos tecnológicos." },
      { name: "Informática & Softwares de Escritório", level: "Certificado", description: "Uso produtivo de computadores, textos e planilhas." },
      { name: "Curiosidade & Exploração Tecnológica", level: "Contínuo", description: "Pesquisa de novas soluções digitais e automações." }
    ]
  },
  {
    title: "Atributos Pessoais & Postura",
    description: "Princípios humanos e comportamentais que guiam minha jornada.",
    skills: [
      { name: "Honestidade & Integridade", level: "Incondicional", description: "Retidão e transparência em todas as circunstâncias." },
      { name: "Educação & Postura Respeitosa", level: "Destaque", description: "Tratamento cortês e atencioso com todos os públicos." },
      { name: "Dedicação & Resiliência", level: "Destaque", description: "Persistência diante de obstáculos e empenho genuíno." },
      { name: "Vontade de Contribuir", level: "Compromisso", description: "Desejo real de ser útil e fazer o projeto/equipe prosperar." }
    ]
  }
];

export const personalEndeavors: PersonalProject[] = [
  {
    id: "gospel-music",
    title: "Composições Musicais Gospel",
    category: "música",
    tagline: "Sensibilidade, dedicação e expressão de fé através da escrita autoral",
    description: "Ao longo da vida, desenvolvi o gosto pela música e escrevi composições gospel autorais. Essa prática me ensinou sobre sensibilidade artística, escolha cuidadosa de palavras, paciência no processo de criação e persistência para dar vida a mensagens que inspiram.",
    learnings: [
      "Desenvolvimento de sensibilidade e expressão comunicativa",
      "Processo criativo metódico: rima, métrica, harmonia e significado",
      "Persistência em projetos que demandam dedicação contínua"
    ],
    extraContent: {
      details: "Letras que refletem fé, superação, esperança e gratidão, construídas com dedicação individual.",
      lyricsSnippet: [
        "\"Em cada passo dado, vejo a mão que me sustenta...\"",
        "\"A força não vem do homem, mas da graça que renova a esperança.\"",
        "\"Mesmo em silêncio, a jornada constrói o propósito.\""
      ]
    }
  },
  {
    id: "sports-discipline",
    title: "Esportes, Jogos & Vida Ativa",
    category: "esporte",
    tagline: "Saúde, disciplina, espírito esportivo e momentos de equilíbrio",
    description: "A prática de esportes e jogos sempre fez parte da minha rotina. As experiências no esporte contribuíram para o desenvolvimento do meu senso de resiliência, espírito esportivo, determinação para superar limites físicos e mentais, além de ser uma excelente forma de manter o foco e o equilíbrio.",
    learnings: [
      "Resiliência e superação de limites",
      "Espírito de equipe, respeito às regras e aos parceiros de jogo",
      "Manutenção da saúde física e mental como pilar de produtividade"
    ],
    extraContent: {
      details: "Além dos treinos físicos no serviço militar, pratico esportes recreativos e aprecio momentos de lazer saudável com amigos e família."
    }
  },
  {
    id: "tech-digital-projects",
    title: "Estudos em IA, Sites & Soluções Digitais",
    category: "tecnologia",
    tagline: "Curiosidade aplicada: aprendendo a criar soluções tecnológicas e portfólios",
    description: "Buscando sempre estar à frente, dedico horas livres ao estudo de criação de sites, portfólios modernos, aplicativos e como utilizar Inteligência Artificial para potencializar o trabalho humano e resolver problemas reais.",
    learnings: [
      "Exploração prática de ferramentas de IA para desenvolvimento",
      "Concepção de interfaces claras, intuitivas e bem estruturadas",
      "Mentalidade 'hands-on' de aprendizado rápido e experimentação"
    ],
    extraContent: {
      details: "Foco contínuo em aplicar tecnologia para otimizar processos administrativos e criar ferramentas úteis."
    }
  }
];

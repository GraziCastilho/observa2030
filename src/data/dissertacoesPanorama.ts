// Panorama Geral — Dissertações da Uergs × ODS
// Snapshot da pesquisa (validação manual como referência). Fonte: Levantamento_Final.xlsx
// Textos, nomes de programa, tipos e páginas oficiais: documento "Instruções gerais e Informações".
// Os números são resultado de um levantamento concluído — não são recalculados em tempo real.

const LOGO_BASE =
  "https://nsmwgtepyzwokvsltkda.supabase.co/storage/v1/object/public/observa-imagens/programas";

export type ProgramaInfo = {
  slug: string;         // usado na URL: /dissertacoes/<slug>
  sigla: string;        // acrônimo oficial exibido
  dbPrograma: string;   // valor exato da coluna "programa" no Supabase
  nomeCompleto: string;
  tipo: string;         // Mestrado Profissional / Mestrado Acadêmico
  paginaOficial: string;
  logo: string;
  descricao: string[];  // parágrafos de apresentação (documento base)
  destaque: string;     // ODS em destaque (documento base)
  cor: string;
  total: number;        // dissertações analisadas
  diretasN: number;
  diretasPct: number;   // 0–1
  indiretasN: number;
  indiretasPct: number; // 0–1
  kappaGeral: number;   // concordância software × manual (3 classes)
  // Aderência direta aos 5 Ps da sustentabilidade (percentuais 0–1)
  cincoPs: { pessoas: number; planeta: number; prosperidade: number; paz: number; parcerias: number };
  // Concordância positiva ImpactoSociedade® × validação manual (percentuais 0–1)
  concordanciaPositiva: { direta: number; indireta: number; geral: number };
};

export const HEADLINE = {
  totalDissertacoes: 254,
  programas: 5,
  diretaN: 237,
  diretaPct: 0.9331,   // dissertações com ao menos uma aderência direta
  indiretaN: 140,
  indiretaPct: 0.5512, // dissertações com ao menos uma aderência indireta
  odsOficiais: 17,
  paresComparacao: 4318, // 254 × 17
};

// Bloco 01 — Panorama por programa (classificação manual) + metadados do documento base
export const PROGRAMAS: ProgramaInfo[] = [
  {
    slug: "ppged", sigla: "PPGED", dbPrograma: "PPGED",
    nomeCompleto: "Programa de Pós-Graduação em Educação",
    tipo: "Mestrado Profissional",
    paginaOficial: "https://proppg.uergs.edu.br/programas-de-pos-graduacao/ppged",
    logo: `${LOGO_BASE}/ppged.png`,
    descricao: [
      "O PPGED da Uergs tem como propósito contribuir para a formação e a qualificação de profissionais da educação, promovendo a produção de conhecimentos voltados à compreensão e à transformação das práticas educacionais.",
      "As pesquisas do Mestrado Profissional em Educação abordam diferentes dimensões dos processos educativos, incluindo formação de professores, práticas pedagógicas, políticas educacionais, inclusão, diversidade, direitos humanos, tecnologias educacionais e desafios relacionados à Educação Básica.",
    ],
    destaque: "Forte concentração no ODS 4 (Educação de Qualidade) — 98,86% das dissertações.",
    cor: "#C5192D", total: 88, diretasN: 88, diretasPct: 1.0, indiretasN: 19, indiretasPct: 0.2159, kappaGeral: 0.1087,
    cincoPs: { pessoas: 1.0, planeta: 0, prosperidade: 0.1932, paz: 0, parcerias: 0 },
    concordanciaPositiva: { direta: 0.0584, indireta: 0.0278, geral: 0.0453 },
  },
  {
    slug: "ppgas", sigla: "PPGAS", dbPrograma: "PPGAS",
    nomeCompleto: "Programa de Pós-Graduação em Ambiente e Sustentabilidade",
    tipo: "Mestrado Profissional",
    paginaOficial: "https://proppg.uergs.edu.br/mestrados/ppgas",
    logo: `${LOGO_BASE}/ppgas.png`,
    descricao: [
      "O PPGAS da Uergs desenvolve atividades de formação e pesquisa com abordagem interdisciplinar, voltadas à compreensão dos desafios socioambientais contemporâneos e à construção de alternativas que contribuam para o desenvolvimento sustentável.",
      "As pesquisas contemplam temáticas relacionadas à conservação e ao manejo da biodiversidade, às relações entre sociedade e ambiente e ao desenvolvimento de tecnologias sustentáveis, buscando produzir conhecimentos e soluções aplicáveis às demandas dos diferentes territórios.",
    ],
    destaque: "Distribuição diversificada, com destaque para os ODS 15 (30,14%) e 12 (19,18%).",
    cor: "#4C9F38", total: 73, diretasN: 69, diretasPct: 0.9452, indiretasN: 66, indiretasPct: 0.9041, kappaGeral: 0.1142,
    cincoPs: { pessoas: 0.3151, planeta: 0.6575, prosperidade: 0.1918, paz: 0.0685, parcerias: 0.0137 },
    concordanciaPositiva: { direta: 0.0567, indireta: 0.0828, geral: 0.0829 },
  },
  {
    slug: "ppgcta", sigla: "PPGCTA", dbPrograma: "PPGCTA",
    nomeCompleto: "Programa de Pós-Graduação em Ciência e Tecnologia de Alimentos",
    tipo: "Mestrado Profissional",
    paginaOficial: "https://proppg.uergs.edu.br/mestrados/ppgcta",
    logo: `${LOGO_BASE}/ppgcta.png`,
    descricao: [
      "O PPGCTA da Uergs tem como finalidade promover a formação técnico-científica e o desenvolvimento de pesquisas aplicadas às demandas da cadeia produtiva de alimentos.",
      "As pesquisas abrangem áreas relacionadas à qualidade e à segurança dos alimentos, ao desenvolvimento de novos produtos, à inovação de processos e ao aperfeiçoamento de tecnologias voltadas ao setor agroalimentar.",
      "A produção científica apresenta possibilidades de articulação com os desafios do desenvolvimento sustentável, especialmente quanto à inovação tecnológica, à melhoria dos sistemas produtivos e à utilização eficiente dos recursos.",
    ],
    destaque: "Maior representatividade nos ODS 12 (Consumo e Produção Responsáveis — 34,29%) e 3 (Saúde e Bem-Estar).",
    cor: "#FD6925", total: 35, diretasN: 28, diretasPct: 0.8, indiretasN: 31, indiretasPct: 0.8857, kappaGeral: 0.0510,
    cincoPs: { pessoas: 0.3429, planeta: 0.3429, prosperidade: 0.1429, paz: 0, parcerias: 0 },
    concordanciaPositiva: { direta: 0.0500, indireta: 0.0278, geral: 0.0377 },
  },
  {
    slug: "ppgcsbio", sigla: "PPGSCBIO", dbPrograma: "PPGCSBIO",
    nomeCompleto: "Programa de Pós-Graduação em Sistemática e Conservação da Diversidade Biológica",
    tipo: "Mestrado Acadêmico",
    paginaOficial: "https://proppg.uergs.edu.br/mestrados/ppgscbio",
    logo: `${LOGO_BASE}/ppgscbio.png`,
    descricao: [
      "O PPGSCBIO é desenvolvido de forma associativa entre a Universidade Estadual do Rio Grande do Sul (Uergs) e a Secretaria do Meio Ambiente e Infraestrutura do Estado do Rio Grande do Sul (SEMA).",
      "O Programa tem como finalidade ampliar a produção de conhecimentos científicos sobre a diversidade biológica, contemplando estudos relacionados à sistemática, taxonomia, ecologia, evolução, história natural e conservação da biodiversidade.",
      "As pesquisas contribuem para a compreensão dos organismos e de suas relações com o ambiente, produzindo conhecimentos que podem subsidiar estratégias de conservação, manejo e proteção da diversidade biológica.",
    ],
    destaque: "Destaque para o ODS 15 (Vida Terrestre) — 52,94% das dissertações.",
    cor: "#0A97D9", total: 17, diretasN: 11, diretasPct: 0.6471, indiretasN: 16, indiretasPct: 0.9412, kappaGeral: 0.2497,
    cincoPs: { pessoas: 0, planeta: 0.6471, prosperidade: 0, paz: 0, parcerias: 0 },
    concordanciaPositiva: { direta: 0.1765, indireta: 0.0645, geral: 0.1190 },
  },
  {
    slug: "ppgstem", sigla: "PPGSTEM", dbPrograma: "PPGSTEM",
    nomeCompleto: "Programa de Pós-Graduação em Formação Docente para Ciências, Tecnologias, Engenharias e Matemática",
    tipo: "Mestrado Profissional",
    paginaOficial: "https://proppg.uergs.edu.br/mestrados/ppgstem",
    logo: `${LOGO_BASE}/ppgstem.png`,
    descricao: [
      "O PPGSTEM da Uergs tem como objetivo contribuir para a qualificação da formação docente, promovendo o desenvolvimento de conhecimentos e práticas educacionais relacionados ao ensino de Ciências, Tecnologias, Engenharias e Matemática.",
      "As pesquisas contemplam abordagens pedagógicas, metodologias de ensino, tecnologias digitais e processos de inovação educacional, buscando contribuir para o aprimoramento das práticas docentes e dos processos de ensino e aprendizagem.",
      "A produção científica possibilita reflexões sobre os desafios da educação contemporânea e sobre o papel da formação docente na construção de uma sociedade mais inclusiva, inovadora e sustentável.",
    ],
    destaque: "Forte concentração no ODS 4 (Educação de Qualidade) — 100% das dissertações.",
    cor: "#8B5CF6", total: 41, diretasN: 41, diretasPct: 1.0, indiretasN: 8, indiretasPct: 0.1951, kappaGeral: 0.1548,
    cincoPs: { pessoas: 1.0, planeta: 0, prosperidade: 0, paz: 0, parcerias: 0 },
    concordanciaPositiva: { direta: 0.0189, indireta: 0.0571, geral: 0.0467 },
  },
];

// Bloco 02 — Aderência direta a cada ODS (incidências institucionais = soma dos 5 PPGs)
// n = dissertações com aderência direta àquele ODS (contadas uma vez por ODS). Total de incidências = 288.
export const ODS_DIRETAS: { n: number; incidencias: number }[] = [
  { n: 1, incidencias: 0 },
  { n: 2, incidencias: 14 },
  { n: 3, incidencias: 11 },
  { n: 4, incidencias: 138 },
  { n: 5, incidencias: 7 },
  { n: 6, incidencias: 8 },
  { n: 7, incidencias: 0 },
  { n: 8, incidencias: 5 },
  { n: 9, incidencias: 5 },
  { n: 10, incidencias: 19 },
  { n: 11, incidencias: 9 },
  { n: 12, incidencias: 26 },
  { n: 13, incidencias: 4 },
  { n: 14, incidencias: 5 },
  { n: 15, incidencias: 31 },
  { n: 16, incidencias: 5 },
  { n: 17, incidencias: 1 },
];

// Matriz 17 ODS × 5 PPGs (aderência direta, n) — ordem = PROGRAMAS acima [PPGED, PPGAS, PPGCTA, PPGCSBIO, PPGSTEM]
export const ODS_POR_PROGRAMA: Record<number, number[]> = {
  1: [0, 0, 0, 0, 0],
  2: [0, 10, 4, 0, 0],
  3: [0, 3, 8, 0, 0],
  4: [87, 10, 0, 0, 41],
  5: [6, 1, 0, 0, 0],
  6: [0, 7, 0, 1, 0],
  7: [0, 0, 0, 0, 0],
  8: [0, 4, 1, 0, 0],
  9: [0, 1, 4, 0, 0],
  10: [17, 2, 0, 0, 0],
  11: [0, 9, 0, 0, 0],
  12: [0, 14, 12, 0, 0],
  13: [0, 4, 0, 0, 0],
  14: [0, 4, 0, 1, 0],
  15: [0, 22, 0, 9, 0],
  16: [0, 5, 0, 0, 0],
  17: [0, 1, 0, 0, 0],
};

// Bloco "5 Ps da Sustentabilidade" — aderência direta (validação manual), total UERGS
// Grupos: Pessoas = ODS 1–5 | Planeta = ODS 6, 12–15 | Prosperidade = ODS 7–11 | Paz = ODS 16 | Parcerias = ODS 17
export const CINCO_PS = [
  { nome: "Pessoas", n: 164, pct: 0.6457, cor: "#E5243B", desc: "ODS 1–5" },
  { nome: "Planeta", n: 71, pct: 0.2795, cor: "#4C9F38", desc: "ODS 6, 12–15" },
  { nome: "Prosperidade", n: 36, pct: 0.1417, cor: "#FCC30B", desc: "ODS 7–11" },
  { nome: "Paz", n: 5, pct: 0.0197, cor: "#00689D", desc: "ODS 16" },
  { nome: "Parcerias", n: 1, pct: 0.0039, cor: "#19486A", desc: "ODS 17" },
];

// Bloco 04 — Concordância ImpactoSociedade® × validação manual (totais institucionais)
export const CONCORDANCIA = {
  geral: { simples: 0.7937, positiva: 0.0641, kappa: 0.1247, divergencias: 891, pares: 4318 },
  direta: { simples: 0.9152, positiva: 0.0567, kappa: 0.0704 },
  indireta: { simples: 0.8546, positiva: 0.0585, kappa: 0.0556 },
};
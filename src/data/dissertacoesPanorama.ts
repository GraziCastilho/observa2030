// Panorama Geral — Dissertações da Uergs × ODS
// Dados e textos extraídos integralmente do documento base ("Instruções gerais e Informações")
// e da planilha "Levantamento_Final.xlsx". Nenhum dado é recalculado em tempo real —
// os números reproduzem exatamente o levantamento concluído.

const LOGO_BASE =
  "https://nsmwgtepyzwokvsltkda.supabase.co/storage/v1/object/public/observa-imagens/programas";

export type ProgramaInfo = {
  slug: string;         // usado na URL: /dissertacoes/<slug>
  sigla: string;        // acrônimo oficial exibido
  dbPrograma: string;   // valor exato da coluna "programa" no Supabase
  nomeCompleto: string; // nome completo (documento base)
  tipo: string;         // Mestrado Profissional / Mestrado Acadêmico
  paginaOficial: string;
  logo: string;
  descricao: string[];  // parágrafos de apresentação (texto exato do documento)
  introLista: string;   // frase que antecede a lista de dissertações (texto exato do documento)
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

// Bloco 01 — Panorama por programa (classificação manual) + metadados do documento base.
// Ordem das colunas em ODS_POR_PROGRAMA / CINCO_PS_PROGRAMA segue esta lista.
export const PROGRAMAS: ProgramaInfo[] = [
  {
    slug: "ppged", sigla: "PPGED", dbPrograma: "PPGED",
    nomeCompleto: "Programa de Pós-Graduação em Educação",
    tipo: "Mestrado Profissional",
    paginaOficial: "https://proppg.uergs.edu.br/programas-de-pos-graduacao/ppged",
    logo: `${LOGO_BASE}/ppged.png`,
    descricao: [
      "O Programa de Pós-Graduação em Educação (PPGED) da Uergs tem como propósito contribuir para a formação e a qualificação de profissionais da educação, promovendo a produção de conhecimentos voltados à compreensão e à transformação das práticas educacionais.",
      "As pesquisas desenvolvidas no Mestrado Profissional em Educação abordam diferentes dimensões dos processos educativos, incluindo formação de professores, práticas pedagógicas, políticas educacionais, inclusão, diversidade, direitos humanos, tecnologias educacionais e desafios relacionados à Educação Básica.",
    ],
    introLista:
      "A seguir, estão reunidas as dissertações desenvolvidas no âmbito do Mestrado Profissional em Educação, organizadas por ano de defesa, possibilitando o acesso à produção acadêmica do Programa e às informações sobre as pesquisas realizadas.",
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
      "O Programa de Pós-Graduação em Ambiente e Sustentabilidade (PPGAS) da Uergs desenvolve atividades de formação e pesquisa com abordagem interdisciplinar, voltadas à compreensão dos desafios socioambientais contemporâneos e à construção de alternativas que contribuam para o desenvolvimento sustentável.",
      "As pesquisas desenvolvidas no âmbito do Programa contemplam temáticas relacionadas à conservação e ao manejo da biodiversidade, às relações entre sociedade e ambiente e ao desenvolvimento de tecnologias sustentáveis, buscando produzir conhecimentos e soluções aplicáveis às demandas dos diferentes territórios.",
    ],
    introLista:
      "A seguir, estão disponibilizadas as dissertações desenvolvidas no PPGAS, organizadas por ano de defesa, permitindo conhecer a produção científica do Programa e acessar as informações referentes a cada pesquisa.",
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
      "O Programa de Pós-Graduação em Ciência e Tecnologia de Alimentos (PPGCTA) da Uergs tem como finalidade promover a formação técnico-científica e o desenvolvimento de pesquisas aplicadas às demandas da cadeia produtiva de alimentos.",
      "As pesquisas desenvolvidas pelo Programa abrangem áreas relacionadas à qualidade e à segurança dos alimentos, ao desenvolvimento de novos produtos, à inovação de processos e ao aperfeiçoamento de tecnologias voltadas ao setor agroalimentar.",
      "A produção científica do PPGCTA apresenta possibilidades de articulação com os desafios do desenvolvimento sustentável, especialmente no que se refere à inovação tecnológica, à melhoria dos sistemas produtivos e à utilização eficiente dos recursos.",
    ],
    introLista:
      "A seguir, estão disponíveis as dissertações desenvolvidas no Programa, organizadas por ano de defesa, acompanhadas das respectivas informações acadêmicas.",
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
      "O Programa de Pós-Graduação em Sistemática e Conservação da Diversidade Biológica (PPGSCBIO) é desenvolvido de forma associativa entre a Universidade Estadual do Rio Grande do Sul (Uergs) e a Secretaria do Meio Ambiente e Infraestrutura do Estado do Rio Grande do Sul (SEMA).",
      "O Programa tem como finalidade ampliar a produção de conhecimentos científicos sobre a diversidade biológica, contemplando estudos relacionados à sistemática, taxonomia, ecologia, evolução, história natural e conservação da biodiversidade.",
      "As pesquisas desenvolvidas contribuem para a compreensão dos organismos e de suas relações com o ambiente, produzindo conhecimentos que podem subsidiar estratégias de conservação, manejo e proteção da diversidade biológica.",
    ],
    introLista:
      "A seguir, estão apresentadas as dissertações desenvolvidas no PPGSCBIO, organizadas por ano de defesa, com informações sobre as pesquisas realizadas e seus respectivos autores e orientadores.",
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
      "O Programa de Pós-Graduação em Formação Docente para Ciências, Tecnologias, Engenharias e Matemática (PPGSTEM) da Uergs tem como objetivo contribuir para a qualificação da formação docente, promovendo o desenvolvimento de conhecimentos e práticas educacionais relacionados ao ensino de Ciências, Tecnologias, Engenharias e Matemática.",
      "As pesquisas desenvolvidas no Programa contemplam abordagens pedagógicas, metodologias de ensino, tecnologias digitais e processos de inovação educacional, buscando contribuir para o aprimoramento das práticas docentes e dos processos de ensino e aprendizagem.",
      "A produção científica do PPGSTEM possibilita reflexões sobre os desafios da educação contemporânea e sobre o papel da formação docente na construção de uma sociedade mais inclusiva, inovadora e sustentável.",
    ],
    introLista:
      "A seguir, estão disponibilizadas as dissertações desenvolvidas no Programa, organizadas por ano de defesa, com as informações acadêmicas correspondentes a cada pesquisa.",
    cor: "#8B5CF6", total: 41, diretasN: 41, diretasPct: 1.0, indiretasN: 8, indiretasPct: 0.1951, kappaGeral: 0.1548,
    cincoPs: { pessoas: 1.0, planeta: 0, prosperidade: 0, paz: 0, parcerias: 0 },
    concordanciaPositiva: { direta: 0.0189, indireta: 0.0571, geral: 0.0467 },
  },
];

// Bloco 02 — Aderência direta a cada ODS (incidências institucionais = soma dos 5 PPGs)
// incidencias = nº de dissertações com aderência direta àquele ODS (contadas uma vez por ODS).
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

// Total de incidências diretas por programa (rodapé da tabela "Aderência direta aos 17 ODS")
// Ordem = PROGRAMAS. n = soma das incidências; pct = n / total do programa.
export const INCIDENCIAS_PROGRAMA: { n: number; pct: number }[] = [
  { n: 110, pct: 1.25 },   // PPGED
  { n: 97, pct: 1.3288 },  // PPGAS
  { n: 29, pct: 0.8286 },  // PPGCTA
  { n: 11, pct: 0.6471 },  // PPGCSBIO
  { n: 41, pct: 1.0 },     // PPGSTEM
];

// Bloco "5 Ps da Sustentabilidade" — aderência direta (validação manual), total UERGS
// Grupos: Pessoas = ODS 1–5 | Planeta = ODS 6, 12–15 | Prosperidade = ODS 7–11 | Paz = ODS 16 | Parcerias = ODS 17
export const CINCO_PS = [
  { nome: "Pessoas", n: 164, pct: 0.6457, cor: "#E5243B", desc: "ODS 1–5" },
  { nome: "Planeta", n: 71, pct: 0.2795, cor: "#4C9F38", desc: "ODS 6, 12–15" },
  { nome: "Prosperidade", n: 36, pct: 0.1417, cor: "#FCC30B", desc: "ODS 7–11" },
  { nome: "Paz", n: 5, pct: 0.0197, cor: "#00689D", desc: "ODS 16" },
  { nome: "Parcerias", n: 1, pct: 0.0039, cor: "#19486A", desc: "ODS 17" },
];

// 5 Ps por programa — n e percentual (validação manual). Ordem das linhas = PROGRAMAS.
// Cada objeto traz, para cada P, [n, pct(0–1)].
export const CINCO_PS_PROGRAMA: Record<
  string,
  { pessoas: [number, number]; planeta: [number, number]; prosperidade: [number, number]; paz: [number, number]; parcerias: [number, number] }
> = {
  PPGED:    { pessoas: [88, 1.0],    planeta: [0, 0],       prosperidade: [17, 0.1932], paz: [0, 0],       parcerias: [0, 0] },
  PPGAS:    { pessoas: [23, 0.3151], planeta: [48, 0.6575], prosperidade: [14, 0.1918], paz: [5, 0.0685],  parcerias: [1, 0.0137] },
  PPGCTA:   { pessoas: [12, 0.3429], planeta: [12, 0.3429], prosperidade: [5, 0.1429],  paz: [0, 0],       parcerias: [0, 0] },
  PPGSCBIO: { pessoas: [0, 0],       planeta: [11, 0.6471], prosperidade: [0, 0],       paz: [0, 0],       parcerias: [0, 0] },
  PPGSTEM:  { pessoas: [41, 1.0],    planeta: [0, 0],       prosperidade: [0, 0],       paz: [0, 0],       parcerias: [0, 0] },
};
// Totais institucionais dos 5 Ps (rodapé da tabela)
export const CINCO_PS_TOTAL = {
  total: 254,
  pessoas: [164, 0.646] as [number, number],
  planeta: [71, 0.28] as [number, number],
  prosperidade: [36, 0.142] as [number, number],
  paz: [5, 0.02] as [number, number],
  parcerias: [1, 0.004] as [number, number],
};

// Bloco 04 — Concordância ImpactoSociedade® × validação manual (totais institucionais)
export const CONCORDANCIA = {
  geral: { simples: 0.7937, positiva: 0.0641, kappa: 0.1247, divergencias: 891, pares: 4318 },
  direta: { simples: 0.9152, positiva: 0.0567, kappa: 0.0704 },
  indireta: { simples: 0.8546, positiva: 0.0585, kappa: 0.0556 },
};

// Tabelas completas de concordância (4A / 4B / 4C) — reprodução exata do documento base.
export type LinhaConcDir = {
  ppg: string; posAmbos: number; soSoftware: number; soManual: number; uniaoPositiva: number;
  simples: number; positiva: number; kappa: number; taxaManual: number; taxaSoftware: number; pares: number;
};
// 4A — Concordância das classificações diretas
export const CONC_DIRETA: LinhaConcDir[] = [
  { ppg: "PPGAS",    posAmbos: 8, soSoftware: 44, soManual: 89,  uniaoPositiva: 141, simples: 0.8928, positiva: 0.0567, kappa: 0.056, taxaManual: 0.0782, taxaSoftware: 0.0419, pares: 1241 },
  { ppg: "PPGED",    posAmbos: 8, soSoftware: 27, soManual: 102, uniaoPositiva: 137, simples: 0.9138, positiva: 0.0584, kappa: 0.078, taxaManual: 0.0735, taxaSoftware: 0.0234, pares: 1496 },
  { ppg: "PPGCTA",   posAmbos: 2, soSoftware: 11, soManual: 27,  uniaoPositiva: 40,  simples: 0.9361, positiva: 0.0500, kappa: 0.067, taxaManual: 0.0487, taxaSoftware: 0.0218, pares: 595 },
  { ppg: "PPGCSBIO", posAmbos: 3, soSoftware: 6,  soManual: 8,   uniaoPositiva: 17,  simples: 0.9516, positiva: 0.1765, kappa: 0.275, taxaManual: 0.0381, taxaSoftware: 0.0311, pares: 289 },
  { ppg: "PPGSTEM",  posAmbos: 1, soSoftware: 12, soManual: 40,  uniaoPositiva: 53,  simples: 0.9254, positiva: 0.0189, kappa: 0.009, taxaManual: 0.0588, taxaSoftware: 0.0187, pares: 697 },
];
export const CONC_DIRETA_TOTAL: LinhaConcDir = {
  ppg: "TOTAL", posAmbos: 22, soSoftware: 100, soManual: 266, uniaoPositiva: 388,
  simples: 0.9152, positiva: 0.0567, kappa: 0.070, taxaManual: 0.0667, taxaSoftware: 0.0283, pares: 4318,
};
// 4B — Concordância das classificações indiretas
export const CONC_INDIRETA: LinhaConcDir[] = [
  { ppg: "PPGAS",    posAmbos: 26, soSoftware: 237, soManual: 51, uniaoPositiva: 314, simples: 0.7673, positiva: 0.0828, kappa: 0.063,  taxaManual: 0.0620, taxaSoftware: 0.2119, pares: 1241 },
  { ppg: "PPGED",    posAmbos: 5,  soSoftware: 157, soManual: 18, uniaoPositiva: 180, simples: 0.8830, positiva: 0.0278, kappa: 0.028,  taxaManual: 0.0154, taxaSoftware: 0.1083, pares: 1496 },
  { ppg: "PPGCTA",   posAmbos: 2,  soSoftware: 37,  soManual: 33, uniaoPositiva: 72,  simples: 0.8824, positiva: 0.0278, kappa: -0.008, taxaManual: 0.0588, taxaSoftware: 0.0655, pares: 595 },
  { ppg: "PPGCSBIO", posAmbos: 2,  soSoftware: 13,  soManual: 16, uniaoPositiva: 31,  simples: 0.8997, positiva: 0.0645, kappa: 0.068,  taxaManual: 0.0623, taxaSoftware: 0.0519, pares: 289 },
  { ppg: "PPGSTEM",  posAmbos: 4,  soSoftware: 60,  soManual: 6,  uniaoPositiva: 70,  simples: 0.9053, positiva: 0.0571, kappa: 0.085,  taxaManual: 0.0143, taxaSoftware: 0.0918, pares: 697 },
];
export const CONC_INDIRETA_TOTAL: LinhaConcDir = {
  ppg: "TOTAL", posAmbos: 39, soSoftware: 504, soManual: 124, uniaoPositiva: 667,
  simples: 0.8546, positiva: 0.0585, kappa: 0.056, taxaManual: 0.0377, taxaSoftware: 0.1258, pares: 4318,
};
// 4C — Concordância geral (três classes: ausente / direta / indireta)
export type LinhaConcGeral = {
  ppg: string; pares: number; mesmaClasse: number; simples: number; positiva: number;
  esperada: number; kappa: number; divergencias: number;
};
export const CONC_GERAL: LinhaConcGeral[] = [
  { ppg: "PPGAS",    pares: 1241, mesmaClasse: 865,  simples: 0.6970, positiva: 0.0829, esperada: 0.6580, kappa: 0.114, divergencias: 376 },
  { ppg: "PPGED",    pares: 1496, mesmaClasse: 1222, simples: 0.8168, positiva: 0.0453, esperada: 0.7945, kappa: 0.109, divergencias: 274 },
  { ppg: "PPGCTA",   pares: 595,  mesmaClasse: 493,  simples: 0.8286, positiva: 0.0377, esperada: 0.8194, kappa: 0.051, divergencias: 102 },
  { ppg: "PPGCSBIO", pares: 289,  mesmaClasse: 252,  simples: 0.8720, positiva: 0.1190, esperada: 0.8294, kappa: 0.250, divergencias: 37 },
  { ppg: "PPGSTEM",  pares: 697,  mesmaClasse: 595,  simples: 0.8537, positiva: 0.0467, esperada: 0.8263, kappa: 0.155, divergencias: 102 },
];
export const CONC_GERAL_TOTAL: LinhaConcGeral = {
  ppg: "TOTAL", pares: 4318, mesmaClasse: 3427, simples: 0.7937, positiva: 0.0641, esperada: 0.7643, kappa: 0.125, divergencias: 891,
};
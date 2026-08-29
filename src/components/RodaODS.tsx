import { useState } from "react";

const BASE =
  "https://nsmwgtepyzwokvsltkda.supabase.co/storage/v1/object/public/observa-imagens/ods";

export const LOGO_OBSERVA =
  "https://nsmwgtepyzwokvsltkda.supabase.co/storage/v1/object/public/observa-imagens/logos/Logo-ProjetoObserva2030.png";

export type Ods = {
  n: number;
  cor: string;
  img: string;
  nome: string;
  objetivo: string;
  metas: string[];
  tipo?: "metas" | "visao";
};

const RAIO = 46; // % do container
const PASSO = 360 / 17;

export const ODS_17: Ods[] = [
  { n:1, cor:"#E5243B", img:`${BASE}/ODS1.svg`, nome:"Erradicação da Pobreza",
    objetivo:"Acabar com a pobreza em todas as suas formas, em todos os lugares.",
    metas:[
      "1.1 — Até 2030, erradicar a pobreza extrema para todas as pessoas em todos os lugares, atualmente medida como pessoas vivendo com menos de US$ 1,90 por dia",
      "1.2 — Até 2030, reduzir pelo menos à metade a proporção de homens, mulheres e crianças, de todas as idades, que vivem na pobreza, em todas as suas dimensões, de acordo com as definições nacionais",
      "1.3 — Implementar, em nível nacional, medidas e sistemas de proteção social adequados, para todos, incluindo pisos, e até 2030 atingir a cobertura substancial dos pobres e vulneráveis",
      "1.4 — Até 2030, garantir que todos os homens e mulheres, particularmente os pobres e vulneráveis, tenham direitos iguais aos recursos econômicos, bem como o acesso a serviços básicos, propriedade e controle sobre a terra e outras formas de propriedade, herança, recursos naturais, novas tecnologias apropriadas e serviços financeiros, incluindo microfinanças",
      "1.5 — Até 2030, construir a resiliência dos pobres e daqueles em situação de vulnerabilidade, e reduzir a exposição e vulnerabilidade destes a eventos extremos relacionados com o clima e outros choques e desastres econômicos, sociais e ambientais",
      "1.a — Garantir uma mobilização significativa de recursos a partir de uma variedade de fontes, inclusive por meio do reforço da cooperação para o desenvolvimento, para proporcionar meios adequados e previsíveis para que os países em desenvolvimento implementem programas e políticas para acabar com a pobreza em todas as suas dimensões",
      "1.b — Criar marcos políticos sólidos em níveis nacional, regional e internacional, com base em estratégias de desenvolvimento a favor dos pobres e sensíveis a gênero, para apoiar investimentos acelerados nas ações de erradicação da pobreza"
    ] },
  { n:2, cor:"#DDA63A", img:`${BASE}/ODS2.svg`, nome:"Fome Zero e Agricultura Sustentável",
    objetivo:"Acabar com a fome, alcançar a segurança alimentar e melhoria da nutrição e promover a agricultura sustentável.",
    metas:[
      "2.1 — Até 2030, acabar com a fome e garantir o acesso de todas as pessoas, em particular os pobres e pessoas em situações vulneráveis, incluindo crianças, a alimentos seguros, nutritivos e suficientes durante todo o ano",
      "2.2 — Até 2030, acabar com todas as formas de desnutrição, incluindo atingir, até 2025, as metas acordadas internacionalmente sobre nanismo e caquexia em crianças menores de cinco anos de idade, e atender às necessidades nutricionais dos adolescentes, mulheres grávidas e lactantes e pessoas idosas",
      "2.3 — Até 2030, dobrar a produtividade agrícola e a renda dos pequenos produtores de alimentos, particularmente das mulheres, povos indígenas, agricultores familiares, pastores e pescadores, inclusive por meio de acesso seguro e igual à terra, outros recursos produtivos e insumos, conhecimento, serviços financeiros, mercados e oportunidades de agregação de valor e de emprego não agrícola",
      "2.4 — Até 2030, garantir sistemas sustentáveis de produção de alimentos e implementar práticas agrícolas resilientes, que aumentem a produtividade e a produção, que ajudem a manter os ecossistemas, que fortaleçam a capacidade de adaptação às mudanças climáticas, às condições meteorológicas extremas, secas, inundações e outros desastres, e que melhorem progressivamente a qualidade da terra e do solo",
      "2.5 — Até 2020, manter a diversidade genética de sementes, plantas cultivadas, animais de criação e domesticados e suas respectivas espécies selvagens, inclusive por meio de bancos de sementes e plantas diversificados e bem geridos em nível nacional, regional e internacional",
      "2.a — Aumentar o investimento, inclusive via o reforço da cooperação internacional, em infraestrutura rural, pesquisa e extensão de serviços agrícolas, desenvolvimento de tecnologia, e os bancos de genes de plantas e animais, para aumentar a capacidade de produção agrícola nos países em desenvolvimento",
      "2.b — Corrigir e prevenir as restrições ao comércio e distorções nos mercados agrícolas mundiais, incluindo a eliminação paralela de todas as formas de subsídios à exportação e todas as medidas de exportação com efeito equivalente",
      "2.c — Adotar medidas para garantir o funcionamento adequado dos mercados de commodities de alimentos e seus derivados, e facilitar o acesso oportuno à informação de mercado, inclusive sobre as reservas de alimentos, a fim de ajudar a limitar a volatilidade extrema dos preços dos alimentos"
    ] },
  { n:3, cor:"#4C9F38", img:`${BASE}/ODS3.svg`, nome:"Saúde e Bem-Estar",
    objetivo:"Assegurar uma vida saudável e promover o bem-estar para todas e todos, em todas as idades.",
    metas:[
      "3.1 — Até 2030, reduzir a taxa de mortalidade materna global para menos de 70 mortes por 100.000 nascidos vivos",
      "3.2 — Até 2030, acabar com as mortes evitáveis de recém-nascidos e crianças menores de 5 anos, com todos os países objetivando reduzir a mortalidade neonatal para pelo menos 12 por 1.000 nascidos vivos e a mortalidade de crianças menores de 5 anos para pelo menos 25 por 1.000 nascidos vivos",
      "3.3 — Até 2030, acabar com as epidemias de AIDS, tuberculose, malária e doenças tropicais negligenciadas, e combater a hepatite, doenças transmitidas pela água, e outras doenças transmissíveis",
      "3.4 — Até 2030, reduzir em um terço a mortalidade prematura por doenças não transmissíveis via prevenção e tratamento, e promover a saúde mental e o bem-estar",
      "3.5 — Reforçar a prevenção e o tratamento do abuso de substâncias, incluindo o abuso de drogas entorpecentes e uso nocivo do álcool",
      "3.6 — Até 2020, reduzir pela metade as mortes e os ferimentos globais por acidentes em estradas",
      "3.7 — Até 2030, assegurar o acesso universal aos serviços de saúde sexual e reprodutiva, incluindo o planejamento familiar, informação e educação, bem como a integração da saúde reprodutiva em estratégias e programas nacionais",
      "3.8 — Atingir a cobertura universal de saúde, incluindo a proteção do risco financeiro, o acesso a serviços de saúde essenciais de qualidade e o acesso a medicamentos e vacinas essenciais seguros, eficazes, de qualidade e a preços acessíveis para todos",
      "3.9 — Até 2030, reduzir substancialmente o número de mortes e doenças por produtos químicos perigosos, contaminação e poluição do ar e água do solo",
      "3.a — Fortalecer a implementação da Convenção-Quadro para o Controle do Tabaco em todos os países, conforme apropriado",
      "3.b — Apoiar a pesquisa e o desenvolvimento de vacinas e medicamentos para as doenças transmissíveis e não transmissíveis, que afetam principalmente os países em desenvolvimento, proporcionar o acesso a medicamentos e vacinas essenciais a preços acessíveis, de acordo com a Declaração de Doha",
      "3.c — Aumentar substancialmente o financiamento da saúde e o recrutamento, desenvolvimento e formação, e retenção do pessoal de saúde nos países em desenvolvimento, especialmente nos países menos desenvolvidos e nos pequenos Estados insulares em desenvolvimento",
      "3.d — Reforçar a capacidade de todos os países, particularmente os países em desenvolvimento, para o alerta precoce, redução de riscos e gerenciamento de riscos nacionais e globais de saúde"
    ] },
  { n:4, cor:"#C5192D", img:`${BASE}/ODS4.svg`, nome:"Educação de Qualidade",
    objetivo:"Assegurar a educação inclusiva e equitativa e de qualidade, e promover oportunidades de aprendizagem ao longo da vida para todas e todos.",
    metas:[
      "4.1 — Até 2030, garantir que todas as meninas e meninos completem o ensino primário e secundário livre, equitativo e de qualidade, que conduza a resultados de aprendizagem relevantes e eficazes",
      "4.2 — Até 2030, garantir que todos as meninas e meninos tenham acesso a um desenvolvimento de qualidade na primeira infância, cuidados e educação pré-escolar, de modo que eles estejam prontos para o ensino primário",
      "4.3 — Até 2030, assegurar a igualdade de acesso para todos os homens e mulheres à educação técnica, profissional e superior de qualidade, a preços acessíveis, incluindo universidade",
      "4.4 — Até 2030, aumentar substancialmente o número de jovens e adultos que tenham habilidades relevantes, inclusive competências técnicas e profissionais, para emprego, trabalho decente e empreendedorismo",
      "4.5 — Até 2030, eliminar as disparidades de gênero na educação e garantir a igualdade de acesso a todos os níveis de educação e formação profissional para os mais vulneráveis, incluindo as pessoas com deficiência, povos indígenas e as crianças em situação de vulnerabilidade",
      "4.6 — Até 2030, garantir que todos os jovens e uma substancial proporção dos adultos, homens e mulheres estejam alfabetizados e tenham adquirido o conhecimento básico de matemática",
      "4.7 — Até 2030, garantir que todos os alunos adquiram conhecimentos e habilidades necessárias para promover o desenvolvimento sustentável, inclusive, entre outros, por meio da educação para o desenvolvimento sustentável e estilos de vida sustentáveis, direitos humanos, igualdade de gênero, promoção de uma cultura de paz e não violência, cidadania global e valorização da diversidade cultural",
      "4.a — Construir e melhorar instalações físicas para educação, apropriadas para crianças e sensíveis às deficiências e ao gênero, e que proporcionem ambientes de aprendizagem seguros e não violentos, inclusivos e eficazes para todos",
      "4.b — Até 2020, substancialmente ampliar globalmente o número de bolsas de estudo para os países em desenvolvimento para o ensino superior, incluindo programas de formação profissional, de tecnologia da informação e da comunicação, técnicos, de engenharia e programas científicos",
      "4.c — Até 2030, substancialmente aumentar o contingente de professores qualificados, inclusive por meio da cooperação internacional para a formação de professores, nos países em desenvolvimento, especialmente os países menos desenvolvidos e pequenos Estados insulares em desenvolvimento"
    ] },
  { n:5, cor:"#FF3A21", img:`${BASE}/ODS5.svg`, nome:"Igualdade de Gênero",
    objetivo:"Alcançar a igualdade de gênero e empoderar todas as mulheres e meninas.",
    metas:[
      "5.1 — Acabar com todas as formas de discriminação contra todas as mulheres e meninas em toda parte",
      "5.2 — Eliminar todas as formas de violência contra todas as mulheres e meninas nas esferas públicas e privadas, incluindo o tráfico e exploração sexual e de outros tipos",
      "5.3 — Eliminar todas as práticas nocivas, como os casamentos prematuros, forçados e de crianças e mutilações genitais femininas",
      "5.4 — Reconhecer e valorizar o trabalho de assistência e doméstico não remunerado, por meio da disponibilização de serviços públicos, infraestrutura e políticas de proteção social, bem como a promoção da responsabilidade compartilhada dentro do lar e da família, conforme os contextos nacionais",
      "5.5 — Garantir a participação plena e efetiva das mulheres e a igualdade de oportunidades para a liderança em todos os níveis de tomada de decisão na vida política, econômica e pública",
      "5.6 — Assegurar o acesso universal à saúde sexual e reprodutiva e os direitos reprodutivos, como acordado em conformidade com o Programa de Ação da Conferência Internacional sobre População e Desenvolvimento",
      "5.a — Realizar reformas para dar às mulheres direitos iguais aos recursos econômicos, bem como o acesso a propriedade e controle sobre a terra e outras formas de propriedade, serviços financeiros, herança e os recursos naturais, de acordo com as leis nacionais",
      "5.b — Aumentar o uso de tecnologias de base, em particular as tecnologias de informação e comunicação, para promover o empoderamento das mulheres",
      "5.c — Adotar e fortalecer políticas sólidas e legislação aplicável para a promoção da igualdade de gênero e o empoderamento de todas as mulheres e meninas em todos os níveis"
    ] },
  { n:6, cor:"#26BDE2", img:`${BASE}/ODS6.svg`, nome:"Água Potável e Saneamento",
    objetivo:"Assegurar a disponibilidade e gestão sustentável da água e saneamento para todas e todos.",
    metas:[
      "6.1 — Até 2030, alcançar o acesso universal e equitativo a água potável e segura para todos",
      "6.2 — Até 2030, alcançar o acesso a saneamento e higiene adequados e equitativos para todos, e acabar com a defecação a céu aberto, com especial atenção para as necessidades das mulheres e meninas e daqueles em situação de vulnerabilidade",
      "6.3 — Até 2030, melhorar a qualidade da água, reduzindo a poluição, eliminando despejo e minimizando a liberação de produtos químicos e materiais perigosos, reduzindo à metade a proporção de águas residuais não tratadas e aumentando substancialmente a reciclagem e reutilização segura globalmente",
      "6.4 — Até 2030, aumentar substancialmente a eficiência do uso da água em todos os setores e assegurar retiradas sustentáveis e o abastecimento de água doce para enfrentar a escassez de água",
      "6.5 — Até 2030, implementar a gestão integrada dos recursos hídricos em todos os níveis, inclusive via cooperação transfronteiriça, conforme apropriado",
      "6.6 — Até 2020, proteger e restaurar ecossistemas relacionados com a água, incluindo montanhas, florestas, zonas úmidas, rios, aquíferos e lagos",
      "6.a — Até 2030, ampliar a cooperação internacional e o apoio à capacitação para os países em desenvolvimento em atividades e programas relacionados à água e saneamento",
      "6.b — Apoiar e fortalecer a participação das comunidades locais, para melhorar a gestão da água e do saneamento"
    ] },
  { n:7, cor:"#FCC30B", img:`${BASE}/ODS7.svg`, nome:"Energia Limpa e Acessível",
    objetivo:"Assegurar o acesso confiável, sustentável, moderno e a preço acessível à energia para todas e todos.",
    metas:[
      "7.1 — Até 2030, assegurar o acesso universal, confiável, moderno e a preços acessíveis a serviços de energia",
      "7.2 — Até 2030, aumentar substancialmente a participação de energias renováveis na matriz energética global",
      "7.3 — Até 2030, dobrar a taxa global de melhoria da eficiência energética",
      "7.a — Até 2030, reforçar a cooperação internacional para facilitar o acesso a pesquisa e tecnologias de energia limpa, incluindo energias renováveis, eficiência energética e tecnologias de combustíveis fósseis avançadas e mais limpas",
      "7.b — Até 2030, expandir a infraestrutura e modernizar a tecnologia para o fornecimento de serviços de energia modernos e sustentáveis para todos nos países em desenvolvimento"
    ] },
  { n:8, cor:"#A21942", img:`${BASE}/ODS8.svg`, nome:"Trabalho Decente e Crescimento Econômico",
    objetivo:"Promover o crescimento econômico sustentado, inclusivo e sustentável, emprego pleno e produtivo e trabalho decente para todas e todos.",
    metas:[
      "8.1 — Sustentar o crescimento econômico per capita de acordo com as circunstâncias nacionais e, em particular, um crescimento anual de pelo menos 7% do produto interno bruto [PIB] nos países menos desenvolvidos",
      "8.2 — Atingir níveis mais elevados de produtividade das economias por meio da diversificação, modernização tecnológica e inovação",
      "8.3 — Promover políticas orientadas para o desenvolvimento que apoiem as atividades produtivas, geração de emprego decente, empreendedorismo, criatividade e inovação",
      "8.4 — Melhorar progressivamente, até 2030, a eficiência dos recursos globais no consumo e na produção",
      "8.5 — Até 2030, alcançar o emprego pleno e produtivo e trabalho decente para todas as mulheres e homens, inclusive para os jovens e as pessoas com deficiência, e remuneração igual para trabalho de igual valor",
      "8.6 — Até 2020, reduzir substancialmente a proporção de jovens sem emprego, educação ou formação",
      "8.7 — Tomar medidas imediatas e eficazes para erradicar o trabalho forçado, acabar com a escravidão moderna e o tráfico de pessoas, e até 2025 acabar com o trabalho infantil em todas as suas formas",
      "8.8 — Proteger os direitos trabalhistas e promover ambientes de trabalho seguros e protegidos para todos os trabalhadores, incluindo os trabalhadores migrantes",
      "8.9 — Até 2030, elaborar e implementar políticas para promover o turismo sustentável, que gera empregos e promove a cultura e os produtos locais",
      "8.10 — Fortalecer a capacidade das instituições financeiras nacionais para incentivar a expansão do acesso aos serviços bancários, de seguros e financeiros para todos",
      "8.a — Aumentar o apoio da Iniciativa de Ajuda para o Comércio [Aid for Trade] para os países em desenvolvimento, particularmente os países menos desenvolvidos",
      "8.b — Até 2020, desenvolver e operacionalizar uma estratégia global para o emprego dos jovens e implementar o Pacto Mundial para o Emprego da Organização Internacional do Trabalho [OIT]"
    ] },
  { n:9, cor:"#FD6925", img:`${BASE}/ODS9.svg`, nome:"Indústria, Inovação e Infraestrutura",
    objetivo:"Construir infraestruturas resilientes, promover a industrialização inclusiva e sustentável e fomentar a inovação.",
    metas:[
      "9.1 — Desenvolver infraestrutura de qualidade, confiável, sustentável e resiliente, incluindo infraestrutura regional e transfronteiriça, para apoiar o desenvolvimento econômico e o bem-estar humano",
      "9.2 — Promover a industrialização inclusiva e sustentável e, até 2030, aumentar significativamente a participação da indústria no setor de emprego e no PIB",
      "9.3 — Aumentar o acesso das pequenas indústrias e outras empresas, particularmente em países em desenvolvimento, aos serviços financeiros, incluindo crédito acessível",
      "9.4 — Até 2030, modernizar a infraestrutura e reabilitar as indústrias para torná-las sustentáveis, com eficiência aumentada no uso de recursos e maior adoção de tecnologias e processos industriais limpos",
      "9.5 — Fortalecer a pesquisa científica, melhorar as capacidades tecnológicas de setores industriais em todos os países, particularmente os países em desenvolvimento",
      "9.a — Facilitar o desenvolvimento de infraestrutura sustentável e resiliente em países em desenvolvimento, por meio de maior apoio financeiro, tecnológico e técnico",
      "9.b — Apoiar o desenvolvimento tecnológico, a pesquisa e a inovação nacionais nos países em desenvolvimento",
      "9.c — Aumentar significativamente o acesso às tecnologias de informação e comunicação e se empenhar para oferecer acesso universal e a preços acessíveis à internet nos países menos desenvolvidos, até 2020"
    ] },
  { n:10, cor:"#DD1367", img:`${BASE}/ODS10.svg`, nome:"Redução das Desigualdades",
    objetivo:"Reduzir a desigualdade dentro dos países e entre eles.",
    metas:[
      "10.1 — Até 2030, progressivamente alcançar e sustentar o crescimento da renda dos 40% da população mais pobre a uma taxa maior que a média nacional",
      "10.2 — Até 2030, empoderar e promover a inclusão social, econômica e política de todos, independentemente da idade, gênero, deficiência, raça, etnia, origem, religião, condição econômica ou outra",
      "10.3 — Garantir a igualdade de oportunidades e reduzir as desigualdades de resultados, inclusive por meio da eliminação de leis, políticas e práticas discriminatórias",
      "10.4 — Adotar políticas, especialmente fiscal, salarial e de proteção social, e alcançar progressivamente uma maior igualdade",
      "10.5 — Melhorar a regulamentação e monitoramento dos mercados e instituições financeiras globais",
      "10.6 — Assegurar uma representação e voz mais forte dos países em desenvolvimento em tomadas de decisão nas instituições econômicas e financeiras internacionais globais",
      "10.7 — Facilitar a migração e a mobilidade ordenada, segura, regular e responsável das pessoas",
      "10.a — Implementar o princípio do tratamento especial e diferenciado para países em desenvolvimento, em conformidade com os acordos da OMC",
      "10.b — Incentivar a assistência oficial ao desenvolvimento e fluxos financeiros, incluindo o investimento externo direto, para os Estados onde a necessidade é maior",
      "10.c — Até 2030, reduzir para menos de 3% os custos de transação de remessas dos migrantes e eliminar os corredores de remessas com custos superiores a 5%"
    ] },
  { n:11, cor:"#FD9D24", img:`${BASE}/ODS11.svg`, nome:"Cidades e Comunidades Sustentáveis",
    objetivo:"Tornar as cidades e os assentamentos humanos inclusivos, seguros, resilientes e sustentáveis.",
    metas:[
      "11.1 — Até 2030, garantir o acesso de todos à habitação segura, adequada e a preço acessível, e aos serviços básicos e urbanizar as favelas",
      "11.2 — Até 2030, proporcionar o acesso a sistemas de transporte seguros, acessíveis, sustentáveis e a preço acessível para todos",
      "11.3 — Até 2030, aumentar a urbanização inclusiva e sustentável, e as capacidades para o planejamento e gestão de assentamentos humanos participativos",
      "11.4 — Fortalecer esforços para proteger e salvaguardar o patrimônio cultural e natural do mundo",
      "11.5 — Até 2030, reduzir significativamente o número de mortes e o número de pessoas afetadas por catástrofes",
      "11.6 — Até 2030, reduzir o impacto ambiental negativo per capita das cidades, inclusive prestando especial atenção à qualidade do ar, gestão de resíduos municipais e outros",
      "11.7 — Até 2030, proporcionar o acesso universal a espaços públicos seguros, inclusivos, acessíveis e verdes",
      "11.a — Apoiar relações econômicas, sociais e ambientais positivas entre áreas urbanas, periurbanas e rurais",
      "11.b — Até 2020, aumentar substancialmente o número de cidades e assentamentos humanos adotando e implementando políticas e planos integrados",
      "11.c — Apoiar os países menos desenvolvidos para construções sustentáveis e resilientes, utilizando materiais locais"
    ] },
  { n:12, cor:"#BF8B2E", img:`${BASE}/ODS12.svg`, nome:"Consumo e Produção Responsáveis",
    objetivo:"Assegurar padrões de produção e de consumo sustentáveis.",
    metas:[
      "12.1 — Implementar o Plano Decenal de Programas sobre Produção e Consumo Sustentáveis, com todos os países tomando medidas",
      "12.2 — Até 2030, alcançar a gestão sustentável e o uso eficiente dos recursos naturais",
      "12.3 — Até 2030, reduzir pela metade o desperdício de alimentos per capita mundial",
      "12.4 — Até 2020, alcançar o manejo ambientalmente saudável dos produtos químicos e todos os resíduos",
      "12.5 — Até 2030, reduzir substancialmente a geração de resíduos por meio da prevenção, redução, reciclagem e reuso",
      "12.6 — Incentivar as empresas, especialmente as empresas grandes e transnacionais, a adotar práticas sustentáveis",
      "12.7 — Promover práticas de compras públicas sustentáveis, de acordo com as políticas e prioridades nacionais",
      "12.8 — Até 2030, garantir que as pessoas, em todos os lugares, tenham informação relevante e conscientização para o desenvolvimento sustentável",
      "12.a — Apoiar países em desenvolvimento a fortalecer suas capacidades científicas e tecnológicas para mudar para padrões mais sustentáveis",
      "12.b — Desenvolver e implementar ferramentas para monitorar os impactos do desenvolvimento sustentável para o turismo sustentável",
      "12.c — Racionalizar subsídios ineficientes aos combustíveis fósseis, que encorajam o consumo exagerado"
    ] },
  { n:13, cor:"#3F7E44", img:`${BASE}/ODS13.svg`, nome:"Ação Contra a Mudança do Clima",
    objetivo:"Tomar medidas urgentes para combater a mudança climática e seus impactos.",
    metas:[
      "13.1 — Reforçar a resiliência e a capacidade de adaptação a riscos relacionados ao clima e às catástrofes naturais em todos os países",
      "13.2 — Integrar medidas da mudança do clima nas políticas, estratégias e planejamentos nacionais",
      "13.3 — Melhorar a educação, aumentar a conscientização e a capacidade humana e institucional sobre mitigação, adaptação, redução de impacto e alerta precoce da mudança do clima",
      "13.a — Implementar o compromisso assumido pelos países desenvolvidos partes da UNFCCC para a meta de mobilizar conjuntamente US$ 100 bilhões por ano a partir de 2020",
      "13.b — Promover mecanismos para a criação de capacidades para o planejamento relacionado à mudança do clima e à gestão eficaz, nos países menos desenvolvidos",
      "(*) Reconhecendo que a Convenção Quadro das Nações Unidas sobre Mudança do Clima [UNFCCC] é o fórum internacional intergovernamental primário para negociar a resposta global à mudança do clima."
    ] },
  { n:14, cor:"#0A97D9", img:`${BASE}/ODS14.svg`, nome:"Vida na Água",
    objetivo:"Conservação e uso sustentável dos oceanos, dos mares e dos recursos marinhos para o desenvolvimento sustentável.",
    metas:[
      "14.1 — Até 2025, prevenir e reduzir significativamente a poluição marinha de todos os tipos, especialmente a advinda de atividades terrestres",
      "14.2 — Até 2020, gerir de forma sustentável e proteger os ecossistemas marinhos e costeiros para evitar impactos adversos significativos",
      "14.3 — Minimizar e enfrentar os impactos da acidificação dos oceanos, inclusive por meio do reforço da cooperação científica em todos os níveis",
      "14.4 — Até 2020, efetivamente regular a coleta, e acabar com a sobrepesca, ilegal, não reportada e não regulamentada",
      "14.5 — Até 2020, conservar pelo menos 10% das zonas costeiras e marinhas, de acordo com a legislação nacional e internacional",
      "14.6 — Até 2020, proibir certas formas de subsídios à pesca, que contribuem para a sobrecapacidade e a sobrepesca",
      "14.7 — Até 2030, aumentar os benefícios econômicos para os pequenos Estados insulares em desenvolvimento e os países menos desenvolvidos",
      "14.a — Aumentar o conhecimento científico, desenvolver capacidades de pesquisa e transferir tecnologia marinha",
      "14.b — Proporcionar o acesso dos pescadores artesanais de pequena escala aos recursos marinhos e mercados",
      "14.c — Assegurar a conservação e o uso sustentável dos oceanos e seus recursos pela implementação do direito internacional"
    ] },
  { n:15, cor:"#56C02B", img:`${BASE}/ODS15.svg`, nome:"Vida Terrestre",
    objetivo:"Proteger, recuperar e promover o uso sustentável dos ecossistemas terrestres, gerir de forma sustentável as florestas, combater a desertificação, deter e reverter a degradação da terra e deter a perda de biodiversidade.",
    metas:[
      "15.1 — Até 2020, assegurar a conservação, recuperação e uso sustentável de ecossistemas terrestres e de água doce interiores e seus serviços",
      "15.2 — Até 2020, promover a implementação da gestão sustentável de todos os tipos de florestas, deter o desmatamento",
      "15.3 — Até 2030, combater a desertificação, restaurar a terra e o solo degradado",
      "15.4 — Até 2030, assegurar a conservação dos ecossistemas de montanha, incluindo a sua biodiversidade",
      "15.5 — Tomar medidas urgentes e significativas para reduzir a degradação de habitat naturais, deter a perda de biodiversidade",
      "15.6 — Garantir uma repartição justa e equitativa dos benefícios derivados da utilização dos recursos genéticos",
      "15.7 — Tomar medidas urgentes para acabar com a caça ilegal e o tráfico de espécies da flora e fauna protegidas",
      "15.8 — Até 2020, implementar medidas para evitar a introdução e reduzir significativamente o impacto de espécies exóticas invasoras",
      "15.9 — Até 2020, integrar os valores dos ecossistemas e da biodiversidade ao planejamento nacional e local",
      "15.a — Mobilizar e aumentar significativamente os recursos financeiros para a conservação e o uso sustentável da biodiversidade",
      "15.b — Mobilizar recursos para financiar o manejo florestal sustentável",
      "15.c — Reforçar o apoio global para os esforços de combate à caça ilegal e ao tráfico de espécies protegidas"
    ] },
  { n:16, cor:"#00689D", img:`${BASE}/ODS16.svg`, nome:"Paz, Justiça e Instituições Eficazes",
    objetivo:"Promover sociedades pacíficas e inclusivas para o desenvolvimento sustentável, proporcionar o acesso à justiça para todos e construir instituições eficazes, responsáveis e inclusivas em todos os níveis.",
    metas:[
      "16.1 — Reduzir significativamente todas as formas de violência e as taxas de mortalidade relacionada em todos os lugares",
      "16.2 — Acabar com abuso, exploração, tráfico e todas as formas de violência e tortura contra crianças",
      "16.3 — Promover o Estado de Direito, em nível nacional e internacional, e garantir a igualdade de acesso à justiça para todos",
      "16.4 — Até 2030, reduzir significativamente os fluxos financeiros e de armas ilegais",
      "16.5 — Reduzir substancialmente a corrupção e o suborno em todas as suas formas",
      "16.6 — Desenvolver instituições eficazes, responsáveis e transparentes em todos os níveis",
      "16.7 — Garantir a tomada de decisão responsiva, inclusiva, participativa e representativa em todos os níveis",
      "16.8 — Ampliar e fortalecer a participação dos países em desenvolvimento nas instituições de governança global",
      "16.9 — Até 2030, fornecer identidade legal para todos, incluindo o registro de nascimento",
      "16.10 — Assegurar o acesso público à informação e proteger as liberdades fundamentais",
      "16.a — Fortalecer as instituições nacionais relevantes para a prevenção da violência e o combate ao terrorismo e ao crime",
      "16.b — Promover e fazer cumprir leis e políticas não discriminatórias para o desenvolvimento sustentável"
    ] },
  { n:17, cor:"#19486A", img:`${BASE}/ODS17.svg`, nome:"Parcerias e Meios de Implementação",
    objetivo:"Fortalecer os meios de implementação e revitalizar a parceria global para o desenvolvimento sustentável.",
    metas:[
      "17.1 — Fortalecer a mobilização de recursos internos, inclusive por meio do apoio internacional aos países em desenvolvimento",
      "17.2 — Países desenvolvidos implementarem plenamente os seus compromissos em matéria de assistência oficial ao desenvolvimento [AOD]",
      "17.3 — Mobilizar recursos financeiros adicionais para os países em desenvolvimento a partir de múltiplas fontes",
      "17.4 — Ajudar os países em desenvolvimento a alcançar a sustentabilidade da dívida de longo prazo",
      "17.5 — Adotar e implementar regimes de promoção de investimentos para os países menos desenvolvidos",
      "17.6 — Melhorar a cooperação Norte-Sul, Sul-Sul e triangular regional e internacional e o acesso à ciência, tecnologia e inovação",
      "17.7 — Promover o desenvolvimento, a transferência, a disseminação e a difusão de tecnologias ambientalmente corretas para os países em desenvolvimento",
      "17.8 — Operacionalizar plenamente o Banco de Tecnologia e o mecanismo de capacitação em ciência, tecnologia e inovação para os países menos desenvolvidos até 2017",
      "17.9 — Reforçar o apoio internacional para a implementação eficaz e orientada da capacitação em países em desenvolvimento",
      "17.10 — Promover um sistema multilateral de comércio universal, baseado em regras, aberto, não discriminatório e equitativo no âmbito da OMC",
      "17.11 — Aumentar significativamente as exportações dos países em desenvolvimento",
      "17.12 — Concretizar a implementação oportuna de acesso a mercados livres de cotas e taxas para todos os países menos desenvolvidos",
      "17.13 — Aumentar a estabilidade macroeconômica global",
      "17.14 — Aumentar a coerência das políticas para o desenvolvimento sustentável",
      "17.15 — Respeitar o espaço político e a liderança de cada país para estabelecer e implementar políticas para a erradicação da pobreza",
      "17.16 — Reforçar a parceria global para o desenvolvimento sustentável, complementada por parcerias multissetoriais",
      "17.17 — Incentivar e promover parcerias públicas, público-privadas e com a sociedade civil eficazes",
      "17.18 — Até 2020, reforçar o apoio à capacitação para os países em desenvolvimento para aumentar a disponibilidade de dados de alta qualidade",
      "17.19 — Até 2030, valer-se de iniciativas existentes para desenvolver medidas do progresso do desenvolvimento sustentável que complementem o PIB"
    ] },
];

export const ODS_EXTRA: Ods[] = [
  {
    n: 18, cor: "#C0392B", img: `${BASE}/ODS18.PNG`,
    nome: "Igualdade Étnico-Racial", tipo: "metas",
    objetivo: "Eliminar o racismo e a discriminação étnico-racial, em todas as suas formas, contra povos indígenas, afrodescendentes e demais grupos populacionais afetados por múltiplas formas de discriminação, promovendo a igualdade de direitos, oportunidades e acesso a políticas públicas.",
    metas: [
      "18.1 — Eliminar o Racismo e a Discriminação: Eliminar o racismo e a discriminação, tanto direta quanto indireta, bem como nas formas múltipla ou agravada, e a intolerância correlata contra os povos indígenas e afrodescendentes nos ambientes públicos e privados de trabalho.",
      "18.2 — Eliminar Violências: Eliminar todas as formas de violência contra povos indígenas e afrodescendentes nas esferas pública e privada, levando em conta suas interseccionalidades, em particular o homicídio das juventudes, feminicídio e os resultantes de homofobia e transfobia.",
      "18.3 — Garantir Tratamento Justo: Garantir aos povos indígenas e afrodescendentes tratamento digno, justo e equânime perante os órgãos do sistema de justiça, de segurança pública e administrativos do Estado.",
      "18.4 — Representatividade: Garantir a representatividade equitativa dos povos indígenas e afrodescendentes nas instâncias, colegiados e órgãos de Estado e no quadro de pessoal de empresas públicas e privadas.",
      "18.5 — Promover a Reparação: Promover a reparação integral das violações socioeconômica e cultural, das perdas territoriais e dos impactos ambientais nos territórios dos povos indígenas e afrodescendentes.",
      "18.5.1 — Proteger o patrimônio cultural, artístico e religioso dos povos indígenas e afrodescendentes, garantindo-lhes os recursos necessários para o resgate, preservação e reconhecimento das memórias e das histórias de seus ancestrais.",
      "18.5.2 — Preservar as formas de vivência e convivência estabelecidas pelos povos indígenas e afrodescendentes, bem como sua cosmovisão, liberdade de expressão cultural e religiosa.",
      "18.6 — Assegurar Moradias Adequadas: Assegurar moradias adequadas, seguras e sustentáveis aos povos indígenas e afrodescendentes, incluindo comunidades tradicionais, favelas e comunidades urbanas.",
      "18.7 — Assegurar à Saúde: Assegurar o acesso à atenção à saúde de qualidade, não discriminatória, para os povos indígenas e afrodescendentes, bem como o respeito às suas culturas e saberes ancestrais.",
      "18.8 — Assegurar Educação de Qualidade: Assegurar a educação de qualidade e não discriminatória aos afrodescendentes, quilombolas e povos indígenas, bem como o respeito às suas culturas e histórias.",
    ],
  },
  {
    n: 19, cor: "#7D3C98", img: `${BASE}/ODS19.PNG`,
    nome: "Arte, Cultura e Comunicação", tipo: "visao",
    objetivo: "Assegurar a pluralidade e liberdade cultural, a democratização da arte e a comunicação inclusiva para todos e todas.",
    metas: [
      "Completa democratização do conhecimento e consequente compreensão da relevância dos ODS para o desenvolvimento pleno da comunidade.",
      "Desconstrução do imaginário popular que qualifica o que pode ou não ser considerado arte, cultura e desenvolvimento, que inúmeras vezes se pautam em uma narrativa racista e dominadora.",
      "Valorização do impacto da manifestação artística na consolidação de uma perspectiva sustentável.",
      "Promoção de uma linguagem acessível, considerando a forma e por quem será acessada.",
      "Maior abrangência populacional nas medidas de promoção à visibilidade dos Objetivos de Desenvolvimento Sustentável.",
      "Garantia de acesso público à informação de qualidade, adaptada às diferentes necessidades e contextos.",
      "Enfrentamento à desinformação (fake news) e estratégias para monitorar mídias digitais a fim de limitar a disseminação de notícias falsas e discursos de ódio.",
      "Promoção de princípios do Jornalismo para Paz (Peace Journalism) ou Jornalismo Cidadão.",
      "Educação de qualidade, inclusiva e libertadora, que forme indivíduos para pensarem de forma crítica.",
      "Consolidação da comunicação para paz, promovendo uma visão desconstruída sobre conflitos.",
      "Promoção da saúde mental e do bem-estar por meio da arte-terapia.",
      "Garantia de uma cultura da diversidade e pluralidade, respeitando e observando o valor da multiplicidade de seres e das tradições dos diferentes povos.",
    ],
  },
  {
    n: 20, cor: "#1E8449", img: `${BASE}/ODS20.PNG`,
    nome: "Povos Originários e Comunidades Tradicionais", tipo: "visao",
    objetivo: "Garantir os direitos e promover a cultura dos povos originários e comunidades tradicionais.",
    metas: [
      "Valorização da ancestralidade, da cultura e do conhecimento tradicional do Brasil, inclusive mediante matérias para circularem em âmbito nacional e nas escolas.",
      "Garantir o cumprimento da Lei nº 10.639, que torna obrigatório o ensino da história e cultura afro-brasileira e africana em todas as escolas.",
      "Promover a participação de representantes dos povos originários e comunidades tradicionais nos conselhos e comissões de políticas públicas.",
      "Defender as demarcações de terra dos povos originários e comunidades tradicionais.",
      "Garantir o direito à consulta prévia dos povos originários e comunidades tradicionais.",
      "Fortalecer a rede de articulação dos povos e comunidades tradicionais.",
      "Divulgar as legislações que dizem respeito aos povos tradicionais, inclusive por meio de linguagem mais direta e acessível.",
      "Combater o racismo estrutural, com o fortalecimento dos diálogos sobre direitos e políticas públicas dentro das comunidades.",
      "Investir em pesquisas e ações para o diagnóstico socioeconômico e cultural dos povos tradicionais.",
      "Fortalecer políticas de desenvolvimento ambiental, reconhecendo o impacto que as atividades econômicas de mineração e do agronegócio têm sobre os territórios tradicionais.",
      "Defender o direito à manifestação religiosa, combatendo a intolerância.",
      "Valorizar as ciências e saberes originários, como epistemologias e ontologias igualmente importantes, verdadeiras e eficazes.",
      "Estabelecer políticas de saúde específicas para os contextos dos povos tradicionais.",
    ],
  },
];

// Mantido para compatibilidade com imports em ods.tsx
export function PainelDetalhe({ ods, onClose }: { ods: Ods; onClose: () => void; position?: { x: number; y: number } | null }) {
  return null;
}

export default function RodaODS({ compact = false }: { compact?: boolean }) {
  const [hoveredN, setHoveredN] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const handleClick = (n: number) => {
    window.location.href = `/ods?n=${n}`;
  };

  return (
    <div className="flex w-full flex-col items-center px-3 sm:px-0">
            <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Roda */}
      <div
        className="relative mx-auto aspect-square w-full"
        style={{ maxWidth: compact ? 440 : 640 }}
      >
        {/* Logo central */}
        <div
        className="absolute left-1/2 overflow-hidden rounded-full shadow-xl"
        style={{ top: "48.5%", transform: "translate(-50%, -50%)", width: "77%", height: "77%", zIndex: 10 }}
       >
          <img src={LOGO_OBSERVA} alt="Observa 2030" className="h-full w-full object-cover" />
        </div>

        {/* Tiles ODS */}
        {ODS_17.map((o, i) => {
          const angulo = -90 + i * PASSO;
          const rad = (angulo * Math.PI) / 180;
          const x = 50 + RAIO * Math.cos(rad);
          const y = 50 + RAIO * Math.sin(rad);
          const hovered = hoveredN === o.n;
          const rotacao = angulo + 90;

          return (
            <div
              key={o.n}
              onMouseEnter={(e) => {
                setHoveredN(o.n);
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
              }}
              onMouseLeave={() => { setHoveredN(null); setTooltipPos(null); }}
              onClick={() => handleClick(o.n)}
              className="absolute cursor-pointer"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: "18.5%",
                zIndex: hovered ? 100 : i + 1,
                transform: `translate(-50%, -50%) rotate(${rotacao}deg)`,
              }}
            >
              {/* Card — imagem oficial da ODS */}
              <div
                className="aspect-square w-full overflow-hidden rounded-[8%] transition-transform duration-200"
                style={{
                  transform: hovered ? "scale(1.12)" : "scale(1)",
                  boxShadow: hovered
                    ? `0 8px 28px ${o.cor}99, 0 0 0 3px #fff, 0 0 0 5px ${o.cor}`
                    : "0 2px 10px rgba(0,0,0,0.25)",
                }}
              >
                <img
                  src={o.img}
                  alt={`ODS ${o.n} — ${o.nome}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>

            {/* Tooltip global — sempre reto, fora do contexto rotacionado */}
      {hoveredN && tooltipPos && (() => {
        const o = ODS_17.find(x => x.n === hoveredN);
        if (!o) return null;
        return (
          <div
            style={{
              position: "fixed",
              left: tooltipPos.x,
              top: tooltipPos.y - 8,
              transform: "translate(-50%, -100%)",
              background: "#0c1d3b",
              color: "#fff",
              borderRadius: 10,
              padding: "8px 14px",
              fontSize: 11,
              fontWeight: 600,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 9999,
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              textAlign: "center",
              animation: "fadeUp 0.15s ease",
            }}
          >
            <div style={{ color: o.cor, fontSize: 10, marginBottom: 2 }}>ODS {o.n}</div>
            <div style={{ fontWeight: 700 }}>{o.nome}</div>
            <div style={{ color: "#adb5bd", fontSize: 10, marginTop: 2 }}>Clique para saber mais →</div>
          </div>
        );
      })()}

      {/* ODS Adjacentes */}
      <div className="mt-8 w-full">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            ODS Adjacentes Brasileiros
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="flex flex-wrap items-start justify-center gap-6">
          {ODS_EXTRA.map((o) => (
            <button
              key={o.n}
              onClick={() => handleClick(o.n)}
              className="flex w-36 flex-col items-center gap-2 transition-transform hover:-translate-y-1"
            >
              <span
                className="overflow-hidden"
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "8%",
                  background: o.cor,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.22)",
                  display: "block",
                }}
              >
                <img src={o.img} alt={`ODS ${o.n}`} loading="lazy" className="h-full w-full object-contain" />
              </span>
              <span className="text-xs font-bold" style={{ color: o.cor }}>ODS {o.n}</span>
              <span className="text-center text-xs leading-snug text-muted-foreground">{o.nome}</span>
            </button>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          Os ODS adjacentes 18, 19 e 20 são propostas brasileiras de ampliação da Agenda 2030. Clique em cada um para conhecer seus objetivos.
        </p>
      </div>
    </div>
  );
}

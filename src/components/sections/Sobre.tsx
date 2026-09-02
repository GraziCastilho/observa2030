import { createFileRoute } from "@tanstack/react-router";
import { Search, GraduationCap, Presentation, Users, Megaphone, Handshake } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { LOGO_OBSERVA } from "@/components/RodaODS";
const TITLE = "Sobre o Projeto — Observa 2030 Uergs";
const DESC = "História, objetivos, eixos de atuação e identidade visual do Observa 2030 — Observatório Gaúcho da Agenda 2030 da Uergs.";
export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});
const IDENTIDADE = [
  ['Nome \u201cObserva 2030\u201d:', "destaca a missão central de acompanhar, analisar e divulgar ações relacionadas à Agenda 2030 e aos ODS."],
  ["Mapa do Rio Grande do Sul (em amarelo):", "coloca o estado como foco de atuação do projeto."],
  ["Anel formado pelas cores dos ODS:", "representa os 17 Objetivos de Desenvolvimento Sustentável de maneira integrada."],
  ["Círculo azul envolvendo o mapa:", "simboliza a visão sistêmica e a integração entre universidade, sociedade e setor público."],
  ["Ondas coloridas nas laterais:", "remetem à comunicação, ao diálogo e à disseminação do conhecimento."],
  ["Amarelo do mapa:", "representa energia, inovação e esperança."],
  ["Formato circular:", "simboliza união, continuidade, cooperação e movimento permanente."],
] as const;
const OBJETIVOS = [
  { icon: Search,        cor: "#0c1d3b", titulo: "Levantamento e Investigação",   desc: "Mapeamento dos PTTs e ações de extensão nos mestrados e doutorados da Uergs para criação de um banco de dados público." },
  { icon: GraduationCap, cor: "#4C9F38", titulo: "Fomento e Projetos",            desc: "Cursos de extensão e capacitação na modalidade MOOC, com foco em ciência cidadã, Agenda 2030 e ODS." },
  { icon: Presentation,  cor: "#C5192D", titulo: "Organização de Seminários",     desc: "Ações direcionadas aos PPGs para incentivar projetos de extensão que respondam a demandas locais e regionais." },
  { icon: Users,         cor: "#DDA63A", titulo: "Participação em Eventos",       desc: "Disseminação dos resultados do projeto em eventos científicos e de extensão." },
  { icon: Megaphone,     cor: "#FD6925", titulo: "Divulgação",                    desc: "Estratégia de mídia social focada em ampliar a visibilidade e o impacto social das ações da pós-graduação da Uergs." },
  { icon: Handshake,     cor: "#7D3C98", titulo: "Colaboração Institucional",     desc: "Fortalecimento da educação sustentável através de parcerias e colaborações com redes e grupos de pesquisa." },
] as const;

/* ── URLs dos ícones oficiais (Flaticon CDN) ── */
const ICON_INSTAGRAM = "https://cdn-icons-png.flaticon.com/128/174/174855.png";
const ICON_FACEBOOK  = "https://cdn-icons-png.flaticon.com/128/174/174848.png";
const ICON_GMAIL     = "https://cdn-icons-png.flaticon.com/128/5968/5968534.png";

function SobrePage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Sobre o Projeto</h1>
        {/* Seção A */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground">
            A Universidade Estadual do Rio Grande do Sul (Uergs)
          </h2>
          <div className="my-4">
            <img
              src="https://nsmwgtepyzwokvsltkda.supabase.co/storage/v1/object/public/observa-imagens/logos/Logo_Uergs.png"
              alt="Logo Uergs"
              className="h-auto w-48"
            />
          </div>
          <p className="mt-5 leading-relaxed text-foreground">
            A Universidade Estadual do Rio Grande do Sul (Uergs) é uma instituição pública estadual fundada em
            2001 e que, em 2025, completa 24 anos de atuação no ensino superior gaúcho. Com sede em Porto
            Alegre, a Universidade possui 23 unidades universitárias organizadas em 7 campi regionais,
            distribuídos em diferentes regiões do estado, com destaque para unidades como Porto Alegre, Caxias
            do Sul, Guaíba, Litoral Norte – Osório, Erechim, Vacaria e Santana do Livramento, entre outras.
          </p>
          <p className="mt-4 leading-relaxed text-foreground">
            No âmbito da Pós-Graduação stricto sensu, a Uergs conta atualmente com cinco programas de
            Pós-Graduação (PPGSTEM, PPGAS, PPGCTA, PPGED e PPGSCBIO), que ofertam cursos de mestrado e, no caso
            do PPGED, também o primeiro doutorado da instituição. Sua atuação acadêmica concentra-se em três
            grandes áreas do conhecimento: Ciências Humanas, Ciências Exatas e Engenharias e Ciências da Vida e
            do Meio Ambiente, articulando ensino, pesquisa e extensão com foco no desenvolvimento regional
            sustentável, na inovação e na inclusão social.
          </p>
          <div className="mt-6 space-y-1 text-xs leading-relaxed text-muted-foreground">
            <p>
              UERGS. <em>Sobre a Uergs</em>. Disponível em:{" "}
              <a href="https://www.uergs.edu.br/sobre-a-uergs" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                uergs.edu.br/sobre-a-uergs
              </a>
            </p>
            <p>
              UERGS. <em>Mestrados</em>. Disponível em:{" "}
              <a href="https://proppg.uergs.edu.br/mestrados" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                proppg.uergs.edu.br/mestrados
              </a>
            </p>
            <p>
              <strong>Site Oficial:</strong>{" "}
              <a href="https://www.uergs.edu.br/" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                uergs.edu.br
              </a>{" "}
              · <strong>Instagram:</strong> @uergs
            </p>
          </div>
        </section>
        {/* Seção B */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground">O Projeto Observa 2030</h2>
          <p className="mt-5 leading-relaxed text-foreground">
            O Projeto <em>"Observa 2030 – Observatório Gaúcho da Agenda 2030 da Uergs"</em>, aprovado em
            fevereiro de 2025 pela Coordenação de Aperfeiçoamento de Pessoal de Nível Superior (CAPES) pelo
            Edital Conjunto nº 3/2024 - Programa de Extensão da Educação Superior na Pós-Graduação (PROEXT-PG),
            é uma iniciativa importante que visa alinhar a Pós-Graduação com os ODS da ONU.
          </p>
          <p className="mt-4 leading-relaxed text-foreground">
            O Projeto Observa 2030 constitui-se como uma plataforma estratégica de inteligência institucional da
            Uergs, concebida para mapear, sistematizar e dar visibilidade à produção científica com potencial de
            impacto social. Estruturado como um observatório de práticas sustentáveis, o projeto atua na
            intersecção entre a Pós-Graduação e as demandas da comunidade, transformando dados acadêmicos em
            indicadores de desenvolvimento regional.
          </p>
        </section>
        {/* Seção C — Eixos de Atuação */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground">Eixos de Atuação</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border-l-4 border-l-primary bg-card p-7 shadow-sm">
              <h3 className="font-bold text-foreground">Eixo 1 – Formativo | Foco Interno</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                <strong>Objetivo:</strong> Ampliar a capacidade dos pós-graduandos de comunicar os impactos das
                pesquisas, projetos e produtos desenvolvidos no âmbito dos Programas de Pós-Graduação profissionais da UERGS.
              </p>
              <p className="mt-4 text-sm font-semibold text-foreground">Ações específicas:</p>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-foreground">
                <li>• Fortalecimento de competências em comunicação científica;</li>
                <li>• Incentivo à elaboração de resumos e produtos acadêmicos alinhados aos Objetivos de Desenvolvimento Sustentável (ODS);</li>
                <li>• Oferta de atividades formativas por meio de cursos na modalidade MOOC <em>(Massive Open Online Courses)</em> e minicursos de extensão.</li>
              </ul>
            </article>
            <article className="rounded-2xl border-l-4 border-l-primary bg-card p-7 shadow-sm">
              <h3 className="font-bold text-foreground">Eixo 2 – Sociedade | Foco Externo</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                <strong>Objetivo:</strong> Promover a popularização da ciência e fortalecer o diálogo entre a universidade e a sociedade.
              </p>
              <p className="mt-4 text-sm font-semibold text-foreground">Ações específicas:</p>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-foreground">
                <li>• Participação e promoção de eventos científicos e extensionistas abertos à sociedade;</li>
                <li>• Elaboração de materiais de divulgação e popularização científica;</li>
                <li>• Fortalecimento da comunicação digital por meio de redes sociais e do site oficial do projeto, ampliando a visibilidade dos projetos e dos Produtos Técnicos e Tecnológicos (PTTs);</li>
                <li>• Estabelecimento e fortalecimento de parcerias institucionais com redes, grupos de pesquisa, observatórios e outras organizações, visando à integração de ações e à ampliação do alcance do Observa 2030.</li>
              </ul>
            </article>
          </div>
        </section>
        {/* Seção Objetivos — agora após Eixos */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground">Nossos Objetivos</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OBJETIVOS.map((o) => (
              <article key={o.titulo} className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ background: `${o.cor}18` }}>
                    <o.icon className="h-6 w-6" style={{ color: o.cor }} />
                  </span>
                  <div>
                    <h3 className="font-bold leading-tight" style={{ color: o.cor }}>{o.titulo}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.desc}</p>
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 h-8 w-8"
                  style={{ background: o.cor, clipPath: "polygon(100% 0, 100% 100%, 0 100%)", opacity: 0.85 }} />
              </article>
            ))}
          </div>
        </section>
        {/* Seção D */}
        <section className="mt-16 grid items-center gap-8 rounded-2xl border bg-card p-8 shadow-sm md:grid-cols-[260px_1fr]">
          <img src={LOGO_OBSERVA} alt="Logo do Projeto Observa 2030" loading="lazy"
            className="mx-auto w-full max-w-[240px] object-contain" />
          <div>
            <h2 className="text-2xl font-bold text-foreground">Identidade Visual</h2>
            <p className="mt-4 leading-relaxed text-foreground">
              A identidade visual do <strong>Observa 2030 Uergs</strong> comunica, de forma integrada, os principais propósitos do projeto:
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground">
              {IDENTIDADE.map(([label, text]) => (
                <li key={label}>• <strong>{label}</strong> {text}</li>
              ))}
            </ul>
          </div>
        </section>
        {/* Seção E — Redes Sociais */}
        <section className="mt-16 rounded-2xl border bg-card p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground">Redes Sociais e Contato</h2>
          <ul className="mt-5 flex flex-wrap gap-4 text-sm">
            <li>
              <a href="https://www.instagram.com/observa2030uergs" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border px-4 py-2.5 text-foreground transition-colors hover:bg-muted"
                style={{ borderColor: "#EE2A7B44" }}>
                <img src={ICON_INSTAGRAM} alt="Instagram" className="h-8 w-8 shrink-0" />
                @observa2030uergs
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/profile.php?id=61578130242476" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border px-4 py-2.5 text-foreground transition-colors hover:bg-muted"
                style={{ borderColor: "#1877F244" }}>
                <img src={ICON_FACEBOOK} alt="Facebook" className="h-8 w-8 shrink-0" />
                Observa Uergs
              </a>
            </li>
            <li>
              <a href="mailto:observa2030uergs@gmail.com"
                className="inline-flex items-center gap-3 rounded-full border px-4 py-2.5 text-foreground transition-colors hover:bg-muted"
                style={{ borderColor: "#EA433544" }}>
                <img src={ICON_GMAIL} alt="Gmail" className="h-8 w-8 shrink-0" />
                observa2030uergs@gmail.com
              </a>
            </li>
          </ul>
        </section>
      </div>
    </SiteLayout>
  );
}
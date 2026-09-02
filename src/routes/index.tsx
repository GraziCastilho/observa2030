import { createFileRoute, Link } from "@tanstack/react-router";
import RodaODS from "@/components/RodaODS";
import SiteLayout from "@/components/SiteLayout";

const TITLE = "Observa 2030";
const DESC = "Observatório da Uergs que mapeia e dá visibilidade aos produtos técnicos e tecnológicos alinhados aos ODS e à Agenda 2030 no Rio Grande do Sul.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

/* ── URLs dos ícones do Flaticon CDN ── */
const ICON_SOBRE      = "https://cdn-icons-png.flaticon.com/128/8312/8312012.png";
const ICON_PUBLICACOES = "https://cdn-icons-png.flaticon.com/128/5832/5832416.png";
const ICON_EVENTOS    = "https://cdn-icons-png.flaticon.com/128/1365/1365678.png";

function IconSobre() {
  return <img src={ICON_SOBRE} alt="Sobre" className="h-full w-full object-contain" />;
}

function IconODS() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <circle cx="28" cy="28" r="20" stroke="#E5E7EB" strokeWidth="6" fill="none" />
      <circle cx="28" cy="28" r="20" stroke="#22C55E" strokeWidth="6" fill="none"
        strokeDasharray="22 104" strokeDashoffset="0" strokeLinecap="round" />
      <circle cx="28" cy="28" r="20" stroke="#3B82F6" strokeWidth="6" fill="none"
        strokeDasharray="18 108" strokeDashoffset="-26" strokeLinecap="round" />
      <circle cx="28" cy="28" r="20" stroke="#F59E0B" strokeWidth="6" fill="none"
        strokeDasharray="16 110" strokeDashoffset="-48" strokeLinecap="round" />
      <circle cx="28" cy="28" r="20" stroke="#EF4444" strokeWidth="6" fill="none"
        strokeDasharray="20 106" strokeDashoffset="-68" strokeLinecap="round" />
      <circle cx="28" cy="28" r="20" stroke="#8B5CF6" strokeWidth="6" fill="none"
        strokeDasharray="14 112" strokeDashoffset="-92" strokeLinecap="round" />
      <circle cx="28" cy="28" r="20" stroke="#06B6D4" strokeWidth="6" fill="none"
        strokeDasharray="10 116" strokeDashoffset="-110" strokeLinecap="round" />
      <circle cx="28" cy="28" r="9" fill="#F0FDF4" />
      <circle cx="28" cy="28" r="5" fill="#22C55E" opacity="0.8" />
      <circle cx="28" cy="28" r="2" fill="white" />
    </svg>
  );
}

function IconPublicacoes() {
  return <img src={ICON_PUBLICACOES} alt="Publicações" className="h-full w-full object-contain" />;
}

function IconEventos() {
  return <img src={ICON_EVENTOS} alt="Eventos" className="h-full w-full object-contain" />;
}

const ICON_EQUIPE     = "https://cdn-icons-png.flaticon.com/128/3280/3280979.png";
const ICON_PARCERIAS  = "https://cdn-icons-png.flaticon.com/128/1006/1006657.png";

function IconEquipe() {
  return <img src={ICON_EQUIPE} alt="Equipe" className="h-full w-full object-contain" />;
}

function IconParcerias() {
  return <img src={ICON_PARCERIAS} alt="Parcerias" className="h-full w-full object-contain" />;
}

const previews = [
  { title: "Sobre o Projeto", description: "Conheça a história, os objetivos e os eixos de atuação do Observa 2030 — Observatório Gaúcho da Agenda 2030 da Uergs.", cta: "Saiba mais sobre o projeto", href: "/sobre",       IconSVG: IconSobre,      color: "#3B82F6" },
  { title: "ODS",             description: "Explore os 17 Objetivos de Desenvolvimento Sustentável da ONU e os 3 ODS adjacentes brasileiros, com objetivos e metas detalhadas.", cta: "Ver todos os ODS",          href: "/ods",         IconSVG: IconODS,        color: "#22C55E" },
  { title: "Publicações",     description: "Acesse artigos científicos, livros, capítulos de livros, relatórios técnicos e textos produzidos pela equipe do Observa 2030.", cta: "Ver publicações",          href: "/publicacoes", IconSVG: IconPublicacoes, color: "#8B5CF6" },
  { title: "Eventos",         description: "Fique por dentro dos eventos, palestras, minicursos e ações extensionistas realizados ou com participação do Projeto Observa 2030.", cta: "Confira nossos eventos",   href: "/eventos",     IconSVG: IconEventos,    color: "#F97316" },
  { title: "Equipe",          description: "Conheça a equipe de pesquisadores, docentes colaboradoras, discentes e bolsistas que integram o Projeto Observa 2030.", cta: "Conhecer a equipe",        href: "/equipe",      IconSVG: IconEquipe,     color: "#0EA5E9" },
  { title: "Parcerias",       description: "O Observa 2030 atua em colaboração com redes de pesquisa e instituições comprometidas com o desenvolvimento sustentável.", cta: "Ver parcerias",            href: "/parcerias",   IconSVG: IconParcerias,  color: "#10B981" },
] as const;

function Index() {
  return (
    <SiteLayout>
      <section className="border-b bg-background py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 lg:grid-cols-2">
          <div className="order-1">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              Iniciativa Uergs • Apoio CAPES
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Observa 2030 — Observatório Gaúcho da Agenda 2030 da Uergs
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              O Observa 2030 mapeia, sistematiza e amplia a visibilidade dos Produtos Técnicos e Tecnológicos (PTTs) e dos Projetos de Extensão desenvolvidos pelos Programas de Pós-Graduação da Universidade Estadual do Rio Grande do Sul (UERGS), destacando sua contribuição e seu alinhamento aos Objetivos de Desenvolvimento Sustentável (ODS) da Agenda 2030.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/sobre"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Conheça o Observa 2030
              </Link>
            </div>
          </div>
          <div className="order-2 flex justify-center lg:justify-end">
            <RodaODS compact />
          </div>
        </div>
      </section>
      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Explore o Observa 2030</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {previews.map((p) => (
              <article
                key={p.title}
                className="flex flex-col rounded-2xl border bg-card p-7 shadow-sm"
                style={{ borderLeftWidth: 4, borderLeftColor: p.color }}
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: `${p.color}1a` }}
                >
                  <p.IconSVG />
                </span>
                <h3 className="mt-5 text-xl font-bold text-foreground">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <Link
                  to={p.href}
                  className="mt-6 inline-flex w-fit items-center rounded-full border px-5 py-2.5 text-sm font-semibold transition-all hover:text-white"
                  style={{ borderColor: p.color, color: p.color }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = p.color; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = p.color; }}
                >
                  {p.cta} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
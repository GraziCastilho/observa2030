import { createFileRoute, Link } from "@tanstack/react-router";
import RodaODS from "@/components/RodaODS";
import SiteLayout from "@/components/SiteLayout";

const TITLE = "Observa 2030 — Observatório Gaúcho da Agenda 2030 da Uergs";
const DESC =
  "Observatório da Uergs que mapeia e dá visibilidade aos produtos técnicos e tecnológicos alinhados aos ODS e à Agenda 2030 no Rio Grande do Sul.";

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

const previews = [
  {
    title: "Sobre o Projeto",
    description:
      "Conheça a história, os objetivos e os eixos de atuação do Observa 2030 — Observatório Gaúcho da Agenda 2030 da Uergs.",
    cta: "Saiba mais sobre o projeto",
    href: "/sobre",
    icon: "🎯",
  },
  {
    title: "ODS",
    description:
      "Explore os 17 Objetivos de Desenvolvimento Sustentável da ONU e os 3 ODS adjacentes brasileiros, com objetivos e metas detalhadas.",
    cta: "Ver todos os ODS",
    href: "/ods",
    icon: "🌐",
  },
  {
    title: "Publicações",
    description:
      "Acesse artigos científicos, livros, capítulos de livros, relatórios técnicos e textos produzidos pela equipe do Observa 2030.",
    cta: "Ver publicações",
    href: "/publicacoes",
    icon: "📚",
  },
  {
    title: "Eventos",
    description:
      "Fique por dentro dos eventos, palestras, minicursos e ações extensionistas realizados ou com participação do Projeto Observa 2030.",
    cta: "Confira nossos eventos",
    href: "/eventos",
    icon: "📅",
  },
  {
    title: "Equipe",
    description:
      "Conheça a equipe de pesquisadores, docentes colaboradoras, discentes e bolsistas que integram o Projeto Observa 2030.",
    cta: "Conhecer a equipe",
    href: "/equipe",
    icon: "👥",
  },
  {
    title: "Parcerias",
    description:
      "O Observa 2030 atua em colaboração com redes de pesquisa e instituições comprometidas com o desenvolvimento sustentável.",
    cta: "Ver parcerias",
    href: "/parcerias",
    icon: "🤝",
  },
] as const;

function Index() {
  return (
    <SiteLayout>
      <section className="border-b bg-background py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
          <div className="order-1">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              Iniciativa Uergs • Apoio CAPES
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Pós-graduação e extensão universitária a serviço da Agenda 2030
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
              <article key={p.title} className="flex flex-col rounded-2xl border bg-card p-7 shadow-sm">
                <span className="text-3xl" aria-hidden>
                  {p.icon}
                </span>
                <h3 className="mt-4 text-xl font-bold text-foreground">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <Link
                  to={p.href}
                  className="mt-6 inline-flex w-fit items-center rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
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

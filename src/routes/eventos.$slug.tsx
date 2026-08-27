import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, MapPin, Users, User, ExternalLink } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import {
  supabase,
  supabaseReady,
  type Evento,
  type EventoGaleria,
  type EventoLink,
} from "@/lib/supabase";

export const Route = createFileRoute("/eventos/$slug")({
  head: () => ({
    meta: [
      { title: "Evento — Observa 2030 Uergs" },
      {
        name: "description",
        content: "Detalhes de eventos, palestras e ações extensionistas do Projeto Observa 2030 da Uergs.",
      },
      { property: "og:title", content: "Evento — Observa 2030 Uergs" },
      {
        property: "og:description",
        content: "Detalhes de eventos, palestras e ações extensionistas do Projeto Observa 2030 da Uergs.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventoPage,
});

function EventoPage() {
  const { slug } = Route.useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["evento", slug],
    enabled: supabaseReady,
    queryFn: async () => {
      const { data: evento, error } = await supabase
        .from("eventos")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      if (!evento) return null;

      const [galeria, links] = await Promise.all([
        supabase
          .from("evento_galeria")
          .select("*")
          .eq("evento_id", (evento as Evento).id)
          .order("ordem", { ascending: true }),
        supabase
          .from("evento_links")
          .select("*")
          .eq("evento_id", (evento as Evento).id)
          .order("ordem", { ascending: true }),
      ]);

      return {
        evento: evento as Evento,
        galeria: (galeria.data ?? []) as EventoGaleria[],
        links: (links.data ?? []) as EventoLink[],
      };
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <Link to="/" hash="eventos" className="text-sm font-semibold text-primary hover:underline">
          ← Voltar para Eventos
        </Link>

        {isLoading && <p className="mt-10 text-sm text-muted-foreground">Carregando evento…</p>}
        {!supabaseReady && <p className="mt-10 text-sm text-muted-foreground">Conteúdo indisponível no momento.</p>}
        {!isLoading && data === null && (
          <p className="mt-10 text-sm text-muted-foreground">Evento não encontrado.</p>
        )}

        {data && (
          <article className="mt-6">
            {data.evento.imagem_card_url && (
              <img
                src={data.evento.imagem_card_url}
                alt={data.evento.titulo}
                loading="lazy"
                onError={(e) => (e.currentTarget.style.display = "none")}
                className="w-full rounded-2xl object-cover shadow-sm"
              />
            )}

            <h1 className="mt-8 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              {data.evento.titulo}
            </h1>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {data.evento.data_evento && (
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" /> {data.evento.data_evento}
                </span>
              )}
              {data.evento.local && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {data.evento.local}
                </span>
              )}
              {data.evento.publico_alvo && (
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" /> {data.evento.publico_alvo}
                </span>
              )}
              {data.evento.ministrante && (
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" /> {data.evento.ministrante}
                </span>
              )}
            </div>

            {data.evento.descricao && (
              <div className="mt-8 space-y-4">
                {data.evento.descricao.split(/\n+/).map((p, i) => (
                  <p key={i} className="leading-relaxed text-foreground">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {data.galeria.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold text-foreground">Galeria de Fotos</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {data.galeria.map((g) => (
                    <figure key={g.id}>
                      <img
                        src={g.imagem_url}
                        alt={g.referencia ?? data.evento.titulo}
                        loading="lazy"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                        className="aspect-[4/3] w-full rounded-xl object-cover shadow-sm"
                      />
                      {g.referencia && (
                        <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          {g.referencia}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {data.links.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold text-foreground">Mais informações</h2>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {data.links.map((l) => (
                    <li key={l.id}>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        {l.rotulo} <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

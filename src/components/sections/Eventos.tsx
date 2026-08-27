import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import { supabase, supabaseReady, type Evento } from "@/lib/supabase";

function Grid({ items }: { items: Evento[] }) {
  if (items.length === 0)
    return <p className="text-sm text-muted-foreground">Nenhum registro cadastrado.</p>;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((e) => (
        <Link
          key={e.id}
          to="/eventos/$slug"
          params={{ slug: e.slug }}
          className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-lg"
        >
          <div className="aspect-video w-full overflow-hidden bg-muted">
            {e.imagem_card_url && (
              <img
                src={e.imagem_card_url}
                alt={e.titulo}
                loading="lazy"
                onError={(ev) => ((ev.currentTarget.style.display = "none"))}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h4 className="font-bold leading-snug text-foreground">{e.titulo}</h4>
            <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              {e.data_evento && (
                <p className="flex items-start gap-1.5">
                  <CalendarDays className="mt-px h-3.5 w-3.5 shrink-0" /> {e.data_evento}
                </p>
              )}
              {e.local && (
                <p className="flex items-start gap-1.5">
                  <MapPin className="mt-px h-3.5 w-3.5 shrink-0" /> {e.local}
                </p>
              )}
            </div>
            <span className="mt-4 text-sm font-semibold text-primary">Ver mais →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function Eventos() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["eventos"],
    enabled: supabaseReady,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .order("categoria", { ascending: true })
        .order("ordem", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Evento[];
    },
  });

  return (
    <section id="eventos" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Eventos</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          Esta seção apresenta os eventos, palestras, minicursos e ações extensionistas desenvolvidos ou com
          participação da equipe do Projeto Observa 2030.
        </p>

        {!supabaseReady && <p className="mt-8 text-sm text-muted-foreground">Conteúdo indisponível no momento.</p>}
        {isLoading && <p className="mt-8 text-sm text-muted-foreground">Carregando eventos…</p>}

        <h3 className="mt-10 mb-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">Eventos</h3>
        <Grid items={data.filter((e) => e.categoria === "evento")} />

        <h3 className="mt-14 mb-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Palestras, Minicursos e Ações Extensionistas
        </h3>
        <Grid items={data.filter((e) => e.categoria === "palestra_minicurso_acao")} />
      </div>
    </section>
  );
}

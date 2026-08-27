import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import { supabase, supabaseReady, type Equipe as Membro } from "@/lib/supabase";

const EXECUTORA = [
  { key: "coordenacao", label: "Coordenação" },
  { key: "docente_colaboradora", label: "Docentes Colaboradoras" },
  { key: "pesquisador", label: "Pesquisadores" },
  { key: "discente_bolsista", label: "Discentes e Bolsistas" },
] as const;

function Card({ m }: { m: Membro }) {
  return (
    <article className="flex flex-col items-center rounded-2xl border bg-card p-6 text-center shadow-sm">
      <div className="h-28 w-28 overflow-hidden rounded-full bg-muted">
        {m.foto_url ? (
          <img src={m.foto_url} alt={m.nome} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <User className="h-10 w-10" />
          </div>
        )}
      </div>
      <h4 className="mt-4 font-bold text-foreground">{m.nome}</h4>
      {m.cargo && <p className="mt-1 text-sm font-medium text-primary">{m.cargo}</p>}
      {m.formacao && (
        <div className="mt-4 w-full text-left">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Formação</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground">{m.formacao}</p>
        </div>
      )}
      {m.atuacao && (
        <div className="mt-3 w-full text-left">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Atuação</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground">{m.atuacao}</p>
        </div>
      )}
      {m.lattes_url && (
        <a
          href={m.lattes_url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 self-start text-sm font-semibold text-primary hover:underline"
        >
          Currículo Lattes →
        </a>
      )}
    </article>
  );
}

export default function Equipe() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["equipe"],
    enabled: supabaseReady,
    queryFn: async () => {
      const { data, error } = await supabase.from("equipe").select("*").order("ordem", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Membro[];
    },
  });

  const apoio = data.filter((m) => (m as any).categoria_equipe === "equipe_apoio");

  return (
    <section id="equipe" className="scroll-mt-24 bg-muted/50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Equipe</h2>
        {!supabaseReady && <p className="mt-6 text-sm text-muted-foreground">Conteúdo indisponível no momento.</p>}
        {isLoading && <p className="mt-6 text-sm text-muted-foreground">Carregando equipe…</p>}

        {/* Equipe Executora */}
        <h3 className="mt-12 text-xl font-bold text-foreground">Equipe Executora</h3>
        {EXECUTORA.map((g) => {
          const membros = data.filter((m) => (m as any).categoria_equipe === g.key);
          if (membros.length === 0) return null;
          return (
            <div key={g.key} className="mt-8">
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">{g.label}</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {membros.map((m) => <Card key={m.id} m={m} />)}
              </div>
            </div>
          );
        })}

        {/* Equipe de Apoio */}
        {apoio.length > 0 && (
          <>
            <h3 className="mt-16 text-xl font-bold text-foreground">Equipe de Apoio</h3>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {apoio.map((m) => <Card key={m.id} m={m} />)}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
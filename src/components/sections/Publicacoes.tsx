import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Search, Eye } from "lucide-react";
import { supabase, supabaseReady, type Publicacao } from "@/lib/supabase";

const CATS = [
  { key: "artigo_livro_capitulo", label: "Artigos, Livros e Capítulos de Livro" },
  { key: "relatorio_tecnico", label: "Relatórios Técnicos" },
  { key: "texto_jornal_revista_site", label: "Textos em Jornais, Revistas e Sites" },
  { key: "anais_evento", label: "Anais de Eventos" },
] as const;

export default function Publicacoes() {
  const [tab, setTab] = useState<string>(CATS[0].key);
  const [cliquesLocais, setCliquesLocais] = useState<Record<string, number>>({});

  const { data = [], isLoading } = useQuery({
    queryKey: ["publicacoes"],
    enabled: supabaseReady,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("publicacoes")
        .select("*")
        .order("ordem", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Publicacao[];
    },
  });

  const items = data.filter((p) => p.categoria === tab);

  // clique sempre conta e salva no banco — abre em nova aba então sem risco de duplo registro
  const registrarClique = async (id: string) => {
    setCliquesLocais((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    await supabase.rpc("incrementar_clique_publicacao", { pub_id: id });
  };

  return (
    <section id="publicacoes" className="scroll-mt-24 bg-muted/50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Publicações</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          Esta seção reúne as publicações produzidas pelo Projeto Observa 2030, incluindo artigos científicos,
          livros, capítulos de livros, relatórios técnicos e textos publicados em jornais, revistas e sites
          institucionais.
        </p>

        {/* Filtros (em breve) */}
        <div className="mt-8 grid gap-3 rounded-2xl border bg-card p-4 sm:grid-cols-[1fr_auto_auto]" title="Em breve">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              disabled
              placeholder="Buscar por título ou autor…"
              className="w-full cursor-not-allowed rounded-xl border bg-muted/60 py-2 pl-9 pr-3 text-sm text-muted-foreground"
            />
          </div>
          <select disabled className="cursor-not-allowed rounded-xl border bg-muted/60 px-3 py-2 text-sm text-muted-foreground">
            <option>Ano</option>
          </select>
          <select disabled className="cursor-not-allowed rounded-xl border bg-muted/60 px-3 py-2 text-sm text-muted-foreground">
            <option>Autor</option>
          </select>
          <p className="text-xs text-muted-foreground sm:col-span-3">Filtros em breve.</p>
        </div>

        {/* Abas */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c.key}
              onClick={() => setTab(c.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === c.key
                  ? "bg-primary text-primary-foreground"
                  : "border bg-card text-foreground hover:bg-muted"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Lista */}
        <div className="mt-6 space-y-4">
          {!supabaseReady && <p className="text-sm text-muted-foreground">Conteúdo indisponível no momento.</p>}
          {isLoading && <p className="text-sm text-muted-foreground">Carregando publicações…</p>}
          {supabaseReady && !isLoading && items.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhuma publicação cadastrada nesta categoria.</p>
          )}

          {items.map((p) => {
            const img = (p as any).imagem_url as string | null;
            const isWide = img?.includes("capa.png");
            const totalCliques = ((p as any).cliques ?? 0) + (cliquesLocais[p.id] ?? 0);

            return (
              <article key={p.id} className="rounded-2xl border bg-card shadow-sm overflow-hidden">
                {img && isWide && (
                  <img
                    src={img}
                    alt={p.titulo ?? "Capa"}
                    className="h-40 w-full object-cover object-center"
                  />
                )}

                <div className="flex gap-5 p-6">
                  {img && !isWide && (
                    <div className="shrink-0">
                      <img
                        src={img}
                        alt={p.titulo ?? "Capa"}
                        className="h-28 w-20 rounded-xl object-cover shadow-sm sm:h-36 sm:w-28"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col min-w-0">
                    <span className="inline-block w-fit rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {CATS.find((c) => c.key === p.categoria)?.label}
                    </span>
                    <p className="mt-3 leading-relaxed text-foreground">{p.referencia}</p>

                    <div className="mt-4 flex items-center gap-4">
                      {(p.doi || p.url) && (
                        <>
                          <a
                            href={p.doi || p.url || "#"}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => registrarClique(p.id)}
                            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                          >
                            {p.doi ? "Acessar artigo" : "Acessar"} <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="h-3.5 w-3.5" />
                            {totalCliques} {totalCliques === 1 ? "acesso" : "acessos"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
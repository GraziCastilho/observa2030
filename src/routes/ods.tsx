import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import { ODS_17, ODS_EXTRA, type Ods } from "@/components/RodaODS";

export const Route = createFileRoute("/ods")({
  validateSearch: (search: Record<string, unknown>): { n: number } => {
    return { n: Number(search["n"] ?? 0) };
  },
  component: OdsPage,
});

function OdsPage() {
const search = Route.useSearch();
const paramN = search["n"] as number;
  const detalheRef = useRef<HTMLDivElement>(null);

  // Inicializa já com a ODS selecionada (evita delay do setState)
  const initial = paramN
    ? ([...ODS_17, ...ODS_EXTRA].find((o) => o.n === paramN) ?? null)
    : null;

  const [sel, setSel] = useState<Ods | null>(initial);

  // Scrolla para o detalhe após renderizar
  useEffect(() => {
    if (sel) {
      const timer = setTimeout(() => {
        detalheRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []); // roda só uma vez no mount

  const handleClick = (o: Ods) => {
    setSel((prev) => (prev?.n === o.n ? null : o));
    setTimeout(() => {
      detalheRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Objetivos de Desenvolvimento Sustentável
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          O Observa 2030 trabalha com os 17 ODS globais da ONU e os 3 ODS adjacentes brasileiros.
          Clique em cada objetivo para conhecer suas metas.
        </p>

        {/* Grid ODS 1–17 */}
        <div className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {ODS_17.map((o) => (
            <button
              key={o.n}
              onClick={() => handleClick(o)}
              title={`ODS ${o.n} — ${o.nome}`}
              className="overflow-hidden rounded-xl shadow-md transition-transform hover:scale-105 hover:shadow-lg"
              style={sel?.n === o.n ? { outline: `4px solid ${o.cor}`, outlineOffset: "3px" } : {}}
            >
              <img src={o.img} alt={`ODS ${o.n}`} loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        {/* Detalhe */}
        {sel && (
          <div ref={detalheRef} className="mt-10 scroll-mt-24 rounded-2xl border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-4 border-b pb-5" style={{ borderColor: sel.cor }}>
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl" style={{ background: sel.cor }}>
                <img src={sel.img} alt={`ODS ${sel.n}`} className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="text-sm font-bold uppercase tracking-wide" style={{ color: sel.cor }}>
                  ODS {sel.n}{sel.n >= 18 ? " — Adjacente" : ""}
                </span>
                <h2 className="text-2xl font-bold text-foreground">{sel.nome}</h2>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Objetivo</h3>
              <p className="mt-2 text-lg leading-relaxed text-foreground">{sel.objetivo}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                {!sel.tipo || sel.tipo === "metas" ? "Metas" : "Visão de Futuro"}
              </h3>
              <ul className="mt-4 space-y-3">
                {sel.metas.map((m, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: sel.cor }} />
                    <p className="leading-relaxed text-foreground">{m}</p>
                  </li>
                ))}
              </ul>
            </div>
            {sel.n >= 18 && (
              <p className="mt-6 border-t pt-4 text-xs text-muted-foreground">
                Fonte: CABRAL, R.; GEHRE, T. (Org.). <em>Guia Agenda 2030: integrando ODS, educação e sociedade.</em> São Paulo, 2020. Disponível em: guiaagenda2030.org
              </p>
            )}
          </div>
        )}

        {/* ODS Adjacentes */}
        <div className="mt-12 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">ODS Adjacentes Brasileiros</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 lg:mx-auto lg:max-w-[52%]">
                    {ODS_EXTRA.map((o) => (
            <button
              key={o.n}
              onClick={() => handleClick(o)}
              title={`ODS ${o.n} — ${o.nome}`}
              className="overflow-hidden rounded-xl shadow-md transition-transform hover:scale-105 hover:shadow-lg"
              style={sel?.n === o.n ? { outline: `4px solid ${o.cor}`, outlineOffset: "3px" } : {}}
            >
              <img src={o.img} alt={`ODS ${o.n}`} loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
          <div className="mt-16 rounded-2xl border bg-muted/40 p-6 text-xs leading-relaxed text-muted-foreground">
  <p className="mb-1 font-semibold text-foreground">Fontes</p>
  <p>
    <strong>ODS 1–17:</strong> ORGANIZAÇÃO DAS NAÇÕES UNIDAS (ONU). <em>Os Objetivos de Desenvolvimento Sustentável no Brasil.</em> Disponível em:{" "}
    <a href="https://brasil.un.org/pt-br/sdgs" target="_blank" rel="noreferrer" className="text-primary hover:underline">
      brasil.un.org/pt-br/sdgs
    </a>. Acesso em: 21 jul. 2026.
  </p>
  <p className="mt-3">
    <strong>ODS 18–20 (Adjacentes):</strong> CABRAL, Raquel; GEHRE, Thiago (Org.). <em>Guia Agenda 2030: integrando ODS, educação e sociedade.</em> São Paulo: Lucas Fúrio Melara; Raquel Cabral, 2020. E-book. ISBN 978-65-00142-87-7. Disponível em:{" "}
    <a href="https://www.guiaagenda2030.org" target="_blank" rel="noreferrer" className="text-primary hover:underline">
      guiaagenda2030.org
    </a>. Acesso em: 21 jul. 2026.
  </p>
</div>
      </div>
    </SiteLayout>
  );
}
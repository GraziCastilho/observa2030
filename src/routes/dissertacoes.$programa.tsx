import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, ExternalLink, ChevronDown, ArrowLeft, Lock, Info } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { supabase, supabaseReady } from "@/lib/supabase";
import { ODS_17, ODS_EXTRA } from "@/components/RodaODS";
import { PROGRAMAS } from "@/data/dissertacoesPanorama";

export const Route = createFileRoute("/dissertacoes/$programa")({
  component: ProgramaPage,
});

type Dissertacao = {
  id: string;
  programa: string;
  ano: number | null;
  autor: string | null;
  titulo: string | null;
  orientador: string | null;
  resumo: string | null;
  validacao_manual: string | null;
  link: string | null;
  ordem: number | null;
};

type Badge = { n: number; meta: string; tipo: "Direta" | "Indireta" };

const CORES: Record<number, string> = {};
const NOMES: Record<number, string> = {};
[...ODS_17, ...ODS_EXTRA].forEach((o) => {
  CORES[o.n] = o.cor;
  NOMES[o.n] = o.nome;
});
const corOds = (n: number) => CORES[n] ?? "#64748b";
const nomeOds = (n: number) => NOMES[n] ?? "";

const semAcento = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Extrai ODS + meta (ou diretriz) + tipo da coluna de validação manual.
// Cada item vem como "ODS 4 – Meta 4.2 (Direta)" separado por ";".
// Mantém a ordem do documento e todos os pares distintos (mesma ODS pode
// aparecer com metas diferentes).
function parseBadges(txt: string | null): Badge[] {
  if (!txt) return [];
  const out: Badge[] = [];
  const vistos = new Set<string>();
  for (const trecho of txt.split(";")) {
    const m = /ODS\s*(\d+)\s*[–—-]\s*(.+?)\s*\((Direta|Indireta)\)/i.exec(trecho);
    if (!m) continue;
    const n = parseInt(m[1]!, 10);
    const meta = m[2]!.trim();
    const tipo = m[3]! as "Direta" | "Indireta";
    const chave = `${n}|${meta}|${tipo}`;
    if (vistos.has(chave)) continue;
    vistos.add(chave);
    out.push({ n, meta, tipo });
  }
  return out;
}

function ProgramaPage() {
  const { programa } = Route.useParams();
  const info = PROGRAMAS.find((p) => p.slug === programa.toLowerCase());

  const [busca, setBusca] = useState("");
  const [odsFiltro, setOdsFiltro] = useState<number | null>(null);

  const { data = [], isLoading } = useQuery({
    queryKey: ["dissertacoes", info?.dbPrograma],
    enabled: supabaseReady && !!info,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dissertacoes")
        .select("*")
        .eq("programa", info!.dbPrograma)
        .order("ordem", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Dissertacao[];
    },
  });

  const comBadges = useMemo(
    () => data.map((d) => ({ ...d, badges: parseBadges(d.validacao_manual) })),
    [data]
  );

  const odsDisponiveis = useMemo(() => {
    const s = new Set<number>();
    comBadges.forEach((d) => d.badges.forEach((b) => s.add(b.n)));
    return [...s].sort((a, b) => a - b);
  }, [comBadges]);

  const lista = useMemo(() => {
    const q = semAcento(busca.trim());
    return comBadges.filter((d) => {
      const okOds = odsFiltro == null || d.badges.some((b) => b.n === odsFiltro);
      if (!okOds) return false;
      if (!q) return true;
      const alvo = semAcento(`${d.titulo ?? ""} ${d.autor ?? ""} ${d.orientador ?? ""}`);
      return alvo.includes(q);
    });
  }, [comBadges, busca, odsFiltro]);

  if (!info) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground">Programa não encontrado</h1>
          <p className="mt-3 text-muted-foreground">O programa solicitado não existe nesta seção.</p>
          <Link to="/dissertacoes" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar ao Panorama
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <Link to="/dissertacoes" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Panorama Geral
        </Link>

        {/* Cabeçalho do programa — logo em cima, sigla, nome completo embaixo */}
        <div className="mt-4 overflow-hidden rounded-2xl border bg-card shadow-sm" style={{ borderTopWidth: 5, borderTopColor: info.cor }}>
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            {/* Logo (topo, centralizada) */}
              <div className="mx-auto flex h-56 w-full max-w-[500px] items-center justify-center rounded-xl bg-white p-2 sm:h-72">
                <img
                src={info.logo}
                alt={`Logo ${info.sigla}`}
                loading="lazy"
                className="max-h-full w-auto max-w-full object-contain"
                onError={(e) => { (e.currentTarget.style.display = "none"); }}
              />
            </div>

            {/* Sigla */}
            <h1 className="mt-6 text-center text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: info.cor }}>
              {info.sigla}
            </h1>

            {/* Nome completo do programa */}
            <p className="mx-auto mt-3 max-w-3xl text-center text-base font-semibold leading-snug text-foreground sm:text-lg">
              {info.nomeCompleto} ({info.sigla})
            </p>

            {/* Tipo + página oficial */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${info.cor}1a`, color: info.cor }}>
                {info.tipo}
              </span>
              <span className="rounded-full border px-3 py-1 text-xs font-semibold text-muted-foreground">
                {info.total} dissertações
              </span>
              <a href={info.paginaOficial} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold hover:underline"
                style={{ color: info.cor, borderColor: `${info.cor}66` }}>
                Página oficial do programa <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Textos de apresentação (documento base) */}
            <div className="mt-7 space-y-4 border-t pt-7">
              {info.descricao.map((par, i) => (
                <p key={i} className="leading-relaxed text-justify text-muted-foreground">{par}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Intro da lista (texto do documento) */}
        <h2 className="mt-10 text-xl font-bold text-foreground text-justify">Dissertações do programa</h2>
        <p className="mt-2 leading-relaxed text-justify text-muted-foreground">{info.introLista}</p>

        {/* Busca + filtro por ODS */}
        <div className="mt-6 rounded-2xl border bg-card p-4 shadow-sm">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por título, autor(a) ou orientador(a)…"
              className="w-full rounded-xl border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          {odsDisponiveis.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setOdsFiltro(null)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${odsFiltro == null ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
              >
                Todos os ODS
              </button>
              {odsDisponiveis.map((n) => (
                <button
                  key={n}
                  onClick={() => setOdsFiltro((v) => (v === n ? null : n))}
                  className="rounded-full border px-3 py-1 text-xs font-semibold transition-colors"
                  style={odsFiltro === n
                    ? { background: corOds(n), color: "#fff", borderColor: corOds(n) }
                    : { color: corOds(n), borderColor: `${corOds(n)}66` }}
                >
                  ODS {n}
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="mt-5 text-sm text-muted-foreground">
          {isLoading ? "Carregando dissertações…" : `${lista.length} ${lista.length === 1 ? "dissertação" : "dissertações"}`}
          {!isLoading && (odsFiltro != null || busca) ? " encontradas" : ""}
        </p>

        {!supabaseReady && <p className="mt-4 text-sm text-muted-foreground">Conteúdo indisponível no momento.</p>}

        <div className="mt-4 space-y-5">
          {lista.map((d) => (
            <Card key={d.id} d={d} cor={info.cor} />
          ))}
          {!isLoading && supabaseReady && lista.length === 0 && (
            <p className="rounded-2xl border bg-card p-8 text-center text-sm text-muted-foreground shadow-sm">
              Nenhuma dissertação encontrada com os filtros atuais.
            </p>
          )}
        </div>

        <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
          Dissertações organizadas por ano de defesa. Classificação por validação qualitativa manual, no nível das
          metas dos ODS — uma mesma dissertação pode apresentar aderência direta e indireta a diferentes objetivos.
          Acesso ao texto integral pelo Repositório Institucional da Uergs, quando disponível.
        </p>
      </div>
    </SiteLayout>
  );
}

// Balão de ODS no estilo original; ao passar o mouse ou tocar, mostra a meta.
function BadgeODS({ b }: { b: Badge }) {
  const [aberto, setAberto] = useState(false);
  const c = corOds(b.n);
  const nome = nomeOds(b.n);
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        onBlur={() => setAberto(false)}
        aria-expanded={aberto}
        className="peer inline-flex cursor-help items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold outline-none transition-colors focus-visible:ring-2"
        style={{ color: c, borderColor: `${c}55` }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
        ODS {b.n}
        <span className="font-normal opacity-70">· {b.tipo}</span>
      </button>
      <span
        role="tooltip"
        className={`pointer-events-none absolute bottom-full left-1/2 z-30 mb-1.5 w-max max-w-[240px] -translate-x-1/2 rounded-lg bg-foreground px-3 py-2 text-left text-[11px] leading-snug text-background shadow-lg transition-opacity duration-150 peer-hover:opacity-100 ${aberto ? "opacity-100" : "opacity-0"}`}
      >
        <span className="block font-bold">{b.meta}</span>
        {nome && <span className="block opacity-75">ODS {b.n} · {nome}</span>}
        <span className="block opacity-75">Aderência {b.tipo.toLowerCase()}</span>
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-foreground" />
      </span>
    </span>
  );
}

function Card({ d, cor }: { d: Dissertacao & { badges: Badge[] }; cor: string }) {
  const [aberto, setAberto] = useState(false);
  const temLink = !!d.link && /^https?:\/\//i.test(d.link);

  return (
    <article className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {d.ano != null && (
          <span className="rounded-full px-2.5 py-1 font-semibold" style={{ background: `${cor}1a`, color: cor }}>
            {d.ano}
          </span>
        )}
        {d.badges.map((b, i) => (
          <BadgeODS key={`${b.n}-${i}`} b={b} />
        ))}
      </div>

      {d.badges.length > 0 && (
        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Info className="h-3 w-3 shrink-0" />
          Passe o mouse ou toque nas ODS para ver as metas.
        </p>
      )}

      <h3 className="mt-3 text-base font-bold leading-snug text-foreground">{d.titulo}</h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {d.autor}
        {d.orientador ? <> · orientação: {d.orientador}</> : null}
      </p>

      {d.resumo && (
        <div className="mt-3">
          <p className={`text-sm leading-relaxed text-justify text-foreground ${aberto ? "" : "line-clamp-4"}`}>{d.resumo}</p>
          <button
            onClick={() => setAberto((v) => !v)}
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold"
            style={{ color: cor }}
          >
            {aberto ? "Ler menos" : "Ler resumo completo"}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${aberto ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}

      <div className="mt-4">
        {temLink ? (
          <a
            href={d.link!}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: cor }}
          >
            Repositório institucional <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium text-muted-foreground">
            <Lock className="h-3.5 w-3.5" /> {d.link || "Acesso restrito"}
          </span>
        )}
      </div>
    </article>
  );
}
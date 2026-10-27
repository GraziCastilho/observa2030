import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, ExternalLink, ChevronDown, ArrowLeft, Lock } from "lucide-react";
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

type Badge = { n: number; tipo: "Direta" | "Indireta" };

const CORES: Record<number, string> = {};
[...ODS_17, ...ODS_EXTRA].forEach((o) => (CORES[o.n] = o.cor));
const corOds = (n: number) => CORES[n] ?? "#64748b";

const semAcento = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Extrai os ODS validados (nº + tipo) da coluna de validação manual
function parseBadges(txt: string | null): Badge[] {
  if (!txt) return [];
  const re = /ODS\s*(\d+)[^;]*?\((Direta|Indireta)\)/gi;
  const map = new Map<number, "Direta" | "Indireta">();
  let m: RegExpExecArray | null;
  while ((m = re.exec(txt))) {
    const n = parseInt(m[1]!, 10);
    const tipo = m[2]! as "Direta" | "Indireta";
    // Direta tem prioridade se o mesmo ODS aparecer duas vezes
    if (!map.has(n) || tipo === "Direta") map.set(n, tipo);
  }
  return [...map.entries()].sort((a, b) => a[0] - b[0]).map(([n, tipo]) => ({ n, tipo }));
}

function ProgramaPage() {
  const { programa } = Route.useParams();
  const info = PROGRAMAS.find((p) => p.slug === programa.toLowerCase());

  const [busca, setBusca] = useState("");
  const [odsFiltro, setOdsFiltro] = useState<number | null>(null);

  const { data = [], isLoading } = useQuery({
    queryKey: ["dissertacoes", info?.sigla],
    enabled: supabaseReady && !!info,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dissertacoes")
        .select("*")
        .eq("programa", info!.sigla)
        .order("ordem", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Dissertacao[];
    },
  });

  // Pré-processa badges por dissertação
  const comBadges = useMemo(
    () => data.map((d) => ({ ...d, badges: parseBadges(d.validacao_manual) })),
    [data]
  );

  // ODS presentes no programa (para os chips de filtro)
  const odsDisponiveis = useMemo(() => {
    const s = new Set<number>();
    comBadges.forEach((d) => d.badges.forEach((b) => s.add(b.n)));
    return [...s].sort((a, b) => a - b);
  }, [comBadges]);

  // Aplica busca + filtro
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
      <div className="mx-auto max-w-5xl px-4 py-16">
        <Link to="/dissertacoes" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Panorama Geral
        </Link>

        {/* Cabeçalho do programa */}
        <div className="mt-4 rounded-2xl border bg-card p-7 shadow-sm" style={{ borderTopWidth: 5, borderTopColor: info.cor }}>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: info.cor }}>{info.sigla}</h1>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${info.cor}1a`, color: info.cor }}>
              {info.total} dissertações
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Dissertações do Programa de Pós-Graduação e sua aderência aos Objetivos de Desenvolvimento Sustentável.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Bar label="Aderência direta" value={info.diretasPct} n={info.diretasN} cor={info.cor} />
            <Bar label="Aderência indireta" value={info.indiretasPct} n={info.indiretasN} cor={info.cor} />
          </div>
        </div>

        {/* Busca + filtro por ODS */}
        <div className="mt-8 rounded-2xl border bg-card p-4 shadow-sm">
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

        {/* Resultado */}
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
          Classificação por validação qualitativa manual, no nível das metas dos ODS. Uma mesma dissertação pode
          apresentar aderência direta e indireta a diferentes objetivos. Repositório Institucional da Uergs.
        </p>
      </div>
    </SiteLayout>
  );
}

function Bar({ label, value, n, cor }: { label: string; value: number; n: number; cor: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground">
          {(value * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}% · {n}
        </span>
      </div>
      <span className="mt-1 block h-2 overflow-hidden rounded-full bg-muted">
        <span className="block h-full rounded-full" style={{ width: `${value * 100}%`, background: cor }} />
      </span>
    </div>
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
        {d.badges.map((b) => (
          <span
            key={b.n}
            className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-semibold"
            style={{ color: corOds(b.n), borderColor: `${corOds(b.n)}55` }}
            title={`ODS ${b.n} — aderência ${b.tipo.toLowerCase()}`}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: corOds(b.n) }} />
            ODS {b.n}
            <span className="font-normal opacity-70">· {b.tipo}</span>
          </span>
        ))}
      </div>

      <h3 className="mt-3 text-base font-bold leading-snug text-foreground">{d.titulo}</h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {d.autor}
        {d.orientador ? <> · orientação: {d.orientador}</> : null}
      </p>

      {d.resumo && (
        <div className="mt-3">
          <p className={`text-sm leading-relaxed text-foreground ${aberto ? "" : "line-clamp-4"}`}>{d.resumo}</p>
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

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookMarked, Target, Layers } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { ODS_17 } from "@/components/RodaODS";
import {
  HEADLINE,
  PROGRAMAS,
  ODS_DIRETAS,
  ODS_POR_PROGRAMA,
  CINCO_PS,
  CONCORDANCIA,
} from "@/data/dissertacoesPanorama";

const TITLE = "Dissertações da Uergs — Panorama Geral | Observa 2030";
const DESC =
  "Panorama da aderência das dissertações dos cinco Programas de Pós-Graduação da Uergs aos Objetivos de Desenvolvimento Sustentável (ODS).";

export const Route = createFileRoute("/dissertacoes")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PanoramaPage,
});

const pct = (v: number) => `${(v * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
const pct2 = (v: number) => `${(v * 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
const odsCor = (n: number) => ODS_17.find((o) => o.n === n)?.cor ?? "#64748b";
const odsNome = (n: number) => ODS_17.find((o) => o.n === n)?.nome ?? `ODS ${n}`;

type Prog = (typeof PROGRAMAS)[number];
const PS_COLS: { key: string; nome: string; cor: string; get: (p: Prog) => number }[] = [
  { key: "pessoas", nome: "Pessoas", cor: "#E5243B", get: (p) => p.cincoPs.pessoas },
  { key: "planeta", nome: "Planeta", cor: "#4C9F38", get: (p) => p.cincoPs.planeta },
  { key: "prosperidade", nome: "Prosperidade", cor: "#FCC30B", get: (p) => p.cincoPs.prosperidade },
  { key: "paz", nome: "Paz", cor: "#00689D", get: (p) => p.cincoPs.paz },
  { key: "parcerias", nome: "Parcerias", cor: "#19486A", get: (p) => p.cincoPs.parcerias },
];

function PanoramaPage() {
  const maxInc = Math.max(...ODS_DIRETAS.map((o) => o.incidencias));

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Cabeçalho */}
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          Dissertações da Uergs • Panorama Geral
        </span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Aderência das dissertações aos Objetivos de Desenvolvimento Sustentável
        </h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          O Projeto Observa 2030 realizou um levantamento e uma análise das dissertações desenvolvidas nos cinco
          Programas de Pós-Graduação da Uergs. Foram examinadas <strong>254 dissertações</strong> a partir de duas
          abordagens complementares: a análise computacional pelo software <strong>ImpactoSociedade®</strong> e a
          validação qualitativa manual, fundamentada na análise dos conteúdos das pesquisas e na identificação de
          relações com as metas da Agenda 2030. A referência adotada nos indicadores é a validação manual.
        </p>

        {/* Indicadores principais */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <article className="rounded-2xl border bg-card p-7 shadow-sm" style={{ borderLeftWidth: 4, borderLeftColor: "#19486A" }}>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "#19486A1a" }}>
              <BookMarked className="h-6 w-6" style={{ color: "#19486A" }} />
            </span>
            <p className="mt-5 text-4xl font-extrabold text-foreground">{HEADLINE.totalDissertacoes}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              dissertações analisadas em {HEADLINE.programas} programas de Pós-Graduação
            </p>
          </article>
          <article className="rounded-2xl border bg-card p-7 shadow-sm" style={{ borderLeftWidth: 4, borderLeftColor: "#4C9F38" }}>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "#4C9F381a" }}>
              <Target className="h-6 w-6" style={{ color: "#4C9F38" }} />
            </span>
            <p className="mt-5 text-4xl font-extrabold text-foreground">{HEADLINE.diretaN}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              dissertações ({pct(HEADLINE.diretaPct)}) com aderência <strong>direta</strong> a pelo menos um ODS
            </p>
          </article>
          <article className="rounded-2xl border bg-card p-7 shadow-sm" style={{ borderLeftWidth: 4, borderLeftColor: "#FD6925" }}>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "#FD69251a" }}>
              <Layers className="h-6 w-6" style={{ color: "#FD6925" }} />
            </span>
            <p className="mt-5 text-4xl font-extrabold text-foreground">{HEADLINE.indiretaN}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              dissertações ({pct(HEADLINE.indiretaPct)}) com aderência <strong>indireta</strong> a pelo menos um ODS
            </p>
          </article>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Aderência direta e indireta não são categorias mutuamente exclusivas — uma mesma dissertação pode integrar as duas.
        </p>

        {/* Programas */}
        <h2 className="mt-16 text-2xl font-bold text-foreground">Distribuição por Programa de Pós-Graduação</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          O PPGED concentrou o maior número de dissertações (88), seguido pelo PPGAS (73). Os maiores percentuais de
          aderência direta foram observados no PPGED e no PPGSTEM (100% em ambos). Clique em um programa para explorar
          as dissertações, com título, resumo, orientação e repositório.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMAS.map((p) => (
            <Link
              key={p.slug}
              to="/dissertacoes/$programa"
              params={{ programa: p.slug }}
              className="group flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
              style={{ borderTopWidth: 4, borderTopColor: p.cor }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                  <img
                    src={p.logo}
                    alt={`Logo ${p.sigla}`}
                    loading="lazy"
                    className="h-full w-full object-contain p-1"
                    onError={(e) => { (e.currentTarget.style.display = "none"); }}
                  />
                </span>
                <div>
                  <span className="text-lg font-extrabold" style={{ color: p.cor }}>{p.sigla}</span>
                  <span className="block text-[11px] text-muted-foreground">{p.total} dissertações · {p.tipo}</span>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <BarMini label="Aderência direta" value={p.diretasPct} cor={p.cor} extra={`${p.diretasN}`} />
                <BarMini label="Aderência indireta" value={p.indiretasPct} cor={p.cor} extra={`${p.indiretasN}`} />
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: p.cor }}>
                Ver dissertações
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        {/* Matriz 17 ODS × 5 programas */}
        <h2 className="mt-16 text-2xl font-bold text-foreground">Aderência direta por programa e por ODS</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Quantidade (n) e percentual de dissertações com relações diretas a cada ODS, por programa. Observa-se a
          predominância do ODS 4 no PPGED (98,86%) e no PPGSTEM (100%); no PPGCTA destaca-se o ODS 12 (34,29%) e no
          PPGSCBIO o ODS 15 (52,94%). O PPGAS relaciona-se com um conjunto mais amplo de ODS, especialmente o 15
          (30,14%) e o 12 (19,18%). Percentuais sobre o total de dissertações de cada programa.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border bg-card shadow-sm">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="sticky left-0 z-10 bg-card px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  ODS
                </th>
                {PROGRAMAS.map((p) => (
                  <th key={p.slug} className="px-3 py-3 text-center text-xs font-extrabold" style={{ color: p.cor }}>
                    {p.sigla}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ODS_DIRETAS.map((o, ri) => {
                const linha = ODS_POR_PROGRAMA[o.n] ?? [];
                return (
                  <tr key={o.n} className={`border-b last:border-0 ${ri % 2 ? "bg-muted/30" : ""}`}>
                    <th className={`sticky left-0 z-10 px-4 py-2.5 text-left font-medium text-foreground ${ri % 2 ? "bg-[#f7f8fa] dark:bg-muted/30" : "bg-card"}`}>
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: odsCor(o.n) }} />
                        <span className="whitespace-nowrap text-xs sm:text-sm">ODS {o.n} <span className="hidden text-muted-foreground sm:inline">· {odsNome(o.n)}</span></span>
                      </span>
                    </th>
                    {PROGRAMAS.map((p, ci) => {
                      const n = linha[ci] ?? 0;
                      return (
                        <td key={p.slug} className="px-3 py-2.5 text-center tabular-nums">
                          {n > 0 ? (
                            <span>
                              <span className="font-semibold text-foreground">{n}</span>{" "}
                              <span className="text-xs text-muted-foreground">({pct2(n / p.total)})</span>
                            </span>
                          ) : (
                            <span className="text-muted-foreground/40">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Aderência direta aos 17 ODS */}
        <h2 className="mt-16 text-2xl font-bold text-foreground">Distribuição entre os 17 ODS</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          O ODS 4 (Educação de Qualidade) apresentou a maior frequência de relações diretas, associado a 138
          dissertações (54,33% do total), seguido pelos ODS 15 (Vida Terrestre), com 31 (12,20%), e 12 (Consumo e
          Produção Responsáveis), com 26 (10,24%). Os ODS 1 (Erradicação da Pobreza) e 7 (Energia Limpa e Acessível)
          não apresentaram relações diretas identificadas. Percentuais sobre o total de 254 dissertações.
        </p>
        <div className="mt-6 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <ul className="space-y-2.5">
            {ODS_DIRETAS.map((o) => (
              <li key={o.n} className="flex items-center gap-3">
                <span className="w-7 shrink-0 text-right text-xs font-bold tabular-nums" style={{ color: odsCor(o.n) }}>
                  {o.n}
                </span>
                <span className="hidden w-64 shrink-0 truncate text-xs text-muted-foreground sm:block" title={odsNome(o.n)}>
                  {odsNome(o.n)}
                </span>
                <span className="relative h-5 flex-1 overflow-hidden rounded-full bg-muted">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width: `${(o.incidencias / maxInc) * 100}%`, background: odsCor(o.n), minWidth: o.incidencias > 0 ? 6 : 0 }}
                  />
                </span>
                <span className="w-24 shrink-0 text-right text-xs font-semibold tabular-nums text-foreground">
                  {o.incidencias} <span className="font-normal text-muted-foreground">· {pct2(o.incidencias / HEADLINE.totalDissertacoes)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 5 Ps */}
        <h2 className="mt-16 text-2xl font-bold text-foreground">Distribuição segundo os 5 Ps da sustentabilidade</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          A dimensão <strong>Pessoas</strong> apresentou a maior representatividade (164 dissertações, 64,6%), seguida
          por <strong>Planeta</strong> (71, 28,0%) e <strong>Prosperidade</strong> (36, 14,2%). As dimensões Paz (2,0%)
          e Parcerias (0,4%) apresentaram as menores frequências. Percentuais sobre 254 dissertações; não são
          mutuamente exclusivos.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CINCO_PS.map((p) => (
            <article key={p.nome} className="rounded-2xl border bg-card p-5 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ background: `${p.cor}1a` }}>
                <span className="text-xl font-extrabold" style={{ color: p.cor }}>{pct(p.pct)}</span>
              </div>
              <p className="mt-3 font-bold text-foreground">{p.nome}</p>
              <p className="text-xs text-muted-foreground">{p.n} dissertações</p>
              <p className="mt-1 text-[11px] font-medium text-muted-foreground">{p.desc}</p>
            </article>
          ))}
        </div>

        {/* 5 Ps por programa */}
        <h3 className="mt-10 text-lg font-bold text-foreground">Distribuição dos 5 Ps por programa</h3>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          A dimensão <strong>Pessoas</strong> predomina no PPGED e no PPGSTEM (100% em ambos). <strong>Planeta</strong>
          {" "}apresenta maior representatividade no PPGAS (65,8%) e no PPGSCBIO (64,7%). O PPGCTA demonstra distribuição
          mais equilibrada (34,3% em Pessoas e Planeta). Percentuais sobre o total de dissertações de cada programa.
        </p>
        <div className="mt-5 overflow-x-auto rounded-2xl border bg-card shadow-sm">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">Programa</th>
                {PS_COLS.map((c) => (
                  <th key={c.key} className="px-3 py-3 text-center text-xs font-bold" style={{ color: c.cor }}>{c.nome}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROGRAMAS.map((p, ri) => (
                <tr key={p.slug} className={`border-b last:border-0 ${ri % 2 ? "bg-muted/30" : ""}`}>
                  <th className="px-4 py-2.5 text-left font-extrabold" style={{ color: p.cor }}>{p.sigla}</th>
                  {PS_COLS.map((c) => {
                    const v = c.get(p);
                    return (
                      <td key={c.key} className="px-3 py-2.5 text-center tabular-nums">
                        {v > 0 ? <span className="font-semibold text-foreground">{pct(v)}</span> : <span className="text-muted-foreground/40">—</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Concordância software × manual */}
        <h2 className="mt-16 text-2xl font-bold text-foreground">Comparação entre o ImpactoSociedade® e a validação manual</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Comparação sobre {HEADLINE.paresComparacao.toLocaleString("pt-BR")} pares dissertação × ODS (254 × 17). A
          elevada concordância simples decorre, principalmente, das situações em que ambos os métodos não identificaram
          relações; a baixa concordância positiva e os valores de Kappa reforçam a importância da validação qualitativa.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <StatConc titulo="Aderência direta" sub="concordância das classificações diretas" c={CONCORDANCIA.direta} />
          <StatConc titulo="Aderência indireta" sub="concordância das classificações indiretas" c={CONCORDANCIA.indireta} />
          <StatConc titulo="Classificação geral" sub="3 classes: ausente / direta / indireta" c={CONCORDANCIA.geral} />
        </div>

        {/* Concordância positiva por programa */}
        <h3 className="mt-10 text-lg font-bold text-foreground">Concordância positiva por programa</h3>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          A concordância positiva apresentou valores relativamente baixos em todos os programas. O PPGSCBIO apresentou
          os maiores percentuais nas relações diretas (17,65%) e na classificação geral (11,90%), enquanto o PPGAS
          apresentou a maior concordância nas relações indiretas (8,28%).
        </p>
        <div className="mt-5 overflow-x-auto rounded-2xl border bg-card shadow-sm">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">Programa</th>
                <th className="px-3 py-3 text-center text-xs font-bold text-muted-foreground">Direta</th>
                <th className="px-3 py-3 text-center text-xs font-bold text-muted-foreground">Indireta</th>
                <th className="px-3 py-3 text-center text-xs font-bold text-muted-foreground">Geral</th>
              </tr>
            </thead>
            <tbody>
              {PROGRAMAS.map((p, ri) => (
                <tr key={p.slug} className={`border-b last:border-0 ${ri % 2 ? "bg-muted/30" : ""}`}>
                  <th className="px-4 py-2.5 text-left font-extrabold" style={{ color: p.cor }}>{p.sigla}</th>
                  <td className="px-3 py-2.5 text-center font-semibold tabular-nums text-foreground">{pct2(p.concordanciaPositiva.direta)}</td>
                  <td className="px-3 py-2.5 text-center font-semibold tabular-nums text-foreground">{pct2(p.concordanciaPositiva.indireta)}</td>
                  <td className="px-3 py-2.5 text-center font-semibold tabular-nums text-foreground">{pct2(p.concordanciaPositiva.geral)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Metodologia resumida */}
        <div className="mt-16 rounded-2xl border bg-muted/40 p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
          <h2 className="text-lg font-bold text-foreground">Nota metodológica</h2>
          <p className="mt-3">
            O mapeamento adotou abordagem quali-quantitativa em duas etapas complementares: (i) análise computacional
            pelo software <strong>ImpactoSociedade®</strong>, que atribui valores de associação (escala 0–1) entre os
            textos e os ODS; e (ii) <strong>validação qualitativa manual</strong>, fundamentada nos 17 ODS oficiais e
            em suas 169 metas, com apoio de ferramentas de IA para organização e revisão das análises. A validação
            manual é a referência interpretativa dos indicadores aqui apresentados.
          </p>
          <p className="mt-3">
            As classificações foram estabelecidas preferencialmente no nível das metas. Uma mesma dissertação pôde
            apresentar relações diretas para alguns ODS e indiretas para outros. Os ODS 18, 19 e 20 (adjacentes
            brasileiros) foram preservados nos registros de origem, mas não integram os indicadores dos 17 ODS oficiais.
          </p>
          <p className="mt-3 text-xs">
            Os indicadores expressam aderência temática, científica e potencial das dissertações aos ODS, não devendo
            ser interpretados como comprovação de impacto efetivo das pesquisas.
          </p>
          <div className="mt-5 border-t pt-4 text-xs">
            <p className="font-semibold text-foreground">Fontes</p>
            <p className="mt-2">
              GOMES JUNIOR, J. C. et al. Proposed mapping and evaluation model of sustainable development goals in
              graduate programs in environmental sciences in Brazil. <em>International Journal of Sustainability in
              Higher Education</em>, v. 24, n. 7, p. 1452–1473, 2023.
            </p>
            <p className="mt-2">
              ORGANIZAÇÃO DAS NAÇÕES UNIDAS (ONU). <em>Transformando nosso mundo: a Agenda 2030 para o Desenvolvimento
              Sustentável.</em> Nova York: ONU, 2015.
            </p>
            <p className="mt-2">
              ImpactoSociedade® — plataforma de análise de aderência aos ODS. Disponível em:{" "}
              <a href="https://impactosociedade.com.br/" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                impactosociedade.com.br
              </a>.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function BarMini({ label, value, cor, extra }: { label: string; value: number; cor: string; extra: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground">
          {(value * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}% · {extra}
        </span>
      </div>
      <span className="mt-1 block h-2 overflow-hidden rounded-full bg-muted">
        <span className="block h-full rounded-full" style={{ width: `${value * 100}%`, background: cor }} />
      </span>
    </div>
  );
}

function StatConc({ titulo, sub, c }: { titulo: string; sub: string; c: { simples: number; positiva: number; kappa: number } }) {
  return (
    <article className="rounded-2xl border bg-card p-6 shadow-sm">
      <h3 className="font-bold text-foreground">{titulo}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Concordância simples</dt>
          <dd className="font-semibold text-foreground">{pct2(c.simples)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Concordância positiva</dt>
          <dd className="font-semibold text-foreground">{pct2(c.positiva)}</dd>
        </div>
        <div className="flex items-center justify-between border-t pt-2">
          <dt className="text-muted-foreground">Kappa de Cohen</dt>
          <dd className="font-semibold text-foreground">{c.kappa.toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</dd>
        </div>
      </dl>
    </article>
  );
}
import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookMarked, Target, Layers } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { ODS_17 } from "@/components/RodaODS";
import PanoramaChart, { type Serie, type Grupo } from "@/components/PanoramaChart";
import {
  HEADLINE,
  PROGRAMAS,
  ODS_DIRETAS,
  ODS_POR_PROGRAMA,
  INCIDENCIAS_PROGRAMA,
  CINCO_PS,
  CINCO_PS_PROGRAMA,
  CINCO_PS_TOTAL,
  CONCORDANCIA,
  CONC_DIRETA,
  CONC_DIRETA_TOTAL,
  CONC_INDIRETA,
  CONC_INDIRETA_TOTAL,
  CONC_GERAL,
  CONC_GERAL_TOTAL,
  type LinhaConcDir,
} from "@/data/dissertacoesPanorama";

const TITLE = "Dissertações da Uergs — Panorama Geral | Observa 2030";
const DESC =
  "Panorama da aderência das dissertações dos cinco Programas de Pós-Graduação da Uergs aos Objetivos de Desenvolvimento Sustentável (ODS).";

export const Route = createFileRoute("/dissertacoes/")({
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

// ───────────────────────── helpers ─────────────────────────
const pct1 = (v: number) =>
  `${(v * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
const pct2 = (v: number) =>
  `${(v * 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
const num = (v: number) => v.toLocaleString("pt-BR");
const odsCor = (n: number) => ODS_17.find((o) => o.n === n)?.cor ?? "#64748b";
const odsNome = (n: number) => ODS_17.find((o) => o.n === n)?.nome ?? `ODS ${n}`;

// Cores de série
const C_DIRETA = "#19486A";
const C_INDIRETA = "#FD6925";
const C_GERAL = "#4C9F38";

const TICKS_100 = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
const TICKS_60 = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
const TICKS_20 = [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2];

function PanoramaPage() {
  // ── dados dos gráficos ──
  // Gráfico 1 — Perfil dos PPGs em relação aos 17 ODS (% por ODS, por programa)
  const seriesProg: Serie[] = PROGRAMAS.map((p) => ({ label: p.sigla, cor: p.cor }));
  const gPerfil: Grupo[] = ODS_DIRETAS.map((o) => ({
    label: `ODS ${o.n}`,
    valores: PROGRAMAS.map((p, i) => (ODS_POR_PROGRAMA[o.n]?.[i] ?? 0) / p.total),
  }));

  // Gráfico 2 — Aderência direta × indireta por programa
  const gDirIndir: Grupo[] = PROGRAMAS.map((p) => ({
    label: p.sigla,
    valores: [p.diretasPct, p.indiretasPct],
  }));

  // Gráfico 3 — Distribuição institucional entre os 17 ODS (% sobre 254)
  const gOds17: Grupo[] = ODS_DIRETAS.map((o) => ({
    label: `ODS ${o.n}`,
    valores: [o.incidencias / HEADLINE.totalDissertacoes],
    cores: [odsCor(o.n)],
  }));

  // Gráfico 4 — 5 Ps por programa
  const seriesPs: Serie[] = CINCO_PS.map((p) => ({ label: p.nome, cor: p.cor }));
  const gPs: Grupo[] = PROGRAMAS.map((p) => {
    const r = CINCO_PS_PROGRAMA[p.sigla]!;
    return {
      label: p.sigla,
      valores: [r.pessoas[1], r.planeta[1], r.prosperidade[1], r.paz[1], r.parcerias[1]],
    };
  });

  // Gráfico 5 — Concordância positiva por programa
  const gConc: Grupo[] = PROGRAMAS.map((p) => ({
    label: p.sigla,
    valores: [p.concordanciaPositiva.direta, p.concordanciaPositiva.indireta, p.concordanciaPositiva.geral],
  }));

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* ═══════════ TÍTULO ═══════════ */}
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          Dissertações da Uergs • Panorama Geral
        </span>
        <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          Panorama Geral: Análise da Aderência das Dissertações aos Objetivos de Desenvolvimento Sustentável
        </h1>

        {/* Parágrafos de abertura (texto do documento) */}
        <div className="mt-6 max-w-3xl space-y-4 leading-relaxed text-muted-foreground">
          <p>
            Com o objetivo de compreender as relações entre a produção científica dos Programas de Pós-Graduação da
            Uergs e os Objetivos de Desenvolvimento Sustentável (ODS), o Projeto Observa 2030 realizou um levantamento e
            uma análise das dissertações desenvolvidas nos cinco programas da Universidade.
          </p>
          <p>
            O levantamento compreende 254 dissertações, examinadas a partir de duas abordagens complementares: a análise
            computacional realizada pelo software ImpactoSociedade® e a validação qualitativa manual, fundamentada na
            análise dos conteúdos das pesquisas e na identificação de possíveis relações com as metas da Agenda 2030.
          </p>
          <p>
            A combinação dessas abordagens permitiu identificar relações diretas e indiretas entre as dissertações e os
            ODS, bem como comparar os resultados obtidos pelos diferentes procedimentos de análise.
          </p>
          <p>
            Nesta seção, são apresentados gráficos, tabelas e indicadores que permitem visualizar a distribuição das
            dissertações entre os programas, identificar os ODS mais recorrentes e examinar as diferenças e semelhanças
            entre os resultados computacionais e a validação manual.
          </p>
          <p>
            Os indicadores apresentados representam relações de aderência temática, científica e potencial das pesquisas
            aos ODS, não constituindo, necessariamente, evidências de impactos sociais, ambientais ou econômicos
            efetivamente produzidos.
          </p>
        </div>

        {/* Indicadores-resumo (números do documento) */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <IndicadorCard cor="#19486A" icon={<BookMarked className="h-6 w-6" style={{ color: "#19486A" }} />} valor={num(HEADLINE.totalDissertacoes)}
            texto={<>dissertações analisadas em {HEADLINE.programas} Programas de Pós-Graduação</>} />
          <IndicadorCard cor="#4C9F38" icon={<Target className="h-6 w-6" style={{ color: "#4C9F38" }} />} valor={num(HEADLINE.diretaN)}
            texto={<>({pct2(HEADLINE.diretaPct)}) com aderência <strong>direta</strong> a pelo menos um ODS</>} />
          <IndicadorCard cor="#FD6925" icon={<Layers className="h-6 w-6" style={{ color: "#FD6925" }} />} valor={num(HEADLINE.indiretaN)}
            texto={<>({pct2(HEADLINE.indiretaPct)}) com aderência <strong>indireta</strong> a pelo menos um ODS</>} />
        </div>

        {/* ═══════════ 1. DISTRIBUIÇÃO POR PROGRAMA ═══════════ */}
        <SecTitle>Distribuição das dissertações por Programa de Pós-Graduação</SecTitle>
        <P>
          A tabela a seguir apresenta a distribuição das dissertações analisadas entre os cinco Programas de
          Pós-Graduação da Uergs, destacando a quantidade e o percentual de trabalhos com relações diretas e indiretas
          aos Objetivos de Desenvolvimento Sustentável (ODS), conforme a validação qualitativa manual.
        </P>

        {/* Tabela 01 — Panorama por programa */}
        <Quadro
          titulo="Panorama geral por programa — classificação manual"
          nota="Percentuais relativos ao total de dissertações do PPG. Direta e indireta não são categorias mutuamente exclusivas."
        >
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 text-left">Programa</th>
                <th className="px-3 py-3 text-center">Dissertações</th>
                <th className="px-3 py-3 text-center">Diretas (n)</th>
                <th className="px-3 py-3 text-center">Diretas (%)</th>
                <th className="px-3 py-3 text-center">Indiretas (n)</th>
                <th className="px-3 py-3 text-center">Indiretas (%)</th>
              </tr>
            </thead>
            <tbody>
              {PROGRAMAS.map((p, ri) => (
                <tr key={p.slug} className={`border-b ${ri % 2 ? "bg-muted/20" : ""}`}>
                  <th className="px-4 py-2.5 text-left font-extrabold" style={{ color: p.cor }}>{p.sigla}</th>
                  <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{p.total}</td>
                  <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{p.diretasN}</td>
                  <td className="px-3 py-2.5 text-center tabular-nums font-semibold text-foreground">{pct2(p.diretasPct)}</td>
                  <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{p.indiretasN}</td>
                  <td className="px-3 py-2.5 text-center tabular-nums font-semibold text-foreground">{pct2(p.indiretasPct)}</td>
                </tr>
              ))}
              <tr className="bg-foreground text-background">
                <th className="px-4 py-3 text-left font-extrabold">TOTAL</th>
                <td className="px-3 py-3 text-center tabular-nums font-bold">{HEADLINE.totalDissertacoes}</td>
                <td className="px-3 py-3 text-center tabular-nums font-bold">{HEADLINE.diretaN}</td>
                <td className="px-3 py-3 text-center tabular-nums font-bold">{pct2(HEADLINE.diretaPct)}</td>
                <td className="px-3 py-3 text-center tabular-nums font-bold">{HEADLINE.indiretaN}</td>
                <td className="px-3 py-3 text-center tabular-nums font-bold">{pct2(HEADLINE.indiretaPct)}</td>
              </tr>
            </tbody>
          </table>
          <p className="border-t bg-amber-50 px-4 py-2.5 text-xs text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
            Nota: ODS 18, 19 e 20 são preservados na base original, mas não integram os 17 objetivos oficiais
            contabilizados nos indicadores.
          </p>
        </Quadro>

        <P>
          Das 254 dissertações analisadas, 237 (93,31%) apresentaram pelo menos uma relação direta com os ODS, enquanto
          140 (55,12%) demonstraram relações indiretas. O PPGED concentrou o maior número de dissertações (88), seguido
          pelo PPGAS (73). Os maiores percentuais de aderência direta foram observados no PPGED e no PPGSTEM (100% em
          ambos), evidenciando a ampla presença de temáticas relacionadas à Agenda 2030 na produção científica analisada.
        </P>

        {/* Gráfico 1 — Perfil dos PPGs */}
        <div className="mt-8">
          <PanoramaChart
            titulo="Perfil dos PPGs da Uergs em relação aos 17 ODS"
            series={seriesProg}
            grupos={gPerfil}
            ticks={TICKS_100}
            altura={300}
            minWidth={1040}
            casasDecimais={1}
          />
        </div>

        <P>
          O gráfico acima evidencia diferentes perfis de aderência entre os programas. O PPGED e o PPGSTEM apresentam
          forte concentração no ODS 4 (Educação de Qualidade), enquanto o PPGSCBIO se destaca no ODS 15 (Vida
          Terrestre). O PPGCTA apresenta maior representatividade nos ODS 12 (Consumo e Produção Responsáveis) e 3
          (Saúde e Bem-Estar), enquanto o PPGAS demonstra uma distribuição mais diversificada entre os objetivos,
          especialmente aqueles relacionados às dimensões ambientais.
        </P>

        {/* ═══════════ 2. ADERÊNCIA AOS 17 ODS ═══════════ */}
        <SecTitle>Aderência das dissertações aos Objetivos de Desenvolvimento Sustentável</SecTitle>
        <P>
          A tabela a seguir detalha a quantidade e o percentual de dissertações que apresentam relações diretas com cada
          um dos 17 ODS, permitindo identificar os objetivos mais recorrentes e comparar os perfis de produção
          científica dos cinco programas.
        </P>

        {/* Tabela 02 — 17 ODS × 5 programas */}
        <Quadro
          titulo="Aderência direta aos 17 ODS — validação manual"
          nota="Frequência de dissertações (uma vez por ODS) e percentual sobre o total do PPG. A soma dos percentuais pode ultrapassar 100%."
        >
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="sticky left-0 z-10 bg-muted/40 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
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
                  <tr key={o.n} className={`border-b ${ri % 2 ? "bg-muted/20" : ""}`}>
                    <th className={`sticky left-0 z-10 px-4 py-2.5 text-left font-medium text-foreground ${ri % 2 ? "bg-[#f6f7f9] dark:bg-muted/20" : "bg-card"}`}>
                      <span className="inline-flex items-center gap-2">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded text-[10px] font-bold text-white" style={{ background: odsCor(o.n) }}>
                          {o.n}
                        </span>
                        <span className="hidden text-xs text-muted-foreground sm:inline">{odsNome(o.n)}</span>
                        <span className="text-xs sm:hidden">ODS {o.n}</span>
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
              {/* Total de incidências */}
              <tr className="bg-foreground text-background">
                <th className="sticky left-0 z-10 bg-foreground px-4 py-3 text-left text-xs font-extrabold uppercase">
                  Total de incidências
                </th>
                {INCIDENCIAS_PROGRAMA.map((t, i) => (
                  <td key={i} className="px-3 py-3 text-center tabular-nums font-bold">
                    {t.n} <span className="font-normal opacity-80">({pct2(t.pct)})</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Quadro>

        <P>
          Observa-se a predominância do ODS 4 no PPGED (98,86%) e no PPGSTEM (100%), refletindo a centralidade das
          temáticas educacionais. No PPGCTA, destaca-se o ODS 12 (34,29%), enquanto no PPGSCBIO predomina o ODS 15
          (52,94%). O PPGAS apresenta relações diretas com um conjunto mais amplo de ODS, especialmente o ODS 15
          (30,14%) e o ODS 12 (19,18%). Esses resultados demonstram a diversidade temática dos programas e suas
          diferentes conexões com as metas da Agenda 2030.
        </P>

        {/* Gráfico 2 — Direta × Indireta por programa */}
        <div className="mt-8">
          <PanoramaChart
            titulo="Aderência direta e indireta das dissertações aos ODS por PPG da Uergs"
            series={[{ label: "Direta", cor: C_DIRETA }, { label: "Indireta", cor: C_INDIRETA }]}
            grupos={gDirIndir}
            ticks={TICKS_100}
            altura={300}
            casasDecimais={1}
          />
        </div>

        <P>
          A comparação apresentada no gráfico acima evidencia que, embora todos os programas apresentem percentuais
          expressivos de aderência, existem diferenças entre as relações diretas e indiretas. O PPGED e o PPGSTEM
          alcançaram 100% de aderência direta, enquanto o PPGSCBIO (94,12%) e o PPGAS (90,41%) apresentaram os maiores
          percentuais de relações indiretas. Esses resultados indicam que, além das contribuições diretamente
          relacionadas aos ODS, as dissertações apresentam possibilidades adicionais de aplicação em diferentes
          dimensões do desenvolvimento sustentável.
        </P>

        {/* ═══════════ 3. DISTRIBUIÇÃO ENTRE OS 17 ODS ═══════════ */}
        <SecTitle>Distribuição das dissertações entre os 17 ODS</SecTitle>
        <P>
          O gráfico a seguir apresenta a distribuição percentual das dissertações com aderência direta a cada um dos 17
          ODS, considerando o conjunto dos cinco Programas de Pós-Graduação da Uergs.
        </P>

        {/* Gráfico 3 — 17 ODS institucional */}
        <div className="mt-8">
          <PanoramaChart
            titulo="Aderência direta das dissertações da Uergs aos 17 ODS"
            series={[{ label: "% das dissertações", cor: "#19486A" }]}
            grupos={gOds17}
            ticks={TICKS_60}
            altura={300}
            minWidth={760}
            legenda={false}
            casasDecimais={2}
          />
        </div>

        <P>
          O ODS 4 (Educação de Qualidade) apresentou a maior frequência de relações diretas, estando associado a 138
          dissertações (54,33% do total), seguido pelos ODS 15 (Vida Terrestre), com 31 trabalhos (12,20%), e 12
          (Consumo e Produção Responsáveis), com 26 (10,24%). Essa distribuição evidencia a expressiva presença de
          pesquisas relacionadas à educação, à conservação da biodiversidade e à sustentabilidade dos sistemas
          produtivos. Por outro lado, os ODS 1 (Erradicação da Pobreza) e 7 (Energia Limpa e Acessível) não
          apresentaram relações diretas identificadas na base analisada.
        </P>

        {/* ═══════════ 4. CINCO PS ═══════════ */}
        <SecTitle>Distribuição das dissertações segundo os 5 Ps da Sustentabilidade</SecTitle>
        <P>
          A tabela a seguir apresenta a distribuição das dissertações com aderência direta aos cinco eixos da Agenda
          2030: Pessoas, Planeta, Prosperidade, Paz e Parcerias, permitindo compreender como a produção científica da
          Uergs se relaciona com as principais dimensões do desenvolvimento sustentável.
        </P>

        {/* Tabela 03 — 5 Ps por programa */}
        <Quadro
          titulo="Aderência direta aos 5 Ps da Sustentabilidade | Uergs"
          nota="Base: validação manual. Cada dissertação é contada uma única vez por P. Percentuais não são mutuamente excludentes."
        >
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">Programa</th>
                <th className="px-3 py-3 text-center text-xs font-bold text-muted-foreground">Total</th>
                {CINCO_PS.map((p) => (
                  <th key={p.nome} className="px-3 py-3 text-center text-xs font-bold" style={{ color: p.cor }}>{p.nome}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROGRAMAS.map((p, ri) => {
                const r = CINCO_PS_PROGRAMA[p.sigla]!;
                const cols = [r.pessoas, r.planeta, r.prosperidade, r.paz, r.parcerias];
                return (
                  <tr key={p.slug} className={`border-b ${ri % 2 ? "bg-muted/20" : ""}`}>
                    <th className="px-4 py-2.5 text-left font-extrabold" style={{ color: p.cor }}>{p.sigla}</th>
                    <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{p.total}</td>
                    {cols.map(([n, pc], ci) => (
                      <td key={ci} className="px-3 py-2.5 text-center tabular-nums">
                        {n > 0 ? (
                          <span><span className="font-semibold text-foreground">{n}</span>{" "}<span className="text-xs text-muted-foreground">({pct1(pc)})</span></span>
                        ) : (
                          <span className="text-muted-foreground/40">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
              <tr className="bg-foreground text-background">
                <th className="px-4 py-3 text-left font-extrabold uppercase">Total Uergs</th>
                <td className="px-3 py-3 text-center tabular-nums font-bold">{CINCO_PS_TOTAL.total}</td>
                {[CINCO_PS_TOTAL.pessoas, CINCO_PS_TOTAL.planeta, CINCO_PS_TOTAL.prosperidade, CINCO_PS_TOTAL.paz, CINCO_PS_TOTAL.parcerias].map(([n, pc], i) => (
                  <td key={i} className="px-3 py-3 text-center tabular-nums font-bold">{n} <span className="font-normal opacity-80">({pct1(pc)})</span></td>
                ))}
              </tr>
            </tbody>
          </table>
          <p className="border-t px-4 py-2.5 text-xs text-muted-foreground">
            Grupos: Pessoas = ODS 1–5 | Planeta = ODS 6, 12–15 | Prosperidade = ODS 7–11 | Paz = ODS 16 | Parcerias = ODS 17.
          </p>
        </Quadro>

        {/* Cards 5 Ps institucionais */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CINCO_PS.map((p) => (
            <article key={p.nome} className="rounded-2xl border bg-card p-5 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ background: `${p.cor}1a` }}>
                <span className="text-lg font-extrabold" style={{ color: p.cor }}>{pct1(p.pct)}</span>
              </div>
              <p className="mt-3 font-bold text-foreground">{p.nome}</p>
              <p className="text-xs text-muted-foreground">{p.n} dissertações</p>
              <p className="mt-1 text-[11px] font-medium text-muted-foreground">{p.desc}</p>
            </article>
          ))}
        </div>

        <P>
          A dimensão Pessoas apresentou a maior representatividade, com 164 dissertações (64,6%), seguida por Planeta,
          com 71 (28,0%), e Prosperidade, com 36 (14,2%). As dimensões Paz (2,0%) e Parcerias (0,4%) apresentaram
          frequências menores. Esses resultados demonstram a predominância de pesquisas relacionadas às necessidades
          humanas, à educação, à saúde e à sustentabilidade ambiental, ao mesmo tempo em que evidenciam a menor
          presença de relações diretas com temas associados à governança, à justiça e às parcerias institucionais.
        </P>

        {/* Gráfico 4 — 5 Ps por programa */}
        <div className="mt-8">
          <PanoramaChart
            titulo="Distribuição percentual das dissertações dos Programas de Pós-Graduação da Uergs com aderência direta aos 5 Ps da Sustentabilidade"
            series={seriesPs}
            grupos={gPs}
            ticks={TICKS_100}
            altura={300}
            minWidth={620}
            casasDecimais={1}
          />
        </div>

        <P>
          No gráfico acima, a distribuição entre os programas evidencia perfis distintos de aderência. A dimensão
          Pessoas predomina no PPGED e no PPGSTEM, alcançando 100% das dissertações de ambos os programas. Já a dimensão
          Planeta apresenta maior representatividade no PPGAS (65,8%) e no PPGSCBIO (64,7%). O PPGCTA demonstra uma
          distribuição mais equilibrada, com 34,3% de aderência tanto à dimensão Pessoas quanto à dimensão Planeta.
          Esses resultados refletem as especificidades das áreas de conhecimento e sua contribuição potencial para
          diferentes dimensões da sustentabilidade.
        </P>

        {/* ═══════════ 5. COMPARAÇÃO SOFTWARE × MANUAL ═══════════ */}
        <SecTitle>Comparação entre o software ImpactoSociedade® e a validação manual</SecTitle>
        <P>
          A comparação entre o software ImpactoSociedade® e a validação qualitativa manual permite avaliar o grau de
          concordância entre as classificações produzidas pelas duas abordagens. Foram considerados indicadores de
          concordância simples, concordância positiva e o coeficiente Kappa de Cohen, possibilitando identificar tanto
          as coincidências quanto as divergências entre os métodos.
        </P>

        {/* Resumo institucional (3 cards) */}
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <StatConc titulo="Aderência direta" sub="concordância das classificações diretas" c={CONCORDANCIA.direta} />
          <StatConc titulo="Aderência indireta" sub="concordância das classificações indiretas" c={CONCORDANCIA.indireta} />
          <StatConc titulo="Classificação geral" sub="3 classes: ausente / direta / indireta" c={CONCORDANCIA.geral} />
        </div>

        {/* Tabela 4A — diretas */}
        <TabelaConc
          titulo="4A · Concordância das classificações diretas"
          linhas={CONC_DIRETA}
          total={CONC_DIRETA_TOTAL}
        />
        <P>
          Na tabela acima, a análise das relações diretas apresentou concordância simples de 91,52%, mas concordância
          positiva de apenas 5,67%, com coeficiente Kappa de 0,070. Essa diferença demonstra que a elevada concordância
          simples decorre principalmente das situações em que ambos os métodos não identificaram relações diretas,
          enquanto as associações efetivamente identificadas apresentaram baixa correspondência. O resultado evidencia
          diferenças importantes entre a classificação computacional e a interpretação qualitativa das dissertações.
        </P>

        {/* Tabela 4B — indiretas */}
        <TabelaConc
          titulo="4B · Concordância das classificações indiretas"
          linhas={CONC_INDIRETA}
          total={CONC_INDIRETA_TOTAL}
        />
        <P>
          Para as relações indiretas (tabela acima), a concordância simples foi de 85,46%, enquanto a concordância
          positiva atingiu 5,85%, com Kappa de 0,056. O software identificou um número expressivo de associações
          indiretas não confirmadas pela validação manual, demonstrando diferenças entre os critérios computacionais e
          a interpretação contextual das pesquisas. Esse resultado reforça a importância da avaliação qualitativa para
          examinar a pertinência das associações sugeridas automaticamente.
        </P>

        {/* Tabela 4C — geral */}
        <Quadro titulo="4C · Concordância geral — três classes: ausente / direta / indireta">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 text-left">PPG</th>
                <th className="px-3 py-3 text-center">Pares comparáveis</th>
                <th className="px-3 py-3 text-center">Mesma classificação</th>
                <th className="px-3 py-3 text-center">Concordância simples</th>
                <th className="px-3 py-3 text-center">Concordância positiva</th>
                <th className="px-3 py-3 text-center">Concordância esperada (Pe)</th>
                <th className="px-3 py-3 text-center">Kappa de Cohen</th>
                <th className="px-3 py-3 text-center">Divergências (n)</th>
              </tr>
            </thead>
            <tbody>
              {CONC_GERAL.map((r, ri) => (
                <tr key={r.ppg} className={`border-b ${ri % 2 ? "bg-muted/20" : ""}`}>
                  <th className="px-4 py-2.5 text-left font-extrabold text-foreground">{r.ppg}</th>
                  <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{num(r.pares)}</td>
                  <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{num(r.mesmaClasse)}</td>
                  <td className="px-3 py-2.5 text-center tabular-nums font-semibold text-foreground">{pct2(r.simples)}</td>
                  <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{pct2(r.positiva)}</td>
                  <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{pct2(r.esperada)}</td>
                  <td className="px-3 py-2.5 text-center tabular-nums font-semibold text-foreground">{r.kappa.toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</td>
                  <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{num(r.divergencias)}</td>
                </tr>
              ))}
              <tr className="bg-foreground text-background">
                <th className="px-4 py-3 text-left font-extrabold">{CONC_GERAL_TOTAL.ppg}</th>
                <td className="px-3 py-3 text-center tabular-nums font-bold">{num(CONC_GERAL_TOTAL.pares)}</td>
                <td className="px-3 py-3 text-center tabular-nums font-bold">{num(CONC_GERAL_TOTAL.mesmaClasse)}</td>
                <td className="px-3 py-3 text-center tabular-nums font-bold">{pct2(CONC_GERAL_TOTAL.simples)}</td>
                <td className="px-3 py-3 text-center tabular-nums font-bold">{pct2(CONC_GERAL_TOTAL.positiva)}</td>
                <td className="px-3 py-3 text-center tabular-nums font-bold">{pct2(CONC_GERAL_TOTAL.esperada)}</td>
                <td className="px-3 py-3 text-center tabular-nums font-bold">{CONC_GERAL_TOTAL.kappa.toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</td>
                <td className="px-3 py-3 text-center tabular-nums font-bold">{num(CONC_GERAL_TOTAL.divergencias)}</td>
              </tr>
            </tbody>
          </table>
        </Quadro>
        <P>
          Considerando conjuntamente as classificações direta, indireta e ausência de relação, a concordância geral
          (tabela acima) foi de 79,37%, enquanto a concordância positiva alcançou 6,41%, com Kappa de 0,125. Esses
          indicadores demonstram que, apesar da coincidência em parte expressiva das classificações, permanece uma baixa
          correspondência entre as relações positivas efetivamente identificadas pelos dois métodos, reforçando suas
          diferenças de interpretação.
        </P>

        {/* Gráfico 5 — Concordância positiva por programa */}
        <div className="mt-8">
          <PanoramaChart
            titulo="Concordância Positiva (software Impacto Sociedade × Validação Manual) por PPG da Uergs"
            series={[{ label: "Direta", cor: C_DIRETA }, { label: "Indireta", cor: C_INDIRETA }, { label: "Geral", cor: C_GERAL }]}
            grupos={gConc}
            ticks={TICKS_20}
            altura={300}
            minWidth={620}
            casasDecimais={2}
          />
        </div>

        <P>
          No gráfico acima, a concordância positiva apresentou valores relativamente baixos em todos os programas,
          evidenciando diferenças entre as classificações computacionais e a validação manual. O PPGSCBIO apresentou os
          maiores percentuais de concordância positiva nas relações diretas (17,65%) e na classificação geral (11,90%),
          enquanto o PPGAS apresentou a maior concordância nas relações indiretas (8,28%). De modo geral, os resultados
          demonstram a importância de complementar as análises automatizadas com procedimentos de validação qualitativa,
          especialmente quando se busca identificar relações fundamentadas entre a produção científica e as metas dos ODS.
        </P>

        {/* ═══════════ METODOLOGIA ═══════════ */}
        <Metodologia />

        {/* Explorar programas */}
        <div className="mt-16 rounded-2xl border bg-muted/30 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-foreground">Explore as dissertações por programa</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Acesse a lista completa de dissertações de cada Programa de Pós-Graduação, com título, autoria, orientação,
            resumo e link para o Repositório Institucional.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMAS.map((p) => (
              <Link
                key={p.slug}
                to="/dissertacoes/$programa"
                params={{ programa: p.slug }}
                className="group flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
                style={{ borderLeftWidth: 4, borderLeftColor: p.cor }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                  <img src={p.logo} alt={`Logo ${p.sigla}`} loading="lazy" className="h-full w-full object-contain p-1"
                    onError={(e) => { (e.currentTarget.style.display = "none"); }} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-extrabold" style={{ color: p.cor }}>{p.sigla}</span>
                  <span className="block text-[11px] text-muted-foreground">{p.total} dissertações · {p.tipo}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" style={{ color: p.cor }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

// ───────────────────────── componentes auxiliares ─────────────────────────
function SecTitle({ children }: { children: ReactNode }) {
  return <h2 className="mt-16 scroll-mt-20 text-2xl font-bold leading-snug text-foreground">{children}</h2>;
}
function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{children}</p>;
}

function IndicadorCard({ cor, icon, valor, texto }: { cor: string; icon: ReactNode; valor: string; texto: ReactNode }) {
  return (
    <article className="rounded-2xl border bg-card p-7 shadow-sm" style={{ borderLeftWidth: 4, borderLeftColor: cor }}>
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${cor}1a` }}>{icon}</span>
      <p className="mt-5 text-4xl font-extrabold text-foreground">{valor}</p>
      <p className="mt-1 text-sm text-muted-foreground">{texto}</p>
    </article>
  );
}

function Quadro({ titulo, nota, children }: { titulo: string; nota?: string; children: ReactNode }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="bg-[#19486A] px-4 py-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-white">{titulo}</h3>
        {nota && <p className="mt-0.5 text-xs text-white/70">{nota}</p>}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

function TabelaConc({ titulo, linhas, total }: { titulo: string; linhas: LinhaConcDir[]; total: LinhaConcDir }) {
  const pct2l = (v: number) => `${(v * 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
  const k = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  return (
    <Quadro titulo={titulo}>
      <table className="w-full min-w-[860px] border-collapse text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3 text-left">PPG</th>
            <th className="px-3 py-3 text-center">Positivas em ambos</th>
            <th className="px-3 py-3 text-center">Somente software</th>
            <th className="px-3 py-3 text-center">Somente manual</th>
            <th className="px-3 py-3 text-center">União positiva</th>
            <th className="px-3 py-3 text-center">Concordância simples</th>
            <th className="px-3 py-3 text-center">Concordância positiva</th>
            <th className="px-3 py-3 text-center">Kappa de Cohen</th>
            <th className="px-3 py-3 text-center">Taxa manual</th>
            <th className="px-3 py-3 text-center">Taxa software</th>
            <th className="px-3 py-3 text-center">Pares comparáveis</th>
          </tr>
        </thead>
        <tbody>
          {linhas.map((r, ri) => (
            <tr key={r.ppg} className={`border-b ${ri % 2 ? "bg-muted/20" : ""}`}>
              <th className="px-4 py-2.5 text-left font-extrabold text-foreground">{r.ppg}</th>
              <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{r.posAmbos}</td>
              <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{r.soSoftware}</td>
              <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{r.soManual}</td>
              <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{r.uniaoPositiva}</td>
              <td className="px-3 py-2.5 text-center tabular-nums font-semibold text-foreground">{pct2l(r.simples)}</td>
              <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{pct2l(r.positiva)}</td>
              <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{k(r.kappa)}</td>
              <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{pct2l(r.taxaManual)}</td>
              <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{pct2l(r.taxaSoftware)}</td>
              <td className="px-3 py-2.5 text-center tabular-nums text-foreground">{num(r.pares)}</td>
            </tr>
          ))}
          <tr className="bg-foreground text-background">
            <th className="px-4 py-3 text-left font-extrabold">{total.ppg}</th>
            <td className="px-3 py-3 text-center tabular-nums font-bold">{total.posAmbos}</td>
            <td className="px-3 py-3 text-center tabular-nums font-bold">{total.soSoftware}</td>
            <td className="px-3 py-3 text-center tabular-nums font-bold">{total.soManual}</td>
            <td className="px-3 py-3 text-center tabular-nums font-bold">{total.uniaoPositiva}</td>
            <td className="px-3 py-3 text-center tabular-nums font-bold">{pct2l(total.simples)}</td>
            <td className="px-3 py-3 text-center tabular-nums font-bold">{pct2l(total.positiva)}</td>
            <td className="px-3 py-3 text-center tabular-nums font-bold">{k(total.kappa)}</td>
            <td className="px-3 py-3 text-center tabular-nums font-bold">{pct2l(total.taxaManual)}</td>
            <td className="px-3 py-3 text-center tabular-nums font-bold">{pct2l(total.taxaSoftware)}</td>
            <td className="px-3 py-3 text-center tabular-nums font-bold">{num(total.pares)}</td>
          </tr>
        </tbody>
      </table>
    </Quadro>
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

// Fórmula em forma de fração: rótulo = (numerador / denominador) × 100
function Formula({ rotulo, num: numer, den, mult = "× 100", kappa = false }: { rotulo: string; num: string; den: string; mult?: string; kappa?: boolean }) {
  return (
    <div className="my-4 flex flex-wrap items-center gap-3 rounded-xl border bg-muted/30 px-5 py-4 text-sm">
      <span className="font-semibold text-foreground">{rotulo}</span>
      <span className="text-muted-foreground">=</span>
      <span className="inline-flex flex-col items-center text-center leading-tight text-foreground">
        <span className="px-2 pb-1">{numer}</span>
        <span className="w-full border-t border-foreground/60" />
        <span className="px-2 pt-1">{den}</span>
      </span>
      {!kappa && <span className="text-muted-foreground">{mult}</span>}
    </div>
  );
}

function Metodologia() {
  return (
    <section className="mt-16">
      <h2 className="scroll-mt-20 border-b pb-4 text-3xl font-bold tracking-tight text-foreground">Metodologia</h2>
      <p className="mt-6 max-w-3xl font-semibold text-foreground">
        Metodologia de análise da aderência das dissertações da Uergs aos ODS
      </p>

      <div className="mt-4 max-w-3xl space-y-4 leading-relaxed text-muted-foreground">
        <p>
          Para o mapeamento da aderência das dissertações aos Objetivos de Desenvolvimento Sustentável (ODS), foi
          adotada uma abordagem metodológica quali-quantitativa, estruturada em duas etapas complementares: (i) análise
          computacional, por meio do software Impacto Sociedade; e (ii) validação qualitativa manual, com apoio de
          ferramentas de inteligência artificial (IA).
        </p>
        <p>
          A base analisada compreende 254 dissertações, distribuídas entre cinco Programas de Pós-Graduação (PPGs) da
          Uergs: PPGAS, PPGED, PPGCTA, PPGCSBIO e PPGSTEM. A unidade de análise corresponde a cada dissertação
          individualmente considerada. Para isso, foram organizadas informações bibliográficas, títulos, resumos e
          palavras-chave.
        </p>
      </div>

      {/* 1 */}
      <MetTitle>1 Primeira etapa: Análise computacional pelo software ImpactoSociedade®</MetTitle>
      <MetBody>
        <p>
          A primeira etapa consistiu na utilização do sistema ImpactoSociedade®, ferramenta computacional destinada à
          identificação de relações entre produções acadêmicas e os Objetivos de Desenvolvimento Sustentável.
        </p>
        <p>
          Conforme a metodologia apresentada por Gomes Junior et al. (2023), utilizada como referência neste
          levantamento, o sistema emprega um algoritmo computacional que atribui valores numéricos de associação entre
          os textos analisados e os ODS.
        </p>
        <p>
          Os resultados são apresentados em uma escala decimal de 0 a 1, na qual os valores expressam o grau de
          associação identificado pelo processamento computacional. Para a classificação dos resultados, foram
          considerados os seguintes critérios:
        </p>
      </MetBody>
      <div className="mt-4 max-w-md overflow-hidden rounded-xl border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-muted/50 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-2.5 text-left">Valor atribuído</th>
              <th className="px-4 py-2.5 text-left">Classificação</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t"><td className="px-4 py-2.5 tabular-nums text-foreground">x = 1</td><td className="px-4 py-2.5 text-foreground">Aderência direta</td></tr>
            <tr className="border-t bg-muted/20"><td className="px-4 py-2.5 tabular-nums text-foreground">0 &lt; x &lt; 1</td><td className="px-4 py-2.5 text-foreground">Aderência indireta</td></tr>
            <tr className="border-t"><td className="px-4 py-2.5 tabular-nums text-foreground">x = 0</td><td className="px-4 py-2.5 text-foreground">Relação não identificada</td></tr>
          </tbody>
        </table>
      </div>
      <MetBody>
        <p>
          A classificação direta representa a associação máxima segundo a escala adotada. Os valores intermediários
          indicam relações classificadas como indiretas, enquanto o valor zero representa ausência de associação
          identificada pelo software.
        </p>
        <p>
          É importante destacar que esses valores expressam associação computacional, não constituindo medidas de
          impacto social, ambiental ou econômico efetivamente produzido pelas pesquisas.
        </p>
        <p>
          Após o processamento, os resultados foram organizados em planilhas individuais para cada PPG, preservando os
          ODS identificados e suas respectivas pontuações. Esses dados foram mantidos integralmente para possibilitar
          análises posteriores de comparação com a validação qualitativa manual.
        </p>
      </MetBody>

      {/* 2 */}
      <MetTitle>2 Segunda etapa: Validação qualitativa manual da aderência aos ODS</MetTitle>
      <MetBody>
        <p>
          A segunda etapa consistiu na realização de uma análise qualitativa individualizada das dissertações,
          fundamentada nos 17 ODS oficiais e em suas 169 metas, conforme estabelecido pela Agenda 2030 (ONU, 2015).
        </p>
        <p>
          Diferentemente da análise computacional, essa avaliação não utilizou os valores numéricos do Impacto Sociedade
          para determinar a aderência. As classificações foram estabelecidas com base na interpretação científica do
          conteúdo das dissertações e na correspondência entre suas contribuições e as metas específicas dos ODS.
        </p>
        <p>Foram examinados, conforme a disponibilidade documental, os seguintes elementos:</p>
      </MetBody>
      <MetList itens={[
        "Título e resumo da dissertação;",
        "Problema de pesquisa e objetivos;",
        "Metodologia e procedimentos empregados;",
        "Resultados e principais conclusões;",
        "Possíveis aplicações científicas, tecnológicas, ambientais, econômicas e sociais;",
        "Correspondência entre os resultados da pesquisa e as metas oficiais da Agenda 2030.",
      ]} />
      <MetBody>
        <p>
          Quando necessário e disponível, o texto integral das dissertações foi consultado no Repositório Institucional
          da Uergs, permitindo aprofundar a interpretação dos resultados e verificar informações não suficientemente
          detalhadas nos resumos. Para os trabalhos com acesso restrito ou indisponíveis no repositório, a avaliação foi
          limitada às informações documentais acessíveis, sem presumir resultados ou contribuições não demonstradas.
        </p>
      </MetBody>

      {/* 3 */}
      <MetTitle>3 Critérios de classificação</MetTitle>
      <MetBody><p>A validação manual considerou três categorias de aderência.</p></MetBody>
      <MetSub>a) Aderência direta</MetSub>
      <MetBody>
        <p>
          Foi atribuída quando se identificou relação clara e fundamentada entre o objeto central, os objetivos, a
          metodologia, os resultados ou as aplicações principais da dissertação e uma ou mais metas específicas dos ODS.
          Nessa categoria, a contribuição relacionada à meta constitui parte substantiva do trabalho investigado.
        </p>
      </MetBody>
      <MetSub>b) Aderência indireta</MetSub>
      <MetBody>
        <p>
          Foi atribuída quando a dissertação apresentou contribuições secundárias, complementares ou potenciais para
          determinada meta dos ODS, desde que sustentadas pelos objetivos, procedimentos ou resultados da pesquisa. Essa
          classificação contempla estudos cujos conhecimentos podem subsidiar, futuramente, o desenvolvimento de
          tecnologias, políticas públicas, estratégias de prevenção, práticas sustentáveis ou outras aplicações
          relacionadas à Agenda 2030, mesmo quando tais aplicações não constituem o objetivo principal da investigação.
        </p>
        <p>
          A identificação de uma relação indireta exige fundamentação científica. A simples proximidade entre a temática
          da dissertação e um ODS não foi considerada evidência suficiente.
        </p>
      </MetBody>
      <MetSub>c) Sem relação identificada</MetSub>
      <MetBody>
        <p>
          Foi utilizada quando não foram encontradas evidências suficientes para estabelecer uma associação direta ou
          indireta entre a dissertação e as metas analisadas. Essa classificação representa ausência de aderência
          identificada segundo os critérios metodológicos utilizados, não significando necessariamente ausência de
          relevância científica ou social da pesquisa.
        </p>
      </MetBody>

      {/* 4 */}
      <MetTitle>4 Identificação das metas específicas</MetTitle>
      <MetBody>
        <p>
          As classificações foram estabelecidas preferencialmente no nível das metas, e não apenas dos títulos gerais
          dos ODS. Dessa forma, cada associação deveria apresentar a identificação do objetivo e da meta correspondente,
          acompanhada de uma justificativa fundamentada no conteúdo da dissertação.
        </p>
        <p>
          Uma mesma dissertação pôde apresentar relações com diferentes ODS, inclusive com classificações diretas para
          determinados objetivos e indiretas para outros. Foram diferenciados os resultados efetivamente demonstrados
          daqueles que indicavam apenas possibilidades de aplicação futura, evitando equiparar potencial científico ou
          tecnológico a impactos concretamente comprovados.
        </p>
        <p>
          Para assegurar a consistência das análises, os casos inicialmente classificados como sem relação foram
          submetidos a reavaliações complementares, com aprofundamento da leitura dos trabalhos e reconsideração de
          possíveis associações indiretas.
        </p>
      </MetBody>

      {/* 5 */}
      <MetTitle>5 Utilização da inteligência artificial como ferramenta de apoio</MetTitle>
      <MetBody>
        <p>
          Ferramentas de inteligência artificial generativa, incluindo o ChatGPT (OpenAI), foram utilizadas como
          instrumentos de apoio à análise qualitativa das dissertações. Seu emprego envolveu atividades de organização e
          interpretação das informações textuais, identificação preliminar de possíveis correspondências com os ODS,
          localização de metas potencialmente relacionadas e elaboração de justificativas para as associações propostas.
        </p>
        <p>
          A IA também auxiliou na revisão de classificações inicialmente consideradas insuficientes, especialmente na
          identificação de possíveis contribuições indiretas não evidenciadas na primeira avaliação.
        </p>
        <p>
          Entretanto, as sugestões produzidas pela inteligência artificial não foram consideradas classificações
          definitivas ou evidências científicas por si só. As associações propostas foram submetidas à apreciação
          crítica, considerando sua coerência com os objetivos, os resultados das dissertações e o conteúdo das metas
          oficiais.
        </p>
        <p>
          Assim, a inteligência artificial desempenhou uma função de apoio analítico e documental, enquanto a validação
          qualitativa constituiu a referência interpretativa para a consolidação dos resultados institucionais. Esse
          procedimento buscou combinar a capacidade de processamento e organização textual das ferramentas digitais com
          a interpretação contextual e o julgamento científico necessários à classificação das pesquisas.
        </p>
      </MetBody>

      {/* 6 */}
      <MetTitle>6 Sistematização e tratamento quantitativo dos dados</MetTitle>
      <MetBody>
        <p>
          Após as análises, os resultados foram organizados em planilhas eletrônicas individuais para cada PPG, contendo
          os dados bibliográficos, os resultados computacionais e a validação manual. Posteriormente, foi elaborada uma
          planilha consolidada, denominada “Panorama Geral”, destinada à produção de indicadores quantitativos e à
          comparação dos resultados entre os programas.
        </p>
        <p>
          Para as análises institucionais, foram considerados exclusivamente os 17 ODS oficiais da ONU. Eventuais
          classificações referentes a objetivos adicionais foram preservadas nos registros de origem, mas não integraram
          os cálculos do panorama dos 17 ODS.
        </p>
      </MetBody>
      <MetSub>6.1 Percentual de dissertações com aderência direta e indireta</MetSub>
      <MetBody>
        <p>
          Para cada PPG, foi calculado o percentual de dissertações com pelo menos uma relação direta, utilizando a
          seguinte expressão:
        </p>
      </MetBody>
      <Formula rotulo="Aderência direta (%)" num="Nº de dissertações com pelo menos uma relação direta" den="Nº total de dissertações do PPG" />
      <MetBody><p>O mesmo procedimento foi aplicado às relações às aderências indiretas:</p></MetBody>
      <Formula rotulo="Aderência indireta (%)" num="Nº de dissertações com pelo menos uma relação indireta" den="Nº total de dissertações do PPG" />
      <MetBody><p>Observações:</p></MetBody>
      <MetList itens={[
        "O percentual de dissertações sem relação identificada foi calculado considerando os trabalhos que não apresentaram nenhuma associação direta ou indireta com os 17 ODS;",
        "Uma dissertação pôde integrar simultaneamente as categorias direta e indireta. Por esse motivo, os percentuais dessas categorias não são mutuamente excludentes e sua soma pode ultrapassar 100%;",
        "Nos resultados consolidados, o denominador corresponde ao número total de dissertações analisadas nos cinco PPGs.",
      ]} />
      <MetSub>6.2 Frequência de aderência direta a cada ODS</MetSub>
      <MetBody>
        <p>
          Para identificar os ODS com maior representatividade, foi calculada a frequência de dissertações com relações
          diretas para cada um dos 17 ODS. O percentual foi obtido pela expressão:
        </p>
      </MetBody>
      <Formula rotulo="Aderência direta ao ODS (%)" num="Nº de dissertações diretamente relacionadas ao ODS" den="Nº total de dissertações analisadas" />
      <MetBody>
        <p>
          Na análise individual por PPG, foi utilizado o total de dissertações do respectivo programa. Para o panorama
          institucional, utilizou-se o total de 254 dissertações. Cada dissertação foi contabilizada uma única vez para
          determinado ODS, ainda que apresentasse relação com mais de uma meta desse mesmo objetivo.
        </p>
        <p>
          Entretanto, quando uma dissertação apresentou aderência direta a diferentes ODS, cada associação foi
          contabilizada individualmente. Consequentemente, a soma das frequências ou dos percentuais dos 17 ODS pode
          ultrapassar o total de dissertações ou 100%, respectivamente.
        </p>
      </MetBody>
      <MetSub>6.3 Comparação entre os PPGs</MetSub>
      <MetBody>
        <p>
          As frequências absolutas e relativas foram organizadas em matrizes comparativas, relacionando os cinco PPGs
          aos 17 ODS. Esses resultados subsidiaram a elaboração de tabelas e gráficos destinados à identificação dos
          objetivos mais recorrentes, das diferenças entre os perfis de aderência dos programas e das contribuições
          predominantes no conjunto da produção científica analisada.
        </p>
      </MetBody>

      {/* 7 */}
      <MetTitle>7 Análise de concordância entre o Impacto Sociedade e a validação manual</MetTitle>
      <MetBody>
        <p>
          Com a finalidade de verificar a correspondência entre a classificação computacional e a validação qualitativa,
          foi realizada uma análise de concordância entre os resultados produzidos pelas duas abordagens. A unidade de
          comparação correspondeu à combinação dissertação × ODS, de modo que cada dissertação apresentou 17
          possibilidades de classificação, uma para cada objetivo oficial. Considerando as 254 dissertações, foram
          obtidas:
        </p>
        <p className="font-semibold text-foreground">254 dissertações × 17 ODS = 4.318 pares de comparação.</p>
        <p>Para essa análise, as classificações dos dois métodos foram padronizadas em três categorias:</p>
      </MetBody>
      <MetList itens={[
        "0 — Relação não identificada.",
        "1 — Aderência direta.",
        "2 — Aderência indireta.",
      ]} />
      <MetBody>
        <p>
          Classificações ausentes ou registros incompletos não foram automaticamente interpretados como ausência de
          aderência. Apenas os pares com informações comparáveis nos dois métodos integraram os respectivos cálculos.
        </p>
      </MetBody>
      <MetSub>7.1 Concordância simples</MetSub>
      <MetBody>
        <p>
          A concordância simples corresponde à proporção de classificações coincidentes entre os métodos. Para as
          relações diretas ou indiretas, consideradas separadamente, foi utilizada a expressão:
        </p>
      </MetBody>
      <Formula rotulo="Concordância simples (%)" num="Associações positivas identificadas por ambos + Associações negativas identificadas por ambos" den="Total de pares comparáveis" />
      <MetBody>
        <p>
          Esse indicador contempla tanto a identificação simultânea de uma associação quanto a ausência simultânea de
          associação.
        </p>
      </MetBody>
      <MetSub>7.2 Concordância positiva</MetSub>
      <MetBody>
        <p>
          Considerando que grande parte das combinações dissertação–ODS pode não apresentar aderência, foi calculada
          também a concordância positiva, baseada na proporção de associações identificadas simultaneamente pelos dois
          métodos em relação àquelas identificadas por pelo menos um deles. Essa abordagem permite avaliar
          especificamente as associações positivas, evitando que a elevada frequência de classificações negativas
          produza uma impressão artificial de concordância. Adicionalmente, distribuições desequilibradas entre
          categorias podem influenciar a interpretação de medidas de concordância corrigidas pelo acaso, como o
          coeficiente Kappa (Feinstein; Cicchetti, 1990). A expressão utilizada foi:
        </p>
      </MetBody>
      <Formula rotulo="Concordância positiva (%)" num="Associações positivas coincidentes" den="Associações positivas em ambos + Somente software + Somente validação manual" />
      <MetBody>
        <p>
          Esse cálculo corresponde ao índice de similaridade proposto por Jaccard (1901), aplicado às classificações
          positivas de cada categoria. Sua utilização permite avaliar a correspondência entre as associações
          efetivamente identificadas, sem que a elevada quantidade de classificações negativas produza uma impressão
          artificial de concordância.
        </p>
      </MetBody>
      <MetSub>7.3 Concordância geral entre as três categorias</MetSub>
      <MetBody>
        <p>
          Também foi calculada a concordância geral, considerando conjuntamente as três classificações: ausência de
          relação, aderência direta e aderência indireta.
        </p>
      </MetBody>
      <Formula rotulo="Concordância geral simples (%)" num="Nº de pares com classificação idêntica nos dois métodos" den="Nº total de pares comparáveis" />
      <MetBody>
        <p>
          A concordância geral positiva considerou apenas as coincidências das classes direta e indireta, divididas pelo
          número de pares em que pelo menos um dos métodos identificou uma associação positiva. Dessa forma, uma
          classificação direta atribuída pelo software e uma classificação indireta atribuída pela validação manual para
          o mesmo ODS foram consideradas divergentes na análise geral de três classes.
        </p>
      </MetBody>
      <MetSub>7.4 Coeficiente Kappa de Cohen</MetSub>
      <MetBody>
        <p>
          Como medida estatística complementar, foi utilizado o coeficiente Kappa de Cohen (κ), que permite avaliar a
          concordância entre dois métodos de classificação categórica, considerando a concordância observada em relação
          àquela esperada ao acaso (Cohen, 1960; McHugh, 2012). Diferentemente da concordância percentual simples, esse
          coeficiente incorpora as frequências marginais das categorias analisadas, proporcionando uma medida ajustada
          de concordância. O coeficiente foi calculado pela expressão:
        </p>
      </MetBody>
      <Formula rotulo="κ" num="P₀ − Pe" den="1 − Pe" kappa />
      <MetBody>
        <p>Em que:</p>
        <p>P₀ corresponde à proporção de concordância observada.</p>
        <p>Pe corresponde à concordância esperada ao acaso, calculada a partir das proporções marginais das categorias atribuídas pelos dois métodos.</p>
        <p>
          O coeficiente Kappa foi calculado para as classificações diretas e indiretas, separadamente, e para a
          classificação geral em três categorias. Na análise institucional, os resultados foram calculados a partir da
          consolidação dos pares de comparação dos cinco PPGs, e não por meio da média aritmética simples dos
          percentuais individuais dos programas. Considerou-se, ainda, que a distribuição desigual das categorias,
          especialmente diante da possível predominância de classificações sem relação identificada, pode influenciar os
          valores do coeficiente Kappa, mesmo em situações de elevada concordância observada (Feinstein; Cicchetti,
          1990). Dessa forma, a interpretação conjunta da concordância simples, da concordância positiva e do
          coeficiente Kappa permite uma avaliação mais abrangente e consistente das similaridades e divergências entre
          os métodos, considerando as particularidades da distribuição dos dados analisados (McHugh, 2012).
        </p>
      </MetBody>

      {/* 8 */}
      <MetTitle>8 Rastreabilidade, atualização, reprodutibilidade e considerações finais</MetTitle>
      <MetBody>
        <p>
          Para assegurar a rastreabilidade dos resultados, as planilhas foram estruturadas de maneira a preservar
          separadamente as informações bibliográficas, as classificações produzidas pelo software Impacto Sociedade e
          aquelas estabelecidas pela validação qualitativa manual.
        </p>
        <p>
          A planilha consolidada utiliza fórmulas vinculadas às abas individuais, permitindo recalcular os indicadores
          quando os registros de origem forem atualizados, dentro dos limites estruturais previstos no arquivo. Os
          procedimentos quantitativos seguem os princípios de identificação única das dissertações, diferenciação entre
          aderência direta e indireta, contagem individualizada por ODS e utilização de denominadores explícitos.
        </p>
        <p>
          A disponibilização das classificações por dissertação, acompanhadas dos ODS, das metas correspondentes e das
          informações bibliográficas, permite verificar as associações utilizadas na construção dos indicadores e
          reproduzir as frequências e percentuais apresentados.
        </p>
        <p>
          A reprodução integral da etapa computacional depende, adicionalmente, da utilização dos mesmos dados de
          entrada, da versão e das configurações do software Impacto Sociedade. A reprodução da etapa qualitativa requer
          acesso aos documentos analisados, aos critérios de classificação e aos registros das justificativas adotadas.
        </p>
        <p>
          Os indicadores apresentados expressam a aderência temática, científica e potencial das dissertações aos ODS,
          não devendo ser interpretados como comprovação de impacto efetivo das pesquisas sobre os indicadores oficiais
          de desenvolvimento sustentável.
        </p>
      </MetBody>

      {/* Referências */}
      <MetTitle>Referências</MetTitle>
      <ul className="mt-4 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
        <li>COHEN, J. A coefficient of agreement for nominal scales. <em>Educational and Psychological Measurement</em>, v. 20, n. 1, p. 37–46, 1960. DOI: <Ref href="https://doi.org/10.1177/001316446002000104" /></li>
        <li>FEINSTEIN, A. R.; CICCHETTI, D. V. High agreement but low kappa: I. The problems of two paradoxes. <em>Journal of Clinical Epidemiology</em>, v. 43, n. 6, p. 543–549, 1990. DOI: <Ref href="https://doi.org/10.1016/0895-4356(90)90158-L" /></li>
        <li>GOMES JUNIOR, J. C.; CORBARI, S. D.; KNIESS, C. T. et al. Proposed mapping and evaluation model of sustainable development goals in graduate programs in environmental sciences in Brazil. <em>International Journal of Sustainability in Higher Education</em>, v. 24, n. 7, p. 1452–1473, 2023. DOI: <Ref href="https://doi.org/10.1108/IJSHE-07-2022-0230" /></li>
        <li>IMPACTOSOCIEDADE. ImpactoSociedade: plataforma de análise de aderência aos Objetivos de Desenvolvimento Sustentável. Disponível em: <Ref href="https://impactosociedade.com.br/" />. Acesso em: 22 out. 2026.</li>
        <li>JACCARD, P. Étude comparative de la distribution florale dans une portion des Alpes et des Jura. <em>Bulletin de la Société Vaudoise des Sciences Naturelles</em>, v. 37, p. 547–579, 1901. DOI: <Ref href="https://doi.org/10.5169/seals-266450" /></li>
        <li>MCHUGH, M. L. Interrater reliability: the kappa statistic. <em>Biochemia Medica</em>, v. 22, n. 3, p. 276–282, 2012. DOI: <Ref href="https://doi.org/10.11613/BM.2012.031" /></li>
        <li>OPENAI. ChatGPT. Disponível em: <Ref href="https://chatgpt.com/" />. Acesso em: 22 out. 2026.</li>
        <li>ORGANIZAÇÃO DAS NAÇÕES UNIDAS (ONU). <em>Transformando nosso mundo: a Agenda 2030 para o Desenvolvimento Sustentável.</em> Nova York: ONU, 2015. Disponível em: <Ref href="https://sdgs.un.org/2030agenda" />. Acesso em: 22 out. 2026.</li>
      </ul>
    </section>
  );
}

function MetTitle({ children }: { children: ReactNode }) {
  return <h3 className="mt-10 text-xl font-bold text-foreground">{children}</h3>;
}
function MetSub({ children }: { children: ReactNode }) {
  return <h4 className="mt-6 text-base font-semibold text-foreground">{children}</h4>;
}
function MetBody({ children }: { children: ReactNode }) {
  return <div className="mt-3 max-w-3xl space-y-3 leading-relaxed text-muted-foreground">{children}</div>;
}
function MetList({ itens }: { itens: string[] }) {
  return (
    <ul className="mt-3 max-w-3xl space-y-2">
      {itens.map((t, i) => (
        <li key={i} className="flex gap-2.5 leading-relaxed text-muted-foreground">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
function Ref({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="break-all text-primary hover:underline">
      {href}
    </a>
  );
}
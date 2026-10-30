import { useState } from "react";

/**
 * Gráfico de barras interativo do Panorama Geral.
 * Reproduz os gráficos do documento base (mesmos dados) de forma dinâmica:
 * ao passar o mouse (ou tocar) em uma barra, exibe a porcentagem — como no Excel.
 *
 * Sem bibliotecas externas: HTML/CSS puro, seguro para SSR.
 */

export type Serie = { label: string; cor: string };
export type Grupo = {
  label: string;        // rótulo no eixo X (ex.: "PPGAS", "ODS 4")
  valores: number[];    // alinhados a `series` (0–1)
  cores?: string[];     // opcional: cor por barra (sobrescreve a cor da série)
};

type Props = {
  series: Serie[];
  grupos: Grupo[];
  titulo: string;
  ticks: number[];          // marcas do eixo Y (0–1), ex.: [0,0.2,...,1]
  altura?: number;          // altura da área de plotagem (px)
  legenda?: boolean;
  minWidth?: number;        // largura mínima (gráficos largos rolam na horizontal)
  casasDecimais?: number;   // no tooltip/rótulo
};

const fmtPct = (v: number, casas: number) =>
  `${(v * 100).toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  })}%`;

export default function PanoramaChart({
  series,
  grupos,
  titulo,
  ticks,
  altura = 300,
  legenda = true,
  minWidth = 0,
  casasDecimais = 1,
}: Props) {
  const [hover, setHover] = useState<{ g: number; s: number } | null>(null);
  const yMax = ticks[ticks.length - 1] ?? 1;
  const totalBarras = grupos.length * series.length;
  const mostrarRotulos = totalBarras <= 20; // poucas barras → rótulo fixo em cima

  return (
    <figure className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7">
      <figcaption className="mb-5 text-center text-sm font-bold text-foreground sm:text-base">
        {titulo}
      </figcaption>

      <div className="overflow-x-auto pb-1">
        <div style={{ minWidth: minWidth || undefined }}>
          {/* Área do gráfico: eixo Y + barras */}
          <div className="flex" style={{ height: altura }}>
            {/* Eixo Y (rótulos) */}
            <div className="relative w-10 shrink-0 sm:w-12" aria-hidden>
              {ticks.map((t) => (
                <span
                  key={t}
                  className="absolute right-1 -translate-y-1/2 text-[10px] tabular-nums text-muted-foreground sm:text-xs"
                  style={{ bottom: `${(t / yMax) * 100}%` }}
                >
                  {fmtPct(t, 0)}
                </span>
              ))}
            </div>

            {/* Plotagem */}
            <div className="relative flex-1">
              {/* Linhas de grade */}
              {ticks.map((t) => (
                <span
                  key={t}
                  className="absolute left-0 right-0 border-t border-border/60"
                  style={{ bottom: `${(t / yMax) * 100}%` }}
                  aria-hidden
                />
              ))}

              {/* Grupos de barras */}
              <div className="absolute inset-0 flex items-end justify-around gap-1">
                {grupos.map((grupo, gi) => (
                  <div key={gi} className="flex h-full flex-1 items-end justify-center gap-[3px] px-0.5">
                    {series.map((serie, si) => {
                      const v = grupo.valores[si] ?? 0;
                      const cor = grupo.cores?.[si] ?? serie.cor;
                      const ativo = hover?.g === gi && hover?.s === si;
                      const h = Math.max(0, Math.min(v / yMax, 1)) * 100;
                      return (
                        <div
                          key={si}
                          className="flex h-full max-w-[46px] flex-1 cursor-default items-end"
                          onMouseEnter={() => setHover({ g: gi, s: si })}
                          onMouseLeave={() => setHover(null)}
                          onTouchStart={() => setHover({ g: gi, s: si })}
                        >
                          {/* Barra (tooltip e rótulo ancorados no topo dela) */}
                          <div
                            className="relative w-full rounded-t-[3px] transition-all duration-150"
                            style={{
                              height: `${h}%`,
                              minHeight: v > 0 ? 3 : 0,
                              background: cor,
                              opacity: ativo ? 1 : hover ? 0.55 : 0.92,
                            }}
                          >
                            {/* Tooltip */}
                            {ativo && (
                              <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1.5 text-center text-[11px] font-semibold text-background shadow-lg">
                                <span className="block opacity-80">
                                  {grupo.label}
                                  {series.length > 1 ? ` · ${serie.label}` : ""}
                                </span>
                                <span className="block text-sm">{fmtPct(v, casasDecimais)}</span>
                                <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                              </div>
                            )}

                            {/* Rótulo fixo (poucas barras) */}
                            {mostrarRotulos && v > 0 && !ativo && (
                              <span className="pointer-events-none absolute bottom-full left-1/2 mb-0.5 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold tabular-nums text-muted-foreground sm:text-[10px]">
                                {fmtPct(v, v < 0.1 ? 1 : 0)}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rótulos do eixo X */}
          <div className="mt-2 flex pl-10 sm:pl-12">
            <div className="flex flex-1 justify-around gap-1">
              {grupos.map((grupo, gi) => (
                <span
                  key={gi}
                  className="flex-1 px-0.5 text-center text-[10px] font-medium leading-tight text-muted-foreground sm:text-xs"
                >
                  {grupo.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legenda */}
      {legenda && series.length > 1 && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {series.map((s) => (
            <span key={s.label} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: s.cor }} />
              {s.label}
            </span>
          ))}
        </div>
      )}
    </figure>
  );
}
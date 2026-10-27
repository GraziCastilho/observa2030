import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, LayoutGrid } from "lucide-react";
import { LOGO_OBSERVA } from "./RodaODS";

const LINKS = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/ods", label: "ODS" },
  { to: "/publicacoes", label: "Publicações" },
  { to: "/eventos", label: "Eventos" },
  { to: "/equipe", label: "Equipe" },
  { to: "/parcerias", label: "Parcerias" },
] as const;

// Submenu de "Dissertações da Uergs" (entra depois do item ODS).
// Programas usam a rota dinâmica /dissertacoes/$programa via params.
const PROGRAMAS_MENU = [
  { slug: "ppged", label: "PPGED", cor: "#C5192D" },
  { slug: "ppgas", label: "PPGAS", cor: "#4C9F38" },
  { slug: "ppgcta", label: "PPGCTA", cor: "#FD6925" },
  { slug: "ppgcsbio", label: "PPGCSBIO", cor: "#0A97D9" },
  { slug: "ppgstem", label: "PPGSTEM", cor: "#8B5CF6" },
] as const;

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);       // dropdown desktop
  const [mobDiss, setMobDiss] = useState(false);  // grupo mobile

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={LOGO_OBSERVA} alt="Observa 2030" className="h-11 w-11 object-contain" />
          <span className="text-sm font-bold leading-tight text-foreground">
                        Observa 2030
            <span className="block text-xs font-normal text-muted-foreground">Observatório Gaúcho da Agenda 2030</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.to} className="contents">
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "bg-muted text-primary" }}
                className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
              >
                {l.label}
              </Link>

              {/* Dropdown "Dissertações da Uergs" logo após ODS */}
              {l.to === "/ods" && (
                <div
                  className="relative"
                  onMouseEnter={() => setDrop(true)}
                  onMouseLeave={() => setDrop(false)}
                >
                  <Link
                    to="/dissertacoes"
                    activeProps={{ className: "bg-muted text-primary" }}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
                  >
                    Dissertações da Uergs
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${drop ? "rotate-180" : ""}`} />
                  </Link>

                  {drop && (
                    <div className="absolute left-0 top-full w-60 pt-2">
                      <ul className="overflow-hidden rounded-2xl border bg-card p-2 shadow-xl">
                        <li>
                          <Link
                            to="/dissertacoes"
                            activeOptions={{ exact: true }}
                            onClick={() => setDrop(false)}
                            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                          >
                            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: "#19486A" }} />
                            Panorama Geral
                          </Link>
                        </li>
                        {PROGRAMAS_MENU.map((d) => (
                          <li key={d.slug}>
                            <Link
                              to="/dissertacoes/$programa"
                              params={{ programa: d.slug }}
                              onClick={() => setDrop(false)}
                              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                            >
                              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: d.cor }} />
                              {d.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>

        <button
          className="rounded-md border p-2 lg:hidden"
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <ul className="border-t bg-background px-4 pb-4 lg:hidden">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                onClick={() => setOpen(false)}
                className="block w-full border-b border-border/60 py-3 text-left text-sm font-medium text-foreground"
              >
                {l.label}
              </Link>

              {/* Grupo "Dissertações da Uergs" expansível, logo após ODS */}
              {l.to === "/ods" && (
                <>
                  <button
                    onClick={() => setMobDiss((v) => !v)}
                    className="flex w-full items-center justify-between border-b border-border/60 py-3 text-left text-sm font-medium text-foreground"
                  >
                    <span className="inline-flex items-center gap-2">
                      <LayoutGrid className="h-4 w-4 text-primary" /> Dissertações da Uergs
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobDiss ? "rotate-180" : ""}`} />
                  </button>
                  {mobDiss && (
                    <div className="border-b border-border/60 bg-muted/40">
                      <Link
                        to="/dissertacoes"
                        activeOptions={{ exact: true }}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 py-2.5 pl-7 pr-2 text-sm text-foreground"
                      >
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: "#19486A" }} />
                        Panorama Geral
                      </Link>
                      {PROGRAMAS_MENU.map((d) => (
                        <Link
                          key={d.slug}
                          to="/dissertacoes/$programa"
                          params={{ programa: d.slug }}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 py-2.5 pl-7 pr-2 text-sm text-foreground"
                        >
                          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: d.cor }} />
                          {d.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
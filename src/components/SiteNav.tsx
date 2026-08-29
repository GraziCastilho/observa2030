import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
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

export default function SiteNav() {
  const [open, setOpen] = useState(false);

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
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "bg-muted text-primary" }}
                className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
              >
                {l.label}
              </Link>
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
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

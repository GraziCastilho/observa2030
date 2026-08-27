import { Instagram, Facebook, Mail } from "lucide-react";
import { LOGO_OBSERVA } from "./RodaODS";

export default function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[auto_1fr_auto] md:items-center">
        <img src={LOGO_OBSERVA} alt="Observa 2030" className="h-24 w-24 object-contain" loading="lazy" />

        <div>
          <h3 className="text-lg font-bold">Observa 2030 — Uergs</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-primary-foreground/80">
            Juntos por uma Pós-graduação comprometida com a Agenda 2030 e os Objetivos de Desenvolvimento
            Sustentável.
          </p>
        </div>

        <ul className="space-y-3 text-sm">
          <li>
            <a
              href="https://www.instagram.com/observa2030uergs"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-primary-foreground/90 transition-opacity hover:opacity-70"
            >
              <Instagram className="h-4 w-4" /> @observa2030uergs
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/profile.php?id=61578130242476"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-primary-foreground/90 transition-opacity hover:opacity-70"
            >
              <Facebook className="h-4 w-4" /> Observa Uergs
            </a>
          </li>
          <li>
            <a
              href="mailto:observa2030uergs@gmail.com"
              className="flex items-center gap-2 text-primary-foreground/90 transition-opacity hover:opacity-70"
            >
              <Mail className="h-4 w-4" /> observa2030uergs@gmail.com
            </a>
          </li>
        </ul>
      </div>

      <div className="border-t border-primary-foreground/15">
        <p className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-primary-foreground/70">
          © 2025 Observa 2030 – Uergs. Iniciativa financiada pela CAPES.
        </p>
      </div>
    </footer>
  );
}

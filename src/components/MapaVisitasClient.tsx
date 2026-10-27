import { lazy, Suspense, useEffect, useState } from "react";

// O mapa (leaflet) só pode existir no navegador.
// O import dinâmico abaixo só dispara depois que o componente monta no cliente,
// então o leaflet nunca é carregado durante o SSR (servidor) → sem "window is not defined".
const MapaVisitas = lazy(() => import("./MapaVisitas"));

function Placeholder() {
  return (
    <section className="bg-muted/50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Alcance do Observa 2030
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Visitantes de todo o Brasil e do mundo acompanham o Observatório.
        </p>
        <div
          className="mt-8 flex items-center justify-center overflow-hidden rounded-2xl border bg-card text-sm text-muted-foreground shadow-sm"
          style={{ height: "420px" }}
        >
          Carregando mapa…
        </div>
      </div>
    </section>
  );
}

export default function MapaVisitasClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <Placeholder />;

  return (
    <Suspense fallback={<Placeholder />}>
      <MapaVisitas />
    </Suspense>
  );
}
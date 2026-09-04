import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { supabase } from "@/lib/supabase";

type Visita = {
  lat: number;
  lng: number;
  cidade: string;
  estado: string;
  pais: string;
};

type Resumo = { nome: string; total: number };

const isDatacenter = (v: Visita) => {
  const cidade = v.cidade?.toLowerCase() ?? "";
  const estado = v.estado?.toLowerCase() ?? "";
  const pais = v.pais?.toLowerCase() ?? "";
  return (
    (cidade === "san francisco" && pais === "united states") ||
    (cidade === "santa clara" && pais === "united states") ||
    (cidade === "ashburn" && pais === "united states") ||
    (cidade === "singapore" && pais === "singapore") ||
    (cidade === "amsterdam" && pais === "netherlands") ||
    (cidade === "frankfurt" && pais === "germany") ||
    (cidade === "paris" && pais === "frança") ||
    (cidade === "varsóvia" && pais === "polónia") ||
    estado === "virginia" ||
    pais === ""
  );
};

export default function MapaVisitas() {
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [total, setTotal] = useState(0);
  const [resumo, setResumo] = useState<Resumo[]>([]);

  const agrupar = (dados: Visita[]) => {
    const mapa: Record<string, number> = {};
    for (const v of dados) {
      const chave = v.cidade
        ? `${v.cidade}, ${v.estado}`
        : v.pais ?? "Desconhecido";
      mapa[chave] = (mapa[chave] ?? 0) + 1;
    }
    return Object.entries(mapa)
      .map(([nome, total]) => ({ nome, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  };

  useEffect(() => {
    const carregar = async () => {
      const { data } = await supabase
        .from("visitas")
        .select("lat, lng, cidade, estado, pais")
        .not("lat", "is", null);
      if (data) {
        const filtradas = (data as Visita[]).filter((v) => !isDatacenter(v));
        setVisitas(filtradas);
        setResumo(agrupar(filtradas));
        setTotal(filtradas.length);
      }
    };
    carregar();

    const channel = supabase
      .channel("visitas-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "visitas" },
        (payload) => {
          const v = payload.new as Visita;
          if (v.lat && !isDatacenter(v)) {
            setVisitas((prev) => {
              const nova = [...prev, v];
              setResumo(agrupar(nova));
              return nova;
            });
            setTotal((prev) => prev + 1);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const cores = [
    "bg-blue-500", "bg-blue-400", "bg-sky-400",
    "bg-indigo-400", "bg-violet-400", "bg-purple-400",
    "bg-fuchsia-400", "bg-pink-400", "bg-rose-400", "bg-red-400",
  ];

  return (
    <section className="bg-muted/50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Alcance do Observa 2030
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Visitantes de todo o Brasil e do mundo acompanham o Observatório.
        </p>

        <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-2xl border bg-card px-8 py-4 shadow-sm">
          <span className="text-4xl font-extrabold text-primary">
            {total.toLocaleString("pt-BR")}
          </span>
          <span className="text-sm leading-tight text-muted-foreground">
            acessos
            <br />
            registrados
          </span>
        </div>

        <div
          className="mt-8 overflow-hidden rounded-2xl border bg-card shadow-sm"
          style={{ height: "420px" }}
        >
          <MapContainer
            center={[0, 0]}
            zoom={2}
            minZoom={2}
            maxZoom={18}
            style={{ width: "100%", height: "100%" }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {visitas.map((v, i) => (
              <CircleMarker
                key={i}
                center={[v.lat, v.lng]}
                radius={6}
                pathOptions={{
                  color: "#1d4ed8",
                  fillColor: "#3B82F6",
                  fillOpacity: 0.7,
                  weight: 1,
                }}
              >
                <Tooltip>
                  {v.cidade ? `${v.cidade}, ${v.estado}` : v.pais}
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Cada ponto representa um acesso registrado. Atualizado em tempo real.
        </p>

        {resumo.length > 0 && (
          <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="mb-1 text-lg font-semibold text-foreground">
              Top origens de acesso
            </h3>
            <p className="mb-5 text-xs text-muted-foreground">
              Cidades e países com mais visitas registradas
            </p>
            <div className="space-y-3">
              {resumo.map((r, i) => {
                const max = resumo[0]?.total ?? 1;
                const pct = Math.round((r.total / max) * 100);
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-5 shrink-0 text-right text-xs font-bold text-muted-foreground">
                      {i + 1}
                    </span>
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{r.nome}</span>
                        <span className="text-xs font-semibold text-muted-foreground">
                          {r.total} {r.total === 1 ? "acesso" : "acessos"}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${cores[i] ?? "bg-blue-300"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
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

export default function MapaVisitas() {
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const carregar = async () => {
      const { data, count } = await supabase
        .from("visitas")
        .select("lat, lng, cidade, estado, pais", { count: "exact" })
        .not("lat", "is", null);
      if (data) setVisitas(data as Visita[]);
      if (count) setTotal(count);
    };
    carregar();

    const channel = supabase
      .channel("visitas-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "visitas" },
        (payload) => {
          const v = payload.new as Visita;
          if (v.lat) setVisitas((prev) => [...prev, v]);
          setTotal((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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

        <div className="mt-8 overflow-hidden rounded-2xl border bg-card shadow-sm" style={{ height: "420px" }}>
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
      </div>
    </section>
  );
}
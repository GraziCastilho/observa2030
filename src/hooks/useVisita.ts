import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useVisita() {
  useEffect(() => {
    if (window.location.hostname === "localhost") return;

    const registrar = async (lat: number, lng: number) => {
      try {
        // reverse geocoding com as coordenadas reais
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
          { headers: { "Accept-Language": "pt-BR" } }
        );
        const data = await res.json();

        const cidade =
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          data.address?.county ||
          null;

        const estado = data.address?.state ?? null;
        const pais = data.address?.country ?? null;

        await supabase.from("visitas").insert({ cidade, estado, pais, lat, lng });
      } catch {}
    };

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        registrar(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        // usuário negou ou erro — não registra
      },
      { timeout: 10000 }
    );
  }, []);
}
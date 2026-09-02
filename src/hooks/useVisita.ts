import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useVisita() {
  useEffect(() => {
    if (window.location.hostname === "localhost") return;
    const registrar = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        await supabase.from("visitas").insert({
          cidade: data.city ?? null,
          estado: data.region ?? null,
          pais: data.country_name ?? null,
          lat: data.latitude ?? null,
          lng: data.longitude ?? null,
        });
      } catch {}
    };
    registrar();
  }, []);
}
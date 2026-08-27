import { createClient } from "@supabase/supabase-js";

// Publishable (anon) credentials — safe to expose in the browser.
const url =
  (import.meta.env["VITE_SUPABASE_URL"] as string | undefined) ||
  "https://nsmwgtepyzwokvsltkda.supabase.co";
const anonKey =
  (import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined) ||
  "sb_publishable_Fe2te5X1HBQgePpdmJnPcw_ORqDJzRU";

export const supabaseReady = Boolean(url && anonKey);

export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  anonKey || "placeholder-anon-key",
  { auth: { persistSession: false } },
);

export type Equipe = {
  id: string;
  nome: string;
  cargo: string | null;
  foto_url: string | null;
  formacao: string | null;
  atuacao: string | null;
  lattes_url: string | null;
  categoria_equipe: "coordenacao" | "docente_colaboradora" | "pesquisador" | "discente_bolsista";
  ordem: number | null;
};

export type Publicacao = {
  id: string;
  categoria: "artigo_livro_capitulo" | "relatorio_tecnico" | "texto_jornal_revista_site";
  referencia: string;
  titulo: string | null;
  autores: string | null;
  ano: string | number | null;
  doi: string | null;
  url: string | null;
  ordem: number | null;
};

export type Evento = {
  id: string;
  categoria: "evento" | "palestra_minicurso_acao";
  titulo: string;
  slug: string;
  imagem_card_url: string | null;
  descricao: string | null;
  data_evento: string | null;
  local: string | null;
  publico_alvo: string | null;
  ministrante: string | null;
  ordem: number | null;
};

export type EventoGaleria = {
  id: string;
  evento_id: string;
  imagem_url: string;
  referencia: string | null;
  ordem: number | null;
};

export type EventoLink = {
  id: string;
  evento_id: string;
  rotulo: string;
  url: string;
  ordem: number | null;
};

export type Parceria = {
  id: string;
  titulo: string;
  descricao: string | null;
  foto_url: string | null;
  url: string | null;
  ordem: number | null;
};

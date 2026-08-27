import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import Publicacoes from "@/components/sections/Publicacoes";

const TITLE = "Publicações — Observa 2030 Uergs";
const DESC =
  "Artigos científicos, livros, capítulos, relatórios técnicos e textos produzidos pela equipe do Projeto Observa 2030 da Uergs.";

export const Route = createFileRoute("/publicacoes")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <Publicacoes />
    </SiteLayout>
  ),
});

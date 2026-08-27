import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import Equipe from "@/components/sections/Equipe";

const TITLE = "Equipe — Observa 2030 Uergs";
const DESC =
  "Coordenação, docentes colaboradoras, pesquisadores, discentes e bolsistas que integram o Projeto Observa 2030 da Uergs.";

export const Route = createFileRoute("/equipe")({
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
      <Equipe />
    </SiteLayout>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import Eventos from "@/components/sections/Eventos";

const TITLE = "Eventos — Observa 2030 Uergs";
const DESC =
  "Eventos, palestras, minicursos e ações extensionistas desenvolvidos ou com participação da equipe do Projeto Observa 2030 da Uergs.";

export const Route = createFileRoute("/eventos/")({
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
      <Eventos />
    </SiteLayout>
  ),
});

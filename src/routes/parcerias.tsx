import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import Parcerias from "@/components/sections/Parcerias";

const TITLE = "Parcerias — Observa 2030 Uergs";
const DESC =
  "Redes de pesquisa e instituições parceiras do Projeto Observa 2030 comprometidas com o desenvolvimento sustentável e os ODS.";

export const Route = createFileRoute("/parcerias")({
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
      <Parcerias />
    </SiteLayout>
  ),
});

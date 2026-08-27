import {
  Search,
  GraduationCap,
  Presentation,
  Users,
  Megaphone,
  Handshake,
  Instagram,
  Facebook,
  Mail,
} from "lucide-react";
import { LOGO_OBSERVA } from "../RodaODS";

const OBJETIVOS = [
  {
    icon: Search,
    titulo: "Levantamento e Investigação",
    desc: "Mapeamento dos PTTs e ações de extensão nos mestrados e doutorados da Uergs para criação de um banco de dados público.",
  },
  {
    icon: GraduationCap,
    titulo: "Fomento e Projetos",
    desc: "Cursos de extensão e capacitação na modalidade MOOC (curso online aberto e massivo), com foco em ciência cidadã, Agenda 2030 e ODS.",
  },
  {
    icon: Presentation,
    titulo: "Organização de Seminários",
    desc: "Ações direcionadas aos PPGs para incentivar projetos de extensão que respondam a demandas locais e regionais.",
  },
  {
    icon: Users,
    titulo: "Participação em Eventos",
    desc: "Disseminação dos resultados do projeto em eventos científicos e de extensão.",
  },
  {
    icon: Megaphone,
    titulo: "Divulgação",
    desc: "Estratégia de mídia social focada em ampliar a visibilidade e o impacto social das ações da pós-graduação da Uergs.",
  },
  {
    icon: Handshake,
    titulo: "Colaboração Institucional",
    desc: "Fortalecimento da educação sustentável através de parcerias e colaborações com redes e grupos de pesquisa.",
  },
];

export default function Sobre() {
  return (
    <section id="sobre" className="scroll-mt-24 bg-muted/50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Sobre</h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border bg-card p-7 shadow-sm">
            <h3 className="text-xl font-bold text-foreground">
              A Universidade Estadual do Rio Grande do Sul (Uergs)
            </h3>
            <p className="mt-4 leading-relaxed text-foreground">
              A Universidade Estadual do Rio Grande do Sul (Uergs) é uma instituição pública estadual fundada em
              2001 e que, em 2025, completa 24 anos de atuação no ensino superior gaúcho. Com sede em Porto
              Alegre, a Universidade possui 23 unidades universitárias organizadas em 7 campi regionais,
              distribuídos em diferentes regiões do estado.
            </p>
            <p className="mt-4 leading-relaxed text-foreground">
              No âmbito da Pós-Graduação stricto sensu, a Uergs conta atualmente com cinco programas de
              Pós-Graduação (PPGSTEM, PPGAS, PPGCTA, PPGED e PPGSCBIO), que ofertam cursos de mestrado e, no caso
              do PPGED, também o primeiro doutorado da instituição.
            </p>
            <p className="mt-5 text-xs text-muted-foreground">
              Site Oficial:{" "}
              <a href="https://www.uergs.edu.br/" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                uergs.edu.br
              </a>{" "}
              · Instagram: @uergs
            </p>
          </article>

          <article className="rounded-2xl border bg-card p-7 shadow-sm">
            <h3 className="text-xl font-bold text-foreground">O Projeto Observa 2030</h3>
            <p className="mt-4 leading-relaxed text-foreground">
              O Projeto <em>“Observa 2030 – Observatório Gaúcho da Agenda 2030 da Uergs”</em>, aprovado em
              fevereiro de 2025 pela CAPES pelo Edital Conjunto nº 3/2024 – Programa de Extensão da Educação
              Superior na Pós-Graduação (PROEXT-PG), é uma iniciativa que visa alinhar a Pós-Graduação com os ODS
              da ONU.
            </p>
            <p className="mt-4 leading-relaxed text-foreground">
              O Observa 2030 constitui-se como uma plataforma estratégica de inteligência institucional da Uergs,
              concebida para mapear, sistematizar e dar visibilidade à produção científica com potencial de
              impacto social. Estruturado como um observatório de práticas sustentáveis, o projeto atua na
              intersecção entre a Pós-Graduação e as demandas da comunidade, transformando dados acadêmicos em
              indicadores de desenvolvimento regional.
            </p>
          </article>
        </div>

        <h3 className="mt-16 text-2xl font-bold text-foreground">Nossos Objetivos</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OBJETIVOS.map((o) => (
            <article key={o.titulo} className="rounded-2xl border bg-card p-6 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <o.icon className="h-5 w-5" />
              </span>
              <h4 className="mt-4 font-bold text-foreground">{o.titulo}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.desc}</p>
            </article>
          ))}
        </div>

        <h3 className="mt-16 text-2xl font-bold text-foreground">Eixos de Atuação</h3>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border-l-4 border-l-primary bg-card p-7 shadow-sm">
            <h4 className="font-bold text-foreground">Eixo 1 — Formativo (Foco Interno)</h4>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground">
              <li>• Fortalecimento de competências em comunicação científica</li>
              <li>• Atividades de capacitação e minicursos de extensão</li>
              <li>• Incentivo à produção de resumos e produtos acadêmicos alinhados aos ODS</li>
            </ul>
            <p className="mt-4 text-sm italic text-muted-foreground">
              Objetivo: Ampliar a capacidade dos pós-graduandos de comunicar impactos de pesquisa.
            </p>
          </article>

          <article className="rounded-2xl border-l-4 border-l-primary bg-card p-7 shadow-sm">
            <h4 className="font-bold text-foreground">Eixo 2 — Sociedade (Foco Externo)</h4>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground">
              <li>• Participação em eventos científicos e extensionistas</li>
              <li>• Promoção de ações de divulgação dos PTTs e materiais de divulgação científica</li>
              <li>• Comunicação digital (@observa2030uergs e Site Oficial)</li>
            </ul>
            <p className="mt-4 text-sm italic text-muted-foreground">
              Objetivo: Promover a popularização da ciência e fortalecer o diálogo universidade–sociedade.
            </p>
          </article>
        </div>

        <div className="mt-16 grid items-center gap-8 rounded-2xl border bg-card p-8 shadow-sm md:grid-cols-[240px_1fr]">
          <img
            src={LOGO_OBSERVA}
            alt="Logo do Projeto Observa 2030"
            loading="lazy"
            className="mx-auto w-full max-w-[220px] object-contain"
          />
          <div>
            <h3 className="text-2xl font-bold text-foreground">Identidade Visual</h3>
            <p className="mt-4 leading-relaxed text-foreground">
              A marca do Observa 2030 reúne o nome “Observa 2030” em destaque, o mapa do Rio Grande do Sul em
              amarelo — símbolo do território gaúcho observado pelo projeto — e o anel colorido com as cores
              oficiais dos ODS, que envolve a composição e remete à Agenda 2030 da ONU.
            </p>
            <p className="mt-4 leading-relaxed text-foreground">
              O círculo azul central representa a universidade pública e o olhar atento do observatório, enquanto
              as ondas coloridas evocam movimento, diversidade e a difusão do conhecimento. O formato circular
              expressa continuidade, integração e o compromisso coletivo com o desenvolvimento sustentável.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-2xl border bg-card p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-foreground">Redes Sociais e Contato</h3>
          <ul className="mt-5 flex flex-wrap gap-4 text-sm">
            <li>
              <a
                href="https://www.instagram.com/observa2030uergs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-foreground transition-colors hover:bg-muted"
              >
                <Instagram className="h-4 w-4" /> @observa2030uergs
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61578130242476"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-foreground transition-colors hover:bg-muted"
              >
                <Facebook className="h-4 w-4" /> Observa Uergs
              </a>
            </li>
            <li>
              <a
                href="mailto:observa2030uergs@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-foreground transition-colors hover:bg-muted"
              >
                <Mail className="h-4 w-4" /> observa2030uergs@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

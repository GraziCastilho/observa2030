import { useQuery } from "@tanstack/react-query";
import { supabase, supabaseReady, type Parceria } from "@/lib/supabase";

export default function Parcerias() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["parcerias"],
    enabled: supabaseReady,
    queryFn: async () => {
      const { data, error } = await supabase.from("parcerias").select("*").order("ordem", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Parceria[];
    },
  });

  return (
    <section id="parcerias" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Parcerias</h2>
        {!supabaseReady && <p className="mt-6 text-sm text-muted-foreground">Conteúdo indisponível no momento.</p>}
        {isLoading && <p className="mt-6 text-sm text-muted-foreground">Carregando parcerias…</p>}

        <div className="mt-10 space-y-14">
          {data.map((p) => (
            <article key={p.id}>
              <h3 className="text-2xl font-bold text-foreground">{p.titulo}</h3>
              {p.foto_url && (
                <img
                  src={p.foto_url}
                  alt={p.titulo}
                  loading="lazy"
                  className="mx-auto mt-6 w-full max-w-[400px] rounded-2xl border object-contain shadow-sm"
                />
              )}
              {p.descricao && (
                <div className="mt-6 space-y-4">
                  {p.descricao.split(/\n+/).map((par, i) => (
                    <p key={i} className="leading-relaxed text-foreground">
                      {par}
                    </p>
                  ))}
                </div>
              )}
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Saiba mais →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

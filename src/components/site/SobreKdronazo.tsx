import sobreImg from "@/assets/sobre-kdronazo.png.asset.json";

const indicadores = [
  { emoji: "🏰", label: "Castillos visitados personalmente" },
  { emoji: "📷", label: "Fotografías originales propias" },
  { emoji: "🚁", label: "Grabaciones aéreas propias con dron" },
  { emoji: "🇪🇸", label: "Proyecto documental independiente sobre castillos de España" },
];

export function SobreKdronazo() {
  return (
    <section
      aria-labelledby="sobre-kdronazo-titulo"
      className="border-y border-border/60 bg-secondary/30"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <figure className="kd-fade-in relative overflow-hidden rounded-2xl border border-border/70 shadow-[var(--shadow-elegant)]">
            <img
              src={sobreImg.url}
              alt="Pablo, creador de Kdronazo, junto a su trípode y dron DJI documentando un castillo en ruinas al atardecer"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-xs text-white/90 sm:text-sm">
              Pablo, creador de Kdronazo, durante una jornada de trabajo de campo.
            </figcaption>
          </figure>

          <div className="kd-fade-in-up space-y-5">
            <span className="inline-flex rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Sobre Kdronazo
            </span>
            <h2
              id="sobre-kdronazo-titulo"
              className="font-display text-3xl text-foreground sm:text-4xl md:text-5xl"
            >
              Detrás de Kdronazo
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-foreground/85">
              <p>
                Soy <strong>Pablo</strong>, creador de Kdronazo.
              </p>
              <p>
                Recorro España documentando castillos, fortalezas y ruinas históricas mediante fotografía
                terrestre y grabación aérea con dron.
              </p>
              <p>
                Cada castillo incluido en esta web ha sido visitado personalmente y todo el material
                fotográfico y audiovisual ha sido realizado por mí durante el trabajo de campo.
              </p>
              <p>
                Kdronazo nace con el objetivo de acercar el patrimonio histórico español a través de
                imágenes, vídeos y documentación propia obtenida directamente sobre el terreno.
              </p>
            </div>

            <ul className="grid gap-3 pt-2 sm:grid-cols-2">
              {indicadores.map((i) => (
                <li
                  key={i.label}
                  className="flex items-start gap-3 rounded-lg border border-border/70 bg-card/70 p-3 text-sm text-foreground/85"
                >
                  <span aria-hidden className="text-xl leading-none">{i.emoji}</span>
                  <span>{i.label}</span>
                </li>
              ))}
            </ul>

            <aside className="mt-2 rounded-lg border-l-4 border-primary bg-primary/5 px-4 py-3 text-sm italic text-foreground/85">
              Todas las fotografías y vídeos publicados en Kdronazo son material original realizado
              durante visitas reales a los castillos documentados.
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
}
import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function YoutubeVideo({ videoId, videoUrl, nombre }: { videoId: string; videoUrl: string; nombre: string }) {
  const [unavailable, setUnavailable] = useState(false);
  return (
    <Button asChild variant="ghost" className="group block h-auto w-full overflow-hidden whitespace-normal rounded-lg border border-border bg-secondary p-0 text-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <a href={videoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ver documental de ${nombre} en YouTube (nueva pestaña)`}>
        <span className="relative block aspect-video overflow-hidden">
          {!unavailable && (
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt={`Miniatura del documental de ${nombre} — Kdronazo`}
              width={480}
              height={360}
              loading="lazy"
              decoding="async"
              onError={() => setUnavailable(true)}
              onLoad={(event) => {
                if (event.currentTarget.naturalWidth <= 120) setUnavailable(true);
              }}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none"
            />
          )}
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-youtube text-youtube-foreground transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-110 motion-reduce:transition-none motion-reduce:transform-none">
              <Play className="fill-current" aria-hidden="true" />
            </span>
            {unavailable && <span className="text-center text-sm text-muted-foreground">Miniatura no disponible</span>}
          </span>
        </span>
        <span className="flex min-h-12 items-center justify-center gap-2 px-4 py-3 text-center text-sm font-medium">
          Ver documental en YouTube
        </span>
      </a>
    </Button>
  );
}
import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function YoutubeVideo({ videoId, nombre }: { videoId: string; nombre: string }) {
  const [opened, setOpened] = useState(false);
  return (
    <div className="aspect-video overflow-hidden rounded-lg border border-border bg-secondary">
      {opened ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&playsinline=1`}
          title={`Vídeo de ${nombre} — Kdronazo`}
          className="h-full w-full border-0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <Button
          type="button"
          variant="ghost"
          className="group relative h-full w-full overflow-hidden rounded-none p-0"
          aria-label={`Abrir vídeo de ${nombre}`}
          onClick={() => setOpened(true)}
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt={`Miniatura del vídeo de ${nombre} — Kdronazo`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-youtube text-youtube-foreground transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:transform-none">
              <Play className="fill-current" aria-hidden="true" />
            </span>
          </span>
        </Button>
      )}
    </div>
  );
}
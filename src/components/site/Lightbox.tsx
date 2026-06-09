import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  images: string[];
  initialIndex: number;
  alt: string;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, alt, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  const hasMany = images.length > 1;

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && hasMany) prev();
      else if (e.key === "ArrowRight" && hasMany) next();
    };
    window.addEventListener("keydown", handler);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next, hasMany]);

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label="Imagen ampliada"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Cerrar"
        className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      {hasMany && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Imagen siguiente"
            className="absolute right-2 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div
        className="relative flex h-full w-full items-center justify-center p-4 sm:p-10"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null || !hasMany) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 50) {
            if (dx < 0) next();
            else prev();
          }
          touchStartX.current = null;
        }}
      >
        <div className="relative max-h-full max-w-full">
          <img
            src={images[index]}
            alt={alt}
            className="max-h-[88vh] max-w-full select-none object-contain"
            draggable={false}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-2 right-2 select-none rounded bg-black/40 px-2 py-1 text-xs font-medium tracking-wide text-white/90"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
          >
            © Kdronazo
          </span>
        </div>
        {hasMany && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white/90">
            {index + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}
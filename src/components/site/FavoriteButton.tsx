import { Heart } from "lucide-react";
import { toast } from "sonner";
import { toggleFavorite, useIsFavorite } from "@/hooks/useFavorites";

interface Props {
  slug: string;
  nombre: string;
  variant?: "icon" | "pill";
  className?: string;
}

export function FavoriteButton({ slug, nombre, variant = "icon", className = "" }: Props) {
  const isFav = useIsFavorite(slug);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleFavorite(slug);
    if (added) {
      toast.success(`${nombre} guardado en tus favoritos`, {
        description: "Puedes encontrarlo en 'Mis favoritos'.",
      });
    } else {
      toast(`${nombre} eliminado de tus favoritos`);
    }
  };

  const label = isFav ? "Quitar de favoritos" : "Guardar en favoritos";

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={isFav}
        aria-label={label}
        title={label}
        className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
          isFav
            ? "border-red-500/60 bg-red-500/10 text-red-600 hover:bg-red-500/15"
            : "border-border bg-card text-foreground/80 hover:bg-secondary"
        } ${className}`}
      >
        <Heart className={`h-4 w-4 ${isFav ? "fill-current" : ""}`} />
        {isFav ? "En tus favoritos" : "Guardar en favoritos"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isFav}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white shadow-md backdrop-blur transition-transform hover:scale-110 ${className}`}
    >
      <Heart
        className={`h-[18px] w-[18px] transition-colors ${
          isFav ? "fill-red-500 text-red-500" : "text-white"
        }`}
      />
    </button>
  );
}
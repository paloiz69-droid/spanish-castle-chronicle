import { type ImgHTMLAttributes } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  /** Texto de la marca de agua. */
  watermark?: string;
  /** Tamaño visual de la marca. */
  size?: "sm" | "md";
  /** Clase del contenedor exterior. */
  wrapperClassName?: string;
}

/**
 * Imagen con marca de agua discreta © Kdronazo en la esquina inferior derecha.
 * El contenedor toma el tamaño que reciba mediante wrapperClassName.
 */
export function WatermarkedImage({
  watermark = "© Kdronazo",
  size = "sm",
  wrapperClassName = "h-full w-full",
  className = "",
  alt = "",
  ...rest
}: Props) {
  return (
    <div className={`relative ${wrapperClassName}`}>
      <img alt={alt} className={className} {...rest} />
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-1.5 right-2 select-none rounded bg-black/30 px-1.5 py-0.5 font-medium tracking-wide text-white/90 backdrop-blur-[2px] ${
          size === "md" ? "text-[11px] sm:text-xs" : "text-[10px]"
        }`}
        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
      >
        {watermark}
      </span>
    </div>
  );
}
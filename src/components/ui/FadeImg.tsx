import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/** Image that fades & de-zooms in once loaded. Always render over a gradient fallback. */
export function FadeImg({ className, onLoad, onError, alt = "", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <img
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
      className={cn(
        "transition-all duration-[1200ms] ease-out",
        loaded ? "scale-100 opacity-100" : "scale-[1.08] opacity-0",
        className,
      )}
    />
  );
}

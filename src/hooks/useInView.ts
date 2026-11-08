import { useEffect, useRef, useState } from "react";

type Options = {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
};

/**
 * Lightweight IntersectionObserver hook. By default it fires once
 * and then disconnects, which is what scroll-reveal animations want.
 */
export function useInView<T extends Element = HTMLDivElement>({
  once = true,
  threshold = 0.12,
  rootMargin = "0px 0px -6% 0px",
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        // A batch can hold several entries; the most recent one is the truth.
        const latest = entries[entries.length - 1];
        if (latest.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold, rootMargin]);

  return { ref, inView };
}

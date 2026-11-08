import { Fragment, useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { ArrowRightStaticIcon } from "@/components/ui/Icons";
import { useI18n } from "@/i18n/I18nContext";
import { Reveal } from "@/components/ui/Reveal";

type CarouselRowProps = {
  title: string;
  caption: string;
  /** Short highlight shown next to the title, e.g. "200K+" */
  stat?: string;
  items: ReactNode[];
  /** 1 = drifts left, -1 = drifts right */
  direction?: 1 | -1;
  /** Auto-scroll speed in px / second */
  speed?: number;
};

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * An infinite, auto-drifting carousel built on a native scroll container, so it
 * can also be swiped on touch, dragged with a mouse, scrolled with arrow keys
 * or moved with the prev/next buttons. Auto-motion pauses on hover, touch,
 * keyboard focus and when off-screen, and is disabled for reduced-motion users.
 */
export function CarouselRow({ title, caption, stat, items, direction = 1, speed = 36 }: CarouselRowProps) {
  const { t } = useI18n();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const held = useRef(false);
  const visible = useRef(false);
  const timer = useRef(0);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const hovering = useRef(false);
  const [copies, setCopies] = useState(3);

  const pause = useCallback(() => {
    window.clearTimeout(timer.current);
    held.current = true;
  }, []);

  const resume = useCallback((delay = 0) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      // Never restart while a mouse is still resting on the carousel.
      if (!hovering.current && !drag.current) held.current = false;
    }, delay);
  }, []);

  // Render enough copies that the "loop window" [w, 2w) plus the viewport always fits.
  useEffect(() => {
    const measure = () => {
      const el = scrollerRef.current;
      const first = firstRef.current;
      if (!el || !first) return;
      const w = first.getBoundingClientRect().width;
      if (w > 0) setCopies(Math.max(3, Math.ceil(el.clientWidth / w) + 2));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Auto-drift + seamless looping.
  useEffect(() => {
    const el = scrollerRef.current;
    const first = firstRef.current;
    if (!el || !first) return;

    const reduced = prefersReducedMotion();
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver((entries) => {
            visible.current = entries[entries.length - 1].isIntersecting;
          })
        : null;
    if (io) io.observe(el);
    else visible.current = true;

    let raf = 0;
    let last = performance.now();
    let pos = -1;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(now - last, 50) / 1000;
      last = now;

      const w = first.getBoundingClientRect().width;
      if (!w) return;

      if (pos < 0) {
        el.scrollLeft = w;
        pos = el.scrollLeft;
      }

      if (held.current || !visible.current || reduced) {
        pos = el.scrollLeft; // follow the user
      } else {
        pos += direction * speed * dt;
        el.scrollLeft = pos;
      }

      if (pos >= 2 * w) {
        pos -= w;
        el.scrollLeft = pos;
      } else if (pos < w) {
        pos += w;
        el.scrollLeft = pos;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.clearTimeout(timer.current);
    };
  }, [direction, speed]);

  const nudge = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    pause();
    resume(2600);
    el.scrollBy({
      left: dir * Math.max(el.clientWidth * 0.7, 240),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  /* Mouse drag-to-scroll */
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = e.currentTarget;
    drag.current = { x: e.clientX, left: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
    pause();
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (d) e.currentTarget.scrollLeft = d.left - (e.clientX - d.x);
  };
  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    drag.current = null;
    e.currentTarget.style.cursor = "";
    resume(700);
  };

  return (
    <Reveal>
      <div role="group" aria-roledescription="carousel" aria-label={title}>
        <div className="mx-auto mb-4 flex max-w-7xl items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-ink-900 sm:text-2xl">{title}</h3>
              {stat && (
                <span className="rounded-full border border-violet-200 bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-700">
                  {stat}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-ink-600">{caption}</p>
          </div>
          {/* Physical arrows: the track always scrolls left/right, whatever the page language. */}
          <div dir="ltr" className="flex shrink-0 gap-2">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => nudge(dir)}
                aria-label={t(dir === 1 ? "car.forward" : "car.back", { title })}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 bg-white text-violet-700 shadow-soft transition-all duration-300 hover:border-violet-300 hover:bg-violet-50 active:scale-95"
              >
                <ArrowRightStaticIcon className={dir === -1 ? "h-4 w-4 rotate-180" : "h-4 w-4"} />
              </button>
            ))}
          </div>
        </div>

        <div className="marquee-mask">
          <div
            ref={scrollerRef}
            role="region"
            tabIndex={0}
            aria-label={t("car.region", { title })}
            dir="ltr"
            className="no-scrollbar flex cursor-grab overflow-x-auto overflow-y-hidden py-4 select-none"
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return;
              hovering.current = true;
              pause();
            }}
            onPointerLeave={(e) => {
              if (e.pointerType !== "mouse") return;
              hovering.current = false;
              if (!drag.current) resume(250);
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onTouchStart={pause}
            onTouchEnd={() => resume(2200)}
            onWheel={() => {
              pause();
              resume(1500);
            }}
            onFocus={(e) => e.currentTarget.matches(":focus-visible") && pause()}
            onBlur={() => resume(300)}
          >
            {Array.from({ length: copies }, (_, c) => (
              <div
                key={c}
                ref={c === 0 ? firstRef : undefined}
                aria-hidden={c > 0 ? true : undefined}
                inert={c > 0}
                className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4"
              >
                {items.map((node, i) => (
                  <Fragment key={i}>{node}</Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

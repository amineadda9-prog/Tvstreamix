import { FadeImg } from "@/components/ui/FadeImg";
import { StarIcon } from "@/components/ui/Icons";
import { posterUrl, sportUrl, type Channel, type Poster, type Sport } from "@/data/content";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/utils/cn";

/*
 * Carousels scroll in a fixed left-to-right track (so scroll maths stay simple
 * in every language). Each card therefore sets its own `dir` so its *text*
 * still follows the page language.
 */

const cardLift = "transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-lift";

export function PosterCard({ poster: p }: { poster: Poster }) {
  const { t, dir } = useI18n();

  return (
    <article
      dir={dir}
      aria-label={`${p.title}, ${t(p.genre)}, ${p.year}`}
      className={cn(
        "group/poster shadow-soft relative aspect-[2/3] w-36 shrink-0 overflow-hidden rounded-2xl ring-1 ring-ink-900/10 hover:ring-violet-400/70 sm:w-44 lg:w-48",
        cardLift,
      )}
      style={{ backgroundImage: `linear-gradient(160deg, ${p.tint}, #1d1740 85%)` }}
    >
      <FadeImg
        src={posterUrl(p)}
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/poster:scale-110"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-soft-light"
        style={{ backgroundImage: `linear-gradient(180deg, ${p.tint}, transparent 70%)` }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      <span
        className={cn(
          "absolute start-2.5 top-2.5 rounded-md px-1.5 py-0.5 text-[0.62rem] font-extrabold tracking-wider",
          p.badge === "NEW" ? "bg-violet-600 text-white" : "bg-black/55 text-white backdrop-blur",
        )}
      >
        {p.badge === "NEW" ? t("badge.new") : p.badge}
      </span>
      <span className="absolute end-2.5 top-2.5 inline-flex items-center gap-1 rounded-md bg-black/55 px-1.5 py-0.5 text-[0.62rem] font-bold text-white backdrop-blur">
        <StarIcon className="h-2.5 w-2.5 text-amber-400" />
        {p.rating}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5">
        {/* Titles are original (Latin) names, so keep them reading left-to-right. */}
        <h4 dir="auto" className="font-display text-[0.95rem] leading-tight font-bold text-start text-white sm:text-base">
          {p.title}
        </h4>
        <p className="mt-1 text-[0.68rem] font-medium tracking-wide text-white/75 uppercase">
          {t(p.genre)} · {p.year}
        </p>
      </div>
    </article>
  );
}

export function SportCard({ sport: s }: { sport: Sport }) {
  const { t, dir } = useI18n();

  return (
    <article
      dir={dir}
      aria-label={t(s.nameKey)}
      className={cn(
        "group/sport shadow-soft relative aspect-[4/3] w-60 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-700 to-ink-900 ring-1 ring-ink-900/10 hover:ring-violet-400/70 sm:w-72",
        cardLift,
      )}
    >
      <FadeImg
        src={sportUrl(s)}
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/sport:scale-110"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10" />

      {s.live && (
        <span className="absolute start-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/55 px-2.5 py-1 text-[0.65rem] font-bold tracking-wider text-white uppercase backdrop-blur">
          <span className="live-dot" /> {t("badge.live")}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h4 className="font-display text-lg font-bold text-white sm:text-xl">{t(s.nameKey)}</h4>
        <p className="mt-0.5 text-xs text-white/80">{t(s.captionKey)}</p>
      </div>
    </article>
  );
}

const SHAPES: Record<Channel["shape"], string> = {
  circle: "rounded-full",
  square: "rounded-xl",
  diamond: "rotate-45 rounded-lg scale-[0.82]",
  pill: "rounded-2xl",
};

export function ChannelCard({ channel: c }: { channel: Channel }) {
  const { t, dir } = useI18n();
  const sub = t(c.subKey);

  return (
    <div
      dir={dir}
      role="img"
      aria-label={`${c.name} ${sub}`}
      className="group/ch shadow-soft flex h-[4.75rem] w-48 shrink-0 items-center gap-3 rounded-2xl border border-violet-100 bg-white px-4 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-violet-300 hover:shadow-lift sm:h-20 sm:w-52"
    >
      {c.logo ? (
        <img src={c.logo} alt="" draggable={false} loading="lazy" className="h-10 w-auto object-contain" />
      ) : (
        <>
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center shadow-md transition-transform duration-500 group-hover/ch:scale-110",
              SHAPES[c.shape],
            )}
            style={{ backgroundImage: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
          >
            <span
              className={cn("font-display text-lg leading-none font-extrabold text-white", c.shape === "diamond" && "-rotate-45")}
            >
              {c.mark}
            </span>
          </span>
          <span className="min-w-0 leading-none">
            <span dir="ltr" className="block truncate text-start font-display text-[1.05rem] font-extrabold tracking-tight text-ink-900">
              {c.name}
            </span>
            <span className="mt-1.5 block truncate text-[0.58rem] font-semibold tracking-[0.2em] text-ink-500 uppercase">
              {sub}
            </span>
          </span>
        </>
      )}
    </div>
  );
}

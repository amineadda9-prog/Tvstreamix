import { ChannelCard, PosterCard, SportCard } from "@/components/LibraryCards";
import { CarouselRow } from "@/components/ui/CarouselRow";
import { CHANNELS, FILMS, SERIES, SPORTS } from "@/data/content";
import { useI18n } from "@/i18n/I18nContext";

export function Library() {
  const { t } = useI18n();

  return (
    <section id="library" aria-labelledby="library-title" className="relative bg-white py-14 sm:py-20">
      <h2 id="library-title" className="sr-only">
        {t("lib.sr")}
      </h2>

      <div className="space-y-10 sm:space-y-14">
        <CarouselRow
          title={t("lib.movies")}
          stat="200K+"
          caption={t("lib.moviesCap")}
          items={FILMS.map((p) => (
            <PosterCard key={p.title} poster={p} />
          ))}
          speed={34}
        />
        <CarouselRow
          title={t("lib.series")}
          stat={t("lib.seriesStat")}
          caption={t("lib.seriesCap")}
          direction={-1}
          items={SERIES.map((p) => (
            <PosterCard key={p.title} poster={p} />
          ))}
          speed={30}
        />
        <CarouselRow
          title={t("lib.sports")}
          stat="24/7"
          caption={t("lib.sportsCap")}
          items={SPORTS.map((s) => (
            <SportCard key={s.nameKey} sport={s} />
          ))}
          speed={38}
        />
        <CarouselRow
          title={t("lib.channels")}
          stat="45K+"
          caption={t("lib.channelsCap")}
          direction={-1}
          items={CHANNELS.map((c) => (
            <ChannelCard key={c.name} channel={c} />
          ))}
          speed={42}
        />
      </div>
    </section>
  );
}

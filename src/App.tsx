import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Library } from "@/components/Library";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { OrderProvider } from "@/context/OrderContext";
import { I18nProvider, useI18n } from "@/i18n/I18nContext";

function Page() {
  const { t } = useI18n();

  return (
    <OrderProvider>
      <a
        href="#main"
        className="fixed start-3 top-3 z-[200] -translate-y-20 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        {t("a11y.skip")}
      </a>

      <Navbar />

      <main id="main" className="relative">
        <Hero />
        <Library />
        <Pricing />
        <FAQ />
      </main>

      <Footer />
      <StickyMobileCTA />
    </OrderProvider>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <Page />
    </I18nProvider>
  );
}

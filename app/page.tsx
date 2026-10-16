"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Navbar, type SectionId } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { DualColumnSection, type ProtocolFocus } from "@/components/dual-column-section";
import { ProtocolSearch } from "@/components/protocol-search";
import { loadProtocolCatalog } from "@/hooks/use-protocol-catalog";
import { EncapsulationSimulator } from "@/components/encapsulation-simulator";
import { FlowsSection } from "@/components/flows-section";
import { MisfitsSection } from "@/components/misfits-section";
import { PracticeSection } from "@/components/practice-section";
import { ProductTour } from "@/components/product-tour";
import { Language, DetailMode } from "@/lib/network-data";
import Image from "next/image";

// Transición "de una vez": sale con un fundido corto y acelerado, entra con el mismo
// ease de entrada que usa el resto del sitio (--ease-out-expo). Sin solapes ni demora:
// AnimatePresence en modo "wait" espera a que termine de salir antes de entrar.
const SECTION_INITIAL = { opacity: 0, y: 10, filter: "blur(6px)" };
const SECTION_ENTER = { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const } };
const SECTION_EXIT = { opacity: 0, filter: "blur(3px)", transition: { duration: 0.16, ease: [0.4, 0, 1, 1] as const } };

export default function Page() {
  const [lang, setLang] = useState<Language>("es");
  const [mode, setMode] = useState<DetailMode>("basic");
  const [searchOpen, setSearchOpen] = useState(false);
  const [section, setSection] = useState<SectionId>("hero");
  const [focus, setFocus] = useState<ProtocolFocus | null>(null);
  const clearFocus = useCallback(() => setFocus(null), []);
  const [tourOpen, setTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const startTour = useCallback(() => {
    setTourStep(0);
    setTourOpen(true);
  }, []);

  // Cambia de sección y repone el scroll al top: el fundido ya aporta la suavidad,
  // así que el salto de posición se hace de golpe en vez de competir con la animación.
  const goTo = useCallback((id: SectionId) => {
    setSection(id);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Lleva a la tarjeta de la capa y abre la ficha del protocolo (búsqueda global y flujos)
  // La capa se toma del catálogo: la ficha vive en su capa principal, no en la que liste quien la invoca
  const openProtocol = useCallback(
    (id: string, fallbackOsi: number) => {
      goTo("layers");
      loadProtocolCatalog().then((c) => setFocus({ id, osi: c.PROTOCOLS_BY_ID[id]?.osi[0] ?? fallbackOsi }));
    },
    [goTo]
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // El nombre no se traduce; se deja fuera del diccionario bilingüe del resto del sitio.
  const footerName = "Francisco Mireles Rodriguez";

  return (
    <div className="mesh-gradient min-h-screen transition-colors duration-500">
      {/* Orbes ambientales animados */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #9C523799, transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, #154B3480, transparent 70%)" }}
        />
      </div>

      <Navbar
        currentLang={lang}
        onLanguageChange={setLang}
        mode={mode}
        onModeChange={setMode}
        onSearch={() => setSearchOpen(true)}
        active={section}
        onNavigate={goTo}
        onOpenTour={startTour}
      />
      <ProductTour
        lang={lang}
        open={tourOpen}
        stepIndex={tourStep}
        activeSection={section}
        onNavigate={goTo}
        onStepChange={setTourStep}
        onClose={() => setTourOpen(false)}
      />
      <ProtocolSearch
        open={searchOpen}
        onOpenChange={setSearchOpen}
        lang={lang}
        onSelect={(p) => openProtocol(p.id, p.osi[0])}
      />

      <main className="relative z-10 pt-28 sm:pt-32">
        <AnimatePresence mode="wait">
          <motion.div key={section} initial={SECTION_INITIAL} animate={SECTION_ENTER} exit={SECTION_EXIT}>
            {section === "hero" && <HeroSection lang={lang} onOpenSimulator={() => goTo("trace")} />}
            {section === "layers" && <DualColumnSection lang={lang} mode={mode} focus={focus} onFocusHandled={clearFocus} />}
            {section === "trace" && <EncapsulationSimulator lang={lang} mode={mode} />}
            {section === "flows" && <FlowsSection lang={lang} mode={mode} onOpenProtocol={openProtocol} />}
            {section === "misfits" && <MisfitsSection lang={lang} mode={mode} onOpenProtocol={openProtocol} />}
            {section === "practice" && <PracticeSection lang={lang} mode={mode} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="px-6 py-3 border-t border-primary/10 relative z-10 mt-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo3.png" alt="" width={18} height={18} className="object-contain shrink-0" />
            <span className="font-mono text-[11px] text-muted-foreground">La Libreta de México</span>
          </div>
          <p className="text-[11px] font-mono text-muted-foreground">{footerName}</p>
        </div>
      </footer>
    </div>
  );
}

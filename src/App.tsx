/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { DomainSwitcher, type DomainType } from './components/DomainSwitcher';
import { ForexJournal } from './components/ForexJournal';
import { Projects } from './components/Projects';
import { FounderBuildLog } from './components/FounderBuildLog';
import { About } from './components/About';
import { Timeline } from './components/Timeline';
import { Contact } from './components/Contact';
import { RiskCalculatorModal } from './components/RiskCalculatorModal';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { LegalModals, type LegalModalType } from './components/LegalModals';
import { CookieBanner } from './components/CookieBanner';

function FadeInSection({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [activeDomain, setActiveDomain] = useState<DomainType>('all');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);

  useEffect(() => {
    // Ensure document defaults to dark class for the executive dark aesthetic
    document.documentElement.classList.add('dark');

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative bg-[#090C12] text-[#E2E8F0] font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Subtle top ambient radial lighting to eradicate the exposed/skeletal feel */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-indigo-500/[0.03] rounded-full blur-[120px]" />
      </div>

      {/* Popover Risk & Lot Calculator Modal */}
      <RiskCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        defaultRisk={25}
        defaultPair="EUR/USD"
      />

      {/* Sidebar with Branding, Crest, Navigation & Calculator Action */}
      <Sidebar
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onSelectDomain={setActiveDomain}
      />

      {/* Main Content Area with rich dark executive presence */}
      <main className="flex-1 relative z-10 w-full overflow-hidden p-2.5 sm:p-5 md:p-8 lg:p-10 bg-transparent">
        <div className="space-y-8 md:space-y-12 max-w-7xl mx-auto">
          {/* Hero Section */}
          <FadeInSection>
            <Hero
              onOpenCalculator={() => setIsCalculatorOpen(true)}
              onSelectDomain={setActiveDomain}
            />
          </FadeInSection>

          {/* Sticky Domain Switcher & Global Popover Calculator Launcher */}
          <DomainSwitcher
            activeDomain={activeDomain}
            onSelectDomain={setActiveDomain}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />

          {/* Dynamic Content Views based on Active Domain */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDomain}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 md:space-y-12"
            >
              {/* Domain: All Disciplines */}
              {activeDomain === 'all' && (
                <>
                  <FadeInSection>
                    <ForexJournal onOpenCalculator={() => setIsCalculatorOpen(true)} />
                  </FadeInSection>

                  <FadeInSection>
                    <Projects />
                  </FadeInSection>

                  <FadeInSection>
                    <FounderBuildLog />
                  </FadeInSection>

                  <FadeInSection>
                    <About />
                  </FadeInSection>

                  <FadeInSection>
                    <Timeline />
                  </FadeInSection>

                  <FadeInSection>
                    <FAQ />
                  </FadeInSection>

                  <FadeInSection>
                    <Contact />
                  </FadeInSection>
                </>
              )}

              {/* Domain: Forex Desk & Journal (Primary) */}
              {activeDomain === 'forex' && (
                <>
                  <FadeInSection>
                    <ForexJournal onOpenCalculator={() => setIsCalculatorOpen(true)} />
                  </FadeInSection>

                  <FadeInSection>
                    <About />
                  </FadeInSection>

                  <FadeInSection>
                    <FAQ />
                  </FadeInSection>

                  <FadeInSection>
                    <Contact />
                  </FadeInSection>
                </>
              )}

              {/* Domain: Architecture & Spatial Design */}
              {activeDomain === 'architecture' && (
                <>
                  <FadeInSection>
                    <Projects />
                  </FadeInSection>

                  <FadeInSection>
                    <FounderBuildLog />
                  </FadeInSection>

                  <FadeInSection>
                    <FAQ />
                  </FadeInSection>

                  <FadeInSection>
                    <Contact />
                  </FadeInSection>
                </>
              )}

              {/* Domain: Social Media & Content Production */}
              {activeDomain === 'media' && (
                <>
                  <FadeInSection>
                    <FounderBuildLog />
                  </FadeInSection>

                  <FadeInSection>
                    <Projects />
                  </FadeInSection>

                  <FadeInSection>
                    <FAQ />
                  </FadeInSection>

                  <FadeInSection>
                    <Contact />
                  </FadeInSection>
                </>
              )}

              {/* Domain: Founder Build Log & Upcoming Projects */}
              {activeDomain === 'buildlog' && (
                <>
                  <FadeInSection>
                    <FounderBuildLog />
                  </FadeInSection>

                  <FadeInSection>
                    <Timeline />
                  </FadeInSection>

                  <FadeInSection>
                    <FAQ />
                  </FadeInSection>

                  <FadeInSection>
                    <Contact />
                  </FadeInSection>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Executive & Crawler-Compliant Footer with Full Venture Index */}
          <Footer
            onOpenLegal={setActiveLegalModal}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        </div>
      </main>

      {/* Google AdSense / GDPR Compliant Legal Document Modals */}
      <LegalModals
        activeModal={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />

      {/* Floating Cookie & Privacy Consent Banner */}
      <CookieBanner
        onOpenPrivacy={() => setActiveLegalModal('privacy')}
      />
    </div>
  );
}

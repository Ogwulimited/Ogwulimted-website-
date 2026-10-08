import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, ShieldCheck, X } from 'lucide-react';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

export function CookieBanner({ onOpenPrivacy }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ogwu_cookie_consent');
    if (!consent) {
      // Delay slightly for smooth page entrance
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('ogwu_cookie_consent', 'all');
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('ogwu_cookie_consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-40 p-4 sm:p-5 rounded-2xl bg-[#0D121F]/95 backdrop-blur-xl border border-[#23314D] shadow-2xl text-neutral-200"
      >
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Cookie size={15} />
            </div>
            <span className="font-display font-bold text-sm text-white">
              Cookie & Privacy Consent
            </span>
          </div>
          <button
            onClick={handleEssentialOnly}
            className="text-neutral-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Dismiss cookie notice"
          >
            <X size={15} />
          </button>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed font-sans mb-3.5">
          We use essential cookies and anonymized telemetry to ensure site performance, store calculator preferences, and support Google AdSense quality compliance.
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleAcceptAll}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-display text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer text-center"
          >
            Accept All
          </button>
          <button
            onClick={handleEssentialOnly}
            className="py-2 px-3 rounded-xl bg-[#141A29] hover:bg-[#1E263B] border border-[#232F47] text-neutral-300 hover:text-white font-display text-xs font-semibold transition-colors cursor-pointer text-center"
          >
            Essential Only
          </button>
          <button
            onClick={onOpenPrivacy}
            className="text-[11px] text-sky-400 hover:underline px-1 py-2 cursor-pointer font-sans"
          >
            Policy
          </button>
        </div>

        <div className="mt-2.5 pt-2 border-t border-[#192338] flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span>GDPR, CCPA & Google Publisher Policy Compliant</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

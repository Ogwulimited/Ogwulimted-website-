import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, FileText, Lock, Info, Check, ExternalLink } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'risk' | 'advertising' | null;

interface LegalModalsProps {
  activeModal: LegalModalType;
  onClose: () => void;
}

export function LegalModals({ activeModal, onClose }: LegalModalsProps) {
  if (!activeModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl bg-[#0D121F] border border-[#23314D] shadow-2xl overflow-hidden text-neutral-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#1E293F] bg-[#111728]">
            <div className="flex items-center gap-2.5">
              {activeModal === 'privacy' && <Lock size={18} className="text-emerald-400" />}
              {activeModal === 'terms' && <FileText size={18} className="text-sky-400" />}
              {activeModal === 'risk' && <ShieldAlert size={18} className="text-amber-400" />}
              {activeModal === 'advertising' && <Info size={18} className="text-purple-400" />}
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white">
                  {activeModal === 'privacy' && 'Privacy Policy'}
                  {activeModal === 'terms' && 'Terms of Service'}
                  {activeModal === 'risk' && 'Financial & Forex Risk Disclaimer'}
                  {activeModal === 'advertising' && 'Editorial & Advertising Disclosure'}
                </h3>
                <span className="text-[11px] text-neutral-400 font-mono">
                  OGWU LTD Compliance · Last Updated: October 2026
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1B2337] transition-colors cursor-pointer"
              aria-label="Close legal modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Document Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5 text-xs sm:text-sm leading-relaxed text-neutral-300 font-sans">
            {activeModal === 'privacy' && (
              <>
                <section className="space-y-2">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">1. Introduction & Overview</h4>
                  <p>
                    OGWU LTD (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), directed by Francis Ogwu, values your personal privacy. This Privacy Policy outlines our transparent data handling policies in compliance with global standards, including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and Google AdSense/Ads publisher requirements.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">2. Information We Collect</h4>
                  <p>
                    We collect minimal data necessary to deliver our portfolio, calculators, and communication channels:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-300">
                    <li><strong className="text-white">Voluntary Correspondence:</strong> Information provided when sending direct inquiries to <span className="font-mono text-emerald-300">ogwufrancis2002@gmail.com</span>.</li>
                    <li><strong className="text-white">Local Preferences:</strong> Non-tracking preferences such as calculator state and cookie consent stored locally in your browser (<span className="font-mono text-neutral-400">localStorage</span>).</li>
                    <li><strong className="text-white">Technical & Usage Logs:</strong> Anonymized server logs, browser type, device resolution, and referral paths to optimize page load times and crawler responsiveness.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">3. Cookies & Advertising Compliance</h4>
                  <p>
                    This website may utilize essential cookies to manage navigation states and external service analytics. In accordance with Google AdSense and third-party advertising network guidelines:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-300">
                    <li>Third-party vendors, including Google, use cookies to serve ads based on prior visits to this and other websites.</li>
                    <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads based on user visits to this site and/or other sites on the Internet.</li>
                    <li>Users may opt out of personalized advertising by visiting Google Ads Settings (<span className="font-mono text-sky-300">www.google.com/settings/ads</span>) or YourAdChoices.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">4. Data Subject Rights (GDPR & CCPA)</h4>
                  <p>
                    You have the right to request access, correction, or permanent deletion of any personal communications sent to us. We never sell, rent, or monetize your personal contact details with third-party data brokers.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">5. Contact Data Officer</h4>
                  <p>
                    For inquiries regarding this privacy framework, contact Francis Ogwu directly at <a href="mailto:ogwufrancis2002@gmail.com" className="text-emerald-400 underline font-mono">ogwufrancis2002@gmail.com</a>.
                  </p>
                </section>
              </>
            )}

            {activeModal === 'terms' && (
              <>
                <section className="space-y-2">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">1. Acceptance of Terms</h4>
                  <p>
                    By browsing, accessing, or using this digital portfolio and utilities operated by OGWU LTD, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service and all applicable international trade and internet laws.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">2. Intellectual Property Rights</h4>
                  <p>
                    All original architectural blueprints, 3D renderings, algorithmic models, software calculators, trade logs, video productions, and branding marks under OGWU LTD are the exclusive intellectual property of Francis Ogwu, unless otherwise specified. No automated scraping, unauthorized reproduction, or commercial resale of proprietary signal structures is permitted without explicit written license.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">3. External Links & Venture Outlets</h4>
                  <p>
                    This platform references external venture destinations, including:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-300">
                    <li><strong className="text-white">Telegram Signal Desk:</strong> Real-time SMC signal broadcasts hosted via Telegram (<span className="font-mono text-neutral-400">t.me/ogwulimited</span>).</li>
                    <li><strong className="text-white">Forte Biophilic Service Apartment:</strong> Architectural showcase deployed at <span className="font-mono text-neutral-400">forte-apartment.vercel.app</span>.</li>
                    <li><strong className="text-white">AI Animal Rescue Visuals:</strong> Official YouTube channel at <span className="font-mono text-neutral-400">@ogwu_limited</span>.</li>
                    <li><strong className="text-white">ChopHouse Enterprise:</strong> Digital restaurant & kitchen ordering platform at <span className="font-mono text-neutral-400">chop-house-kitchen.vercel.app</span>.</li>
                  </ul>
                  <p>
                    OGWU LTD does not control the server hosting infrastructure of third-party platforms outside of our direct application repositories.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">4. Limitation of Liability</h4>
                  <p>
                    Under no circumstances shall OGWU LTD or Francis Ogwu be held liable for any direct, indirect, consequential, or incidental losses resulting from trading decisions, market movements, service interruptions, or reliance on information presented on this website.
                  </p>
                </section>
              </>
            )}

            {activeModal === 'risk' && (
              <>
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                  <ShieldAlert size={20} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-display font-bold text-amber-300 text-sm">High-Risk Investment Warning (CFTC Rule 4.41 Compliant)</h5>
                    <p className="text-xs text-amber-200/90 mt-1">
                      Trading foreign exchange (Forex) on margin carries a high level of risk and may not be suitable for all investors.
                    </p>
                  </div>
                </div>

                <section className="space-y-2">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">1. Educational & Simulation Nature</h4>
                  <p>
                    All content, journal logs, quantitative calculations, and signal alerts presented on this site and associated Telegram channels are published strictly for educational, informational, and algorithmic research purposes. Nothing on this website constitutes financial, investment, or trading advice.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">2. Hypothetical & Simulated Performance Disclosure</h4>
                  <p>
                    Hypothetical or simulated performance results have certain inherent limitations. Unlike actual performance records, simulated results do not represent actual trading. Because trades have not actually been executed, results may have under- or over-compensated for market factors, such as liquidity constraints or slippage. No representation is made that any account will or is likely to achieve profits or losses similar to those demonstrated.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">3. Non-Negotiable Risk Budgeting</h4>
                  <p>
                    Foreign currency transactions involve substantial leverage, which can work against you as well as for you. Before deciding to trade foreign exchange, carefully consider your investment objectives, level of experience, and risk appetite. Never risk capital you cannot afford to lose.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">4. Independent Advice</h4>
                  <p>
                    If you have any doubts regarding financial markets, consult an independent, qualified financial advisor licensed in your jurisdiction.
                  </p>
                </section>
              </>
            )}

            {activeModal === 'advertising' && (
              <>
                <section className="space-y-2">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">1. Editorial Independence</h4>
                  <p>
                    OGWU LTD maintains complete editorial control over all research logs, trade statistics, architectural blueprints, and published software. Opinions expressed are solely those of the founder, Francis Ogwu.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">2. Third-Party Advertising & Monetization Disclosure</h4>
                  <p>
                    In accordance with Federal Trade Commission (FTC) guidelines and Google Publisher Policies:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-300">
                    <li>This site may display sponsor messages or contextual programmatic advertisements managed through verified ad networks (such as Google AdSense).</li>
                    <li>We clearly differentiate paid advertisements, sponsored placements, and organic editorial content.</li>
                    <li>Third-party advertisers do not influence our algorithmic risk formulas, lot calculations, or architectural standards.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h4 className="font-display font-bold text-white text-sm sm:text-base">3. Affiliate Links Disclosure</h4>
                  <p>
                    Certain links to recommended broker platforms, charting utilities, or software tools may generate an affiliate commission at zero additional cost to you. We only reference tools thoroughly audited in live trading environments.
                  </p>
                </section>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#1E293F] bg-[#111728]">
            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <Check size={14} className="text-emerald-400" />
              <span>Complies with Google Webmaster & Publisher Policies</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#1F2A3F] hover:bg-[#2A3854] text-white font-display text-xs font-semibold transition-colors cursor-pointer"
            >
              Close Document
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

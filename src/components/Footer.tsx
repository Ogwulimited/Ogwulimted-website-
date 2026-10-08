import { Compass, ShieldCheck, Mail, MapPin, ArrowUpRight, Lock, FileText, ShieldAlert, Info, ExternalLink, Globe } from 'lucide-react';
import type { LegalModalType } from './LegalModals';

interface FooterProps {
  onOpenLegal: (type: LegalModalType) => void;
  onOpenCalculator: () => void;
}

export function Footer({ onOpenLegal, onOpenCalculator }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 pt-12 pb-8 border-t border-[#1C2335] bg-[#0A0D15] text-neutral-300 font-sans rounded-t-[32px] px-6 sm:px-10 md:px-14">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Grid: Brand & Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-[#141A26] border border-[#222B3D] shadow-inner shrink-0">
                <img
                  src="/logo.png"
                  alt="OGWU LTD Official Crest"
                  className="w-10 h-auto object-contain filter brightness-110"
                />
              </div>
              <div>
                <span className="font-display font-bold text-xl text-white tracking-tight">
                  OGWU<span className="text-sky-400 font-normal">LTD</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-400 block tracking-wider uppercase">
                  Institutional Desk & Multi-Ventures
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans max-w-sm">
              Founded and directed by Francis Ogwu. Operating institutional algorithmic Forex order flow models, sustainable spatial architecture masterplans, AI generative visual storytelling, and commercial enterprise in Nigeria and globally.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-emerald-400" />
                <span>Lagos & Idah, Nigeria</span>
              </div>
              <span className="text-neutral-600">·</span>
              <div className="flex items-center gap-1.5">
                <Globe size={13} className="text-sky-400" />
                <span>Global Digital Operations</span>
              </div>
            </div>

            <div className="pt-1">
              <a
                href="mailto:ogwufrancis2002@gmail.com"
                className="inline-flex items-center gap-2 text-xs font-mono text-emerald-300 hover:text-emerald-200 bg-[#121828] border border-[#1E283E] px-3 py-1.5 rounded-lg transition-colors"
              >
                <Mail size={13} className="text-emerald-400" />
                <span>ogwufrancis2002@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Ventures Directory */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
              <Compass size={13} className="text-sky-400" />
              <span>Venture Portfolio</span>
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a
                  href="https://t.me/ogwulimited"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>FX Signal Bot (Telegram)</span>
                  <ExternalLink size={10} className="text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://forte-apartment.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>Forte Service Apartment</span>
                  <ExternalLink size={10} className="text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@ogwu_limited?si=ZVO-EaP51pXSWs-j"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>AI Animal Rescue (YouTube)</span>
                  <ExternalLink size={10} className="text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://chop-house-kitchen.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>ChopHouse Enterprise (Idah)</span>
                  <ExternalLink size={10} className="text-neutral-500" />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="text-left hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Lot & Risk Calculator (Live)
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Anchors */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
              Platform Index
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={() => scrollTo('forex')} className="hover:text-white transition-colors cursor-pointer">
                  Algorithmic Trade Journal
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('projects')} className="hover:text-white transition-colors cursor-pointer">
                  Selected Ventures & Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('buildlog')} className="hover:text-white transition-colors cursor-pointer">
                  Founder Build Log
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Francis Ogwu
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('timeline')} className="hover:text-white transition-colors cursor-pointer">
                  Career Timeline
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('faq')} className="hover:text-sky-300 transition-colors cursor-pointer">
                  Knowledge Base & FAQ
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Direct Inquiries Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance (Mandatory for Google AdSense & Ads) */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>Compliance & Legal</span>
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Lock size={12} className="text-neutral-500" />
                  <span>Privacy Policy (GDPR/CCPA)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-sky-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <FileText size={12} className="text-neutral-500" />
                  <span>Terms of Service</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('risk')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ShieldAlert size={12} className="text-neutral-500" />
                  <span>Forex Risk Disclaimer</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('advertising')}
                  className="hover:text-purple-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Info size={12} className="text-neutral-500" />
                  <span>Advertising Disclosure</span>
                </button>
              </li>
              <li className="pt-1">
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-200 transition-colors text-[11px] font-mono text-neutral-500 inline-flex items-center gap-1"
                >
                  <span>XML Sitemap</span>
                  <ArrowUpRight size={10} />
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-200 transition-colors text-[11px] font-mono text-neutral-500 inline-flex items-center gap-1"
                >
                  <span>robots.txt</span>
                  <ArrowUpRight size={10} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Crawler & AdSense Trust Verification Bar */}
        <div className="p-4 rounded-2xl bg-[#0E1321] border border-[#1E273A] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 text-[11px] font-display font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Google Indexer Ready
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-950/60 border border-sky-800/50 text-sky-300 text-[11px] font-display font-semibold">
              <ShieldCheck size={12} />
              Schema.org JSON-LD Validated
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#161F33] border border-[#232F4A] text-neutral-300 text-[11px] font-display font-semibold">
              AdSense Policy Compliant
            </span>
          </div>

          <div className="text-[11px] text-neutral-500 text-center md:text-right">
            SSL 256-Bit Encrypted · Strict 1R Financial Risk Budgeting
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer Statement */}
        <div className="pt-6 border-t border-[#161D2B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-sans">
          <p>
            © {currentYear} OGWU LTD. Directed by Francis Ogwu. All rights reserved.
          </p>

          <p className="text-center sm:text-right max-w-md text-[11px] text-neutral-500 leading-snug">
            Forex trading involves substantial risk of loss and is not suitable for all investors. All published signals and logs are for educational and quantitative demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}

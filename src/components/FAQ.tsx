import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ShieldCheck, Sparkles, Compass, TrendingUp, Building2, Utensils, Heart } from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  icon: typeof HelpCircle;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'Venture & Entity',
    question: 'What is OGWU LTD and what disciplines are encompassed?',
    answer: 'OGWU LTD is an executive multi-discipline desk and studio founded by Francis Ogwu. The firm operates across four primary areas: (1) Quantitative & Algorithmic Forex Trading utilizing Smart Money Concepts (SMC) and automated signal dispatch; (2) Sustainable & Biophilic Spatial Architecture, including residential modular developments; (3) Generative Media & Visual Content Production; and (4) Commercial Hospitality Ventures, spearheaded by ChopHouse Enterprise.',
    icon: Compass
  },
  {
    id: 'faq-02',
    category: 'Forex Desk & Signals',
    question: 'How does the Ogwulimted FX Signal Bot generate trade signals?',
    answer: 'The bot operates on a systematic algorithm scanning London and Asian liquidity sweep formations, fair value gaps (FVG), and order blocks across high-liquidity currency pairs (EUR/USD, GBP/USD, AUD/USD). Signals are mechanically filtered through strict institutional risk criteria with non-negotiable 1R risk caps, predetermined invalidation stop-losses, and multi-tier take-profit milestones before automated dispatch directly to the Telegram desk.',
    icon: TrendingUp
  },
  {
    id: 'faq-03',
    category: 'Risk Management',
    question: 'Is financial advice provided on this website or in the signal feed?',
    answer: 'No. All trade logs, execution statistics, calculators, and signal broadcasts published by OGWU LTD are strictly for educational, informational, and quantitative demonstration purposes. Trading leveraged financial instruments and foreign currencies carries substantial risk of capital loss. Past performance (whether real or simulated) is never a guarantee of future outcomes. Always trade strictly with risk capital you can afford to lose.',
    icon: ShieldCheck
  },
  {
    id: 'faq-04',
    category: 'Architecture & Design',
    question: 'What is the Forte Biophilic Service Apartment project?',
    answer: 'The Forte Service Apartment is a 1,200 m² luxury hospitality masterplan engineered by Francis Ogwu. It integrates biophilic design principles, passive airflow optimization, modular precast concrete-and-timber frames, and spatial sunlight simulation to deliver an energy-efficient, high-comfort residential destination. You can explore the live architectural interactive showcase at forte-apartment.vercel.app.',
    icon: Building2
  },
  {
    id: 'faq-05',
    category: 'Commercial Ventures',
    question: 'What is ChopHouse Enterprise and how can customers order food in Idah?',
    answer: 'ChopHouse Enterprise is a modern fast food restaurant and digital kitchen located in Idah, Kogi State, Nigeria. Specializing in handcrafted burgers, crispy fried chicken, savory rice dishes, and quick-dispatch meals, ChopHouse offers a streamlined online ordering portal at chop-house-kitchen.vercel.app for dine-in, customer takeaway, and local delivery.',
    icon: Utensils
  },
  {
    id: 'faq-06',
    category: 'Google AdSense & User Privacy',
    question: 'How does this site protect visitor privacy and comply with web standards?',
    answer: 'This website is engineered according to Google Webmaster guidelines, GDPR, and CCPA standards. We do not track or sell personal identifiable information (PII). All communications via ogwufrancis2002@gmail.com are encrypted in transit, and local browser storage is restricted solely to user preference persistence and cookie consent choices.',
    icon: Heart
  }
];

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-01');

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="py-12 md:py-16 relative px-6 sm:px-10 md:px-12 lg:px-14 rounded-[32px] bg-gradient-to-b from-[#111522] via-[#0E121D] to-[#0A0D15] border border-[#1E2638] shadow-2xl overflow-hidden font-sans"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 pb-6 border-b border-[#1E2638] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider mb-2 font-display font-semibold">
              <HelpCircle size={15} />
              <span>Indexer Verification & Knowledge Base</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Frequently Answered Questions
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 mt-2 max-w-xl font-sans leading-relaxed">
              Transparent institutional answers covering algorithmic signal execution, architectural blueprints, commercial ventures, and user compliance.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-[#121724] px-3.5 py-1.5 rounded-full border border-[#1E273A] shrink-0">
            <Sparkles size={13} className="text-emerald-400" />
            <span className="font-display font-semibold text-neutral-300">Schema.org FAQPage Validated</span>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            const Icon = faq.icon;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#121828] border-sky-500/40 shadow-lg'
                    : 'bg-[#0E1321] border-[#1E283C] hover:border-[#283754]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                          : 'bg-[#161F33] text-neutral-400 border border-[#222E49]'
                      }`}
                    >
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-0.5 font-semibold">
                        {faq.category}
                      </span>
                      <h3 className="font-display font-bold text-sm sm:text-base text-white tracking-tight leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-sky-500/20 text-sky-400'
                        : 'bg-[#161F33] text-neutral-400'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed border-t border-[#1C263B]">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

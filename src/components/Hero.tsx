import { motion } from 'motion/react';
import { Calculator, BookOpen, Compass, ArrowRight, ShieldCheck, TrendingUp, Layers } from 'lucide-react';

interface HeroProps {
  onOpenCalculator: () => void;
  onSelectDomain: (domain: 'all' | 'forex' | 'architecture' | 'media' | 'buildlog') => void;
}

export function Hero({ onOpenCalculator, onSelectDomain }: HeroProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 px-3.5 sm:px-8 md:px-14 lg:px-16 rounded-2xl sm:rounded-[28px] bg-gradient-to-b from-[#131724] via-[#0F131E] to-[#0A0D15] border border-[#1F273A] shadow-2xl overflow-hidden"
    >
      {/* Background Architectural Grid Lines & Atmospheric Lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl">
        {/* Top Kicker Label in Systematic Style */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#182030] border border-[#26334D] text-[11px] sm:text-xs font-mono text-emerald-400 mb-5 sm:mb-6 shadow-sm flex-wrap">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-wider uppercase font-semibold font-display">Francis Ogwu</span>
          <span className="text-neutral-500 hidden sm:inline">·</span>
          <span className="text-neutral-300">Quantitative Operator & Architect</span>
        </div>

        {/* Headline with Signature Systematic Syne Typography */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.1] mb-5 sm:mb-6">
          Systematic Currency Trading.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
            Precision Architecture & Media.
          </span>
        </h1>

        {/* Narrative Description perfectly fitted */}
        <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-3xl leading-relaxed mb-6 sm:mb-8 font-sans font-normal">
          Operating institutional order flow models with non-negotiable risk budgeting so single-trade exposure is strictly capped. Concurrently directing sustainable spatial architecture blueprints, visual media pipelines, and live documented builds.
        </p>

        {/* Executive Discipline Filter Switchers */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-8 sm:mb-10 flex-wrap">
          <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-display font-semibold">Filter:</span>
          <button
            onClick={() => onSelectDomain('forex')}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-display font-semibold hover:bg-emerald-900/60 transition-all cursor-pointer shadow-sm text-[11px] sm:text-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Forex Desk
          </button>
          <button
            onClick={() => onSelectDomain('architecture')}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#141926] hover:bg-[#1C2336] text-neutral-300 hover:text-white border border-[#232D42] font-display font-medium transition-colors cursor-pointer text-[11px] sm:text-xs"
          >
            Architecture
          </button>
          <button
            onClick={() => onSelectDomain('media')}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#141926] hover:bg-[#1C2336] text-neutral-300 hover:text-white border border-[#232D42] font-display font-medium transition-colors cursor-pointer text-[11px] sm:text-xs"
          >
            Media
          </button>
          <button
            onClick={() => onSelectDomain('buildlog')}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#141926] hover:bg-[#1C2336] text-neutral-300 hover:text-white border border-[#232D42] font-display font-medium transition-colors cursor-pointer text-[11px] sm:text-xs"
          >
            Build Log
          </button>
        </div>

        {/* Quantitative Architecture Specifications Cards (Systematic Style & Perfect Card Fit) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-10">
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0F1422] border border-[#1E273A] shadow-md flex flex-col justify-between group hover:border-emerald-500/40 transition-colors">
            <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase tracking-wider block font-medium">
              Risk Management
            </span>
            <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white tracking-tight my-1">
              Strict 1R
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 block pt-1 border-t border-[#1A2234]">
              Controlled exposure
            </span>
          </div>

          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0F1422] border border-[#1E273A] shadow-md flex flex-col justify-between group hover:border-sky-500/40 transition-colors">
            <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase tracking-wider block font-medium">
              Target Framework
            </span>
            <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-sky-400 tracking-tight my-1">
              1:2.5+
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 block pt-1 border-t border-[#1A2234]">
              Minimum planned R:R
            </span>
          </div>

          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0F1422] border border-[#1E273A] shadow-md flex flex-col justify-between group hover:border-emerald-500/40 transition-colors">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block font-medium">
              Execution Model
            </span>
            <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-400 tracking-tight my-1">
              SMC Flow
            </div>
            <span className="text-[11px] font-mono text-neutral-400 block pt-1 border-t border-[#1A2234]">
              Mechanical order flow
            </span>
          </div>

          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0F1422] border border-[#1E273A] shadow-md flex flex-col justify-between group hover:border-emerald-500/40 transition-colors">
            <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase tracking-wider block font-medium">
              Signal Desk
            </span>
            <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-emerald-400 tracking-tight my-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Active
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 block pt-1 border-t border-[#1A2234]">
              Live trade alerts
            </span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenCalculator}
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-display font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl cursor-pointer shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02]"
          >
            <Calculator size={16} />
            <span>Launch Lot Calculator</span>
          </button>

          <button
            onClick={() => {
              onSelectDomain('forex');
              scrollTo('forex');
            }}
            className="inline-flex items-center gap-2.5 bg-[#141926] hover:bg-[#1D2436] text-white border border-[#253047] hover:border-emerald-500/40 px-6 py-3.5 font-display font-semibold text-xs tracking-wider uppercase transition-all rounded-xl cursor-pointer"
          >
            <BookOpen size={16} />
            <span>View Trade Journal</span>
          </button>

          <button
            onClick={() => {
              onSelectDomain('architecture');
              scrollTo('projects');
            }}
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white px-5 py-3.5 font-display font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
          >
            <Compass size={16} />
            <span>Spatial Projects</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

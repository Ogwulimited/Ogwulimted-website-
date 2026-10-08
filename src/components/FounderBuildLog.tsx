import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight, CheckCircle2, Clock, GitCommit, ChevronRight, Layers, Terminal } from 'lucide-react';

interface BuildProject {
  id: string;
  title: string;
  category: 'Forex Tech' | 'Architecture' | 'Media Production' | 'Trading Venture';
  stage: 'Active Dev' | 'Blueprint Stage' | 'Production' | 'Live Documentation';
  progress: number; // 0 - 100
  summary: string;
  milestones: { name: string; done: boolean }[];
  lastUpdate: string;
  stackOrTools: string;
}

const UPCOMING_BUILDS: BuildProject[] = [
  {
    id: 'BUILD-01',
    title: 'Algorithmic Liquidity & Order Flow Engine',
    category: 'Forex Tech',
    stage: 'Active Dev',
    progress: 75,
    summary: 'Developing an institutional order flow detector tracking Asian and London liquidity sweeps, displacement candles, and fair value gap mitigations with disciplined execution.',
    milestones: [
      { name: 'High-frequency market tick data ingestion', done: true },
      { name: 'Algorithmic liquidity sweep detection logic', done: true },
      { name: 'Real-time Telegram signal push alerts', done: true },
      { name: 'Forward testing on live prop firm evaluation', done: false },
    ],
    lastUpdate: 'August 2026',
    stackOrTools: 'Focus: Live Systematic Signal Desk',
  },
  {
    id: 'BUILD-02',
    title: 'Biophilic Modular Residential Concept',
    category: 'Architecture',
    stage: 'Blueprint Stage',
    progress: 60,
    summary: 'Sustainable residential masterplan integrating passive cross-ventilation, timber-steel structural skeletons, and photorealistic 3D spatial simulations.',
    milestones: [
      { name: 'Solar path & passive ventilation study', done: true },
      { name: '2D Floorplans & structural grid design', done: true },
      { name: 'Photorealistic architectural render batch', done: false },
      { name: 'Local planning & engineering review', done: false },
    ],
    lastUpdate: 'July 2026',
    stackOrTools: 'Focus: Sustainable Masterplan Blueprint',
  },
  {
    id: 'BUILD-03',
    title: 'AI Animal Rescue Generative Series',
    category: 'Media Production',
    stage: 'Production',
    progress: 85,
    summary: 'High-retention AI-generated video series producing heartwarming animal rescue operations, wildlife sanctuary rehabilitation, and emotional storytelling for global audiences.',
    milestones: [
      { name: 'Generative AI video diffusion pipeline & prompt suite', done: true },
      { name: 'Emotional narrative arc & cinematic audio scoring', done: true },
      { name: 'Episode 01–03 production & YouTube broadcast cut', done: true },
      { name: 'Channel release & community impact series', done: false },
    ],
    lastUpdate: 'July 2026',
    stackOrTools: 'Focus: AI Generative Animal Rescue Series',
  },
  {
    id: 'BUILD-04',
    title: 'Documented $100K Prop Firm Evaluation',
    category: 'Trading Venture',
    stage: 'Live Documentation',
    progress: 90,
    summary: 'Transparent publicly documented funding evaluation tracking mechanical lot execution, drawdown avoidance, and daily trade slip logs.',
    milestones: [
      { name: 'Phase 1 profit target (+8.0% gain) hit', done: true },
      { name: 'Strict max daily drawdown rules observed', done: true },
      { name: 'Phase 2 evaluation (+5.0%) nearing completion', done: true },
      { name: 'Funded certificate & allocation payout', done: false },
    ],
    lastUpdate: 'August 2026',
    stackOrTools: 'Focus: Verified Prop Account Allocation',
  },
];

export function FounderBuildLog() {
  const [filter, setFilter] = useState<string>('ALL');

  const filtered = UPCOMING_BUILDS.filter(
    b => filter === 'ALL' || b.category === filter
  );

  return (
    <section id="buildlog" className="py-12 md:py-16 relative px-6 sm:px-10 md:px-12 lg:px-14 bg-gradient-to-b from-[#111522] via-[#0E121D] to-[#0A0D15] rounded-[28px] border border-[#1E2638] shadow-2xl overflow-hidden font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-10 border-b border-[#1E2638] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1.5 font-display font-semibold">
            <Sparkles size={15} />
            <span>Transparent Development & Progress Ledger</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Upcoming Projects & Build Log
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 max-w-2xl font-sans leading-relaxed">
            Live uncompromised documentation of Francis Ogwu's in-progress ventures across Forex quantitative utilities, architectural structures, and media releases.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {['ALL', 'Forex Tech', 'Architecture', 'Media Production', 'Trading Venture'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs font-display font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer border ${
                filter === cat
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold'
                  : 'bg-[#141926] text-neutral-400 border-transparent hover:text-white hover:bg-[#1C2336]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Documented Builds (Systematic Card Fitting & Syne Display Styling) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-5 sm:p-7 md:p-8 rounded-2xl bg-[#111624] hover:bg-[#141B2D] border border-[#1E273A] hover:border-purple-500/40 flex flex-col justify-between transition-colors shadow-xl"
          >
            <div>
              {/* Top Meta Line */}
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 pb-2.5 border-b border-[#1A2336]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-purple-400 font-display">
                    Project {project.id.replace('BUILD-0', '').replace('BUILD-', '')}
                  </span>
                  <span className="text-neutral-500">·</span>
                  <span className="font-display font-medium text-neutral-300">{project.category}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/70 border border-emerald-800/60 text-emerald-300 font-display">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {project.stage}
                </span>
              </div>

              {/* Title in Signature Syne Typography */}
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2 tracking-tight">
                {project.title}
              </h3>

              {/* Summary Description perfectly fitted */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5 sm:mb-6 font-sans">
                {project.summary}
              </p>

              {/* Progress Bar with Glowing Metric */}
              <div className="mb-5 sm:mb-6 p-3 sm:p-3.5 rounded-xl bg-[#0A0D15] border border-[#1A2234]">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-neutral-400 font-display text-[11px] font-medium">Milestone Progress</span>
                  <span className="font-display font-bold text-emerald-400 tracking-tight">{project.progress}% Complete</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#182030] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-sky-400 to-emerald-400 rounded-full transition-all duration-700"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Milestones Checklist */}
              <div className="space-y-2 mb-5 sm:mb-6">
                <span className="text-[11px] font-display text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
                  Documented Milestones:
                </span>
                {project.milestones.map((m, mIdx) => (
                  <div key={mIdx} className="flex items-start gap-2.5 text-xs font-sans">
                    {m.done ? (
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Clock size={15} className="text-neutral-500 shrink-0 mt-0.5" />
                    )}
                    <span className={m.done ? 'text-neutral-200' : 'text-neutral-500'}>
                      {m.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="pt-3.5 border-t border-[#1A2336] flex items-center justify-between text-xs text-neutral-400">
              <span className="truncate font-display font-medium text-neutral-300">{project.stackOrTools}</span>
              <span className="shrink-0 text-neutral-500 font-medium font-display ml-2">{project.lastUpdate}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

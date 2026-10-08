import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, MapPin, Globe, CheckCircle2 } from 'lucide-react';
import mentorPortrait from '../assets/images/mentor_headshot_1791216756106.jpg';

export function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="py-12 md:py-16 relative px-6 sm:px-10 md:px-12 lg:px-14 bg-gradient-to-b from-[#111522] via-[#0E121D] to-[#0A0D15] rounded-[28px] border border-[#1E2638] shadow-2xl overflow-hidden font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 pb-6 border-b border-[#1E2638] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1.5 font-display font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Executive Profile & Methodology</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              About Francis Ogwu
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <MapPin size={13} className="text-emerald-400" />
            <span>Based in Nigeria · Operating Globally</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
          {/* Framed Headshot Image with Verified Trader Badge */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#141926] border border-[#222B3D] shadow-2xl group relative">
              <img 
                src={imgError ? mentorPortrait : "/headshot.jpg"} 
                alt="Francis Ogwu" 
                className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-105 transition-all duration-700"
                onError={() => {
                  if (!imgError) {
                    setImgError(true);
                  }
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#090C12] via-[#090C12]/85 to-transparent">
                <div className="flex items-center gap-1.5 text-xs font-display font-bold text-white">
                  <span>Francis Ogwu</span>
                  <ShieldCheck size={14} className="text-emerald-400" />
                </div>
                <div className="text-[11px] font-mono text-emerald-400 mt-0.5">
                  Quantitative Forex Operator & Spatial Designer
                </div>
              </div>
            </div>
          </div>
          
          {/* Detailed Narrative */}
          <div className="space-y-6 text-neutral-300 font-sans flex-1">
            <p className="text-white text-xl sm:text-2xl font-display font-bold leading-snug tracking-tight">
              Operating at the intersection of systematic currency order flow and architectural spatial discipline.
            </p>
            
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
              My background in architecture completely dictates how I navigate capital markets: whether engineering a modular residential structure or calculating lot size on a 15-minute EUR/USD displacement, the foundational load must be quantified before the structure is built. In trading, that means treating risk budget as sacred, executing strictly around institutional liquidity pools, and never gambling on speculative hope.
            </p>
            
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
              Beyond the terminal charts and AutoCAD matrices, I build open automated tools, create digital media content, and maintain public, auditable records of all trading performance. This portal functions as an uncompromised live ledger of active positions, architectural research, and venture milestones.
            </p>

            {/* Core Pillars Cards (Systematic Architecture & Perfect Fitting) */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#111624] border border-[#1E2638] flex flex-col justify-between group hover:border-emerald-500/40 transition-colors shadow-md">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold mb-2">
                    <CheckCircle2 size={15} />
                    <span className="font-display font-bold text-sm tracking-tight text-white">Mathematical Position Sizing</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                    Every lot size is precisely calculated from stop loss pips to guarantee that maximum downside risk never exceeds the budgeted capital.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#111624] border border-[#1E2638] flex flex-col justify-between group hover:border-sky-500/40 transition-colors shadow-md">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold mb-2">
                    <CheckCircle2 size={15} />
                    <span className="font-display font-bold text-sm tracking-tight text-white">Structural Integrity</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                    Designing spatial architectures and software pipelines with modular clarity, sustainable materials, and rigorous systems constraints.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

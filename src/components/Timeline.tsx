import { motion } from 'motion/react';
import { Calendar, Briefcase, Award, TrendingUp, Compass, Cpu, Layers } from 'lucide-react';

const events = [
  {
    year: '2019',
    title: 'Spatial Architecture & Technical Drafting',
    category: 'Architecture Foundations',
    desc: 'Began rigorous spatial drafting, AutoCAD design, and study of physical load-bearing constraints and environmental airflow dynamics.'
  },
  {
    year: '2021',
    title: 'Digital Systems & Operations Architecture',
    category: 'Systems Engineering',
    desc: 'Transferred structural architectural principles into digital logic, automated workflows, and complex project management frameworks.'
  },
  {
    year: '2023',
    title: 'Generative AI Pipelines & Vision Automation',
    category: 'Computational Media',
    desc: 'Constructed custom video and spatial generation pipelines utilizing early LLMs and diffusion models for commercial asset production.'
  },
  {
    year: '2024',
    title: 'Institutional Forex & Mechanical SMC Trading',
    category: 'Quantitative Finance',
    desc: 'Applied probabilistic risk-management models and liquidity delivery algorithms to currency markets with strict fixed-dollar loss limits.'
  },
  {
    year: '2025',
    title: 'Prop Firm Evaluations & Algorithmic Tooling',
    category: 'Capital Management',
    desc: 'Documented multi-stage prop firm evaluations, developing algorithmic liquidity sweep alerts and risk-budget calculators.'
  },
  {
    year: '2026',
    title: 'OGWU Limited: Multi-Discipline Studio & Desk',
    category: 'Active Venture',
    desc: 'Synthesizing systematic currency trading, architectural masterplans, and media tech into a unified, transparent operating firm.'
  }
];

export function Timeline() {
  return (
    <section id="timeline" className="py-12 md:py-16 relative px-6 sm:px-10 md:px-12 lg:px-14 bg-gradient-to-b from-[#111522] via-[#0E121D] to-[#0A0D15] rounded-[28px] border border-[#1E2638] shadow-2xl overflow-hidden font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 pb-6 border-b border-[#1E2638] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-widest mb-1.5 font-display font-semibold">
              <Calendar size={14} />
              <span>Career Trajectory & Systems Evolution</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Experience & Milestones
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400 font-display font-semibold">
            2019 — 2026 Present
          </span>
        </div>

        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="hidden md:block absolute left-[110px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-sky-500/40 via-emerald-500/40 to-transparent" />
          <div className="md:hidden absolute left-[15px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-sky-500/40 via-emerald-500/40 to-transparent" />
          
          <div className="space-y-6">
            {events.map((event, i) => (
              <motion.div 
                key={event.year}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative flex flex-col md:flex-row gap-4 md:gap-10 md:items-start group"
              >
                {/* Year Marker */}
                <div className="md:w-[110px] shrink-0 pt-2 flex items-center md:justify-end gap-3 relative z-10 pl-8 md:pl-0">
                  <div className="md:hidden w-3 h-3 bg-[#0D1018] border-2 border-emerald-400 rounded-full absolute left-[9.5px] group-hover:scale-125 transition-transform" />
                  <span className="font-display text-sm tracking-wider text-neutral-400 font-bold group-hover:text-emerald-300 transition-colors">
                    {event.year}
                  </span>
                  <div className="hidden md:block w-3 h-3 bg-[#0D1018] border-2 border-emerald-400 rounded-full absolute -right-[6px] group-hover:scale-125 group-hover:bg-emerald-400 transition-all shadow-sm shadow-emerald-400/50" />
                </div>

                {/* Content Card with Systematic Card Styling */}
                <div className="flex-1 bg-[#111624] hover:bg-[#141B2D] border border-[#1E273A] hover:border-emerald-500/30 transition-all p-6 sm:p-7 relative ml-8 md:ml-0 rounded-2xl shadow-xl">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                    <span className="text-emerald-400 font-display font-semibold">{event.category}</span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors tracking-tight">
                    {event.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                    {event.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

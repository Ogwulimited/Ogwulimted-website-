import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Compass,
  Send,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Zap,
  Building2,
  Video,
  Cpu,
  CheckCircle2,
  TrendingUp,
  Layers,
  Play,
  Heart,
  Utensils
} from 'lucide-react';
import forexBotImage from '../assets/images/forex_signal_bot_1791389909150.jpg';
import forteApartmentImage from '../assets/images/forte_service_apartment_1791395102197.jpg';
import aiAnimalRescueImage from '../assets/images/ai_animal_rescue_1791396481346.jpg';
import chophouseImage from '../assets/images/chophouse_restaurant_1791466294956.jpg';

interface ProjectItem {
  id: string;
  title: string;
  status: string;
  category: string;
  desc: string;
  tags: string[];
  highlight: string;
  link?: string;
  linkLabel?: string;
  isTelegramCTA?: boolean;
  isApartmentCTA?: boolean;
  isYouTubeCTA?: boolean;
  isChopHouseCTA?: boolean;
  featureBullets: string[];
  metrics: { label: string; value: string }[];
  icon: typeof Compass;
}

const projects: ProjectItem[] = [
  {
    id: '01',
    title: 'Ogwulimted FX Signal Bot',
    status: 'LIVE ON TELEGRAM',
    category: 'Algorithmic Forex Desk',
    desc: 'Institutional Smart Money Concepts (SMC) signal desk scanning Asian and London liquidity sweeps across major currency pairs. Delivers mechanical entry triggers, calculated risk budgets, and take-profit targets directly to Telegram.',
    tags: ['Real-Time Signals', 'Smart Money Concepts', 'Institutional Execution', '1R Risk Control'],
    highlight: '67% Realized Win Rate · 1:3.2 Avg R:R',
    link: 'https://t.me/ogwulimited',
    linkLabel: 'Join Ogwulimted on Telegram',
    isTelegramCTA: true,
    featureBullets: [
      'Real-time Asian & London liquidity sweep alerts',
      'Calculated stop-loss protection & risk parameters',
      'Automated signal dispatch directly to subscribers'
    ],
    metrics: [
      { label: 'Win Rate', value: '67%' },
      { label: 'Average R:R', value: '1:3.2' },
      { label: 'Delivery', value: '< 2s' }
    ],
    icon: TrendingUp
  },
  {
    id: '02',
    title: 'Forte Biophilic Service Apartment',
    status: 'LIVE SITE',
    category: 'Spatial Architecture & Masterplan',
    desc: 'Luxury architectural masterplan applying passive cross-ventilation, modular concrete-timber structural frames, and spatial sunlight simulations for high-end hospitality residences.',
    tags: ['Modular Architecture', 'Passive Airflow', 'Solar Modeling', '3D Spatial Visualization'],
    highlight: '1,200 sqm Modular Layout',
    link: 'https://forte-apartment.vercel.app/',
    linkLabel: 'Explore Forte Apartment',
    isApartmentCTA: true,
    featureBullets: [
      'Passive airflow & spatial solar path optimization',
      'Modular precast concrete and timber framework',
      'Photorealistic 3D spatial renders & construction set'
    ],
    metrics: [
      { label: 'Floor Area', value: '1,200 m²' },
      { label: 'Solar Array', value: '8 kW' },
      { label: 'Efficiency', value: '94%' }
    ],
    icon: Building2
  },
  {
    id: '03',
    title: 'AI Animal Rescue Visuals',
    status: 'ON YOUTUBE',
    category: 'Generative AI & Animal Rescue',
    desc: 'High-retention generative AI video channel creating heartwarming cinematic stories of animal rescues, sanctuary care, and emotional wildlife recovery transformations.',
    tags: ['Generative AI Video', 'Animal Rescue Stories', 'Cinematic 4K Shorts', 'Emotional Storytelling'],
    highlight: 'Heartfelt AI Rescue Series',
    link: 'https://youtube.com/@ogwu_limited?si=ZVO-EaP51pXSWs-j',
    linkLabel: 'Watch on YouTube',
    isYouTubeCTA: true,
    featureBullets: [
      'Heartfelt AI-generated animal rescue narratives',
      'Inspiring rehabilitation & sanctuary care stories',
      'Cinematic 4K visual shorts published to YouTube'
    ],
    metrics: [
      { label: 'Focus', value: 'Animal Rescue' },
      { label: 'Format', value: '4K AI Video' },
      { label: 'Channel', value: 'YouTube' }
    ],
    icon: Heart
  },
  {
    id: '04',
    title: 'ChopHouse Enterprise',
    status: 'LIVE SITE',
    category: 'Fast Food Restaurant · Idah',
    desc: 'Popular modern fast food restaurant in Idah, Kogi State, serving delicious handcrafted burgers, crispy fried chicken, savory meals, and providing quick digital food ordering.',
    tags: ['Fast Food Restaurant', 'Online Food Ordering', 'Idah, Kogi State', 'Dine-In & Takeaway'],
    highlight: 'Popular Idah Fast Food',
    link: 'https://chop-house-kitchen.vercel.app',
    linkLabel: 'Order Food at ChopHouse',
    isChopHouseCTA: true,
    featureBullets: [
      'Freshly prepared burgers, signature fried chicken & sides',
      'Fast online food ordering for Idah residents & students',
      'Prompt kitchen dispatch, dine-in & takeaway delivery'
    ],
    metrics: [
      { label: 'Location', value: 'Idah' },
      { label: 'Specialty', value: 'Fast Food' },
      { label: 'Orders', value: 'Live Online' }
    ],
    icon: Utensils
  }
];

export function Projects() {
  return (
    <section
      id="projects"
      className="py-12 md:py-16 relative px-6 sm:px-10 md:px-12 lg:px-14 rounded-[32px] bg-gradient-to-b from-[#111522] via-[#0E121D] to-[#0A0D15] border border-[#1E2638] shadow-2xl overflow-hidden font-sans"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-sky-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-emerald-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between pb-8 mb-10 border-b border-[#1E2638] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider mb-2 font-display font-semibold">
            <Compass size={15} />
            <span>Multi-Discipline Portfolio · Architecture, Forex & Systems</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Selected Works & Spatial Blueprints
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 max-w-2xl font-sans leading-relaxed">
            Rigorous systems engineering applied to financial markets, architectural structures, and media automation pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-[#121724] px-3.5 py-1.5 rounded-full border border-[#1E273A]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-display font-semibold text-neutral-300">4 Audited Ventures</span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((p, idx) => {
          if (p.isTelegramCTA) {
            {/* FLAGSHIP HERO CTA CARD: Ogwulimted FX Signal Bot */}
            return (
              <motion.a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative rounded-3xl bg-[#0D121F] border border-[#233554] hover:border-[#2AABEE] transition-all duration-500 shadow-2xl hover:shadow-[0_20px_50px_-15px_rgba(42,171,238,0.35)] overflow-hidden flex flex-col justify-between cursor-pointer ring-1 ring-[#2AABEE]/20 hover:ring-[#2AABEE]/50"
              >
                {/* Hero Forex Visual Header with Ambient Gradient Overlay */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-950">
                  <img
                    src={forexBotImage}
                    alt="Ogwulimted FX Signal Bot - Institutional Forex Trading Desk"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle glass and dark gradient overlay for typographic legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D121F] via-[#0D121F]/40 to-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0D121F]/80 via-transparent to-transparent" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] sm:text-xs font-display font-semibold shadow-md">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#2AABEE] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <Send size={10} className="-translate-x-0.5 translate-y-0.5" />
                      </div>
                      <span>Official Signal Desk</span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2AABEE]/20 border border-[#2AABEE]/50 text-[#2AABEE] font-display backdrop-blur-md shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2AABEE] animate-pulse" />
                      {p.status}
                    </span>
                  </div>

                  {/* Bottom Overlay Pill on Image */}
                  <div className="absolute bottom-3 left-3.5 sm:left-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-emerald-950/85 backdrop-blur-md border border-emerald-800/80 text-emerald-300 text-[11px] sm:text-xs font-display font-bold shadow-lg">
                      <Sparkles size={12} className="text-emerald-400" />
                      {p.highlight}
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Verified Desk Label */}
                    <div className="flex items-center justify-between gap-3 text-xs mb-2 text-neutral-400">
                      <span className="font-display font-medium text-sky-400">{p.category}</span>
                      <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-display font-semibold">
                        <ShieldCheck size={13} />
                        Verified SMC Signals
                      </span>
                    </div>

                    {/* Main Headline */}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white group-hover:text-[#2AABEE] transition-colors tracking-tight mb-2.5 sm:mb-3">
                      {p.title}
                    </h3>

                    {/* Engaging Pitch Description */}
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans mb-4 sm:mb-5">
                      {p.desc}
                    </p>

                    {/* Value Proposition Highlights */}
                    <div className="space-y-2 mb-5 sm:mb-6">
                      {p.featureBullets.map((bullet, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs font-sans text-neutral-200">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                            <CheckCircle2 size={11} />
                          </div>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metric Highlights Grid */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl sm:rounded-2xl bg-[#090D17] border border-[#1A2336] mb-5 sm:mb-6 text-center">
                      {p.metrics.map((m, i) => (
                        <div key={i} className="py-0.5 sm:py-1">
                          <span className="text-[10px] text-neutral-500 uppercase block font-display font-semibold tracking-wider">
                            {m.label}
                          </span>
                          <span className="text-sm sm:text-base font-display font-bold text-white tracking-tight">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* HIGH-CONVERTING OPTIMIZED VISIT BOT CTA CAPSULE */}
                  <div>
                    <div className="w-full py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#2AABEE] via-[#229ED9] to-[#1E88E5] text-white flex items-center justify-between gap-3 shadow-lg shadow-sky-950/50 group-hover:shadow-[0_12px_32px_rgba(42,171,238,0.45)] group-hover:brightness-105 transition-all">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner">
                          <Send size={14} className="-translate-x-0.5 translate-y-0.5" />
                        </div>
                        <div className="truncate">
                          <span className="font-display font-bold text-xs sm:text-sm tracking-wide block truncate leading-tight">
                            Open Ogwulimted Signal Bot
                          </span>
                          <span className="text-[11px] text-white/80 font-sans block truncate">
                            Instant Access · Live SMC Signals
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 font-display font-bold text-[11px] sm:text-xs bg-black/25 hover:bg-black/35 px-3 py-1.5 rounded-lg transition-colors shrink-0">
                        <span>Launch</span>
                        <ArrowUpRight size={13} />
                      </div>
                    </div>

                    {/* Tags Footer */}
                    <div className="mt-3.5 pt-3 border-t border-[#1A2336] flex items-center justify-between text-xs text-neutral-400">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {p.tags.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-[#131929] border border-[#1F293F] text-neutral-300 text-[11px] font-display font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          }

          if (p.isApartmentCTA) {
            {/* FLAGSHIP HERO CTA CARD: Forte Biophilic Service Apartment */}
            return (
              <motion.a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative rounded-3xl bg-[#0D121F] border border-[#233554] hover:border-emerald-400 transition-all duration-500 shadow-2xl hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.35)] overflow-hidden flex flex-col justify-between cursor-pointer ring-1 ring-emerald-500/20 hover:ring-emerald-500/50"
              >
                {/* Hero Architecture Visual Header with Ambient Gradient Overlay */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-950">
                  <img
                    src={forteApartmentImage}
                    alt="Forte Biophilic Service Apartment - Luxury Spatial Masterplan"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle glass and dark gradient overlay for typographic legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D121F] via-[#0D121F]/40 to-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0D121F]/80 via-transparent to-transparent" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] sm:text-xs font-display font-semibold shadow-md">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 shrink-0 shadow-sm">
                        <Building2 size={11} className="text-slate-950" />
                      </div>
                      <span>Forte Living Experience</span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-display backdrop-blur-md shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {p.status}
                    </span>
                  </div>

                  {/* Bottom Overlay Pill on Image */}
                  <div className="absolute bottom-3 left-3.5 sm:left-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-emerald-950/85 backdrop-blur-md border border-emerald-800/80 text-emerald-300 text-[11px] sm:text-xs font-display font-bold shadow-lg">
                      <Sparkles size={12} className="text-emerald-400" />
                      {p.highlight}
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Verified Label */}
                    <div className="flex items-center justify-between gap-3 text-xs mb-2 text-neutral-400">
                      <span className="font-display font-medium text-emerald-400">{p.category}</span>
                      <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-display font-semibold">
                        <ShieldCheck size={13} />
                        Architectural Specification
                      </span>
                    </div>

                    {/* Main Headline */}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white group-hover:text-emerald-300 transition-colors tracking-tight mb-2.5 sm:mb-3">
                      {p.title}
                    </h3>

                    {/* Engaging Pitch Description */}
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans mb-4 sm:mb-5">
                      {p.desc}
                    </p>

                    {/* Value Proposition Highlights */}
                    <div className="space-y-2 mb-5 sm:mb-6">
                      {p.featureBullets.map((bullet, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs font-sans text-neutral-200">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                            <CheckCircle2 size={11} />
                          </div>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metric Highlights Grid */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl sm:rounded-2xl bg-[#090D17] border border-[#1A2336] mb-5 sm:mb-6 text-center">
                      {p.metrics.map((m, i) => (
                        <div key={i} className="py-0.5 sm:py-1">
                          <span className="text-[10px] text-neutral-500 uppercase block font-display font-semibold tracking-wider">
                            {m.label}
                          </span>
                          <span className="text-sm sm:text-base font-display font-bold text-white tracking-tight">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* HIGH-CONVERTING OPTIMIZED VISIT SITE CTA CAPSULE */}
                  <div>
                    <div className="w-full py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white flex items-center justify-between gap-3 shadow-lg shadow-emerald-950/50 group-hover:shadow-[0_12px_32px_rgba(16,185,129,0.45)] group-hover:brightness-105 transition-all">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner">
                          <Building2 size={15} />
                        </div>
                        <div className="truncate">
                          <span className="font-display font-bold text-xs sm:text-sm tracking-wide block truncate leading-tight">
                            Explore Forte Service Apartment
                          </span>
                          <span className="text-[11px] text-emerald-100 font-sans block truncate">
                            Live Interactive Walkthrough & Specification
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 font-display font-bold text-[11px] sm:text-xs bg-black/25 hover:bg-black/35 px-3 py-1.5 rounded-lg transition-colors shrink-0">
                        <span>Visit Site</span>
                        <ArrowUpRight size={13} />
                      </div>
                    </div>

                    {/* Tags Footer */}
                    <div className="mt-3.5 pt-3 border-t border-[#1A2336] flex items-center justify-between text-xs text-neutral-400">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {p.tags.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-[#131929] border border-[#1F293F] text-neutral-300 text-[11px] font-display font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          }

          if (p.isYouTubeCTA) {
            {/* FLAGSHIP MEDIA CTA CARD: Autonomous Visual Content Engine (YouTube Channel) */}
            return (
              <motion.a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative rounded-3xl bg-[#0D121F] border border-[#233554] hover:border-red-500/70 transition-all duration-500 shadow-2xl hover:shadow-[0_20px_50px_-15px_rgba(239,68,68,0.35)] overflow-hidden flex flex-col justify-between cursor-pointer ring-1 ring-red-500/20 hover:ring-red-500/50"
              >
                {/* Hero Media Visual Header with Ambient Gradient Overlay */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-950">
                  <img
                    src={aiAnimalRescueImage}
                    alt="AI Animal Rescue Channel - Heartfelt Storytelling on YouTube"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle glass and dark gradient overlay for typographic legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D121F] via-[#0D121F]/40 to-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0D121F]/80 via-transparent to-transparent" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] sm:text-xs font-display font-semibold shadow-md">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-red-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                        <Play size={10} className="fill-white translate-x-0.5" />
                      </div>
                      <span>Animal Rescue Channel</span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/20 border border-red-500/50 text-red-300 font-display backdrop-blur-md shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      {p.status}
                    </span>
                  </div>

                  {/* Bottom Overlay Pill on Image */}
                  <div className="absolute bottom-3 left-3.5 sm:left-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-red-950/85 backdrop-blur-md border border-red-800/80 text-red-200 text-[11px] sm:text-xs font-display font-bold shadow-lg">
                      <Heart size={12} className="text-red-400 fill-red-400" />
                      {p.highlight}
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Verified Label */}
                    <div className="flex items-center justify-between gap-3 text-xs mb-2 text-neutral-400">
                      <span className="font-display font-medium text-red-400">{p.category}</span>
                      <span className="inline-flex items-center gap-1 text-red-400 text-[11px] font-display font-semibold">
                        <ShieldCheck size={13} />
                        Verified YouTube Channel
                      </span>
                    </div>

                    {/* Main Headline */}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white group-hover:text-red-400 transition-colors tracking-tight mb-2.5 sm:mb-3">
                      {p.title}
                    </h3>

                    {/* Engaging Pitch Description */}
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans mb-4 sm:mb-5">
                      {p.desc}
                    </p>

                    {/* Value Proposition Highlights */}
                    <div className="space-y-2 mb-5 sm:mb-6">
                      {p.featureBullets.map((bullet, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs font-sans text-neutral-200">
                          <div className="w-4 h-4 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                            <CheckCircle2 size={11} />
                          </div>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metric Highlights Grid */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl sm:rounded-2xl bg-[#090D17] border border-[#1A2336] mb-5 sm:mb-6 text-center">
                      {p.metrics.map((m, i) => (
                        <div key={i} className="py-0.5 sm:py-1">
                          <span className="text-[10px] text-neutral-500 uppercase block font-display font-semibold tracking-wider">
                            {m.label}
                          </span>
                          <span className="text-sm sm:text-base font-display font-bold text-white tracking-tight">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* HIGH-CONVERTING OPTIMIZED YOUTUBE CTA CAPSULE */}
                  <div>
                    <div className="w-full py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white flex items-center justify-between gap-3 shadow-lg shadow-red-950/50 group-hover:shadow-[0_12px_32px_rgba(239,68,68,0.45)] group-hover:brightness-105 transition-all">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner">
                          <Play size={13} className="fill-white translate-x-0.5" />
                        </div>
                        <div className="truncate">
                          <span className="font-display font-bold text-xs sm:text-sm tracking-wide block truncate leading-tight">
                            Watch Animal Rescue Stories
                          </span>
                          <span className="text-[11px] text-white/80 font-sans block truncate">
                            Subscribe to @ogwu_limited on YouTube
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 font-display font-bold text-[11px] sm:text-xs bg-black/25 hover:bg-black/35 px-3 py-1.5 rounded-lg transition-colors shrink-0">
                        <span>Subscribe</span>
                        <ArrowUpRight size={13} />
                      </div>
                    </div>

                    {/* Tags Footer */}
                    <div className="mt-3.5 pt-3 border-t border-[#1A2336] flex items-center justify-between text-xs text-neutral-400">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {p.tags.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-[#131929] border border-[#1F293F] text-neutral-300 text-[11px] font-display font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          }

          if (p.isChopHouseCTA) {
            {/* FLAGSHIP HOSPITALITY CTA CARD: ChopHouse Enterprise (Fast Food Restaurant in Idah) */}
            return (
              <motion.a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative rounded-3xl bg-[#0D121F] border border-[#233554] hover:border-amber-400 transition-all duration-500 shadow-2xl hover:shadow-[0_20px_50px_-15px_rgba(245,158,11,0.35)] overflow-hidden flex flex-col justify-between cursor-pointer ring-1 ring-amber-500/20 hover:ring-amber-500/50"
              >
                {/* Hero Fast Food Visual Header with Ambient Warm Gradient Overlay */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-950">
                  <img
                    src={chophouseImage}
                    alt="ChopHouse Enterprise - Fast Food Restaurant & Digital Kitchen in Idah"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle glass and dark gradient overlay for typographic legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D121F] via-[#0D121F]/40 to-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0D121F]/80 via-transparent to-transparent" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] sm:text-xs font-display font-semibold shadow-md">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 shrink-0 shadow-sm">
                        <Utensils size={11} className="text-slate-950" />
                      </div>
                      <span>ChopHouse Express & Kitchen</span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 border border-amber-500/50 text-amber-300 font-display backdrop-blur-md shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      {p.status}
                    </span>
                  </div>

                  {/* Bottom Overlay Pill on Image */}
                  <div className="absolute bottom-3 left-3.5 sm:left-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-amber-950/85 backdrop-blur-md border border-amber-800/80 text-amber-200 text-[11px] sm:text-xs font-display font-bold shadow-lg">
                      <Sparkles size={12} className="text-amber-400" />
                      {p.highlight}
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Verified Label */}
                    <div className="flex items-center justify-between gap-3 text-xs mb-2 text-neutral-400">
                      <span className="font-display font-medium text-amber-400">{p.category}</span>
                      <span className="inline-flex items-center gap-1 text-amber-400 text-[11px] font-display font-semibold">
                        <ShieldCheck size={13} />
                        Verified Digital Kitchen
                      </span>
                    </div>

                    {/* Main Headline */}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white group-hover:text-amber-400 transition-colors tracking-tight mb-2.5 sm:mb-3">
                      {p.title}
                    </h3>

                    {/* Engaging Pitch Description */}
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans mb-4 sm:mb-5">
                      {p.desc}
                    </p>

                    {/* Value Proposition Highlights */}
                    <div className="space-y-2 mb-5 sm:mb-6">
                      {p.featureBullets.map((bullet, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs font-sans text-neutral-200">
                          <div className="w-4 h-4 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                            <CheckCircle2 size={11} />
                          </div>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metric Highlights Grid */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl sm:rounded-2xl bg-[#090D17] border border-[#1A2336] mb-5 sm:mb-6 text-center">
                      {p.metrics.map((m, i) => (
                        <div key={i} className="py-0.5 sm:py-1">
                          <span className="text-[10px] text-neutral-500 uppercase block font-display font-semibold tracking-wider">
                            {m.label}
                          </span>
                          <span className="text-sm sm:text-base font-display font-bold text-white tracking-tight">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* HIGH-CONVERTING OPTIMIZED VISIT SITE CTA CAPSULE */}
                  <div>
                    <div className="w-full py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-500 text-white flex items-center justify-between gap-3 shadow-lg shadow-amber-950/50 group-hover:shadow-[0_12px_32px_rgba(245,158,11,0.45)] group-hover:brightness-105 transition-all">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner">
                          <Utensils size={15} />
                        </div>
                        <div className="truncate">
                          <span className="font-display font-bold text-xs sm:text-sm tracking-wide block truncate leading-tight">
                            Order Food at ChopHouse
                          </span>
                          <span className="text-[11px] text-amber-100 font-sans block truncate">
                            Fast Online Ordering · Burgers, Chicken & Meals in Idah
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 font-display font-bold text-[11px] sm:text-xs bg-black/25 hover:bg-black/35 px-3 py-1.5 rounded-lg transition-colors shrink-0">
                        <span>Order Now</span>
                        <ArrowUpRight size={13} />
                      </div>
                    </div>

                    {/* Tags Footer */}
                    <div className="mt-3.5 pt-3 border-t border-[#1A2336] flex items-center justify-between text-xs text-neutral-400">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {p.tags.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-[#131929] border border-[#1F293F] text-neutral-300 text-[11px] font-display font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          }

          {/* Standard Architecture & Systems Venture Cards */}
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group rounded-3xl bg-[#111624] hover:bg-[#131A2B] border border-[#1E273A] hover:border-emerald-500/40 p-5 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl relative overflow-hidden"
            >
              {/* Top ambient hover glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 group-hover:bg-emerald-500/10 rounded-full blur-2xl transition-all pointer-events-none" />

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-3 text-xs mb-3.5 pb-2.5 border-b border-[#1A2336]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sky-400 font-display">{p.id}</span>
                    <span className="text-neutral-500">·</span>
                    <span className="text-neutral-300 font-display font-medium">{p.category}</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/70 border border-emerald-800/60 text-emerald-300 font-display">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {p.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-emerald-300 transition-colors mb-2.5 tracking-tight">
                  {p.title}
                </h3>

                {/* Star Highlight Tag */}
                <div className="inline-block px-3 py-1 rounded-lg bg-[#162032] border border-[#23314D] text-emerald-400 text-xs font-display font-semibold mb-4 tracking-wide">
                  ★ {p.highlight}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5 font-sans">
                  {p.desc}
                </p>

                {/* Feature Highlights */}
                <div className="space-y-2 mb-5">
                  {p.featureBullets.map((bullet, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs font-sans text-neutral-300">
                      <div className="w-4 h-4 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                        <CheckCircle2 size={11} />
                      </div>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Metrics Highlight Strip */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl sm:rounded-2xl bg-[#0A0D15] border border-[#1A2234] mb-5 sm:mb-6 text-center">
                  {p.metrics.map((m, i) => (
                    <div key={i} className="py-0.5 sm:py-1">
                      <span className="text-[10px] text-neutral-500 uppercase block font-display font-semibold tracking-wider">
                        {m.label}
                      </span>
                      <span className="text-xs sm:text-sm font-display font-bold text-white tracking-tight">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Footer */}
              <div className="pt-3.5 border-t border-[#1A2336] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {p.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-[#131929] border border-[#1F293F] text-neutral-300 text-[11px] font-display font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-sky-400 font-display font-semibold group-hover:translate-x-0.5 transition-transform shrink-0 text-xs">
                  <span>Explore Project</span>
                  <ArrowUpRight size={13} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

import { motion } from 'motion/react';
import { Home, User, TrendingUp, Briefcase, Calendar, Compass, Sparkles, BookOpen, Mail, Moon, Sun, Calculator, ArrowUpRight, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SidebarProps {
  onOpenCalculator: () => void;
  onSelectDomain?: (domain: 'all' | 'forex' | 'architecture' | 'media' | 'buildlog') => void;
}

export function Sidebar({ onOpenCalculator, onSelectDomain }: SidebarProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(document.documentElement.classList.contains('dark'));
  };

  const links = [
    { id: 'hero', label: 'Overview', icon: <Home size={16} strokeWidth={2} />, domain: 'all' as const },
    { id: 'about', label: 'Founder Bio', icon: <User size={16} strokeWidth={2} />, domain: 'all' as const },
    { id: 'forex', label: 'Forex Trading Desk', icon: <TrendingUp size={16} strokeWidth={2} />, domain: 'forex' as const, highlight: true },
    { id: 'projects', label: 'Architecture & Tech', icon: <Briefcase size={16} strokeWidth={2} />, domain: 'architecture' as const },
    { id: 'buildlog', label: 'Founder Build Log', icon: <Sparkles size={16} strokeWidth={2} />, domain: 'buildlog' as const },
    { id: 'timeline', label: 'Experience Timeline', icon: <Calendar size={16} strokeWidth={2} />, domain: 'all' as const },
    { id: 'faq', label: 'FAQ & Compliance', icon: <HelpCircle size={16} strokeWidth={2} />, domain: 'all' as const },
    { id: 'contact', label: 'Direct Inquiry', icon: <Mail size={16} strokeWidth={2} />, domain: 'all' as const },
  ];

  const handleNavClick = (id: string, domain?: 'all' | 'forex' | 'architecture' | 'media' | 'buildlog') => {
    if (domain && onSelectDomain && domain !== 'all') {
      onSelectDomain(domain);
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r border-[#1C2230] bg-[#0C0F17]/95 backdrop-blur-xl flex flex-col justify-between p-5 md:p-6 shrink-0 relative z-20 md:h-screen md:sticky md:top-0">
      <div>
        {/* Brand header with crest and status in Systematic typography */}
        <div className="mb-6 flex items-start justify-between gap-3 pb-5 border-b border-[#1C2230]">
          <div className="flex flex-col gap-1.5 pt-0.5">
            <h1 className="text-2xl font-bold tracking-tight text-white font-display">
              OGWU<span className="text-sky-400 font-normal">LTD</span>
            </h1>
            <p className="text-[11px] font-display font-semibold text-neutral-400 tracking-wider uppercase">
              Ventures · Forex · Architecture
            </p>
            
            {/* Available for Projects status badge */}
            <div className="flex items-center mt-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-display font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Projects
              </span>
            </div>
          </div>

          {/* Crest Logo */}
          <div className="p-1 rounded-xl bg-[#141A26] border border-[#222B3D] shadow-inner shrink-0">
            <img 
              src="/logo.png" 
              alt="Ogwu Limited Crest" 
              className="w-14 h-auto object-contain filter brightness-110 drop-shadow"
            />
          </div>
        </div>

        {/* Global Lot Calculator Action Trigger */}
        <div className="space-y-2 mb-6">
          <button
            onClick={onOpenCalculator}
            className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-display text-xs font-bold tracking-wider transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-between cursor-pointer border border-emerald-500/30"
          >
            <div className="flex items-center gap-2">
              <Calculator size={15} />
              <span>Lot & Risk Calculator</span>
            </div>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono font-semibold">
              Forex & Crypto
            </span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="space-y-1 hidden md:block">
          {links.map((link) => {
            const isHighlight = link.highlight;
            
            return (
              <motion.button
                key={link.id}
                onClick={() => handleNavClick(link.id, link.domain)}
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all text-xs font-display font-semibold tracking-wide cursor-pointer border ${
                  isHighlight
                    ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300 hover:bg-emerald-900/40 hover:text-emerald-200'
                    : 'bg-[#111520]/60 border-transparent hover:border-[#222B3D] text-neutral-300 hover:text-white hover:bg-[#161C2B]'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isHighlight ? 'text-emerald-400' : 'text-neutral-400'}>
                    {link.icon}
                  </span>
                  <span className="truncate">{link.label}</span>
                </div>
                {isHighlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Mobile Horizontal Navigation */}
        <div className="flex md:hidden overflow-x-auto gap-2 pb-2 scrollbar-none">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id, link.domain)}
              className="px-3 py-1.5 rounded-lg bg-[#141926] text-neutral-300 text-xs font-display font-semibold whitespace-nowrap flex items-center gap-1.5 shrink-0 border border-[#222B3D]"
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer System Status & Dark/Light Toggle */}
      <div className="pt-4 border-t border-[#1C2230] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[11px] font-display font-semibold text-neutral-400">
            Francis Ogwu
          </span>
          <span className="text-[10px] font-mono text-neutral-500">
            System Online · 2026
          </span>
        </div>
        <button
          onClick={toggleDark}
          className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[#161C2B] border border-transparent hover:border-[#222B3D] transition-colors cursor-pointer"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </aside>
  );
}

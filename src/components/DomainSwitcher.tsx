import { motion } from 'motion/react';
import { Calculator, TrendingUp, Compass, Video, Sparkles, Layers } from 'lucide-react';

export type DomainType = 'all' | 'forex' | 'architecture' | 'media' | 'buildlog';

interface DomainSwitcherProps {
  activeDomain: DomainType;
  onSelectDomain: (domain: DomainType) => void;
  onOpenCalculator: () => void;
}

export function DomainSwitcher({
  activeDomain,
  onSelectDomain,
  onOpenCalculator,
}: DomainSwitcherProps) {
  const domains: { id: DomainType; label: string; icon: typeof TrendingUp; badge?: string }[] = [
    { id: 'all', label: 'All Disciplines', icon: Layers },
    { id: 'forex', label: 'Forex Desk & Journal', icon: TrendingUp, badge: 'Primary' },
    { id: 'architecture', label: 'Architecture & Spatial', icon: Compass },
    { id: 'media', label: 'Social Media & Content', icon: Video },
    { id: 'buildlog', label: 'Founder Build Log', icon: Sparkles, badge: 'Live Dev' },
  ];

  return (
    <div className="sticky top-4 z-30 py-2.5 px-4 md:px-5 rounded-2xl bg-[#0D111A]/95 backdrop-blur-xl border border-[#1E2638] shadow-xl transition-colors">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Domain Selection Segmented Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {domains.map((d) => {
            const Icon = d.icon;
            const isActive = activeDomain === d.id;

            return (
              <button
                key={d.id}
                onClick={() => onSelectDomain(d.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-display font-semibold tracking-wide transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0 border ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-sm'
                    : 'bg-[#121622] text-neutral-400 hover:text-white hover:bg-[#182030] border-transparent'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-emerald-400' : 'text-neutral-400'} />
                <span>{d.label}</span>
                {d.badge && (
                  <span
                    className={`text-[9px] font-display px-1.5 py-0.5 rounded uppercase tracking-wider font-bold ${
                      isActive
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-[#1E2536] text-neutral-400'
                    }`}
                  >
                    {d.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Popover Lot Calculator Launch Button */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          <button
            onClick={onOpenCalculator}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-display text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-950/40 border border-emerald-500/30"
          >
            <Calculator size={14} />
            <span>Lot Calculator</span>
          </button>
        </div>
      </div>
    </div>
  );
}

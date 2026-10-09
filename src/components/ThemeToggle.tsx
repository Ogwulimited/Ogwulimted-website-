import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'switch' | 'segmented' | 'compact';
  className?: string;
  showLabels?: boolean;
}

export function ThemeToggle({
  variant = 'switch',
  className = '',
  showLabels = true,
}: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  if (variant === 'segmented') {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-xl bg-[#131929] dark:bg-[#131929] border border-[#243048] dark:border-[#243048] ${className}`}
        role="group"
        aria-label="Theme mode switcher"
      >
        <button
          type="button"
          onClick={() => isDark && toggleTheme()}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all cursor-pointer ${
            !isDark
              ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
          aria-pressed={!isDark}
        >
          <Sun size={13} className={!isDark ? 'text-slate-950' : 'text-neutral-400'} />
          <span>Light</span>
        </button>

        <button
          type="button"
          onClick={() => !isDark && toggleTheme()}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all cursor-pointer ${
            isDark
              ? 'bg-sky-500 text-slate-950 shadow-md font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
          aria-pressed={isDark}
        >
          <Moon size={13} className={isDark ? 'text-slate-950' : 'text-neutral-400'} />
          <span>Dark</span>
        </button>
      </div>
    );
  }

  // Physical sliding toggle switch
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {showLabels && (
        <span className="text-[11px] font-display font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-400 select-none">
          {!isDark ? 'Light' : 'Dark'}
        </span>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle between light and dark mode"
        onClick={toggleTheme}
        className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer items-center rounded-full p-0.5 border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
          isDark
            ? 'bg-[#151D2F] border-[#2A3B5C]'
            : 'bg-amber-100/90 border-amber-300'
        }`}
      >
        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
          <Sun
            size={11}
            className={`transition-opacity duration-200 ${
              !isDark ? 'text-amber-600 opacity-90' : 'text-neutral-500 opacity-30'
            }`}
          />
          <Moon
            size={11}
            className={`transition-opacity duration-200 ${
              isDark ? 'text-sky-300 opacity-90' : 'text-neutral-400 opacity-30'
            }`}
          />
        </div>

        {/* Sliding Knob */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          animate={{ x: isDark ? 24 : 0 }}
          className={`pointer-events-none relative z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-md transition-colors ${
            isDark
              ? 'bg-sky-500 text-slate-950'
              : 'bg-white text-amber-500 shadow-amber-200/50'
          }`}
        >
          {isDark ? (
            <Moon size={12} className="fill-slate-950" />
          ) : (
            <Sun size={12} className="fill-amber-500 text-amber-500" />
          )}
        </motion.div>
      </button>
    </div>
  );
}

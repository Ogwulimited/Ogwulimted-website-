import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';

export function Insights() {
  const thoughts = [
    {
      date: '2026.06.14',
      title: 'THE ALGORITHMIC TOPOGRAPHY',
      excerpt: 'Treating UI not as a flat surface, but as a topographical map where data density creates natural elevations. The denser the signal, the higher the visual priority.'
    },
    {
      date: '2026.05.02',
      title: 'ARCHITECTURE BEYOND BUILDINGS',
      excerpt: 'Systems architecture and spatial architecture share the exact same foundation: constraints. In code, it is memory and compute. In space, it is physics and material.'
    },
    {
      date: '2026.03.21',
      title: 'LLMs IN THE TRADING STACK',
      excerpt: 'Moving away from purely statistical probability. Using large language models to parse qualitative central bank sentiment and map it directly against quantitative forex signals.'
    }
  ];

  const hexMap = [
    '#4285F4', // Blue
    '#EA4335', // Red
    '#FBBC05', // Yellow
    '#34A853'  // Green
  ];

  return (
    <section id="insights" className="py-20 relative px-8 md:px-16 lg:px-24 xl:px-32 bg-[#F8F9FA] dark:bg-[#1E1E1E] rounded-[32px] overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl"
      >
        <div className="mb-16">
          <h2 className="text-2xl font-light text-[#202124] dark:text-[#E8EAED] mb-2 font-display">Insights</h2>
          <p className="text-sm font-mono text-[#5F6368] dark:text-[#9AA0A6]">Writing & Notes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {thoughts.map((item, i) => {
            const hex = hexMap[i % 4];
            return (
              <motion.a
                href="#"
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group block bg-white dark:bg-[#121212] p-8 hover:bg-[#F1F3F4] dark:bg-[#242424] transition-colors relative rounded-lg shadow-sm"
                style={{ 
                  '--hover-color': hex,
                  borderTop: `4px solid ${hex}`,
                  borderLeft: '1px solid #DADCE0',
                  borderRight: '1px solid #DADCE0',
                  borderBottom: '1px solid #DADCE0'
                } as CSSProperties}
              >
                <ArrowUpRight size={16} className="absolute top-8 right-8 text-[#80868B] dark:text-[#9AA0A6] transition-colors group-hover:text-[var(--hover-color)]" />
                <p className="text-[10px] font-mono tracking-widest mb-4 uppercase" style={{ color: hex }}>{item.date}</p>
                <h3 className="text-lg font-medium text-[#202124] dark:text-[#E8EAED] mb-3 font-display transition-colors pr-8 group-hover:text-[var(--hover-color)]">{item.title}</h3>
                <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6] leading-relaxed">
                  {item.excerpt}
                </p>
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

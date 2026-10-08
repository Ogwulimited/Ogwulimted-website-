import { useState, useId, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calculator, Copy, Check, ShieldCheck, ArrowRight, DollarSign, RefreshCw, AlertCircle, Info } from 'lucide-react';

export interface PairConfig {
  symbol: string;
  type: 'forex-usd-quote' | 'forex-usd-base' | 'forex-jpy' | 'forex' | 'crypto';
  pip: number;
  quote: string;
  defaultEntry: number;
  defaultStop: number;
  defaultTP?: number;
}

// Fixed dropdown in exact order specified:
export const SUPPORTED_PAIRS: PairConfig[] = [
  { symbol: 'AUDNZD', type: 'forex', pip: 0.0001, quote: 'NZD', defaultEntry: 1.08500, defaultStop: 1.08200, defaultTP: 1.09450 },
  { symbol: 'NZDCHF', type: 'forex', pip: 0.0001, quote: 'CHF', defaultEntry: 0.53400, defaultStop: 0.53150, defaultTP: 0.54200 },
  { symbol: 'EURAUD', type: 'forex', pip: 0.0001, quote: 'AUD', defaultEntry: 1.64500, defaultStop: 1.64100, defaultTP: 1.65700 },
  { symbol: 'GBPAUD', type: 'forex', pip: 0.0001, quote: 'AUD', defaultEntry: 1.95400, defaultStop: 1.95000, defaultTP: 1.96800 },
  { symbol: 'EURNZD', type: 'forex', pip: 0.0001, quote: 'NZD', defaultEntry: 1.78200, defaultStop: 1.77700, defaultTP: 1.79800 },
  { symbol: 'NZDCAD', type: 'forex', pip: 0.0001, quote: 'CAD', defaultEntry: 0.81500, defaultStop: 0.81200, defaultTP: 0.82400 },
  { symbol: 'AUDJPY', type: 'forex-jpy', pip: 0.01, quote: 'JPY', defaultEntry: 98.500, defaultStop: 98.200, defaultTP: 99.400 },
  { symbol: 'GBPUSD', type: 'forex-usd-quote', pip: 0.0001, quote: 'USD', defaultEntry: 1.25640, defaultStop: 1.25280, defaultTP: 1.26900 },
  { symbol: 'ETHUSD', type: 'crypto', pip: 1.0, quote: 'USD', defaultEntry: 2450.00, defaultStop: 2410.00, defaultTP: 2580.00 },
  { symbol: 'NZDJPY', type: 'forex-jpy', pip: 0.01, quote: 'JPY', defaultEntry: 91.200, defaultStop: 90.900, defaultTP: 92.100 },
  { symbol: 'BTCUSD', type: 'crypto', pip: 1.0, quote: 'USD', defaultEntry: 65200.0, defaultStop: 64500.0, defaultTP: 67500.0 },
  { symbol: 'GBPCHF', type: 'forex', pip: 0.0001, quote: 'CHF', defaultEntry: 1.12500, defaultStop: 1.12150, defaultTP: 1.13600 },
  { symbol: 'EURCHF', type: 'forex', pip: 0.0001, quote: 'CHF', defaultEntry: 0.94500, defaultStop: 0.94200, defaultTP: 0.95400 },
  { symbol: 'EURUSD', type: 'forex-usd-quote', pip: 0.0001, quote: 'USD', defaultEntry: 1.08500, defaultStop: 1.08200, defaultTP: 1.09450 },
  { symbol: 'GBPNZD', type: 'forex', pip: 0.0001, quote: 'NZD', defaultEntry: 2.12400, defaultStop: 2.11800, defaultTP: 2.14200 },
  { symbol: 'USDCHF', type: 'forex-usd-base', pip: 0.0001, quote: 'CHF', defaultEntry: 0.89500, defaultStop: 0.89200, defaultTP: 0.90400 },
  { symbol: 'AUDCAD', type: 'forex', pip: 0.0001, quote: 'CAD', defaultEntry: 0.89200, defaultStop: 0.88850, defaultTP: 0.90200 },
  { symbol: 'USDJPY', type: 'forex-usd-base', pip: 0.01, quote: 'JPY', defaultEntry: 153.400, defaultStop: 153.000, defaultTP: 154.600 },
  { symbol: 'CADJPY', type: 'forex-jpy', pip: 0.01, quote: 'JPY', defaultEntry: 111.800, defaultStop: 111.450, defaultTP: 112.900 }
];

interface RiskCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPair?: string;
  defaultRisk?: number;
}

export function RiskCalculatorModal({
  isOpen,
  onClose,
  defaultPair = 'EURUSD',
  defaultRisk = 25,
}: RiskCalculatorModalProps) {
  const [riskAmount, setRiskAmount] = useState<number>(defaultRisk);
  const [selectedSymbol, setSelectedSymbol] = useState<string>(defaultPair);
  const [entryPrice, setEntryPrice] = useState<number>(1.08500);
  const [stopPrice, setStopPrice] = useState<number>(1.08200);
  const [takeProfitPrice, setTakeProfitPrice] = useState<string>('1.09450');
  const [copied, setCopied] = useState<boolean>(false);
  const [rates, setRates] = useState<Record<string, number>>({
    USD: 1.0,
    EUR: 0.9220,
    GBP: 0.7930,
    JPY: 153.50,
    CHF: 0.8980,
    CAD: 1.3650,
    AUD: 1.5280,
    NZD: 1.6680
  });
  const [lastRateUpdate, setLastRateUpdate] = useState<string>('');

  const riskInputId = useId();
  const pairSelectId = useId();
  const entryInputId = useId();
  const stopInputId = useId();
  const tpInputId = useId();

  // Fetch live exchange rates
  const fetchRates = useCallback(async () => {
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (res.ok) {
        const data = await res.json();
        if (data && data.rates) {
          setRates(prev => ({ ...prev, ...data.rates }));
          setLastRateUpdate(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch (e) {
      console.warn('Rates fetch fallback active');
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchRates();
    }
  }, [isOpen, fetchRates]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const activeSpec = useMemo(() => {
    return SUPPORTED_PAIRS.find(p => p.symbol === selectedSymbol) || SUPPORTED_PAIRS[13]; // EURUSD
  }, [selectedSymbol]);

  // Update defaults on pair switch
  const handlePairChange = (sym: string) => {
    setSelectedSymbol(sym);
    const spec = SUPPORTED_PAIRS.find(p => p.symbol === sym);
    if (spec) {
      setEntryPrice(spec.defaultEntry);
      setStopPrice(spec.defaultStop);
      setTakeProfitPrice(spec.defaultTP !== undefined ? String(spec.defaultTP) : '');
    }
  };

  const isCrypto = activeSpec.type === 'crypto';

  // Compute Pip / Point value per lot in USD
  const { pipValueUSD, pipFormula } = useMemo(() => {
    if (isCrypto) {
      return { pipValueUSD: 1.0, pipFormula: '1 pt = $1.00 per coin' };
    }
    if (activeSpec.type === 'forex-usd-quote') {
      return { pipValueUSD: 10.0, pipFormula: '$10.00 / pip fixed' };
    }
    if (activeSpec.type === 'forex-usd-base') {
      const rate = entryPrice > 0 ? entryPrice : (rates[activeSpec.quote] || 1.0);
      return {
        pipValueUSD: (activeSpec.pip * 100000) / rate,
        pipFormula: `(${activeSpec.pip} × 100k) ÷ ${rate.toFixed(activeSpec.symbol.includes('JPY') ? 3 : 5)}`
      };
    }
    if (activeSpec.type === 'forex-jpy') {
      const usdjpy = rates.JPY || 153.50;
      return {
        pipValueUSD: 1000.0 / usdjpy,
        pipFormula: `1,000 JPY ÷ ${usdjpy.toFixed(2)} USDJPY`
      };
    }
    // Crosses: quote currency converted to USD
    const quoteRate = rates[activeSpec.quote] || 1.0;
    return {
      pipValueUSD: 10.0 / quoteRate,
      pipFormula: `10 ${activeSpec.quote} ÷ ${quoteRate.toFixed(4)} rate`
    };
  }, [activeSpec, entryPrice, isCrypto, rates]);

  // Distance & Position calculation
  const calcData = useMemo(() => {
    if (isNaN(riskAmount) || riskAmount <= 0) {
      return { error: 'Please enter a risk amount greater than 0' };
    }
    if (isNaN(entryPrice) || isNaN(stopPrice)) {
      return { error: 'Please enter both Entry and Stop prices' };
    }
    if (entryPrice === stopPrice) {
      return { error: 'Invalid: entry and stop cannot be equal' };
    }

    const isLong = entryPrice > stopPrice;
    let stopDistance = isCrypto ? Math.abs(entryPrice - stopPrice) : Math.abs(entryPrice - stopPrice) / activeSpec.pip;

    if (stopDistance <= 0) {
      return { error: 'Invalid: stop distance is 0 or negative' };
    }

    let positionSize = isCrypto
      ? riskAmount / stopDistance
      : riskAmount / (stopDistance * pipValueUSD);

    let actualRisk = isCrypto
      ? positionSize * stopDistance
      : (Math.max(0.01, Math.round(positionSize * 100) / 100)) * stopDistance * pipValueUSD;

    // TP and R:R
    const tpNum = parseFloat(takeProfitPrice);
    let rewardUSD: number | null = null;
    let rrRatio: number | null = null;
    let tpWarning: string | null = null;

    if (!isNaN(tpNum) && tpNum > 0) {
      if (isLong && tpNum <= entryPrice) {
        tpWarning = 'TP should be higher than entry for long positions';
      } else if (!isLong && tpNum >= entryPrice) {
        tpWarning = 'TP should be lower than entry for short positions';
      }
      const tpDist = isCrypto ? Math.abs(tpNum - entryPrice) : Math.abs(tpNum - entryPrice) / activeSpec.pip;
      rrRatio = stopDistance > 0 ? tpDist / stopDistance : 0;
      rewardUSD = isCrypto ? positionSize * tpDist : positionSize * tpDist * pipValueUSD;
    }

    let warning: string | null = null;
    if (positionSize > 100) {
      warning = 'Position size is unusually large (> 100 lots) — please double-check your inputs';
    } else if (!isCrypto && positionSize < 0.01) {
      warning = 'Position is smaller than minimum trade size (0.01 lots). Consider increasing risk or widening stop.';
    }

    return {
      isLong,
      stopDistance,
      positionSize,
      actualRisk,
      rewardUSD,
      rrRatio,
      tpWarning,
      warning
    };
  }, [riskAmount, entryPrice, stopPrice, takeProfitPrice, isCrypto, activeSpec, pipValueUSD]);

  const copySummary = () => {
    if ('error' in calcData && calcData.error) return;
    const isLong = calcData.isLong;
    const posStr = isCrypto
      ? `${(calcData.positionSize ?? 0).toFixed(4)} ${selectedSymbol.replace('USD', '')}`
      : `${(calcData.positionSize ?? 0).toFixed(2)} lots`;

    const lines = [
      `Pair: ${selectedSymbol}`,
      `Entry: ${isCrypto ? entryPrice.toFixed(2) : entryPrice.toFixed(5)}`,
      `Stop: ${isCrypto ? stopPrice.toFixed(2) : stopPrice.toFixed(5)}`,
      `Position: ${posStr}`,
      `Risk: $${riskAmount.toFixed(2)}`
    ];

    if (calcData.rewardUSD !== null && calcData.rrRatio !== null && !isNaN(calcData.rrRatio)) {
      lines.push(`Potential Reward: $${calcData.rewardUSD.toFixed(2)}`);
      lines.push(`R:R 1:${calcData.rrRatio.toFixed(2)}`);
    }

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="calculator-modal-title"
            className="relative w-full max-w-xl bg-[#0C0F17] border border-[#1E2536] rounded-2xl shadow-2xl overflow-hidden z-10 m-auto text-neutral-200 font-sans max-h-[94vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3.5 py-3 sm:px-5 sm:py-4 border-b border-[#1C2333] bg-[#10141D] shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Calculator size={17} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 id="calculator-modal-title" className="text-sm sm:text-base font-display font-bold text-white tracking-tight truncate">
                      Lot Size & Risk Calculator
                    </h3>
                    <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-emerald-950/70 text-emerald-300 border border-emerald-800/50">
                      SMC Desk
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans truncate">
                    Exact position sizing with zero risk overshoots
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close calculator"
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#1A2233] transition-colors cursor-pointer shrink-0 ml-2"
              >
                <X size={18} />
              </button>
            </div>

            {/* Error or Warning banner */}
            {'error' in calcData && calcData.error && (
              <div className="px-3.5 py-2 bg-rose-950/50 border-b border-rose-800/60 text-rose-300 text-xs font-mono flex items-center gap-2 shrink-0">
                <AlertCircle size={14} className="shrink-0" />
                <span className="truncate">{calcData.error}</span>
              </div>
            )}
            {'warning' in calcData && calcData.warning && (
              <div className="px-3.5 py-2 bg-amber-950/50 border-b border-amber-800/60 text-amber-300 text-xs font-mono flex items-center gap-2 shrink-0">
                <AlertCircle size={14} className="shrink-0" />
                <span className="truncate">{calcData.warning}</span>
              </div>
            )}

            {/* Content Body */}
            <div className="p-3 sm:p-4.5 space-y-2.5 sm:space-y-3.5 overflow-y-auto flex-1 scrollbar-thin">
              {/* Row 1: Risk Amount & Pair Dropdown (2 Columns) */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {/* Risk Amount */}
                <div className="bg-[#121622] p-2.5 sm:p-3.5 rounded-xl border border-[#1E2638] flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor={riskInputId} className="text-[10px] sm:text-xs font-mono text-neutral-300 font-semibold uppercase tracking-wider">
                      Risk (USD)
                    </label>
                    <span className="text-[11px] sm:text-xs font-mono font-bold text-emerald-400 tabular-nums">
                      ${riskAmount.toFixed(0)}
                    </span>
                  </div>
                  <div className="relative mb-1.5">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-neutral-500 text-xs sm:text-sm">$</span>
                    <input
                      id={riskInputId}
                      type="number"
                      min="0.1"
                      step="any"
                      value={riskAmount || ''}
                      onChange={(e) => setRiskAmount(parseFloat(e.target.value) || 0)}
                      placeholder="25"
                      className="w-full bg-[#0A0D14] border border-[#222B3D] focus:border-emerald-500 rounded-lg pl-6 pr-2 py-1 sm:py-1.5 font-mono text-xs sm:text-sm text-white tabular-nums outline-none transition-colors"
                    />
                  </div>
                  {/* Preset chips */}
                  <div className="flex items-center gap-1 flex-wrap">
                    {[25, 50, 100, 250, 500].map(val => (
                      <button
                        key={val}
                        onClick={() => setRiskAmount(val)}
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                          riskAmount === val
                            ? 'bg-emerald-500 text-slate-950 font-bold'
                            : 'bg-[#182030] text-neutral-400 border border-[#243048] hover:text-white'
                        }`}
                      >
                        ${val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trading Pair */}
                <div className="bg-[#121622] p-2.5 sm:p-3.5 rounded-xl border border-[#1E2638] flex flex-col justify-between">
                  <label htmlFor={pairSelectId} className="block text-[10px] sm:text-xs font-mono text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                    Trading Pair
                  </label>
                  <select
                    id={pairSelectId}
                    value={selectedSymbol}
                    onChange={(e) => handlePairChange(e.target.value)}
                    className="w-full bg-[#0A0D14] border border-[#222B3D] focus:border-emerald-500 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 font-mono text-xs text-white outline-none cursor-pointer"
                  >
                    {SUPPORTED_PAIRS.map(p => (
                      <option key={p.symbol} value={p.symbol} className="bg-[#0A0D14] text-white">
                        {p.symbol} {p.type === 'crypto' ? '(Crypto)' : ''}
                      </option>
                    ))}
                  </select>
                  <div className="mt-1.5 text-[9px] sm:text-[10px] font-mono text-neutral-400 flex items-center justify-between">
                    <span className="truncate">{isCrypto ? 'Point:' : 'Pip Value:'}</span>
                    <span className="text-white font-semibold tabular-nums ml-1 shrink-0">
                      ${pipValueUSD.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2: Entry Price & Stop Loss Price (2 Columns) */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {/* Entry Price */}
                <div className="bg-[#121622] p-2.5 sm:p-3.5 rounded-xl border border-[#1E2638]">
                  <label htmlFor={entryInputId} className="block text-[10px] sm:text-xs font-mono text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                    Entry Price
                  </label>
                  <input
                    id={entryInputId}
                    type="number"
                    step="any"
                    value={entryPrice || ''}
                    onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#0A0D14] border border-[#222B3D] focus:border-emerald-500 rounded-lg px-2.5 py-1 sm:py-1.5 font-mono text-xs sm:text-sm text-white tabular-nums outline-none"
                    placeholder="1.08500"
                  />
                  <div className="text-[9px] sm:text-[10px] font-mono mt-1 truncate">
                    {'isLong' in calcData && calcData.isLong !== undefined ? (
                      <span className={calcData.isLong ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                        {calcData.isLong ? '▲ Long Setup' : '▼ Short Setup'}
                      </span>
                    ) : (
                      <span className="text-neutral-500">Execution</span>
                    )}
                  </div>
                </div>

                {/* Stop Loss Price */}
                <div className="bg-[#121622] p-2.5 sm:p-3.5 rounded-xl border border-[#1E2638]">
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor={stopInputId} className="text-[10px] sm:text-xs font-mono text-neutral-300 font-semibold uppercase tracking-wider truncate">
                      Stop Loss
                    </label>
                    {'stopDistance' in calcData && calcData.stopDistance !== undefined && (
                      <span className="text-[9px] sm:text-[10px] font-mono text-rose-400 font-semibold tabular-nums shrink-0 ml-1">
                        {isCrypto ? `${calcData.stopDistance.toFixed(1)} pts` : `${calcData.stopDistance.toFixed(1)} pips`}
                      </span>
                    )}
                  </div>
                  <input
                    id={stopInputId}
                    type="number"
                    step="any"
                    value={stopPrice || ''}
                    onChange={(e) => setStopPrice(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#0A0D14] border border-[#222B3D] focus:border-rose-500 rounded-lg px-2.5 py-1 sm:py-1.5 font-mono text-xs sm:text-sm text-white tabular-nums outline-none"
                    placeholder="1.08200"
                  />
                  <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 mt-1 truncate">
                    <span>Invalidation Point</span>
                  </div>
                </div>
              </div>

              {/* Row 3: Optional Take Profit Price */}
              <div className="bg-[#121622] p-2.5 sm:p-3 rounded-xl border border-[#1E2638]">
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor={tpInputId} className="text-[10px] sm:text-xs font-mono text-neutral-300 font-semibold uppercase tracking-wider">
                    Take Profit <span className="text-[9px] text-neutral-500 font-normal">(Optional Target)</span>
                  </label>
                  {'rrRatio' in calcData && calcData.rrRatio !== null && !isNaN(calcData.rrRatio) && (
                    <span className="text-[10px] sm:text-xs font-mono text-emerald-400 font-bold tabular-nums">
                      R:R 1:{calcData.rrRatio.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id={tpInputId}
                    type="number"
                    step="any"
                    value={takeProfitPrice}
                    onChange={(e) => setTakeProfitPrice(e.target.value)}
                    placeholder="e.g. 1.09450"
                    className="w-full bg-[#0A0D14] border border-[#222B3D] focus:border-emerald-500 rounded-lg px-2.5 py-1 sm:py-1.5 font-mono text-xs sm:text-sm text-white tabular-nums outline-none"
                  />
                  {'rewardUSD' in calcData && calcData.rewardUSD !== null && (
                    <span className="text-[10px] sm:text-xs font-mono text-emerald-400 font-bold tabular-nums shrink-0 bg-emerald-950/60 border border-emerald-800/50 px-2 py-1 rounded-md">
                      +${calcData.rewardUSD.toFixed(0)}
                    </span>
                  )}
                </div>
              </div>

              {/* Output Hero Banner */}
              <div className="bg-gradient-to-br from-emerald-950/50 via-[#101726] to-[#0A0D14] border-2 border-emerald-500/40 rounded-xl p-3 sm:p-4 text-center shadow-lg">
                <span className="text-[10px] sm:text-[11px] font-display font-semibold text-emerald-400 uppercase tracking-widest block">
                  Required Position Size
                </span>
                <div className="text-2xl sm:text-4xl font-display font-bold text-white tabular-nums tracking-tight my-0.5 sm:my-1">
                  {'positionSize' in calcData && calcData.positionSize !== undefined ? (
                    isCrypto ? (
                      <>
                        {calcData.positionSize.toFixed(calcData.positionSize >= 1 ? 3 : 5)}{' '}
                        <span className="text-xs sm:text-sm font-display font-semibold text-emerald-400">
                          {selectedSymbol.replace('USD', '')}
                        </span>
                      </>
                    ) : (
                      <>
                        {calcData.positionSize.toFixed(2)}{' '}
                        <span className="text-xs sm:text-sm font-display font-semibold text-emerald-400">LOTS</span>
                      </>
                    )
                  ) : (
                    '0.00'
                  )}
                </div>

                {!isCrypto && 'positionSize' in calcData && calcData.positionSize !== undefined && (
                  <div className="text-[10px] sm:text-xs font-mono text-neutral-300 flex justify-center items-center gap-2 sm:gap-3">
                    <span>Std: <strong>{calcData.positionSize.toFixed(2)}</strong></span>
                    <span className="text-neutral-600">·</span>
                    <span>Mini: <strong>{(calcData.positionSize * 10).toFixed(1)}</strong></span>
                    <span className="text-neutral-600">·</span>
                    <span>Micro: <strong>{Math.round(calcData.positionSize * 100)}</strong></span>
                  </div>
                )}

                {'actualRisk' in calcData && calcData.actualRisk !== undefined && (
                  <div className="text-[9px] sm:text-[10px] font-mono text-emerald-300 font-semibold mt-1">
                    ✓ Risk strictly capped at ${calcData.actualRisk.toFixed(2)} at stop loss
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-3 sm:p-4 border-t border-[#1C2333] bg-[#10141D] flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
              <span className="text-[10px] sm:text-[11px] text-neutral-400 font-mono text-center sm:text-left truncate max-w-full">
                {pipFormula}
              </span>

              <button
                onClick={copySummary}
                disabled={'error' in calcData && !!calcData.error}
                className="w-full sm:w-auto px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 shrink-0"
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    <span>Order Summary Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Trade Summary</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

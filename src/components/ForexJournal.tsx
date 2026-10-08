import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Clock,
  Calendar,
  ShieldCheck,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronRight,
  Calculator,
  Layers,
  Search,
  Filter,
  SlidersHorizontal,
  DollarSign,
  Maximize2,
  Minimize2,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Table as TableIcon,
  LayoutGrid,
  Activity,
  Award,
  Zap,
  Target,
  BarChart3,
  Flame,
  Radio
} from 'lucide-react';

export interface Trade {
  id: string;
  symbol: string;
  direction: 'bullish' | 'bearish' | string;
  entry: number;
  stop: number;
  target: number;
  rr_planned: number;
  target_kind: string;
  sent_epoch: number;
  exit_epoch?: number | null;
  exit_price?: number | null;
  outcome: 'win' | 'loss' | 'timeout' | 'open' | string;
  rr_actual?: number | null;
  duration_seconds?: number | null;
  note?: string;
}

interface ForexJournalProps {
  onOpenCalculator: () => void;
}

const DATA_SOURCE_URL = 'https://raw.githubusercontent.com/Ogwulimited/SMC-signal-bot/main/trades.json';

type SortKey =
  | 'date'
  | 'symbol'
  | 'direction'
  | 'entry'
  | 'stop'
  | 'target'
  | 'exit'
  | 'outcome'
  | 'rr_actual'
  | 'duration'
  | 'target_kind';

function formatPrice(val: number | undefined | null, symbol?: string): string {
  if (val === undefined || val === null || isNaN(val)) return '—';
  const num = Number(val);
  if (symbol && symbol.toUpperCase().includes('JPY')) {
    const s = String(val);
    const decimals = s.includes('.') ? s.split('.')[1].length : 3;
    return num.toFixed(Math.min(Math.max(decimals, 3), 5));
  }
  return num.toFixed(5);
}

function formatDuration(seconds: number | undefined | null): string {
  if (seconds === undefined || seconds === null || isNaN(seconds) || seconds <= 0) return '—';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours === 0 && minutes === 0) return '< 1m';
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

function formatEpoch(epoch: number | undefined | null): string {
  if (!epoch || isNaN(epoch)) return '—';
  const date = new Date(epoch * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()] || 'Oct';
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month} ${day}, ${year}, ${hours}:${minutes}`;
}

function cleanSymbol(sym: string): string {
  if (!sym) return '—';
  const cleaned = sym.replace(/^frx/i, '');
  if (cleaned.length === 6) {
    return `${cleaned.slice(0, 3)}/${cleaned.slice(3)}`;
  }
  return sym;
}

export function ForexJournal({ onOpenCalculator }: ForexJournalProps) {
  // Only real data from user's JSON feed - strictly no sample data
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState<number>(60);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [filterOutcome, setFilterOutcome] = useState<'all' | 'win' | 'loss' | 'timeout' | 'open'>('all');
  const [filterPair, setFilterPair] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  // Scalable UX for 20+ to 50+ trades: Filter session collapsing & Card density / pagination
  const [isFilterCollapsed, setIsFilterCollapsed] = useState<boolean>(false);
  const [cardDensity, setCardDensity] = useState<'compact' | 'detailed'>('compact');
  const [expandedTradeIds, setExpandedTradeIds] = useState<Record<string, boolean>>({});

  // Scalable progressive loading and pagination to keep DOM performant even when trade count exceeds 50+
  const [paginationMode, setPaginationMode] = useState<'loadMore' | 'paged'>('loadMore');
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [loadBatchSize, setLoadBatchSize] = useState<number>(10);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // Background fetch to check for incoming JSON trades directly with cache-busting (?t=)
  const fetchTrades = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);

    try {
      const response = await fetch(`${DATA_SOURCE_URL}?t=${Date.now()}`, {
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        const text = await response.text();
        if (text && text.trim() && text.trim() !== '404: Not Found') {
          const data = JSON.parse(text);
          if (data && Array.isArray(data.trades)) {
            setTrades(data.trades);
            setFetchError(false);
          } else {
            setTrades([]);
          }
        } else {
          setTrades([]);
        }
      } else {
        // 404 or other non-200 status -> 0 trades recorded yet
        setTrades([]);
      }
    } catch {
      // Network error or 404 -> no trades recorded yet
      setTrades([]);
      setFetchError(true);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      setLastUpdated(new Date());
      setSecondsUntilRefresh(60);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchTrades();
  }, [fetchTrades]);

  // 60-second auto-sync timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsUntilRefresh((prev) => {
        if (prev <= 1) {
          fetchTrades();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [fetchTrades]);

  // Closed trades list (and open trades count)
  const closedTrades = useMemo(() => {
    return trades.filter((t) => t.outcome !== 'open' && (t.exit_epoch || t.exit_price !== undefined));
  }, [trades]);

  const openTradesCount = useMemo(() => {
    return trades.filter((t) => t.outcome === 'open' || (!t.exit_epoch && !t.exit_price)).length;
  }, [trades]);

  // Lifetime Performance Metrics (Exact 8 Requirements from Brief - strictly in R-multiples)
  const stats = useMemo(() => {
    const totalClosed = closedTrades.length;
    const wins = closedTrades.filter((t) => t.outcome === 'win').length;
    const losses = closedTrades.filter((t) => t.outcome === 'loss').length;
    const timeouts = closedTrades.filter((t) => t.outcome === 'timeout').length;

    const winRate = totalClosed > 0 ? ((wins / totalClosed) * 100).toFixed(1) : '—';

    const winTrades = closedTrades.filter((t) => t.outcome === 'win' && typeof t.rr_actual === 'number');
    const avgRRWins =
      winTrades.length > 0
        ? (winTrades.reduce((acc, t) => acc + (t.rr_actual ?? 0), 0) / winTrades.length).toFixed(2)
        : '—';

    const netR = closedTrades.reduce((acc, t) => acc + (t.rr_actual ?? 0), 0);

    let bestTrade = '—';
    let worstTrade = '—';
    const rrs = closedTrades
      .map((t) => t.rr_actual)
      .filter((r): r is number => typeof r === 'number' && !isNaN(r));

    if (rrs.length > 0) {
      const maxR = Math.max(...rrs);
      const minR = Math.min(...rrs);
      bestTrade = maxR > 0 ? `+${maxR.toFixed(2)}R` : `${maxR.toFixed(2)}R`;
      worstTrade = `${minR.toFixed(2)}R`;
    }

    const durationTrades = closedTrades.filter(
      (t) => typeof t.duration_seconds === 'number' && t.duration_seconds > 0
    );
    const avgDurationSec =
      durationTrades.length > 0
        ? Math.round(durationTrades.reduce((acc, t) => acc + (t.duration_seconds ?? 0), 0) / durationTrades.length)
        : 0;

    return {
      totalClosed,
      wins,
      losses,
      timeouts,
      winRate: winRate === '—' ? '—' : `${winRate}%`,
      avgRRWins: avgRRWins === '—' ? '—' : `+${avgRRWins}R`,
      netR: totalClosed > 0 ? (Number(netR) > 0 ? `+${netR.toFixed(2)}R` : `${netR.toFixed(2)}R`) : '0.00R',
      bestTrade,
      worstTrade,
      avgDuration: avgDurationSec > 0 ? formatDuration(avgDurationSec) : '—'
    };
  }, [closedTrades]);

  // Distinct pair options from real trades
  const availablePairs = useMemo(() => {
    const set = new Set<string>();
    trades.forEach((t) => {
      if (t.symbol) set.add(cleanSymbol(t.symbol));
    });
    return Array.from(set);
  }, [trades]);

  // Sorting and Filtering
  const displayedTrades = useMemo(() => {
    let list = [...trades];

    // Filter by outcome
    if (filterOutcome !== 'all') {
      if (filterOutcome === 'open') {
        list = list.filter((t) => t.outcome === 'open' || (!t.exit_epoch && !t.exit_price));
      } else {
        list = list.filter((t) => t.outcome === filterOutcome);
      }
    }

    // Filter by pair
    if (filterPair !== 'all') {
      list = list.filter((t) => cleanSymbol(t.symbol) === filterPair);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          cleanSymbol(t.symbol).toLowerCase().includes(q) ||
          t.direction.toLowerCase().includes(q) ||
          (t.target_kind && t.target_kind.toLowerCase().includes(q)) ||
          (t.note && t.note.toLowerCase().includes(q))
      );
    }

    // Sort logic
    list.sort((a, b) => {
      let aVal: number | string = 0;
      let bVal: number | string = 0;

      switch (sortKey) {
        case 'date':
          aVal = a.exit_epoch || a.sent_epoch || 0;
          bVal = b.exit_epoch || b.sent_epoch || 0;
          break;
        case 'symbol':
          aVal = cleanSymbol(a.symbol);
          bVal = cleanSymbol(b.symbol);
          break;
        case 'direction':
          aVal = a.direction;
          bVal = b.direction;
          break;
        case 'entry':
          aVal = a.entry;
          bVal = b.entry;
          break;
        case 'stop':
          aVal = a.stop;
          bVal = b.stop;
          break;
        case 'target':
          aVal = a.target;
          bVal = b.target;
          break;
        case 'exit':
          aVal = a.exit_price || 0;
          bVal = b.exit_price || 0;
          break;
        case 'outcome':
          aVal = a.outcome;
          bVal = b.outcome;
          break;
        case 'rr_actual':
          aVal = a.rr_actual ?? 0;
          bVal = b.rr_actual ?? 0;
          break;
        case 'duration':
          aVal = a.duration_seconds || 0;
          bVal = b.duration_seconds || 0;
          break;
        case 'target_kind':
          aVal = a.target_kind || '';
          bVal = b.target_kind || '';
          break;
      }

      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });

    return list;
  }, [trades, filterOutcome, filterPair, searchQuery, sortKey, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const renderSortIndicator = (key: SortKey) => {
    if (sortKey !== key) {
      return <ChevronsUpDown size={12} className="text-neutral-500 opacity-50" />;
    }
    return sortAsc ? (
      <ChevronUp size={12} className="text-emerald-400" />
    ) : (
      <ChevronDown size={12} className="text-emerald-400" />
    );
  };

  // Reset page and visible count to initial batch when filters or search change
  useEffect(() => {
    setCurrentPage(1);
    setVisibleCount(10);
  }, [filterOutcome, filterPair, searchQuery]);

  // Scalable pagination calculation for 20+ to 50+ trades
  const totalPages = Math.ceil(displayedTrades.length / pageSize) || 1;

  // Performant rendered trades slice: prevents DOM bloat for 50+ trades
  const renderedTrades = useMemo(() => {
    if (paginationMode === 'loadMore') {
      return displayedTrades.slice(0, visibleCount);
    } else {
      if (pageSize >= 1000) return displayedTrades;
      const start = (currentPage - 1) * pageSize;
      return displayedTrades.slice(start, start + pageSize);
    }
  }, [displayedTrades, paginationMode, visibleCount, currentPage, pageSize]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(displayedTrades.length, prev + loadBatchSize));
      setIsLoadingMore(false);
    }, 150);
  };

  const handleResetVisibleCount = () => {
    setVisibleCount(10);
    const ledgerEl = document.getElementById('forex-ledger');
    if (ledgerEl) {
      ledgerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Determine whether an individual trade card displays its full characteristics
  const isTradeExpanded = useCallback(
    (id: string) => {
      if (expandedTradeIds[id] !== undefined) {
        return expandedTradeIds[id];
      }
      return cardDensity === 'detailed';
    },
    [expandedTradeIds, cardDensity]
  );

  const toggleTradeExpand = useCallback(
    (id: string) => {
      setExpandedTradeIds((prev) => ({
        ...prev,
        [id]: !isTradeExpanded(id)
      }));
    },
    [isTradeExpanded]
  );

  const toggleAllCards = useCallback(() => {
    if (cardDensity === 'detailed') {
      setCardDensity('compact');
      setExpandedTradeIds({});
    } else {
      setCardDensity('detailed');
      setExpandedTradeIds({});
    }
  }, [cardDensity]);

  return (
    <section
      id="forex"
      className="relative rounded-3xl bg-[#0B0E17] border border-[#1E2538] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden font-sans"
    >
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Institutional Top Control Bar */}
      <div className="relative z-10 px-3.5 sm:px-8 md:px-10 py-5 sm:py-6 border-b border-[#1A2234] bg-[#0E121E]/90 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-[11px] sm:text-xs font-display text-emerald-300 font-semibold shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Automated Feed
              </span>

              <span className="text-neutral-500 text-xs hidden sm:inline">·</span>

              <span className="text-[11px] sm:text-xs font-display font-medium text-neutral-300">
                SMC Quantitative Engine
              </span>

              <span className="text-neutral-500 text-xs hidden sm:inline">·</span>

              <span className="text-[11px] sm:text-xs font-display font-medium text-neutral-300">
                1R Risk Protected
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Algorithmic Trade Journal
            </h2>

            <p className="text-xs sm:text-base text-neutral-300 mt-2 max-w-2xl font-sans leading-relaxed">
              Real-time systematic execution ledger. Tracking verified Smart Money Concepts (SMC) trades with disciplined 1R risk management. All metrics update live as trades are closed by the signal bot.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Auto-Sync indicator with manual refresh */}
            <div className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-[#141A28] border border-[#232D42] flex items-center gap-2 text-xs font-display font-medium text-neutral-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-semibold">Live Feed</span>
              <span className="text-neutral-400 font-mono text-[10px] sm:text-[11px]">({secondsUntilRefresh}s)</span>
              <button
                onClick={() => fetchTrades(true)}
                disabled={isRefreshing}
                className="ml-1 text-emerald-400 hover:text-emerald-300 cursor-pointer disabled:opacity-50 transition-colors p-0.5 rounded"
                title="Refresh ledger"
                aria-label="Refresh live feed"
              >
                <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
              </button>
            </div>

            {/* Launch Lot Size Calculator */}
            <button
              onClick={onOpenCalculator}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-display font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-950/50 flex items-center gap-2 cursor-pointer border border-emerald-400/30 hover:scale-[1.02]"
            >
              <Calculator size={13} />
              <span>Lot Calculator</span>
            </button>
          </div>
        </div>

        {/* Status Mode Strip */}
        <div className="mt-4 pt-3.5 border-t border-[#182030] flex flex-wrap items-center justify-between gap-2.5 text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-400 flex-wrap">
            <span className="text-neutral-500 font-display text-[10px] sm:text-[11px]">Feed Status:</span>
            <span className="px-2 py-0.5 rounded bg-[#171F30] border border-[#232D42] text-emerald-300 font-display font-semibold flex items-center gap-1.5 text-[11px] sm:text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Connected & Listening
            </span>
            <span className="text-neutral-400 text-[10px] sm:text-[11px] font-mono">
              ({trades.length} {trades.length === 1 ? 'trade' : 'trades'} recorded)
            </span>
          </div>

          <div className="flex items-center gap-2 text-neutral-400 text-[10px] sm:text-[11px] font-mono">
            <Clock size={11} className="text-emerald-400" />
            <span>
              Last checked:{' '}
              {lastUpdated
                ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                : 'Just now'}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION A: LIFETIME STATS (All 8 Core Required Metrics in Signature Systematic Style) */}
      <div className="relative z-10 px-3.5 sm:px-8 md:px-10 py-6 sm:py-8 bg-[#090C14]">
        <div className="flex items-center justify-between mb-4 sm:mb-5 flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-wider text-neutral-400">
            <BarChart3 size={14} className="text-emerald-400" />
            <span className="text-white">Lifetime Performance</span>
            <span className="text-neutral-600 hidden sm:inline">|</span>
            <span className="text-neutral-400 font-mono text-[10px] sm:text-[11px] hidden sm:inline">Real Execution Accounting</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-display font-medium text-neutral-400">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>Strict 1R Protected</span>
          </div>
        </div>

        {/* 8-Metric Command Grid - Perfectly proportioned on mobile and desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          {/* Stat 1: Overall Win Rate */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#111624] border border-[#1E273A] shadow-lg relative overflow-hidden flex flex-col justify-between group hover:border-emerald-500/40 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-display font-semibold text-neutral-400 mb-1">
                <span>Overall Win Rate</span>
                <Target size={13} className="text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-emerald-400 tracking-tight my-1">
                {stats.winRate}
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-[#1C2538] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400">
              <span>Strike Accuracy</span>
              <span className="text-emerald-300 font-semibold font-sans truncate max-w-[100px] sm:max-w-none">
                {stats.totalClosed > 0 ? `${stats.wins} of ${stats.totalClosed} hit TP` : 'Awaiting closed'}
              </span>
            </div>
          </div>

          {/* Stat 2: Outcome Breakdown */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#111624] border border-[#1E273A] shadow-lg relative overflow-hidden flex flex-col justify-between group hover:border-[#2D3A54] transition-colors">
            <div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-display font-semibold text-neutral-400 mb-1">
                <span>Outcome Breakdown</span>
                <Activity size={13} className="text-sky-400" />
              </div>

              {/* Tally badges */}
              <div className="flex items-center gap-1.5 my-1.5 font-display flex-wrap">
                <span className="px-1.5 sm:px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-[10px] sm:text-xs font-bold">
                  {stats.wins}W
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800/60 text-rose-300 text-[10px] sm:text-xs font-bold">
                  {stats.losses}L
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300 text-[10px] sm:text-xs font-bold">
                  {stats.timeouts}TO
                </span>
              </div>

              {/* Progress Distribution Bar */}
              <div className="w-full h-1.5 rounded-full bg-[#1A2234] overflow-hidden my-1 flex">
                <div
                  className="bg-emerald-400 h-full transition-all duration-500"
                  style={{ width: `${stats.totalClosed > 0 ? (stats.wins / stats.totalClosed) * 100 : 0}%` }}
                  title="Wins"
                />
                <div
                  className="bg-neutral-500 h-full transition-all duration-500"
                  style={{ width: `${stats.totalClosed > 0 ? (stats.timeouts / stats.totalClosed) * 100 : 0}%` }}
                  title="Timeouts"
                />
                <div
                  className="bg-rose-500 h-full transition-all duration-500"
                  style={{ width: `${stats.totalClosed > 0 ? (stats.losses / stats.totalClosed) * 100 : 0}%` }}
                  title="Losses"
                />
              </div>
            </div>

            <div className="mt-2 pt-1.5 border-t border-[#1C2538] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400">
              <span>Distribution</span>
              <span className="text-white font-semibold font-display">{stats.totalClosed} Closed</span>
            </div>
          </div>

          {/* Stat 3: Cumulative Net R */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#111624] border border-[#1E273A] shadow-lg relative overflow-hidden flex flex-col justify-between group hover:border-emerald-500/40 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-display font-semibold text-neutral-400 mb-1">
                <span>Cumulative Net R</span>
                <Zap size={13} className="text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-emerald-400 tracking-tight my-1">
                {stats.netR}
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-[#1C2538] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400">
              <span>Performance Yield</span>
              <span className="text-white font-bold font-sans truncate max-w-[100px] sm:max-w-none">
                {stats.totalClosed > 0 ? `${stats.wins} Wins Accrued` : 'Sum of rr_actual'}
              </span>
            </div>
          </div>

          {/* Stat 4: Average R:R on Wins */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#111624] border border-[#1E273A] shadow-lg relative overflow-hidden flex flex-col justify-between group hover:border-sky-500/40 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-display font-semibold text-neutral-400 mb-1">
                <span>Avg R:R on Wins</span>
                <Award size={13} className="text-sky-400" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-sky-400 tracking-tight my-1">
                {stats.avgRRWins}
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-[#1C2538] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400">
              <span>Target Discipline</span>
              <span className="text-sky-300 font-semibold font-display">1:2.50+ Model</span>
            </div>
          </div>

          {/* Stat 5: Total Trades Closed */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#111624] border border-[#1E273A] shadow-lg relative overflow-hidden flex flex-col justify-between group hover:border-[#2D3A54] transition-colors">
            <div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-display font-semibold text-neutral-400 mb-1">
                <span>Total Trades Closed</span>
                <CheckCircle2 size={13} className="text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight my-1">
                {stats.totalClosed}
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-[#1C2538] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400">
              <span>Execution State</span>
              <span className="text-neutral-300 font-sans truncate">{openTradesCount} Active setups</span>
            </div>
          </div>

          {/* Stat 6: Best Trade (Highest R:R) */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#111624] border border-[#1E273A] shadow-lg relative overflow-hidden flex flex-col justify-between group hover:border-emerald-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-display font-semibold text-neutral-400 mb-1">
                <span>Best Trade</span>
                <Flame size={13} className="text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-emerald-400 tracking-tight my-1">
                {stats.bestTrade}
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-[#1C2538] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400">
              <span>Single Return</span>
              <span className="text-emerald-300 font-semibold font-display">Peak Realized</span>
            </div>
          </div>

          {/* Stat 7: Worst Trade (Lowest R:R) */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#111624] border border-[#1E273A] shadow-lg relative overflow-hidden flex flex-col justify-between group hover:border-rose-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-display font-semibold text-neutral-400 mb-1">
                <span>Worst Trade</span>
                <ShieldCheck size={13} className="text-rose-400" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-rose-400 tracking-tight my-1">
                {stats.worstTrade}
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-[#1C2538] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400">
              <span>Strict Stop Loss</span>
              <span className="text-rose-300 font-semibold font-display">-1.00R Hard Stop</span>
            </div>
          </div>

          {/* Stat 8: Average Trade Duration */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#111624] border border-[#1E273A] shadow-lg relative overflow-hidden flex flex-col justify-between group hover:border-purple-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-display font-semibold text-neutral-400 mb-1">
                <span>Avg Duration</span>
                <Clock size={13} className="text-purple-400" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-purple-300 tracking-tight my-1">
                {stats.avgDuration}
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-[#1C2538] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400">
              <span>Session Model</span>
              <span className="text-neutral-300 font-semibold font-display">Intraday SMC</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION B: TRADE TABLE & CARDS WITH TERMINAL CONTROLS */}
      <div id="forex-ledger" className="relative z-10 px-2.5 sm:px-6 md:px-10 py-5 sm:py-8 border-t border-[#1A2234]">
        {/* Terminal Controls Bar (Collapsible Filter Control Session) */}
        {trades.length > 0 && (
          <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0E1320] border border-[#1E273A] mb-5 sm:mb-6 shadow-sm transition-all">
            {/* Header Control Strip: Always accessible with View Switchers, Density Toggle & Collapse Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-[#1A2234]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs sm:text-sm font-display font-bold text-white tracking-wide uppercase">
                  Filters & Ledger Controls
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 bg-[#141A28] px-2 py-0.5 rounded-full border border-[#1E273A]">
                  {renderedTrades.length} of {displayedTrades.length}
                </span>
                {(filterOutcome !== 'all' || filterPair !== 'all' || searchQuery.trim()) && (
                  <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/70 px-1.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    Active
                  </span>
                )}
              </div>

              {/* Action Buttons: Mode Switcher (Stream vs Pages), View Switcher, Card Specs Toggle, and Collapse Filters Toggle */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap">
                {/* Pagination Mode: Stream (Load More) vs Numbered Pages */}
                <div className="flex items-center p-0.5 rounded-lg sm:rounded-xl bg-[#141A28] border border-[#232D42] shrink-0 text-[10px] sm:text-xs font-display">
                  <button
                    type="button"
                    onClick={() => setPaginationMode('loadMore')}
                    className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md transition-colors cursor-pointer ${
                      paginationMode === 'loadMore'
                        ? 'bg-[#1F273A] text-emerald-300 font-bold shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    title="Progressive Load More stream"
                  >
                    Stream
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaginationMode('paged')}
                    className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md transition-colors cursor-pointer ${
                      paginationMode === 'paged'
                        ? 'bg-[#1F273A] text-emerald-300 font-bold shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    title="Numbered pages view"
                  >
                    Pages
                  </button>
                </div>

                {/* View Mode Toggle (Table vs Cards) */}
                <div className="flex items-center p-0.5 rounded-lg sm:rounded-xl bg-[#141A28] border border-[#232D42] shrink-0">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-display flex items-center gap-1 transition-colors cursor-pointer ${
                      viewMode === 'table' ? 'bg-[#1F273A] text-white shadow-sm font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                    title="Table view"
                  >
                    <TableIcon size={12} />
                    <span className="hidden sm:inline">Table</span>
                  </button>
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-display flex items-center gap-1 transition-colors cursor-pointer ${
                      viewMode === 'cards' ? 'bg-[#1F273A] text-white shadow-sm font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                    title="Cards view"
                  >
                    <LayoutGrid size={12} />
                    <span className="hidden sm:inline">Cards</span>
                  </button>
                </div>

                {/* Card Characteristics Density Toggle (Expand all / Collapse all specs) */}
                <button
                  onClick={toggleAllCards}
                  className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-display bg-[#141A28] hover:bg-[#1A2234] border border-[#232D42] text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center gap-1 shrink-0"
                  title={cardDensity === 'compact' ? 'Expand all trade characteristics' : 'Collapse cards to compact mini cards'}
                >
                  {cardDensity === 'compact' ? (
                    <>
                      <Maximize2 size={11} className="text-emerald-400" />
                      <span>Expand Specs</span>
                    </>
                  ) : (
                    <>
                      <Minimize2 size={11} className="text-neutral-400" />
                      <span>Collapse Specs</span>
                    </>
                  )}
                </button>

                {/* Filter Session Collapse Toggle */}
                <button
                  onClick={() => setIsFilterCollapsed(!isFilterCollapsed)}
                  className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-display transition-all cursor-pointer flex items-center gap-1 border shrink-0 ${
                    isFilterCollapsed
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 font-bold'
                      : 'bg-[#141A28] text-neutral-300 border-[#232D42] hover:text-white hover:bg-[#1A2234]'
                  }`}
                  title={isFilterCollapsed ? 'Expand filter controls' : 'Collapse filter controls'}
                >
                  <SlidersHorizontal size={11} className={isFilterCollapsed ? 'text-emerald-400' : 'text-neutral-400'} />
                  <span>{isFilterCollapsed ? 'Filters ▾' : 'Filters ▴'}</span>
                </button>
              </div>
            </div>

            {/* Filter Controls Body (Collapsible) */}
            {!isFilterCollapsed && (
              <div className="pt-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Outcome Filter Pills - perfectly proportioned on mobile */}
                <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                  <span className="text-[10px] sm:text-xs font-display font-semibold text-neutral-400 uppercase mr-0.5">Filter:</span>
                  {[
                    { id: 'all', label: `All (${trades.length})` },
                    { id: 'win', label: `Wins (${stats.wins})` },
                    { id: 'loss', label: `Losses (${stats.losses})` },
                    { id: 'timeout', label: `Timeouts (${stats.timeouts})` },
                    { id: 'open', label: `Open (${openTradesCount})` }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setFilterOutcome(tab.id as any)}
                      className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-display transition-all cursor-pointer border ${
                        filterOutcome === tab.id
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold shadow-sm'
                          : 'bg-[#141A28] text-neutral-400 border-transparent hover:text-white hover:bg-[#1A2234] font-medium'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Search, Pair Selector, and Reset */}
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full md:w-auto">
                  {/* Pair Selector */}
                  <select
                    value={filterPair}
                    onChange={(e) => setFilterPair(e.target.value)}
                    className="bg-[#141A28] border border-[#232D42] text-[11px] sm:text-xs font-mono text-neutral-300 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer focus:border-emerald-500/60 shrink-0"
                  >
                    <option value="all">All Pairs</option>
                    {availablePairs.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>

                  {/* Quick Search */}
                  <div className="relative flex-1 sm:w-56">
                    <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="Search setup / note..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#141A28] border border-[#232D42] text-[11px] sm:text-xs font-mono text-white rounded-lg pl-7 pr-6 py-1.5 outline-none placeholder:text-neutral-500 focus:border-emerald-500/60 transition-colors"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Reset Filters button if any active */}
                  {(filterOutcome !== 'all' || filterPair !== 'all' || searchQuery.trim()) && (
                    <button
                      onClick={() => {
                        setFilterOutcome('all');
                        setFilterPair('all');
                        setSearchQuery('');
                      }}
                      className="px-2 py-1.5 text-[10px] sm:text-xs font-mono text-neutral-400 hover:text-white bg-[#141A28] hover:bg-[#1E273A] border border-[#232D42] rounded-lg transition-colors cursor-pointer shrink-0"
                      title="Reset all filters"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FRIENDLY "NO TRADES RECORDED YET" PLACEHOLDER (When 0 real trades exist) */}
        {trades.length === 0 ? (
          <div className="py-16 px-6 sm:px-10 text-center rounded-2xl bg-[#0E1320] border border-[#1E273A] relative overflow-hidden shadow-xl max-w-2xl mx-auto my-4">
            <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="max-w-md mx-auto relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#141A28] border border-[#232D42] flex items-center justify-center mx-auto mb-5 text-emerald-400 shadow-inner">
                <Radio size={28} className="animate-pulse" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2.5 tracking-tight">
                No trades recorded yet
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mb-6">
                The algorithmic signal bot is actively scanning for Smart Money Concepts (SMC) order flow setups. As soon as trades are triggered and closed, verified execution tickets will appear here automatically.
              </p>

              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#141A28] border border-[#232D42] text-xs font-display font-medium text-neutral-300 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Auto-syncing every 60s</span>
                <span className="text-neutral-600">·</span>
                <button
                  onClick={() => fetchTrades(true)}
                  disabled={isRefreshing}
                  className="text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
                  <span>Check now</span>
                </button>
              </div>
            </div>
          </div>
        ) : displayedTrades.length === 0 ? (
          <div className="py-12 px-6 text-center rounded-2xl bg-[#0E1320] border border-[#1E273A]">
            <AlertCircle size={32} className="mx-auto text-neutral-500 mb-3" />
            <h3 className="text-sm font-semibold text-white mb-1">No trades match your filter</h3>
            <p className="text-xs text-neutral-400 mb-4 font-sans">
              Try adjusting your outcome filter, pair selection, or search query.
            </p>
            <button
              onClick={() => {
                setFilterOutcome('all');
                setFilterPair('all');
                setSearchQuery('');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#1A2234] hover:bg-[#232D42] text-white text-xs font-mono transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE VIEW */}
            <div
              className={`${
                viewMode === 'table' ? 'hidden lg:block' : 'hidden'
              } overflow-x-auto rounded-2xl border border-[#1E273A] bg-[#0C101A] shadow-xl`}
            >
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#1E273A] bg-[#0E1320] text-neutral-400 select-none">
                    <th
                      onClick={() => handleSort('date')}
                      className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Date Closed</span>
                        {renderSortIndicator('date')}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('symbol')}
                      className="py-3.5 px-3.5 cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Symbol</span>
                        {renderSortIndicator('symbol')}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('direction')}
                      className="py-3.5 px-3.5 cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Direction</span>
                        {renderSortIndicator('direction')}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('entry')}
                      className="py-3.5 px-3.5 text-right cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span>Entry</span>
                        {renderSortIndicator('entry')}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('stop')}
                      className="py-3.5 px-3.5 text-right cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span>Stop</span>
                        {renderSortIndicator('stop')}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('target')}
                      className="py-3.5 px-3.5 text-right cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span>Target</span>
                        {renderSortIndicator('target')}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('exit')}
                      className="py-3.5 px-3.5 text-right cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span>Exit</span>
                        {renderSortIndicator('exit')}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('outcome')}
                      className="py-3.5 px-3.5 text-center cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <span>Outcome</span>
                        {renderSortIndicator('outcome')}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('rr_actual')}
                      className="py-3.5 px-3.5 text-right cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span>R-Multiple</span>
                        {renderSortIndicator('rr_actual')}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('duration')}
                      className="py-3.5 px-3.5 text-right cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span>Duration</span>
                        {renderSortIndicator('duration')}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('target_kind')}
                      className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Target Type</span>
                        {renderSortIndicator('target_kind')}
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#161D2E]">
                  {renderedTrades.map((trade) => {
                    const isWin = trade.outcome === 'win';
                    const isLoss = trade.outcome === 'loss';
                    const isTimeout = trade.outcome === 'timeout';
                    const isOpen = trade.outcome === 'open' || (!trade.exit_epoch && !trade.exit_price);

                    const rValue = trade.rr_actual ?? 0;
                    const rDisplay = isOpen
                      ? 'Open'
                      : isTimeout
                      ? '0.00R'
                      : rValue > 0
                      ? `+${rValue.toFixed(2)}R`
                      : `${rValue.toFixed(2)}R`;

                    const rColor = isOpen
                      ? 'text-amber-400'
                      : isTimeout
                      ? 'text-neutral-400'
                      : isWin
                      ? 'text-emerald-400 font-bold'
                      : 'text-rose-400 font-bold';

                    return (
                      <tr
                        key={trade.id}
                        onClick={() => setSelectedTrade(trade)}
                        className="hover:bg-[#131926] transition-colors cursor-pointer group"
                      >
                        {/* Date */}
                        <td className="py-3.5 px-4 text-neutral-300 whitespace-nowrap">
                          {formatEpoch(trade.exit_epoch || trade.sent_epoch)}
                        </td>

                        {/* Symbol */}
                        <td className="py-3.5 px-3.5 whitespace-nowrap">
                          <span className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {cleanSymbol(trade.symbol)}
                          </span>
                        </td>

                        {/* Direction */}
                        <td className="py-3.5 px-3.5 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 font-semibold text-[11px] px-2.5 py-0.5 rounded-full ${
                              trade.direction.toLowerCase() === 'bullish'
                                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60'
                                : 'bg-rose-950/70 text-rose-300 border border-rose-800/60'
                            }`}
                          >
                            {trade.direction.toLowerCase() === 'bullish' ? (
                              <ArrowUpRight size={12} />
                            ) : (
                              <ArrowDownRight size={12} />
                            )}
                            {trade.direction.toUpperCase()}
                          </span>
                        </td>

                        {/* Entry */}
                        <td className="py-3.5 px-3.5 text-right text-neutral-200 tabular-nums">
                          {formatPrice(trade.entry, trade.symbol)}
                        </td>

                        {/* Stop */}
                        <td className="py-3.5 px-3.5 text-right text-rose-400 tabular-nums">
                          {formatPrice(trade.stop, trade.symbol)}
                        </td>

                        {/* Target */}
                        <td className="py-3.5 px-3.5 text-right text-emerald-400 tabular-nums">
                          {formatPrice(trade.target, trade.symbol)}
                        </td>

                        {/* Exit */}
                        <td className="py-3.5 px-3.5 text-right text-white font-semibold tabular-nums">
                          {formatPrice(trade.exit_price, trade.symbol)}
                        </td>

                        {/* Outcome Badge */}
                        <td className="py-3.5 px-3.5 text-center whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                              isWin
                                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                                : isLoss
                                ? 'bg-rose-950/80 text-rose-300 border border-rose-700/60'
                                : isTimeout
                                ? 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                                : 'bg-amber-950/80 text-amber-300 border border-amber-700/60'
                            }`}
                          >
                            {isWin ? (
                              <CheckCircle2 size={11} />
                            ) : isLoss ? (
                              <XCircle size={11} />
                            ) : isTimeout ? (
                              <MinusCircle size={11} />
                            ) : (
                              <Activity size={11} />
                            )}
                            {trade.outcome}
                          </span>
                        </td>

                        {/* R-Multiple */}
                        <td className={`py-3.5 px-3.5 text-right tabular-nums ${rColor}`}>
                          <div className="font-semibold">{rDisplay}</div>
                        </td>

                        {/* Duration */}
                        <td className="py-3.5 px-3.5 text-right text-neutral-300 tabular-nums whitespace-nowrap">
                          {formatDuration(trade.duration_seconds)}
                        </td>

                        {/* Target Type */}
                        <td className="py-3.5 px-4 text-neutral-300 max-w-xs truncate">
                          <span className="text-white font-medium block truncate">
                            {trade.target_kind}
                          </span>
                          {trade.note && (
                            <span className="text-[10px] text-neutral-500 block truncate font-sans">
                              {trade.note}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* RESPONSIVE CARDS VIEW (Collapsible mini cards optimized for mobile devices and high trade counts) */}
            <div
              className={`${
                viewMode === 'cards' ? 'grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5' : 'lg:hidden space-y-2.5 sm:space-y-3'
              }`}
            >
              {renderedTrades.map((trade) => {
                const isWin = trade.outcome === 'win';
                const isLoss = trade.outcome === 'loss';
                const isTimeout = trade.outcome === 'timeout';
                const isOpen = trade.outcome === 'open' || (!trade.exit_epoch && !trade.exit_price);

                const rValue = trade.rr_actual ?? 0;
                const rDisplay = isOpen
                  ? 'Open'
                  : isTimeout
                  ? '0.00R'
                  : rValue > 0
                  ? `+${rValue.toFixed(2)}R`
                  : `${rValue.toFixed(2)}R`;

                const rColor = isOpen
                  ? 'text-amber-400'
                  : isTimeout
                  ? 'text-neutral-400'
                  : isWin
                  ? 'text-emerald-400 font-bold'
                  : 'text-rose-400 font-bold';

                const isExpanded = isTradeExpanded(trade.id);

                return (
                  <div
                    key={trade.id}
                    className={`rounded-xl sm:rounded-2xl bg-[#111624] border transition-all shadow-md relative overflow-hidden flex flex-col justify-between ${
                      isWin
                        ? 'border-emerald-900/40 hover:border-emerald-500/50'
                        : isLoss
                        ? 'border-rose-900/40 hover:border-rose-500/50'
                        : 'border-[#1E2638] hover:border-neutral-600'
                    } ${isExpanded ? 'p-3.5 sm:p-5 bg-[#101522]' : 'p-2.5 sm:p-3.5 hover:bg-[#131929]'}`}
                  >
                    {/* MINI CARD HEADER: Mobile-prioritized executive summary with fluid typography */}
                    <div>
                      <div
                        onClick={() => toggleTradeExpand(trade.id)}
                        className="cursor-pointer select-none"
                      >
                        {/* Row 1: Symbol, Direction, Setup Capsule | Outcome, R-Multiple, Specs Button */}
                        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                          {/* Left: Symbol & badges */}
                          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-wrap sm:flex-nowrap">
                            <span className="font-display font-bold text-white fluid-symbol tracking-tight shrink-0">
                              {cleanSymbol(trade.symbol)}
                            </span>

                            <span
                              className={`fluid-capsule font-display px-1.5 py-0.5 rounded uppercase font-bold inline-flex items-center gap-0.5 shrink-0 ${
                                trade.direction.toLowerCase() === 'bullish'
                                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                                  : 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                              }`}
                            >
                              {trade.direction.toLowerCase() === 'bullish' ? (
                                <ArrowUpRight size={10} />
                              ) : (
                                <ArrowDownRight size={10} />
                              )}
                              <span>{trade.direction.toUpperCase()}</span>
                            </span>

                            {trade.target_kind && (
                              <span className="px-1.5 py-0.5 rounded bg-[#162032] border border-[#23314D] text-emerald-300 font-display font-medium fluid-capsule inline-flex items-center gap-1 shrink-0">
                                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                                <span className="truncate max-w-[65px] sm:max-w-none">{trade.target_kind}</span>
                              </span>
                            )}
                          </div>

                          {/* Right: Outcome, R-Multiple & Expand/Collapse Toggle Button */}
                          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                            <span
                              className={`px-1.5 sm:px-2 py-0.5 rounded fluid-capsule font-display font-bold uppercase tracking-wider shrink-0 ${
                                isWin
                                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                                  : isLoss
                                  ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                                  : isTimeout
                                  ? 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                                  : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                              }`}
                            >
                              {trade.outcome}
                            </span>

                            <span className={`font-display fluid-r font-bold tabular-nums shrink-0 ${rColor}`}>
                              {rDisplay}
                            </span>

                            {/* Collapse / Expand Specs Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTradeExpand(trade.id);
                              }}
                              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg fluid-capsule font-display font-semibold transition-colors cursor-pointer flex items-center gap-1 border shrink-0 ${
                                isExpanded
                                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                                  : 'bg-[#161F30] text-neutral-300 border-[#23314D] hover:text-white hover:bg-[#1D283E]'
                              }`}
                              title={isExpanded ? 'Collapse characteristics' : 'Expand characteristics'}
                            >
                              <span>{isExpanded ? 'Hide' : 'Specs'}</span>
                              {isExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                            </button>
                          </div>
                        </div>

                        {/* Row 2: Sub Meta line with Duration & Timestamp (Fluid typography, never truncates!) */}
                        <div className="flex items-center gap-2 mt-1.5 fluid-meta font-mono text-neutral-400">
                          <span className="inline-flex items-center gap-1 shrink-0">
                            <Clock size={11} className="text-neutral-500 shrink-0" />
                            <span>{formatDuration(trade.duration_seconds)}</span>
                          </span>
                          <span className="text-neutral-600">·</span>
                          <span className="inline-flex items-center gap-1 truncate text-neutral-400">
                            <Calendar size={11} className="text-neutral-500 shrink-0" />
                            <span className="truncate">{formatEpoch(trade.exit_epoch || trade.sent_epoch)}</span>
                          </span>
                        </div>
                      </div>

                      {/* COLLAPSIBLE TRADE CHARACTERISTICS BODY WITH FLUID PRICING */}
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-[#1A2336] animate-fadeIn">
                          {/* Price Execution Grid - Roomy 2x2 on mobile, 4-col on desktop with fluid pricing */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 mb-2.5">
                            <div className="p-2 sm:p-2.5 rounded-lg bg-[#0A0D15] border border-[#1A2234] flex flex-col justify-between overflow-hidden">
                              <span className="fluid-label text-neutral-400 uppercase block font-display font-semibold tracking-wider mb-0.5 truncate">
                                Entry
                              </span>
                              <span className="fluid-price font-mono text-neutral-200 tabular-nums font-bold truncate">
                                {formatPrice(trade.entry, trade.symbol)}
                              </span>
                            </div>
                            <div className="p-2 sm:p-2.5 rounded-lg bg-[#0A0D15] border border-[#1A2234] flex flex-col justify-between overflow-hidden">
                              <span className="fluid-label text-neutral-400 uppercase block font-display font-semibold tracking-wider mb-0.5 truncate">
                                Stop Loss
                              </span>
                              <span className="fluid-price font-mono text-rose-400 tabular-nums font-bold truncate">
                                {formatPrice(trade.stop, trade.symbol)}
                              </span>
                            </div>
                            <div className="p-2 sm:p-2.5 rounded-lg bg-[#0A0D15] border border-[#1A2234] flex flex-col justify-between overflow-hidden">
                              <span className="fluid-label text-neutral-400 uppercase block font-display font-semibold tracking-wider mb-0.5 truncate">
                                Target
                              </span>
                              <span className="fluid-price font-mono text-emerald-400 tabular-nums font-bold truncate">
                                {formatPrice(trade.target, trade.symbol)}
                              </span>
                            </div>
                            <div className="p-2 sm:p-2.5 rounded-lg bg-[#0A0D15] border border-[#1A2234] flex flex-col justify-between overflow-hidden">
                              <span className="fluid-label text-neutral-400 uppercase block font-display font-semibold tracking-wider mb-0.5 truncate">
                                Exit
                              </span>
                              <span className="fluid-price font-mono text-white tabular-nums font-bold truncate">
                                {formatPrice(trade.exit_price, trade.symbol)}
                              </span>
                            </div>
                          </div>

                          {/* Setup, Duration, and Full Timestamp Bar */}
                          <div className="p-2 sm:p-2.5 rounded-lg bg-[#0A0D15] border border-[#1A2234] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 fluid-meta font-mono">
                            <div className="flex items-center gap-1.5">
                              <span className="text-neutral-500 font-display fluid-label uppercase font-bold">Model</span>
                              <span className="text-emerald-300 font-display font-semibold fluid-meta inline-flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                {trade.target_kind}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 text-neutral-300 flex-wrap">
                              <span className="inline-flex items-center gap-1 text-neutral-400">
                                <Clock size={11} className="text-neutral-500" />
                                <span>{formatDuration(trade.duration_seconds)}</span>
                              </span>
                              <span className="text-neutral-600">·</span>
                              <span className="inline-flex items-center gap-1 text-neutral-300 font-mono">
                                <Calendar size={11} className="text-neutral-500 shrink-0" />
                                <span>{formatEpoch(trade.exit_epoch || trade.sent_epoch)}</span>
                              </span>
                            </div>
                          </div>

                          {/* Trade Note Block */}
                          {trade.note && (
                            <div className="mt-2.5 p-2.5 rounded-lg bg-[#0A0D15] border border-[#1A2234] fluid-meta font-mono text-neutral-300 leading-relaxed flex items-start gap-2">
                              <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span className="break-words">{trade.note}</span>
                            </div>
                          )}

                          {/* Action Footer */}
                          <div className="mt-2.5 pt-2 border-t border-[#1A2336] flex items-center justify-between fluid-meta">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTrade(trade);
                              }}
                              className="text-neutral-400 hover:text-emerald-400 font-display font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Maximize2 size={11} />
                              <span>View Trade Details</span>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTradeExpand(trade.id);
                              }}
                              className="text-neutral-500 hover:text-neutral-300 font-display fluid-capsule cursor-pointer"
                            >
                              Collapse Specs ▴
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PROGRESSIVE 'LOAD MORE' STREAM CONTROLS (DOM-Bounded for 50+ trades) */}
            {displayedTrades.length > 0 && paginationMode === 'loadMore' && (
              <div className="mt-6 pt-5 border-t border-[#1A2234] space-y-4">
                {/* Visual Progress Bar & DOM Node Counter */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>
                        Rendered <strong className="text-white font-bold">{renderedTrades.length}</strong> of{' '}
                        <strong className="text-white font-bold">{displayedTrades.length}</strong> trades
                      </span>
                    </span>

                    <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline-flex items-center gap-1.5">
                      <ShieldCheck size={13} className="text-emerald-400" />
                      <span>DOM Safe ({renderedTrades.length} active nodes)</span>
                    </span>
                  </div>

                  {/* Meter Bar */}
                  <div className="w-full bg-[#121724] h-1.5 rounded-full overflow-hidden border border-[#1E273A]">
                    <div
                      className="bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, Math.max(4, (renderedTrades.length / displayedTrades.length) * 100))}%`
                      }}
                    />
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  {renderedTrades.length < displayedTrades.length ? (
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {/* Big Institutional Load More Button */}
                      <button
                        type="button"
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="px-5 py-2.5 rounded-xl text-xs font-display font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black shadow-lg shadow-emerald-950/40 hover:shadow-emerald-900/50 transition-all cursor-pointer flex items-center gap-2 active:scale-98 disabled:opacity-50"
                      >
                        {isLoadingMore ? (
                          <RefreshCw size={13} className="animate-spin text-black" />
                        ) : (
                          <ChevronDown size={14} className="text-black" />
                        )}
                        <span>
                          Load More (+{Math.min(loadBatchSize, displayedTrades.length - renderedTrades.length)} Trades)
                        </span>
                        <span className="text-[10px] font-mono opacity-80 px-1.5 py-0.5 rounded bg-black/20">
                          {displayedTrades.length - renderedTrades.length} left
                        </span>
                      </button>

                      {/* Batch Size Selector */}
                      <div className="flex items-center gap-1 text-xs font-mono text-neutral-400 bg-[#121724] border border-[#1E273A] rounded-xl p-1">
                        <span className="text-[10px] font-display text-neutral-500 px-1.5">Batch:</span>
                        {[10, 25, 50].map((batch) => (
                          <button
                            key={batch}
                            type="button"
                            onClick={() => setLoadBatchSize(batch)}
                            className={`px-2 py-0.5 rounded-lg text-[11px] transition-colors cursor-pointer ${
                              loadBatchSize === batch
                                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                                : 'text-neutral-400 hover:text-white'
                            }`}
                          >
                            +{batch}
                          </button>
                        ))}
                      </div>

                      {/* Quick Load All */}
                      {displayedTrades.length > visibleCount && (
                        <button
                          type="button"
                          onClick={() => setVisibleCount(displayedTrades.length)}
                          className="px-3 py-2 rounded-xl text-xs font-display text-neutral-400 hover:text-white bg-[#141A28] hover:bg-[#1C2538] border border-[#232D42] transition-colors cursor-pointer"
                          title="Render all remaining trades into DOM"
                        >
                          Load All ({displayedTrades.length})
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3.5 py-2 rounded-xl">
                      <CheckCircle2 size={13} className="text-emerald-400" />
                      <span>All {displayedTrades.length} verified executions loaded</span>
                    </div>
                  )}

                  {/* Reset / Collapse Back to Top 10 Button */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {visibleCount > 10 && (
                      <button
                        type="button"
                        onClick={handleResetVisibleCount}
                        className="px-3 py-2 rounded-xl text-xs font-display text-neutral-400 hover:text-white bg-[#141A28] hover:bg-[#1C2538] border border-[#232D42] transition-colors cursor-pointer flex items-center gap-1.5"
                        title="Collapse DOM back down to initial 10 items"
                      >
                        <Minimize2 size={12} className="text-neutral-400" />
                        <span>Trim to Top 10</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setPaginationMode('paged')}
                      className="px-3 py-2 rounded-xl text-xs font-display text-neutral-400 hover:text-white bg-[#141A28] hover:bg-[#1C2538] border border-[#232D42] transition-colors cursor-pointer"
                    >
                      Numbered Pages ➔
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* NUMBERED PAGINATION CONTROLS (When in 'paged' mode) */}
            {displayedTrades.length > 0 && paginationMode === 'paged' && (
              <div className="mt-6 pt-4 border-t border-[#1A2234] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 flex-wrap">
                  <span>
                    Showing{' '}
                    <strong className="text-white font-bold">
                      {(currentPage - 1) * pageSize + 1}
                      –
                      {Math.min(currentPage * pageSize, displayedTrades.length)}
                    </strong>{' '}
                    of <strong className="text-white font-bold">{displayedTrades.length}</strong> trades
                  </span>

                  {/* Page Size Selector */}
                  <div className="flex items-center gap-1.5 ml-0 sm:ml-2">
                    <span className="text-[11px] text-neutral-500 font-display">Per page:</span>
                    {[10, 25, 50, 100].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setPageSize(size);
                          setCurrentPage(1);
                        }}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer border ${
                          pageSize === size
                            ? 'bg-emerald-500/20 text-emerald-300 font-bold border-emerald-500/50 shadow-sm'
                            : 'bg-[#141A28] text-neutral-400 hover:text-white border-[#232D42]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setPaginationMode('loadMore')}
                    className="text-[11px] text-emerald-400 hover:underline cursor-pointer ml-1"
                  >
                    Switch to Stream View
                  </button>
                </div>

                {/* Page Navigation Buttons */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#141A28] border border-[#232D42] text-neutral-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (p) =>
                          p === 1 ||
                          p === totalPages ||
                          Math.abs(p - currentPage) <= 1
                      )
                      .map((p, idx, arr) => {
                        const prevPageNum = arr[idx - 1];
                        const showEllipsis = prevPageNum && p - prevPageNum > 1;
                        return (
                          <span key={p} className="flex items-center gap-1">
                            {showEllipsis && <span className="text-neutral-500 text-xs">...</span>}
                            <button
                              type="button"
                              onClick={() => setCurrentPage(p)}
                              className={`w-7 h-7 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center justify-center border ${
                                currentPage === p
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold shadow-sm'
                                  : 'bg-[#141A28] text-neutral-400 hover:text-white border-[#232D42]'
                              }`}
                            >
                              {p}
                            </button>
                          </span>
                        );
                      })}

                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#141A28] border border-[#232D42] text-neutral-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Trade Detail Inspector Modal */}
      {selectedTrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0E1320] border border-[#232D42] rounded-2xl p-6 shadow-2xl relative text-neutral-200 font-sans">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1C2538]">
              <div className="flex items-center gap-3">
                <div className="text-xl font-display font-bold text-white">
                  {cleanSymbol(selectedTrade.symbol)} Execution Record
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    selectedTrade.outcome === 'win'
                      ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60'
                      : selectedTrade.outcome === 'loss'
                      ? 'bg-rose-950/70 text-rose-300 border border-rose-800/60'
                      : 'bg-neutral-800 text-neutral-300'
                  }`}
                >
                  {selectedTrade.outcome}
                </span>
              </div>
              <button
                onClick={() => setSelectedTrade(null)}
                className="p-1 rounded text-neutral-400 hover:text-white hover:bg-[#1A2234] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#141A28] border border-[#1E273A]">
                <div>
                  <span className="text-neutral-500 block text-[10px]">Execution Timestamp</span>
                  <span className="text-white font-medium">
                    {formatEpoch(selectedTrade.exit_epoch || selectedTrade.sent_epoch)}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">Holding Time</span>
                  <span className="text-white font-medium">
                    {formatDuration(selectedTrade.duration_seconds)}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">Planned R:R Model</span>
                  <span className="text-sky-400 font-bold">1:{selectedTrade.rr_planned}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">Realized Return</span>
                  <span
                    className={
                      selectedTrade.outcome === 'win'
                        ? 'text-emerald-400 font-bold'
                        : 'text-rose-400 font-bold'
                    }
                  >
                    {selectedTrade.rr_actual !== null && selectedTrade.rr_actual !== undefined
                      ? `${selectedTrade.rr_actual > 0 ? '+' : ''}${selectedTrade.rr_actual}R`
                      : '—'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center p-3.5 rounded-xl bg-[#141A28] border border-[#1E273A]">
                <div className="overflow-hidden">
                  <span className="text-neutral-500 block fluid-label uppercase">Entry Price</span>
                  <span className="text-white tabular-nums font-semibold fluid-price truncate block">
                    {formatPrice(selectedTrade.entry, selectedTrade.symbol)}
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span className="text-neutral-500 block fluid-label uppercase">Stop Loss</span>
                  <span className="text-rose-400 tabular-nums font-semibold fluid-price truncate block">
                    {formatPrice(selectedTrade.stop, selectedTrade.symbol)}
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span className="text-neutral-500 block fluid-label uppercase">Take Profit</span>
                  <span className="text-emerald-400 tabular-nums font-semibold fluid-price truncate block">
                    {formatPrice(selectedTrade.target, selectedTrade.symbol)}
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span className="text-neutral-500 block fluid-label uppercase">Exit Level</span>
                  <span className="text-white tabular-nums font-semibold fluid-price truncate block">
                    {formatPrice(selectedTrade.exit_price, selectedTrade.symbol)}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 block text-[11px] mb-1 font-semibold">
                  Setup Objective
                </span>
                <div className="p-3 rounded-xl bg-[#141A28] border border-[#1E273A] text-neutral-200">
                  {selectedTrade.target_kind}
                </div>
              </div>

              {selectedTrade.note && (
                <div>
                  <span className="text-neutral-400 block text-[11px] mb-1 font-semibold">
                    Algorithmic Trade Reflection
                  </span>
                  <div className="p-3 rounded-xl bg-[#141A28] border border-[#1E273A] text-neutral-300 font-sans leading-relaxed">
                    {selectedTrade.note}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3.5 border-t border-[#1C2538] flex justify-end">
              <button
                onClick={() => setSelectedTrade(null)}
                className="px-4 py-2 rounded-xl bg-[#1E273A] hover:bg-[#27344D] text-white text-xs font-display font-semibold transition-colors cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Footer Guarantee */}
      <div className="relative z-10 px-6 sm:px-8 md:px-10 py-4 bg-[#0A0D15] border-t border-[#1A2234] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-neutral-500">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
          <span>Verified execution ledger. Fixed 1R risk management enforced across all trades.</span>
        </div>
        <div className="text-neutral-400 font-medium">
          Mechanical Capital Architecture · Predetermined 1R Execution Model
        </div>
      </div>
    </section>
  );
}

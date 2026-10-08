# OGWU Executive Portal: Multi-Discipline Portfolio, Forex Journal & Build Log

Redesign the platform into an executive multi-discipline studio portal that positions founder Francis Ogwu predominantly as an institutional Forex trader, while seamlessly integrating his architecture portfolio, media production, and live founder build log for upcoming ventures. Includes a dedicated popover Lot Size & Risk Calculator accessible across the site.

### User Review & Critical Decisions

> [!IMPORTANT]
> **Confirmed Decisions from Phase 1 Clarifications**:
> - **Domain Architecture**: Executive multi-discipline portal with a domain switcher (`All Domains`, `Forex Trading (Dominant)`, `Architecture & Spatial`, `Media & Social`, `Upcoming Lab & Ventures`).
> - **Lot Size Calculator UX**: Clean popover utility accessible on demand from both the primary navigation/sidebar and hero action buttons.
> - **Upcoming Projects & Journal**: Founder build log with status indicators (`Active Dev`, `Planning`, `Live Beta`), milestone timelines, and documented trade reflections.
> - **Zero Synthetic Clutter**: Live chart removed; no mock telemetry or ticker spam. Retains clean trade journal entries and real risk math.

---

### 1. Overview & Core Concept

- **What It Does**: Presents a unified, highly polished executive digital identity for Francis Ogwu. The site establishes Forex trading as his core discipline (featuring an audited trade journal, trading philosophy, and instant popover lot calculator), alongside architectural projects, digital media/content, and an active Founder Build Log documenting in-progress and upcoming ventures.
- **Target Audience / Persona**: Capital allocators, trading mentees/partners, architectural clients, media collaborators, and tech venture followers seeking a disciplined, transparent polymath founder.
- **Key Value**: Eliminates the previous imbalance (where the site was 100% forex or 100% generic) by giving Forex primary emphasis while elevating architectural craftsmanship, social media, and documented future milestones.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Landing & Executive Overview**: The user enters a refined dual-toned executive layout. The Hero introduces Ogwu as a Currency Trader, Architect, and Builder. A persistent **"Risk & Lot Calculator"** button triggers the popover calculation drawer.
2. **Domain Switcher**: Located immediately below the Hero (and synced with sidebar navigation), users can toggle between:
   - **All Disciplines** (holistic founder overview)
   - **Forex Desk (Primary)** (trade journal, risk calculator popover, market approach, prop risk rules)
   - **Architecture & Spatial** (3D architectural renders, structural blueprints, design methodology)
   - **Media & Social** (YouTube breakdowns, market analysis broadcasts, content series)
   - **Founder Build Log** (upcoming documented projects, roadmap stages, milestones)
3. **Lot Size Risk Calculator Popover**:
   - Opens smoothly as a focused modal/drawer from navigation or hero.
   - User inputs: **Risk in Dollars** (e.g. `$10`), **Pair** (e.g. `EUR/USD`, `GBP/USD`, `XAU/USD`), **Stop Loss** (in pips), and **Risk:Reward** ratio.
   - Live calculations instantly output: exact Lot Size (e.g., `0.07 Lots` or `0.002 Lots` based on pip value), exact dollar loss if SL hits (capped strictly at the user's risk), and potential dollar profit if Take Profit is achieved.
   - Includes one-click "Copy Trade Plan" button for trader execution.
4. **Founder Build Log & Forex Journal**:
   - Filterable chronological entries with real-world status markers, execution timestamps, and transparent reflections.

#### Visual Identity & Theme
- **Aesthetic Direction**: High-contrast Executive Minimalist & Architectural Discipline (`#0B0E14` dark / `#FAFAFA` light, clean slate borders `#1F2937`, financial emerald `#10B981`, and architectural cobalt `#2563EB`).
- **Color Palette & Discipline (60-30-10)**:
  - `60% Neutral Canvas`: Stark slate dark (`#0A0D14` / `#121212`) or pristine gallery white (`#FFFFFF` / `#F8F9FA`).
  - `30% Structural Surfaces`: Hairline card borders, subtle grid separators, and soft background panels (`#161B26` / `#F1F3F5`).
  - `10% Accent Intent`: Financial green (`#10B981`) for Forex & trade metrics; Precision blue (`#2563EB`) for architecture & interactive controls.
- **Typography & Scale (2+1 Font Rule)**:
  - Display: `Outfit` / `Syne` for modern architectural and financial authority.
  - Body: `Manrope` / `Plus Jakarta Sans` for clean, effortless readability.
  - Telemetry & Data: `JetBrains Mono` with `tabular-nums` for all lot calculations, pips, coordinates, and prices.
- **Zero-Pill Restraint**: Metadata rendered with clean typographical separators (`·`, `/`) instead of bordered pill tags. Interactive domain controls use segmented tabs with functional state transitions.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Domain Filter Architecture vs. Disjointed Pages**
  - *Chosen Approach*: Single-page executive portal with an instant domain filter (`All`, `Forex`, `Architecture`, `Media`, `Build Log`) with smooth Lenis scroll and view filtering.
  - *Why*: Enables first-time visitors to see the cohesive founder story without navigation fatigue, while allowing domain-specific visitors (e.g. forex traders or architectural clients) to filter instantly.
- **Decision 2: Popover Lot Calculator vs. Embedded Widget**
  - *Chosen Approach*: Global popover modal utility triggerable from the navbar, hero, and forex journal section.
  - *Why*: Traders frequently need to calculate lot sizes on the fly without losing their place on the page or scrolling through lengthy sections. Keeps the main page flow clean and uncluttered.
- **Decision 3: Founder Build Log for Upcoming Ventures**
  - *Chosen Approach*: Interactive build log cards with milestone progress bars, active status labels, and dev logs.
  - *Why*: Accurately reflects Ogwu's request to document upcoming projects and transparency in venture building.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          App.tsx (Main Shell)                          │
│   ├── Lenis Smooth Scroll                                              │
│   ├── Active Domain State: ('all' | 'forex' | 'arch' | 'media' | 'lab')│
│   └── Global Popover Calculator State: (isOpen: boolean)               │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
       ┌────────────────────────────┴───────────────────────────┐
       ▼                                                        ▼
┌───────────────────────────────┐        ┌───────────────────────────────┐
│     Sidebar & Top Nav         │        │    Popover Risk Calculator    │
│  - Logo & Ogwu Crest          │        │  - Inputs: $ Risk, Pair, SL,  │
│  - Domain Quick Links         │◄───────┤    Target R:R                 │
│  - Launch Calculator Trigger  │        │  - Exact Lot Math Output      │
│  - Dark / Light Mode Toggle   │        │  - TP Payout & Copy Plan      │
└──────────────┬────────────────┘        └───────────────────────────────┘
               │
               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Executive Content Stream                        │
│  ├── Hero: Founder Statement & Action Buttons                          │
│  ├── Domain Filter Tabs: (All · Forex · Architecture · Media · Log)    │
│  ├── Forex Journal & Philosophy (Filtered)                             │
│  ├── Architecture & Spatial Showcase (Filtered)                        │
│  ├── Media & Social Production (Filtered)                              │
│  ├── Founder Build Log: Upcoming Ventures (Filtered)                   │
│  ├── Timeline & Background (Filtered)                                  │
│  └── Contact / Direct Inquiries                                        │
└────────────────────────────────────────────────────────────────────────┘
```

#### Exact Lot Size Risk Formula Implementation
$$\text{Pip Value} = \text{broker dollar value per standard 1.00 lot for the chosen pair}$$
$$\text{Required Lot Size} = \frac{\text{Dollar Risk Target (\$) } (\text{e.g. } \$10.00)}{\text{Stop Loss Distance in Pips} \times \text{Pip Value}}$$
$$\text{Expected Loss at SL} = \text{Lot Size} \times \text{Stop Loss Pips} \times \text{Pip Value} \equiv \text{Dollar Risk Target}$$
$$\text{Take Profit Reward} = \text{Dollar Risk Target} \times \text{Risk-to-Reward Ratio}$$

#### State & Interaction Mapping
- `activeDomain`: Triggers animated cross-fades and section visibility using `motion/react`.
- `calculatorOpen`: Opens/closes the popover overlay with escape key listener, backdrop blur, and focus management.
- `riskAmount`, `pairSymbol`, `stopLossPips`, `riskRewardRatio`: Reactive state updating calculated lots in real time with 0ms latency.
- `copied`: Shows feedback banner upon copying the formatted order plan.

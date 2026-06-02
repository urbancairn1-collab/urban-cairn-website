// Pine (TradingView) indicator suite — UC Tech Sol's in-house trading product.
// Drives the Pine section on /trading-tools, the portfolio project, and case study.

export const pineMeta = {
  name: 'Pine Indicators',
  tagline: 'Precise Signals. Powerful Trades.',
  promise: 'Advanced Pine Script indicators for smarter, more consistent trading.',
};

// The four headline benefits (from the product sheet). Icons are lucide names.
export const pineBenefits = [
  { icon: 'Crosshair', title: 'Accurate Signals', desc: 'Clean BUY / SELL calls with minimal noise and fewer false triggers.' },
  { icon: 'TrendingUp', title: 'Trend Identification', desc: 'Spot direction and momentum shifts early with adaptive trend bands.' },
  { icon: 'Shield', title: 'Lower Risk', desc: 'Built-in volatility and risk filters keep you out of choppy markets.' },
  { icon: 'Gauge', title: 'Built for Consistency', desc: 'Rule-based logic you can repeat — no discretionary second-guessing.' },
];

// The five indicator modules. `kind` drives the mini-SVG in Mock.jsx (PineIndicatorMini).
export const pineIndicators = [
  { kind: 'trend', name: 'Trend Indicator', desc: 'Adaptive trend direction with dynamic support/resistance bands.' },
  { kind: 'momentum', name: 'Momentum Indicator', desc: 'Histogram momentum that flags acceleration and exhaustion.' },
  { kind: 'volatility', name: 'Volatility Indicator', desc: 'Expanding/contracting bands that map regime changes.' },
  { kind: 'sr', name: 'Support & Resistance', desc: 'Auto-plotted key levels that update as price evolves.' },
  { kind: 'signal', name: 'Signal Indicator', desc: 'Discrete BUY / SELL arrows from confluence of the above.' },
];

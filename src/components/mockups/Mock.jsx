// Coded product mockups (ported from uc-tech-sol, recoloured to the light
// urban-cairn palette so they read as native screenshots). Pure CSS/SVG —
// no images. Vermilion accent (--accent) + electric blue (--info) + green (--success).
import {
  LayoutGrid, BarChart3, Users, Boxes, Workflow, Bell, Package, Wallet,
} from 'lucide-react';

const ACCENT = 'var(--accent)';
const INK = 'var(--ink)';

/* ---- shared bits ---- */
const Chrome = ({ addr }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '9px 12px', borderBottom: '1px solid var(--line)', background: 'var(--bg-soft)',
  }}>
    <span style={{ display: 'flex', gap: 5 }}>
      <i style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
      <i style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} />
      <i style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
    </span>
    <span style={{
      marginLeft: 4, flex: 1, height: 20, borderRadius: 999, background: 'var(--bg-pure)',
      border: '1px solid var(--line)', display: 'flex', alignItems: 'center', padding: '0 10px',
      fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)',
    }}>{addr}</span>
  </div>
);

const Shell = ({ children }) => (
  <div style={{
    borderRadius: 'var(--r-md)', border: '1px solid var(--line)', background: 'var(--bg-pure)',
    boxShadow: 'var(--shadow-md)', overflow: 'hidden',
  }}>{children}</div>
);

const AreaChart = ({ color = ACCENT }) => {
  const pts = [12, 30, 22, 44, 38, 60, 52, 78, 70, 96];
  const w = 280, h = 90, step = w / (pts.length - 1);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${h - (p / 100) * h}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: 90, overflow: 'visible' }}>
      <defs>
        <linearGradient id="uc-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L ${w} ${h} L 0 ${h} Z`} fill="url(#uc-area)" />
      <path d={line} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const MiniBars = () => {
  const bars = [40, 65, 50, 80, 60, 95, 72];
  const w = 280, h = 80, bw = w / bars.length - 8;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: 70 }}>
      {bars.map((b, i) => (
        <rect key={i} x={i * (bw + 8) + 4} y={h - (b / 100) * h} width={bw} height={(b / 100) * h} rx="3"
          fill={i === bars.length - 2 ? ACCENT : 'var(--accent-soft)'} stroke={ACCENT} strokeOpacity="0.25" />
      ))}
    </svg>
  );
};

const Tile = ({ label, value, chg, up = true }) => (
  <div style={{ padding: '10px 12px', borderRadius: 'var(--r-sm)', border: '1px solid var(--line)', background: 'var(--bg-pure)' }}>
    <div style={{ fontSize: 8.5, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: INK, marginTop: 2 }}>{value}</div>
    {chg && <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: up ? 'var(--success)' : '#dc2626' }}>{up ? '▲' : '▼'} {chg}</div>}
  </div>
);

/* ---- 1. Dashboard ---- */
export const DashboardMock = () => (
  <Shell>
    <Chrome addr="app.urbancairn.in/dashboard" />
    <div style={{ display: 'grid', gridTemplateColumns: '54px 1fr', minHeight: 240 }}>
      <div style={{ borderRight: '1px solid var(--line)', padding: '14px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, background: 'var(--bg-soft)' }}>
        {[LayoutGrid, BarChart3, Users, Boxes, Workflow].map((I, i) => (
          <span key={i} style={{
            width: 30, height: 30, borderRadius: 8, display: 'grid', placeItems: 'center',
            background: i === 0 ? ACCENT : 'transparent', color: i === 0 ? '#fff' : 'var(--text-muted)',
          }}><I size={15} strokeWidth={1.9} /></span>
        ))}
      </div>
      <div style={{ padding: 14, display: 'grid', gap: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
          <Tile label="Revenue" value="₹18.4L" chg="24.6%" />
          <Tile label="Active Users" value="3,912" chg="12.1%" />
          <Tile label="Conversion" value="6.8%" chg="3.2%" />
        </div>
        <div style={{ borderRadius: 'var(--r-sm)', border: '1px solid var(--line)', background: 'var(--bg-pure)', padding: 12 }}>
          <AreaChart />
        </div>
        <div style={{ borderRadius: 'var(--r-sm)', border: '1px solid var(--line)', background: 'var(--bg-pure)', padding: 12 }}>
          <MiniBars />
        </div>
      </div>
    </div>
  </Shell>
);

/* ---- 2. Trading ---- */
export const TradingMock = () => {
  const rows = [
    ['22,480', '1,240', 'buy'], ['22,475', '980', 'buy'], ['22,470', '2,110', 'buy'],
    ['22,465', '760', 'sell'], ['22,460', '1,540', 'sell'], ['22,455', '890', 'sell'],
  ];
  return (
    <Shell>
      <Chrome addr="terminal.urbancairn.in" />
      <div style={{ padding: 14, display: 'grid', gap: 12 }}>
        <div style={{ borderRadius: 'var(--r-sm)', border: '1px solid var(--line)', background: 'var(--bg-pure)', padding: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: INK }}>NIFTY 50 · 22,468.30</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--success)' }}>+184.20 (0.83%)</span>
          </div>
          <AreaChart color="var(--success)" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 8 }}>
          <div style={{ borderRadius: 'var(--r-sm)', border: '1px solid var(--line)', background: 'var(--bg-pure)', padding: 10, display: 'grid', gap: 3, fontFamily: 'var(--font-mono)', fontSize: 9.5 }}>
            {rows.map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 16px', padding: '3px 7px', borderRadius: 4, position: 'relative', overflow: 'hidden', color: 'var(--text-soft)' }}>
                <span style={{ position: 'absolute', inset: '0 auto 0 0', width: `${30 + i * 9}%`, background: r[2] === 'buy' ? 'rgba(15,169,88,0.10)' : 'rgba(220,38,38,0.08)' }} />
                <span style={{ color: r[2] === 'buy' ? 'var(--success)' : '#dc2626', position: 'relative' }}>{r[0]}</span>
                <span style={{ textAlign: 'right', position: 'relative' }}>{r[1]}</span>
                <span style={{ textAlign: 'right', position: 'relative' }}>{r[2] === 'buy' ? 'B' : 'S'}</span>
              </div>
            ))}
          </div>
          <div style={{ borderRadius: 'var(--r-sm)', border: '1px solid var(--line)', background: 'var(--bg-pure)', padding: 10 }}>
            <div style={{ fontSize: 8.5, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>OPTION CHAIN · PCR</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: INK }}>1.34</div>
            <MiniBars />
          </div>
        </div>
      </div>
    </Shell>
  );
};

/* ---- 3. Mobile ---- */
export const MobileMock = () => {
  const items = [['Wallet', Wallet, 'Balance', '₹84,200'], ['Orders', Package, 'Today', '+38'], ['Leads', Users, 'New', '+12']];
  return (
    <div style={{ width: 224, margin: '0 auto', background: INK, borderRadius: 32, padding: 9, boxShadow: 'var(--shadow-lg)' }}>
      <div style={{ borderRadius: 25, overflow: 'hidden', background: 'var(--bg-pure)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 70, height: 6, borderRadius: 6, background: '#d4d4da', zIndex: 2 }} />
        <div style={{ padding: '26px 14px 16px', display: 'grid', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <b style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: INK }}>Overview</b>
            <Bell size={15} color="var(--text-muted)" />
          </div>
          <div style={{ borderRadius: 'var(--r-md)', padding: 14, background: 'linear-gradient(135deg, var(--accent), #FF8A4C)', color: '#fff' }}>
            <div style={{ fontSize: 9.5, opacity: 0.85 }}>Total Revenue · This month</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22 }}>₹2,48,900</div>
            <div style={{ fontSize: 9.5, opacity: 0.9, marginTop: 2 }}>▲ 18.4% vs last month</div>
          </div>
          <div style={{ display: 'grid', gap: 7 }}>
            {items.map(([t, I, k, v], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: 9, borderRadius: 10, background: 'var(--bg-soft)', border: '1px solid var(--line)' }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--accent-soft)', display: 'grid', placeItems: 'center', color: ACCENT }}><I size={14} /></span>
                <span style={{ flex: 1 }}>
                  <b style={{ display: 'block', fontSize: 11, color: INK }}>{t}</b>
                  <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{k}</span>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--success)' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---- 4. CRM ---- */
export const CrmMock = () => {
  const stages = [['New', 18, '#0A66FF'], ['Qualified', 12, '#2e8fe6'], ['Proposal', 7, ACCENT], ['Won', 5, '#0FA958']];
  return (
    <Shell>
      <Chrome addr="crm.urbancairn.in/pipeline" />
      <div style={{ padding: 14, display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: INK }}>Sales Pipeline</span>
          <span style={{ padding: '3px 9px', borderRadius: 999, background: 'var(--accent-soft)', color: ACCENT, fontSize: 9.5, fontWeight: 700 }}>₹42.6L value</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
          {stages.map(([label, n, c], i) => (
            <div key={i} style={{ padding: '10px', borderRadius: 'var(--r-sm)', border: '1px solid var(--line)', background: 'var(--bg-pure)' }}>
              <div style={{ fontSize: 8.5, color: c, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', fontWeight: 700 }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: INK }}>{n}</div>
              <div style={{ height: 5, borderRadius: 3, marginTop: 6, background: c, opacity: 0.85 }} />
              <div style={{ height: 5, borderRadius: 3, marginTop: 4, width: '65%', background: c, opacity: 0.4 }} />
            </div>
          ))}
        </div>
        <div style={{ borderRadius: 'var(--r-sm)', border: '1px solid var(--line)', background: 'var(--bg-pure)', padding: 12 }}>
          <AreaChart color="var(--info)" />
        </div>
      </div>
    </Shell>
  );
};

/* ---- 5. Pine Indicators (candlestick + BUY/SELL + dotted bands) ---- */
const GREEN = '#16a34a';
const RED = '#dc2626';

export const PineMock = () => {
  // 16 candles, generally rising with a mid dip. [open, close, high, low] as 0..1 of price band.
  const C = [
    [.30,.36,.39,.27],[.36,.33,.38,.31],[.33,.42,.45,.32],[.42,.38,.44,.36],
    [.38,.30,.40,.27],[.30,.34,.36,.27],[.34,.28,.35,.24],[.28,.40,.42,.27],
    [.40,.50,.53,.39],[.50,.46,.52,.44],[.46,.58,.61,.45],[.58,.64,.67,.56],
    [.64,.60,.66,.57],[.60,.72,.75,.59],[.72,.80,.84,.71],[.80,.88,.92,.78],
  ];
  const W = 320, H = 150, pad = 8, n = C.length;
  const cw = (W - pad * 2) / n;
  const y = (v) => H - pad - v * (H - pad * 2);
  const x = (i) => pad + i * cw + cw / 2;
  const trend = C.map(([o, c], i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(Math.min(o, c) - 0.07)}`).join(' ');
  const resist = C.map(([o, c], i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(Math.max(o, c) + 0.07)}`).join(' ');
  return (
    <Shell>
      <Chrome addr="tradingview.com · UC Pine Suite" />
      <div style={{ padding: 12, background: 'var(--bg-pure)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: INK }}>NIFTY · 15m · UC Trend+Signal</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: GREEN }}>● LIVE</span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          {[0.25, 0.5, 0.75].map(g => <line key={g} x1={pad} x2={W - pad} y1={y(g)} y2={y(g)} stroke="var(--line)" strokeWidth="1" />)}
          <path d={resist} fill="none" stroke={RED} strokeWidth="1.6" strokeDasharray="2 4" strokeLinecap="round" opacity="0.7" />
          <path d={trend} fill="none" stroke={GREEN} strokeWidth="1.6" strokeDasharray="2 4" strokeLinecap="round" opacity="0.85" />
          {C.map(([o, c, h, l], i) => {
            const up = c >= o;
            const col = up ? GREEN : RED;
            const bw = Math.max(3, cw * 0.55);
            return (
              <g key={i}>
                <line x1={x(i)} x2={x(i)} y1={y(h)} y2={y(l)} stroke={col} strokeWidth="1" />
                <rect x={x(i) - bw / 2} y={y(Math.max(o, c))} width={bw} height={Math.max(1.5, Math.abs(y(o) - y(c)))} rx="1" fill={col} />
              </g>
            );
          })}
          {/* BUY marker near a trough (candle 7) */}
          <g transform={`translate(${x(7)}, ${y(C[7][3]) + 16})`}>
            <rect x="-15" y="-9" width="30" height="16" rx="4" fill={GREEN} />
            <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily="var(--font-mono)">BUY</text>
          </g>
          {/* SELL marker near a peak (candle 3) */}
          <g transform={`translate(${x(3)}, ${y(C[3][2]) - 16})`}>
            <rect x="-15" y="-9" width="30" height="16" rx="4" fill={RED} />
            <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily="var(--font-mono)">SELL</text>
          </g>
        </svg>
      </div>
    </Shell>
  );
};

/* Small inline visual for each indicator module */
export const PineIndicatorMini = ({ kind }) => {
  const common = { width: '100%', height: 56, viewBox: '0 0 140 56', preserveAspectRatio: 'none', style: { display: 'block' } };
  if (kind === 'momentum') return (
    <svg {...common}>{[10,16,22,28,20,12,8].map((h,i)=><rect key={i} x={8+i*9} y={28-h} width="6" height={h} rx="1" fill={GREEN}/>)}
      {[10,16,12,8].map((h,i)=><rect key={i} x={75+i*9} y={28} width="6" height={h} rx="1" fill={RED}/>)}
      <line x1="4" x2="136" y1="28" y2="28" stroke="var(--line-strong)" strokeWidth="1"/></svg>
  );
  if (kind === 'volatility') return (
    <svg {...common}><path d="M4,18 C40,8 100,30 136,14" fill="none" stroke={RED} strokeWidth="1.4" strokeDasharray="3 3" opacity="0.7"/>
      <path d="M4,40 C40,30 100,52 136,36" fill="none" stroke={GREEN} strokeWidth="1.4" strokeDasharray="3 3" opacity="0.7"/>
      <path d="M4,29 C40,20 100,40 136,25" fill="none" stroke="var(--info)" strokeWidth="1.8"/></svg>
  );
  if (kind === 'sr') return (
    <svg {...common}>{[14,28,42].map((yy,i)=><line key={i} x1="6" x2="134" y1={yy} y2={yy} stroke={[RED,'var(--info)',GREEN][i]} strokeWidth="1.6" strokeDasharray="5 4"/>)}</svg>
  );
  if (kind === 'signal') return (
    <svg {...common}><line x1="4" x2="136" y1="28" y2="28" stroke="var(--line-strong)" strokeWidth="1"/>
      {[[20,GREEN,'▲'],[48,RED,'▼'],[76,GREEN,'▲'],[104,GREEN,'▲'],[124,RED,'▼']].map(([cx,c,t],i)=>
        <text key={i} x={cx} y={c===GREEN?20:44} textAnchor="middle" fontSize="13" fill={c}>{t}</text>)}</svg>
  );
  // trend (default)
  return (
    <svg {...common}><path d="M4,40 C36,36 52,20 80,22 C104,24 120,12 136,8" fill="none" stroke={GREEN} strokeWidth="2"/>
      <path d="M4,40 C36,36 52,20 80,22 C104,24 120,12 136,8 L136,56 L4,56 Z" fill={GREEN} opacity="0.08"/>
      <circle cx="136" cy="8" r="2.5" fill={GREEN}/></svg>
  );
};

const MOCKS = { dashboard: DashboardMock, trading: TradingMock, mobile: MobileMock, crm: CrmMock, pine: PineMock };

export default function Mock({ type = 'dashboard' }) {
  const Cmp = MOCKS[type] || DashboardMock;
  return <Cmp />;
}

// Non-dashboard screens: Controls, Trips, Analytics, Search

// ─── CONTROLS SCREEN ────────────────────────────
function ScreenControls({ controls, setControls }) {
  const toggle = k => setControls(c => ({ ...c, [k]: !c[k] }));
  const groups = [
    { title: 'POWER', rows: [
      { k: 'charging', label: 'Charging', sub: 'Fast charge, 45kW' },
      { k: 'precool',  label: 'Precondition cabin', sub: 'Auto-start 15m before dispatch' },
      { k: 'eco',      label: 'Eco mode', sub: 'Extends range by 12%' },
    ]},
    { title: 'DISPATCH', rows: [
      { k: 'autoAssign', label: 'Auto-assign trips', sub: 'Route by nearest available unit' },
      { k: 'night',      label: 'Night operations', sub: 'Disable between 02:00–05:00' },
    ]},
    { title: 'ACCESS', rows: [
      { k: 'driverLock', label: 'Driver lock', sub: 'Require PIN on handoff' },
      { k: 'remoteOps',  label: 'Remote operations', sub: 'Allow takeover from dispatch' },
    ]},
  ];
  return (
    <div style={{ padding: '0 14px 100px' }}>
      <h1 className="mono" style={{
        fontSize: 28, fontWeight: 800, color: 'var(--fg)', margin: '8px 0 4px',
        letterSpacing: '-0.02em',
      }}>CONTROLS</h1>
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', letterSpacing: '0.08em', marginBottom: 18 }}>
        FLEET-WIDE SETTINGS · LIVE
      </div>

      {/* Master power row */}
      <div className="widget" style={{ background: '#0f0f0f', padding: 14, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div className="label label-bright">MASTER</div>
          <div className="mono" style={{ fontSize: 18, fontWeight: 800, color: 'var(--ember)', marginTop: 2 }}>
            FLEET ONLINE
          </div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', letterSpacing: '0.05em' }}>
            12 UNITS · 00:00:00 UPTIME INFINITE
          </div>
        </div>
        <div className={`toggle ${controls.master ? 'on' : ''}`} onClick={() => toggle('master')} />
      </div>

      {groups.map(g => (
        <div key={g.title} style={{ marginBottom: 16 }}>
          <div className="label" style={{ padding: '0 4px 8px' }}>{g.title}</div>
          <div className="widget" style={{ padding: 0, background: '#0f0f0f' }}>
            {g.rows.map((r, i) => (
              <div key={r.k} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 14px',
                borderBottom: i < g.rows.length - 1 ? '0.5px solid var(--line)' : 'none',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--fg)' }}>{r.label}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', letterSpacing: '0.04em', marginTop: 2 }}>{r.sub}</div>
                </div>
                <div className={`toggle ${controls[r.k] ? 'on' : ''}`} onClick={() => toggle(r.k)} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── TRIPS SCREEN ──────────────────────────────
function ScreenTrips({ trips, onSelectTrip }) {
  const [filter, setFilter] = React.useState('ALL');
  const filtered = filter === 'ALL' ? trips : trips.filter(t => t.status === filter);
  return (
    <div style={{ padding: '0 14px 100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '8px 0 4px' }}>
        <h1 className="mono" style={{
          fontSize: 28, fontWeight: 800, color: 'var(--fg)', margin: 0,
          letterSpacing: '-0.02em',
        }}>TRIPS</h1>
        <button className="btn btn-ember" style={{ padding: '8px 12px', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon.Plus size={14} c="#000"/> NEW
        </button>
      </div>
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', letterSpacing: '0.08em', marginBottom: 14 }}>
        {trips.length} SCHEDULED · {trips.filter(t => t.status === 'ACTIVE').length} IN PROGRESS
      </div>

      {/* filter pills */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto' }}>
        {['ALL', 'ACTIVE', 'SCHEDULED', 'COMPLETE'].map(f => (
          <button key={f}
            onClick={() => setFilter(f)}
            className={`chip ${filter === f ? 'chip-ember' : ''}`}
            style={{ border: 'none', cursor: 'pointer' }}
          >{f}</button>
        ))}
      </div>

      {/* trip list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(t => <TripCard key={t.id} trip={t} onClick={() => onSelectTrip(t)} />)}
      </div>
    </div>
  );
}

function TripCard({ trip, onClick }) {
  const statusColor = {
    ACTIVE: 'var(--signal)',
    SCHEDULED: 'var(--ember)',
    COMPLETE: 'var(--fg-fade)',
  }[trip.status];
  return (
    <div className="widget" onClick={onClick} style={{
      cursor: 'pointer', padding: 14, background: '#0f0f0f',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: statusColor }}
            className={trip.status === 'ACTIVE' ? 'pulse-ember' : ''} />
          <span className="mono" style={{ fontSize: 10, color: statusColor, letterSpacing: '0.08em', fontWeight: 700 }}>
            {trip.status}
          </span>
        </div>
        <span className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', letterSpacing: '0.08em' }}>
          {trip.id}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        {/* route dots */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 'none' }}>
          <div style={{ width: 8, height: 8, borderRadius: 99, background: 'var(--fg)' }}/>
          <div style={{ width: 1, height: 20, background: 'var(--line)', borderStyle: 'dashed' }}/>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--ember)' }}/>
        </div>
        <div style={{ flex: 1 }}>
          <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)' }}>{trip.from}</div>
          <div style={{ height: 20 }}/>
          <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ember)', marginTop: -20 }}>{trip.to}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="mono" style={{ fontSize: 18, fontWeight: 800, color: 'var(--fg)' }}>{trip.time}</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', letterSpacing: '0.05em' }}>{trip.date}</div>
        </div>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 10, borderTop: '0.5px dashed var(--line)',
      }}>
        <span className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', letterSpacing: '0.05em' }}>
          UNIT <b style={{ color: 'var(--fg)', fontWeight: 700 }}>{trip.unit}</b> · {trip.pax} PAX
        </span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg)', fontWeight: 700 }}>
          {trip.distance}km
        </span>
      </div>
    </div>
  );
}

// ─── ANALYTICS SCREEN ─────────────────────────
function ScreenAnalytics() {
  const [range, setRange] = React.useState('7D');
  return (
    <div style={{ padding: '0 14px 100px' }}>
      <h1 className="mono" style={{
        fontSize: 28, fontWeight: 800, color: 'var(--fg)', margin: '8px 0 4px',
        letterSpacing: '-0.02em',
      }}>ANALYTICS</h1>
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', letterSpacing: '0.08em', marginBottom: 14 }}>
        FLEET PERFORMANCE · OPS DIGEST
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {['24H', '7D', '30D', 'QTR'].map(r => (
          <button key={r} onClick={() => setRange(r)}
            className={`chip ${range === r ? 'chip-ember' : ''}`}
            style={{ border: 'none', cursor: 'pointer', flex: 1, justifyContent: 'center' }}
          >{r}</button>
        ))}
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        <Kpi label="TRIPS" value="247" delta="+12%" good/>
        <Kpi label="ON-TIME" value="94%" delta="+1.8%" good/>
        <Kpi label="AVG KWH" value="8.4" delta="-3.2%" good/>
        <Kpi label="INCIDENTS" value="02" delta="—"/>
      </div>

      {/* Chart widget */}
      <div className="widget" style={{ background: '#0f0f0f', padding: 14, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div className="label label-bright">TRIPS / DAY</div>
            <div className="big-num" style={{ fontSize: 28, color: 'var(--ember)', marginTop: 4 }}>247</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="label">PEAK</div>
            <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', marginTop: 4 }}>FRI</div>
          </div>
        </div>
        <BarChart data={[22, 31, 28, 36, 44, 51, 35]} labels={['M','T','W','T','F','S','S']}/>
      </div>

      {/* Range distribution */}
      <div className="widget" style={{ background: '#0f0f0f', padding: 14, marginBottom: 12 }}>
        <div className="label label-bright" style={{ marginBottom: 10 }}>FLEET UTILIZATION</div>
        <UtilBar label="7-PAX MOVER" value={84} color="var(--ember)"/>
        <UtilBar label="1/2 CARGO" value={62} color="var(--amber)"/>
        <UtilBar label="FULL CARGO" value={48} color="var(--signal)"/>
        <UtilBar label="COURIER" value={31} color="var(--fg-dim)"/>
      </div>

      {/* Energy */}
      <div className="widget" style={{ background: '#0f0f0f', padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div className="label label-bright">ENERGY DRAW</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--signal)' }}>-3.2% vs LAST WEEK</div>
        </div>
        <AreaChart/>
      </div>
    </div>
  );
}

function Kpi({ label, value, delta, good }) {
  return (
    <div className="widget" style={{ background: '#0f0f0f', padding: 12 }}>
      <div className="label">{label}</div>
      <div className="big-num" style={{ fontSize: 26, color: 'var(--fg)', marginTop: 4 }}>{value}</div>
      <div className="mono" style={{
        fontSize: 11, fontWeight: 600,
        color: delta === '—' ? 'var(--fg-dim)' : (good ? 'var(--signal)' : 'var(--ember)'),
        letterSpacing: '0.03em',
      }}>{delta}</div>
    </div>
  );
}

function BarChart({ data, labels }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 100 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: '100%', borderRadius: 3,
            background: i === 4 ? 'var(--ember)' : 'rgba(255,255,255,0.15)',
            height: `${(v / max) * 80}px`,
          }}/>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', letterSpacing: '0.05em' }}>
            {labels[i]}
          </div>
        </div>
      ))}
    </div>
  );
}

function UtilBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg)', fontWeight: 600, letterSpacing: '0.02em' }}>{label}</span>
        <span className="mono" style={{ fontSize: 11, color: color, fontWeight: 700 }}>{value}%</span>
      </div>
      <div style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color }}/>
      </div>
    </div>
  );
}

function AreaChart() {
  // generate a jagged line
  const pts = [28, 42, 35, 38, 52, 44, 48, 36, 40, 55, 42, 38];
  const max = Math.max(...pts);
  const w = 100, h = 60;
  const step = w / (pts.length - 1);
  const points = pts.map((v, i) => `${i * step},${h - (v / max) * (h - 8) - 2}`).join(' ');
  const area = `0,${h} ${points} ${w},${h}`;
  return (
    <svg viewBox="0 0 100 60" style={{ width: '100%', height: 80 }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ember)" stopOpacity="0.4"/>
          <stop offset="1" stopColor="var(--ember)" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#areaGrad)"/>
      <polyline points={points} fill="none" stroke="var(--ember)" strokeWidth="1.2" vectorEffect="non-scaling-stroke"/>
    </svg>
  );
}

// ─── SEARCH SCREEN ──────────────────────────────
function ScreenSearch() {
  const [q, setQ] = React.useState('');
  const suggestions = [
    'Unit ASTK.GORDIAN.01A',
    'Trips today',
    'Pit stop stations nearby',
    'Maintenance: 7-PAX MOVER',
    'Charging capacity report',
  ];
  const recent = [
    { label: 'TRIP #TRP-4472', sub: 'Asterisk Depot → Station 28K', type: 'TRIP' },
    { label: 'UNIT ASTK.GORDIAN.02C', sub: '1/2 Cargo · On task', type: 'UNIT' },
    { label: 'STATION 28K', sub: 'Pit stop · 7.8km away', type: 'PLACE' },
    { label: 'DRIVER K. NAKAJIMA', sub: 'Ops lead · night shift', type: 'DRIVER' },
  ];
  return (
    <div style={{ padding: '0 14px 100px' }}>
      <h1 className="mono" style={{
        fontSize: 28, fontWeight: 800, color: 'var(--fg)', margin: '8px 0 14px',
        letterSpacing: '-0.02em',
      }}>SEARCH</h1>
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <input
          autoFocus
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search units, trips, stations…"
          className="mono"
          style={{
            width: '100%', padding: '14px 14px 14px 42px',
            borderRadius: 14, border: '0.5px solid var(--line)',
            background: '#0f0f0f', color: 'var(--fg)',
            fontSize: 14, outline: 'none',
          }}
        />
        <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-dim)' }}>
          <Icon.Search size={18} c="var(--fg-dim)"/>
        </div>
      </div>

      <div className="label" style={{ padding: '0 4px 8px' }}>TRY</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {suggestions.map(s => (
          <button key={s} onClick={() => setQ(s)} className="chip" style={{ border: '0.5px solid var(--line)', cursor: 'pointer' }}>
            {s}
          </button>
        ))}
      </div>

      <div className="label" style={{ padding: '0 4px 8px' }}>RECENT</div>
      <div className="widget" style={{ padding: 0, background: '#0f0f0f' }}>
        {recent.map((r, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
            borderBottom: i < recent.length - 1 ? '0.5px solid var(--line)' : 'none',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(255,90,31,0.12)', color: 'var(--ember)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
              flex: 'none',
            }}>{r.type}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="mono" style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.label}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.sub}</div>
            </div>
            <Icon.ChevR size={14} c="var(--fg-fade)"/>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ScreenControls, ScreenTrips, ScreenAnalytics, ScreenSearch });

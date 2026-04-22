// Dashboard widgets for the Menu/home screen

// ═══ SCHEDULED TRIP widget ═══
function WScheduled({ trip, onClick }) {
  return (
    <div
      className="widget"
      onClick={onClick}
      style={{
        gridColumn: 'span 2', padding: 0,
        background: '#0f0f0f',
        cursor: 'pointer', position: 'relative',
        minHeight: 180,
        overflow: 'hidden',
      }}
    >
      {/* top status bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 14px 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="pulse-ember" style={{
            width: 6, height: 6, borderRadius: 99, background: 'var(--ember)',
          }} />
          <span className="label label-ember">SCHEDULED</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="label" style={{ color: 'var(--fg-fade)', fontSize: 9 }}>DEST</div>
          <div className="mono" style={{ color: 'var(--ember)', fontSize: 13, fontWeight: 600 }}>
            STATION <span style={{ fontWeight: 800 }}>28K</span>
          </div>
        </div>
      </div>

      {/* progress track */}
      <div style={{ padding: '10px 14px 0', position: 'relative' }}>
        <div style={{
          height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 99,
          position: 'relative', marginTop: 2,
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%',
            width: `${trip.progress}%`,
            background: 'var(--ember)',
          }} />
          {/* traveler arrow */}
          <div style={{
            position: 'absolute', left: `${trip.progress}%`, top: -4,
            transform: 'translateX(-50%)',
            borderLeft: '4px solid transparent', borderRight: '4px solid transparent',
            borderTop: '5px solid var(--fg)',
          }} />
          {/* destination dot */}
          <div style={{
            position: 'absolute', right: 0, top: -2,
            width: 6, height: 6, borderRadius: 99, background: 'var(--ember)',
          }} />
        </div>
        <div className="mono" style={{
          textAlign: 'center', fontSize: 10, color: 'var(--ember)',
          marginTop: 6, letterSpacing: '0.05em',
        }}>
          {trip.remaining}KM TO DESTINATION
        </div>
      </div>

      {/* main display */}
      <div style={{ padding: '18px 14px 16px', position: 'relative', zIndex: 1 }}>
        <div className="mono upper" style={{
          fontSize: 11, color: 'var(--fg-dim)', letterSpacing: '0.12em',
          marginBottom: 4, fontWeight: 600,
        }}>PIT STOP</div>
        <div className="big-num" style={{
          fontSize: 44, color: 'var(--ember)', lineHeight: 1.02,
        }}>TODAY,<br/>{trip.time}</div>
      </div>

      {/* ambient glow overlay */}
      <div style={{
        position: 'absolute', bottom: -60, right: -40,
        width: 220, height: 220, borderRadius: '50%',
        background: 'radial-gradient(circle, var(--ember-glow), transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div className="scanline" />
    </div>
  );
}

// ═══ BATTERY / RANGE widget ═══
function WBattery({ percent, remaining, onClick }) {
  const bars = 14;
  const filled = Math.round(bars * percent / 100);
  return (
    <div
      className="widget"
      onClick={onClick}
      style={{
        background: '#0f0f0f',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        minHeight: 160,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 40 }}>
        {Array.from({ length: bars }).map((_, i) => {
          const on = i < filled;
          const near = i < filled && i >= filled - 3;
          return (
            <div key={i} style={{
              flex: 1, height: '100%',
              borderRadius: 2,
              background: on
                ? (near ? 'var(--signal)' : '#8cc20f')
                : 'rgba(180,243,26,0.12)',
              boxShadow: on ? '0 0 6px rgba(180,243,26,0.3)' : 'none',
            }} />
          );
        })}
      </div>
      <div>
        <div className="label" style={{ marginBottom: 4 }}>{remaining}KM REMAINING</div>
        <div className="big-num" style={{ fontSize: 44, color: 'var(--fg)', lineHeight: 1 }}>
          {percent}%
        </div>
      </div>
    </div>
  );
}

// ═══ QUICK CONTROLS widget ═══
function WQuickControls({ onAction }) {
  const actions = [
    { key: 'charge',   label: 'CHARGING',       active: true },
    { key: 'pitstop',  label: 'SCHEDULE\nPIT STOP', prominent: true },
    { key: 'display',  label: 'DISPLAY' },
    { key: 'climate',  label: 'CLIMATE' },
  ];
  return (
    <div className="widget-glass" style={{
      padding: 12, minHeight: 160,
      display: 'flex', flexDirection: 'column', gap: 8,
      background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
    }}>
      <div className="label" style={{ color: 'var(--fg)' }}>QUICK CONTROLS</div>
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', gap: 6,
        overflow: 'hidden',
      }}>
        {actions.map(a => (
          <button
            key={a.key}
            onClick={() => onAction(a.key)}
            className="mono upper"
            style={{
              all: 'unset',
              cursor: 'pointer',
              padding: a.prominent ? '6px 8px' : '2px 0',
              borderRadius: 8,
              background: a.prominent ? 'rgba(255,90,31,0.12)' : 'transparent',
              border: a.prominent ? '0.5px solid rgba(255,90,31,0.35)' : 'none',
              color: a.active || a.prominent ? 'var(--ember)' : 'rgba(245,241,236,0.45)',
              fontWeight: 700, fontSize: 13, letterSpacing: '0.03em',
              whiteSpace: 'pre-line', lineHeight: 1.05,
            }}
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ═══ PROFILE / FLEET STATUS widget ═══
function WProfile({ profile, status, onClick }) {
  const total = status.offline + status.charging + status.onTask;
  // segments: offline(ember), charging(amber), onTask(signal)
  const segs = [
    { n: status.offline,  c: 'var(--ember)' },
    { n: status.charging, c: 'var(--amber)' },
    { n: status.onTask,   c: 'var(--signal)' },
  ];
  // dial: 12 slots
  const slots = 12;
  const dial = [];
  let idx = 0;
  for (const s of segs) {
    for (let i = 0; i < s.n && idx < slots; i++) dial.push(s.c);
    idx += s.n;
  }
  while (dial.length < slots) dial.push('rgba(255,255,255,0.08)');

  return (
    <div className="widget-glass"
      onClick={onClick}
      style={{
        cursor: 'pointer', minHeight: 160,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <div>
          <div className="label">PROFILE</div>
          <div className="mono" style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.15, marginTop: 2 }}>
            {profile.name}<br/>
            <span style={{ fontSize: 12, color: 'var(--fg-dim)', fontWeight: 500 }}>{profile.suffix}</span>
          </div>
        </div>
        <Icon.ArrowUR size={18} c="var(--fg)"/>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
        {/* radial dial */}
        <svg width="64" height="64" viewBox="0 0 64 64">
          {dial.map((c, i) => {
            const a = (i / slots) * Math.PI * 2 - Math.PI / 2;
            const r1 = 18, r2 = 28;
            const pad = 0.14;
            const aStart = a + pad;
            const aEnd = a + (Math.PI * 2 / slots) - pad;
            const x1 = 32 + Math.cos(aStart) * r1, y1 = 32 + Math.sin(aStart) * r1;
            const x2 = 32 + Math.cos(aEnd) * r1,   y2 = 32 + Math.sin(aEnd) * r1;
            const x3 = 32 + Math.cos(aEnd) * r2,   y3 = 32 + Math.sin(aEnd) * r2;
            const x4 = 32 + Math.cos(aStart) * r2, y4 = 32 + Math.sin(aStart) * r2;
            return (
              <path key={i}
                d={`M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`}
                fill={c}
              />
            );
          })}
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, fontFamily: 'var(--mono)', fontSize: 13 }}>
          <div><span style={{ color: 'var(--ember)', fontWeight: 800, fontSize: 15 }}>{status.offline}</span>  <span style={{ color: 'var(--fg-dim)', fontSize: 10, letterSpacing: '0.08em' }}>OFFLINE</span></div>
          <div><span style={{ color: 'var(--amber)', fontWeight: 800, fontSize: 15 }}>{status.charging}</span>  <span style={{ color: 'var(--fg-dim)', fontSize: 10, letterSpacing: '0.08em' }}>CHARGING</span></div>
          <div><span style={{ color: 'var(--signal)', fontWeight: 800, fontSize: 15 }}>{status.onTask}</span>  <span style={{ color: 'var(--fg-dim)', fontSize: 10, letterSpacing: '0.08em' }}>ON TASK</span></div>
        </div>
      </div>
    </div>
  );
}

// ═══ ACTIVE MODULES widget ═══
function WActiveModules({ onClick }) {
  return (
    <div className="widget" onClick={onClick} style={{
      cursor: 'pointer', minHeight: 160, background: '#0f0f0f',
      display: 'flex', flexDirection: 'column',
    }}>
      <div className="label label-bright" style={{ marginBottom: 4 }}>ACTIVE MODULES</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
        {/* vehicle render */}
        <div style={{
          width: 90, height: 64, position: 'relative', flex: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img src="assets/vehicle.png" alt="vehicle"
            style={{
              width: '100%', height: '100%', objectFit: 'contain',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
            }}/>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ModuleRow label="7-PAX MOVER" sub="ASTK.GORDIAN.01A" on/>
          <ModuleRow label="1/2 CARGO"   sub="ASTK.GORDIAN.02C" on/>
        </div>
      </div>
      <div className="mono" style={{ fontSize: 8, color: 'var(--fg-fade)', letterSpacing: '0.1em', marginTop: 6 }}>
        ASTK_GORDIAN.01C
      </div>
    </div>
  );
}
function ModuleRow({ label, sub, on }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 4, height: 4, borderRadius: 99, background: on ? 'var(--ember)' : 'var(--fg-fade)' }}/>
      <div>
        <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg)', letterSpacing: '0.03em' }}>{label}</div>
        <div className="mono" style={{ fontSize: 8, color: 'var(--fg-fade)', letterSpacing: '0.1em' }}>{sub}</div>
      </div>
    </div>
  );
}

// ═══ REAL TIME STATUS widget ═══
function WRealTime({ onClick }) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="widget" onClick={onClick}
      style={{ cursor: 'pointer', minHeight: 150, background: '#0f0f0f', position: 'relative' }}
    >
      <div className="label label-bright" style={{ marginBottom: 8 }}>REAL TIME STATUS</div>
      {/* waveform */}
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" style={{ width: '100%', height: 72, display: 'block' }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const seed = (i * 37 + tick * 5) % 100;
          const h = 10 + (seed % 40);
          const y = 30 - h / 2;
          return (
            <rect key={i} x={i * 4 + 1} y={y} width="2" height={h}
              fill={i > 18 ? 'var(--ember)' : 'rgba(255,255,255,0.25)'}
              rx="1"
            />
          );
        })}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', letterSpacing: '0.08em' }}>SIGNAL</div>
          <div className="mono" style={{ fontSize: 14, color: 'var(--ember)', fontWeight: 700 }}>NOMINAL</div>
        </div>
        <div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', letterSpacing: '0.08em' }}>LATENCY</div>
          <div className="mono" style={{ fontSize: 14, color: 'var(--fg)', fontWeight: 700 }}>{12 + (tick % 5)}ms</div>
        </div>
      </div>
    </div>
  );
}

// ═══ FLEET OVERVIEW widget (mini map) ═══
function WFleetMap({ onClick }) {
  return (
    <div className="widget" onClick={onClick} style={{
      cursor: 'pointer', minHeight: 150, padding: 0, overflow: 'hidden',
      background: '#0f0f0f',
    }}>
      <div style={{ padding: '12px 12px 6px' }}>
        <div className="label label-bright">FLEET OVERVIEW</div>
      </div>
      <div style={{ position: 'relative', padding: '0 8px 10px' }}>
        {/* schematic street grid */}
        <svg viewBox="0 0 140 90" style={{ width: '100%', height: 90, display: 'block' }}>
          <rect x="0" y="0" width="140" height="90" fill="#111"/>
          {/* blocks */}
          <g stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" fill="none">
            <path d="M0 20 L140 20 M0 45 L140 45 M0 70 L140 70"/>
            <path d="M30 0 L30 90 M70 0 L70 90 M105 0 L105 90"/>
            <path d="M12 0 L12 90" opacity="0.4"/>
            <path d="M88 0 L88 90" opacity="0.4"/>
            <path d="M0 32 L140 32" opacity="0.4"/>
          </g>
          <g stroke="rgba(255,255,255,0.06)" strokeWidth="3" fill="none">
            <path d="M0 45 L140 45"/>
            <path d="M70 0 L70 90"/>
          </g>
          {/* vehicle pins */}
          <g>
            <circle cx="42" cy="28" r="7" fill="var(--ember)" opacity="0.18"/>
            <circle cx="42" cy="28" r="3" fill="var(--ember)"/>
            <circle cx="95" cy="62" r="7" fill="var(--signal)" opacity="0.18"/>
            <circle cx="95" cy="62" r="3" fill="var(--signal)"/>
            <circle cx="115" cy="18" r="5" fill="var(--amber)" opacity="0.18"/>
            <circle cx="115" cy="18" r="2.2" fill="var(--amber)"/>
          </g>
        </svg>
      </div>
    </div>
  );
}

// ═══ MAINTENANCE widget ═══
function WMaintenance({ items, onClick }) {
  return (
    <div className="widget" onClick={onClick} style={{
      cursor: 'pointer', minHeight: 150, background: '#0f0f0f',
      display: 'flex', flexDirection: 'column',
    }}>
      <div className="label label-bright" style={{ marginBottom: 8 }}>MAINTENANCE</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
        {items.map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 5 }}>
            <span style={{
              width: 4, height: 4, borderRadius: 99, marginTop: 5,
              background: m.priority === 'high' ? 'var(--ember)' : 'var(--amber)',
            }}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="mono" style={{
                fontSize: 10, color: 'var(--ember)', fontWeight: 700,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{m.label}</div>
              <div className="mono" style={{ fontSize: 7, color: 'var(--fg-fade)', letterSpacing: '0.1em' }}>
                {m.code}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  WScheduled, WBattery, WQuickControls, WProfile, WActiveModules,
  WRealTime, WFleetMap, WMaintenance,
});

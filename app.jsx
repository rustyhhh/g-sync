// G-Sync — main app composition

const DEFAULT_TWEAKS = /*EDITMODE-BEGIN*/{
  "accent": "#ff5a1f",
  "signal": "#b4f31a",
  "ambientGlow": true,
  "density": "normal"
}/*EDITMODE-END*/;

const BRAND = { name: 'G-SYNC', subtitle: 'GORDIAN NETWORK' };

const FLEET_STATUS = { offline: 1, charging: 3, onTask: 8 };

const PROFILE = { name: 'Asterisk Systems', suffix: 'Pte Ltd · Ops Lead' };

const TRIP = {
  id: 'TRP-4472',
  time: '15:00',
  progress: 62,
  remaining: 7,
  dest: '28K',
};

const TRIPS = [
  { id: 'TRP-4470', status: 'ACTIVE',    from: 'Asterisk Depot', to: 'Station 28K', time: '14:10', date: 'TODAY', unit: '01A', pax: 4, distance: 12 },
  { id: 'TRP-4472', status: 'SCHEDULED', from: 'Asterisk Depot', to: 'Station 28K', time: '15:00', date: 'TODAY', unit: '02C', pax: 7, distance: 28 },
  { id: 'TRP-4473', status: 'SCHEDULED', from: 'Harbor Bay 3',   to: 'Warehouse 9', time: '15:45', date: 'TODAY', unit: '04B', pax: 2, distance: 18 },
  { id: 'TRP-4474', status: 'SCHEDULED', from: 'Central Tower',  to: 'Station 14W', time: '16:30', date: 'TODAY', unit: '07A', pax: 3, distance: 22 },
  { id: 'TRP-4468', status: 'COMPLETE',  from: 'Station 28K',    to: 'Asterisk Depot', time: '12:40', date: 'TODAY', unit: '01A', pax: 5, distance: 14 },
  { id: 'TRP-4467', status: 'COMPLETE',  from: 'Harbor Bay 1',   to: 'Warehouse 9', time: '11:20', date: 'TODAY', unit: '05D', pax: 1, distance: 9 },
];

const MAINT = [
  { label: '7-PAX MOVER',     code: 'ASTK.GORDIAN.01A', priority: 'high' },
  { label: '1/2 CARGO',       code: 'ASTK.GORDIAN.02C', priority: 'high' },
  { label: 'REGULAR CHECK-UP',code: 'ASTK.GORDIAN.03B', priority: 'med'  },
  { label: '7-PAX MOVER',     code: 'ASTK.GORDIAN.01D', priority: 'med'  },
];

function Dashboard({ onOpenSheet, onOpenTrip }) {
  return (
    <div style={{
      padding: '54px 10px 100px',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
      position: 'relative', zIndex: 1,
    }}>
      <WScheduled trip={TRIP} onClick={() => onOpenTrip(TRIPS[1])}/>
      <WBattery percent={79} remaining={284} onClick={() => {}}/>
      <WQuickControls onAction={(k) => { if (k === 'pitstop') onOpenSheet('pitstop'); }}/>
      <WProfile profile={PROFILE} status={FLEET_STATUS}/>
      <WActiveModules/>
      <WRealTime/>
      <WFleetMap/>
      <WMaintenance items={MAINT}/>
    </div>
  );
}

function TabBar({ active, setActive, menuCount }) {
  const tabs = [
    { id: 'menu',      label: 'MENU',      icon: Icon.Home,  badge: menuCount },
    { id: 'controls',  label: 'CONTROLS',  icon: Icon.Gear  },
    { id: 'trips',     label: 'TRIPS',     icon: Icon.Pin   },
    { id: 'analytics', label: 'ANALYTICS', icon: Icon.Chart },
  ];
  return (
    <div className="tabbar">
      {tabs.map(t => {
        const is = active === t.id;
        return (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={`tab ${is ? 'active' : ''}`}
          >
            <div style={{ position: 'relative' }}>
              <t.icon c={is ? 'var(--ember)' : 'var(--fg-dim)'} size={22}/>
              {t.badge && (
                <div style={{
                  position: 'absolute', top: -4, right: -8,
                  minWidth: 15, height: 15, padding: '0 4px', borderRadius: 99,
                  background: 'var(--ember)', color: '#0a0a0a',
                  fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{t.badge}</div>
              )}
            </div>
            <span>{t.label}</span>
          </button>
        );
      })}
      <button
        onClick={() => setActive('search')}
        className="tab-search-btn"
        style={{
          background: active === 'search' ? 'var(--ember)' : 'rgba(255,255,255,0.1)',
          color: active === 'search' ? '#000' : 'var(--fg)',
        }}
      >
        <Icon.Search size={20} c={active === 'search' ? '#000' : 'var(--fg)'}/>
      </button>
    </div>
  );
}

// Brand header strip
function BrandStrip() {
  return (
    <div style={{
      position: 'absolute', top: 52, left: 0, right: 0, zIndex: 4,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 18px',
      pointerEvents: 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* logo: knot glyph (original) */}
        <svg width="18" height="18" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="var(--ember)" strokeWidth="1.6"/>
          <path d="M6 12 Q12 4 18 12 Q12 20 6 12 Z" fill="none" stroke="var(--ember)" strokeWidth="1.2"/>
          <circle cx="12" cy="12" r="2" fill="var(--ember)"/>
        </svg>
        <div>
          <div className="mono" style={{ fontSize: 11, fontWeight: 800, color: 'var(--fg)', letterSpacing: '0.1em', lineHeight: 1 }}>
            G-SYNC
          </div>
          <div className="mono" style={{ fontSize: 7, color: 'var(--fg-dim)', letterSpacing: '0.15em', lineHeight: 1, marginTop: 2 }}>
            GORDIAN NETWORK
          </div>
        </div>
      </div>
      <div className="mono" style={{ fontSize: 9, color: 'var(--fg-fade)', letterSpacing: '0.12em' }}>
        v2.4.1 · LIVE
      </div>
    </div>
  );
}

function App() {
  const [tab, setTab] = React.useState(() => localStorage.getItem('gsync_tab') || 'menu');
  const [sheet, setSheet] = React.useState(null); // 'pitstop'
  const [tripDetail, setTripDetail] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [tweaks, setTweaks] = React.useState(DEFAULT_TWEAKS);
  const [tweakOpen, setTweakOpen] = React.useState(false);
  const [controls, setControls] = React.useState({
    master: true, charging: true, precool: false, eco: true,
    autoAssign: true, night: false, driverLock: true, remoteOps: false,
  });

  React.useEffect(() => {
    localStorage.setItem('gsync_tab', tab);
  }, [tab]);

  // Tweaks protocol
  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweakOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweakOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const updateTweak = (k, v) => {
    setTweaks(t => ({ ...t, [k]: v }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  // apply tweaks to CSS vars
  React.useEffect(() => {
    document.documentElement.style.setProperty('--ember', tweaks.accent);
    document.documentElement.style.setProperty('--signal', tweaks.signal);
  }, [tweaks.accent, tweaks.signal]);

  const openSheet = (s) => setSheet(s);
  const closeSheet = () => setSheet(null);

  const confirmPitStop = ({ day, time, station }) => {
    setSheet(null);
    setToast(`PIT STOP LOCKED · ${day} ${time} · STATION ${station}`);
  };

  return (
    <div style={{
      width: '100vw', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#1a1a1a',
      padding: 20,
    }}>
      <IOSDevice dark={true} width={402} height={874}>
        {/* dashboard background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: '#0a0a0a',
          zIndex: 0,
        }}/>
        {tweaks.ambientGlow && tab === 'menu' && <div className="ambient-glow"/>}

        <BrandStrip/>

        <div data-screen-label={'01 ' + tab.toUpperCase()}
          style={{ position: 'relative', height: '100%', zIndex: 1, overflow: 'hidden' }}
        >
          <div className="scroll-y" style={{ height: '100%', paddingTop: tab === 'menu' ? 26 : 70 }}>
            {tab === 'menu' && (
              <Dashboard onOpenSheet={openSheet} onOpenTrip={setTripDetail}/>
            )}
            {tab === 'controls' && (
              <ScreenControls controls={controls} setControls={setControls}/>
            )}
            {tab === 'trips' && (
              <ScreenTrips trips={TRIPS} onSelectTrip={setTripDetail}/>
            )}
            {tab === 'analytics' && <ScreenAnalytics/>}
            {tab === 'search' && <ScreenSearch/>}
          </div>
        </div>

        <TabBar active={tab} setActive={setTab} menuCount={3}/>

        {sheet === 'pitstop' && (
          <SheetPitStop onClose={closeSheet} onConfirm={confirmPitStop}/>
        )}
        {tripDetail && (
          <SheetTripDetail trip={tripDetail} onClose={() => setTripDetail(null)}/>
        )}
        {toast && <SheetToast message={toast} onClose={() => setToast(null)}/>}
      </IOSDevice>

      {tweakOpen && (
        <div className="tweak-panel">
          <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', marginBottom: 10, color: 'var(--fg)' }}>TWEAKS</div>
          <div className="tweak-row">
            <label>ACCENT</label>
            <input type="color" value={tweaks.accent} onChange={e => updateTweak('accent', e.target.value)}/>
          </div>
          <div className="tweak-row">
            <label>SIGNAL</label>
            <input type="color" value={tweaks.signal} onChange={e => updateTweak('signal', e.target.value)}/>
          </div>
          <div className="tweak-row">
            <label>AMBIENT GLOW</label>
            <div className={`toggle ${tweaks.ambientGlow ? 'on' : ''}`}
              onClick={() => updateTweak('ambientGlow', !tweaks.ambientGlow)}/>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

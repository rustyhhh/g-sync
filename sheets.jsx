// Sheets: pit stop scheduler, trip detail, generic info

function SheetPitStop({ onClose, onConfirm }) {
  const [day, setDay] = React.useState('TODAY');
  const [time, setTime] = React.useState('15:00');
  const [station, setStation] = React.useState('28K');
  const days = ['TODAY', 'TMRW', 'FRI 25', 'SAT 26'];
  const times = ['13:00','14:00','15:00','16:00','17:00','18:00','19:00'];
  const stations = [
    { id: '28K', name: 'STATION 28K', dist: '7.8km', load: 'LOW' },
    { id: '14W', name: 'STATION 14W', dist: '12.3km', load: 'MED' },
    { id: '04N', name: 'STATION 04N', dist: '18.1km', load: 'HIGH' },
  ];
  return (
    <>
      <div className="sheet-backdrop" onClick={onClose}/>
      <div className="sheet">
        <div className="sheet-grabber"/>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div className="label">SCHEDULE</div>
            <h2 className="mono" style={{ fontSize: 22, fontWeight: 800, color: 'var(--ember)', margin: '2px 0 0', letterSpacing: '-0.02em' }}>
              PIT STOP
            </h2>
          </div>
          <button onClick={onClose} style={{ all: 'unset', cursor: 'pointer', padding: 4, color: 'var(--fg-dim)' }}>
            <Icon.X size={22}/>
          </button>
        </div>

        <div className="label" style={{ marginBottom: 6 }}>DAY</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {days.map(d => (
            <button key={d} onClick={() => setDay(d)}
              className={`chip ${day === d ? 'chip-ember' : ''}`}
              style={{ border: 'none', cursor: 'pointer', flex: 1, justifyContent: 'center' }}
            >{d}</button>
          ))}
        </div>

        <div className="label" style={{ marginBottom: 6 }}>TIME</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto', paddingBottom: 4 }}>
          {times.map(t => (
            <button key={t} onClick={() => setTime(t)}
              className="mono"
              style={{
                padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
                background: time === t ? 'var(--ember)' : 'rgba(255,255,255,0.06)',
                color: time === t ? '#0a0a0a' : 'var(--fg)',
                border: 'none', fontWeight: 700, fontSize: 13, letterSpacing: '0.02em',
                flex: 'none',
              }}
            >{t}</button>
          ))}
        </div>

        <div className="label" style={{ marginBottom: 6 }}>STATION</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          {stations.map(s => (
            <button key={s.id} onClick={() => setStation(s.id)}
              style={{
                all: 'unset', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 14px', borderRadius: 12,
                background: station === s.id ? 'rgba(255,90,31,0.12)' : 'rgba(255,255,255,0.04)',
                border: `0.5px solid ${station === s.id ? 'rgba(255,90,31,0.4)' : 'var(--line)'}`,
              }}
            >
              <div style={{
                width: 18, height: 18, borderRadius: 99,
                border: `1.5px solid ${station === s.id ? 'var(--ember)' : 'var(--fg-dim)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flex: 'none',
              }}>
                {station === s.id && <div style={{ width: 10, height: 10, borderRadius: 99, background: 'var(--ember)' }}/>}
              </div>
              <div style={{ flex: 1 }}>
                <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>{s.name}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', letterSpacing: '0.04em', marginTop: 1 }}>
                  {s.dist} · LOAD {s.load}
                </div>
              </div>
              <div className={`chip ${s.load === 'LOW' ? 'chip-signal' : s.load === 'HIGH' ? 'chip-ember' : ''}`}>
                {s.load}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => onConfirm({ day, time, station })}
          className="btn btn-ember"
          style={{ width: '100%', padding: '14px', fontSize: 14 }}
        >
          CONFIRM SLOT · {day} {time}
        </button>
      </div>
    </>
  );
}

function SheetTripDetail({ trip, onClose }) {
  return (
    <>
      <div className="sheet-backdrop" onClick={onClose}/>
      <div className="sheet">
        <div className="sheet-grabber"/>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ember)', letterSpacing: '0.08em', fontWeight: 700 }}>
              {trip.id}
            </div>
            <h2 className="mono" style={{ fontSize: 20, fontWeight: 800, color: 'var(--fg)', margin: '2px 0', letterSpacing: '-0.02em' }}>
              {trip.to.toUpperCase()}
            </h2>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)', letterSpacing: '0.05em' }}>
              FROM {trip.from.toUpperCase()}
            </div>
          </div>
          <button onClick={onClose} style={{ all: 'unset', cursor: 'pointer', padding: 4, color: 'var(--fg-dim)' }}>
            <Icon.X size={22}/>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
          <div className="widget" style={{ background: '#0a0a0a', padding: 10 }}>
            <div className="label">DEPART</div>
            <div className="big-num" style={{ fontSize: 20, color: 'var(--fg)', marginTop: 2 }}>{trip.time}</div>
          </div>
          <div className="widget" style={{ background: '#0a0a0a', padding: 10 }}>
            <div className="label">DIST</div>
            <div className="big-num" style={{ fontSize: 20, color: 'var(--fg)', marginTop: 2 }}>{trip.distance}km</div>
          </div>
          <div className="widget" style={{ background: '#0a0a0a', padding: 10 }}>
            <div className="label">PAX</div>
            <div className="big-num" style={{ fontSize: 20, color: 'var(--fg)', marginTop: 2 }}>{trip.pax}</div>
          </div>
        </div>

        {/* schematic route */}
        <div className="widget" style={{ background: '#0a0a0a', padding: 14, marginBottom: 14 }}>
          <div className="label label-bright" style={{ marginBottom: 10 }}>ROUTE</div>
          <svg viewBox="0 0 300 90" style={{ width: '100%', height: 90, display: 'block' }}>
            <g stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" fill="none">
              <path d="M0 30 L300 30 M0 60 L300 60"/>
              <path d="M60 0 L60 90 M140 0 L140 90 M220 0 L220 90"/>
            </g>
            <path d="M20 70 Q80 70 90 50 T150 40 Q200 40 220 55 T280 20"
              fill="none" stroke="var(--ember)" strokeWidth="2" strokeDasharray="4 2"/>
            <circle cx="20" cy="70" r="5" fill="var(--fg)"/>
            <circle cx="280" cy="20" r="5" fill="var(--ember)"/>
          </svg>
        </div>

        <div className="widget" style={{ background: '#0a0a0a', padding: 0, marginBottom: 14 }}>
          <div style={{ padding: '12px 14px', borderBottom: '0.5px solid var(--line)', display: 'flex', justifyContent: 'space-between' }}>
            <span className="mono" style={{ fontSize: 12, color: 'var(--fg-dim)', letterSpacing: '0.03em' }}>ASSIGNED UNIT</span>
            <span className="mono" style={{ fontSize: 12, color: 'var(--fg)', fontWeight: 700 }}>{trip.unit}</span>
          </div>
          <div style={{ padding: '12px 14px', borderBottom: '0.5px solid var(--line)', display: 'flex', justifyContent: 'space-between' }}>
            <span className="mono" style={{ fontSize: 12, color: 'var(--fg-dim)', letterSpacing: '0.03em' }}>MODULE</span>
            <span className="mono" style={{ fontSize: 12, color: 'var(--fg)', fontWeight: 700 }}>7-PAX MOVER</span>
          </div>
          <div style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between' }}>
            <span className="mono" style={{ fontSize: 12, color: 'var(--fg-dim)', letterSpacing: '0.03em' }}>DRIVER</span>
            <span className="mono" style={{ fontSize: 12, color: 'var(--fg)', fontWeight: 700 }}>K. NAKAJIMA</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" style={{ flex: 1 }}>
            REROUTE
          </button>
          <button className="btn btn-ember" style={{ flex: 1 }}>
            TRACK LIVE
          </button>
        </div>
      </div>
    </>
  );
}

function SheetToast({ message, onClose }) {
  React.useEffect(() => {
    const t = setTimeout(onClose, 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      position: 'absolute', top: 80, left: 16, right: 16, zIndex: 90,
      background: 'rgba(20,20,20,0.92)', backdropFilter: 'blur(16px)',
      border: '0.5px solid rgba(255,90,31,0.4)',
      borderRadius: 14, padding: '12px 14px',
      display: 'flex', alignItems: 'center', gap: 10,
      animation: 'sheet-up 0.24s cubic-bezier(.2,.8,.2,1)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 99,
        background: 'rgba(255,90,31,0.18)', color: 'var(--ember)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flex: 'none',
      }}>
        <Icon.Check size={14}/>
      </div>
      <div className="mono" style={{ fontSize: 12, color: 'var(--fg)', fontWeight: 600, flex: 1 }}>{message}</div>
    </div>
  );
}

Object.assign(window, { SheetPitStop, SheetTripDetail, SheetToast });

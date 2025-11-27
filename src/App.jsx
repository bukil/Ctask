import React, { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const RollingNumber = ({ value }) => {
    const prevRef = useRef(String(value))
    const currentStr = String(value)
    const prevStr = prevRef.current
    // After render update previous for next change
    useEffect(() => {
      prevRef.current = currentStr
    }, [currentStr])

    return (
      <span className="rolling-number">
        {currentStr.split('').map((ch, i) => {
          const prevCh = prevStr[i] || ch
          if (/\d/.test(ch) && /\d/.test(prevCh) && ch !== prevCh) {
            const newDigit = parseInt(ch, 10)
            const oldDigit = parseInt(prevCh, 10)
            const direction = newDigit > oldDigit ? 'up' : 'down'
            const changeClass = direction === 'up' ? 'change-up' : 'change-down'
            const initialTransform = direction === 'up' ? 'translateY(0)' : 'translateY(-100%)'
            return (
              <span className={`rolling-digit ${direction} ${changeClass}`} key={i} aria-label={ch}>
                <span className="rolling-digit-inner" style={{ transform: initialTransform }}>
                  {direction === 'up' ? (
                    <>
                      <span>{oldDigit}</span>
                      <span>{newDigit}</span>
                    </>
                  ) : (
                    <>
                      <span>{newDigit}</span>
                      <span>{oldDigit}</span>
                    </>
                  )}
                </span>
              </span>
            )
          } else if (/\d/.test(ch)) {
            return (
              <span className="rolling-digit" key={i} aria-label={ch}>
                <span className="rolling-digit-inner" style={{ transform: 'translateY(0)' }}>
                  <span>{ch}</span>
                </span>
              </span>
            )
          }
          return <span className="rolling-static" key={i}>{ch}</span>
        })}
      </span>
    )
  }

  // Base values
  const baseMrr = 128400 // numeric value in dollars
  const baseWorkspaces = 2947
  const baseFunnel = 23.7 // percent

  // Hover states
  const [hoverMrr, setHoverMrr] = useState(null)
  const [hoverWorkspaces, setHoverWorkspaces] = useState(null)
  const [hoverFunnel, setHoverFunnel] = useState(null)
  // hovered bar index per metric (for line highlight)
  const [hoverMrrIndex, setHoverMrrIndex] = useState(null)
  const [hoverWorkspacesIndex, setHoverWorkspacesIndex] = useState(null)
  const [hoverFunnelIndex, setHoverFunnelIndex] = useState(null)

  // Compute display strings
  const displayMrr = hoverMrr != null
    ? `$${(hoverMrr / 1000).toFixed(1)}k`
    : `$${(baseMrr / 1000).toFixed(1)}k`
  const displayWorkspaces = hoverWorkspaces != null
    ? hoverWorkspaces.toString()
    : baseWorkspaces.toString()
  const displayFunnel = hoverFunnel != null
    ? `${hoverFunnel.toFixed(1)}%`
    : `${baseFunnel.toFixed(1)}%`

  // Bar configs (height %, used to derive hover value)
  const mrrBars = [40, 70, 100, 65]
  const workspacesBars = [55, 80, 95, 60]
  const funnelBars = [60, 65, 58, 62]

  const handleMrrEnter = (pct, idx) => {
    const val = baseMrr * (pct / 100)
    setHoverMrr(val)
    setHoverMrrIndex(idx)
  }
  const handleWorkspacesEnter = (pct, idx) => {
    const val = Math.round(baseWorkspaces * (pct / 100))
    setHoverWorkspaces(val)
    setHoverWorkspacesIndex(idx)
  }
  const handleFunnelEnter = (pct, idx) => {
    const val = baseFunnel * (pct / 100)
    setHoverFunnel(val)
    setHoverFunnelIndex(idx)
  }

  const clearMrr = () => { setHoverMrr(null); setHoverMrrIndex(null) }
  const clearWorkspaces = () => { setHoverWorkspaces(null); setHoverWorkspacesIndex(null) }
  const clearFunnel = () => { setHoverFunnel(null); setHoverFunnelIndex(null) }
  // Line spark component (thin green line below number)
  const LineSpark = ({ data, activeIndex }) => {
    const h = 30
    const w = 100
    const vPad = 3 // vertical gap from top and bottom axes
    const hPad = 0 // remove horizontal padding; axis flush with text left
    const innerH = h - vPad * 2
    const innerW = w - hPad
    const step = innerW / (data.length - 1)
    const points = data.map((v, i) => {
      const x = hPad + i * step
      const y = vPad + (innerH - (v / 100) * innerH)
      return [x, y]
    })
    const path = points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ')
    return (
      <div className={`metric-line-spark ${activeIndex != null ? 'circle-active' : ''}`}> 
        <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="trend line">
          {/* axes */}
          <line className="axis axis-x" x1="0" y1={h} x2={w} y2={h} />
          <line className="axis axis-y" x1="0" y1="0" x2="0" y2={h} />
          <path d={path} />
          {activeIndex != null && (
            <circle className="spark-point active" cx={points[activeIndex][0]} cy={points[activeIndex][1]} r={2.2} />
          )}
        </svg>
      </div>
    )
  }

  const handleTagRipple = (e) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const span = document.createElement('span');
    span.className = 'ripple';
    span.style.left = x + 'px';
    span.style.top = y + 'px';
    target.appendChild(span);
    span.addEventListener('animationend', () => span.remove());
  };
  return (
    <>
      <div className="grainy-bg" />
      <main className="shell">
        <div className="shell-inner">
          <header className="metrics-header">
            <span className="eyebrow">Chronicle Design task</span>
            <h1 className="metrics-title">Key metrics at a glance</h1>
          </header>

          <div className="grid-3" aria-label="Key business metrics">
            <section className="glass-card metric-card" aria-label="Monthly recurring revenue">
              <div className="metric-top">
                <span className="metric-label">Monthly recurring revenue</span>
                <span className="metric-tag" role="button" aria-label="Monthly recurring revenue tag" onPointerDown={handleTagRipple}>MRR</span>
              </div>
              <div className="metric-main">
                <span className="metric-value"><RollingNumber value={displayMrr} /></span>
                <span className="metric-change positive">+8.2%</span>
              </div>
              <LineSpark data={mrrBars} activeIndex={hoverMrrIndex} />
              <div className="metric-meta-row">
                <div className="metric-meta">vs. last 30 days</div>
                <div className="metric-sparkline sparkline-positive" aria-hidden="true">
                  {mrrBars.map((h, i) => (
                    <div
                      key={i}
                      className="metric-sparkline-bar"
                      style={{ height: h + '%' }}
                      onMouseEnter={() => handleMrrEnter(h, i)}
                      onMouseLeave={clearMrr}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section className="glass-card metric-card" aria-label="Active workspaces">
              <div className="metric-top">
                <span className="metric-label">Active workspaces</span>
                <span className="metric-tag" role="button" aria-label="Active workspaces usage tag" onPointerDown={handleTagRipple}>Usage</span>
              </div>
              <div className="metric-main">
                <span className="metric-value"><RollingNumber value={displayWorkspaces} /></span>
                <span className="metric-change positive">+312</span>
              </div>
              <LineSpark data={workspacesBars} activeIndex={hoverWorkspacesIndex} />
              <div className="metric-meta-row">
                <div className="metric-meta">teams active in the last week</div>
                <div className="metric-sparkline sparkline-positive" aria-hidden="true">
                  {workspacesBars.map((h, i) => (
                    <div
                      key={i}
                      className="metric-sparkline-bar"
                      style={{ height: h + '%' }}
                      onMouseEnter={() => handleWorkspacesEnter(h, i)}
                      onMouseLeave={clearWorkspaces}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section className="glass-card metric-card" aria-label="Deck to sign-up conversion">
              <div className="metric-top">
                <span className="metric-label">Deck d sign-up rate</span>
                <span className="metric-tag" role="button" aria-label="Funnel conversion tag" onPointerDown={handleTagRipple}>Funnel</span>
              </div>
              <div className="metric-main">
                <span className="metric-value"><RollingNumber value={displayFunnel} /></span>
                <span className="metric-change neutral">+0.3 pts</span>
              </div>
              <LineSpark data={funnelBars} activeIndex={hoverFunnelIndex} />
              <div className="metric-meta-row">
                <div className="metric-meta">from shared decks this week</div>
                <div className="metric-sparkline sparkline-neutral" aria-hidden="true">
                  {funnelBars.map((h, i) => (
                    <div
                      key={i}
                      className="metric-sparkline-bar"
                      style={{ height: h + '%' }}
                      onMouseEnter={() => handleFunnelEnter(h, i)}
                      onMouseLeave={clearFunnel}
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

export default App

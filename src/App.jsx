import React from 'react'
import './App.css'

function App() {
  return (
    <>
      <div className="grainy-bg" />
      <main className="shell">
        <div className="shell-inner">
          <header className="metrics-header">
            <span className="eyebrow">Chronicle / Weekly snapshot</span>
            <h1 className="metrics-title">Key metrics at a glance</h1>
          </header>

          <div className="grid-3" aria-label="Key business metrics">
            <section className="glass-card metric-card" aria-label="Monthly recurring revenue">
              <div className="metric-top">
                <span className="metric-label">Monthly recurring revenue</span>
                <span className="metric-tag">MRR</span>
              </div>
              <div className="metric-main">
                <span className="metric-value">$128.4k</span>
                <span className="metric-change positive">+8.2%</span>
              </div>
              <div className="metric-meta-row">
                <div className="metric-meta">vs. last 30 days</div>
                <div className="metric-sparkline sparkline-positive" aria-hidden="true">
                  <div className="metric-sparkline-bar" style={{ height: '40%' }} />
                  <div className="metric-sparkline-bar" style={{ height: '70%' }} />
                  <div className="metric-sparkline-bar" style={{ height: '100%' }} />
                  <div className="metric-sparkline-bar" style={{ height: '65%' }} />
                </div>
              </div>
            </section>

            <section className="glass-card metric-card" aria-label="Active workspaces">
              <div className="metric-top">
                <span className="metric-label">Active workspaces</span>
                <span className="metric-tag">Usage</span>
              </div>
              <div className="metric-main">
                <span className="metric-value">2,947</span>
                <span className="metric-change positive">+312</span>
              </div>
              <div className="metric-meta-row">
                <div className="metric-meta">teams active in the last week</div>
                <div className="metric-sparkline sparkline-positive" aria-hidden="true">
                  <div className="metric-sparkline-bar" style={{ height: '55%' }} />
                  <div className="metric-sparkline-bar" style={{ height: '80%' }} />
                  <div className="metric-sparkline-bar" style={{ height: '95%' }} />
                  <div className="metric-sparkline-bar" style={{ height: '60%' }} />
                </div>
              </div>
            </section>

            <section className="glass-card metric-card" aria-label="Deck to sign-up conversion">
              <div className="metric-top">
                <span className="metric-label">Deck d sign-up rate</span>
                <span className="metric-tag">Funnel</span>
              </div>
              <div className="metric-main">
                <span className="metric-value">23.7%</span>
                <span className="metric-change neutral">+0.3 pts</span>
              </div>
              <div className="metric-meta-row">
                <div className="metric-meta">from shared decks this week</div>
                <div className="metric-sparkline sparkline-neutral" aria-hidden="true">
                  <div className="metric-sparkline-bar" style={{ height: '60%' }} />
                  <div className="metric-sparkline-bar" style={{ height: '65%' }} />
                  <div className="metric-sparkline-bar" style={{ height: '58%' }} />
                  <div className="metric-sparkline-bar" style={{ height: '62%' }} />
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

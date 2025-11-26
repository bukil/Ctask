import React from 'react'
import './App.css'

function App() {
  return (
    <>
      <div className="grainy-bg" />
      <main className="shell">
        <div className="grid-3">
          <section className="glass-card" aria-hidden="true" />
          <section className="glass-card" aria-hidden="true" />
          <section className="glass-card" aria-hidden="true" />
        </div>
      </main>
    </>
  )
}

export default App

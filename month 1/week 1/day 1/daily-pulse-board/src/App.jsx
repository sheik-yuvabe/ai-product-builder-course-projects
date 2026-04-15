import { useState } from "react";
import PulseCard from "./components/PulseCard";
import "./App.css";

const pulseDetails = {
  focused: {
    badge: "Focused mode",
    heading: "You are ready for deep work.",
    message:
      "Keep your task list short today. One clear target will help you finish with less stress.",
    tip: "Start with the task that needs the most attention before checking messages.",
  },
  steady: {
    badge: "Steady mode",
    heading: "You have a balanced rhythm today.",
    message:
      "This is a good day for mixing creative work and team updates without feeling rushed.",
    tip: "Block one hour for work, then take a small break to keep your energy stable.",
  },
  recharge: {
    badge: "Recharge mode",
    heading: "A lighter plan will help you recover.",
    message:
      "Choose small wins, reduce extra pressure, and give yourself time to reset your energy.",
    tip: "Pick one must-do task and one easy task so progress still feels visible.",
  },
};

function App() {
  const [selectedPulse, setSelectedPulse] = useState("focus");
  const [showTip, setShowTip] = useState(false);

  const currentPulse = pulseDetails[selectedPulse];

  function handlePulseChange(nextPulse) {
    setSelectedPulse(nextPulse);
    setShowTip(false);
  }

  function handleTipToggle() {
    setShowTip(!showTip);
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">Week 1 Day 1 project</p>
        <h1>Daily Pulse Board</h1>
        <p className="intro">
          This board helps a student or small team check today&apos;s working
          energy before starting tasks.
        </p>
      </section>

      <section className="board-layout">
        <div className="card-column">
          <h2>Choose today&apos;s pulse</h2>
          <p className="section-copy">
            Click one card. The active card changes style, and the summary panel
            updates from React state.
          </p>

          <div className="pulse-grid">
            <PulseCard
              title="Focused"
              description="I want a quiet day with strong concentration."
              isActive={selectedPulse === "focused"}
              onSelect={() => handlePulseChange("focused")}
            />
            <PulseCard
              title="Steady"
              description="I can handle a normal pace and a few team check-ins."
              isActive={selectedPulse === "steady"}
              onSelect={() => handlePulseChange("steady")}
            />
            <PulseCard
              title="Recharge"
              description="I need a simpler plan and smaller wins today."
              isActive={selectedPulse === "recharge"}
              onSelect={() => handlePulseChange("recharge")}
            />
          </div>
        </div>

        <aside className={`summary-panel summary-panel--${selectedPulse}`}>
          <p className="status-label">Current status</p>
          <span className={`pulse-badge pulse-badge--${selectedPulse}`}>
            {currentPulse.badge}
          </span>
          <h2>{currentPulse.heading}</h2>
          <p className="summary-text">{currentPulse.message}</p>

          <button className="tip-button" onClick={handleTipToggle}>
            {showTip ? "Hide coach tip" : "Show coach tip"}
          </button>

          {showTip && (
            <div className="tip-box">
              <h3>Coach tip</h3>
              <p>{currentPulse.tip}</p>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

export default App;

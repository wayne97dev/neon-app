import Header from "./components/Header.jsx";
import PaymentFlow from "./components/PaymentFlow.jsx";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="hero">
          <h2>AI-Powered Trading Signals</h2>
          <p>
            Institutional-grade analysis for BTC, ETH & SOL perpetual futures.
            Real-time market scanning powered by AI every 20 minutes.
          </p>
        </div>

        <div className="info-section">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">🧠</span>
              <h3>Claude AI</h3>
              <p>Powered by Anthropic's Claude Sonnet — advanced reasoning for market analysis</p>
            </div>
            <div className="info-item">
              <span className="info-icon">⚡</span>
              <h3>Every 20 Minutes</h3>
              <p>Continuous market scanning with real-time Coinglass data across BTC, ETH & SOL</p>
            </div>
            <div className="info-item">
              <span className="info-icon">📊</span>
              <h3>Graded Signals</h3>
              <p>Only A+ and B grade setups are shared — no noise, only high-conviction trades</p>
            </div>
            <div className="info-item">
              <span className="info-icon">💎</span>
              <h3>0.5 SOL / Month</h3>
              <p>One payment for 30 days of premium signals delivered to a private Telegram channel</p>
            </div>
          </div>
        </div>

        <PaymentFlow />
      </main>

      <footer className="footer">
        <div className="footer-links">
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer-link">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="footer-link pump-link">
            pump.fun
          </a>
        </div>
        <p className="footer-note">Yuko Agent Pump — Tokenized on Pump.fun</p>
      </footer>
    </div>
  );
}

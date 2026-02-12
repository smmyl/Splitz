import '../styles/BalanceSummary.css';

export default function BalanceSummary({ balances }) {
  return (
    <section className="balance-section">
      <h3>📊 Group Balances</h3>
      <div className="balance-grid">
        {Object.entries(balances).map(([name, amount]) => {
          // Determine the color class
          let statusClass = "neutral";
          if (amount > 0.01) statusClass = "positive";
          if (amount < -0.01) statusClass = "negative";

          return (
            <div key={name} className="balance-card">
              <span className="balance-name">{name}</span>
              <span className={`balance-amount ${statusClass}`}>
                {amount > 0 ? '+' : ''}{amount.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
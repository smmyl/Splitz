export default function BalanceSummary({ balances }) {
    return (
      <section style={{ padding: '15px', border: '2px solid #166534', borderRadius: '12px', backgroundColor: '#f0fdf4' }}>
        <h3>4. Summary</h3>
        {Object.entries(balances).map(([name, bal]) => (
          <div key={name} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
            <span>{name}</span>
            <span style={{ fontWeight: 'bold', color: bal >= 0 ? '#166534' : '#991b1b' }}>
              {bal >= 0 ? `Owed $${bal.toFixed(2)}` : `Owes $${Math.abs(bal).toFixed(2)}`}
            </span>
          </div>
        ))}
      </section>
    );
  }
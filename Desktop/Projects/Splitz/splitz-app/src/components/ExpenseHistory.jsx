export default function ExpenseHistory({ expenses, onDelete }) {
    return (
      <section style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '12px' }}>
        <h3>3. Expense History</h3>
        {expenses.length === 0 ? <p style={{ color: '#888' }}>No expenses yet.</p> : (
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {expenses.map((exp) => (
              <div key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <div>
                  <strong>{exp.description}</strong> - ${exp.amount.toFixed(2)}
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>
                    Paid by {exp.paidBy} • Split: {exp.participants.join(', ')}
                  </div>
                </div>
                <button onClick={() => onDelete(exp.id)} style={{ color: '#dc3545', border: 'none', background: 'none', cursor: 'pointer' }}>✕</button>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
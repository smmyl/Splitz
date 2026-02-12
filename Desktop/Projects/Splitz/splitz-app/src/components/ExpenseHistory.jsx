import '../styles/ExpenseHistory.css';

export default function ExpenseHistory({ expenses, onDelete }) {
  return (
    <section className="history-section">
      <h3>📜 Recent Activity</h3>
      
      {expenses.length === 0 ? (
        <p style={{ color: '#94a3b8', textAlign: 'center' }}>No expenses yet.</p>
      ) : (
        <div className="history-list">
          {expenses.map((exp) => (
            <div key={exp.id} className="expense-item">
              <div className="expense-info">
                <span className="expense-desc">{exp.description}</span>
                <span className="expense-meta">
                  Paid by <strong>{exp.paidBy}</strong> • {exp.participants?.length} split
                </span>
              </div>
              
              <div className="expense-amount-area">
                <span className="expense-price">
                  ${Number(exp.amount).toFixed(2)}
                </span>
                <button 
                  className="delete-btn" 
                  onClick={() => onDelete(exp.id)}
                  title="Delete expense"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
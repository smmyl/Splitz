import { useState, useEffect } from 'react';
import '../styles/AddExpense.css';

export default function AddExpense({ people, onAdd }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (people.length > 0) {
      if (!paidBy) setPaidBy(people[0]);
      if (participants.length === 0) setParticipants(people);
    }
  }, [people]);

  const handleSubmit = () => {
    const finalPayer = paidBy || people[0];
    if (amount > 0 && description && participants.length > 0 && finalPayer) {
      onAdd({ description, amount: parseFloat(amount), paidBy: finalPayer, participants });
      setAmount('');
      setDescription('');
      setParticipants(people);
    }
  };

  return (
    <section className="add-expense-section">
      <h3>💸 2. New Expense</h3>
      <div className="form-group">
        <input 
          className="expense-input"
          placeholder="What was it for?" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <input 
          className="expense-input"
          type="number" 
          placeholder="Amount ($)" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
        />
        
        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '-8px' }}>Who paid?</label>
        <select className="expense-select" value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
          {people.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '-8px' }}>Split with:</label>
        <div className="participant-grid">
          {people.map(p => (
            <label key={p} className="participant-label">
              <input 
                type="checkbox" 
                checked={participants.includes(p)} 
                onChange={() => {
                  setParticipants(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
                }} 
              /> {p}
            </label>
          ))}
        </div>
        
        <button className="submit-expense-btn" onClick={handleSubmit}>Add Expense</button>
      </div>
    </section>
  );
}
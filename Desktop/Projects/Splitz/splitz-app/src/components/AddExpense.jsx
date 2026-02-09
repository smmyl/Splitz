import { useState } from 'react';

export default function AddExpense({ people, onAdd }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paidBy, setPaidBy] = useState(people[0] || '');
  const [participants, setParticipants] = useState(people);

  const handleSubmit = () => {
    if (amount > 0 && description && participants.length > 0) {
      onAdd({ description, amount: parseFloat(amount), paidBy, participants });
      setAmount('');
      setDescription('');
    }
  };

  return (
    <section style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '12px' }}>
      <h3>2. New Expense</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '8px' }} />
        <input type="number" placeholder="Amount ($)" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ padding: '8px' }} />
        <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
          {people.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <div>
          {people.map(p => (
            <label key={p} style={{ marginRight: '10px' }}>
              <input type="checkbox" checked={participants.includes(p)} onChange={() => {
                setParticipants(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
              }} /> {p}
            </label>
          ))}
        </div>
        <button onClick={handleSubmit} style={{ padding: '10px', backgroundColor: '#2563eb', color: 'white' }}>Add Expense</button>
      </div>
    </section>
  );
}
// Add useEffect to your imports
import { useState, useEffect } from 'react';

export default function AddExpense({ people, onAdd }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [participants, setParticipants] = useState([]);

  // THIS IS THE KEY: Update defaults when people list changes
  useEffect(() => {
    if (people.length > 0) {
      if (!paidBy) setPaidBy(people[0]);
      if (participants.length === 0) setParticipants(people);
    }
  }, [people]);

  const handleSubmit = () => {
    // Ensure we have a valid paidBy before sending
    const finalPayer = paidBy || people[0];
    
    if (amount > 0 && description && participants.length > 0 && finalPayer) {
      onAdd({ 
        description, 
        amount: parseFloat(amount), 
        paidBy: finalPayer, 
        participants 
      });
      setAmount('');
      setDescription('');
      // Optional: Reset participants to everyone for the next entry
      setParticipants(people); 
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
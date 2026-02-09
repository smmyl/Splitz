import { useState, useMemo } from 'react';

export default function SplitzApp() {
  const [people, setPeople] = useState(['Alice', 'Bob', 'Charlie']);
  const [newName, setNewName] = useState('');
  const [expenses, setExpenses] = useState([]);
  
  // Expense Form State
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paidBy, setPaidBy] = useState('Alice');
  const [participants, setParticipants] = useState(['Alice', 'Bob', 'Charlie']);

  const addPerson = () => {
    if (newName && !people.includes(newName)) {
      setPeople([...people, newName]);
      setParticipants([...participants, newName]); // Add them to current selection too
      setNewName('');
    }
  };

  const toggleParticipant = (name) => {
    setParticipants(prev => 
      prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]
    );
  };

  const addExpense = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && description && participants.length > 0) {
      setExpenses([...expenses, { 
        description, 
        amount: numAmount, 
        paidBy, 
        participants: [...participants], // Save who was involved
        id: crypto.randomUUID() 
      }]);
      setAmount('');
      setDescription('');
      // Reset participants to everyone for the next expense
      setParticipants([...people]);
    }
  };

  const balances = useMemo(() => {
    const tally = {};
    people.forEach(p => tally[p] = 0);

    expenses.forEach(exp => {
      // Split ONLY among those who participated
      const share = exp.amount / exp.participants.length;
      
      // 1. The person who paid gets the full amount back
      tally[exp.paidBy] += exp.amount;

      // 2. Everyone who participated "owes" their share
      exp.participants.forEach(p => {
        tally[p] -= share;
      });
    });
    return tally;
  }, [expenses, people]);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1>Splitz 💸</h1>
      
      {/* 1. Add People */}
      <section style={sectionStyle}>
        <h3>1. Group Members</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Name" style={inputStyle} />
          <button onClick={addPerson}>Add</button>
        </div>
      </section>

      {/* 2. Add Expense */}
      <section style={sectionStyle}>
        <h3>2. New Expense</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Amount ($)" value={amount} onChange={(e) => setAmount(e.target.value)} style={inputStyle} />
          
          <div>
            <label><strong>Paid by:</strong></label>
            <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)} style={{ marginLeft: '10px', padding: '5px' }}>
              {people.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label><strong>Who participated?</strong></label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '5px' }}>
              {people.map(p => (
                <label key={p} style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={participants.includes(p)} 
                    onChange={() => toggleParticipant(p)} 
                  /> {p}
                </label>
              ))}
            </div>
          </div>

          <button onClick={addExpense} style={buttonStyle}>Add Expense</button>
        </div>
      </section>

      {/* 3. Balances */}
      <section style={{ ...sectionStyle, backgroundColor: '#f0fdf4' }}>
        <h3>3. Final Balances</h3>
        {Object.entries(balances).map(([name, bal]) => (
          <div key={name} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
            <span>{name}</span>
            <span style={{ fontWeight: 'bold', color: bal >= 0 ? '#166534' : '#991b1b' }}>
              {bal >= 0 ? `Owed $${bal.toFixed(2)}` : `Owes $${Math.abs(bal).toFixed(2)}`}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}

// Simple styles
const sectionStyle = { marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '12px' };
const inputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' };
const buttonStyle = { padding: '10px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' };
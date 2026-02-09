import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function SplitzApp() {
  const [people, setPeople] = useState(['Sam', 'Alex']);
  const [newName, setNewName] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paidBy, setPaidBy] = useState('Sam');

  const addPerson = () => {
    if (newName && !people.includes(newName)) {
      setPeople([...people, newName]);
      setNewName('');
    }
  };

  const addExpense = () => {
    if (amount > 0 && description) {
      setExpenses([...expenses, { description, amount: parseFloat(amount), paidBy }]);
      setAmount('');
      setDescription('');
    }
  };

  // Logic to calculate who owes what
  const calculateBalances = () => {
    const balances = {};
    people.forEach(p => balances[p] = 0);

    expenses.forEach(exp => {
      const share = exp.amount / people.length;
      people.forEach(person => {
        if (person === exp.paidBy) {
          balances[person] += (exp.amount - share);
        } else {
          balances[person] -= share;
        }
      });
    });
    return balances;
  };

  const balances = calculateBalances();

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Splitz 💸</h1>
      
      {/* Add People Section */}
      <section>
        <h3>People</h3>
        <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Name" />
        <button onClick={addPerson}>Add Person</button>
        <ul>{people.map(p => <li key={p}>{p}</li>)}</ul>
      </section>

      {/* Add Expense Section */}
      <section>
        <h3>Add Expense</h3>
        <input placeholder="Coffee, Rent, etc." value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
          {people.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <button onClick={addExpense}>Add</button>
      </section>

      {/* Results Section */}
      <section>
        <h3>Current Balances</h3>
        {Object.entries(balances).map(([name, bal]) => (
          <p key={name} style={{ color: bal >= 0 ? 'green' : 'red' }}>
            {name}: {bal >= 0 ? `is owed $${bal.toFixed(2)}` : `owes $${Math.abs(bal).toFixed(2)}`}
          </p>
        ))}
      </section>
    </div>
  );
}


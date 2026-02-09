import { useState, useMemo } from 'react';
import AddExpense from './components/AddExpense';
import ExpenseHistory from './components/ExpenseHistory';
import BalanceSummary from './components/BalanceSummary';
import AddPerson from './components/AddPerson';

export default function SplitzApp() {
  const [people, setPeople] = useState(['Alice', 'Bob', 'Charlie']);
  const [expenses, setExpenses] = useState([]);

  const handleAddPerson = (name) => {
    setPeople([...people, name]);
  };

  const addExpense = (newExp) => {
    setExpenses([{ ...newExp, id: crypto.randomUUID() }, ...expenses]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const balances = useMemo(() => {
    const tally = {};
    people.forEach(p => tally[p] = 0);
    expenses.forEach(exp => {
      const share = exp.amount / exp.participants.length;
      tally[exp.paidBy] += exp.amount;
      exp.participants.forEach(p => tally[p] -= share);
    });
    return tally;
  }, [expenses, people]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Splitz 💸</h1>
      <AddPerson people={people} onAddPerson={handleAddPerson} />
      <AddExpense people={people} onAdd={addExpense} />
      <ExpenseHistory expenses={expenses} onDelete={deleteExpense} />
      <BalanceSummary balances={balances} />
    </div>
  );
}
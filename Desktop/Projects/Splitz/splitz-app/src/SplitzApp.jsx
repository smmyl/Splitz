import { useEffect, useState, useMemo } from 'react';
import { supabase } from './supabaseClient';
import AddExpense from './components/AddExpense';
import ExpenseHistory from './components/ExpenseHistory';
import BalanceSummary from './components/BalanceSummary';
import AddPerson from './components/AddPerson';

export default function SplitzApp() {
  const [people, setPeople] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function fetchData() {
// Fetch people and expenses simultaneously
      // Fetch people and expenses simultaneously
      const [pRes, eRes] = await Promise.all([
        supabase.from('people').select('*'),
        supabase.from('expenses').select('*').order('created_at', { ascending: false })
      ]);

      if (pRes.data) setPeople(pRes.data.map(p => p.name));
      if (eRes.data) setExpenses(eRes.data);
      
      if (pRes.error) console.error("Error fetching people:", pRes.error);
      if (eRes.error) console.error("Error fetching expenses:", eRes.error);
    }
    fetchData();
  }, []);

  const handleAddPerson = async (name) => {
    // Forces "alice " or "ALICE" to become "Alice"
    const formattedName = name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
  
    const { data, error } = await supabase
      .from('people')
      .insert([{ name: formattedName }])
      .select();
  
    if (!error) {
      setPeople([...people, data[0].name]);
    }
  };

  const addExpense = async (newExp) => {
    const { data, error } = await supabase
      .from('expenses')
      .insert([{ 
        description: newExp.description,
        amount: newExp.amount,
        paidBy: newExp.paidBy,
        participants: newExp.participants
      }])
      .select(); // This .select() is required to get the new row back

    if (error) {
      console.error("Database error adding expense:", error.message);
    } else if (data && data.length > 0) {
      // ✅ SUCCESS: Add the new expense to the top of the list
      setExpenses(prevExpenses => [data[0], ...prevExpenses]);
      console.log("New expense added to state:", data[0]);
    }
  };

  const deleteExpense = async (id) => {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (!error) {
      setExpenses(expenses.filter(exp => exp.id !== id));
    } else {
      console.error("Error deleting expense:", error.message);
    }
  };

  const balances = useMemo(() => {
    const tally = {};
    people.forEach(p => tally[p] = 0);
  
    expenses.forEach(exp => {
      const amount = Number(exp.amount);
      // Ensure the payer name from the DB is trimmed to match the people list
      const payer = exp.paidBy?.trim(); 
  
      if (amount > 0 && tally.hasOwnProperty(payer)) {
        const share = amount / exp.participants.length;
  
        // 1. Credit the Payer
        tally[payer] += amount;
  
        // 2. Debit the Participants
        exp.participants.forEach(p => {
          if (tally.hasOwnProperty(p)) {
            tally[p] -= share;
          }
        });
      }
    });
    return tally;
  }, [expenses, people]);

  const clearAllData = async () => {
    const confirmed = window.confirm("Are you sure? This will permanently delete ALL expenses and people.");
    
    if (confirmed) {
      // 1. Delete from Supabase (using a filter that matches all rows)
      // .neq('id', '00000000-0000-0000-0000-000000000000') is a trick 
      // to select every row since no ID will ever be all zeros.
      const { error: expError } = await supabase.from('expenses').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      const { error: pepError } = await supabase.from('people').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
      if (!expError && !pepError) {
        // 2. Clear local React state
        setExpenses([]);
        setPeople([]);
        alert("Database wiped successfully!");
      } else {
        console.error("Error wiping data:", expError || pepError);
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Splitz 💸</h1>
      <AddPerson people={people} onAddPerson={handleAddPerson} />
      <AddExpense people={people} onAdd={addExpense} />
      <ExpenseHistory expenses={expenses} onDelete={deleteExpense} />
      <BalanceSummary balances={balances} />

      <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px', textAlign: 'center' }}>
      <button 
        onClick={clearAllData} 
        style={{ color: '#dc3545', background: 'none', border: '1px solid #dc3545', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
      >
        Reset Entire Project
      </button>
    </div>
    </div>
  );
}
import { useState } from 'react';

export default function AddPerson({ people, onAddPerson }) {
  const [newName, setNewName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Trim and Clean the input
    const cleanName = newName.trim();
    
    // 2. Auto-capitalize (e.g., 'sam' becomes 'Sam')
    const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();

    if (formattedName && !people.includes(formattedName)) {
      onAddPerson(formattedName);
      setNewName('');
    } else if (people.includes(formattedName)) {
      alert("This person is already in the group!");
    }
  };

  return (
    <section style={sectionStyle}>
      <h3>1. Group Members</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input 
          value={newName} 
          onChange={(e) => setNewName(e.target.value)} 
          placeholder="Enter name..." 
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Add</button>
      </form>

      {/* Quick view of people already added */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {people.map(person => (
          <span key={person} style={badgeStyle}>
            {person}
          </span>
        ))}
      </div>
    </section>
  );
}

// Styling constants
const sectionStyle = { 
  marginBottom: '20px', 
  padding: '15px', 
  border: '1px solid #ddd', 
  borderRadius: '12px',
  backgroundColor: '#fff'
};

const inputStyle = { 
  padding: '10px', 
  borderRadius: '6px', 
  border: '1px solid #ccc', 
  flex: 1 
};

const buttonStyle = { 
  padding: '10px 16px', 
  backgroundColor: '#2563eb', 
  color: 'white', 
  border: 'none', 
  borderRadius: '6px', 
  cursor: 'pointer',
  fontWeight: 'bold'
};

const badgeStyle = {
  padding: '4px 10px',
  backgroundColor: '#f3f4f6',
  borderRadius: '20px',
  fontSize: '0.85rem',
  color: '#374151',
  border: '1px solid #e5e7eb'
};
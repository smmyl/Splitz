import { useState } from 'react';
import '../styles/AddPerson.css'; 

export default function AddPerson({ people, onAddPerson }) {
  const [newName, setNewName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = newName.trim();
    if (!cleanName) return;

    const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();

    if (formattedName && !people.includes(formattedName)) {
      onAddPerson(formattedName);
      setNewName('');
    }
  };

  return (
    <section className="add-person-section">
      <h3>1. Group Members</h3>
      
      <form onSubmit={handleSubmit} className="add-person-form">
        <input 
          className="name-input"
          value={newName} 
          onChange={(e) => setNewName(e.target.value)} 
          placeholder="Enter name..." 
        />
        <button type="submit" className="add-button">Add</button>
      </form>

      <div className="badge-container">
        {people.map(person => (
          <span key={person} className="name-badge">
            {person}
          </span>
        ))}
      </div>
    </section>
  );
}
import React, { useState } from 'react';

interface ModalProps {
  onClose: () => void;
  onAddProject: (project: { name: string; budget: number; status: string }) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onAddProject }) => {
  const [name, setName] = useState<string>('');
  const [budget, setBudget] = useState<number | ''>(''); // Budget state
  const [status, setStatus] = useState<string>('Open');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && budget) {
      onAddProject({ name, budget: Number(budget), status }); // makes sure budget is a number
      setName('');
      setBudget(''); // Reset budget to empty string ---need to ask if this is correct
      setStatus('Open');
    }
  };

  // Handle budget change event
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Check if valid 
    if (value === '') {
      setBudget(''); // Allow empty input
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setBudget(numValue); // budget as num
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog">
        {/* how to properly create Modal on Bootstrap docs */}

        <div className="modal-content" style={{ color: "black", background: "white" }} onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Add New Project</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Project Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Budget:
              <input type="number" value={budget} onChange={handleBudgetChange} required />
            </label>
            <label>
              Status:
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Abandoned">Abandoned</option>
              </select>
            </label>
            <div className="modal-buttons">
              <button type="button" className="btn edit-btn" onClick={() => console.log("Edit action initiated")}>Edit</button>
              <button type="submit" className="btn save-btn" style={{ color: "black", background: "white" }} >Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
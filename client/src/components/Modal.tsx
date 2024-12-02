import React, { useState } from 'react';

interface ModalProps {
  onClose: () => void;
  onAddProject: (project: { name: string; budget: number; status: string }) => void;
}
//these params have to be defined above
const Modal: React.FC<ModalProps> = ({ onClose, onAddProject }) => {
  const [name, setName] = useState<string>('');
  const [budget, setBudget] = useState<number | ''>('');
  const [status, setStatus] = useState<string>('Open');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && budget) {
      // onAddProject({ name, budget: parseFloat(budget), status });
      onAddProject({ name, budget: Number(budget), status }); //need budget to be a number
      setName('');
      setBudget('');
      setStatus('Open');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Project Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Budget:
            <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} required />
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
                  <button type="submit" className="btn save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

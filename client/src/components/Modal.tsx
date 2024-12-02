import React, { useState } from 'react';
// import { AnyFunction } from 'sequelize/lib/utils';

//might need to import some stuff


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
      onAddProject({ name, budget: Number(budget), status }); //need budget to be a number
      setName('');
      setBudget('');
      setStatus('Open');

    }

  };

  return (
    <div className="modal show d-block" role="dialog">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Project Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Budget:
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value ? Number(e.target.value) : '')} //i had to update handler render value
              required
            />
          </label>
          <label>
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Abandoned">Abandoned</option>
            </select>
          </label>
          <button type="submit" className="btn btn-success">Add Project</button>
        </form>
      </div>
    </div>
  );
};


//Modal needs to be a component
export default Modal;
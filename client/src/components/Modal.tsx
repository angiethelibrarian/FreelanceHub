import React, { useState } from 'react';
// import { AnyFunction } from 'sequelize/lib/utils';

//might need to import some stuff


interface ModalProps {
  onClose: () => void;
  onAddProject: (project: { name: string; budget: number; status: string }) => void;
}

//these params have to be defined above
const Modal = ({ onClose: any, onAddProject: any }) => {
    const [name, setName] = useState('');
    const [budget, setBudget] = useState('');
    const [status, setStatus] = useState('Open');
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && budget) {
            onAddProject({ name, budget, status });
            setName('');
            setBudget('');
            setStatus('Open');
      
    }
    
  };
  
    return (
     < div className = "modal" >
       < div className = "modal-content" >
         < span className = "close" onClick = { onClose } >& times;</span >
           < h2 > Add New Project</h2 >
             < form onSubmit = { handleSubmit } >
                        <label>
              Project Name:
   < input type = "text" value = { name } onChange = {(e) => setName(e.target.value)} required />
              </label >
                <label>
            Budget:
 < input type = "number" value = { budget } onChange = {(e) => setBudget(e.target.value)} required />
            </label >
              <label>
            Status:
 < select value = { status } onChange = {(e) => setStatus(e.target.value)}>
   < option value = "Open" > Open</option >
     < option value = "Closed" > Closed</option >
       < option value = "Abandoned" > Abandoned</option >
                    </select >
                    </label >
             < button type = "submit" > Add Project</button >
                      </form >
                      </div >
                      </div >
                      );
};

//Modal needs to be a component
export default Modal;
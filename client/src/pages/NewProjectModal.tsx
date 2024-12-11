import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NewProjectModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    project: "",
    budget: "",
    status: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    setShowModal(false); // Close the modal after saving
  };

  const handleEdit = () => {
    console.log("Edit action initiated");
  };

  return (
    <div className="container mt-3">
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        + New Project Window
      </button>

      {showModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Project</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="project" className="form-label">
                      Project
                    </label>
                    <select
                      className="form-select"
                      id="project"
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a project</option>
                      <option value="Website Redesign">Website Redesign</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Marketing Campaign">
                        Marketing Campaign
                      </option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="budget" className="form-label">
                      Budget
                    </label>
                    <select
                      className="form-select"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a budget</option>
                      <option value="Under $10,000">Under $10,000</option>
                      <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                      <option value="Over $50,000">Over $50,000</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a status</option>
                      <option value="Planned">Planned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </form>
              {/* </div> */}
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={handleEdit}>
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewProjectModal;


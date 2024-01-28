import React, { useState, useEffect } from "react";
import axios from "axios";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({ name: "" });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Fetch departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    // Check if the department name is filled
    setIsButtonDisabled(!newDepartment.name);
  }, [newDepartment]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:3001/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  const handleCreateDepartment = async () => {
    try {
      await axios.post("http://localhost:3001/departments", newDepartment);
      fetchDepartments();
      setNewDepartment({ name: "" });
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  const handleDeleteDepartment = async (departmentId) => {
    try {
      await axios.delete(`http://localhost:3001/departments/${departmentId}`);
      fetchDepartments();
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const handleUpdateDepartment = async (departmentId, newName) => {
    try {
      await axios.put(`http://localhost:3001/departments/${departmentId}`, {
        name: newName,
      });
      fetchDepartments();
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: "10px" }}>Department Management</h2>{" "}
      {/* Adjusted margin */}
      <form className="mb-3 row g-3 align-items-center">
        <div className="col-auto">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Department Name"
            value={newDepartment.name}
            style={{ fontSize: "20px" }}
            onChange={(e) =>
              setNewDepartment({ ...newDepartment, name: e.target.value })
            }
          />
        </div>
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-success"
            style={{ height: "40px", width: "100px" }}
            onClick={handleCreateDepartment}
            disabled={isButtonDisabled}
          >
            Create
          </button>
        </div>
      </form>
      {/* Display existing departments in a table */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Department Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department._id}>
              <td>{department.name.toUpperCase()}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDeleteDepartment(department._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    const newName = prompt("Enter new department name:");
                    if (newName) {
                      handleUpdateDepartment(department._id, newName);
                    }
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentManagement;

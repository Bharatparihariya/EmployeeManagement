import React, { useState, useEffect } from "react";
import axios from "axios";

function AssignDepartment() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [assignedDepartments, setAssignedDepartments] = useState([]);

  useEffect(() => {
    // Fetch employees
    axios
      .get("http://localhost:3001/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });

    // Fetch departments
    axios
      .get("http://localhost:3001/departments")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch assigned departments for selected employee
    if (selectedEmployee) {
      axios
        .get(`http://localhost:3001/assignedDepartment/${selectedEmployee}`)
        .then((response) => {
          setAssignedDepartments(response.data);
        })
        .catch((error) => {
          console.error("Error fetching assigned departments:", error);
        });
    }
  }, [selectedEmployee]);

  const handleAssignDepartment = () => {
    // Make API call to assign department to employee
    axios
      .post(`http://localhost:3001/assign-department/${selectedEmployee}`, {
        departmentId: selectedDepartment,
      })
      .then((response) => {
        console.log(response.data.message);
        // Update assigned departments after successful assignment
        axios
          .get(`http://localhost:3001/assignedDepartment/${selectedEmployee}`)
          .then((response) => {
            setAssignedDepartments(response.data);
          })
          .catch((error) => {
            console.error("Error fetching assigned departments:", error);
          });
      })
      .catch((error) => {
        console.error("Error assigning department:", error);
        // Handle error, show error message to user, etc.
      });
  };

  return (
    <div>
      <h2>Assign Department to Employee</h2>
      <div>
        <label>Select Employee:</label>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">Select an Employee</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.username}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Department:</label>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">Select a Department</option>
          {departments.map((department) => (
            <option key={department._id} value={department._id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAssignDepartment}>Assign Department</button>

      {/* Display assigned departments in a table */}
      <h2>Assigned Departments</h2>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {assignedDepartments.map((assignedDept) => (
            <tr key={assignedDept._id}>
              <td>
                {assignedDept.employeeId
                  ? assignedDept.employeeId.username
                  : "N/A"}
              </td>
              <td>
                {assignedDept.departmentId
                  ? assignedDept.departmentId.name
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignDepartment;

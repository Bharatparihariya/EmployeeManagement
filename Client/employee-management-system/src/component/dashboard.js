import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3001/employees");
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Initialize filtered employees with all employees
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Filter employees based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredEmployees(employees); // If search query is empty, display all employees
      return;
    }

    const filtered = employees.filter((employee) => {
      // Filter based on username or role (you can add more criteria if needed)
      return (
        employee.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    setFilteredEmployees(filtered);
  }, [searchQuery, employees]);

  // Handle input change in the search field
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="#">
            Dashboard
          </Link>
          {/* Toggle button for smaller screens */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Navbar items */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/departments">
                  Department Management
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/assign-department">
                  Employee Management
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Employee Filter */}
      <div className="container mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by username or role"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Main content */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="my-4 text-center">Dashboard</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee, index) => (
                    <tr key={employee._id}>
                      <td>{index + 1}</td>
                      <td>{employee.username}</td>
                      <td>{employee.email}</td>
                      <td>{employee.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

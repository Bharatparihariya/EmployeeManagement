import React from "react";
import "./App.css";
import Signup from "./component/signup";
import Login from "./component/login";
import Dashboard from "./component/dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DepartmentManagement from "./component/DepartmentManagement";
import AssignDepartment from "./component/AssignDepartment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Set a default route to navigate to the signup form */}
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/departments" element={<DepartmentManagement />} />
        <Route path="/assign-department" element={<AssignDepartment />} />{" "}
        {/* Add this route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

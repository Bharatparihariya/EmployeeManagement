const mongoose = require("mongoose");

const assignedDepartmentSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // Reference to the Employee model
    required: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department", // Reference to the Department model
    required: true,
  },
});

const AssignedDepartmentModel = mongoose.model(
  "AssignedDepartment",
  assignedDepartmentSchema
);

module.exports = AssignedDepartmentModel;

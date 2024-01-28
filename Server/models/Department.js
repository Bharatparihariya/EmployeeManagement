// DepartmentModel.js
const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: String,
  manager: String,
  // Add other necessary fields
});

const DepartmentModel = mongoose.model("Department", departmentSchema);

module.exports = DepartmentModel;

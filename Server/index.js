const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

// Import models
const EmployeeModel = require("./models/Employee");
const DepartmentModel = require("./models/Department");
const AssignedDepartmentModel = require("./models/AssignedDepartment");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/employee", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// User Authentication
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Password is incorrect" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User Registration
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await EmployeeModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new EmployeeModel({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch List of Employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch List of Departments
app.get("/departments", async (req, res) => {
  try {
    const departments = await DepartmentModel.find();
    res.status(200).json(departments);
  } catch (error) {
    console.error("Error fetching department data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a New Department
app.post("/departments", async (req, res) => {
  try {
    const newDepartment = await DepartmentModel.create(req.body);
    res.status(201).json(newDepartment);
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an Existing Department
app.put("/departments/:id", async (req, res) => {
  const departmentId = req.params.id;
  const { name } = req.body;

  try {
    const updatedDepartment = await DepartmentModel.findByIdAndUpdate(
      departmentId,
      { name },
      { new: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json(updatedDepartment);
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Assign Department to Employee
// Assign Department to Employee
app.post("/assign-department/:EmployeeId", async (req, res) => {
  const employeeId = req.params.EmployeeId;
  const { departmentId } = req.body;

  try {
    const employee = await EmployeeModel.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    employee.department = departmentId;
    await employee.save();

    res.json({
      message: `Department assigned to employee ${employee.username}`,
    });
  } catch (error) {
    console.error("Error assigning department:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Assigned Departments for an Employee
app.get("/assignedDepartment/:EmployeeId", async (req, res) => {
  const employeeId = req.params.EmployeeId;

  try {
    const assignedDepartments = await AssignedDepartmentModel.find({
      employeeId,
    }).populate("departmentId", "name");

    if (!assignedDepartments || assignedDepartments.length === 0) {
      return res.status(404).json({ error: "No assigned departments found" });
    }

    res.json(assignedDepartments);
  } catch (error) {
    console.error("Error fetching assigned departments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Department
app.delete("/departments/:id", async (req, res) => {
  const departmentId = req.params.id;

  try {
    await DepartmentModel.findByIdAndDelete(departmentId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

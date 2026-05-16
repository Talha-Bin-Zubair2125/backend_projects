const cookieParser = require("cookie-parser");
const joi = require("joi");
const Employee = require("../models/Employee_Model");

// Joi schema for validating employee data
const employeeSchema = joi.object({
  employeeID: joi.string().required(),
  EmployeeName: joi.string().required(),
  EmployeeEmail: joi.string().email().required(),
  EmployeePhone: joi
    .string()
    .pattern(/^(03)[0-9]{9}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone must be a valid Pakistani number e.g. 03001234567",
    }),
  EmployeeSalary: joi.number().positive().required(),
  EmployeeJoiningDate: joi.date().required(),
  EmployeeRole: joi.string().required(),
});

// Joi schema for validating employee update data (all fields required for update as well)
const employeeUpdateSchema = joi.object({
  employeeID: joi.string().required(),
  EmployeeName: joi.string().required(),
  EmployeeEmail: joi.string().email().required(),
  EmployeePhone: joi
    .string()
    .pattern(/^(03)[0-9]{9}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone must be a valid Pakistani number e.g. 03001234567",
    }),
  EmployeeSalary: joi.number().positive().required(),
  EmployeeJoiningDate: joi.date().required(),
  EmployeeRole: joi.string().required(),
});


// Controller for Adding a new employee
const addEmployee = async (req, res) => {
  // Validate the request body against the Joi schema
  const { error } = employeeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const {
    employeeID,
    EmployeeName,
    EmployeeEmail,
    EmployeePhone,
    EmployeeSalary,
    EmployeeJoiningDate,
    EmployeeRole,
  } = req.body;

  try {
    const newEmployee = new Employee({
      employeeID,
      EmployeeName,
      EmployeeEmail,
      EmployeePhone,
      EmployeeSalary,
      EmployeeJoiningDate,
      EmployeeRole,
    });
    await newEmployee.save();
    res
      .status(201)
      .json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ message: "Server error while adding employee" });
  }
};

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server error while fetching employees" });
  }
};

// Get employee by ID (for pre-filling edit form)
const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ employee });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Server error while fetching employee" });
  }
};  

// Update employee details via id
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  
  const { error } = employeeUpdateSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Server error while updating employee" });
  }
};

// Delete employee via id
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Server error while deleting employee" });
  }
};


module.exports = { addEmployee, getAllEmployees, getEmployeeById,updateEmployee, deleteEmployee };

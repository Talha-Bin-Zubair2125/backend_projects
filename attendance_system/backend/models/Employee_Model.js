const moongoose = require("mongoose");

// Creating a schema for employee authentication
const employeeSchema = new moongoose.Schema({
  employeeID: {
    type: String,
    required: true,
    unique: true,
  },
  EmployeeName: {
    type: String,
    required: true,
  },
  EmployeeEmail: {
    type: String,
    required: true,
  },
  EmployeePhone: {
    type: String,
    required: true,
  },
  EmployeeSalary: {
    type: Number,
    required: true,
  },
  EmployeeJoiningDate: {
    type: Date,
    required: true,
  },
  EmployeeRole: {
    type: String,
    required: true,
  },
});

// Creating a model for employee authentication
const Employee = moongoose.model("Employee", employeeSchema);
module.exports = Employee;


const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { addEmployee, getAllEmployees,getEmployeeById, updateEmployee, deleteEmployee } = require("../controllers/employeeController");

router.post("/employees/addemployee", protect, addEmployee);
router.get("/employees/getallemployees", protect, getAllEmployees);
router.get("/employees/getemployee/:id", protect, getEmployeeById);
router.put("/employees/updateemployee/:id", protect, updateEmployee);
router.delete("/employees/deleteemployee/:id", protect, deleteEmployee);

module.exports = router;


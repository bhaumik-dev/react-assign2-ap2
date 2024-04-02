const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  dateOfJoining: String,
  title: String,
  department: String,
  employeeType: String,
  currentStatus: { type: Boolean, default: true },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;

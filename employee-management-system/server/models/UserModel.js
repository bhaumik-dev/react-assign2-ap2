const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  dateOfJoining: { type: Date, required: true },
  title: {
    type: String,
    enum: ["Employee", "Manager", "Director", "VP"],
    required: true,
  },
  department: {
    type: String,
    enum: ["IT", "Marketing", "HR", "Engineering"],
    required: true,
  },
  employeeType: {
    type: String,
    enum: ["FullTime", "PartTime", "Contract", "Seasonal"],
    required: true,
  },
  currentStatus: { type: Boolean, default: true },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;

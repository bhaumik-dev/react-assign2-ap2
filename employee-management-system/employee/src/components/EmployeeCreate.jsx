import React, { useState } from "react";

const EmployeeCreate = ({ updateEmployeeData }) => {
  // State to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    dateOfJoining: "",
    title: "",
    department: "",
    employeeType: "",
  });

  // Handling form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending post request
      const response = await fetch("http://localhost:4000/createEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const newEmployee = await response.json();
        updateEmployeeData(newEmployee);
        // Clearing form data
        setFormData({
          firstName: "",
          lastName: "",
          age: "",
          dateOfJoining: "",
          title: "",
          department: "",
          employeeType: "",
        });
      } else {
        console.error("Failed to create employee");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="form-group">
            <label className="label" htmlFor="firstName">
              First Name:
            </label>
            <input
              className="input"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="lastName">
              Last Name:
            </label>
            <input
              className="input"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="age">
              Age:
            </label>
            <input
              className="input"
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min={20}
              max={70}
              required
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="dateOfJoining">
              Date of Joining:
            </label>
            <input
              className="input"
              type="date"
              id="dateOfJoining"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="title">
              Title:
            </label>
            <select
              className="input"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            >
              <option value="">Select Title</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label" htmlFor="department">
              Department:
            </label>
            <select
              className="input"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label" htmlFor="employeeType">
              Employee Type:
            </label>
            <select
              className="input"
              id="employeeType"
              name="employeeType"
              value={formData.employeeType}
              onChange={handleChange}
              required
            >
              <option value="">Select Employee Type</option>
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>

          <div className="form-group">
            <button className="button" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeCreate;

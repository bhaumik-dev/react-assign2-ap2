const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const cors = require("cors");
const Employee = require("./models/Employee");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connecting to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://webdevbhaumik:webdevbhaumik@cluster0.tawpaxl.mongodb.net/employee-management-system",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB Connected");
    startApolloServer();
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.start().then(() => {
    console.log("Apollo Server started");
    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(
        `Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
  });
}

// Route to handle createEmployee POST request
app.post("/createEmployee", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      dateOfJoining,
      title,
      department,
      employeeType,
    } = req.body;

    // Checking if any required field is missing
    if (
      !firstName ||
      !lastName ||
      !age ||
      !dateOfJoining ||
      !title ||
      !department ||
      !employeeType
    ) {
      return res.status(400).json({ error: "Oops! Missing required fields." });
    }

    // Creating a new employee instance
    const employee = new Employee({
      firstName,
      lastName,
      age,
      dateOfJoining,
      title,
      department,
      employeeType,
    });

    // Saving the employee to the database
    await employee.save();

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Sorry, Failed to create employee." });
  }
});

// Route to fetch employee table
app.get("/employeeTable", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employee table:", error);
    res.status(500).json({ error: "Oops! Failed to fetch employee table" });
  }
});

// I'll add routes for update, search, delete also in Assignment 2 if mentioned in assignment

module.exports = app;

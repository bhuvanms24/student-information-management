const express = require("express");
const path = require("path");

const {
  addStudent,
  getStudents,
  searchStudent,
  updateStudent,
  deleteStudent
} = require("./studentManager");

const app = express();
console.log("SERVER FILE LOADED");

const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Serve frontend files
app.use(express.static(
  path.join(__dirname, "../public")
));

// Display all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await getStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Add student
app.post("/api/students", async (req, res) => {
  try {
    const student = await addStudent(req.body);

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Search student
app.get("/api/students/search", async (req, res) => {
  try {
    const name = req.query.name || "";

    const students = await searchStudent(name);

    res.json(students);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Update student
app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await updateStudent(
      req.params.id,
      req.body
    );

    res.json(student);
  } catch (error) {
    res.status(404).json({
      error: error.message
    });
  }
});

// Delete student
app.delete("/api/students/:id", async (req, res) => {
  try {
    await deleteStudent(req.params.id);

    res.json({
      message: "Student deleted successfully"
    });
  } catch (error) {
    res.status(404).json({
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(
    `Student Management Server running at http://localhost:${PORT}`
  );
});

setInterval(() => {
  console.log("SERVER IS STILL RUNNING");
}, 5000);
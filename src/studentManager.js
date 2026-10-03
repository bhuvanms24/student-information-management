const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/students.json");

// Read students
async function readStudents() {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
}

// Save students
async function saveStudents(students) {
  await fs.writeFile(
    filePath,
    JSON.stringify(students, null, 2)
  );
}

// Add student
async function addStudent(student) {
  const students = await readStudents();

  const newStudent = {
    id: students.length > 0
      ? students[students.length - 1].id + 1
      : 1,
    ...student
  };

  students.push(newStudent);

  await saveStudents(students);

  return newStudent;
}

// Get all students
async function getStudents() {
  return await readStudents();
}

// Search student
async function searchStudent(name) {
  const students = await readStudents();

  return students.filter((student) =>
    student.name.toLowerCase().includes(name.toLowerCase())
  );
}

// Update student
async function updateStudent(id, updatedData) {
  const students = await readStudents();

  const index = students.findIndex(
    (student) => student.id === Number(id)
  );

  if (index === -1) {
    throw new Error("Student not found");
  }

  students[index] = {
    ...students[index],
    ...updatedData
  };

  await saveStudents(students);

  return students[index];
}

// Delete student
async function deleteStudent(id) {
  const students = await readStudents();

  const filteredStudents = students.filter(
    (student) => student.id !== Number(id)
  );

  if (filteredStudents.length === students.length) {
    throw new Error("Student not found");
  }

  await saveStudents(filteredStudents);

  return true;
}

module.exports = {
  addStudent,
  getStudents,
  searchStudent,
  updateStudent,
  deleteStudent
};
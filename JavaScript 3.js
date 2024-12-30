const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let tasks = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const task = req.body;
  tasks.push({ id: Date.now(), ...task });
  res.status(201).json({ message: "Task added successfully!" });
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id, 10));
  res.json({ message: "Task deleted successfully!" });
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});

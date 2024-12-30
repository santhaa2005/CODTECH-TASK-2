import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((res) => setTasks(res.data));
  }, []);

  const addTask = () => {
    if (task.trim()) {
      axios
        .post("http://localhost:5000/tasks", { name: task, completed: false })
        .then(() => {
          setTasks([...tasks, { id: Date.now(), name: task, completed: false }]);
          setTask("");
        });
    }
  };

  const deleteTask = (id) => {
    axios.delete(http://localhost:5000/tasks/${id}).then(() => {
      setTasks(tasks.filter((t) => t.id !== id));
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task Manager</h2>
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <span>{t.name}</span>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;

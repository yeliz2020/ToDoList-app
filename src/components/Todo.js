import React, { useState, useEffect } from "react";
import "./Todo.css";

function CreateTask({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    addTask(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add a new task"
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function Task({ task, index, completeTask, removeTask }) {
  return (
    <div
      className="task"
      style={{ textDecoration: task.completed ? "line-through" : "" }}
    >
      {task.title}

      <button onClick={() => removeTask(index)}>X</button>
      <button onClick={() => completeTask(index)}>✓</button>
    </div>
  );
}

function Todo() {
  const [tasksRemaining, setTasksRemaining] = useState(0);

  const [tasks, setTasks] = useState([
    { title: "Learn Javascript", completed: true },
    { title: "Learn React", completed: true },
    { title: "Take a coding test", completed: false },
  ]);

  useEffect(() => {
    setTasksRemaining(tasks.filter((task) => !task.completed).length);
  }, [tasks]);

  const addTask = (title) => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="todo-container">
      <div className="header">todos</div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task
            task={task}
            index={index}
            completeTask={completeTask}
            removeTask={removeTask}
            key={index}
          />
        ))}
      </div>
      <div className="create-task">
        <CreateTask addTask={addTask} />
      </div>
      <footer className="footer">
        <span>Pending tasks: {tasksRemaining}</span>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </footer>
    </div>
  );
}

export default Todo;

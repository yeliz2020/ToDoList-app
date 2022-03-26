import React, { useState, useEffect } from "react";
import "./Todo.css";
import CreateTask from "../CreateTask/CreateTask";
import Task from "../Task/Task";
import FilterButton from "../FilterButton/FilterButton";

function Todo() {
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [filter, setFilter] = useState("All");

  const [tasks, setTasks] = useState([
    { title: "Learn Javascript", completed: true },
    { title: "Learn React", completed: true },
    { title: "Learn SQL", completed: false },
  ]);

  useEffect(() => {
    setTasksRemaining(tasks.filter((task) => !task.completed).length);
  }, [tasks]);
  useEffect(() => {
    setTasksCompleted(tasks.filter((task) => task.completed).length);
  }, [tasks]);

  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const addTask = (title) => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];

    if (newTasks[index].completed) newTasks[index].completed = false;
    else newTasks[index].completed = true;

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
      <div className="filter-button">
        {FILTER_NAMES.map((name) => (
          <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
          />
        ))}
      </div>

      <div className="counter">
        <span>All: {tasks.length}</span>
        {" --- "}
        <span>Active: {tasksRemaining}</span>
        {" --- "}
        <span>Completed: {tasksCompleted}</span>
      </div>

      <div className="tasks">
        {tasks.filter(FILTER_MAP[filter]).map((task, index) => (
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
    </div>
  );
}

export default Todo;

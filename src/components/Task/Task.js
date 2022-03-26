import React from "react";

function Task({ task, index, completeTask, removeTask }) {
  return (
    <div
      className="task"
      style={{ textDecoration: task.completed ? "line-through" : "" }}
    >
      {task.title}

      <button className="btn btn-danger" onClick={() => removeTask(index)}>
        X
      </button>
      <button className="btn btn-primary" onClick={() => completeTask(index)}>
        ✓
      </button>
    </div>
  );
}

export default Task;

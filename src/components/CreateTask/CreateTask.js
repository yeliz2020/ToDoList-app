import { useState } from "react";

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
        style={{ textAlign: "middle" }}
        type="text"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
        value={value}
        placeholder="Add a new task"
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
export default CreateTask;

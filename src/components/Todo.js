import React, { useState, useEffect } from "react";

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      if (localStorage.getItem("localTasks") !== "undefined") {
        const storedList = JSON.parse(localStorage.getItem("localTasks"));
        setTasks(storedList);
      } else {
        setTasks([]);
      }
    }
  }, []);

  const addTask = (e) => {
    if (task) {
      const newTask = { id: new Date().getTime().toString(), title: task };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      setTask("");
    }
  };

  const deleteTask = (task) => {
    const deleted = tasks.filter((eachTask) => eachTask.id !== task.id);
    setTasks(deleted);
    localStorage.removeItem("localTasks");
  };

  const handleClear = () => {
    setTasks([]);
    localStorage.setItem("localTasks", JSON.stringify());
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  return (
    <div className="container row justify-content-center">
      <h1 className="mt-3 mb-3 text-white text-center header-text">
        To-Do App
      </h1>
      <div className="col-6">
        <input
          name="task"
          type="text"
          value={task}
          placeholder="Add your task..."
          className="form-control"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="col-1">
        <button
          className="btn btn-color form-control material-icons"
          onClick={addTask}
        >
          add
        </button>
      </div>
      <div className="badge mt-4 mb-4 total-task">
        You have
        {tasks.length === 0
          ? " no tasks"
          : tasks.length === 1
          ? " 1 task"
          : ` ${tasks.length} tasks`}
      </div>

      {tasks.map((task) => (
        <React.Fragment key={task.id}>
          <div className="row justify-content-center">
            <div className="col-6">
              <span className="form-control bg-white btn mt-2 task-item">
                {task.title}
              </span>
            </div>
            <div className="col-1 mt-1">
              <button
                className="mt-2 delete-btn material-icons"
                onClick={() => deleteTask(task)}
              >
                delete
              </button>
            </div>
          </div>
        </React.Fragment>
      ))}
      {tasks.length > 0 ? (
        <div className="text-center">
          <button
            className="btn clear-btn mt-4 mb-4 text-uppercase text-bold"
            onClick={() => {
              handleClear();
            }}
          >
            Clear
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Todo;

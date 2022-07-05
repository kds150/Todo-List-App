// Librairies
import React, { useState, useEffect } from "react";
import "./App.css";

// Composents
import Task from "../../Components/Task/Task";

function App() {
  const getLocalItmes = () => {
    let todo = localStorage.getItem("todos");
    // console.log(todo);

    if (todo) {
      return JSON.parse(localStorage.getItem("todos"));
    } else {
      return [];
    }
  };

  // State
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState(getLocalItmes());
  const [darkMode, setDarkMode] = useState(false);
  const [status, setStatus] = useState("all");
  
  // UseEffect
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  // Methodes
  const changeInputHandler = (e) => {
    setInput(e.target.value);
  };

  const submittedHandler = (e) => {
    e.preventDefault();

    const newTask = {
      id: new Date().getTime().toString(),
      content: input,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const doneClickedHandler = (id) => {
    const newTask = tasks.map((task) => {
      if (task.id === id) {
        const update = task.done
        return { ...task, done: !update }
      }
      return task
    })

    setTasks(newTask)
  };

  const removeClickedHandler = (id) => {
    setTasks((prev) => [...prev.filter((task) => task.id !== id)])
  };

  // Methodes Partie filtrage

  const clearAllCompletedHandler = () => {
    const newTask = [...tasks];
    const resultat = newTask.filter(checkTask);
    function checkTask(task) {
      return task.done === false;
    }
    setTasks(resultat);
  };

  const resultat = tasks.filter(checkTask);
  // console.log(resultat);

  function checkTask(task) {
    return task.done === false;
  }

  console.log(status)

  const showAllHandler = () => {
    setStatus("all");
  };

  const showActiveHandler = () => {
    setStatus("active");
  };

  const showCompletedHandler = () => {
    setStatus("completed")
  };
  

  // Methodes dark mode
  const changeModeHandler = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };

  const filteredTasks = () => {
    if (status === 'all') {
      return tasks
    } else if (status === 'active') {
      return tasks.filter((task) => !task.done)
    } else if (status === 'completed') {
      return tasks.filter((task) => task.done)
    }
  }
  

  // Variables
  const taskDisplayed = filteredTasks().map((task, index) => {
        return (
          <Task
            key={index}
            content={task.content}
            done={task.done}
            doneClicked={() => doneClickedHandler(task.id)}
            removeClicked={() => removeClickedHandler(task.id)}
          />
        );
      })

  const themeInput = darkMode ? "text-white" : "text-dark";

  const inputColor = darkMode ? "hsl(235, 24%, 19%)" : "white";

  const modeDisplayed = darkMode ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
      <path
        fill="#FFF"
        fill-rule="evenodd"
        d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
      />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
      <path
        fill="#FFF"
        fill-rule="evenodd"
        d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
      />
    </svg>
  );

  // JSX
  return (
    <div className="App">
      <div className="header"></div>
      <div className="contenu"></div>
      <div className="todo">
        <div className="entete">
          <div>
            <h3>TODO</h3>
          </div>
          <div className="dark-mode" onClick={changeModeHandler}>
            {modeDisplayed}
          </div>
        </div>

        <div className="form">
          <form onSubmit={(e) => submittedHandler(e)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="22"
              fill="currentColor"
              class="bi bi-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            </svg>
            <input
              type="text"
              className={`form-control ${themeInput}`}
              value={input}
              placeholder="Create a new todo"
              onChange={(e) => changeInputHandler(e)}
              style={{ background: `${inputColor}` }}
            />
          </form>
        </div>

        {taskDisplayed}

        <div className="task">
          <div>
            {" "}
            <strong>{resultat.length}</strong> tasks left
          </div>
          <div className="task-element-2">
            <button onClick={showAllHandler}>All</button>
            <button onClick={showActiveHandler}>Active</button>
            <button onClick={showCompletedHandler}>Completed</button>
          </div>
          <div onClick={clearAllCompletedHandler}>
            <button>Clear Completed</button>
          </div>
        </div>
        <div className="task-element-3">
          <button onClick={showAllHandler}>All</button>
          <button onClick={showActiveHandler}>Active</button>
          <button onClick={showCompletedHandler}>Completed</button>
        </div>
        <div className="info">
          <p>Drog and drop to reorder list</p>
        </div>
      </div>

      <div class="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/kds150">Your Name Here</a>.
      </div>
    </div>
  );
}

export default App;

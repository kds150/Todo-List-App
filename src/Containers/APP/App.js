// Librairies
import React,{useState, useEffect} from 'react';
import './App.css';

// Composents
import Task from '../../Components/Task/Task';

function App () {

  const getLocalItmes = () => {
    let todo = localStorage.getItem('todos');
    // console.log(todo);

    if (todo) {
        return JSON.parse(localStorage.getItem('todos'));
    } else {
        return [];
    }
  }


  // State 
  const [input, setInput] = useState('')
  const [tasks,setTasks] = useState(getLocalItmes())
  const [filtTasks,setFiltTasks] = useState(tasks)
  const [darkMode, setDarkMode] = useState (false)
  const [status, setStatus] = useState(true)

  // console.log(tasks);
  // console.log(filtTasks);
  // UseEffect
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks))
 }, [tasks]);


  // Methodes
  const changeInputHandler = (e) => {
    setInput(e.target.value);
  }

  const submittedHandler = (e) => {
    e.preventDefault();

    const newTask = {
      content: input,
      done: false
    }
    setTasks([...tasks, newTask]);
    setInput('');
  }

  const doneClickedHandler = index => {
    const newTask = [...tasks]
    newTask[index].done = !tasks[index].done
    setTasks(newTask)
  }

  const removeClickedHandler = index => {
    const newTask = [...tasks]
    newTask.splice(index, 1)
    setTasks(newTask)
  }

  // Methodes Partie filtrage

  const clearAllCompletedHandler = () => {

    const newTask = [...tasks]
    const resultat = newTask.filter(checkTask);
    function checkTask (task) {
      return task.done === false
    }
    setTasks(resultat)
  }

  const resultat = tasks.filter(checkTask)
    // console.log(resultat);

    function checkTask (task) {
      return task.done === false
    }
  const showActiveHandler = () => {
    setFiltTasks(resultat)
    setStatus(false)
    
  }



  const showCompletedHandler = () => {
    const newTask = [...tasks]
    const resultat = newTask.filter(checkTask)

    function checkTask (task) {
      return task.done === true
    }
    setFiltTasks(resultat)
    setStatus(false)
  }
  const showAllHandler =() => {
    setFiltTasks(tasks)
    setStatus(true)
  }

  

  // Methodes dark mode
  const changeModeHandler = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
    document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  }

  // Variables
  const taskDisplayed = status ? tasks.map( (task,index) => {
    return (
      <Task 
    key={index}
    content={task.content} 
    done={task.done}
    doneClicked={() => doneClickedHandler(index)}
    removeClicked = {() => removeClickedHandler(index)}
    />
    )
  } )

  :

  filtTasks.map( (task,index) => {
    return (
      <Task 
    key={index}
    content={task.content} 
    done={task.done}
    />
    )
  } )

  const themeInput = darkMode ?
  'text-white'
  :
  'text-dark';

  const inputColor = darkMode ? 
  'hsl(235, 24%, 19%)'
  :
  'white'

  const modeDisplayed = darkMode ? 
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
  <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
  </svg>
  
  : 
  
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16">
  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
</svg>

  // JSX 
  return (
    <div className="App">
        <div className="header"></div>
        <div className="contenu">
          
        </div>
        <div className='todo'>
          <div className='entete'>
            <div><h3>TODO</h3></div>
            <div className='dark-mode' onClick={changeModeHandler}>
              {modeDisplayed}
              
            </div>
          </div>

          <div className='form' >
            <form onSubmit={(e) => submittedHandler(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            </svg>
              <input type="text" className={`form-control ${themeInput}`} value={input} placeholder='Create a new todo' onChange={(e) => changeInputHandler(e)} style={{background: `${inputColor}`}}/>
            </form>
          </div>

          {taskDisplayed}
          
          <div className='task'>
            <div> <strong>{resultat.length}</strong> items left</div>
            <div className="task-element-2">
              <button  onClick={showAllHandler}>All</button>
              <button onClick={showActiveHandler}>Active</button>
              <button onClick={showCompletedHandler}>Completed</button>
            </div>
            <div onClick={clearAllCompletedHandler}><button>Clear Completed</button></div>
          </div>
          <div className="task-element-3">
              <button onClick={showAllHandler}>All</button>
              <button onClick={showActiveHandler}>Active</button>
              <button onClick={showCompletedHandler}>Completed</button>
          </div>
          <div className='info'>
            <p>Drog and drop to reorder list</p>
          </div>
        </div>
      

        <div class="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
          Coded by <a href="https://github.com/kds150">Your Name Here</a>.
        </div>
    </div>
  )
}

export default App;

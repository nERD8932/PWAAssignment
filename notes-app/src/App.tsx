import { useEffect, useRef, useState } from 'react'
import Logo from '/icons/favicon.svg'
import './App.css'

function App() {

  const [tasks, setTasks] = useState<Record<string, string>>({})

  const taskRef = useRef<HTMLInputElement>(null);

  const handelDelete = (key:string) =>{
    localStorage.removeItem(key)
    let copytasks = {...tasks}
    delete copytasks[key]
    setTasks(copytasks)
  }

  const readTasks = () => {
    var i=0;
    while(localStorage.key(i) != null)
    {
      let key:string = localStorage.key(i)?? ""
      let txt = localStorage.getItem(key??"")
      setTasks(prev => ({
        ...prev,
        [key]: txt ?? "" // Replace null with an empty string
    }));
      i++;
    }
  }

  useEffect(() => {
    readTasks()
  }, [])

  const Normalizer = () => {
    var key:string
    var txt
    var list = []

    for(key in tasks)
    {
      txt = tasks[key]
      list.push(<li className="listelement" key={key}>{txt}<button className='danger' onClick={() => {handelDelete(key)}}>Delete</button></li>)
    }
    console.log(list)
    return list;
  }

  const handleSubmit = () => {
    if(taskRef.current?.value !== "" && taskRef.current?.value !== null && taskRef.current?.value !== undefined)
    {
      let key = taskRef.current.value
      let txt = taskRef.current.value
      while(localStorage.getItem(key)!=null)
      {
        key += "_"
      }
      localStorage.setItem(key, txt)
      setTasks({...tasks, [key]:txt})
    }
  }

  return (
    <>
      <div className='one'>
        <a href="https://github.com/nERD8932/PWAAssignment" target="_blank">
          <img src={Logo} className="logo" alt="Notes Logo" />
        </a>
        <h1>Notes App</h1>
        <div className="card">
          <form  id="todoform" className="todoform" onSubmit={e => { e.preventDefault(); handleSubmit();}}>
            <input id="forminput" className="forminput" name="todo" type="text" placeholder='Enter a new Note or Task' ref={taskRef}/>
          </form>
          <button className="submitbutton" type="button" form="todoform" onClick={handleSubmit}>
              Add Todo
          </button>
        </div>
      </div>
      <div className='two'>
        <div className='card scrollable'>
          <ul id="todos" className="list">
            { Normalizer() }
          </ul>
        </div>
      </div>
    </>
  )
}

export default App

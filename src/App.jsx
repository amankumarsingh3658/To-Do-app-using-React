import { useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from 'react'

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])


  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  function handleEdit(e, id) {
    let todo = todos.filter(item => {
      return item.id == id
    })
    settodo(todo[0].todo)
    let newTodos = todos.filter(item => {
      return item.id != id
    })
    settodos(newTodos)
    saveToLocalStorage()
  }


  function handleDelete(e, id) {
    let newTodos = todos.filter(item => {
      return item.id != id
    })
    settodos(newTodos)
    saveToLocalStorage()
  }

  function handleAdd() {
    if (todo != "") {
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      settodo("")
      saveToLocalStorage()
    }
  }

  function handleChange(e) {
    settodo(e.target.value)
  }

  function handleCompleted(e) {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id == id
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveToLocalStorage()
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="container bg-purple-200 mx-auto my-5 roundedxl p-5 min-h-[80vh]">
          <div className="addTodo">
            <h2 className='text-lg font-bold'>Add a Todo</h2>
            <input type="text" name='todo' onChange={handleChange} value={todo} className='bg-white w-1/2' />
            <button onClick={handleAdd} className='bg-violet-600 hover:bg-violet-800 text-white rounded-md px-4 py-1 mx-10 font-bold'>Save</button>
          </div>
          <h1 className='font-bold text-2xl'>Your Todos</h1>
          <div className="todos">
            {todos.length === 0 && <div className='m-5'>No Todos to Display</div>}
            {todos.map(item => {
              return <div key={item.id} className="todo flex justify-between w-1/2 py-1">
                <div className='flex gap-6 items-center'>
                  <input type="checkbox" name={item.id} onChange={handleCompleted} checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-600 hover:bg-violet-800 text-white rounded-md px-4 py-1 mx-2 font-bold'>Edit</button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} name={item.id} className='bg-violet-600 hover:bg-violet-800 text-white rounded-md px-4 py-1 mx-2 font-bold'>Delete</button>
                </div>
              </div>
            })}
          </div>
        </div>
      </main>
    </>
  )
}

export default App

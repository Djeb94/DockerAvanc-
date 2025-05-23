import { useState, useEffect } from 'react'
import './App.css'

const API_URL = '/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  // Charger les tâches depuis l'API au chargement
  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(() => setTasks([]))
  }, [])

  const addTask = async () => {
    if (newTask.trim()) {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask.trim() })
      })
      if (res.ok) {
        const created = await res.json()
        setTasks([...tasks, created])
        setNewTask('')
      }
    }
  }

  const removeTask = async (id) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setTasks(tasks.filter(task => task._id !== id))
    }
  }

  return (
    <>
      <h1>To-Do List</h1>
      <div className="card">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {task.title} <button onClick={() => removeTask(task._id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
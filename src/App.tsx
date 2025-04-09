import { useState } from 'react'
import { Input } from './components/Input/Input'
import { nanoid } from 'nanoid'
import { Tasks } from './components/Tasks/Tasks'
import s from './App.module.css'

export interface ITask {
  id: string,
  text: string,
  isEdit: boolean,
  isChecked: boolean,
}

let storedArr = localStorage.getItem('arr');
let initialTasks: ITask[] = storedArr ? JSON.parse(storedArr) : [];

export function App() {
  let [list, setList] = useState<string>('')
  let [arr, setArr] = useState<ITask[]>(initialTasks)
  let [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  let filteredTasks = arr.filter(task => {
    if (filter === 'active') return !task.isChecked
    if (filter === 'completed') return task.isChecked
    return true
  })

  let remainingTasks = arr.filter(task => !task.isChecked).length

  function handleAdd(list: string) {
    if (list.trim()) {
      let newTask: ITask = {
        id: nanoid(),
        text: list,
        isEdit: false,
        isChecked: false,
      }
      let updatedTasks = [...arr, newTask]
      setArr(updatedTasks)
      setList('')
      localStorage.setItem('arr', JSON.stringify(updatedTasks))
    }
  }

  function handleDelete(id: string) {
    let updatedTasks = arr.filter(el => el.id !== id)
    setArr(updatedTasks)
    localStorage.setItem('arr', JSON.stringify(updatedTasks))
  }

  function handleToggle(id: string) {
    let updatedTasks = arr.map(el => {
      if (el.id === id) el.isEdit = !el.isEdit
      return el
    })
    setArr(updatedTasks)
    localStorage.setItem('arr', JSON.stringify(updatedTasks))
  }

  function handleCheckBox(id: string) {
    let updatedTasks = arr.map(el => {
      if (el.id === id) el.isChecked = !el.isChecked
      return el
    })
    setArr(updatedTasks)
    localStorage.setItem('arr', JSON.stringify(updatedTasks))
  }

  function handleEdit(id: string, e: React.ChangeEvent<HTMLInputElement>) {
    let updatedTasks = arr.map(el => {
      if (el.id === id) el.text = e.target.value
      return el
    })
    setArr(updatedTasks)
    localStorage.setItem('arr', JSON.stringify(updatedTasks))
  }

  function handleClearCompleted() {
    let updatedTasks = arr.filter(task => !task.isChecked)
    setArr(updatedTasks)
    localStorage.setItem('arr', JSON.stringify(updatedTasks))
  }

  return (
    <main className={s.container}>
      <h1>TODO LIST</h1>
      <Input list={list} handleAdd={handleAdd} setList={setList} />

      <div className={s.filters}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <Tasks
        arr={filteredTasks}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleToggle={handleToggle}
        handleCheckBox={handleCheckBox}
      />

      <div className={s.footer}>
        <span>Left: {remainingTasks}</span>
        <button onClick={handleClearCompleted}>Clear completed tasks</button>
      </div>
    </main>
  )
}
import { createContext, useReducer, useContext } from 'react'
import type { ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { Task, Category } from '../types/types'

interface State {
  categories: Category[];
  tasks: Task[];
}

interface TaskContextType extends State {
  addCategory: (name: string) => void;
  addTask: (categoryId: string, text: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  removeCategory: (id: string) => void;
}

const initialState: State = {
  categories: [],
  tasks: []
}

const TaskContext = createContext<TaskContextType | null>(null)

type Action =
  | { type: 'ADD_CATEGORY'; payload: { name: string } }
  | { type: 'ADD_TASK'; payload: { categoryId: string; text: string } }
  | { type: 'TOGGLE_TASK'; payload: { id: string } }
  | { type: 'REMOVE_TASK'; payload: { id: string } }
  | { type: 'REMOVE_CATEGORY'; payload: { id: string } }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_CATEGORY': {
      const exists = state.categories.some(
        c => c.name.toLowerCase() === action.payload.name.toLowerCase()
      )
      if (exists) return state
      const newCat: Category = { id: uuidv4(), name: action.payload.name }
      return { ...state, categories: [...state.categories, newCat] }
    }

    case 'ADD_TASK': {
      const newTask: Task = {
        id: uuidv4(),
        categoryId: action.payload.categoryId,
        text: action.payload.text,
        done: false
      }
      return { ...state, tasks: [...state.tasks, newTask] }
    }

    case 'TOGGLE_TASK': {
      const tasks = state.tasks.map(t =>
        t.id === action.payload.id ? { ...t, done: !t.done } : t
      )
      return { ...state, tasks }
    }

    case 'REMOVE_TASK': {
      const tasks = state.tasks.filter(t => t.id !== action.payload.id)
      return { ...state, tasks }
    }

    case 'REMOVE_CATEGORY': {
      const categories = state.categories.filter(c => c.id !== action.payload.id)
      const tasks = state.tasks.filter(t => t.categoryId !== action.payload.id)
      return { ...state, categories, tasks }
    }

    default:
      return state
  }
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addCategory = (name: string) => dispatch({ type: 'ADD_CATEGORY', payload: { name } })
  const addTask = (categoryId: string, text: string) => dispatch({ type: 'ADD_TASK', payload: { categoryId, text } })
  const toggleTask = (id: string) => dispatch({ type: 'TOGGLE_TASK', payload: { id } })
  const removeTask = (id: string) => dispatch({ type: 'REMOVE_TASK', payload: { id } })
  const removeCategory = (id: string) => dispatch({ type: 'REMOVE_CATEGORY', payload: { id } })

  return (
    <TaskContext.Provider value={{
      categories: state.categories,
      tasks: state.tasks,
      addCategory,
      addTask,
      toggleTask,
      removeTask,
      removeCategory
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTask must be used within TaskProvider')
  return ctx
}

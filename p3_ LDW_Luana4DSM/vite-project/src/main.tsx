import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { TaskProvider } from './context/TaskContext'
import './index.css'


createRoot(document.getElementById('root') as HTMLElement).render(
<React.StrictMode>
<TaskProvider>
<App />
</TaskProvider>
</React.StrictMode>
)
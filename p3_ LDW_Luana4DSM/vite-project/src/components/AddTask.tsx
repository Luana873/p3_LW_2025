import { useState, useEffect } from 'react'
import { useTask } from '../context/TaskContext'


export default function AddTask() {
const { categories, addTask } = useTask()
const [text, setText] = useState('')
const [categoryId, setCategoryId] = useState('')


useEffect(() => {
if (categories.length && !categoryId) setCategoryId(categories[0].id)
if (categories.length === 0) setCategoryId('')
}, [categories])


const handleSubmit = (e: React.FormEvent) => {
e.preventDefault()
const trimmed = text.trim()
if (!trimmed || !categoryId) return
addTask(categoryId, trimmed)
setText('')
}


return (
<form className="card" onSubmit={handleSubmit}>
<h2>Adicionar Tarefa</h2>


<select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
<option value="" disabled>Selecione a categoria</option>
{categories.map(c => (
<option key={c.id} value={c.id}>{c.name}</option>
))}
</select>


<input
placeholder="Descrição da tarefa"
value={text}
onChange={(e) => setText(e.target.value)}
/>


<button type="submit" disabled={!categories.length}>Adicionar</button>
</form>
)
}
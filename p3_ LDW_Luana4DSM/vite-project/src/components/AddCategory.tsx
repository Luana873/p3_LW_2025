import { useState } from 'react'
import { useTask } from '../context/TaskContext'


export default function AddCategory() {
const [name, setName] = useState('')
const { addCategory } = useTask()


const handleSubmit = (e: React.FormEvent) => {
e.preventDefault()
const trimmed = name.trim()
if (!trimmed) return
addCategory(trimmed)
setName('')
}


return (
<form className="card" onSubmit={handleSubmit}>
<h2>Criar Categoria</h2>
<input
placeholder="Nome da categoria"
value={name}
onChange={(e) => setName(e.target.value)}
/>
<button type="submit">Adicionar</button>
</form>
)
}
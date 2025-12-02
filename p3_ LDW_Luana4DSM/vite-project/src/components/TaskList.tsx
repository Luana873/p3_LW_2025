import { useTask } from '../context/TaskContext'

interface Props {
categoryId: string;
}


export default function TaskList({ categoryId }: Props) {
const { tasks, toggleTask, removeTask } = useTask()
const filtered = tasks.filter(t => t.categoryId === categoryId)


if (filtered.length === 0) return <p className="empty">Sem tarefas nesta categoria.</p>


return (
<ul className="task-list">
{filtered.map(t => (
<li key={t.id} className={t.done ? 'task done' : 'task'}>
<label>
<input type="checkbox" checked={t.done} onChange={() => toggleTask(t.id)} />
<span className="task-text">{t.text}</span>
</label>
<button className="danger small" onClick={() => removeTask(t.id)}>Remover</button>
</li>
))}
</ul>
)
}
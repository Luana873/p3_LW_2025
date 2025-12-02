import { useTask } from '../context/TaskContext'


export default function CategoryList() {
const { categories, removeCategory } = useTask()


if (categories.length === 0) return <p className="empty">Nenhuma categoria ainda.</p>


return (
<div className="card">
<h3>Categorias</h3>
<ul className="list">
{categories.map(c => (
<li key={c.id} className="category-item">
<span>{c.name}</span>
<button className="danger" onClick={() => removeCategory(c.id)}>Excluir</button>
</li>
))}
</ul>
</div>
)
}
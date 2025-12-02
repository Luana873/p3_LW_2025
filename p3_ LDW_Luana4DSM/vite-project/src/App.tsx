import AddCategory from './components/AddCategory'
import AddTask from './components/AddTask'
import CategoryList from './components/CategoryList'
import TaskList from './components/TaskList'
import { useTask } from './context/TaskContext'


export default function App() {
const { categories } = useTask()


return ( 
<div className="container">
<header>
<h1>Gerenciador de Tarefas por Categoria</h1>
</header>


<main>
<section className="left">
<AddCategory />
<CategoryList />
</section>


<section className="right">
<AddTask />


<div className="tasks-by-category">
{categories.length === 0 ? (
<p className="empty">Nenhuma categoria criada ainda.</p>
) : (
categories.map((cat) => (
<div key={cat.id} className="category-block">
<h2>{cat.name}</h2>
<TaskList categoryId={cat.id} />
</div>
))
)}
</div>
</section>
</main>


<footer>
<p>Prova 3 — React Context </p>
</footer>
</div>
)
}
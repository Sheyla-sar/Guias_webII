import { useAuthStore } from '../../store/authStore';
import { useTaskStore } from '../../store/taskStore';
import { useTasks } from '../../hooks/useTasks';
import TaskFilters from '../../components/tasks/TaskFilters';
import TaskList from '../../components/tasks/TaskList';
import TaskStats from '../../components/tasks/TaskStats'; 
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  
  const { tasks, currentFilter, currentCategory, searchQuery } = useTaskStore();

  const { loading } = useTasks() || { loading: false };

  const filteredTasks = tasks.filter((task) => {

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const inTitle = task.title?.toLowerCase().includes(query);
      const inDesc = task.description?.toLowerCase().includes(query);
      if (!inTitle && !inDesc) return false;
    }

    if (currentFilter === 'completed' && !task.completed) return false;
    if (currentFilter === 'pending' && task.completed) return false;

    if (currentCategory !== 'all' && task.category !== currentCategory) return false;

    return true;
  });

  if (loading && tasks.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <LoadingSpinner />
        <p className="text-gray-500 mt-4 dark:text-gray-400 animate-pulse">
          Sincronizando con la nube...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 transition-colors duration-300">
  
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          ¡Hola, {user?.displayName?.split(' ')[0] || 'Usuario'}! 
        </h1>
        <p className="text-gray-600 mt-2 dark:text-gray-400">
          Este es el resumen de tus actividades para hoy.
        </p>
      </header>

      <section className="mb-8">
        <TaskStats />
      </section>

      <section className="mb-6">
        <TaskFilters />
      </section>

      <main>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            {searchQuery ? 'Resultados de búsqueda' : 'Mis Tareas'} 
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({filteredTasks.length})
            </span>
          </h2>
        </div>
        
        <TaskList tasks={filteredTasks} />
      </main>
    </div>
  );
}
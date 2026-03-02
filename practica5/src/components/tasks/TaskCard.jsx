import { Link } from 'react-router-dom';
import { updateTask, deleteTask } from '../../services/taskService';
import { CATEGORIES } from '../../utils/constants';
import { getDueDateLabel, isOverdue } from '../../utils/dateHelpers';

export default function TaskCard({ task }) {
  const category = CATEGORIES.find(c => c.id === task.category);
  const overdue = isOverdue(task.dueDate, task.completed);

  const handleToggleComplete = async (e) => {
    e.preventDefault(); 
    try {
      await updateTask(task.id, { completed: !task.completed });
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  return (
    <Link to={`/tasks/${task.id}`} className="block">
      <div className={`card hover:shadow-lg transition-shadow ${
        task.completed ? 'opacity-60' : ''
      } ${overdue ? 'border-2 border-red-500' : ''}`}>
        
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
            {task.description && (
              <p className="text-gray-600 text-sm line-clamp-2">{task.description}</p>
            )}
          </div>
          {category && (
            <span className={`px-2 py-1 rounded text-xs font-semibold bg-${category.color}-100 text-${category.color}-800`}>
              {category.label}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm">
            <span className={overdue ? 'text-red-600 font-bold' : 'text-gray-500'}>
              {getDueDateLabel(task.dueDate)}
            </span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleToggleComplete}
              className={`px-3 py-1 rounded text-xs font-medium ${
                task.completed ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
              }`}
            >
              {task.completed ? 'Pendiente' : 'Completar'}
            </button>
            <button 
              onClick={handleDelete}
              className="px-3 py-1 rounded text-xs font-medium bg-red-100 text-red-800"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
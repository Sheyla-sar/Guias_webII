import { useTaskStore } from '../../store/taskStore';
import { FILTERS, CATEGORIES } from '../../utils/constants';

export default function TaskFilters() {
  const { 
    currentFilter, 
    currentCategory, 
    searchQuery, 
    setFilter, 
    setCategory, 
    setSearchQuery 
  } = useTaskStore();

  return (
    <div className="card mb-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
          Buscar tareas
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por título o descripción..."
          className="input-field dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Filtrar por estado
          </label>
          <div className="flex gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Filtrar por categoría
          </label>
          <select
            value={currentCategory}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field dark:bg-gray-800 dark:text-white dark:border-gray-700"
          >
            <option value="all">Todas las categorías</option>
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
import { useTaskStore } from '../../store/taskStore';

export default function TaskStats() {
  const { tasks } = useTaskStore();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  
  const overdueTasks = tasks.filter(t => {
    if (t.completed || !t.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(t.dueDate.seconds * 1000 || t.dueDate); 
    return dueDate < today;
  }).length;

  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  const stats = [
    { label: 'Total', value: totalTasks, color: 'border-blue-500' },
    { label: 'Completadas', value: completedTasks, color: 'border-green-500' },
    { label: 'Pendientes', value: pendingTasks, color: 'border-yellow-500' },
    { label: 'Vencidas', value: overdueTasks, color: 'border-red-500' },
    { label: 'Progreso', value: `${completionPercentage}%`, color: 'border-purple-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      {stats.map((stat) => (
        <div 
          key={stat.label} 
          className={`bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border-l-4 ${stat.color} transition-colors`}
        >
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {stat.label}
          </p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
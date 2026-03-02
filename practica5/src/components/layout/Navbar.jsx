import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { logoutUser } from '../../services/authService';

export default function Navbar() {
  const { user, clearUser } = useAuthStore();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      clearUser(); 
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo y título */}
          <div className="flex items-center">
            <Link to="/dashboard" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Task Manager Pro
            </Link>
          </div>

          <div className="flex items-center gap-4">
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
            >
              {darkMode ? (
                <span className="text-yellow-400 text-xl">☀️</span>
              ) : (
                <span className="text-gray-600 text-xl">🌙</span>
              )}
            </button>

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>

            <div className="flex items-center gap-4">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {user?.displayName || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 font-medium transition-colors border border-gray-300 dark:border-gray-600"
              >
                Cerrar sesión
              </button>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
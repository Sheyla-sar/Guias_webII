import AppRouter from './routes/AppRouter';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'dark:!bg-slate-950 dark:!text-white border !border-gray-200 dark:!border-slate-800',
        }}
      />
      
      <AppRouter />
    </div>
  );
}

export default App;
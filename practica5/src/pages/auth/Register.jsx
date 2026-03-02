import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setError(null);
    try {
      await registerUser(data.email, data.password, data.fullName);
      navigate('/'); 
    } catch (err) {
      setError('Hubo un error al registrar el usuario. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="card max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Crear Cuenta</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input
              type="text"
              className={`w-full p-2 border rounded mt-1 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
              {...register("fullName", { 
                required: "El nombre es obligatorio", 
                minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" } 
              })}
            />
            {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className={`w-full p-2 border rounded mt-1 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              {...register("email", { 
                required: "El email es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Formato de email no válido"
                }
              })}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              className={`w-full p-2 border rounded mt-1 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              {...register("password", { 
                required: "La contraseña es obligatoria",
                minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }
              })}
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta? <Link title="Login" to="/login" className="text-blue-600 hover:underline">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}
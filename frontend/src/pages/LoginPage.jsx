import { useForm} from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import {Link, useNavigate} from 'react-router-dom';
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {singin, errors : singinErrors, isAuthenticated} = useAuth();
  const navigate = useNavigate(); 

  const onSubmit = handleSubmit(async (data) => {
    singin(data);
  });

  useEffect(() => {
    if(isAuthenticated){
      navigate('/proyects');
    }
  }, [isAuthenticated])

  return (
    <div className="bg-gray-900 p-8 rounded-lg w-1/2 mx-auto mt-10">
      <h1 className="text-2xl font-bold text-white mb-4">Iniciar Sesión</h1>
      {singinErrors.map((error, i) => (
        <div className="bg-red-500 text-sm p-2 text-white text-cente my-2" key={i}>
          {error}
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="text-white block">Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 bg-gray-800 text-white border rounded"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              El campo email es requerido
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="text-white block">Contraseña:</label>
          <input
            type="password"
            name="password"
            autoComplete="on"
            className="w-full p-2 bg-gray-800 text-white border rounded"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              El campo contraseña es requerido
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
      </form>

      <p>
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-blue-500 hover:text-blue-700">
          Regístrate
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;

import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { singin, errors: singinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    singin(data);
  });

  useEffect(() => {
    document.title = 'App costos - Iniciar Sesión';
    if (isAuthenticated) {
      navigate("/proyects");
    }
  }, [isAuthenticated]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
<div className="bg-white p-8 rounded-lg w-full md:w-1/2 mx-auto mt-4 shadow-md">
<img
      src="https://computacion.unl.edu.ec/apps/costo/logo/login-logo.png" // Reemplaza con la ruta relativa a tu logo en la carpeta public
      alt="Logo de tu carrera para el login"
      className="mx-auto mb-0 w-1/3"
    />
  <h1 className="text-lg font-bold text-gray-800 mb-2">Iniciar Sesión</h1>
  {singinErrors.map((error, i) => (
    <div
      className="bg-red-500 text-sm p-2 text-white text-center my-2 rounded"
      key={i}
    >
      {error}
    </div>
  ))}
  <form onSubmit={onSubmit}>
    <div className="mb-2">
      <label className="text-gray-800 block">Correo Electrónico:</label>
      <input
        type="email"
        name="email"
        className="w-full p-2 bg-gray-200 text-gray-800 border rounded"
        {...register("email", { required: true })}
      />
      {errors.email && (
        <span className="text-red-500 text-sm">
          El campo email es requerido
        </span>
      )}
    </div>
    <div className="mb-4">
          <label className="text-gray-800 block">Contraseña:</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="on"
              className="w-full p-2 bg-gray-200 text-gray-800 border rounded"
              {...register("password", { required: true })}
            />
            <button
              type="button"
              className="absolute top-0 right-0 mt-2 mr-3 focus:outline-none text-gray-800"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              El campo contraseña es requerido
            </span>
          )}
        </div>
    <button
      type="submit"
      className="bg-sky-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-400 transition duration-300"
    >
      Iniciar Sesión
    </button>
  </form>

  <p className="text-gray-800">
    ¿No tienes cuenta?{" "}
    <Link to="/register" className="text-blue-500 hover:text-blue-700">
      Regístrate
    </Link>
  </p>
</div>
  );
}

export default LoginPage;
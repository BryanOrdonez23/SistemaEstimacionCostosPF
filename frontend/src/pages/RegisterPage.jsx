import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { singup, isAuthenticated, errors: registerErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/proyects");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    singup(values);
  });
  return (
    <div className="bg-white p-8 rounded-lg w-full md:w-1/2 mx-auto mt-10 shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Formulario de Registro
      </h1>
      {registerErrors.map((error, i) => (
        <div
          className="bg-red-500 text-sm p-2 text-white text-center my-2"
          key={i}
        >
          {error}
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="text-gray-800 block">Nombre:</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 bg-gray-200 text-gray-800 border rounded"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">
              El campo nombre es requerido
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="text-gray-800 block">Apellido:</label>
          <input
            type="text"
            name="apellido"
            className="w-full p-2 bg-gray-200 text-gray-800 border rounded"
            {...register("lastname", { required: true })}
          />
          {errors.lastname && (
            <span className="text-red-500 text-sm">Apellido requerido</span>
          )}
        </div>
        <div className="mb-4">
          <label className="text-gray-800 block">Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 bg-gray-200 text-gray-800 border rounded"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              El campo correo Electrónico es requerido
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="text-gray-800 block">Contraseña:</label>
          <input
            type="password"
            name="password"
            autoComplete="on"
            className="w-full p-2 bg-gray-200 text-gray-800 border rounded"
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
          Registrarse
        </button>
      </form>
      <p className="text-black">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="text-blue-500 hover:text-blue-700">
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;

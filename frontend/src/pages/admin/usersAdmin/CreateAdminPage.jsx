import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { useAdmin } from "../../../context/AdminContext";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs ";
import { useNavigate } from "react-router-dom";
function CreateAdminPage() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createAdmin, errors: registerErrors, getAdmins } = useAdmin();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "App costos - Nuevo Admin";
    
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    const res = await createAdmin(values);
    if (res) {
        getAdmins();
        navigate("/administrador/admins");
    }
  });

  const routes = [
    { path: '/administrador/menu', displayName: 'Inicio' },
    { path: `/administrador/admins`, displayName: 'Administrar Administradores' },
    { path: `/administrador/admins/create`, displayName: 'Nuevo Administrador' },
  ];


  return (
    <div className="max-w-2xl mx-auto mt-4 p-6 bg-white rounded-md shadow-md text-black">
        <Breadcrumbs routes={routes} />
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Formulario de Registro de Admins
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
          Añadir Admin
        </button>
      </form>

    </div>
  );
}

export default CreateAdminPage;

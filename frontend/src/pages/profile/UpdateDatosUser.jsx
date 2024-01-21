import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs ";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

function UpdateDatosUser() {
  const {
    user,
    updateUserwoPassword,
    errors: updateerrors,
    getUserById,
  } = useAuth();
  const navigate = useNavigate();
  const routes = [
    { path: "/proyects", displayName: "Inicio" },
    { path: "/perfil", displayName: "Perfil de Usuario" },
    { path: "/editar-datos", displayName: "Editar Datos de Usuario" },
  ];
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Aquí puedes manejar la lógica para enviar los datos actualizados del usuario al servidor
    const res = await updateUserwoPassword(data);
    if (res) {
      getUserById();
      navigate("/perfil");
    }
  };
  // Preenchamos los campos con los datos actuales al cargar la página
  useEffect(() => {
    document.title = "Editar Datos de Usuario - App costos";
    setValue("name", user.name);
    setValue("lastname", user.lastname);
    setValue("email", user.email);
  }, []);

  console.log(updateerrors);

  return (
    <div className="flex flex-col items-center justify-center  bg-CCE3FF">
      <Breadcrumbs routes={routes} />
      <div className="max-w-xl mx-auto mt-4 p-6 bg-white rounded-md shadow-md md:w-3/4 lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          Editar Datos de Usuario
        </h2>
        {updateerrors.map((error, i) => (
          <div
            className="bg-red-500 text-sm p-2 text-white text-center my-2 rounded"
            key={i}
          >
            {error}
          </div>
        ))}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              {...register("name", { required: "Este campo es requerido" })}
              className="border p-2 w-full text-black"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Apellido:
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              {...register("lastname", { required: "Este campo es requerido" })}
              className="border p-2 w-full  text-black"
            />
            {errors.lastname && (
              <p className="text-red-500">{errors.lastname.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2  text-black"
            >
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email", {
                required: "Este campo es requerido",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Correo electrónico no válido",
                },
              })}
              className="border p-2 w-full  text-black"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateDatosUser;

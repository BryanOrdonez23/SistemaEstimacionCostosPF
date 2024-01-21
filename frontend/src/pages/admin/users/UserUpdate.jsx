import React from "react";
import { useForm } from "react-hook-form";
import { useAdmin } from "../../../context/AdminContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs ";

function UserUpdate() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const { updateUser, getUser, errors} = useAdmin();

  useEffect(() => {
    async function loadfunction() {
      if (params.id) {
        const userfound = await getUser(params.id);
        console.log(userfound);
        setValue("name", userfound.name);
        setValue("lastname", userfound.lastname);
        setValue("email", userfound.email);
      }
    }
    loadfunction();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    await updateUser(params.id, data);
    navigate(`/administrador/users`);
  });

  const routes = [
    { path: '/administrador/menu', displayName: 'Inicio' },
    { path: `/administrador/users`, displayName: 'Administrar Usuarios' },
    { path: `/administrador/users/${params.id}`, displayName: 'Actualizar Usuario' },
  ];
  console.log(errors);

   return (
    <div>
      <div className="max-w-3xl mx-auto mt-4 p-6 bg-white rounded-md shadow-md">
        <Breadcrumbs routes={routes} />
        <h2 className="text-2xl font-semibold mb-6 text-black">
          Actualizar Usuarios
        </h2>
        {errors.map((error, i) => (
        <div
          className="bg-red-500 text-sm p-2 text-white text-center my-2"
          key={i}
        >
          {error}
        </div>
      ))}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Nombre
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              placeholder="Actualice el nombre"
              className="w-full border p-2 rounded text-black"
              {...register("name", { required: true })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Apellido
            </label>
            <input
              required
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Actualice el nombre"
              className="w-full border p-2 rounded text-black"
              {...register("lastname", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Correo Electrónico
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="Actualice el email"
              className="w-full border p-2 rounded text-black"
              {...register("email", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserUpdate;

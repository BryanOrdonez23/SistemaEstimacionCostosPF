import React from "react";
import { useForm } from "react-hook-form";
import { useAdmin } from "../../../context/AdminContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
function UserUpdate() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const { updateUser, getUser, user} = useAdmin();

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

   return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-black">
          Actualizar Usuarios
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Nombre
            </label>
            <input
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
              type="email"
              id="email"
              name="email"
              placeholder="Actualice el email"
              className="w-full border p-2 rounded text-black"
              {...register("email", { required: true })}
            />
          </div>
          <div className="mb-4">

            <label className="block text-gray-600 text-sm font-medium mb-2">
              Constraseña (Mas de 6 caracteres)
            </label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Actualice la contraseña"
              className="w-full border p-2 rounded text-black"
              {...register("password")}
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

import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
function CambioContra() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { user, errors: updateerrors, changePassword } = useAuth();

  const onSubmit = async (data) => {
    // Aquí puedes manejar la lógica para cambiar la contraseña
    const res = await changePassword(data);
    console.log(res);
    if (res) {
      navigate("/perfil");
    }
    
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">
        Cambiar Contraseña
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
            htmlFor="currentPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Contraseña Actual:
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            {...register("currentPassword", {
              required: "Este campo es requerido",
            })}
            className="border p-2 w-full  text-black"
          />
          {errors.currentPassword && (
            <p className="text-zinc-500">{errors.currentPassword.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nueva Contraseña:
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            {...register("newPassword", {
              required: "Este campo es requerido",
            })}
            className="border p-2 w-full text-black"
          />
          {errors.newPassword && (
            <p className="text-red-500">{errors.newPassword.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirmar Nueva Contraseña:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            {...register("confirmPassword", {
              validate: (value) =>
                value === getValues("newPassword") ||
                "Las contraseñas no coinciden",
            })}
            className="border p-2 w-full  text-black"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
}

export default CambioContra;

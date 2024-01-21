import React from 'react';
import { useForm } from 'react-hook-form';
import { useAdmin } from "../../../context/AdminContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs ";

const UserUpdatePass = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  const navigate = useNavigate();
    const params = useParams();
    const { updateUser, changePassword, errors: errorspass} = useAdmin();

  const onSubmit = async (data) => {
   const res = await changePassword(params.id, data);
   if (res) {
    navigate(`/administrador/users`);
   }
  };

  useEffect(() => {
    document.title = 'Cambio de Contraseña Usuario - App Costos';
  }, []);

  const routes = [
    { path: '/administrador/menu', displayName: 'Inicio' },
    { path: `/administrador/users`, displayName: 'Administrar Usuarios' },
    { path: `/administrador/users/cambio/${params.id}`, displayName: 'Cambio de contraseña' },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md text-black">
        <Breadcrumbs routes={routes} />
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Cambio de Contraseña</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Nueva Contraseña:
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            {...register('newPassword', { 
              required: 'Este campo es requerido',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            })}
            className="border p-2 w-full"
          />
          {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Confirmar Nueva Contraseña:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            {...register('confirmPassword', {
              validate: value => value === getValues('newPassword') || 'Las contraseñas no coinciden'
            })}
            className="border p-2 w-full"
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
};

export default UserUpdatePass;

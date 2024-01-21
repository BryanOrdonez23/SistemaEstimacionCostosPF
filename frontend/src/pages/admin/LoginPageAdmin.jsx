import React from 'react'
import { useForm } from "react-hook-form";
import { useAdmin } from "../../context/AdminContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPageAdmin() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const { singin, errors: singinErrors, isAuthenticated } = useAdmin();
      const navigate = useNavigate();
    
      const onSubmit = handleSubmit(async (data) => {
        singin(data);
      });
    
      useEffect(() => {
        document.title = "Inicio de Sesión de Administrador - App costos";
        if (isAuthenticated) {
          navigate("/administrador/menu");
        }
      }, [isAuthenticated]);
    
      return (
    <div className="bg-white p-8 rounded-lg w-full md:w-1/2 mx-auto mt-10 shadow-md">
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-4">INICIO DE SESIÓN DE ADMINISTRADOR</h1>
      {singinErrors.map((error, i) => (
        <div
          className="bg-red-500 text-sm p-2 text-white text-center my-2 rounded"
          key={i}
        >
          {error}
        </div>
      ))}
      <form onSubmit={onSubmit}>
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
              El campo email es requerido
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
          className="bg-blue-300 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-blue-400 transition duration-300"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
      );
}

export default LoginPageAdmin
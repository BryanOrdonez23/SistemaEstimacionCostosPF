import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs ";
import { useAuth } from "../../context/AuthContext";

function ProfilePage() {
    const { user } = useAuth();
  
  const routes = [{ path: "/proyects", displayName: "Inicio /" }];

  return (
    <div className="flex flex-col items-center justify-center  bg-CCE3FF">
        <Breadcrumbs routes={routes} />
      <div className=" max-w-xl mx-auto mt-4 p-6 bg-white rounded-md shadow-md md:w-3/4 lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          Perfil de Usuario
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre:
          </label>
          <p className="text-gray-900 text-lg">{user.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Apellido:
          </label>
          <p className="text-gray-900 text-lg">{user.lastname}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <p className="text-gray-900 text-lg mb-8">{user.email}</p>
        </div>
        {/* Contenedor adicional solo para el botón */}
        <div className=" flex  space-x-20 text-center justify-around ">
          <Link
            to="/editar-perfil"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Editar información
          </Link>
          <Link
            to="/editar-password"
            className="bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Cambiar constraseña
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

import React, { useState, useEffect } from "react";
import { useAdmin } from "../../../context/AdminContext";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs ";

function UserAdminsMainPage() {
    const { getAdmins, admins, deleteAdmin} = useAdmin();
    const [searchTerm, setSearchTerm] = useState("");
  
    useEffect(() => {
      document.title = "Administrar Administradores - App Costos";
      getAdmins();
    }, []);
  
    const handleDeleteAdmin = async (adminId) => {
      console.log(adminId);
      await deleteAdmin(adminId);
      getAdmins();
    };
  
    const filteredAdmins = admins.filter((admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const routes = [
      { path: '/administrador/menu', displayName: 'Inicio' },
      { path: `/administrador/admins`, displayName: 'Administrar Administradores' },
    ];
  
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
        <Breadcrumbs routes={routes} />
        <h2 className="text-2xl font-bold mb-4">Administradores</h2>
        <Link to="/administrador/admins/create">
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4">
          Agregar Administrador
        </button>
      </Link>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Busqueda por nombre, apellido, correo"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
  
        {/* Admin Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Nombre</th>
                <th className="border px-4 py-2">Apellido</th>
                <th className="border px-4 py-2">Correo Electrónico</th>
                <th className="border px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin) => (
                <tr key={admin._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{admin.name}</td>
                  <td className="border px-4 py-2">{admin.lastname}</td>
                  <td className="border px-4 py-2">{admin.email}</td>
                  <td className="border px-4 py-2 text-center">
                    <Link to={`/administrador/admins/${admin._id}`}>
                      <button className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
                        Actualizar
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteAdmin(admin._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Eliminar
                    </button>
                    <Link to={`/administrador/admins/cambio/${admin._id}`}>
                      <button className="mr-2 bg-yellow-600 text-white px-4 py-2 rounded mx-2">
                        Cambio de Contraseña
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default UserAdminsMainPage;

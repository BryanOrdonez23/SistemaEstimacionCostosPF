import React, { useState, useEffect } from "react";
import { useAdmin } from "../../../context/AdminContext";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs ";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
function UserMainPage() {
  const { getUsers, users, deleteUser, updateUser } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    document.title = "Administrar Usuarios - App Costos";
    getUsers();
  }, []);

 const handleDeleteUser = (userId) => {
    // Mostrar el modal de confirmación antes de eliminar
    setUserToDelete(userId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Realizar la eliminación después de la confirmación
      await deleteUser(userToDelete);
      // Actualizar la lista de usuarios u otras acciones necesarias después de la eliminación
      getUsers();
      // Ocultar el modal de confirmación
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const handleCancelDelete = () => {
    // Ocultar el modal de confirmación
    setShowDeleteConfirmation(false);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const routes = [
    { path: '/administrador/menu', displayName: 'Inicio' },
    { path: `/administrador/users`, displayName: 'Administrar Usuarios' },
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
      <Breadcrumbs routes={routes} />
      <h2 className="text-2xl font-bold mb-4">Usuarios</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Busqueda por nombre, apellido, correo"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {/* User Table */}
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
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.lastname}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 text-center">
                  <Link to={`/administrador/users/${user._id}`}>
                    <button className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
                      Actualizar
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Eliminar
                  </button>
                  <Link to={`/administrador/users/cambio/${user._id}`}>
                    <button className="mr-2 bg-yellow-600 text-white px-4 py-2 rounded mx-2">
                      Cambio de Constraseña
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
export default UserMainPage;

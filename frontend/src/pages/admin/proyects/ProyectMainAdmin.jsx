import React, { useState, useEffect } from "react";
import { useAdmin } from "../../../context/AdminContext";
import { useProyect } from '../../../context/ProyectContext';
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs ";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
function ProyectMainAdmin() {
  const { getUsers, users, deleteUser, updateUser, getAllProyects, allproyects, deleteProyect } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [proyectToDelete, setProyectToDelete] = useState(null);

  useEffect(() => {
    document.title = "Administrar Proyectos - App Costos";
    getAllProyects();
  }, []);

 const handleDeleteProyect = (proyectId) => {
    // Mostrar el modal de confirmación antes de eliminar
    setProyectToDelete(proyectId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Realizar la eliminación después de la confirmación
      await deleteProyect(proyectToDelete);
      // Actualizar la lista de proyectos u otras acciones necesarias después de la eliminación
      getAllProyects();
      // Ocultar el modal de confirmación
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  const handleCancelDelete = () => {
    // Ocultar el modal de confirmación
    setShowDeleteConfirmation(false);
  };

  const filteredProyects = allproyects ? allproyects.filter((proyect) =>
  proyect.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  proyect.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
  proyect.user.name.toLowerCase().includes(searchTerm.toLowerCase()) 
) : [];



const routes = [
  { path: '/administrador/menu', displayName: 'Inicio' },
  { path: `/administrador/proyects`, displayName: 'Configuraciones del proyecto' },
];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
      <Breadcrumbs routes={routes} />
      <h2 className="text-2xl font-bold mb-4">Proyectos</h2>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Busqueda por título de proyecto"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {/* Proyect Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Categoria</th>
              <th className="border px-4 py-2">Creador</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProyects.map((proyect) => (
              <tr key={proyect._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{proyect.title}</td>
                <td className="border px-4 py-2">{proyect.category}</td>
                <td className="border px-4 py-2">{proyect.user.name + " "+ proyect.user.lastname}</td>
                <td className="border px-4 py-2">
                  <Link to={`/administrador/proyects/${proyect._id}`}>
                    <button className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
                      Actualizar
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteProyect(proyect._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Eliminar
                  </button>
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

export default ProyectMainAdmin;

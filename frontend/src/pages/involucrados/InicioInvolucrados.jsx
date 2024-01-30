import React, {useState} from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import Breadcrumbs from "../../components/Breadcrumbs ";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

function InicioInvolucrados() {

  const { involucrados, getInvolucrados, deleteInvolucrado } = useEstimacionPF();
  const params = useParams();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [involucradoToDelete, setInvolucradoToDelete] = useState(null);

  useEffect(() => {
    document.title = "Involucrados - App costos";
    async function loadFunciones() {
      if (params.id) {
        await getInvolucrados(params.id);
      }
    }
    loadFunciones();
  }, []);

 const handleDeleteInvolucrado = async (proyectid, involucradoid) => {
    try {
      // Mostrar el modal de confirmación antes de eliminar
      setInvolucradoToDelete({ proyectid, involucradoid });
      setShowDeleteConfirmation(true);
    } catch (error) {
      console.error("Error al eliminar el involucrado:", error);
    }
  };

  const handleConfirmDelete = async () => {
    const { proyectid, involucradoid } = involucradoToDelete;
    try {
      await deleteInvolucrado(proyectid, involucradoid);
      // Actualizar la lista de involucrados o realizar otras acciones necesarias después de la eliminación
      setShowDeleteConfirmation(false); // Ocultar el modal de confirmación
    } catch (error) {
      console.error("Error al eliminar el involucrado:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false); // Ocultar el modal de confirmación
  };

  const routes = [
    { path: '/proyects', displayName: 'Inicio' },
    { path: `/fases/${params.id}`, displayName: 'Fases del proyecto' },
    { path: `/presupuesto/${params.id}`, displayName: 'Fase 6: Presupuesto del proyecto' },
    { path: `/involucrados/${params.id}`, displayName: 'Involucrados'}
  ];

  return (
    <div className="container mx-auto my-8 bg-white text-gray-800 p-4 sm:p-8 rounded-md">
      <Breadcrumbs routes={routes} />
      <h1 className="text-3xl font-bold mb-4">Lista de involucrados del proyecto</h1>
      <div className="flex items-center justify-center mb-4">
        <Link
          to={`/newinvolucrados/${params.id}`}
          className="text-justify bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          + Agregar un nuevo involucrado
        </Link>
      </div>
      {involucrados.length === 0 ? (
        <h1 className="text-xl mb-4">No hay involucrados agregados</h1>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-100 border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Nombre</th>
                <th className="py-2 px-4 border-b text-left">Rol</th>
                <th className="py-2 px-4 border-b text-left">Sueldo (USD)</th>
                <th className="py-2 px-4 border-b text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {involucrados.map((involucrado) => (
                <tr key={involucrado._id} className="hover:bg-gray-200">
                  <td className="py-2 px-4 border-b">{involucrado.nombre}</td>
                  <td className="py-2 px-4 border-b">{involucrado.rol}</td>
                  <td className="py-2 px-4 border-b">{involucrado.sueldo}</td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <Link
                      to={`/updateinvolucrado/${params.id}/${involucrado._id}`}
                      className="bg-yellow-300 hover:bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full border border-yellow-400"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDeleteInvolucrado(params.id, involucrado._id)}
                      className="bg-red-300 hover:bg-red-400 text-red-950 px-3 py-1 rounded-full border border-red-400"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
       {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
 
}

export default InicioInvolucrados;

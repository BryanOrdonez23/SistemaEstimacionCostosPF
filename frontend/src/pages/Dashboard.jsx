import React, { useState } from "react";
import { useProyect } from "../context/ProyectContext";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function ProyectFormPage() {
  const { user } = useAuth();
  const {
    proyects,
    getProyects,
    deleteProyect,
    getProyectsShared,
    proyectShared,
    createProyectShared,
  } = useProyect();
  const [showTableModal, setShowTableModal] = useState(false);
  const [faCode, setFaCode] = useState("");

  useEffect(() => {
    getProyects();
    getProyectsShared();
  }, []);

  console.log(proyectShared);

  const handleDeleteProyect = async (proyectId) => {
    try {
      await deleteProyect(proyectId, false);
      getProyects();
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };
  const toggleTableModal = () => {
    setShowTableModal(!showTableModal);
  };

  const handleProyectShared = async (proyectId) => {
    setFaCode(proyectId);
    toggleTableModal();
    console.log(proyectId);
  };

  return (
    <div className="container mx-auto my-8 bg-white text-gray-800 p-4 md:p-8 rounded-md shadow-md">
      <div className="flex justify-center ">
        <Link
          to={`/compartir`}
          className="text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
           + Ingresar desde un codigo de invitación
        </Link>
      </div>
      <h1 className="text-blue-900 text-3xl font-bold">Lista de Proyectos</h1>
      {proyects.length === 0 ? (
        <p className="text-xl mb-4">No hay proyectos</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-200 border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="py-2 px-2 md:px-4 border-b text-left">Título</th>
                <th className="py-2 px-2 md:px-4 border-b text-left">
                  Categoría
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-left">
                  Fecha de Creación
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-left">
                  Última Actualización
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center"></th>
              </tr>
            </thead>
            <tbody>
              {proyects.map((proyect) => (
                <tr key={proyect._id} className="hover:bg-gray-300">
                  <td className="py-2 px-2 md:px-4 border-b">
                    {proyect.title}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b">
                    {proyect.category}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b">
                    {new Date(proyect.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b">
                    {new Date(proyect.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b space-y-2 md:space-x-2 md:space-y-0">
                    <Link
                      to={`/fases/${proyect._id}`}
                      className="block md:inline-block bg-blue-500 hover:bg-blue-400 text-white px-2 py-1 rounded border border-blue-300 mb-2 md:mb-0 md:mr-2"
                    >
                      Detalles
                    </Link>
                    <Link
                      to={`/proyect/${proyect._id}`}
                      className="block md:inline-block bg-yellow-300 hover:bg-yellow-300 text-yellow-900 px-2 py-1 rounded border border-yellow-300 mb-2 md:mb-0 md:mr-2"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDeleteProyect(proyect._id)}
                      className="block md:inline-block bg-red-300 hover:bg-red-400 text-red-950 px-2 py-1 rounded border border-red-300"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleProyectShared(proyect.keyShared)}
                      className="block md:inline-block bg-green-300 hover:green-red-400 text-red-950 px-2 py-1 rounded border border-red-300"
                    >
                      Compartir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h1 className="text-blue-900 text-3xl font-bold mb-4">
        Lista de Proyectos Compartidos
      </h1>
      {proyectShared.length === 0 ? (
        <p className="text-xl mb-4">No hay proyectos compartidos</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-200 border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="py-2 px-2 md:px-4 border-b text-left">Título</th>
                <th className="py-2 px-2 md:px-4 border-b text-left">
                  Categoría
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-left">
                  Fecha de Creación
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-left">
                  Última Actualización
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center"></th>
              </tr>
            </thead>
            <tbody>
              {proyectShared.map((proyect) => (
                <tr key={proyect._id} className="hover:bg-gray-300">
                  <td className="py-2 px-2 md:px-4 border-b">
                    {proyect.proyect.title}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b">
                    {proyect.proyect.category}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b">
                    {new Date(proyect.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b">
                    {new Date(proyect.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b space-y-2 md:space-x-2 md:space-y-0">
                    <Link
                      to={`/fases/${proyect.proyect._id}`}
                      className="block md:inline-block bg-blue-500 hover:bg-blue-400 text-white px-2 py-1 rounded border border-blue-300 mb-2 md:mb-0 md:mr-2"
                    >
                      Detalles
                    </Link>
                    <Link
                      to={`/proyect/${proyect.proyect._id}`}
                      className="block md:inline-block bg-yellow-300 hover:bg-yellow-300 text-yellow-900 px-2 py-1 rounded border border-yellow-300 mb-2 md:mb-0 md:mr-2"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showTableModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleTableModal}>
              &times;
            </span>
            <h1 className="text-blue-950 font-bold mb-4 text-center">
              Codigo de acceso: {faCode}{" "}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProyectFormPage;

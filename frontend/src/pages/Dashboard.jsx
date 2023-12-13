import React from "react";
import { useProyect } from "../context/ProyectContext";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function ProyectFormPage() {
  const { user } = useAuth();
  const { proyects, getProyects, deleteProyect } = useProyect();

  useEffect(() => {
    getProyects();
  }, []); 

  const handleDeleteProyect = async (proyectId) => {
    try {
        await deleteProyect(proyectId, false);
        getProyects();
    } catch (error) {
        console.error("Error al eliminar el proyecto:", error);
    }
};

return (
  <div className="container mx-auto my-8 bg-white text-gray-800 p-8 rounded-md shadow-md">
    <h1 className="text-blue-700 text-3xl font-bold mb-4">Lista de Proyectos</h1>
    
    {proyects.length === 0 ? (
      <p className="text-xl mb-4">No hay proyectos</p>
    ) : (
      <table className="min-w-full bg-gray-200 border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Título</th>
            <th className="py-2 px-4 border-b text-left">Categoría</th>
            <th className="py-2 px-4 border-b text-left">Fecha de Creación</th>
            <th className="py-2 px-4 border-b text-left">Última Actualización</th>
            <th className="py-2 px-4 border-b text-justify">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyects.map((proyect) => (
            <tr key={proyect._id} className="hover:bg-gray-300">
              <td className="py-2 px-4 border-b">{proyect.title}</td>
              <td className="py-2 px-4 border-b">{proyect.category}</td>
              <td className="py-2 px-4 border-b">{new Date(proyect.createdAt).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{new Date(proyect.updatedAt).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b space-x-2">
                <Link
                  to={`/fases/${proyect._id}`}
                  className="bg-blue-500 hover:bg-blue-300 text-white px-2 py-1 rounded border border-blue-300"
                >
                  Detalles
                </Link>
                <Link
                  to={`/proyect/${proyect._id}`}
                  className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-2 py-1 rounded border border-yellow-300"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDeleteProyect(proyect._id)}
                  className="bg-red-200 hover:bg-red-300 text-red-800 px-2 py-1 rounded border border-red-300"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

}

export default ProyectFormPage;

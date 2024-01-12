import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useEstimacionPF } from "../../context/EstimacionPFContext";


function InicioInvolucrados() {

  const { involucrados, getInvolucrados, deleteInvolucrado } = useEstimacionPF();
  const params = useParams();

  useEffect(() => {
    async function loadFunciones() {
      if (params.id) {
        await getInvolucrados(params.id);
      }
    }
    loadFunciones();
  }, []);

  const handleDeleteFunctions = async (proyectid, innvolucradoid) => {
    try {
        await deleteInvolucrado(proyectid, innvolucradoid);
        //const res = await getFunctions(proyectid);
        //await getProyect(proyectid);
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  return (
    <div className="container mx-auto my-8 bg-white text-gray-800 p-4 sm:p-8 rounded-md">
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
                <th className="py-2 px-4 border-b text-left">Sueldo</th>
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
                      onClick={() => handleDeleteFunctions(params.id, involucrado._id)}
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
    </div>
  );
 
}

export default InicioInvolucrados;

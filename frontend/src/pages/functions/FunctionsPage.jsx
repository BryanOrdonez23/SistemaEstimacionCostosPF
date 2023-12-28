import React from "react";
import { useProyect } from "../../context/ProyectContext";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFunctions } from "../../context/FunctionsContext";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
function FunctionsPage() {
  const { user } = useAuth();
  const { getProyect, proyect } = useProyect();
  const { pfsaCalculo } = useEstimacionPF();
  const { getFunctions, funciones, deleteFunctions } = useFunctions();
  const params = useParams();

  useEffect(() => {
    async function loadFunciones() {
      if (params.id) {
        const res = await getFunctions(params.id);
        await getProyect(params.id);
        await pfsaCalculo(params.id);
      }
    }
    loadFunciones();
  }, []);

  const handleDeleteFunctions = async (proyectid, functionid) => {
    try {
      console.log(proyectid, functionid);
      await deleteFunctions(proyectid, functionid);
      await pfsaCalculo(params.id);
      //const res = await getFunctions(proyectid);
      //await getProyect(proyectid);
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  return (
    <div className="container mx-auto my-8 bg-white text-gray-800 p-8 rounded-md">
      <h1 className="text-3xl font-bold mb-4">
        Lista de funcionalidades del proyecto de software.
      </h1>
      <div className="flex items-center justify-center mb-4">
        <Link
          to={`/newfunciones/${proyect._id}`}
          className="text-justify bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          + Agregar una nueva funcionalidad
        </Link>
      </div>
      {funciones.length === 0 ? (
        <h1 className="text-xl mb-4">No hay funciones agregadas</h1>
      ) : (
        <table className="min-w-full bg-gray-100 border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Funcionalidad</th>
              <th className="py-2 px-4 border-b text-left">Tipo</th>
              <th className="py-2 px-4 border-b text-left">Complejidad</th>
              <th className="py-2 px-4 border-b text-left">Cantidad</th>
              <th className="py-2 px-4 border-b text-justify">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {funciones.map((funcion) => (
              <tr key={funcion._id} className="hover:bg-gray-200">
                <td className="py-2 px-4 border-b">{funcion.funcionalidad}</td>
                <td className="py-2 px-4 border-b">{funcion.tipo}</td>
                <td className="py-2 px-4 border-b">{funcion.complejidad}</td>
                <td className="py-2 px-4 border-b">{funcion.cantidad}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <Link
                    to={`/updatefuncion/${proyect._id}/${funcion._id}`}
                    className="bg-yellow-300 hover:bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full border border-yellow-400"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDeleteFunctions(proyect._id, funcion._id)}
                    className="bg-red-300 hover:bg-red-400 text-red-950 px-3 py-1 rounded-full border border-red-400"
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

export default FunctionsPage;

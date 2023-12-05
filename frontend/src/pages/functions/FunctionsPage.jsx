import React from "react";
import { useProyect } from "../../context/ProyectContext";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFunctions } from "../../context/FunctionsContext";
function FunctionsPage() {
  const { user } = useAuth();
  const { getProyect, proyect } = useProyect();
  const { getFunctions, funciones, deleteFunctions } = useFunctions();
  const params = useParams();

  useEffect(() => {
    async function loadFunciones() {
      if (params.id) {
        const res = await getFunctions(params.id);
        await getProyect(params.id);
      }
    }
    loadFunciones();
  }, []);

  const handleDeleteFunctions = async (proyectid, functionid) => {
    try {
      console.log(proyectid, functionid);
      await deleteFunctions(proyectid, functionid);
      //const res = await getFunctions(proyectid);
      //await getProyect(proyectid);
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  return (
    <div className="container mx-auto my-8 bg-zinc-700 text-white p-8 rounded-md">
      <h1 className="text-3xl font-bold mb-4">
        Lista de funcionalidades del proyecto de software.
      </h1>
      <div className="flex items-center justify-center">
        {
          <Link
            to={`/newfunciones/${proyect._id}`}
            className=" text-justify bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 mb-4"
          >
            Agregar una nueva funcionalidad
          </Link>
        }
      </div>
      {funciones.length === 0 ? (
        <h1 className="text-xl mb-4">No hay funciones agregadas</h1>
      ) : (
        <table className="min-w-full bg-gray-600 border border-gray-600 text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Funcionalidad</th>
              <th className="py-2 px-4 border-b text-left">Tipo</th>
              <th className="py-2 px-4 border-b text-left">Complejidad</th>
              <th className="py-2 px-4 border-b text-left">Canttidad</th>
              <th className="py-2 px-4 border-b text-justify">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {funciones.map((funcion) => (
              <tr key={funcion._id} className="hover:bg-gray-700">
                <td className="py-2 px-4 border-b">{funcion.funcionalidad}</td>
                <td className="py-2 px-4 border-b">{funcion.tipo}</td>
                <td className="py-2 px-4 border-b">{funcion.complejidad}</td>
                <td className="py-2 px-4 border-b">{funcion.cantidad}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/updatefuncion/${proyect._id}/${funcion._id}`}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded border border-yellow-600 mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() =>
                      handleDeleteFunctions(proyect._id, funcion._id)
                    }
                    className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded border border-red-600"
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

import React, { useState } from "react";
import { useProyect } from "../../context/ProyectContext";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFunctions } from "../../context/FunctionsContext";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import Breadcrumbs from "../../components/Breadcrumbs ";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

function FunctionsPage() {
  const { user } = useAuth();
  const { getProyect, proyect } = useProyect();
  const { pfsaCalculo } = useEstimacionPF();
  const { getFunctions, funciones, deleteFunctions } = useFunctions();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [functionToDelete, setFunctionToDelete] = useState(null);

  const params = useParams();
  const routes = [
    { path: "/proyects", displayName: "Inicio" },
    { path: `/fases/${params.id}`, displayName: "Fases del Proyecto" },
    {
      path: `/funciones/${params.id}`,
      displayName: "Fase 1: Funciones del Proyecto",
    },
  ];
  useEffect(() => {
    document.title = "Fase 1- App costos";
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
      setFunctionToDelete({ proyectid, functionid });
      setShowDeleteConfirmation(true);
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  const handleConfirmDelete = async () => {
    const { proyectid, functionid } = functionToDelete;
    try {
      await deleteFunctions(proyectid, functionid);
      await pfsaCalculo(params.id);
      // const res = await getFunctions(proyectid);
      // await getProyect(proyectid);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="container mx-auto my-6 bg-white text-gray-800 p-4 md:p-8 rounded-md shadow-md max-w-screen-lg mx-auto">
      <Breadcrumbs routes={routes} />
      <h1 className="text-3xl font-bold mb-4">
        Fase 1: Funcionalidades del proyecto de software.
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
        <div className="">
          <div>
            <h1 className="text-xl mb-4">No hay funciones agregadas</h1>
          </div>
          <div className="flex items-center justify-start mb-4">
            <Link
              to={`/fases/${params.id}`}
              className=" bg-blue-500 hover:bg-blue-600 font-semibold text-white px-3 py-2 rounded"
            >
              Volver a las fases del proyecto
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-100 border border-gray-300 text-sm">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-center">
                    Funcionalidad
                  </th>
                  <th className="py-2 px-4 border-b text-center">Tipo</th>
                  <th className="py-2 px-4 border-b text-center">
                    Complejidad
                  </th>
                  <th className="py-2 px-4 border-b text-center">Cantidad</th>
                  <th className="py-2 px-4 border-b text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {funciones.map((funcion) => (
                  <tr key={funcion._id} className="hover:bg-gray-200">
                    <td className="py-2 px-4 border-b">
                      {funcion.funcionalidad}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {funcion.tipo}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {funcion.complejidad}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {funcion.cantidad}
                    </td>
                    <td className="py-2 px-4 border-b space-x-2 text-center">
                      <Link
                        to={`/updatefuncion/${proyect._id}/${funcion._id}`}
                        className="bg-yellow-300 hover:bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full border border-yellow-400"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() =>
                          handleDeleteFunctions(proyect._id, funcion._id)
                        }
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
          <div className="flex flex-col md:flex-row justify-end mt-5">
            <Link
              to={`/calculopfsa/${params.id}`}
              className="bg-green-500 text-white px-4 py-2 rounded text-center hover:bg-green-600"
            >
              Ir a la Fase 2
            </Link>
          </div>
        </>
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

export default FunctionsPage;

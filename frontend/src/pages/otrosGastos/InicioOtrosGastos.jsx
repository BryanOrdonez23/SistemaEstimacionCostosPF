import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import Breadcrumbs from "../../components/Breadcrumbs ";

function InicioOtrosGastos() {
  const { otrosGastos, getOtrosGastos, eliminarOtroGasto } = useEstimacionPF();
  const params = useParams();

  useEffect(() => {
    document.title = "Otros Gastos - App costos";
    async function loadFunciones() {
      if (params.id) {
        await getOtrosGastos(params.id);
      }
    }
    loadFunciones();
  }, []);

  const handleDeleteFunctions = async (proyectid, otrosgastosid) => {
    try {
      await eliminarOtroGasto(proyectid, otrosgastosid);
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  const routes = [
    { path: "/proyects", displayName: "Inicio" },
    { path: `/fases/${params.id}`, displayName: "Fases del proyecto" },
    {
      path: `/presupuesto/${params.id}`,
      displayName: "Fase 6: Presupuesto del proyecto",
    },
  ];

  return (
    <div className="container mx-auto my-8 bg-white text-gray-800 p-4 sm:p-8 rounded-md">
        <Breadcrumbs routes={routes} />
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Lista de otros gastos del proyecto
      </h1>
      <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
        <Link
          to={`/newotrosGastos/${params.id}`}
          className="text-justify bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          + Agregar un nuevo Gasto
        </Link>
      </div>
      {otrosGastos.length === 0 ? (
        <h1 className="text-lg mb-4">No hay Gastos agregados.</h1>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Descripción:</th>
                <th className="py-2 px-4 border-b text-left">Costo:</th>
                <th className="py-2 px-4 border-b text-left">Observación:</th>
                <th className="py-2 px-4 border-b text-left">Acciones:</th>
              </tr>
            </thead>
            <tbody>
              {otrosGastos.map((otrosGasto) => (
                <tr key={otrosGasto._id} className="hover:bg-gray-200">
                  <td className="py-2 px-4 border-b">
                    {otrosGasto.descripcion}
                  </td>
                  <td className="py-2 px-4 border-b">{otrosGasto.costo}</td>
                  <td className="py-2 px-4 border-b">
                    {otrosGasto.observacion}
                  </td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <Link
                      to={`/updateotrosGastos/${params.id}/${otrosGasto._id}`}
                      className="bg-yellow-300 hover:bg-yellow-300 text-yellow-900 px-2 sm:px-3 py-1 rounded-full border border-yellow-400"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() =>
                        handleDeleteFunctions(params.id, otrosGasto._id)
                      }
                      className="bg-red-300 hover:bg-red-400 text-red-950 px-2 sm:px-3 py-1 rounded-full border border-red-400"
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

export default InicioOtrosGastos;

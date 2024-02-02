import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import { useFunctions } from "../../context/FunctionsContext";
import Breadcrumbs from "../../components/Breadcrumbs ";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCalculator } from "@fortawesome/free-solid-svg-icons";

const CalcuiloPFSA = () => {
  const { puntosFuncionTotal, pfsaCalculo } = useEstimacionPF();
  const { getFunctions, funciones } = useFunctions();
  const params = useParams();

  useEffect(() => {
    document.title = "Fase 2 - App costos";
    async function loadFunciones() {
      if (params.id) {
        await getFunctions(params.id);
      }
    }
    loadFunciones();
  }, []);

  const handleCalcularPuntos = async () => {
    try {
      await pfsaCalculo(params.id);
    } catch (error) {
      console.error(error);
    }
  };

  const calcularPeso = (tipo, complejidad) => {
    // Definir los valores de peso según el tipo y la complejidad
    const pesos = {
      EI: { Alta: 6, Media: 4, Baja: 3 },
      EO: { Alta: 7, Media: 5, Baja: 4 },
      EQ: { Alta: 6, Media: 4, Baja: 3 },
      ILF: { Alta: 15, Media: 10, Baja: 7 },
      EIF: { Alta: 10, Media: 10, Baja: 5 },
    };

    // Obtener el peso correspondiente
    const peso = pesos[tipo][complejidad];

    return peso;
  };

  const calcularPonderacion = (tipo, complejidad, cantidad) => {
    // Definir los valores de ponderación según el tipo y la complejidad
    const ponderaciones = {
      EI: { Alta: 6, Media: 4, Baja: 3 },
      EO: { Alta: 7, Media: 5, Baja: 4 },
      EQ: { Alta: 6, Media: 4, Baja: 3 },
      ILF: { Alta: 15, Media: 10, Baja: 7 },
      EIF: { Alta: 10, Media: 10, Baja: 5 },
    };

    // Obtener la ponderación correspondiente
    const ponderacion = ponderaciones[tipo][complejidad];

    // Calcular el valor de la ponderación
    const valorPonderacion = ponderacion * cantidad;

    return valorPonderacion;
  };
  const routes = [
    { path: "/proyects", displayName: "Inicio" },
    { path: `/fases/${params.id}`, displayName: "Fases del Proyecto" },
    {
      path: `/calculopfsa/${params.id}`,
      displayName: "Fase 2: Puntos de Función sin Ajustar",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-CCE3FF mt-4">
      <div className="w-full max-w-screen-lg mb-4 text-center bg-white p-6 rounded-md shadow-md">
        <Breadcrumbs routes={routes} />
        <h1 className="text-blue-950 text-2xl font-bold mb-4">
          Fase 2: Cálculo de Puntos de Función sin Ajustar
        </h1>

        <button
          className="block bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded mx-auto transition-transform transform-gpu active:scale-95"
          onClick={handleCalcularPuntos}
        >
          Calcular Puntos de Función
          <FontAwesomeIcon icon={faCalculator} className="ml-2" />
        </button>

        {puntosFuncionTotal !== 0 && (
          <div className="bg-gray-200 p-4 rounded-md mt-4">
            <p className="mb-2 text-blue-700 text-base font-bold">
              Puntos de Función Totales (sin ajustar): {puntosFuncionTotal}
            </p>

            <div className="text-base">
              <p className="text-gray-800">Fórmula:</p>
              <p className="text-gray-800">
                PFSA = Σ (Cantidad
                <sub>i</sub> * Peso
                <sub>i</sub>)
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="w-full max-w-screen-lg">
        <div
          className={`overflow-x-auto ${
            funciones.length > 7 ? "overflow-y-auto max-h-[780px]" : ""
          } bg-white p-6 rounded-md shadow-md mt-1`}
        >
          <h1 className="text-gray-800 text-xl text-center font-semibold italic mb-4">
            Listado de funcionalidades
          </h1>
          {funciones.length === 0 ? (
            <h1 className="text-xl mb-4">No hay funciones agregadas</h1>
          ) : (
            <div className="overflow-x-auto">
              <div className="rounded-lg border border-gray-200 shadow-md m-5">
                <table className="min-w-full bg-white border-collapse text-left text-sm text-gray-700">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="py-2 px-2 md:px-3 font-semibold text-blue-800 border-b text-center">
                        Funcionalidad
                      </th>
                      <th className="py-2 px-2 md:px-3 font-semibold text-blue-800 border-b text-center">
                        Tipo
                      </th>
                      <th className="py-2 px-2 md:px-3 font-semibold text-blue-800 border-b text-center">
                        Complejidad
                      </th>
                      <th className="py-2 px-2 md:px-3 font-semibold text-blue-800 border-b text-center">
                        Peso
                      </th>
                      <th className="py-2 px-2 md:px-3 font-semibold text-blue-800 border-b text-center">
                        Cantidad
                      </th>
                      <th className="py-2 px-2 md:px-3 font-semibold text-blue-800 border-b text-center">
                        Total(Peso*Cantidad)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    {funciones.map((funcion) => (
                      <tr key={funcion._id} className="hover:bg-gray-300">
                        <td className="py-2 px-1 md:px-2 border-b text-center">
                          {funcion.funcionalidad}
                        </td>
                        <td className="py-2 px-2 md:px-3 border-b text-center">
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-1 py-1 text-xxs sm:text-xs font-semibold text-blue-800">
                            {funcion.tipo}
                          </span>
                        </td>
                        <td className="py-2 px-2 md:px-3 border-b text-center">
                          {funcion.complejidad}
                        </td>
                        <td className="py-2 px-2 md:px-3 border-b text-center">
                          {calcularPeso(funcion.tipo, funcion.complejidad)}
                        </td>
                        <td className="py-2 px-2 md:px-3 border-b text-center">
                          {funcion.cantidad}
                        </td>
                        <td className="py-2 px-2 md:px-3 border-b text-center">
                          {calcularPonderacion(
                            funcion.tipo,
                            funcion.complejidad,
                            funcion.cantidad
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="flex flex-col md:flex-row justify-end mt-4 my-0">
            <Link
              to={`/fasePFAjustado/${params.id}`}
              className="bg-green-500 text-white px-4 py-2 rounded text-center hover:bg-green-600"
            >
              Ir a la Fase 3
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalcuiloPFSA;

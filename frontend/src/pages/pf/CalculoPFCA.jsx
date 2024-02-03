import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import Breadcrumbs from "../../components/Breadcrumbs ";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCalculator } from "@fortawesome/free-solid-svg-icons";
const CalculoPFCA = () => {
  const { datosPuntosFuncion, getPuntosFuncion, sumaValorFactoresAjuste } =
    useEstimacionPF();
  const [arreglo, setArreglo] = useState([]);
  const params = useParams();

  const routes = [
    { path: '/proyects', displayName: 'Inicio' },
    { path: `/fases/${params.id}`, displayName: 'Fases del Proyecto'},
    { path: `/calculopfca/${params.id}`, displayName: 'Fase 4: Puntos de Función con Ajuste'}
  ];

  useEffect(() => {
    document.title = 'Fase 4 - App costos';
    async function loadFunciones() {
      await sumaValorFactoresAjuste(params.id);
      await getPuntosFuncion(params.id);
    }
    loadFunciones();
  }, []);

  const handleCalcularPuntos = async () => {
    try {
      setArreglo(datosPuntosFuncion.functionPoints[0].calculoCA);
      console.log(datosPuntosFuncion.functionPoints[0].calculoCA);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-start h-screen flex-col bg-CCE3FF mt-4">
      <div className="w-full max-w-screen-lg mb-2 text-center bg-white p-6 rounded-md shadow-md">
      <Breadcrumbs routes={routes} />
        <h1 className="text-blue-950 text-2xl font-bold mb-8 mt-2">
          Fase 4: Cálculo de Puntos de Función con Ajuste
        </h1>

        <button
          className="mb-4 block bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded mx-auto transition-transform transform-gpu active:scale-95"
          onClick={handleCalcularPuntos}
        >
          Calcular PF con ajuste
          <FontAwesomeIcon icon={faCalculator} className="ml-2" />
        </button>

        {arreglo > 0 && (
          <div className="bg-gray-200 p-4 rounded-md mt-6">
            <p className="mb-2 text-blue-700 font-bold">
              Puntos de Función Totales (con ajuste): {arreglo.toFixed(2)}
              <br />
            </p>

            <div className="text-base mb-8">
              <b>
                <p className="text-gray-800 mt-4">
                  Pasos realizados para el cálculo:
                </p>
              </b>
              <p className="text-gray-800 mt-4">
                {" "}
                <b>Formula: </b> <br /> <b>PFAjustados =</b> Puntos de función sin ajuste * (0.65 + 0.01
                * Factores de Ajuste)
              </p>
              <p className="text-gray-800 mt-2">
                {" "}
                <b>PFAjustados =</b>{" "}
                {datosPuntosFuncion.functionPoints[0].calculoSA} * (0.65 + 0.01
                * {datosPuntosFuncion.functionPoints[0].SumaFA})
              </p>
              <p className="text-gray-800 mt-4">
                <b>PFAjustados =</b>{" "}
                {datosPuntosFuncion.functionPoints[0].calculoSA} * (
                {0.65 + 0.01 * datosPuntosFuncion.functionPoints[0].SumaFA})
              </p>
              <p className="text-gray-800 mt-4">
                {" "}
                <b>PFAjustados =</b> <b></b>
                {arreglo.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-end mt-4">
              <Link
                to={`/esfuerzopf/${params.id}`}
                className="bg-green-500 text-white px-4 py-2 rounded text-center hover:bg-green-600"
              >
                Ir a la Fase 5
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculoPFCA;

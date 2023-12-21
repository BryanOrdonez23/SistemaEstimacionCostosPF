import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEstimacionPF } from "../../context/EstimacionPFContext";

const CalculoPFCA = () => {
  const { datosPuntosFuncion, getPuntosFuncion, sumaValorFactoresAjuste } = useEstimacionPF();
  const [arreglo, setArreglo] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function loadFunciones() {
      await sumaValorFactoresAjuste(params.id);
      await getPuntosFuncion(params.id);
    }
    loadFunciones();
  }, []);

  const handleCalcularPuntos = async () => {
    try {
        setArreglo(datosPuntosFuncion.functionPoints[0].calculoCA);
        console.log(arreglo);
        
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen flex-col bg-blue-100">
      <br />
      <div className="max-w-2xl mb-4 text-center bg-white p-6 rounded-md shadow-md">
        <h1 className="text-blue-950 text-3xl font-bold mb-4">
          Puntos de Función sin Ajustar
        </h1>

        <button
          className="block bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded w-full transition-transform transform-gpu active:scale-95"
          onClick={handleCalcularPuntos}
        >
          Calcular Puntos de Función
        </button>

        {arreglo > 0 &&(
          <div className="bg-gray-200 p-4 rounded-md mt-4">
            <p className="mb-2 text-blue-700 font-bold">
              Puntos de Función Totales (con ajuste): {arreglo.toFixed(2)}
              <br />
            </p>

            <div className="text-base">
              <b><p className="text-gray-800">Pasos realizados para el cálculo:</p></b>
              <p className="text-gray-800"> <b>Formula: </b> <br /> PFAjustados = PFSA x (0.65 + 0.01 * Factores de Ajuste)</p>
              <p className="text-gray-800"> PFAjustados = {datosPuntosFuncion.functionPoints[0].calculoSA} x (0.65 + 0.01 * {datosPuntosFuncion.functionPoints[0].SumaFA})</p>
              <p className="text-gray-800"> PFAjustados = {datosPuntosFuncion.functionPoints[0].calculoSA} x ({0.65 + 0.01 * datosPuntosFuncion.functionPoints[0].SumaFA})</p>
              <p className="text-gray-800"> PFAjustados = <b></b>{arreglo.toFixed(2)}</p>
            
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculoPFCA;

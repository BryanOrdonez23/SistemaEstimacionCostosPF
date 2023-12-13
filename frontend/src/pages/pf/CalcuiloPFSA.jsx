import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEstimacionPF } from '../../context/EstimacionPFContext';
import { useFunctions } from '../../context/FunctionsContext';

const CalcuiloPFSA = () => {
  const { puntosFuncionTotal, pfsaCalculo } = useEstimacionPF();
  const { getFunctions, funciones} = useFunctions();
  const params = useParams();

  useEffect(() => {
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

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="max-w-md mb-4 text-center">
        <h1 className="text-blue-800 text-3xl font-bold mb-4">Puntos de Función sin Ajustar</h1>
  
        <button
          className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mx-auto mb-4 w-full transition-transform transform-gpu active:scale-95"
          onClick={handleCalcularPuntos}
        >
          Calcular Puntos de Función
        </button>
  
        {puntosFuncionTotal !== 0 && (
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="mb-2 text-blue-500 font-bold">
              Puntos de Función Totales (sin ajustar): {puntosFuncionTotal}
            </p>
  
            <div className="text-base">
              <p className="text-gray-800">Fórmula:</p>
              <p className="text-gray-800">PF = Σ (Cantidad * Ponderación)</p>
            </div>
          </div>
        )}
      </div>
  
      <div className={`max-w-2xl ${funciones.length > 5 ? 'overflow-y-auto max-h-80' : ''} overflow-x-auto`}>
        {funciones.length === 0 ? (
          <h1 className="text-xl mb-4">No hay funciones agregadas</h1>
        ) : (
          <table className="min-w-full bg-gray-600 border border-gray-600 text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left text-white">Funcionalidad</th>
                <th className="py-2 px-4 border-b text-left text-white">Tipo</th>
                <th className="py-2 px-4 border-b text-left text-white">Complejidad</th>
                <th className="py-2 px-4 border-b text-left text-white">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {funciones.map((funcion) => (
                <tr key={funcion._id} className="hover:bg-gray-700">
                  <td className="py-2 px-4 border-b">{funcion.funcionalidad}</td>
                  <td className="py-2 px-4 border-b">{funcion.tipo}</td>
                  <td className="py-2 px-4 border-b">{funcion.complejidad}</td>
                  <td className="py-2 px-4 border-b">{funcion.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );  
};

export default CalcuiloPFSA;

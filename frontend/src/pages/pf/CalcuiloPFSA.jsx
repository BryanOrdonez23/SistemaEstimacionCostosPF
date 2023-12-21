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
    
    <div className="flex items-center justify-center h-screen flex-col bg-blue-100">
      <br />
      <div className="max-w-md mb-4 text-center bg-white p-6 rounded-md shadow-md">
        <h1 className="text-blue-950 text-3xl font-bold mb-4">Puntos de Función sin Ajustar</h1>
  
        <button
          className="block bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded w-full transition-transform transform-gpu active:scale-95"
          onClick={handleCalcularPuntos}
        >
          Calcular Puntos de Función
        </button>
  
        {puntosFuncionTotal !== 0 && (
          <div className="bg-gray-200 p-4 rounded-md mt-4">
            <p className="mb-2 text-blue-700 font-bold">
              Puntos de Función Totales (sin ajustar): {puntosFuncionTotal}
            </p>
  
            <div className="text-base">
              <p className="text-gray-800">Fórmula:</p>
              <p className="text-gray-800">PF = Σ (Cantidad * Ponderación)</p>
            </div>
          </div>
        )}
      </div>
  
      <div className={`max-w-2xl overflow-x-auto ${funciones.length > 5 ? 'overflow-y-auto max-h-100' : ''} bg-white p-6 rounded-md shadow-md mt-4`}>
        {funciones.length === 0 ? (
          <h1 className="text-xl mb-4">No hay funciones agregadas</h1>
        ) : (
          <table className="min-w-fullmin-w-full bg-gray-200 border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left text-black">Funcionalidad</th>
                <th className="py-2 px-4 border-b text-left text-black">Tipo</th>
                <th className="py-2 px-4 border-b text-left text-black">Complejidad</th>
                <th className="py-2 px-4 border-b text-left text-black">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {funciones.map((funcion) => (
                <tr key={funcion._id} className="hover:bg-gray-300">
                  <td className="py-2 px-4 border-b text-black">{funcion.funcionalidad}</td>
                  <td className="py-2 px-4 border-b text-black">{funcion.tipo}</td>
                  <td className="py-2 px-4 border-b text-black">{funcion.complejidad}</td>
                  <td className="py-2 px-4 border-b text-black">{funcion.cantidad}</td>
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

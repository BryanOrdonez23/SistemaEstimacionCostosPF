import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEstimacionPF } from '../../context/EstimacionPFContext';
import { useFunctions } from '../../context/FunctionsContext';
import Breadcrumbs from "../../components/Breadcrumbs ";

const CalcuiloPFSA = () => {
  const { puntosFuncionTotal, pfsaCalculo } = useEstimacionPF();
  const { getFunctions, funciones} = useFunctions();
  const params = useParams();

  useEffect(() => {
    document.title = 'Fase 2 - App costos';
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
      'EI': { 'Alta': 6, 'Media': 4, 'Baja': 3 },
      'EO': { 'Alta': 7, 'Media': 5, 'Baja': 4 },
      'EQ': { 'Alta': 6, 'Media': 4, 'Baja': 3 },
      'ILF': { 'Alta': 15, 'Media': 10, 'Baja': 7 },
      'EIF': { 'Alta': 10, 'Media': 10, 'Baja': 5 },
    };
  
    // Obtener el peso correspondiente
    const peso = pesos[tipo][complejidad];
  
    return peso;
  };

  const calcularPonderacion = (tipo, complejidad, cantidad) => {
    // Definir los valores de ponderación según el tipo y la complejidad
    const ponderaciones = {
      'EI': { 'Alta': 6, 'Media': 4, 'Baja': 3 },
      'EO': { 'Alta': 7, 'Media': 5, 'Baja': 4 },
      'EQ': { 'Alta': 6, 'Media': 4, 'Baja': 3 },
      'ILF': { 'Alta': 15, 'Media': 10, 'Baja': 7 },
      'EIF': { 'Alta': 10, 'Media': 10, 'Baja': 5 },
    };

    // Obtener la ponderación correspondiente
    const ponderacion = ponderaciones[tipo][complejidad];

    // Calcular el valor de la ponderación
    const valorPonderacion = ponderacion * cantidad;

    return valorPonderacion;
  };
  const routes = [
    { path: '/proyects', displayName: 'Inicio' },
    { path: `/fases/${params.id}`, displayName: 'Fases del Proyecto' }
  ];

  return (
    
    <div className="flex flex-col items-center justify-start min-h-screen bg-CCE3FF mt-4">
      <div className="w-full max-w-screen-lg mb-4 text-center bg-white p-6 rounded-md shadow-md">
      <Breadcrumbs routes={routes} />
        <h1 className="text-blue-950 text-3xl font-bold mb-4"> Fase 2: Cálculo de Puntos de Función sin Ajustar</h1>
  
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
              <p className="text-gray-800">PFSA = Σ (Cantidad * Peso)</p>
            </div>
          </div>
        )}
      </div>
  
      <div className="w-full max-w-screen-lg">
      <div className={` overflow-x-auto ${funciones.length > 7 ? 'overflow-y-auto  max-h-[370px]' : ''} bg-white p-6 rounded-md shadow-md mt-1`}>
      <h1 className='text-gray-800 text-2xl text-center font-bold mb-2'>Listado de funcionalidades</h1>
        {funciones.length === 0 ? (
          <h1 className="text-xl mb-4">No hay funciones agregadas</h1>
        ) : (
          <table className="w-full bg-gray-200 border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left text-black">Funcionalidad</th>
                <th className="py-2 px-4 border-b text-left text-black">Tipo</th>
                <th className="py-2 px-4 border-b text-left text-black">Complejidad</th>
                <th className="py-2 px-4 border-b text-left text-black">Peso</th>
                <th className="py-2 px-4 border-b text-left text-black">Cantidad</th>
                <th className="py-2 px-4 border-b text-left text-black">Total</th>
              </tr>
            </thead>
            <tbody>
              {funciones.map((funcion) => (
                <tr key={funcion._id} className="hover:bg-gray-300">
                  <td className="py-2 px-4 border-b text-black">{funcion.funcionalidad}</td>
                  <td className="py-2 px-4 border-b text-black text-center">{funcion.tipo}</td>
                  <td className="py-2 px-4 border-b text-black text-center">{funcion.complejidad}</td>
                  <td className="py-2 px-4 border-b text-black text-center">{calcularPeso(funcion.tipo, funcion.complejidad)}</td>
                  <td className="py-2 px-4 border-b text-black text-center">{funcion.cantidad}</td>
                  <td className="py-2 px-4 border-b text-black text-center">{calcularPonderacion(funcion.tipo, funcion.complejidad, funcion.cantidad)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex flex-col md:flex-row justify-end mt-5 my-10">
        <Link
          to={`/fasePFAjustado/${params.id}`}
          className="bg-green-500 text-white px-4 py-2 rounded text-center hover:bg-green-600"
        >
          Ir a la Fase 3
        </Link>
      </div>
    </div>
    </div>
  );
   
};

export default CalcuiloPFSA;

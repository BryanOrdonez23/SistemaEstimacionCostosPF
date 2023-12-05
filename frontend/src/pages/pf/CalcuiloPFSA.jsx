import React, { useState } from 'react';
import { calcuarPFSA } from '../../api/pf';
import { Link, useParams } from 'react-router-dom';

const CalcuiloPFSA = () => {
  const [puntosFuncionTotal, setPuntosFuncionTotal] = useState(null);
  const params = useParams();

  const handleCalcularPuntos = async () => {
    try {
      const response = await calcuarPFSA(params.id);

      // Analizar la respuesta JSON
      const data = response.data;

      // Actualizar el estado con los puntos de función calculados
      setPuntosFuncionTotal(data.puntosFuncionTotal);
    } catch (error) {
      console.error(error);
      // Manejar errores, mostrar un mensaje al usuario, etc.
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Puntos de Función sin Ajustar</h1>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCalcularPuntos}
        >
          Calcular Puntos de Función
        </button>

        {puntosFuncionTotal !== null && (
          <div className="mt-4">
            <p>
              Puntos de Función Totales (sin ajustar): {puntosFuncionTotal}
            </p>

            <div className="mt-4 text-base">
              <p>Fórmula:</p>
              <p>
                PF = Σ (Cantidad * Ponderación)
              </p>
            </div>
          </div>
        )}

        {/* Agrega más elementos aquí según tus necesidades */}
      </div>
    </div>
  );
};

export default CalcuiloPFSA;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProyect } from "../../context/ProyectContext";
import { useForm } from "react-hook-form";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import { useParams } from "react-router-dom";

const FactoresAjuste = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { getFactoresAjuste} = useEstimacionPF();
  const { getProyect, proyect } = useProyect();
  const params = useParams();
  const factoresAjuste = {
    factoresAjuste: [
      {
        FA1: "Comunicación de datos",
        FA2: "Procesamiento distribuido",
        FA3: "Objetivos de rendimiento",
        FA4: "Configuración del equipamiento",
        FA5: "Tasa de transacciones",
        FA6: "Entrada de datos en línea",
        FA7: "Interfaz con el usuario",
        FA8: "Actualizaciones en línea",
        FA9: "Procesamiento complejo",
        FA10: "Reusabilidad del código",
        FA11: "Facilidad de implementación",
        FA12: "Facilidad de operación",
        FA13: "Instalaciones múltiples",
        FA14: "Facilidades de cambio",
      },
    ],
  };
  useEffect(() => {
    async function loadFactoresAjuste() {
      const res = await getFactoresAjuste();
      console.log(res);
    }
    loadFactoresAjuste();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  const factoresAjusteSubset = factoresAjuste.factoresAjuste[0];
  const factoresAjusteKeys = Object.keys(factoresAjusteSubset);

  return (
    <div>
      <div className="max-w-6xl mx-auto mt-10 p-7 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-black">
          Factores de Ajuste
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            {factoresAjusteKeys.map((key) => (
              <div key={key} className="mb-4 flex items-center">
                <h3 className="text-gray-950 text-base font-medium mr-2">{factoresAjusteSubset[key]}:</h3>
                <div className="flex space-x-4">
                  {[0, 1, 2, 3, 4, 5].map((option) => (
                    <label key={option} className="text-gray-600">
                      <input
                        type="radio"
                        name={key}
                        value={option}
                        className="mr-2"
                        {...register(key, { required: true })}
                        required
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <br />
          <div className=" flex justify-center">
          <button
            type="submit"
            className="w-80 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Guardar
          </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default FactoresAjuste;

// Fases.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProyect } from "../../context/ProyectContext";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import { useParams } from "react-router-dom";

const Fase = ({ title, description, path }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md transition duration-300 ease-in-out transform hover:scale-105 my-4 mx-2">
      <h2 className="text-gray-600 text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link
        to={path}
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Ir al detalle
      </Link>
    </div>
  );
};

const Fases = () => {
  const params = useParams();
  const { getProyect, proyect } = useProyect();
  const { setPuntosFuncionTotal } = useEstimacionPF();

  useEffect(() => {
    async function loadFunciones() {
      if (params.id) {
        const res = await getProyect(params.id);
        console.log(res);
        setPuntosFuncionTotal(0);
      }
    }
    loadFunciones();
  }, []);

  return (
    <div className="flex justify-center mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 w-full max-w-8xl">
        <Fase
          title="Fase 1"
          description="Agregar funcionalidades del software"
          path={`/funciones/${proyect._id}`}
        />
        <Fase
          title="Fase 2"
          description="Cálculo de puntos de función sin el ajuste"
          path={`/calculopfsa/${proyect._id}`}
        />
        <Fase
          title="Fase 3"
          description="Ingreso de factores de ajuste"
          path={`/fasePFAjustado/${proyect._id}`}
        />
        <Fase
          title="Fase 4"
          description="Calculo de puntos de función con el ajuste"
          path={`/calculopfca/${proyect._id}`}
        />
        <Fase
          title="Fase 5"
          description="Calculo del esfuerzo y presunto costo del software"
          path={`/esfuerzopf/${proyect._id}`}
        />
                <Fase
          title="Fase 5"
          description="Calculo del esfuerzo y presunto costo del software"
          path={`/esfuerzopf/${proyect._id}`}
        />
                <Fase
          title="Fase 5"
          description="Calculo del esfuerzo y presunto costo del software"
          path={`/esfuerzopf/${proyect._id}`}
        />
      </div>
    </div>
  );
};

export default Fases;

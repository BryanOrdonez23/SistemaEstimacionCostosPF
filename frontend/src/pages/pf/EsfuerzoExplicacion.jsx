import React, { useEffect, useState } from "react";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs ";
function EsfuerzoExplicacion() {
  const { getPuntosFuncion, datosPuntosFuncion, errors } = useEstimacionPF();
  const [bandera, setBandera] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function loadFunciones() {
      await getPuntosFuncion(params.id);
      setBandera(true);
    }
    loadFunciones();
  }, []);
  const routes = [
    { path: '/proyects', displayName: 'Inicio' },
    { path: `/fases/${params.id}`, displayName: 'Fases del proyecto' },
    { path: `/esfuerzopf/${params.id}`, displayName: 'Fase 5: Cálculo del Esfuerzo del Proyecto'},
    { path: `/esfuerzoExplicacion/${params.id}`, displayName: 'Detalles'}
  ];

  return (
    <div className="flex items-center justify-center w-full flex-col bg-CCE3FF my-4">
      <div className="max-w-3x1 mb-4 text-center bg-white p-6 rounded-md shadow-md">
      <Breadcrumbs routes={routes} />
        <h1 className="text-blue-950 text-3xl font-bold mb-4">
          Detalles del cálculo del esfuerzo del proyecto
        </h1>

        {bandera && (
          <div className="bg-gray-200 p-8 rounded-md mt-18">
            <p className=" text-gray-800 mb-2 text-left">
              Para el cálculo del esfuerzo se toma en cuenta el trabajo de un
              equipo que trabaja {datosPuntosFuncion.functionPoints[0].horasDia}{" "}
              horas al día durante{" "}
              {datosPuntosFuncion.functionPoints[0].diasTrabajados} días al mes
            </p>
            <div className="text-lg">
              <p className="text-gray-800 mb-2">
                <span className="font-semibold">1. Fórmula:</span> <br />
                <span className="italic"> Esfuezo = PFA * (H/PF)</span>
              </p>
              <p className="text-gray-800 mb-2">
                <span className="font-semibold">Donde: </span> <br />
                <span className="italic">
                  PFA = Puntos de función ajustados.
                </span>{" "}
                <br />
                <span className="italic">
                  H/PF = Horas por puntos de función
                </span>
              </p>
            </div>
            <p className="text-gray-800 mb-2 text-left">
              {" "}
              Aplicando la formula se obtiene lo siguiente:
            </p>
            <div className="text-lg">
              <p className="text-gray-800 mb-2">
                <span className="italic">
                  Esfuerzo =
                  {datosPuntosFuncion.functionPoints[0].calculoCA.toFixed(2)} * {datosPuntosFuncion.functionPoints[0].horasPF}
                  <br />
                  Esfuerzo ={" "}
                  <b>
                    {datosPuntosFuncion.functionPoints[0].esfuerzo.toFixed(2)}
                  </b>
                </span>{" "}
              </p>
            </div>
            <p className="text-gray-800 mb-2 text-left">
              {" "}
              Ahora obtendremos los días de trabajo estimados:
            </p>
            <div className="text-lg">
              <p className="text-gray-800 mb-2">
                <span className="italic">
                  DiasTrabajo = Esfuerzo / Horas por día <br />
                  DiasTrabajo ={" "}
                  {datosPuntosFuncion.functionPoints[0].esfuerzo.toFixed(
                    2
                  )} / {datosPuntosFuncion.functionPoints[0].horasDia}
                  <br />
                  DiasTrabajo ={" "}
                  <b>
                    {datosPuntosFuncion.functionPoints[0].diasEstimados.toFixed(
                      2
                    )}
                  </b>
                </span>{" "}
              </p>
            </div>
            <p className="text-gray-800 mb-2 text-left">
              Por ultimo se calcularán los meses de trabajo estimados para el
              proyecto:{" "}
            </p>
            <div className="text-lg">
              <p className="text-gray-800 mb-2">
                <span className="italic">
                  MesesTrabajo = Dias de trabajo / Dias por mes trabajados{" "}
                  <br />
                  MesesTrabajo ={" "}
                  {datosPuntosFuncion.functionPoints[0].diasEstimados.toFixed(
                    2
                  )}{" "}
                  / {datosPuntosFuncion.functionPoints[0].diasTrabajados}
                  <br />
                  MesesTrabajo ={" "}
                  <b>
                    {datosPuntosFuncion.functionPoints[0].mesesEstimados.toFixed(
                      2
                    )}
                  </b>
                </span>{" "}
              </p>
            </div>
            <p className="text-gray-800 mb-2 text-left ">
              Por lo tanto, el esfuerzo del proyecto es de{" "}
              <b>
                {" "}
                {datosPuntosFuncion.functionPoints[0].mesesEstimados.toFixed(
                  2
                )}{" "}
              </b>{" "}
              meses de trabajo.
            </p>
          </div>
        )}
        <br />
        <div className="flex flex-col md:flex-row justify-between mt-5">
        <Link
          to={`/fases/${params.id}`}
          className="bg-blue-500 hover:bg-blue-600 font-semibold text-center text-white px-3 py-2 rounded mb-2 md:mb-0"
        >
          Fases del proyecto
        </Link>
        <Link
          to={`/presupuesto/${params.id}`}
          className="bg-green-500 text-white px-4 py-2 rounded text-center hover:bg-green-600"
        >
          Ir a la Fase 6
        </Link>
      </div>
      </div>
    </div>
  );
}

export default EsfuerzoExplicacion;

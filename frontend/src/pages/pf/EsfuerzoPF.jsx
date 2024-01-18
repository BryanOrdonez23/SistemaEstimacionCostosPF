import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import {useProyect} from "../../context/ProyectContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs ";

const EsfuerzoPF = () => {
  const { actualizarDatosPF, getPuntosFuncion, datosPuntosFuncion } =
    useEstimacionPF();
  const {proyect, getProyect} = useProyect();

  const { register, handleSubmit } = useForm();
  const [showHorasInfo, setShowHorasInfo] = useState(false);
  const [showDiasInfo, setShowDiasInfo] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [bandera, setBandera] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    document.title = 'Fase 5 - App costos';
    async function loadFunciones() {
      const res = await getPuntosFuncion(params.id);
      await getProyect(params.id);
      if (res.functionPoints[0].esfuerzo > 0) {
        setBandera(true);
      }
    }
    loadFunciones();
  }, []);

  const handleMouseEnter = (infoType) => {
    if (infoType === "horas") {
      setShowHorasInfo(true);
    } else if (infoType === "dias") {
      setShowDiasInfo(true);
    }
  };

  const handleMouseLeave = () => {
    setShowHorasInfo(false);
    setShowDiasInfo(false);
  };

  const toggleTableModal = () => {
    setShowTableModal(!showTableModal);
  };

  const onSubmit = handleSubmit(async (data) => {
    await actualizarDatosPF(params.id, data);
    navigate(`/esfuerzoExplicacion/${params.id}`);
  });

  const routes = [
    { path: '/proyects', displayName: 'Inicio' },
    { path: `/fases/${params.id}`, displayName: 'Fases del Proyecto' }
  ];

  return (
    <div className="flex items-center justify-center w-full flex-col bg-blue-100">
      <div className="w-full max-w-screen-md mb-4 text-center bg-white p-8 rounded-md shadow-md mt-5">
        <Breadcrumbs routes={routes} />
        <h1 className="text-blue-950 text-4xl font-bold mb-6">
          Fase 5: Cálculo del Esfuerzo del Proyecto
        </h1>

        {bandera && (
          <div className="bg-gray-200 p-8 rounded-md mt-6">
            <p className="text-gray-800 mb-2">
              Existe un calculo existente del esfuerzo del proyecto de : {" "} 
              <b>{datosPuntosFuncion.functionPoints[0].mesesEstimados.toFixed(1)}</b>{" "}
              meses estimados.
            </p>
            <Link
              to={`/esfuerzoExplicacion/${params.id}`}
              className="block text-blue-900"
            >
              Ver detalles
            </Link>
          </div>
        )}

        <div className="bg-gray-200 p-8 rounded-md mt-6">
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
              <span className="italic">H/PF = Horas por puntos de función</span>
            </p>
          </div>
        </div>
        <div className="bg-gray-200 p-8 rounded-md mt-4">
          <p className="text-gray-800 mb-2">
            Previo al cálculo del esfuerzo del proyecto, se debe ingresar la
            siguiente información:
          </p>
        </div>
        <br />
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              className="flex text-gray-600 text-sm font-medium mb-2"
              onMouseEnter={() => handleMouseEnter("horas")}
              onMouseLeave={handleMouseLeave}
            >
              Horas PF de acuerdo a la tecnología
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="ml-2 text-blue-500 cursor-pointer"
                onClick={toggleTableModal}
              />
              {showHorasInfo && (
                <div className="tooltip">
                  Clic para información adicional.
                </div>
              )}
            </label>
            <input
              type="number"
              id="horasPF"
              name="horasPF"
              placeholder="Horas de PF de acuerdo a la tecnología"
              className="w-full border p-2 rounded text-black"
              required
              {...register("horasPF", { required: true })}
            />
          </div>

          <div className="mb-4">
            <label className="flex text-gray-600 text-sm font-medium mb-2">
              Días al mes que se trabajarán en el proyecto
            </label>
            <input
              id="diasTrabajados"
              name="diasTrabajados"
              type="number"
              placeholder="Días laborados en el mes"
              className="w-full border p-2 rounded resize-none text-black"
              required
              {...register("diasTrabajados", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-600 text-sm font-medium mb-2">
              Horas al día que se trabajarán en el proyecto
            </label>
            <input
              id="horasDia"
              name="horasDia"
              type="number"
              placeholder="Horas al dia"
              className="w-full border p-2 rounded resize-none text-black"
              required
              {...register("horasDia", { required: true })}
            />
          </div>
          {showTableModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={toggleTableModal}>
                  &times;
                </span>
                <h1 className="text-blue-950 font-bold mb-4">Tecnologia seleccionada: {proyect.technology} </h1>
                <table className="w-full border p-2 rounded text-black">
                  <thead>
                    <tr>
                      <th>Lenguaje</th>
                      <th>Horas PF (Rango)</th>
                      <th>Horas PF (Promedio)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ensamblador</td>
                      <td>20 – 30</td>
                      <td>25</td>
                    </tr>
                    <tr>
                      <td>COBOL</td>
                      <td>10 – 20</td>
                      <td>15</td>
                    </tr>
                    <tr>
                      <td>Lenguaje de 4ta Generación</td>
                      <td>5 – 10</td>
                      <td>8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <button className="block bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded w-full transition-transform transform-gpu active:scale-95">
            Calcular el Esfuerzo del Proyecto
          </button>
        </form>
      </div>
    </div>
  );
};

export default EsfuerzoPF;

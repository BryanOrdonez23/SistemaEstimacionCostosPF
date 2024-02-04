import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import { useProyect } from "../../context/ProyectContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faCalculator } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs ";
import Nota from "../../components/Nota";

const EsfuerzoPF = () => {
  const { actualizarDatosPF, getPuntosFuncion, datosPuntosFuncion, errors } =
    useEstimacionPF();
  const { proyect, getProyect } = useProyect();

  const {
    register,
    handleSubmit,
    formState: { errors: errorsForm },
  } = useForm();
  const [showHorasInfo, setShowHorasInfo] = useState(false);
  const [showDiasInfo, setShowDiasInfo] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [bandera, setBandera] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    document.title = "Fase 5 - App costos";
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
    const datos = {
      horasPF: parseInt(data.horasPF, 10),
      diasTrabajados: parseInt(data.diasTrabajados, 10),
      horasDia: parseInt(data.horasDia, 10),
    };

    const res = await actualizarDatosPF(params.id, datos);

    if (res) {
      navigate(`/esfuerzoExplicacion/${params.id}`);
    }
  });

  const routes = [
    { path: "/proyects", displayName: "Inicio" },
    { path: `/fases/${params.id}`, displayName: "Fases del Proyecto" },
    {
      path: `/esfuerzopf/${params.id}`,
      displayName: "Fase 5: Esfuerzo del Proyecto",
    },
  ];

  return (
    <div className="flex items-center justify-center w-full flex-col bg-blue-100">
      <div className="w-full max-w-screen-lg mb-4 text-center bg-white p-8 rounded-md shadow-md mt-5">
        <Breadcrumbs routes={routes} />
        <h1 className="text-blue-950 text-2xl font-bold mb-6">
          Fase 5: Cálculo del Esfuerzo del Proyecto
        </h1>

        {bandera && (
          <div className="bg-gray-200 p-8 rounded-md mt-2">
            <p className="text-gray-800  text-sm">
              Existe un cálculo existente del esfuerzo del proyecto de: {" "}
              <b>
                {datosPuntosFuncion.functionPoints[0].mesesEstimados.toFixed(1)}
              </b>{" "}
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

        <div className="bg-gray-200 p-8 rounded-md mt-2">
          <div className="text-base">
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
        <div className="rounded-md mt-4 my-6">
          <Nota>
            Previo al cálculo del esfuerzo del proyecto, es necesario llenar
            datos relacionados con el método de PF.
          </Nota>
        </div>
        {errors.map((error, i) => (
          <div
            className="bg-red-500 text-sm p-2 text-white text-center my-2 rounded"
            key={i}
          >
            {error}
          </div>
        ))}
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
                <div className="tooltip">Clic para información adicional.</div>
              )}
            </label>
            <input
              type="number"
              id="horasPF"
              name="horasPF"
              placeholder="Horas de PF de acuerdo a la tecnología"
              className="w-full border p-2 rounded text-black"
              {...register("horasPF", {
                required: "Las horas de PF son requeridas",
              })}
            />
            {errorsForm.horasPF && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errorsForm.horasPF.message}
              </p>
            )}
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
              {...register("diasTrabajados", {
                required: "Los dias laborados por més son requeridos",
              })}
            />
            {errorsForm.diasTrabajados && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errorsForm.diasTrabajados.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="flex text-gray-600 text-sm font-medium mb-2">
              Horas al día que se trabajarán en el proyecto
            </label>
            <input
              id="horasDia"
              name="horasDia"
              type="number"
              placeholder="Horas al dia trabajadas"
              className="w-full border p-2 rounded resize-none text-black"
              {...register("horasDia", {
                required: "Las horas trabajadas por dia son requeridas.",
              })}
            />
            {errorsForm.horasDia && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errorsForm.horasDia.message}
              </p>
            )}
          </div>
          {showTableModal && (
            <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
              <div className="modal-overlay fixed w-full h-full bg-gray-800 opacity-50"></div>

              <div className="modal-content bg-white w-96 mx-auto rounded shadow-lg z-50 p-4">
                <span
                  className="close absolute top-0 right-0 p-4"
                  onClick={toggleTableModal}
                >
                  &times;
                </span>

                <h1 className="text-blue-950 font-semibold text-base mb-4">
                  Tecnologia seleccionada en el prente proyecto: {proyect.technology}
                </h1>

                <table className="w-full border-collapse border p-2 rounded text-black">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-2 px-4 text-center font-semibold">
                        Lenguaje
                      </th>
                      <th className="py-2 px-4 text-center font-semibold">
                        Horas PF (Rango)
                      </th>
                      <th className="py-2 px-4 text-center font-semibold">
                        Horas PF (Promedio)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-100">
                      <td className="py-2 px-4 text-center">Ensamblador</td>
                      <td className="py-2 px-4 text-center">20 – 30</td>
                      <td className="py-2 px-4 text-center">25</td>
                    </tr>
                    <tr className="hover:bg-gray-100">
                      <td className="py-2 px-4 text-center">COBOL</td>
                      <td className="py-2 px-4 text-center">10 – 20</td>
                      <td className="py-2 px-4 text-center">15</td>
                    </tr>
                    <tr className="hover:bg-gray-100">
                      <td className="py-2 px-4 text-center">
                        Lenguaje de 3ra y 4ta Generación
                      </td>
                      <td className="py-2 px-4 text-center">5 – 10</td>
                      <td className="py-2 px-4 text-center">8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <button className="block bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded mx-auto transition-transform transform-gpu active:scale-95">
            Calcular el Esfuerzo del Proyecto
            <FontAwesomeIcon icon={faCalculator} className="ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default EsfuerzoPF;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import { useProyect } from "../../context/ProyectContext";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs ";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faDollarSign, faArrowRight, faInfoCircle, faCalculator} from "@fortawesome/free-solid-svg-icons";
import  Nota from "../../components/Nota";
const Presupuesto = () => {
  const {
    actualizarDatosPF,
    getPuntosFuncion,
    datosPuntosFuncion,
    sumatoriaCostosInvolucrados,
    promedioSueldosInvolucrados,
    contarInvolucrados,
    sumaotroGastos,
    calculoPresupuesto,
    calcularPresupuestoEstimado,
  } = useEstimacionPF();
  const { proyect, getProyect } = useProyect();

  const { register, handleSubmit } = useForm();
  const [conteo, setconteo] = useState(0);
  const [prom, setprom] = useState(0);
  const [sumaotrosGastos, setsumaotrosGastos] = useState(0);
  const [mesesEstimados, setmesesEstimados] = useState(0);
  const [presupuesto, setpresupuesto] = useState("");
  const [bandera, setBandera] = useState(false);
  const [bandera2, setBandera2] = useState(false);  
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    document.title = 'Fase 6 - App costos';
    async function loadFunciones() {
      try {
        const promedio = await promedioSueldosInvolucrados(params.id);
        const contar = await contarInvolucrados(params.id);
        const sumaOtrosGastos = await sumaotroGastos(params.id);

        const res = await getPuntosFuncion(params.id);

        setconteo(contar.numeroInvolucrados);
        setprom(promedio.promedio);

        console.log(promedio)

        if (sumaOtrosGastos.totalCosto > 0) {
          setsumaotrosGastos(sumaOtrosGastos.totalCosto);
        } else {
          setsumaotrosGastos(0);
        }
        console.log(res.functionPoints[0]);
        if (res.functionPoints[0].mesesEstimados > 0) {
          carga(res.functionPoints[0].mesesEstimados.toFixed(2));
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadFunciones();
    carga();
  }, [bandera]);



  const carga = async (meses) => {
    setmesesEstimados(meses);
  };
  const routes = [
    { path: '/proyects', displayName: 'Inicio' },
    { path: `/fases/${params.id}`, displayName: 'Fases del Proyecto'},
    { path: `/presupuesto/${params.id}`, displayName: 'Fase 6: Presupuesto del Proyecto'},
  ];
  const mostrar = async () => {
    try {
      const presu = await calcularPresupuestoEstimado(params.id);
      const mensaje =
        "El presupuesto estimado del proyecto es = " +
        presu.toFixed(2) +
        " $";
      setpresupuesto(mensaje);
      setBandera2(true);

      if (conteo >= 1 && mesesEstimados > 0 && prom > 0) {
        setBandera(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full flex-col bg-blue-100 ">
      <div className="w-full max-w-screen-lg mt-6 text-center bg-white p-8 rounded-md shadow-md">
        <Breadcrumbs routes={routes} />
        <h1 className="text-blue-950 text-2xl font-bold mb-1">
          Fase 6: Presupuesto del proyecto
        </h1>
        <div className="flex justify-between mb-4 mt-8">
          <Link
            to={`/involucrados/${params.id}`}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-6 rounded"
          >
             <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Gestionar Involucrados
          </Link>
          <Link
            to={`/otrosGastos/${params.id}`}
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-6 rounded"
          >
            <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
            Gestionar Otros Gastos
          </Link>
        </div>

        <Nota>
        Antes de realizar el cálculo del esfuerzo es necesario agregar los
        involucrados y otros gastos del proyecto.
      </Nota>

        <div className="bg-gray-200 p-8 rounded-md mt-6">
          <div className="text-base">
            <p className="text-gray-800 mb-2 text-justify">
              <span className="font-semibold  text-justify">
                {" "}
                Se toma en consideración lo siguiente:{" "}
              </span>{" "}
              <br />
              <span className="">
                {" "}
                - Sueldo mensual de los involucrados en el proyecto (Analista,
                Desarrollador, Probador, etc.)
              </span>
              <br />
              <span className="">
                {" "}
                - Otros costos del proyecto (Servicios, Materiales, Imprevistos,
                Externos etc.)
              </span>
              <br />
              <span className="">- Cantidad de Desarrolladores</span>
            </p>
            <p className="text-gray-800 mb-2">
              <span className="font-semibold">Formula: </span> <br />
              <span className="italic">Costo = (nd ∗ dm ∗ ps) + og</span> <br />
            </p>
            <p className="text-gray-800 mb-2 text-justify">
              <span className="font-semibold text-justify"> Donde: </span>{" "}
              <br />
              <span className=""> - nd = Número de involucrados.</span>
              <br />
              <span className=""> - dm = Duración del proyecto en meses.</span>
              <br />
              <span className="">
                - ps = Promedio de sueldos de los involucrados.
              </span>
              <br />
              <span className="">- ot = suma de otros gastos.</span>
            </p>

            {bandera ? (
              <div className="bg-gray-50 mt-4">
                <p className="text-gray-800 mb-2 text-left">
                  <span className="font-semibold ">Aplicando las formula: </span>{" "}
                  <br />
                </p>
                <p className="text-gray-800 mb-2">
                  <span className="italic">
                    Presupuesto = ({conteo} ∗ {mesesEstimados} ∗ {prom}) +{" "}
                    {sumaotrosGastos}
                  </span>{" "}
                  <br />
                  <span className="italic">
                  Presupuesto = {(conteo * mesesEstimados * prom).toFixed(2)} + {sumaotrosGastos}

                  </span>{" "}
                  <br />
                  <span className="italic font-semibold mt-4">{presupuesto}</span> <br />
                </p>
              </div>
            ) : (
              <div></div>
            
            )}
          </div>
        </div>
        <br />
        <button
          onClick={() => mostrar()}
          className="block bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded mx-auto transition-transform transform-gpu active:scale-95"
        >
          Calcular el presupuesto del Proyecto
          <FontAwesomeIcon icon={faCalculator} className="ml-2" />
        </button>

        {bandera2 ? (
        <div className="flex flex-col md:flex-row justify-end mt-5">
        <Link
          to={`/informe/${params.id}`}
          className="bg-green-500 text-white px-4 py-2 rounded text-center hover:bg-green-600"
        >
          Ir a la Fase 7
          <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </Link>
      </div>
      ): <div></div>}
      </div>
    </div>
  );
};

export default Presupuesto;

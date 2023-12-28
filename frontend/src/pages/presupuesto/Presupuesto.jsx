import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import { useProyect } from "../../context/ProyectContext";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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
  } = useEstimacionPF();
  const { proyect, getProyect } = useProyect();

  const { register, handleSubmit } = useForm();
  const [conteo, setconteo] = useState(0);
  const [prom, setprom] = useState(0);
  const [sumaotrosGastos, setsumaotrosGastos] = useState(0);
  const [mesesEstimados, setmesesEstimados] = useState(0);
  const [presupuesto, setpresupuesto] = useState("");
  const [bandera, setBandera] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadFunciones() {
      const res = await getPuntosFuncion(params.id);
      await getProyect(params.id);
      const promedio = await promedioSueldosInvolucrados(params.id);
      const contar = await contarInvolucrados(params.id);
      const sumaOtrosGastos = await sumaotroGastos(params.id);

      setconteo(contar.numeroInvolucrados);
      setprom(promedio.promedio);

      if (sumaOtrosGastos.totalCosto > 0) {
        setsumaotrosGastos(sumaOtrosGastos.totalCosto);
      }else{
        setsumaotrosGastos(0);
      }
      

      if (res.functionPoints[0].mesesEstimados > 0) {
        carga(res.functionPoints[0].mesesEstimados.toFixed(2));
      }
      //setmesesEstimados(datosPuntosFuncion.functionsPoints[0].mesesEstimados);
    }
    loadFunciones();
    carga();
  }, []);

  const carga = async (meses) => {
    setmesesEstimados(meses);
  };

  const mostrar = async () => {
    const presu = await calculoPresupuesto(
      conteo,
      mesesEstimados,
      prom,
      sumaotrosGastos
    );
    console.log(presu);
    const mensaje =
      "El costo estimado del proyecto es = " + presu.toFixed(3) + " $";
    setpresupuesto(mensaje);

    if (conteo >= 1 && mesesEstimados > 0 && prom > 0) {
      setBandera(true);
    }
  };

  const onSubmit = handleSubmit(async (data) => {});

  return (
    <div className="flex items-center justify-center h-screen flex-col mt-32">
      <div className="max-w-4xl mb-8 text-center bg-white p-8 rounded-md shadow-md">
        <h1 className="text-blue-950 text-4xl font-bold mb-6">
          Presupuesto del proyecto
        </h1>
        <p className="text-blue-950 text-1xl font-bold mb-6 text-justify">
          Antes de realizar el cáclculo del esfuerzo es recomendable agregar los
          involucrados y otros gastos del proyecto.
        </p>
        <div className="flex justify-between mb-4">
          <Link
            to={`/involucrados/${params.id}`}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-6 rounded"
          >
            Gestionar Involucrados
          </Link>
          <Link
            to={`/otrosGastos/${params.id}`}
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-6 rounded"
          >
            Gestionar Otros Gastos
          </Link>
        </div>

        <div className="bg-gray-200 p-8 rounded-md mt-6">
          <div className="text-lg">
            <p className="text-gray-800 mb-2 text-justify">
              <span className="font-semibold text-justify">
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
              <p className="text-gray-800 mb-2">
                <span className="font-semibold">Aplicando las formula: </span>{" "}
                <br />
                <span className="italic">
                  Costo = ({conteo} ∗ {mesesEstimados} ∗ {prom.toFixed(2)}) +{" "}
                  {sumaotrosGastos}
                </span>{" "}
                <br />
                <span className="italic">{presupuesto}</span> <br />
              </p>
            ) : (
              <p className="text-gray-800 mb-2 text-justify">
                {/* Alternative content when conditions are not met */}
                Para cálcular el presupuesto del proyecto se necesita al menos: <br />
                - 1 involucrado agregado (que tenga un sueldo superior a 0 $) <br />
                - 1 otro gasto agregado.
              </p>
            )}
          </div>
        </div>
        <br />
        <button
          onClick={() => mostrar()}
          className="block bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded w-full transition-transform transform-gpu active:scale-95"
        >
          Calcular el Esfuerzo del Proyecto
        </button>
      </div>
    </div>
  );
};

export default Presupuesto;

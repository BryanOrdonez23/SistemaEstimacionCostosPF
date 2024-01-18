// Fases.js
import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useProyect } from "../context/ProyectContext";
import { useEstimacionPF } from "../context/EstimacionPFContext";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import CustomPopup from "../components/CustomPopup";

const Fase = ({ title, description, path, icon, isEnabled, iconok }) => {
  const linkClass = isEnabled
    ? "bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
    : "bg-gray-400 text-white px-4 py-2 rounded-full cursor-not-allowed";

  return (
    <div className="bg-white rounded-lg p-6 shadow-md transition duration-300 ease-in-out transform hover:scale-105 my-4 mx-2 relative">
      {icon && (
        <div className="absolute bottom-4 right-4">
          {icon}
        </div>
      )}

      <h2 className="text-gray-600 text-2xl font-bold">{title}</h2>

      <p className="text-gray-600 mb-6">{description}</p>
      <Link
        to={isEnabled ? path : '#'} // Si no está habilitado, puedes redirigir a una página especial o simplemente ignorar el enlace
        className={linkClass}
      >
        {isEnabled ? 'Ir al detalle' : 'No disponible'}
      </Link>
      {isEnabled && (title !== "Fase 7")  && (
        <div className="text-xs italic text-gray-400 mt-4">
          Volver a ejecutarce en caso de modificaciónes
        </div>
      )}

    </div>
  );
};

const Fases = () => {
  const params = useParams();
  const { getProyect, proyect } = useProyect();
  const { setPuntosFuncionTotal, valorfactoresAjuste, getValorFactoresAjuste, getPuntosFuncion, datosPuntosFuncion} = useEstimacionPF();
  const [showCustomPopup, setShowCustomPopup] = useState(null);

  const isFasesEnabled = proyect && proyect.funciones && proyect.funciones.length > 0;
  const isFasesEnabled2 = datosPuntosFuncion && datosPuntosFuncion.functionPoints && datosPuntosFuncion.functionPoints[0].calculoSA > 0;
  const isFasesEnabled3 = valorfactoresAjuste && valorfactoresAjuste.valorFactoresAjuste && valorfactoresAjuste.valorFactoresAjuste.length > 0;
  const isFasesEnabled4 = datosPuntosFuncion && datosPuntosFuncion.functionPoints && datosPuntosFuncion.functionPoints[0].calculoCA > 0;
  const isFasesEnabled5 = datosPuntosFuncion && datosPuntosFuncion.functionPoints && datosPuntosFuncion.functionPoints[0].esfuerzo > 0;
  const isFasesEnabled6 = datosPuntosFuncion && datosPuntosFuncion.functionPoints && datosPuntosFuncion.functionPoints[0].presupuesto > 0;

  const routes = [
    { path: '/proyects', displayName: 'Inicio /' }
  ];


  useEffect(() => {
    document.title = 'App costos - Fases';
    async function loadFunciones() {
      if (params.id) {
        const res = await getProyect(params.id);
        await getValorFactoresAjuste(params.id);
        await getPuntosFuncion(params.id);
        setPuntosFuncionTotal(0);
      }
    }
    loadFunciones();
  }, []);

  const mostrarPopUp = (key) => {
    setShowCustomPopup(key);
  };


  const handlePopUpClose = () => {
    setShowCustomPopup(null);
  };

  return (
    <div  className=" mt-2">
    <div className="flex justify-center mt-3">      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-8xl">
        <Fase
          title="Fase 1"
          description="Agregar las funcionalidades o requerimientos del software"
          path={`/funciones/${proyect._id}`}
          icon={<FontAwesomeIcon icon={faInfoCircle} onClick={() => mostrarPopUp("Fase1")}  className="mr-2 text-blue-500 cursor-pointer" size="1x" />}
          icon2={<FontAwesomeIcon icon={faInfoCircle} onClick={() => mostrarPopUp("Fase1")}  className="mr-2 text-blue-500 cursor-pointer" size="1x" />}
          isEnabled={true}
          iconok={<FontAwesomeIcon icon={faCheckCircle}  className="text-green-600 mr-4" size="1x" />}

        />
        <Fase
          title="Fase 2"
          description="Cálculo de puntos de función sin el ajuste"
          path={`/calculopfsa/${proyect._id}`}
          icon={<FontAwesomeIcon icon={faInfoCircle} onClick={() => mostrarPopUp("Fase2")}  className="mr-2 text-blue-500 cursor-pointer" size="1x" />}
          isEnabled={isFasesEnabled}
          iconok={<FontAwesomeIcon icon={faCheckCircle}  className="text-green-600 mr-4" size="1x" />}
        />
        <Fase
          title="Fase 3"
          description="Ingreso de factores de ajuste del método de Puntos de función"
          path={`/fasePFAjustado/${proyect._id}`}
          icon={<FontAwesomeIcon icon={faInfoCircle} onClick={() => mostrarPopUp("Fase3")}  className="mr-2 text-blue-500 cursor-pointer" size="1x" />}
          isEnabled={isFasesEnabled2}
          iconok={<FontAwesomeIcon icon={faCheckCircle}  className="text-green-600 mr-4" size="1x" /> && isFasesEnabled3}
        />
        <Fase
          title="Fase 4"
          description="Cálculo de puntos de función con el ajuste"
          path={`/calculopfca/${proyect._id}`}
          icon={<FontAwesomeIcon icon={faInfoCircle} onClick={() => mostrarPopUp("Fase4")}  className="mr-2 text-blue-500 cursor-pointer" size="1x" />}
          isEnabled={isFasesEnabled2 && isFasesEnabled && isFasesEnabled3}
          iconok={<FontAwesomeIcon icon={faCheckCircle}  className="text-green-600 mr-4" size="1x" />}
      />
        <Fase
          title="Fase 5"
          description="Cálculo del esfuerzo del proyecto"
          path={`/esfuerzopf/${proyect._id}`}
          icon={<FontAwesomeIcon icon={faInfoCircle} onClick={() => mostrarPopUp("Fase5")}  className="mr-2 text-blue-500 cursor-pointer" size="1x" />}
          isEnabled={isFasesEnabled2 && isFasesEnabled && isFasesEnabled3 && isFasesEnabled4}
          iconok={<FontAwesomeIcon icon={faCheckCircle}  className="text-green-600 mr-4" size="1x" />}
        />
        <Fase
          title="Fase 6"
          description="Cálcular el presupuesto del proyecto"
          path={`/presupuesto/${proyect._id}`}
          icon={<FontAwesomeIcon icon={faInfoCircle} onClick={() => mostrarPopUp("Fase6")}  className="mr-2 text-blue-500 cursor-pointer" size="1x" />}
          isEnabled={isFasesEnabled2 && isFasesEnabled && isFasesEnabled3 && isFasesEnabled4 && isFasesEnabled5}
          iconok={<FontAwesomeIcon icon={faCheckCircle}  className="text-green-600 mr-4" size="1x" />}
       />
        <Fase
          title="Fase 7"
          description="Informe de estimación de costos"
          path={`/informe/${proyect._id}`}
          icon={<FontAwesomeIcon icon={faInfoCircle} onClick={() => mostrarPopUp("Fase7")}  className="mr-2 text-blue-500 cursor-pointer" size="1x" />}
          isEnabled={isFasesEnabled2 && isFasesEnabled && isFasesEnabled3 && isFasesEnabled4 && isFasesEnabled5 && isFasesEnabled6}
        />
        <CustomPopup
        isOpen={showCustomPopup}
        message={showCustomPopup}
        onClose={handlePopUpClose}
        />

      </div>
    </div>
    </div>

  );
};

export default Fases;

import React, { useEffect, useState } from "react";
import { useProyect } from "../../context/ProyectContext";
import { useForm } from "react-hook-form";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useParams, Link } from "react-router-dom";
import Popup from "../../components/Popup";
import CustomPopup from "../../components/CustomPopup";
const FactoresAjuste = () => {
  const { register, handleSubmit, setValue } = useForm();
  const {
    getValorFactoresAjuste,
    createValorFactoresAjuste,
    sumaValorFactoresAjuste,
  } = useEstimacionPF();
  const { getProyect, proyect } = useProyect();
  const params = useParams();

  //popup

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showCustomPopup, setShowCustomPopup] = useState(null);
  const [bandera, setBandera] = useState(false);

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setSuccessMessage("");
  };

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
      const res = await getValorFactoresAjuste(params.id);
      console.log(res);
      if (res.valorFactoresAjuste.length > 0) {
        setValue("FA1", res.valorFactoresAjuste[0].valorFA1.toString());
        setValue("FA2", res.valorFactoresAjuste[0].valorFA2.toString());
        setValue("FA3", res.valorFactoresAjuste[0].valorFA3.toString());
        setValue("FA4", res.valorFactoresAjuste[0].valorFA4.toString());
        setValue("FA5", res.valorFactoresAjuste[0].valorFA5.toString());
        setValue("FA6", res.valorFactoresAjuste[0].valorFA6.toString());
        setValue("FA7", res.valorFactoresAjuste[0].valorFA7.toString());
        setValue("FA8", res.valorFactoresAjuste[0].valorFA8.toString());
        setValue("FA9", res.valorFactoresAjuste[0].valorFA9.toString());
        setValue("FA10", res.valorFactoresAjuste[0].valorFA10.toString());
        setValue("FA11", res.valorFactoresAjuste[0].valorFA11.toString());
        setValue("FA12", res.valorFactoresAjuste[0].valorFA12.toString());
        setValue("FA13", res.valorFactoresAjuste[0].valorFA13.toString());
        setValue("FA14", res.valorFactoresAjuste[0].valorFA14.toString());
        setBandera(true);
      }
    }
    loadFactoresAjuste();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Save operation
      await createValorFactoresAjuste(params.id, data);
      await sumaValorFactoresAjuste(params.id);
      // Show success notification
      setSuccessMessage("Guardado exitoso");
      setShowSuccess(true);
      setBandera(true);
    } catch (error) {
      console.log(error);
    }
  });
  const mostrarPopUp = (key) => {
    setShowCustomPopup(key);
  };

  const handlePopUpClose = () => {
    setShowCustomPopup(null);
  };

  const factoresAjusteSubset = factoresAjuste.factoresAjuste[0];
  const factoresAjusteKeys = Object.keys(factoresAjusteSubset);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto mt-2 p-7 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-black">
          Fase 3: Factores de Ajuste
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {factoresAjusteKeys.map((key) => (
              <div key={key} className="mb-4">
                <div className="flex items-center mb-2">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="mr-2 text-blue-500 cursor-pointer"
                    onClick={() => mostrarPopUp(key)}
                  />
                  <h3 className="text-gray-950 text-base font-medium">
                    {factoresAjusteSubset[key]}:
                  </h3>
                </div>
                <div className="flex space-x-4">
                  {[0, 1, 2, 3, 4, 5].map((option) => (
                    <label key={option} className="text-gray-600">
                      <input
                        type="radio"
                        id={key}
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
                <CustomPopup
                  isOpen={showCustomPopup === key}
                  message={factoresAjusteSubset[key]}
                  onClose={handlePopUpClose}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="w-96 bg-blue-500 text-white p-3  font-bold text-base rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Guardar factores de ajuste
            </button>
          </div>
        </form>
        <Popup
          isOpen={showSuccess}
          message={successMessage}
          onClose={handleSuccessClose}
        />
        <div className="flex flex-col md:flex-row justify-between mt-2">
          <Link
            to={`/fases/${params.id}`}
            className="bg-blue-500 hover:bg-blue-600 font-semibold text-center text-white px-3 py-2 rounded mb-2 md:mb-0"
          >
            Fases del proyecto
          </Link>
          {bandera && (
            <Link
              to={`/calculopfca/${params.id}`}
              className="bg-green-500 text-white px-4 py-2 rounded text-center hover:bg-green-600"
            >
              Ir a la Fase 4
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default FactoresAjuste;

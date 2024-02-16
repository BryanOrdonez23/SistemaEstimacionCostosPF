import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useProyect } from "../../context/ProyectContext";
import { useFunctions } from "../../context/FunctionsContext";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import CustomPopup from "../../components/CustomPopup";
import Breadcrumbs from "../../components/Breadcrumbs ";

function NewProyectPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: errorsForm },
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const { user } = useAuth();
  const { proyects, createProyect, getProyects, getProyect, updateProyect } =
    useProyect();
  const { functions, createFunctions, getFunctions, errors } = useFunctions();
  const [showCustomPopup, setShowCustomPopup] = useState(null);
  const { proyect } = useProyect();

  //console.log(proyects);
  useEffect(() => {
    document.title = "Nueva Funcionalidad - App costos";
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    getProyect(params.id);
    const datos = {
      funcionalidad: data.funcionalidad,
      tipo: data.tipo,
      complejidad: data.complejidad,
      cantidad: parseInt(data.cantidad, 10),
    };
    const res = await createFunctions(params.id, datos);

    if (res) {
      navigate(`/funciones/${proyect._id}`);
      getProyects();
    }
  });
  const mostrarPopUp = (key) => {
    setShowCustomPopup(key);
  };

  const handlePopUpClose = () => {
    setShowCustomPopup(null);
  };
  const routes = [
    { path: "/proyects", displayName: "Inicio" },
    { path: `/fases/${params.id}`, displayName: "Fases del proyecto" },
    {
      path: `/funciones/${params.id}`,
      displayName: "Fase 1: Funcionalidades del proyecto de software",
    },
    { path: `/newfunciones/${params.id}`, displayName: "Nueva Funcionalidad" },
  ];
  return (
    <div className="flex flex-col items-center justify-center  bg-CCE3FF my-2">
      <Breadcrumbs routes={routes} />
      <div className="max-w-xl mx-auto mt-4 p-6 bg-white rounded-md shadow-md md:w-3/4 lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-6 text-black">
          Agregar una nueva funcionalidad
        </h2>
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
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Funcionalidad
            </label>
            <input
              
              type="text"
              id="funcionalidad"
              name="funcionalidad"
              placeholder="Ingrese la funcionalidad"
              className="w-full border p-2 rounded text-black"
              {...register("funcionalidad", {
                required: "La funcionalidad es requerida",
              })}
            />
            {errorsForm.funcionalidad && (
              <p className="text-red-500 text-sm mt-1">
                {errorsForm.funcionalidad.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Tipo
              <FontAwesomeIcon
                icon={faInfoCircle}
                onClick={() => mostrarPopUp("Tipo")}
                className="ml-2 text-blue-500 cursor-pointer"
                size="1x"
              />
            </label>
            <select
              
              id="tipo"
              name="tipo"
              placeholder="Ingrese el tipo de funcionalidad"
              className="w-full border p-2 rounded text-black"
              {...register("tipo", { required: "El tipo es requerido" })}
            >
              <option value="">Seleccione un tipo</option>
              <option value="EE">EE - Entradas Externas</option>
              <option value="SE">SE - Salidas Externas</option>
              <option value="CE">CE - Consultas Externas</option>
              <option value="ALI">ALI - Archivos lógico interno</option>
              <option value="AIE">AIE - Archivos de Interfaz Externos</option>
            </select>
            {errorsForm.tipo && (
              <p className="text-red-500 text-sm mt-1">
                {errorsForm.tipo.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Complejidad
              <FontAwesomeIcon
                icon={faInfoCircle}
                onClick={() => mostrarPopUp("Complejidad")}
                className="ml-2 text-blue-500 cursor-pointer"
                size="1x"
              />
            </label>
            <select
              
              id="complejidad"
              name="complejidad"
              className="w-full border p-2 rounded text-black"
              {...register("complejidad", { required: "La complejidad es requerido." })}
            >
              <option value="">Seleccione una complejidad</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
            {errorsForm.complejidad && (
              <p className="text-red-500 text-sm mt-1">
                {errorsForm.complejidad.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Cantidad
              <FontAwesomeIcon
                icon={faInfoCircle}
                onClick={() => mostrarPopUp("cantidad")}
                className="ml-2 text-blue-500 cursor-pointer"
                size="1x"
              />
            </label>
            <input
              type="number"
              name="cantidad"
              id="cantidad"
              placeholder="Ingrese la cantidad"
              className="w-full border p-2 rounded text-black"
              {...register("cantidad", { required: "La cantidad es requerida" })}
            />
            {errorsForm.cantidad && (
              <p className="text-red-500 text-sm mt-1">
                {errorsForm.cantidad.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Guardar
          </button>
        </form>
        <CustomPopup
          isOpen={showCustomPopup}
          message={showCustomPopup}
          onClose={handlePopUpClose}
        />
      </div>
    </div>
  );
}

export default NewProyectPage;

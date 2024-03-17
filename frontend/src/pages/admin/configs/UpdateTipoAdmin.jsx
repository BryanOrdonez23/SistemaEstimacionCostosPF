import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAdmin } from "../../../context/AdminContext";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs ";

const UpdateTipoAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();
  const { updateTipoFuncion, getTipoFunciones, getTipoFuncion, tipoFuncion } =
    useAdmin();

  // Simulación de valores iniciales, deberías obtener estos valores del servidor

  // Establecer los valores iniciales cuando el componente se monta
  useEffect(() => {
    document.title = "Actualizar Tipo de Funcionalidad - App costos";
    async function load() {
      const tipofound = await getTipoFuncion(params.id);
      setValue("tipo", tipofound.tipo);
      setValue("valorAlto", tipofound.valorAlto);
      setValue("valorMedio", tipofound.valorMedio);
      setValue("valorBajo", tipofound.valorBajo);
    }
    load();
  }, []);

  const onSubmit = async (data) => {
    // Aquí puedes manejar la lógica para enviar los datos actualizados al servidor
    const res = await updateTipoFuncion(params.id, data);
    getTipoFunciones();
    navigate(`/administrador/tipofunciones`);
  };

  const routes = [
    { path: "/administrador/menu", displayName: "Inicio" },
    {
      path: `/administrador/tipofunciones`,
      displayName: "Configuraciones del proyecto",
    },
    {
      path: `/administrador/tipofunciones/${params.id}`,
      displayName: "Actualizar Tipo de funciones",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-4 p-6 bg-white rounded-md shadow-md text-black">
      <Breadcrumbs routes={routes} />
      <h2 className="text-2xl font-bold mb-4 text-blue-800">
        Actualizar Tipo de Funcionalidad
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="tipo"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Tipo:
          </label>
          <select
            id="tipo"
            name="tipo"
            {...register("tipo", { required: "Este campo es requerido" })}
            className="border p-2 w-full"
          >
            <option value="" disabled>
              Seleccione un tipo
            </option>
            <option value="EE">EE - Entradas Externas</option>
            <option value="SE">SE - Salidas Externas</option>
            <option value="CE">CE - Consultas Externas</option>
            <option value="ALI">ALI - Archivos lógico interno</option>
            <option value="AIE">AIE - Archivos de Interfaz Externos</option>
          </select>
          {errors.tipo && <p className="text-red-500">{errors.tipo.message}</p>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="valorAlto"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Valor Alto:
          </label>
          <input
            type="number"
            id="valorAlto"
            name="valorAlto"
            {...register("valorAlto", { required: "Este campo es requerido" })}
            className="border p-2 w-full"
          />
          {errors.valorAlto && (
            <p className="text-red-500">{errors.valorAlto.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="valorMedio"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Valor Medio:
          </label>
          <input
            type="number"
            id="valorMedio"
            name="valorMedio"
            {...register("valorMedio", { required: "Este campo es requerido" })}
            className="border p-2 w-full"
          />
          {errors.valorMedio && (
            <p className="text-red-500">{errors.valorMedio.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="valorBajo"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Valor Bajo:
          </label>
          <input
            type="number"
            id="valorBajo"
            name="valorBajo"
            {...register("valorBajo", { required: "Este campo es requerido" })}
            className="border p-2 w-full"
          />
          {errors.valorBajo && (
            <p className="text-red-500">{errors.valorBajo.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Actualizar Tipo
        </button>
      </form>
    </div>
  );
};

export default UpdateTipoAdmin;

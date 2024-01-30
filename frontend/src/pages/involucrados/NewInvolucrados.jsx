import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs ";

function NewInvolucrados() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: errorsForm },
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const {
    getInvolucrados,
    createInvolucrados,
    getInvolucrado,
    updateInvolucrado,
    errors,
  } = useEstimacionPF();

  useEffect(() => {
    document.title = "Nuevo Involucrado - App costos";
    async function loadfunction() {
      if (params.id2) {
        const involucradofound = await getInvolucrado(params.id2);
        console.log(involucradofound);
        setValue("nombre", involucradofound.nombre);
        setValue("rol", involucradofound.rol);
        setValue("sueldo", involucradofound.sueldo);
      }
    }
    loadfunction();
  }, []);

  const routes = [
    { path: "/proyects", displayName: "Inicio" },
    { path: `/fases/${params.id}`, displayName: "Fases del proyecto" },
    {
      path: `/presupuesto/${params.id}`,
      displayName: "Fase 6: Presupuesto del proyecto",
    },
    { path: `/involucrados/${params.id}`, displayName: "Menú involucrados" },
    { path: `/newinvolucrados/${params.id}`, displayName: "Nuevo involucrado" },
  ];

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      const datos = {
        nombre: data.nombre,
        rol: data.rol,
        sueldo: parseFloat(data.sueldo, 10),
      };

      if (params.id2) {
        const res = await updateInvolucrado(params.id, params.id2, datos);
        await getInvolucrados(params.id);
        if (res) {
          navigate(`/involucrados/${params.id}`);
        }
      } else {
        const res = await createInvolucrados(params.id, datos);
        await getInvolucrados(params.id);
        if (res) {
          navigate(`/involucrados/${params.id}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center  bg-CCE3FF my-2">
      <Breadcrumbs routes={routes} />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md md:w-3/4 lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-6 text-black">
          {params.id2
            ? "Actualizar el  involucrado"
            : "Crear un nuevo involucrado"}
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
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingrese el nombre del involucrado"
              className="w-full border p-2 rounded text-black"
              {...register("nombre", { required: "El nombre es requerido" })}
            />
            {errorsForm.nombre && (
              <p className="text-red-500 text-sm mt-1">
                {errorsForm.nombre.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Rol dentro del proyecto:
            </label>
            <input
              type="text"
              name="rol"
              id="rol"
              placeholder="Ingrese el rol del involucrado"
              className="w-full border p-2 rounded text-black"
              {...register("rol", { required: "El rol es requerido" })}
            />
            {errorsForm.rol && (
              <p className="text-red-500 text-sm mt-1">
                {errorsForm.rol.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Sueldo ($ Dólar Americano):
            </label>
            <input
              type="text"
              name="sueldo"
              id="sueldo"
              placeholder="Ingrese el sueldo del involucrado"
              className="w-full border p-2 rounded text-black"
              {...register("sueldo", {
                required: "El sueldo es requerido",
                pattern: {
                  value: /^\d+(\.\d{0,2})?$/, // Acepta hasta dos decimales
                  message: "Ingrese un valor numérico válido",
                },
              })}
            />
            {errorsForm.sueldo && (
              <p className="text-red-500 text-sm mt-1">
                {errorsForm.sueldo.message}
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
      </div>
    </div>
  );
}

export default NewInvolucrados;

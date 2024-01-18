import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs ";

function NewOtrosGastos() {
  const { register, handleSubmit, setValue} = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const { getOtrosGastos, getOtroGasto, createOtrosGastos, updateOtroGasto, eliminarOtroGasto} = useEstimacionPF();

  useEffect(() => {
    document.title = "Nuevo Otros Gastos - App costos";
    async function loadfunction() {
      if (params.id2) {
        const otrosgastosfound = await getOtroGasto(params.id2);
        console.log(otrosgastosfound);
        setValue("descripcion", otrosgastosfound.otrosGastos.descripcion);
        setValue("costo", otrosgastosfound.otrosGastos.costo);
        setValue("observacion", otrosgastosfound.otrosGastos.observacion);
      }
    }
    loadfunction();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
        if (params.id2) {
            await updateOtroGasto(params.id, params.id2, data);
            await getOtrosGastos(params.id);
            navigate(`/otrosGastos/${params.id}`);            
        }else{
            await createOtrosGastos(params.id, data);
            await getOtrosGastos(params.id);
            navigate(`/otrosGastos/${params.id}`);
        }
    } catch (error) {
        console.error(error);
    }
  });

  
  const routes = [
    { path: '/proyects', displayName: 'Inicio' },
    { path: `/fases/${params.id}`, displayName: 'Fases del proyecto' },
    { path: `/presupuesto/${params.id}`, displayName: 'Fase 6: Presupuesto del proyecto' },
    { path: `/otrosGastos/${params.id}`, displayName: 'Menú otros gastos' }
  ];

  return (
    <div className="flex flex-col items-center justify-center  bg-CCE3FF my-2">
      <Breadcrumbs routes={routes} />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md md:w-3/4 lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-6 text-black">
        {params.id2 ? "Actualizar el  gasto" : "Agregar un nuevo gasto"}
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Descripción:
            </label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              placeholder="Ingrese la descripción del gasto"
              className="w-full border p-2 rounded text-black"
              {...register("descripcion", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Costo:
            </label>
            <input
              type="Number"
              name="costo"
              id="costo"
              placeholder="Ingrese el costo del gasto"
              className="w-full border p-2 rounded text-black"
              {...register("costo", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Observación (Opcional):
            </label>
            <input
              type="text"
              name="observacion"
              id="observacion"
              placeholder="Observación sobre el gasto"
              className="w-full border p-2 rounded text-black"
              {...register("observacion")}
            />
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

export default NewOtrosGastos;

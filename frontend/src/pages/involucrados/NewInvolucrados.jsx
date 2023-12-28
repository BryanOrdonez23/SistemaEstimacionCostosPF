import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import { useNavigate, useParams } from "react-router-dom";


function NewInvolucrados() {
  const { register, handleSubmit, setValue} = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const { getInvolucrados, createInvolucrados, getInvolucrado, updateInvolucrado} = useEstimacionPF();

  useEffect(() => {
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

  const onSubmit = handleSubmit(async (data) => {
    try {
        if (params.id2) {
            await updateInvolucrado(params.id, params.id2, data);
            await getInvolucrados(params.id);
            navigate(`/involucrados/${params.id}`);            
        }else{
            await createInvolucrados(params.id, data);
            await getInvolucrados(params.id);
            navigate(`/involucrados/${params.id}`);
        }
    } catch (error) {
        console.error(error);
    }
  });

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-black">
        {params.id2 ? "Actualizar el  involucrado" : "Crear un nuevo involucrado"}
        </h2>
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
              {...register("nombre", { required: true })}
            />
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
              {...register("rol", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Sueldo ($ Dolar Americano):
            </label>
            <input
              type="number"
              name="sueldo"
              id="sueldo"
              placeholder="Ingrese el sueldo del involucrado"
              className="w-full border p-2 rounded text-black"
              {...register("sueldo", { required: true })}
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

export default NewInvolucrados;

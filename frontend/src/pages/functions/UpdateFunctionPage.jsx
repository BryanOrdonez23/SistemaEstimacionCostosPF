import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useProyect } from "../../context/ProyectContext";
import { useFunctions } from "../../context/FunctionsContext";
import { useNavigate, useParams } from "react-router-dom";

function NewProyectPage() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const { user } = useAuth();
  const { getProyects, getProyect } = useProyect();
  const { getFunction, updateFunction  } = useFunctions();

  const { proyect } = useProyect();

  //console.log(proyects);

  useEffect(() => {
    async function loadfunction() {
      console.log(params.id1);
      if (params.id2) {
        const funcionfound = await getFunction(params.id2);
        console.log(funcionfound);
        setValue("funcionalidad", funcionfound.funcionalidad);
        setValue("tipo", funcionfound.tipo);
        setValue("complejidad", funcionfound.complejidad);
        setValue("cantidad", funcionfound.cantidad);
      }
    }
    loadfunction();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    console.log(params.id1);
    await updateFunction(params.id1, params.id2, data);
    navigate(`/funciones/${params.id1}`);
  });

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-black">
          Actualizar funcionalidad
        </h2>
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
              {...register("funcionalidad", { required: true })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Tipo
            </label>
            <select
              id="tipo"
              name="tipo"
              placeholder="Ingrese el tipo de funcionalidad"
              className="w-full border p-2 rounded text-black"
              {...register("tipo", { required: true })}
            >
              <option value="">Seleccione un tipo</option>
              <option value="EI">EI - Entradas Externas</option>
              <option value="EO">EO - Salidas Externas</option>
              <option value="EQ">EQ - Consultas Externas</option>
              <option value="ILF">ILF - Archivos lógico interno</option>
              <option value="EIF">EIF - Archivos lógicos externos</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Complejidad
            </label>
            <select
              id="complejidad"
              name="complejidad"
              className="w-full border p-2 rounded text-black"
              {...register("complejidad", { required: true })}
            >
              <option value="">Seleccione una tecnologia</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Cantidad
            </label>
            <input
              type="number"
              name="cantidad"
              id="cantidad"
              className="w-full border p-2 rounded text-black"
              {...register("cantidad", { required: true })}
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

export default NewProyectPage;

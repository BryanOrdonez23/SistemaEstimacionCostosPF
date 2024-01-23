import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useProyect } from "../context/ProyectContext";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs ";

function NewProyectPage() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  
  const { user } = useAuth();
  const { proyects, createProyect, getProyects, getProyect, updateProyect } =
    useProyect();

  //console.log(proyects);
  useEffect(() => {
    document.title = "Nuevo/Actualizar Proyecto - App costos";
    async function loadProyect() {
      if (params.id) {
        const proyectfound = await getProyect(params.id);
        console.log(proyectfound);
        setValue("title", proyectfound.title);
        setValue("description", proyectfound.description);
        setValue("category", proyectfound.category);
        setValue("technology", proyectfound.technology);
      }
    }
    loadProyect();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateProyect(params.id, data);
    } else {
      createProyect(data);
    }
    getProyects();
    navigate("/proyects");
  });

  const routes = params.id
  ? [
      { path: "/proyects", displayName: "Inicio" },
      { path: `/proyect/${params.id}`, displayName: "Actualizar Proyecto" },
    ]
  : [
      { path: "/proyects", displayName: "Inicio" },
      { path: "/newproyect", displayName: "Nuevo Proyecto" },
    ];

  return (
    <div className="flex flex-col items-center justify-center  bg-CCE3FF">
      <Breadcrumbs routes={routes} />
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-black">
          Crear Nuevo Proyecto de Estimación
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Título
            </label>
            <input
            required
              type="text"
              id="titulo"
              name="titulo"
              placeholder="Ingrese el título"
              className="w-full border p-2 rounded text-black"
              {...register("title", { required: true })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Descripción
            </label>
            <textarea
            required
              id="descripcion"
              name="descripcion"
              placeholder="Ingrese la descripción"
              className="w-full border p-2 rounded resize-none text-black"
              {...register("description", { required: true })}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Categoría
            </label>
            <select
            required
              id="categoria"
              name="categoria"
              className="w-full border p-2 rounded text-black"
              {...register("category", { required: true })}
            >
              <option value="">Seleccione una categoría</option>
              <option value="App Movil">App Movil</option>
              <option value="Aplicación web">Aplicación web</option>
              <option value="Aplicación de escritorio">
                Aplicación de escritorio
              </option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Tecnologías
            </label>
            <select
            required
              id="technology"
              name="technology"
              className="w-full border p-2 rounded text-black"
              {...register("technology", { required: true })}
            >
              <option value="">Seleccione una tecnologia</option>
              <option value="Ensamblador">Ensamblador</option>
              <option value="COBOL">COBOL</option>
              <option value="Lenguaje de 3ra y Cuarta generación (Java, JS, Python, C, etc)">Lenguaje de 3ra y 4ta generación (Java, JS, Python, C, etc)</option>
            </select>
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

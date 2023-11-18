import React from "react";
import { useProyect } from "../context/ProyectContext";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Listagood from "../components/Listagood";

function ProyectFormPage() {
  const { user } = useAuth();
  const { proyects, getProyects, setProyects } = useProyect();

  useEffect(() => {
    getProyects();
  }, []);

  if (proyects.length === 0) return <h1>No hay proyectos</h1>;

  return (
    <div className="container mx-auto my-8 bg-zinc-700 text-white p-8 rounded-md">
      <h1 className="text-3xl font-bold mb-4">Lista de Proyectos</h1>
      <table className="min-w-full bg-gray-600 border border-gray-600 text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Título</th>
            <th className="py-2 px-4 border-b text-left">Categoría</th>
            <th className="py-2 px-4 border-b text-left">Fecha de Creación</th>
            <th className="py-2 px-4 border-b text-left">Última Actualización</th>
            <th className="py-2 px-4 border-b text-justify">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyects.map((proyect) => (
            <tr key={proyect._id} className="hover:bg-gray-700">
              <td className="py-2 px-4 border-b">{proyect.title}</td>
              <td className="py-2 px-4 border-b">{proyect.category}</td>
              <td className="py-2 px-4 border-b">{new Date(proyect.createdAt).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{new Date (proyect.updatedAt).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">
                <Link
                  to={`/details/${proyect._id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded border border-blue-600 mr-2"
                >
                  Detalles
                </Link>
                <Link
                  to={`/edit/${proyect._id}`}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded border border-yellow-600 mr-2"
                >
                  Editar
                </Link>
                <Link
                  to={`/delete/${proyect._id}`}
                  className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded border border-red-600"
                >
                  Eliminar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default ProyectFormPage;

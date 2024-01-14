import React, { useState } from "react";
import { useProyect } from "../context/ProyectContext";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function ProyectFormPage() {
  const { user, getUserById } = useAuth();
  const {
    proyects,
    getProyects,
    deleteProyect,
    getProyectsShared,
    proyectShared,
    createProyectShared,
    getProyectsSharedByProyect,
    proyectsSharedByProyect,
    deleteProyectShared,
  } = useProyect();
  const [showTableModal, setShowTableModal] = useState(false);
  const [faCode, setFaCode] = useState("");
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    const fetchUserNames = async () => {
      const names = {};

      await Promise.all(
        proyectShared.map(async (proyect) => {
          try {
            const user = await getUserById(proyect.proyect.user);
            names[proyect.proyect.user] = user
              ? `${user.name} ${user.lastname}`
              : "Usuario Desconocido";
          } catch (error) {
            console.error("Error al obtener el usuario:", error);
            names[proyect.proyect.user] = "Error al obtener el usuario";
          }
        })
      );

      setUserNames(names);
    };

    fetchUserNames();
  }, [proyectShared]);

  useEffect(() => {
    getProyects();
    getProyectsShared();
  }, []);

  // console.log();

  const handleDeleteProyect = async (proyectId) => {
    try {
      await deleteProyect(proyectId, false);
      getProyects();
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };
  const toggleTableModal = () => {
    setShowTableModal(!showTableModal);
  };

  const handleProyectShared = async (key, proyectId) => {
    setFaCode(key);
    toggleTableModal();
    await getProyectsSharedByProyect(proyectId);
  };

  const handleEliminarElemento = async (id, proyectId) => {
    try {
      console.log(id, proyectId);
      await deleteProyectShared(id);
      await getProyectsSharedByProyect(proyectId);
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  const handleEliminarElementoProyect = async (id) => {
    try {
      await deleteProyectShared(id);
      await getProyectsShared();
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  const getUser = async (id) => {
    try {
      const user = await getUserById(id);

      return user ? `${user.name} ${user.lastname}` : "Unknown User";
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  const copyToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.innerText = faCode;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    // Aquí puedes agregar un mensaje o alguna lógica adicional después de copiar
  };

  return (
    <div className="container mx-auto my-8 bg-white text-gray-800 p-4 md:p-8 rounded-md shadow-md">
      <div className="flex justify-center ">
        <Link
          to={`/newproyect`}
          className="text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 mr-20"
        >
          + Agregar un nuevo proyecto
        </Link>
        <Link
          to={`/compartir`}
          className="text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          + Ingresar a un proyecto existente
        </Link>
      </div>
      <h1 className="text-blue-900 text-2xl font-bold">Lista de Proyectos</h1>
      {proyects.length === 0 ? (
        <p className="text-xl mb-4">No hay proyectos</p>
      ) : (
        <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
          <table className="min-w-full bg-gray-200 border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Título
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-left">
                  Categoría
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-left">
                  Fecha de Creación
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-left">
                  Última Actualización
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center"></th>
              </tr>
            </thead>
            <tbody>
              {proyects.map((proyect) => (
                <tr key={proyect._id} className="hover:bg-gray-300">
                  <td className="py-2 px-2 md:px-4 border-b">
                    {proyect.title}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b">
                    {proyect.category}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b">
                    {new Date(proyect.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b">
                    {new Date(proyect.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b space-y-2 md:space-x-2 md:space-y-0">
                    <Link
                      to={`/fases/${proyect._id}`}
                      className="block md:inline-block bg-blue-500 hover:bg-blue-400 font-semibold text-white px-1 py-1 rounded border border-blue-300 mb-2 md:mb-0 md:mr-2"
                    >
                      Detalles
                    </Link>
                    <Link
                      to={`/proyect/${proyect._id}`}
                      className="block md:inline-block bg-yellow-300 font-semibold hover:bg-yellow-300 text-yellow-900 px-1 py-1 rounded border border-yellow-300 mb-2 md:mb-0 md:mr-2"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDeleteProyect(proyect._id)}
                      className="block md:inline-block bg-red-300 font-semibold hover:bg-red-400 text-red-950 px-1 py-1 rounded border border-red-300"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() =>
                        handleProyectShared(proyect.keyShared, proyect._id)
                      }
                      className="block md:inline-block font-semibold bg-green-300 hover:green-red-400 text-zinc-900 px-1 py-1 rounded border border-red-300"
                    >
                      Compartir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <br />

      <h1 className="text-blue-900 text-2xl font-bold mb-4">
        Lista de Proyectos Compartidos
      </h1>
      {proyectShared.length === 0 ? (
        <p className="text-xl mb-4">No hay proyectos compartidos</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-200 border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="py-2 px-2 md:px-4 border-b text-left">Título</th>
                <th className="py-2 px-2 md:px-4 border-b text-left">
                  Creado por
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-left">
                  Categoría
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-left">
                  Fecha de Creación
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-left">
                  Última Actualización
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center"></th>
              </tr>
            </thead>
            <tbody>
              {proyectShared.map((proyect) => (
                <tr key={proyect._id} className="hover:bg-gray-300">
                  <td className="py-2 px-2 md:px-4 border-b">
                    {proyect.proyect.title}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b">
                    {userNames[proyect.proyect.user] || "Cargando..."}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b">
                    {proyect.proyect.category}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b">
                    {new Date(proyect.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b">
                    {new Date(proyect.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b space-y-2 md:space-x-2 md:space-y-0">
                    <Link
                      to={`/fases/${proyect.proyect._id}`}
                      className="block md:inline-block bg-blue-500 hover:bg-blue-400 font-semibold text-white px-1 py-1 rounded border border-blue-300 mb-2 md:mb-0 md:mr-2"
                    >
                      Detalles
                    </Link>
                    <button
                      onClick={() => handleEliminarElementoProyect(proyect._id)}
                      className="block md:inline-block bg-red-300  font-semibold hover:bg-red-400 text-red-950 px-1 py-1 rounded border border-red-300"
                    >
                      Salir del proyecto
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showTableModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleTableModal}>
              &times;
            </span>
            <div className="text-blue-950 mb-4 text-center">
              <div className="bg-gray-200 p-4 rounded mx-auto">
                <h1 className="mb-2">
                Codigo de acceso del proyecto, puedes compartir este código con los usuarios que desees compartir el proyecto:
                </h1>
                <div className="bg-white p-2 rounded-md mb-3">
                  <h1 className="font-bold text-2xl">{faCode}</h1>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mb-2"
                >
                  Copiar
                </button>
              </div>
            </div>
            <h1 className="mb-2 font-bold text-center">Usuarios con los que se ha compartido el proyecto:</h1>
            
            <table className="min-w-full bg-gray-200 border border-gray-300 text-sm">
              <thead>
                <tr>
                  <th className="py-2 px-2 md:px-4 border-b text-center">
                    Usuario
                  </th>
                  <th className="py-2 px-2 md:px-4 border-b text-center">
                    Permisos
                  </th>
                  <th className="py-2 px-2 md:px-4 border-b text-center"></th>
                </tr>
              </thead>
              <tbody>
                {proyectsSharedByProyect.map((elemento) => (
                  <tr key={elemento._id} className="hover:bg-gray-300">
                    <td className="py-2 px-2 md:px-4 border-b text-center">
                      {elemento.user.name + " " + elemento.user.lastname}
                    </td>
                    <td className="py-2 px-2 md:px-4 border-b text-center">
                      {elemento.permissions}
                    </td>
                    <td className="py-2 px-2 md:px-4 border-b text-center">
                      <button
                        onClick={() =>
                          handleEliminarElemento(elemento._id, elemento.proyect)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProyectFormPage;

import React, { useState } from "react";
import { useProyect } from "../context/ProyectContext";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import Popup from "../components/Popup";
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
    getSolicitudesProyectosShared,
    solicitudesShared,
    updateStatusProyectShared,
  } = useProyect();
  const [showTableModal, setShowTableModal] = useState(false);
  const [faCode, setFaCode] = useState("");
  const [userNames, setUserNames] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [proyectToDelete, setProyectToDelete] = useState(null);
  const [elementoToDelete, setElementoToDelete] = useState(null);
  const [elementoToDeleteProyect, setElementoToDeleteProyect] = useState(null);
  const [showTableModalContent, setShowTableModalContent] = useState("users");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setSuccessMessage("");
  };

  useEffect(() => {
    document.title = "App costos - Inicio";
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

  const toggleTableModal = () => {
    setShowTableModal(!showTableModal);
  };
  //--------- Proyectos Delete------------------------------------
  const handleDeleteProyect = async (proyectId) => {
    try {
      // Mostrar el modal de confirmación antes de eliminar
      setProyectToDelete(proyectId);
      setShowDeleteConfirmation(true);
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  const handleConfirmarProyectoCompartido = async (proyectId) => {
    try {
      // Mostrar el modal de confirmación antes de eliminar
      console.log(proyectId);
      await updateStatusProyectShared(proyectId);
      await getSolicitudesProyectosShared(proyectId);
      await getProyectsSharedByProyect(proyectId);
      setSuccessMessage("Se ha aceptado la solicitud de ingreso al proyecto.");
      setShowSuccess(true);
    } catch (error) {
      console.error("Error al eliminar el proyecto compartido:", error);
    }
  };

  const handleConfirmDeleteProyect = async () => {
    try {
      await deleteProyect(proyectToDelete, false);
      getProyects();
      setShowDeleteConfirmation(false); // Ocultar el modal de confirmación
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };
  const handleCancelDeleteProyect = () => {
    setShowDeleteConfirmation(false); // Ocultar el modal de confirmación
  };

  //-------------------------------------------------------------

  const handleProyectShared = async (key, proyectId) => {
    setFaCode(key);
    toggleTableModal();
    await getSolicitudesProyectosShared(proyectId);
    await getProyectsSharedByProyect(proyectId);
  };

  //--------- Proyectos Compartidos Delete Personas dentro------------------
  const handleEliminarElemento = async (id, proyectId) => {
    try {
      setElementoToDelete({ id, proyectId });
      setShowDeleteConfirmation(true);
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };


  const handleConfirmDeleteElemento = async () => {
    try {
      await deleteProyectShared(elementoToDelete.id);
      await getSolicitudesProyectosShared(elementoToDelete.proyectId);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  const handleCancelDeleteElemento = () => {
    setShowDeleteConfirmation(false);
  };

  //--------- Proyectos Compartidos Delete Dejar de compartir-----
  const handleEliminarElementoProyect = async (id) => {
    try {
      setElementoToDeleteProyect(id);
      setShowDeleteConfirmation(true);
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  const handleConfirmDeleteElementoProyect = async () => {
    try {
      await deleteProyectShared(elementoToDeleteProyect);
      await getProyectsShared();
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  const handleCancelDeleteElementoProyect = () => {
    setShowDeleteConfirmation(false);
  };
  //--------------------------------------------------------------
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

  ////

  const toggleTableModalContent = (content) => {
    setShowTableModalContent(content);
  };

  return (
    <div className="container mx-auto my-6 bg-white text-gray-800 p-4 md:p-8 rounded-md shadow-md">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 my-4">
        <Link
          to={`/newproyect`}
          className="text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Agegar Nuevo proyecto
        </Link>
        <Link
          to={`/compartir`}
          className="text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Ingresar a un proyecto
        </Link>
      </div>
      <h1 className="text-blue-900 text-lg sm:text-2xl font-bold my-4">
        Lista de Proyectos
      </h1>
      {proyects.length === 0 ? (
        <p className="text-xl sm:text-2xl mb-4">No hay proyectos</p>
      ) : (
        <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
          <table className="min-w-full bg-gray-200 border border-gray-300 text-sm sm:text-sm">
            <thead>
              <tr>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Título
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Categoría
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Fecha de Creación
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Última Actualización
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center"></th>
              </tr>
            </thead>
            <tbody>
              {proyects.map((proyect) => (
                <tr key={proyect._id} className="hover:bg-gray-300">
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {proyect.title}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {proyect.category}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {new Date(proyect.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {new Date(proyect.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b space-y-2 md:space-x-2 md:space-y-0">
                    <Link
                      to={`/fases/${proyect._id}`}
                      className="block md:inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-2 py-1 rounded-md border border-blue-300 mb-2 md:mb-0 md:mr-2"
                    >
                      Detalles
                    </Link>
                    <Link
                      to={`/proyect/${proyect._id}`}
                      className="block md:inline-block bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold px-2 py-1 rounded-md border border-yellow-300 mb-2 md:mb-0 md:mr-2"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDeleteProyect(proyect._id)}
                      className="block md:inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded-md border border-red-300 mb-2 md:mb-0 md:mr-2"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() =>
                        handleProyectShared(proyect.keyShared, proyect._id)
                      }
                      className="block md:inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-2 py-1 rounded-md border border-green-300"
                    >
                      Compartir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showDeleteConfirmation && (
            <DeleteConfirmationModal
              onCancel={handleCancelDeleteProyect}
              onConfirm={handleConfirmDeleteProyect}
            />
          )}
        </div>
      )}
      <br />

      {proyectShared.length === 0 ? (
        <p className="text-base mb-4 italic">No hay proyectos compartidos</p>
      ) : (
        <div className="overflow-x-auto">
          <h1 className="text-blue-900 text-lg sm:text-2xl font-bold my-4">
            Lista de Proyectos Compartidos
          </h1>
          <table className="min-w-full bg-gray-200 border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Título
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Creado por
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Categoría
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Fecha de Creación
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center">
                  Última Actualización
                </th>
                <th className="py-2 px-2 md:px-4 border-b text-center"></th>
              </tr>
            </thead>
            <tbody>
              {proyectShared.map((proyect) => (
                <tr key={proyect._id} className="hover:bg-gray-300">
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {proyect.proyect.title}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {userNames[proyect.proyect.user] || "Cargando..."}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {proyect.proyect.category}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {new Date(proyect.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b text-center">
                    {new Date(proyect.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 md:px-4 border-b space-y-2 md:space-x-2 md:space-y-0">
                    <Link
                      to={`/fases/${proyect.proyect._id}`}
                      className="block md:inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-2 py-1 rounded-md border border-blue-300 mb-2 md:mb-0 md:mr-2"
                    >
                      Detalles
                    </Link>
                    <button
                      onClick={() => handleEliminarElementoProyect(proyect._id)}
                      className="block md:inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-2 py-1 rounded-md border border-red-300"
                    >
                      Salir del proyecto
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showDeleteConfirmation && (
            <DeleteConfirmationModal
              onCancel={handleCancelDeleteElementoProyect}
              onConfirm={handleConfirmDeleteElementoProyect}
            />
          )}
        </div>
      )}
      {showTableModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowTableModal(false)}>
              &times;
            </span>
            <div className="text-blue-950 mb-4 text-center">
              <div className="bg-gray-200 p-4 rounded mx-auto">
                <h1 className="mb-2">
                  Codigo de acceso del proyecto, puedes compartir este código
                  con los usuarios que desees compartir el proyecto:
                </h1>
                <div className="bg-white p-2 rounded-md mb-3">
                  <h1 className="font-bold text-2xl">{faCode}</h1>
                </div>
                <button
                  onClick={() => copyToClipboard()}
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mb-2"
                >
                  Copiar
                </button>
              </div>
            </div>
            <div className="mb-4 flex justify-center items-center">
              <button
                onClick={() => toggleTableModalContent("users")}
                className={`mr-2 px-4 py-2 rounded-md ${
                  showTableModalContent === "users"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                Usuarios Vinculados
              </button>
              <button
                onClick={() => toggleTableModalContent("requests")}
                className={`px-4 py-2 rounded-md ${
                  showTableModalContent === "requests"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                Solicitudes Pendientes
              </button>
            </div>
            {showTableModalContent === "users" && (
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
                            handleEliminarElemento(
                              elemento._id,
                              elemento.proyect
                            )
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
            )}
            {showTableModalContent === "requests" && (
              <table className="min-w-full bg-gray-200 border border-gray-300 text-sm">
                <thead>
                  <tr>
                    <th className="py-2 px-2 md:px-4 border-b text-center">
                      Usuario
                    </th>
                    <th className="py-2 px-2 md:px-4 border-b text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudesShared.map((elemento) => (
                    <tr key={elemento._id} className="hover:bg-gray-300">
                      <td className="py-2 px-2 md:px-4 border-b text-center">
                        {elemento.user.name + " " + elemento.user.lastname}
                      </td>
                      <td className="py-2 px-2 md:px-4 border-b text-center">
                        <button
                          onClick={() =>
                            handleConfirmarProyectoCompartido(elemento._id)
                          }
                          className="bg-green-700 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300 mr-2"
                        >
                          Aceptar Invitación
                        </button>
                        <button
                          onClick={() =>
                            handleEliminarElemento(
                              elemento._id,
                              elemento.proyect
                            )
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
            )}
          </div>
          {showDeleteConfirmation && (
            <DeleteConfirmationModal
              onCancel={handleCancelDeleteElemento}
              onConfirm={handleConfirmDeleteElemento}
            />
          )}
          <Popup isOpen={showSuccess} message={successMessage} onClose={handleSuccessClose} />
        </div>
      )}
    </div>
  );
}

export default ProyectFormPage;

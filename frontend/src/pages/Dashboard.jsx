import React, { useState } from "react";
import { useProyect } from "../context/ProyectContext";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import DeleteProyect from "../components/DeleteConfirmationModal";
import Popup from "../components/Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrash,
  faShare,
  faPlusCircle,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

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
  const [showDeleteConfirmationProyect, setShowDeleteConfirmationProyect] =
    useState(false);
  const [proyectToDelete, setProyectToDelete] = useState(null);
  const [elementoToDelete, setElementoToDelete] = useState(null);
  const [elementoToDeleteProyect, setElementoToDeleteProyect] = useState(null);
  const [showTableModalContent, setShowTableModalContent] = useState("users");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [name, setName] = useState("");

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


  const getUserName = async (id) => {
    try {
      const user = await getUserById(id);
      setName(user);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    } 
  };

  useEffect(() => {
    getProyects();
    getProyectsShared();
  }, []);
console.log(proyectShared);
  const toggleTableModal = () => {
    setShowTableModal(!showTableModal);
  };
  //--------- Proyectos Delete------------------------------------
  const handleDeleteProyect = async (proyectId) => {
    try {
      console.log(proyectId);
      setProyectToDelete(proyectId);
      setShowDeleteConfirmationProyect(true); // Mostrar el modal de confirmación antes de eliminar
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  const handleConfirmDeleteProyect = async () => {
    try {
      await deleteProyect(proyectToDelete);
      getProyects();
      setShowDeleteConfirmationProyect(false); // Ocultar el modal de confirmación
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };
  const handleCancelDeleteProyect = () => {
    setShowDeleteConfirmationProyect(false); // Ocultar el modal de confirmación
  };
  //-------------------------------------------------------------
  const handleConfirmarProyectoCompartido = async (proyectId) => {
    try {
      // Mostrar el modal de confirmación antes de eliminar
      //console.log(proyectId);
      await updateStatusProyectShared(proyectId);
      await getSolicitudesProyectosShared(proyectId);
      setSuccessMessage("Se ha aceptado la solicitud de ingreso al proyecto.");
      setShowSuccess(true);
    } catch (error) {
      console.error("Error al eliminar el proyecto compartido:", error);
    }
  };
  //----------------------------------------------------------------------
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
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full transition duration-300"
        >
          <FontAwesomeIcon icon={faPlusCircle} className="text-base mr-2" />
          Nuevo
        </Link>
        <Link
          to={`/compartir`}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full transition duration-300"
        >
          <FontAwesomeIcon icon={faSignInAlt} className="text-base mr-2" />
          Ingresar
        </Link>
      </div>
      <h1 className="text-black text-sm sm:text-base font-semibold font-sans italic mb-2">
        Proyectos
      </h1>
      {proyects.length === 0 ? (
        <p className="text-base mb-4 italic">
          No hay proyectos, añada uno para estimar su costo.
        </p>
      ) : (
        <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
          <div className="rounded-lg border border-gray-200 shadow-md m-5">
            <table className="min-w-full bg-white border-collapse text-left text-xs sm:text-sm text-gray-600">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-1 px-1 md:px-2 font-semibold text-blue-800 border-b text-center">
                    Título
                  </th>
                  <th className="py-1 px-1 md:px-2 font-semibold text-blue-800 border-b text-center">
                    Categoría
                  </th>
                  <th className="py-1 px-1 md:px-2 font-semibold text-blue-800 border-b text-center">
                    Fecha de Creación
                  </th>
                  <th className="py-1 px-1 md:px-2 font-semibold text-blue-800 border-b text-center">
                    Última Actualización
                  </th>
                  <th className="py-1 px-1 md:px-2 font-semibold text-blue-800 border-b text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {proyects.map((proyect) => (
                  <tr key={proyect._id} className="hover:bg-gray-100">
                    <td className="py-2 px-1 md:px-2 border-b text-center">
                      {proyect.title}
                    </td>
                    <td className="py-2 px-1 md:px-2 border-b text-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-1 py-1 text-xxs sm:text-xs font-semibold text-blue-800">
                        {proyect.category}
                      </span>
                    </td>
                    <td className="py-2 px-1 md:px-2 border-b text-center">
                      {new Date(proyect.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-1 md:px-2 border-b text-center">
                      {new Date(proyect.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="py-1 px-1 md:px-2 border-b space-y-1 md:space-x-1 md:space-y-0">
                      <Link
                        to={`/fases/${proyect._id}`}
                        className="block md:inline-block text-blue-500 hover:text-blue-600 mr-2"
                      >
                        <FontAwesomeIcon icon={faEye} size="lg" />
                      </Link>
                      <Link
                        to={`/proyect/${proyect._id}`}
                        className="block md:inline-block text-yellow-400 hover:text-yellow-500 mr-2"
                      >
                        <FontAwesomeIcon icon={faEdit} size="lg" />
                      </Link>
                      <button
                        onClick={() => handleDeleteProyect(proyect._id)}
                        className="block md:inline-block text-red-500 hover:text-red-600 mr-2"
                      >
                        <FontAwesomeIcon icon={faTrash} size="lg" />
                      </button>
                      <button
                        onClick={() =>
                          handleProyectShared(proyect.keyShared, proyect._id)
                        }
                        className="block md:inline-block text-green-600 hover:text-green-700"
                      >
                        <FontAwesomeIcon icon={faShare} size="lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showDeleteConfirmationProyect && (
              <DeleteProyect
                onCancel={handleCancelDeleteProyect}
                onConfirm={handleConfirmDeleteProyect}
              />
            )}
          </div>
        </div>
      )}
{proyectShared.length === 0 ? (
  <p className="text-base my-10 italic"></p>
) : (
  <div className="overflow-x-auto">
    <h1 className="text-black text-sm sm:text-base font-sans italic mb-4 font-semibold">
      Proyectos Compartidos
    </h1>
    <div className="rounded-lg border border-gray-200 shadow-md m-3">
      <table className="min-w-full bg-white border-collapse text-left text-xs sm:text-sm text-gray-600">
        <thead className="bg-blue-100">
          <tr>
            <th className="py-1 px-1 md:px-2 font-semibold text-blue-800 border-b text-center">
              Título
            </th>
            <th className="py-1 px-1 md:px-2 font-semibold text-blue-800 border-b text-center">
              Creado por
            </th>
            <th className="py-1 px-1 md:px-2 font-semibold text-blue-800 border-b text-center">
              Categoría
            </th>
            <th className="py-1 px-1 md:px-2 font-semibold text-blue-800 border-b text-center">
              Última Actualización
            </th>
            <th className="py-1 px-1 md:px-2 font-semibold text-blue-800 border-b text-center"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {proyectShared.map((proyect) => (
            <tr key={proyect._id} className="hover:bg-gray-300">
              <td className="py-2 px-1 md:px-2 border-b text-center">
                {proyect.proyect.title}
              </td>
              <td className="py-2 px-1 md:px-2 border-b text-center">
                {userNames[proyect.proyect.user] || "Usuario Desconocido"}
              </td>
              <td className="py-2 px-1 md:px-2 border-b text-center">
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-1 py-1 text-xxs sm:text-xs font-semibold text-blue-800">
                  {proyect.proyect.category}
                </span>
              </td>
              <td className="py-2 px-1 md:px-2 border-b text-center">
                {new Date(proyect.updatedAt).toLocaleDateString()}
              </td>
              <td className="py-1 px-1 md:px-2 border-b space-y-1 md:space-x-1 md:space-y-0">
                <Link
                  to={`/fases/${proyect.proyect._id}`}
                  className="block md:inline-block text-blue-500 hover:text-blue-600 mr-2"
                >
                  <FontAwesomeIcon icon={faEye} size="lg" />
                </Link>
                <button
                  onClick={() =>
                    handleEliminarElementoProyect(proyect._id)
                  }
                  className="block md:inline-block text-red-500 hover:text-red-600"
                >
                  <FontAwesomeIcon icon={faTrash} size="lg" />
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
                Código de acceso del proyecto, puedes compartir este código con los usuarios que desees compartir el proyecto:
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
          <Popup
            isOpen={showSuccess}
            message={successMessage}
            onClose={handleSuccessClose}
          />
        </div>
      )}
    </div>
  );
}

export default ProyectFormPage;

import React, { useState, useEffect } from "react";
import { useAdmin } from "../../../context/AdminContext";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs ";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import CustomPopup from "../../../components/CustomPopup";

function ConfigTipoAdmin() {
  const {
    createTipoFuncion,
    getTipoFuncion,
    deleteTipoFuncion,
    updateTipoFuncion,
    getTipoFunciones,
    tipoFunciones,
    tipoFuncion,
  } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [tipoFuncionToDelete, setTipoFuncionToDelete] = useState(null);
  const [showCustomPopup, setShowCustomPopup] = useState(null);
  
  const mostrarPopUp = (key) => {
    setShowCustomPopup(key);
  };

  const handlePopUpClose = () => {
    setShowCustomPopup(null);
  };
  useEffect(() => {
    document.title = "Configuraciones del proyecto - App costos";
    getTipoFunciones();
  }, []);

  const handleDeleteTipoFuncion = (tipoFuncionId) => {
    // Mostrar el modal de confirmación antes de eliminar
    setTipoFuncionToDelete(tipoFuncionId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Realizar la eliminación después de la confirmación
      await deleteTipoFuncion(tipoFuncionToDelete);
      // Actualizar la lista de tipoFunciones u otras acciones necesarias después de la eliminación
      getTipoFunciones();
      // Ocultar el modal de confirmación
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error al eliminar el tipo de función:", error);
    }
  };

  const handleCancelDelete = () => {
    // Ocultar el modal de confirmación
    setShowDeleteConfirmation(false);
  };

  const routes = [
    { path: "/administrador/menu", displayName: "Inicio" },
    {
      path: `/administrador/tipofunciones`,
      displayName: "Configuraciones del proyecto",
    },
  ];

  const filteredTipoFunciones = tipoFunciones
    ? tipoFunciones.filter((tipoFuncion) =>
        tipoFuncion.tipo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
      <Breadcrumbs routes={routes} />
      <h2 className="text-2xl font-bold mb-4">Configuraciones</h2>
      <Link to="/administrador/tipofunciones/newtipofunciones">
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4">
          Agregar Nuevo Tipo
        </button>
      </Link>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Búsqueda por tipo, valor alto, medio o bajo"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {/* TipoFuncion Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  onClick={() => mostrarPopUp("Tipo")}
                  className="ml-2 text-blue-500 cursor-pointer"
                  size="1x"
                />
                Tipo
              </th>

              <th className="border px-4 py-2">Valor Alto</th>
              <th className="border px-4 py-2">Valor Medio</th>
              <th className="border px-4 py-2">Valor Bajo</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredTipoFunciones.map((tipoFuncion) => (
              <tr key={tipoFuncion._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{tipoFuncion.tipo}</td>
                <td className="border px-4 py-2">{tipoFuncion.valorAlto}</td>
                <td className="border px-4 py-2">{tipoFuncion.valorMedio}</td>
                <td className="border px-4 py-2">{tipoFuncion.valorBajo}</td>
                <td className="border px-4 py-2">
                  <Link to={`/administrador/tipofunciones/${tipoFuncion._id}`}>
                    <button className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
                      Actualizar
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteTipoFuncion(tipoFuncion._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}

      <CustomPopup
        isOpen={showCustomPopup}
        message={showCustomPopup}
        onClose={handlePopUpClose}
      />
    </div>
  );
}

export default ConfigTipoAdmin;

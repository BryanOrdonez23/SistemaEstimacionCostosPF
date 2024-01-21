import React, { useState, useEffect } from "react";
import { useAdmin } from "../../../context/AdminContext";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs ";
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

  useEffect(() => {
    getTipoFunciones();
  }, []);

  const handleDeleteTipoFuncion = (tipoFuncionId) => {
    deleteTipoFuncion(tipoFuncionId);
    getTipoFunciones();
  };

  const routes = [
    { path: '/administrador/menu', displayName: 'Inicio' },
    { path: `/administrador/tipofunciones`, displayName: 'Configuraciones del proyecto' },
  ];

  const filteredTipoFunciones = tipoFunciones
    ? tipoFunciones.filter(
        (tipoFuncion) =>
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
              <th className="border px-4 py-2">Tipo</th>
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
    </div>
  );
}

export default ConfigTipoAdmin;

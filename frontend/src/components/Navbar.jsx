import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 py-4 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          <Link to={isAuthenticated ? "/proyects" : "/"}>
            UNL - Estimación de Costos por Puntos de Función
          </Link>
        </h1>
        <ul className="flex items-center gap-x-4">
          {isAuthenticated ? (
            <>
              <li className="hidden sm:block text-gray-400">
                Bienvenido, {user.name + " " + user.lastname}
              </li>
              <li>
                <Link
                  to="/newproyect"
                  className="text-white hover:text-gray-300 transition duration-300 bg-indigo-500 px-4 py-1 rounded-sm"
                >
                  Nuevo Proyecto
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={() => logout()}
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Cerrar Sesión
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-300 transition duration-300 bg-indigo-500 px-4 py-1 rounded-sm"
                >
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-white hover:text-gray-300 transition duration-300 bg-indigo-500 px-4 py-1 rounded-sm"
                >
                  Registrarce
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

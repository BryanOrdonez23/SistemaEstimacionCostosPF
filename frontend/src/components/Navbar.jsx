import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
      <nav className="bg-zinc-700 py-4 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12  shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            <Link
              to={isAuthenticated ? "/proyects" : "/"}
              className="transition duration-300 hover:text-gray-300"
            >
              App para estimación de Costos por PF
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
                    to="/login"
                    onClick={() => logout()}
                    className="text-white hover:text-gray-300 text-center transition duration-300 bg-indigo-500 px-4 py-2 rounded-md
                    sm:inline-block sm:px-4 sm:py-2
                    md:inline-block md:px-6 md:py-2
                    lg:inline-block lg:px-8 lg:py-2
                    xl:inline-block xl:px-10 xl:py-2
                    block sm:w-full md:w-auto lg:w-auto xl:w-auto"
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
                    className="text-white hover:text-gray-300 transition duration-300 bg-indigo-500 px-4 py-2 rounded-sm
                    sm:inline-block sm:px-4 sm:py-2
                    md:inline-block md:px-6 md:py-3
                    lg:inline-block lg:px-8 lg:py-3
                    xl:inline-block xl:px-10 xl:py-3
                    block sm:w-full md:w-auto lg:w-auto xl:w-auto"
                  >
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-white hover:text-gray-300 transition duration-300 bg-indigo-500 px-4 py-2 rounded-sm
                    sm:inline-block sm:px-4 sm:py-2
                    md:inline-block md:px-6 md:py-3
                    lg:inline-block lg:px-8 lg:py-3
                    xl:inline-block xl:px-10 xl:py-3
                    block sm:w-full md:w-auto lg:w-auto xl:w-auto"
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
  );
  
}

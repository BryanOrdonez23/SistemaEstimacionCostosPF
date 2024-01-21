import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAdmin } from "../context/AdminContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const { isAuthenticated: adminCorrecto, logout: cerrar } = useAdmin();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/administrador/");
  const menuRef = useRef(null);

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <nav className="bg-zinc-700 py-2 sm:py-4 px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div className="flex items-center space-x-64 justify-around flex-wrap">
        <Link
          to={
            isAdminPage
              ? adminCorrecto
                ? "/administrador/menu"
                : "/administrador/login"
              : isAuthenticated
              ? "/proyects"
              : "/"
          }
          className="text-lg sm:text-lg font-bold text-white mb-2 sm:mb-0 transition duration-300 hover:text-gray-300 flex items-center"
        >
          <FontAwesomeIcon icon={faHome} className="ml-2" />
          <span className="ml-2">
            {isAdminPage
              ? "  App para estimación de Costos por PF"
              : "  Estimación de Costos por Puntos de Función"}
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <ul className="flex flex-wrap sm:flex-row items-center gap-2 sm:gap-4">
            {isAdminPage ? (
              <li>
                <Link
                  to="/administrador/login"
                  onClick={() => cerrar()}
                  className="text-white hover:text-gray-300 transition duration-300 bg-indigo-500 px-3 py-2 rounded-md block"
                >
                  Cerrar Sesión
                </Link>
              </li>
            ) : (
              <>
                {!isAuthenticated && (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="text-white hover:text-gray-300 transition duration-300 bg-indigo-500 px-3 py-2 rounded-md block"
                      >
                        Iniciar Sesión
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="text-white hover:text-gray-300 transition duration-300 bg-indigo-500 px-3 py-2 rounded-md block"
                      >
                        Registrarse
                      </Link>
                    </li>
                  </>
                )}
                {isAuthenticated && (
                  <li className="relative group" ref={menuRef}>
                    <div
                      className={`text-white cursor-pointer hover:text-gray-300 transition duration-300 ${
                        showMenu ? "bg-gray-800" : ""
                      }`}
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      <FontAwesomeIcon icon={faUser} size="xl" />
                      {" "+user.name}
                    </div>
                    {showMenu && (
                      <ul className="absolute z-50 right-0 mt-2 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg">
                        <li>
                          <Link
                            to="/perfil"
                            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400"
                          >
                            Ver Perfil
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/login"
                            onClick={() => {
                              setShowMenu(false);
                              logout();
                            }}
                            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400"
                          >
                            Cerrar Sesión
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAdmin } from "../context/AdminContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faSignOutAlt, faAngleDown, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

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
      <div className="flex items-center space-x-4 justify-between flex-wrap">
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
          <img
            src="/logo/LogoCarrera.svg"
            alt="Home Icon"
            className="w-12 h-12"
          />
          <span className="ml-2 font-semibold">
            {isAdminPage
              ? "  App para estimación de Costos por PF"
              : "Laboratorio de Computación - CostEstimator "}

            {!isAdminPage && (
              <>
                <br />
                <span className="block text-xs font-normal text-gray-400">
                  Estimación de Costos por Puntos de Función
                </span>
              </>
            )}
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <ul className="flex flex-wrap sm:flex-row items-center gap-2 sm:gap-4">
            {isAdminPage ? (
              adminCorrecto ? (
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
                <li>
                  <Link
                    to="/administrador/login"
                    className="text-white hover:text-gray-300 transition duration-300 bg-indigo-500 px-3 py-2 rounded-md block"
                  >
                    Iniciar Sesión
                  </Link>
                </li>
              )
            ) : (
              <>
                {!isAuthenticated && (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="text-white text-sm hover:text-gray-300 transition duration-300 bg-sky-600 px-3 py-2 rounded-md block"
                      >
                        <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                        Iniciar Sesión
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="text-white text-sm hover:text-gray-300 transition duration-300 bg-sky-600 px-3 py-2 rounded-md block"
                      >
                        <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                        Registrarse
                      </Link>
                    </li>
                  </>
                )}
                {isAuthenticated && (
                  <li className="relative group" ref={menuRef}>
                    <button
                      onClick={() => setShowMenu(!showMenu)}
                      className="text-white hover:text-gray-300 transition duration-300 bg-gray-800 px-3 py-2 rounded-md flex items-center"
                    >
                      <FontAwesomeIcon icon={faUser} size="base" />
                      <span className="ml-2 text-sm ">{user.name}</span>
                      <FontAwesomeIcon icon={faAngleDown} size="sm" className="ml-1" />
                    </button>
                    {showMenu && (
                      <ul className="absolute z-50 right-0 mt-2 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg">
                        <li>
                          <Link
                            to="/perfil"
                            className="block w-full py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                            onClick={closeMenu}
                          >
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Ver Perfil
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/login"
                            className="block w-full py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                            onClick={() => {
                              closeMenu();
                              logout();
                            }}
                          >
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
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

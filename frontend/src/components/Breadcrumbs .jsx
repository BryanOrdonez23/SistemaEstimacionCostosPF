import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Breadcrumbs = ({ routes }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center bg-blue-gray-50 bg-opacity-60 py-2 px-4 my-2 rounded-md overflow-hidden">
        {routes.map((route, index) => (
          <li key={index} className="flex items-center mb-2">
            {index > 0 && (
              <span className="mx-2 select-none text-sm font-normal leading-normal text-zinc-600 antialiased">
                /
              </span>
            )}
            {route.path ? (
              <Link
                to={route.path}
                className={`flex items-center opacity-60 ${route.path === '/proyects' ? 'text-blue-gray-900' : 'text-blue-gray-500'}`}
              >
                {route.path === '/proyects' && (
                  <FontAwesomeIcon icon={faHome} className="mr-2" style={{ color: '#1E90FF' }} />
                )}
                <span className={`mx-2 text-lg select-none text-2xl font-base leading-normal text-zinc-900 antialiased ${route.path === '/proyects' ? 'text-blue-gray-900' : 'text-zinc-900'}`}>
                  {route.displayName}
                </span>
              </Link>
            ) : (
              <span className="opacity-60 flex items-center">
                {/* Puedes personalizar este ícono para representar un enlace ausente */}
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                <span className={`mx-2 select-none text-2xl font-normal text-zinc-900 leading-normal antialiased ${route.path === '/proyects' ? 'text-blue-gray-900' : 'text-zinc-900'}`}>
                  {route.displayName}
                </span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

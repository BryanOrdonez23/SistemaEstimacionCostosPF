import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faProjectDiagram, faUserPlus, faCog } from '@fortawesome/free-solid-svg-icons';

function MainPageAdmin() {
  useEffect(() => {
    document.title = 'Página Principal Administrador - App Costos ';
  }, []);
  
  return (
    <div className='text-center'>
      <div className='text-5xl text-black mb-8'>Página Principal del Administrador</div>

      <div className='grid grid-cols-2 gap-4'>
        {/* Enlace de Usuarios */}
        <Link to='/administrador/users' className='bg-blue-500 p-6 rounded-lg block text-center'>
          <FontAwesomeIcon icon={faUsers} className='text-white text-3xl mb-2' />
          <div className='text-white'>Usuarios</div>
        </Link>

        {/* Enlace de Proyectos */}
        <Link to='/administrador/proyects' className='bg-green-500 p-6 rounded-lg block text-center'>
          <FontAwesomeIcon icon={faProjectDiagram} className='text-white text-3xl mb-2' />
          <div className='text-white'>Proyectos</div>
        </Link>

        {/* Enlace de Registro de Nuevos Admins */}
        <Link to='/administrador/admins' className='bg-yellow-500 p-6 rounded-lg block text-center'>
          <FontAwesomeIcon icon={faUserPlus} className='text-white text-3xl mb-2' />
          <div className='text-white'>Registro de Admins</div>
        </Link>

        {/* Enlace de Configuraciones */}
        <Link to='/administrador/tipofunciones' className='bg-purple-500 p-6 rounded-lg block text-center'>
          <FontAwesomeIcon icon={faCog} className='text-white text-3xl mb-2' />
          <div className='text-white'>Configuraciones</div>
        </Link>
      </div>
    </div>
  );
}

export default MainPageAdmin;

import { Link } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import SearchProject from './SearchProject';
import useAuth from '../hooks/useAuth';

const Header = () => {

  const { handleSearch, logOutProject } = useProjects();
  const { logOut } = useAuth();

  const handleLogOut = () => {
    logOutProject();
    logOut();
    localStorage.removeItem('token');
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-3xl text-black-600 font-bold text-center mb-5 md:mb-0">
          Get Organized
        </h2>

        <div className='flex flex-col md:flex-row items-center gap-4'>
          <button type='button' className='text-sm uppercase hover:text-gray-500 transition-colors' onClick={handleSearch}> Buscar proyectos </button>

          <Link to='/projects' className='text-sm uppercase hover:text-gray-500 transition-colors'> Proyectos </Link>

          <button type='button' className='text-white text-sm 
                bg-sky-600 p-3 rounded-md uppercase font-bold
                hover:bg-sky-800 
                transition-colors'
                onClick={handleLogOut}
                > Cerrar sesión </button>

          <SearchProject/>
        </div>
      </div>
    </header>
  )
}

export default Header

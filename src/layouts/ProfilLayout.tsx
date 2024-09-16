import { NavLink, Outlet } from 'react-router-dom';

const ProfilLayout = () => {
  return (
    <main className='grow flex flex-col sm:flex-row py-10 px-6 container-size w-full gap-6 sm:gap-10'>
      <nav className='border-b-2 sm:border-r-2 border-custom-green-1 pb-8 sm:pr-10'>
        <ul className='flex flex-row sm:flex-col gap-4 lg:text-lg font-medium text-stone-800 w-max'>
          <li>
            <NavLink
              to="/profil"
              className={({ isActive }) => isActive ? "nav-active nav-link" : "nav-link"}
              end
            >
              Mes informations
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profil/vehicules"
              className={({ isActive }) => isActive ? "nav-active nav-link" : "nav-link"}
            >
              Mes véhicules
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profil/trajets"
              className={({ isActive }) => isActive ? "nav-active nav-link" : "nav-link"}
            >
              Mes trajets
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </main>
  )
};

export default ProfilLayout;
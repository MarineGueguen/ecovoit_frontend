import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BiCar } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import logo from "../../assets/logo.png";
import Logout from "./Logout";
import CustomNavLink from "./CustomNavLink";

type Props = {
  token: string;
  setToken: () => void;
}

const NavBar = ({ token, setToken }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);

  useEffect(() => {
    setShowDropdownMenu(false);
    if (token.length > 0) { // A REVOIR

      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token])

  return (
    <>
      <nav className="flex justify-between items-center px-6 lg:px-[10%] xl:px-[15%] md:h-20 h-10 relative bg-[#FFEEAD] z-20">
        <div className="flex items-center gap-4">
          <NavLink
            to="/"
            className="shrink-0 flex flex-row-reverse md:flex-row items-center"
            onClick={() => setShowDropdownMenu(false)}
          >
            <p className="font-fredoka text-sm md:text-xl text-stone-800">Ecovoit'</p>
            <img className="md:h-16 h-8" src={logo} alt="logo" />
          </NavLink>
          <ul className="hidden md:flex gap-4 lg:text-lg font-medium text-stone-800">
            <li>
              <NavLink
                to="trajets"
                className={({ isActive }) => isActive ? "nav-active nav-link" : "nav-link"}
              >
                Trouver un trajet
              </NavLink>
            </li>
            <li>
              <NavLink
                to="publication"
                className={({ isActive }) => isActive ? "nav-active nav-link" : "nav-link"}
              >
                Publier un trajet
              </NavLink>
            </li>
          </ul>
        </div>
        <button onClick={() => setShowDropdownMenu(!showDropdownMenu)} className="flex md:hidden">
          <FiMenu size={24} color={"#292524"} />
        </button>
        {
          isAuthenticated ?
            <button
              onClick={() => setShowDropdownMenu(!showDropdownMenu)}
              className="hidden md:flex items-center gap-2 text-stone-800 text-lg font-medium"
            >
              Mon compte <IoIosArrowDown size={24} color={"#292524"} />
            </button>
            :
            <ul className="hidden md:flex gap-4 lg:text-lg font-medium text-stone-800">
              <li>
                <NavLink
                  to="connexion"
                  className={({ isActive }) => isActive ? "nav-active nav-link" : "nav-link"}
                >
                  Se connecter
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="inscription"
                  className={({ isActive }) => isActive ? "nav-active nav-link" : "nav-link"}
                >
                  Créer mon compte
                </NavLink>
              </li>
            </ul>
        }
      </nav>
      {
        showDropdownMenu &&
        <div className="absolute right-0 lg:right-[10%] xl:right-[15%] top-0 bg-white h-screen md:h-fit flex flex-col justify-between z-10 border border-[#FFEEAD] drop-shadow-sm">
          <ul className="block md:hidden text-[#77b190] font-medium divide-y-2 divide-[#FFEEAD] p-2 mt-10">
            <CustomNavLink localisation="trajets" label="Trouver un trajet" setShowDropdownMenu={setShowDropdownMenu} />
            <CustomNavLink localisation="publication" label="Publier un trajet" setShowDropdownMenu={setShowDropdownMenu} />
          </ul>
          {
            isAuthenticated ?
              <ul className="text-[#77b190] md:text-lg font-medium divide-y-2 divide-[#FFEEAD] p-2 md:mt-20">
                <CustomNavLink localisation="profil" label="Mon profil" icon={<CgProfile />} setShowDropdownMenu={setShowDropdownMenu} />
                <CustomNavLink localisation="profil/trajets" label="Mes trajets" icon={<BiCar />} setShowDropdownMenu={setShowDropdownMenu} />
                <li className="px-4 py-2">
                  <Logout setToken={setToken} />
                </li>
              </ul>
              :
              <ul className="text-[#77b190] font-medium divide-y-2 divide-[#FFEEAD] p-2 md:mt-20">
                <CustomNavLink localisation="connexion" label="Se connecter" setShowDropdownMenu={setShowDropdownMenu} />
                <CustomNavLink localisation="inscription" label="Créer mon compte" setShowDropdownMenu={setShowDropdownMenu} />
              </ul>
          }
        </div>
      }
    </>
  );
};

export default NavBar;
